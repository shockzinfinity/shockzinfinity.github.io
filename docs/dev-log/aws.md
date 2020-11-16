---
title: AWS
lang: ko-KR
meta:
  - name: description
    content: aws 관련 내용
  - name: keywords
    content: aws, redis, docker
tags: ["aws", "redis", "docker", "docker-compose"]
sidebar: auto
feed:
  enable: true
  title: AWS
  description: aws 관련 내용
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/aws.html
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
- `ssh -i key.pem ubuntu@xxx.xxx.xxx.xxx

### jupyter notebook 설치 (웹콘솔을 위한...)

```bash
$ sudo apt-get update
$ sudo apt-get install python3-pip

# jupyter notebook 설치
$ sudo pip3 install notebook

# notebook password 설정
$ python3
>>> from notebook.auth import passwd
>>> passwd()
>>> exit()

# sudo 로 config 파일을 생성할 경우 root 디렉토리에 생성됨.
$ jupyter-notebook --generate-config
Writing default config to: /home/ubuntu/.jupyter/jupyter_notebook_config.py
$ vi /home/ubuntu/.jupyter/jupyter_notebook_config.py
```

- notebook config 수정
```python
c = get_config()
c.NotebookApp.password = '생성된 패스워드'
c.NotebookApp.ip = 'xxx.xxx.xxx.xxx'
c.NotebookApp.notebook_dir = '/'
```
```bash
$ jupyter-notebook --allow-root

# Ctrl-Z 로 background
$ bg
[1]+  Stopped                 jupyter-notebook --allow-root
$ disown -h # 소유권 릴리즈
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
ExecStart=/usr/bin/sudo /usr/local/bin/jupyter-notebook --allow-root --config /home/ubuntu/.jupyter/jupyter_notebook_config.py

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
