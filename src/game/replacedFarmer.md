---
title: 농부는 대체되었다.
description: '[농부는 대체되었다] 게임'
tags:
  - game
  - The Farmer was replaced
created: '2025-11-05'
updated: '2025-11-07'
---

# 농부는 대체되었다.

<TagLinks />

[[toc]]

## 선인장 수확

### 개요

영역을 기반으로 한 선인장 수확에 대한 함수

<YoutubeDisplay shareId="J8OSWxTJuh4?si=hgdW1SUa1TyuF6q4" />

1. **영역 정의**: 직사각형 영역을 `(x1, y1, x2, y2, 선인장)` 형태로 지정
2. **측정 단계**: 영역을 지그재그(snake 방식)로 스캔하며 수확 필요 여부 판단
3. **정렬 단계**:
   - 2D 셰이킹 정렬 방식으로 행과 열을 번갈아가며 버블 정렬 수행
   - 각 단계마다 정렬 상태를 검증하여 완료되면 종료
   - 최소 6회, 최대 12회까지 반복 (영역 크기에 따라 자동 조정)
4. **수확 및 다시심기**:
   - 선인장은 정렬해놓으면 한번에 수확 가능
   - 수확 하고 나서 바로 다시 심기

이걸 `while True:`하면 무한 반복

```python
# 이런 방식으로 호출 (메인 드론이라면...멀티 드론 환경이라면 별도 함수 만들어서 spawn)
while True:
  manage_cactus_region(REGION["cactus1"])
```

- 영역 지정 및 헬퍼 함수

