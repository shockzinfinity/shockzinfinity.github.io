---
sidebar: auto
---

# GitLab

[[toc]]

## docker run

```bash
$ docker run --detach --publish 8001:80 --publish 8002:443 --publish 8003:22 --name gitlab --restart always --volume /home/shockz/docker/gitlab/config:/etc/gitlab --volume /home/shockz/docker/gitlab/logs:/var/log/gitlab --volume /home/shockz/docker/gitlab/data:/var/opt/gitlab gitlab/gitlab-ee:latest

# 참고 cer => crt
$ openssl x509 -in shockz.io.cer -out shockz.io.crt

# 시간대 변경
$ docker exec -it -u 0 xwiki bash
$ unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime # in xwiki shell
$ date

# gitlab.rb 설정
# 사전에 다운로드 받은 ca.cer, shockz.io.cer, shockz.io.key 파일들을 ssl 디렉토리로 복사
external_url 'https://git.shockz.io'
nginx['redirect_http_to_https'] = false
nginx['redirect_http_to_https_port'] = 80
nginx['ssl_client_certificate'] = "/etc/gitlab/ssl/ca.cer"
nginx['ssl_certificate'] = "/etc/gitlab/ssl/shockz.io.cer"
nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/shockz.io.key"

# 시간대 설정
gitlab_rails['time_zone'] = 'Asia/Seoul'

# smtp 설정
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.daum.net"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "shockz99"
gitlab_rails['smtp_password'] = "패스워드"
gitlab_rails['smtp_domain'] = "shockz.io"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = false
gitlab_rails['smtp_tls'] = true

# ldap 관련 설정
gitlab_rails['ldap_enabled'] = true
gitlab_rails['ldap_servers'] = YAML.load <<-'EOS'
  main: # 'main' is the GitLab 'provider ID' of this LDAP server
    label: 'LDAP'
    host: '192.168.0.99' # NAS 주소
    port: 389
    uid: 'uid'
    bind_dn: 'uid=root,cn=users,dc=ldap,dc=com'
    password: 'Directory Server 패스워드'
    encryption: 'plain' # "start_tls" or "simple_tls" or "plain"
    verify_certificates: true
    smartcard_auth: false
    active_directory: false
    allow_username_or_email_login: false
    lowercase_usernames: false
    block_auto_created_users: false
    base: 'dc=shockz,dc=io'
    user_filter: ''
EOS
```

## NAS 역방향 프록시 설정

![reverse proxy](./image/gitlab.reverse.proxy.png)

## 기타 설정

- Admin Area > Visibility and access control > default project visibility : internal
- Enabled Git Access protocols : Only HTTP(s)
- Sign-up enabled off
- 각 프로젝트 > Settings > integrations > External Wiki : https://wiki.shockz.io
- 각 프로젝트 > Settings – Visibility, project features, permissions > Wiki : off

> 기본 그룹

- shockz.io – 전사 공통. 회사 인프라. 사내 업무관련
- team – 팀별 그룹. 하위에 sub group으로 각 팀이 있습니다.
- study – pet project. study project. forked, cloned.
- project – 회사에서 진행하는 모든 프로덕트 프로젝트가 있으며, 각 프로젝트 별로 sub group이 있습니다.

> 개인별 task 프로젝트 기본 생성 원칙

> External Wiki
> ![default wiki off](./image/gitlab.wiki.3.png)  
> ![default wiki off](./image/gitlab.wiki.4.png)  
> ![external wiki on](./image/gitlab.wiki.1.png)  
> ![external wiki on](./image/gitlab.wiki.2.png)

> Slack notification
> ![incoming webhook add](./image/gitlab.slack.3.png) > ![incoming webhook add](./image/gitlab.slack.4.png) > ![gitlab slack notification](./image/gitlab.slack.1.png) > ![gitlab slack notification](./image/gitlab.slack.2.png)

::: danger
test danger
:::
