---
title: Image geo location
lang: ko-KR
meta:
  - name: description
    content: 사진에서 위도 경도를 추출하는 방법
  - name: keywords
    content: geolocation
tags:
  - gps
  - python
  - image
  - geolocation

disqus: 'yes'
feed:
  enable: true
  title: Image geo location
  description: 사진에서 위도 경도를 추출하는 방법
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: 'https://shockzinfinity.github.io/tutorial/geolocation.html'
created: '2020-12-13'
updated: '2025-10-20'
---

# [임시] Image geo location - Introduction

<TagLinks />

[[toc]]

---

## EXIF Tag Site

- [EXIF Tag](https://www.exiv2.org/tags.html)

## [작업중] python 을 이용해 EXIF 태그 추출하여 위도/경도 추출

```python
import shutil
import re
import os
import csv
from PIL import Image
from PIL.ExifTags import TAGS
import webbrowser

path = "/synology/photo"
# filename = "image_list.txt"
# with open(filename, "w", encoding="utf-8", newline="\n") as temp:
#     for f in os.listdir(path):
#         if "jpeg" in f:
#             temp.write("{}\n".format(f))

imagePath = "{}/IMG_4497.jpeg".format(path)
image_temp = Image.open(imagePath)
info = image_temp._getexif()
image_temp.close()

# print(info)

tagLabel = {}

for tag, value in info.items():
    decoded = TAGS.get(tag, tag)
    tagLabel[decoded] = value

# print(tagLabel)
# print(tagLabel['DateTimeOriginal'])
# print(tagLabel['DateTimeDigitized'])
# print(tagLabel['DateTime'])
# print(tagLabel['GPSInfo'])

# 북위/남위 : Key 1 (N/S)
# 위도(Latitude) : Key 2 (Tuple 형식 3개;도분초;1도=60분=3600초)
# 동경/서경 : Key 3 (E/W)
# 경도(Longitude) : Key 4 (Tuple 형식 3개;도분초;1도=60분=3600초)
# ex) 1: 'N', 2: (37.0, 34.0, 10.2), 3: 'E', 4: (126.0, 53.0, 56.79)
#     Key 1: 'N',
#     Key 2: (37.0, 34.0, 10.2),
#     Key 3: 'E',
#     Key 4: (126.0, 53.0, 56.79)

def get_decimal_from_dms(dms, ref):
    degrees = dms[0]
    minutes = dms[1] / 60.0
    seconds = dms[2] / 3600.0

    if ref in ['S', 'W']:
        degrees = -degrees
        minutes = -minutes
        seconds = -seconds

    return round(degrees + minutes + seconds, 5)

exifGPS = tagLabel["GPSInfo"]
latData =  get_decimal_from_dms(exifGPS[2], exifGPS[1])
longData = get_decimal_from_dms(exifGPS[4], exifGPS[3])

# print(latData)
# print(longData)

# google map
# 웹브라우저상에서 검색 시
# https://www.google.co.kr/maps/place/37.5695+126.89911 와 같은 형태
# webbrowser.open_new("https://www.google.co.kr/maps/place/" + str(latData) + "+" + str(longData))

print("https://www.google.co.kr/maps/place/{}+{}".format(str(latData), str(longData)))
```
