---
title: AWS
lang: ko-KR
meta:
  - name: description
    content: aws 관련 내용
  - name: keywords
    content: 'aws, redis, docker'
tags:
  - aws
  - redis
  - docker
  - docker-compose
feed:
  enable: true
  title: AWS
  description: aws 관련 내용
  image: /public/img/logo.png
  author:
    - name: shockz
      email: shockzinfinity@gmail.com
      link: 'https://shockzinfinity.github.io/dev-log/aws.html'
created: '2020-11-10'
updated: '2025-10-20'
---

# AWS 관련 설정 및 팁

<TagLinks />

[[toc]]

## AWS EC2 Linux 2 에 Docker 설치

```bash
$ sudo yum update
$ sudo yum install git
$ sudo yum install docker
$ sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ sudo service docker start
$ sudo usermod -aG docker $USER
```

## ssh console 에서 s3 접근

```bash
$ aws configure
access key : <액세스 키 입력>
secret key : <시크릿 키 입력>
default region : <리전 입력>

$ aws s3 cp s3://주소/20201108_170001_bak.db.sql ./
```

## AWS docker test

- ubuntu 20.04 ami
- t2.micro instance
- `ssh -i key.pem ubuntu@xxx.xxx.xxx.xxx`

### mosh 설치

```bash
$ sudo apt install mosh
# 60000-61000/udp 보안그룹에 추가
```

### jupyter notebook 설치 (웹콘솔을 위한...)

```bash
$ sudo apt update
$ sudo apt install python3-pip

# jupyter notebook 설치
$ sudo pip3 install notebook

# notebook password 설정
$ python3
>>> from notebook.auth import passwd
>>> passwd()
>>> exit()

# sudo 로 config 파일을 생성할 경우 root 디렉토리에 생성됨.
$ jupyter notebook --generate-config
Writing default config to: /home/ubuntu/.jupyter/jupyter_notebook_config.py
$ vi /home/ubuntu/.jupyter/jupyter_notebook_config.py
```

- notebook config 수정 (제일 아래에 작성)

```python
c = get_config()
c.NotebookApp.password = '생성된 패스워드' # 위에서 생성한 패스워드
c.NotebookApp.ip = 'xxx.xxx.xxx.xxx' # 현재 인스턴스 아이피
c.NotebookApp.notebook_dir = '/' # 최상위 디렉토리 지정
```

```bash
$ jupyter notebook --allow-root

# Ctrl-Z 로 background
$ bg
[1]+  Stopped                 jupyter-notebook --allow-root
$ disown -h # 소유권 릴리즈

# netstat, ifconfig 등이 없을 경우
$ sudo apt install net-tools

$ netstat -nap | grep 8888
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 xxx.xxx.xxx.xxx:8888       0.0.0.0:*               LISTEN      8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53741    ESTABLISHED 8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53742    ESTABLISHED 8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53740    ESTABLISHED 8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53743    ESTABLISHED 8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53739    ESTABLISHED 8799/python3
tcp        0      0 xxx.xxx.xxx.xxx:8888       xxx.xxx.xxx.xxx:53738    ESTABLISHED 8799/python3

# kill PID
$ kill -9 8389
```

- ssl 적용

```bash
# 자체서명 인증서
$ mkdir ssl && cd ssl
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout "cert.key" -out "cert.pem" -batch
Generating a RSA private key
...............+++++
....+++++
writing new private key to 'cert.key'
-----

$ vi ~/.jupyter/jupyter_notebook_config.py
...
c.NotebookApp.certfile = u'/home/ubuntu/ssl/cert.pem'
c.NotebookApp.keyfile = u'/home/ubuntu/ssl/cert.key'
...

# 시스템 서비스로 만들기
$ sudo vi /etc/systemd/system/jupyter.service
[Unit]
Description=Jupyter Notebook Server

[Service]
Type=simple
User=ubuntu
ExecStart=/usr/bin/sudo /usr/local/bin/jupyter notebook --allow-root --config /home/ubuntu/.jupyter/jupyter_notebook_config.py

[Install]
WantedBy=multi-user.target

$ sudo systemctl daemon-reload
$ sudo systemctl enable jupyter
$ sudo systemctl start jupyter
$ sudo systemctl status jupyter
$ sudo systemctl restart jupyter
```

### docker 설치

```bash
$ sudo apt update
$ sudo apt install apt-transport-https
$ sudo apt install ca-certificates
$ sudo apt install curl
$ sudo apt install software-properties-common

# docker 설치
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$ sudo apt update
$ apt-cache policy docker-ce
$ sudo apt install docker-ce
$ sudo systemctl status docker

$ sudo usermod -aG docker $USER
```

### apache + php5.6 docker

```docker
FROM ubuntu:18.04
MAINTAINER temp <temp@temp.io>

# Avoiding user interation with tzdata
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y apache2
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ondrej/php
RUN apt-get update
RUN apt-get install -y php5.6

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]
```

```bash
$ docker run -p 80:80 -v /home/ubuntu/example/html:/var/www/html example
```

### mysql

```bash
$ docker run -d -p 9876:3306 -e MYSQL_ROOT_PASSWORD=password mysql:5.6
$ docker exec -it 5bb05609cbe4 /bin/bash
5bb05609cbe4$ mysql -uroot -ppassword
mysql> CREATE DATABASE TEST;
mysql> SHOW DATABASES;
mysql> \q
5bb05609cbe4$ exit

$ sudo apt install mysql-client-core-8.0
# docker inspect 로 나오는 ip 혹은 로컬
$ mysql -uroot -p --host 172.17.0.2 --port 3306
$ mysql -uroot -p --host 127.0.0.1 --port 9876

# mysql 유저 생성
mysql> CREATE USER 'test'@'%' IDENTIFIED BY 'password';
Query OK, 0 rows affected (0.00 sec)

mysql> GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';
Query OK, 0 rows affected (0.00 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)

$ docker restart 5bb05609cbe4
```

### php, mysql 연결

```bash
$ vi ~/example/Dockerfile
...
RUN apt-get install -y php5.6-mysql
...

$ docker build -t example .
```
