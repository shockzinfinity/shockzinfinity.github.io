---
title: ef core
lang: ko-KR
meta:
  - name: description
    content: EntityFrameworkCore 관련
  - name: keywords
    content: ef core
tags: ["ef core"]
sidebar: auto
feed:
  enable: true
  title: ef core
  description: EntityFrameworkCore 관련 내용을 다룹니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/efcore.html
---

# ef core

<TagLinks />

[[toc]]

## ef core tool 설치
> docker 로 .net core app 을 실행 시에 ef core migration 이 필요한 경우가 있음  
> csproj에 ef core tool 을 포함시킬 경우는

```bash
$ dotnet add package Microsoft.EntityFrameworkCore.Design # project 에 직접 포함 (패키지 관리자 콘솔용)
# or
$ dotnet tool install --global dotnet-ef # cli 방식
```

## ef core migration

> migration 생성 및 업데이트

```bash
$ dotnet ef migrations add AddColumn --project coreTodoApi.csproj
$ dotnet ef database update --project coreTodoApi.csproj
```

> scaffolding
```bash
$ dotnet ef dbcontext scaffold "Server=localhost;Database=todos;Integrated Security=false;User ID=sa;Password=y0urStrong!Password;" Microsoft.EntityFrameworkCore.SqlServer -o Models
$ dotnet ef dbcontext scaffold "Server=localhost;Database=todos;Integrated Security=false;User ID=sa;Password=y0urStrong!Password;" Microsoft.EntityFrameworkCore.SqlServer -o Models -t TodoItems -t 테이블명 --context-dir Models -c TodoContext --context-namespace Todo.Api
```

> api 등이 시작되는 시점에서 db migration 하도록 설정하기 위해서는

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
  //   services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
  services.AddDbContext<TodoContext>(opt => opt.UseSqlServer("connectionString"));
  services.AddControllers();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
  // DbContext migrate
  if(app.ApplicationServices.GetService<TodoContext>().Database.GetPendingMigrations().Any())
  {
    app.ApplicationServices.GetService<TodoContext>().Database.Migrate();
  }
}
```

## Reference
- [package management console](https://docs.microsoft.com/ko-kr/ef/core/miscellaneous/cli/powershell)
- [cli](https://docs.microsoft.com/ko-kr/ef/core/miscellaneous/cli/dotnet)
- [리버스엔지니어링](https://docs.microsoft.com/ko-kr/ef/core/managing-schemas/scaffolding?tabs=dotnet-core-cli)