```python
REGIONS = {
  # x = 0 ~ 4, y = 12 ~ 16 으로 세팅
  "cactus1": (0, 12, 4, 16, Entities.Cactus),
}

# 위치 이동 함수
def move_to(target_x, target_y):
  current_x = get_pos_x()
  current_y = get_pos_y()

  while current_x < target_x:
    move(East)
    current_x += 1

  while current_x > target_x:
    move(West)
    current_x -= 1

  while current_y < target_y:
    move(North)
    current_y += 1

  while current_y > target_y:
    move(South)
    current_y -= 1

# 현재 Y 좌표를 목표 Y로 정렬
def _align_y(to_y):
  cy = get_pos_y()
  while cy < to_y:
    move(North)
    cy += 1
  while cy > to_y:
    move(South)
    cy -= 1

# 영역을 지그재그(세로 스캔)로 돌며 각 (x,y)의 측정값을 수집
def measure_region(region):
  x1, y1, x2, y2, _ = region
  move_to(x1, y1)

  results = {}
  x = x1
  going_up = True

  # x 방향으로 한 칸씩 진행하며 세로로 왕복 스캔
  while x <= x2:
    if going_up:
      _align_y(y1)
      y = y1
      # 아래(y1) → 위(y2)로 이동하며 측정
      while y <= y2:
        size_here = measure()
        results[(x, y)] = size_here

        if y < y2:
          move(North)
          y += 1
        else:
          break
    else:
      _align_y(y2)
      y = y2
      # 위(y2) → 아래(y1)로 이동하며 측정
      while y >= y1:
        size_here = measure()
        results[(x, y)] = size_here

        if y > y1:
          move(South)
          y -= 1
        else:
          break

    # 다음 열로 이동
    if x < x2:
      move(East)
    x += 1
    going_up = not going_up

  return results

# 수집된 2D 맵이 행/열 모두 오름차순으로 정렬되었는지 확인
def is_sorted_2d(measure_map, region):
  x1, y1, x2, y2, _ = region

  # 가로 방향 검증
  for x in range(x1, x2):
    for y in range(y1, y2 + 1):
      if (x, y) in measure_map:
        left = measure_map[(x, y)]
      else:
        left = None
      if (x + 1, y) in measure_map:
        right = measure_map[(x + 1, y)]
      else:
        right = None

      if not left == None and not right == None:
        if left > right:
          return False

  # 세로 방향 검증
  for x in range(x1, x2 + 1):
    for y in range(y1, y2):
      if (x, y) in measure_map:
        bottom = measure_map[(x, y)]
      else:
        bottom = None
      if (x, y + 1) in measure_map:
        top = measure_map[(x, y + 1)]
      else:
        top = None

      if not bottom == None and not top == None:
        if bottom > top:
          return False

  return True


# 단일 행을 버블 정렬 방식으로 정렬
def sort_row(region, measure_map, y, left_to_right):
  x1, y1, x2, y2, _ = region
  width = x2 - x1 + 1

  for i in range(width):
    swapped = False

    if left_to_right:
      # 왼쪽→오른쪽 방향 버블 정렬
      for x in range(x1, x2):
        if (x, y) in measure_map:
          a = measure_map[(x, y)]
        else:
          a = None
        if (x + 1, y) in measure_map:
          b = measure_map[(x + 1, y)]
        else:
          b = None
        if not a == None and not b == None and a > b:
          move_to(x, y)
          swap(East)
          measure_map[(x, y)] = b
          measure_map[(x + 1, y)] = a
          swapped = True
    else:
      # 오른쪽→왼쪽쪽 방향 버블 정렬
      for x in range(x2, x1, -1):
        if (x, y) in measure_map:
          a = measure_map[(x, y)]
        else:
          a = None
        if (x - 1, y) in measure_map:
          b = measure_map[(x - 1, y)]
        else:
          b = None
        if not a == None and not b == None and a < b:
          move_to(x, y)
          swap(West)
          measure_map[(x, y)] = b
          measure_map[(x - 1, y)] = a
          swapped = True

    # swap 없으면 종료
    if not swapped:
      break

  return True

# 단일 열을 버블 정렬 방식으로 정렬
def sort_column(region, measure_map, x):
  x1, y1, x2, y2, _ = region
  height = y2 - y1 + 1

  for i in range(height):
    swapped = False

    # 아래→위 방향 버블 정렬
    for y in range(y1, y2):
      if (x, y) in measure_map:
        a = measure_map[(x, y)]
      else:
        a = None
      if (x, y + 1) in measure_map:
        b = measure_map[(x, y + 1)]
      else:
        b = None
      if not a == None and not b == None and a > b:
        move_to(x, y)
        swap(North)
        measure_map[(x, y)] = b
        measure_map[(x, y + 1)] = a
        swapped = True

    # swap 없으면 종료
    if not swapped:
      break

  return True

# 수확 후 빈 칸에 지그재그로 다시 심기
def harvest_and_replant(region):
  x1, y1, x2, y2, entity = region

  move_to(x1, y1)
  if can_harvest():
    harvest()

  x = x1
  going_up = True

  # 지그재그로 순회하며 빈 칸일 때만 식재
  while x <= x2:
    if going_up:
      _align_y(y1)
      y = y1
      while y <= y2:
        if get_entity_type() == None:
          plant(entity)

        if y < y2:
          move(North)
          y += 1
        else:
          break
    else:
      _align_y(y2)
      y = y2
      while y >= y1:
        if get_entity_type() == None:
          plant(entity)

        if y > y1:
          move(South)
          y -= 1
        else:
          break

    # 다음 열로 이동
    if x < x2:
      move(East)
    x += 1
    going_up = not going_up

# 2차원 매트릭스 쉐이킹 정렬(행/열 교대로 버블 정렬)로 대략적인 정렬 수행
def sort_cactus_shear(region):
  x1, y1, x2, y2, _ = region
  width = x2 - x1 + 1
  height = y2 - y1 + 1

  if width > height:
    max_dim = width
  else:
    max_dim = height

  # 반복 단계 수를 영역 크기 기반 log로 계산 (최소 6, 최대 12)
  log_val = 0
  temp = max_dim
  while temp > 1:
    temp = temp // 2
    log_val += 1

  max_phases = log_val + 1
  if max_phases < 6:
    max_phases = 6
  if max_phases > 12:
    max_phases = 12

  # 행→열→행... 교대로 버블 정렬, 중간에 정렬되면 조기 종료
  for phase in range(max_phases):
    m = measure_region(region)

    if is_sorted_2d(m, region):
      break

    if phase % 2 == 0:
      for y in range(y1, y2 + 1):
        row_index = y - y1
        left_to_right = (row_index % 2 == 0)
        sort_row(region, m, y, left_to_right)
    else:
      for x in range(x1, x2 + 1):
        sort_column(region, m, x)

# 정렬 후 수확 & 다시 심기까지 한번에...
def manage_cactus_region(region):
  sort_cactus_shear(region)
  harvest_and_replant(region)
```
