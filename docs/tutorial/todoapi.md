---
title: Todo Api tutorial
lang: ko-KR
meta:
  - name: description
    content: nginx(reverse proxy), .net core, mssql, dockerized
  - name: keywords
    content: todoapi
tags: ["todoapi", ".net core", "nginx", "mssql", "docker"]
sidebar: auto
---

# Todo Api

> 부제: Todo App 을 만드는 복잡한 방법

[[toc]]

---

## 개요

> Todo App을 다양한 기술 스택을 이용하여 구현

## Tools (Prerequisite)

- ASP.NET core 3.1
- MS SQL Server 2019
- Docker
- Nginx
- SSL
- Swagger (Not yet)
- Seq (Not yet)
- CQRS (Not yet)
- FluntValidation (Not yet)
- Automapper (Not yet)
- Vue.js (Not yet)

## Step

### Dockerize Web API

- [dotnet core sdk](https://dotnet.microsoft.com/download) 설치
   mac 혹은 linux 에서 sdk 설치는 [dotnet core in CentOS 8 & mac](../dev-log/dotnetcore) 참조
- vscode 와 같은 IDE + C# extensions 혹은 Visual Studio 2019 Community
```bash
$ mkdir todoCore3 && cd todoCore3
$ dotnet new sln --name todoCore3
$ dotnet new webapi --name todoCore3.Api
$ dotnet sln add todoCore3.Api/todoCore3.Api.csproj
```

- 추후 db 연결을 위하여 패키지 미리 설치
```bash
$ dotnet add package Microsoft.EntityFrameworkCore.SqlServer
$ dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

- Ctrl+F5 등으로 앱 실행 후 브라우저에서 `https://localhost:5001/weatherforecast` 접속
- `.gitignore` 추가 후 git repository 초기화
- [gitignore github](https://github.com/github/gitignore) 참조
```bash
$ git init
$ git remote add origin https://git.shockz.io/shockz/todocore3.git
$ git add .
$ git commit -m "Initial commit"
$ git push -u origin master
$ git lfs install
$ git flow init
```

- `Startup.cs` 수정
- Configure 메서드 내의 **app.UseHttpsRedirection();** 제거
- ForwardHeaders 삽입
```csharp
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
```

- [Postman](https://www.postman.com/downloads/) 등으로 기본 테스트
   ![postman](./images/todo/postman.test.1.png)
- `TodoItem.cs` 모델을 `Models` 폴더에 추가
```csharp
namespace todoCore3.Api.Models
{
	public class TodoItem
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public bool IsCompleted { get; set; }
	}
}
```
- `TodoContext.cs` 추가
```csharp
using Microsoft.EntityFrameworkCore;

namespace todoCore3.Api.Models
{
	public class TodoContext : DbContext
	{
		public TodoContext(DbContextOptions<TodoContext> options) : base(options)
		{
		}

		public DbSet<TodoItem> TodoItems { get; set; }
	}
}
```
- SQL Server DbContext 마이그레이션을 위한 sql container 생성 ([참조](../dev-log/mssql))
   - Todo Api 내에서 connection string 단순화를 위해 docker network 생성 및 연결
   - data 보존을 위해 docker data volume 생성
```bash
# network 생성
$ docker network create todoCore3
$ docker network ls

# volume 생성
$ docker volume create sql_data
$ docker volume ls

# sql container run
$ docker run -d -p 1433:1433 -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=y0urStrong!Password" --network=todoCore3 --name sql2 -v sql_data:/var/opt/mssql mcr.microsoft.com/mssql/server:2019-latest

# 추후 백업을 위한 디렉토리 생성
$ docker exec -d sql2 mkdir /var/opt/mssql/backup
```

- Api 시작 시 db migration 을 위한 작업
   - `Startup.cs` 의 `ConfigureServices()`에 **DbContext** DI(종속성 주입)
   - EntityFrameworkCore.Design 추가
   - ef core cli 설치
   - migration 생성
```csharp
public void ConfigureServices(IServiceCollection services)
{
  services.AddDbContext<TodoContext>(opt => opt.UseSqlServer("Data Source=localhost;Database=todos;Integrated Security=false;User ID=sa;Password=y0urStrong!Password;"));
  ...
}
```
```bash
# ef core 를 위한 tool 업데이트
$ dotnet tool install --global dotnet-ef
# or
$ dotnet tool update -g dotnet-ef

# migration 생성
$ dotnet ef migrations add CreateTodoItem --project todoCore3.Api.csproj
# migration 취소
$ dotnet ef migrations remove
# db update
$ dotnet ef database update --project todoCore3.Api.csproj
```
- 생성확인
   ![efcore](./images/todo/efcore.1.png)
   ![efcore](./images/todo/efcore.2.png)

- api Controller scaffolding
```bash
$ dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
$ dotnet tool install --global dotnet-aspnet-codegenerator
$ dotnet tool update -g dotnet-aspnet-codegenerator
$ dotnet aspnet-codegenerator controller -name TodoItemsController -async -api -m TodoItem -dc TodoContext -outDir Controllers
```

- POST method 조정
```csharp{9}
// POST: api/TodoItems
[HttpPost]
public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
{
  _context.TodoItems.Add(todoItem);
  await _context.SaveChangesAsync();

  //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
  return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
}
```

- Postman 확인
```json
{
  "name": "test Todo 1",
  "IsCompleted": false
}
```
   ![postman](./images/todo/postman.test.2.png)
   ![postman](./images/todo/postman.test.3.png)

::: warning
과도한 게시 방지를 위한 DTO 사용 부분은 추후 업데이트 예정 (2020.9.9)
:::

### Containerize

- `Api.Dockerfile` 을 프로젝트 폴더에 추가
```docker
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["todoCore3.Api.csproj", "./"]
RUN dotnet restore "./todoCore3.Api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "todoCore3.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "todoCore3.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS http://*:5000
ENTRYPOINT ["dotnet", "todoCore3.Api.dll"]
```
- build & run
```bash
$ docker build -t todo-api -f Api.Dockerfile .
$ docker run -d -p 5000:5000 --name todo-api todo-api
```

### Nginx 연결

### Wrap up

## Conclusion

## Reference

- [RealWorld](https://github.com/gothinkster/realworld)
- [자습서: ASP.NET Core를 사용하여 웹 API 만들기](https://docs.microsoft.com/ko-kr/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)
