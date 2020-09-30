---
title: Todo App tutorial #4
lang: ko-KR
meta:
  - name: description
    content: Todo App 을 만드는 꽤 복잡한 방법
  - name: keywords
    content: todoapp
tags: ["todoapp", ".net core", "nginx", "mssql", "docker", "ssl", "swagger", "seq", "serilog", "docker-compose", "cqrs / es"]
sidebar: auto
disqus: yes
feed:
  enable: true
  title: Todo App tutorial #4
  description: Todo App 을 만드는 꽤 복잡한 방법
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/tutorial/todoapp.4.html
---

# Todo App Tutorial #4 - Refactoring

<TagLinks />

---

> 부제: Todo App 을 만드는 **꽤** 복잡한 방법  
> [Github Repository](https://github.com/shockzinfinity/todo-app-complicated)

[[toc]]

---

## Refactoring

### CQRS / ES

이번 섹션에서 다룰 주제는 CQRS / ES 입니다. 생소할 수 있는 단어이기에 약간 설명을 해야할 것 같습니다. 단어의 설명에 앞서 주의점이 있습니다.

여기에 적용되는 CQRS 는 선택사항 입니다. 굳이 적용해야할 이유도 별로 없으며 Todo App 정도를 만드는데 있어 좀 과할 수 있습니다. 또한 CQRS는 특정 기술이라기 보다는 패턴이라고 보는 것이 더 적절한 설명이 될 것 같습니다. 즉, 필수사항이 아니란 애기입니다.

그럼에도 불구하고 CQRS 를 적용하는 이유는 비즈니스의 복잡도를 낮추고 성능을 끌어올릴 수 있는 방법이기 때문입니다. 특히 변화하는 비즈니스의 요구사항을 적용하는데에 있어 상당한 도움이 될 수 있습니다.

CQRS 는 **Command and Query Responsibility Segregation** 의 약자입니다. 단어 자체로만 해석하면 **명령과 조회에 대한 책임을 분리**한다는 뜻입니다. CQRS 는 특정 기술을 이야기하는 것이 아닌 단순한 패턴이라고 보는 것이 더 맞습니다. 보통 CQRS 에 대해서 이야기 할때 [DDD (Domain Driven Design)](https://martinfowler.com/bliki/DomainDrivenDesign.html) 와 같이 언급되는 경우가 많은데, 꼭 DDD 의 하위 패턴이거나 구현체를 뜻하지도 않습니다.

전통적으로 비즈니스 애플리케이션에서는 비즈니스를 표현한다는 것은 데이터의 결과로 표현되는 경우가 많습니다. 즉, 어떠한 객체 혹은 데이터의 상태라고 볼 수 있습니다. 데이터는 CRUD (Create, Read, Update, Delete)로 설명할 수 있는데, CRUD 중에서 압도적으로 많은 비중이 Read (SELECT) 입니다. 상대적으로 CUD 는 객체의 상태를 변경하는 트랜잭션에서 사용하게 되고, 대부분 SELECT 라고 봐도 무방합니다. 여기서 CUD 와 R 을 분리하여 애플리케이션의 성능을 올리고 복잡성을 낮출 수 있다면 좋을 것 같다는 생각을 할 수 있습니다. (~~이 패턴이 이렇게해서 탄생되었다라는 뜻은 아닙니다.~~)

현재 Api 의 endpoint 가 전통적인 CRUD 의 전형적인 구현입니다. GET(SELECT), POST(CREATE), PUT(UPDATE), DELETE 를 통해 Todo item 을 DB 에 저장/수정/삭제하고 조회할 수 있습니다.
```csharp
public interface ITodoService
{
  Task<ActionReusult<IEnumerable<TodoItemDTO>>> GetTodoItems();
  Task<ActionResult<TodoItemDTO>> GetTodoItem(long id);
  Task<IActionResult> UpdateTodoItem(long id, TodoItemDTO todoItemDTO);
  Task<ActionResult> CreateTodoItem(TodoItemDTO todoItemDTO);
  Task<IActionResult> DeleteTodoItem(long id);
}
```
이 endpoint 들을 CQRS 방식으로 변경해본다면 대충 다음과 같이 될 것 같습니다.
```csharp
public interface ITodoCommandService
{
  Task<IActionResult> UpdateTodoItem(long id, TodoItemDTO todoItemDTO);
  Task<ActionResult> CreateTodoItem(TodoItemDTO todoItemDTO);
  Task<IActionResult> DeleteTodoItem(long id);
}

public interface ITodoQueryService
{
  Task<ActionReusult<IEnumerable<TodoItemDTO>>> GetTodoItems();
  Task<ActionResult<TodoItemDTO>> GetTodoItem(long id);
}
```
간단하게 Command (데이터의 상태 변화) 와 Query (데이터 조회) 로 분리했습니다. 굳이 이렇게 분리해야 될까 싶지만 이러한 분리가 비즈니스를 구현하는데에 있어 유연함을 제공해 줄 수 있습니다. (~~코딩의 복잡도는 증가할 수 있습니다.~~)

일반적으로 데이터의 쓰기 작업(CUD)는 읽기 작업(R)보다 상대적으로 빈도가 낮습니다. 모델과 데이터 베이스를 분리하여 각 부분별로 독립적으로 확장하고 심지어 다른 개발기술로 구현하여 비즈니스의 확장을 효율적으로 처리할 수 있게 됩니다.

추가적으로 CQRS 는 보통 ES (Event Sourcing) 과 같이 구현되는 경우가 많은데 CQRS 를 이해하다 보면 왜 ES 와 함께 구현이 되는지 알 수 있습니다.

![CQRS diagram](./images/todo/cqrs.pattern.1.png) _CQRS Journey [MSDN](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/jj554200(v=pandp.10))_

CQRS / ES 에 대한 내용은 꽤 방대해질 수 있는 주제이므로 추후 다른 포스트에서 좀 더 다루기로 하고 간단하게 CQRS / ES 의 장단점을 정리하고 Todo App 에 CQRS / ES 를 적용해 보겠습니다.

**CQRS / ES 장점**
- 성능과 확장성을 개선하고 동시성 문제를 처리하기 적합
- 상대적으로 덜 복잡한 도메인 모델과 단순한 쿼리 모델 구현 가능
- 교착상태 제거
- Audit trail 및 특정 시점의 객체(데이터) 상태 추적 가능
- 테스트 용이
- 비즈니스 유연성 증가

**CQRS / ES 단점**
- 읽기/쓰기 모델 동기화
- 유지 보수 및 관리 비용이 상대적으로 증가
- 개발자 러닝커브 증가

::: tip CQRS 참고자료
- [CQRS by Martin Fowler](https://martinfowler.com/bliki/CQRS.html)
- [CQRS, Task Based UIs, Event Sourcing agh! by Greg Young](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)
- [Event Sourcing by Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)
- [이벤트 소싱 패턴](https://docs.microsoft.com/ko-kr/azure/architecture/patterns/event-sourcing)
- [DDD 및 CQRS 패턴을 사용하여 마이크로 서비스에서 비즈니스 복잡성 처리](https://docs.microsoft.com/ko-kr/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/)
- [microsoftarchive / cqrs-journey](https://github.com/microsoftarchive/cqrs-journey)
- [DDD CQRS Event Sourcing community](https://github.com/ddd-cqrs-es)
:::

### Api 에 CQRS 적용 (간소화 버전)

TodoItem 의 변경 이력을 보고 싶다고 가정하겟습니다. TodoItem 을 언제 생성했고, 언제 completed 했으며 중간에 incompleted 로 변경했었다가 나중에 완료했다는 상황을 가정합니다. 다시한번 언급하자면 CQRS 적용은 필수사항이 아닙니다.

Command 는 어떠한 행동이기 때문에 **현재형 \(present tense\)**을 쓰고, Event 는 Command 의 결과이기 때문에 **과거형 \(past tense\)**으로 만들겠습니다.

먼저 비즈니스의 요구사항에 따라 Command 와 Event 를 정의합니다.
1. Command  
   - CreateTodoItem: TodoItem 을 생성합니다.
   - ChangeTodoItemName: TodoItem 의 이름을 변경합니다.
   - CompleteTodoItem: TodoItem 을 완료합니다.
   - IncompleteTodoItem: TodoItem 을 미완료 상태로 변경합니다.
2. Event  
   - CreatedTodoItem: TodoItem 이 생성됐습니다.
   - ChangedTodoItemName: TodoItem 의 이름이 변경됐습니다.
   - CompletedTodoItem: TodoItem 이 완료됐습니다.
   - InCompletedTodoItem: TodoItem 이 미완료료 상태로 변경됐습니다.

### API Gateway (upcoming)
