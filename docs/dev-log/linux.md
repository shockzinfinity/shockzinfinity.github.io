---
title: Linux 사용 일반
lang: ko-KR
meta:
  - name: description
    content: Linux 사용에 대한 일반적인 내용을 담고 있습니다.
  - name: keywords
    content: linux
tags: ["linux"]
sidebar: auto
feed:
  enable: true
  title: Linux 사용 일반
  description: Linux 사용에 대한 일반적인 내용을 담고 있습니다.
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/dev-log/linux.html
---

# Linux General

<TagLinks />

[[toc]]

## 디스크 사용량 및 여유공간 확인

- Disk Usage (du)
   > -h 옵션은 용량을 보기 쉽게...
```bash
# 현재 디렉토리 사용량
$ du -sh
$ du -sh /var/www/vhosts/webroot/wp-content/*

# 현재 디렉토리 하위 모든 디렉토리 사용량
$ du -ch

# depth 지정하여 사용량 현황 보기
$ du -hd 3 /var/www/vhosts/webroot/wp-content/*

# 디스크 여유공간 확인
$ df -h

# 현재 디렉토리 용량 상위 10개
$ du -hsx * | sort -rh | head -n 10
```

## find

```bash
# temp 포함하는 파일 찾기
$ find . -name "*temp*"

# 파일 크기에 따른 검색
# 1024 바이트 초과, 2048 바이트 미만 검색
$ find . -size +1024c -and -size -2048c

# 크기 0인 파일 찾기
$ find . -empty

# find + ls
$ find . -name "*.c" -exec ls -l {} \;
```

| 설명                                                        | 명령                                       |
| ----------------------------------------------------------- | ------------------------------------------ |
| 현재 디렉토리에 있는 파일 및 디렉토리 리스트 표시           | find                                       |
| 대상 디렉토리에 있는 파일 및 디렉토리 리스트 표시           | find [PATH]                                |
| 현재 디렉토리 아래 모든 파일 및 하위 디렉토리에서 파일 검색 | find . -name [FILE]                        |
| 전체 시스템(루트 디렉토리)에서 파일 검색                    | find / -name [FILE]                        |
| 파일 이름이 특정 문자열로 시작하는 파일 검색                | find . -name "STR*"                        |
| 파일 이름에 특정 문자열이 포함된 파일 검색                  | find . -name "*STR*"                       |
| 파일 이름이 특정 문자열로 끝나는 파일 검색                  | find . -name "*STR"                        |
| 빈 디렉토리 또는 크기가 0인 파일 검색                       | find . -empty                              |
| 특정 확장자를 가진 모든 파일 검색 후 삭제                   | find . -name "*.EXT" -delete               |
| 검색된 파일 리스트를 줄 바꿈 없이 이어서 출력하기           | find . -name [FILE] -print0                |
| 파일 또는 디렉토리만 검색하기                               | find . -name [FILE] -type f                |
| 파일 크기를 사용하여 파일 검색                              | find . -size +[N]c -and -size -[M]c        |
| 검색된 파일에 대한 상세 정보 출력. (find + ls)              | find . -name [FILE] -exec ls -l {} \;      |
| 검색된 파일의 라인 수 출력. (find + wc)                     | find . -name [FILE] -exec wc-l {} \;       |
| 검색된 파일에서 문자열 찾기. (find + grep)                  | find . -name [FILE] -exec grep "STR" {} \; |
| 검색 결과를 파일로 저장. (find, redirection)                | find . -name [FILE] > [SAVE_FILE]          |
| 검색 중 에러 메시지 출력하지 않기 (find, redirection)       | find . -name [FILE] 2> /dev/null           |
| 하위 디렉토리 검색하지 않기                                 | find . -maxdepth 1 -name [FILE]            |
| 검색된 파일 복사. (find + cp)                               | find . -name [FILE] -exec cp {} [PATH] \;  |

## ls

```bash
# 리스트 형태로 파일 및 디렉토리 이름만...
$ ls | tr '\n' '\n'
```

## tar.gz

```bash
# 압축
$ tar -zcvf [파일명.tar.gz] [폴더명]
# 특정 디렉토리, 파일 제외
$ tar cvzf [파일명.tar.gz] --exclude [파일 또는 폴더명] [폴더명]
# tar cvzf webroot.tar.gz --exclude "webroot/wp-content/uploads" webroot

# 풀기
$ tar -zxvf [파일명.tar.gz]
# 특정위치에 풀기 ( -C : Change directory)
$ tar -zxvf [파일명.tar.gz] -C /temp
```

## ssh 접속 기록, 접속자 현황 등

```bash
# ssh 접속 성공
$ last
# ssh 접속 실패
$ last -f /var/log/btmp

# 현재 로그인한 사용자 
$ user
$ who
$ who -auH
```

## ubuntu firewall

```bash
$ sudo ufw status

$ sudo iptables -L
```

## fail2ban

- 86400분 (60일) 동안
- 10회의 로그인을 실패하면
- 10800분 (180시간) 차단

```bash
$ apt-get install fail2ban

$ vi /etc/fail2ban/jail.conf
```
```bash
[DEFAULT]

## 차단하지 않을 IP
ignoreip = 127.0.0.1/8 192.168.10.0/24

# 접속을 차단할 시간. 600 = 10분
bantime  = 10800

# 최대 허용 횟수
maxretry = 10

#아래 시간동안 maxretry횟수만큼 실패시 차단
findtime  = 86400

# (선택) 메일 알림기능
destemail = sysadmin@example.com
sender = fail2ban@my-server.com
mta = sendmail
action = %(action_mwl)s

[sshd]
enabled = true

#여러 포트를 사용할 경우 port = ssh,10022
port = 22
filter = sshd
logpath = /var/log/auth.log
```
```bash
$ service fail2ban restart

# 현재 차단 현황
$ fail2ban-client status sshd

# 차단 풀기
$ fail2ban-client set sshd unbanip 000.000.000.000
```

## ubuntu update
> apt 는 apt-get 과 apt-cache 의 기능 중에서 잘 사용되지 않는 기능을 제외하고 만든 새로운 tool 이다.  
> apt-get 은 패키지 설치를 담당하고, apt-cache 는 패키지 검색을 담당하는 tool 이다.  
> apt-get 보다는 apt 사용이 권장된다.  
> apt (Advanced Packaging Tool)

```bash
# ubuntu version 확인
$ cat /etc/issue
$ lsb_release -a
$ cat /etc/*release

# 업데이트 목록 갱신
$ sudo apt update

# 현재 패키지 업그레이드
$ sudo apt upgrade

# 신규 업데이트 설치
$ sudo apt dist-upgrade
```

## ubuntu booting usb on mac

- usb umount 상태에서 시작
- [ubuntu image download](https://releases.ubuntu.com/20.04/) - 여기서는 desktop image 로 시작
- iso -> img
- .img.dmg 형태로 변환되어 저장되니, .dmg 를 삭제
```bash
$ hdiutil convert -format UDRW -o ~/Downloads/ubuntu-20.04.1-desktop-amd64.img ~/Downloads/ubuntu-20.04.1-desktop-amd64.iso
$ mv ~/Downloads/ubuntu-20.04.1-desktop-amd64.img.dmg ~/Downloads/ubuntu-20.04.1-desktop-amd64.img
```
- disk number 확인
- mount 되어 있다면 unmount 해야 만들수 있음.
```bash
$ diskutil list
$ diskutil unmountDisk /dev/disk2
$ sudo dd if=~/Downloads/ubuntu-20.04.1-desktop-amd64.img of=/dev/disk2 bs=1m
```
- 설치할 머신에서 해당 usb 로 부팅하여 설치 시작
- desktop 버전은 설치된 이후 기본적으로 ssh 가 비활성화 되어 있기때문에 ssh 는 별도 설치가 필요함
```bash
# on ubuntu machine
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install openssh-server
# 보안관련 설정 수정
$ sudo vi /etc/ssh/sshd_config

Port 22000
PermitRootLogin no
UsePrivilegeSeparation yes
PermitEmptyPasswords no
#PubkeyAuthentication yes # 추후 설정
#PasswordAuthentication no # 추후 설정
MaxAuthTries 5
LoginGraceTime 30

$ sudo systemctl enable ssh
$ sudo systemctl start ssh
```
::: tip
- ssh 키 복사 (대상: 192.168.10.1 일 경우)
```bash
$ ssh-copy-id -i ~/.ssh/id_rsa.pub temp@192.168.10.1
```
:::

## ubuntu zsh install

```bash
$ sudo apt install zsh
$ which zsh
/usr/bin/zsh
$ chsh -s /usr/bin/zsh

# logout / login
# This is the Z Shell configuration function for new users,
# zsh-newuser-install.
# You are seeing this message because you have no zsh startup files
# (the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
# ~).  This function can help you with a few settings that should
# make your use of the shell easier.
# 
# You can:
# 
# (q)  Quit and do nothing.  The function will be run again next time.
# 
# (0)  Exit, creating the file ~/.zshrc containing just a comment.
#      That will prevent this function being run again.
# 
# (1)  Continue to the main menu.
# 
# (2)  Populate your ~/.zshrc with the configuration recommended
#      by the system administrator and exit (you will need to edit
#      the file by hand, if so desired).
# 
# --- Type one of the keys in parentheses ---
# 2 번 선택

$ echo $SHELL
$ $SHELL --version
zsh 5.8 (x86_64-ubuntu-linux-gnu)

# curl, wget, git, git-lfs, git-flow 설치
$ sudo apt install curl wget git git-lfs git-flow

# oh-my-zsh install
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# powerlevel10k theme 설치
# .zshrc 에서 ZSH_THEME="powerlevel10k/powerlevel10k" 변경
$ git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# zsh-completions, zsh-syntax-highlighting, zsh-autosuggestions 설치
$ git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
# plugin 에 추가

# fzf (fuzzy finder)
$ git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
$ ~/.fzf/install

# powerline font 설치
$ git clone https://github.com/powerline/fonts.git && cd fonts
$ ./install.sh

# neovim 설치
$ sudo apt install neovim
$ vi ~/.zshrc
...
alias vim="nvim"
alias vi="nvim"
alias vimdiff="nvim -d"
export EDITOR=/usr/local/bin/nvim
...
$ source ~/.zshrc

# spacevim 설치
$ curl -sLf https://spacevim.org/install.sh | bash
$ mkdir ~/.SpaceVim.d/colors
$ curl https://gist.githubusercontent.com/subicura/91696d2da58ad28b5e8b2877193015e1/raw/6fb5928c9bda2040b3c9561d1e928231dbcc9184/snazzy-custom.vim -o ~/.SpaceVim.d/colors/snazzy-custom.vim
$ vi ~/.SpaceVim.d/init.toml
...
[options]
  colorscheme = "snazzy-custom"
  enable_guicolors = true
  statusline_separator = "arrow"
  enable_tabline_filetype_icon = true
  enable_statusline_mode = true
  statusline_unicode_symbols = true
...

# vimproc_linux64.so is not found 에러시
$ sudo apt install gcc make
$ cd ~/.SpaceVim/bundle/vimproc.vim
$ make
```

## ubuntu docker install

```bash
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
$ sudo apt update && sudo apt -y upgrade
$ sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt update
$ sudo apt install -y docker-ce docker-ce-cli containerd.io
$ docker ps -a
$ docker run hello-world
$ docker ps -a
# docker-compose for all user
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

## 대상 서버에 ssh key 로 접속

```bash
# 키 생성 시 passphrase 를 입력하지 않으면 비밀번호 입력 없이 키를 사용할 수 있게됨.
$ ssh-keygen -t rsa
# 연결할 서버에 생성된 키를 복사
$ ssh-copy-id -i ~/.ssh/id_rsa.pub -p <port> id@address
```

## sudo 사용 시 패스워드 없이 사용하고자 할때

```bash
$ sudo vi /etc/sudoers
# or
$ echo 'id ALL=NOPASSWD: ALL' >> /etc/sudoers
```

## cifs (윈도우 공유폴더용 프로토콜) 마운트

```bash
$ sudo apt install cifs-utils
$ sudo mount -t cifs -o username=shockz //192.168.0.99/photo ~/synology
$ df -h
Filesystem            Size  Used Avail Use% Mounted on
...
//192.168.0.99/photo  7.0T  1.8T  5.2T  26% /home/shockz/synology
```

## /var/log 용량관리를 위한 crontab

```bash
# crontab -e 를 통해 다음을 추가
10 5 * * * find /var/log/ -mtime +10 -type f -ls -exec rm {} \;
```
- 매일 5시 10분에 /var/log 에서 현재시각 기준 10일전 일반 파일들 검색하여 삭제
  > pmlogger 용량이 과도하게 늘어나는 상황때문에 추가함.
  > [crontab 시간 설정 참고](https://ponyozzang.tistory.com/402)

## sudoers 에서 NOPASSWD 옵션이 안먹힐때

- /etc/sudoers 에 sudo 권한을 줄 사용자를 매핑하게 된다.
- 직접 접근하여 수정하는 것은 권장되지 않는다. (기본적으로 /etc/sudoers 는 440 으로 설정되어 있다.)
- 무리해서 쓰기 권한을 부여하여 수정하면 안된다.
- `sudo visudo` 를 통해 수정한다. (/tmp 에서 수정해서 적용하는 메커니즘)
```bash
# 일반적으로는 이런 라인을 추가하여 sudo 사용 시 패스워드 없이 가능하도록 설정한다.
username  ALL=(ALL) NOPASSWD:ALL
```
::: warning
- 주의해야 하는 부분은 sudoers 파일은 위에서 아래로 해석되므로 해당 사용자/그룹이 적용되는 sudo 원칙은 제일 아래에 있는 설정이 최종 적용된다.
- 특정 아이디에 패스워드 없이 sudo 권한 주겠다고 root 항목 밑에 삽입해서 적용해봤자 (~~본인의 경우~~)
- 아래의 %wheel 설정이 적용된다는 뜻이다.(wheel 그룹에 대한 설정이 보통 root 아래에 있다.)
- man 페이지에 나와있는 내용이었지만 애초에 man 페이지를 읽지 않았다...
:::

- `/etc/sudoers.d/{username}-sudoer 를 대신 이용
```bash
$ cd /etc/sudoers.d

# 파일 이름은 임의로 생성해도 됨
$ touch /etc/{username}-sudoer
$ vi /etc/{username}-sudoer

# username 이 test01 이라고 가정하고 아래의 라인을 추가 후 저장
test01 ALL=(ALL) NOPASSWD:ALL
```

## ubuntu docker.io

```bash
$ lsb_release -a # 리눅스 시스템 확인
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 20.04.2 LTS
Release:	20.04
Codename:	focal

$ sudo apt update && sudo apt upgrade
$ sudo apt install docker.io
$ sudo apt install docker-compose
$ sudo usermod -aG docker ubuntu # username 이 ubuntu 라고 가정, 추가 후 재로그인
$ sudo systemctl enable --now docker
$ docker version
Client:
 Version:           19.03.8
 API version:       1.40
 Go version:        go1.13.8
 Git commit:        afacb8b7f0
 Built:             Fri Dec 18 12:15:19 2020
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          19.03.8
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.13.8
  Git commit:       afacb8b7f0
  Built:            Fri Dec  4 23:02:49 2020
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.3.3-0ubuntu2.2
  GitCommit:
 runc:
  Version:          spec: 1.0.1-dev
  GitCommit:
 docker-init:
  Version:          0.18.0
  GitCommit:
```

## linux 명령어 설명

- ; : 앞의 명령어가 실패해도 다음 명령어가 실행
- && : 앞의 명령어가 성공했을 때 다음 명령어가 실행
- & : 앞의 명령어를 백그라운드로 돌리고 동시에 뒤의 명령어를 실행
```bash
$ mkdir test;cd test
$ mkdir test; cd test; touch abc
# 실패하면 뒤는 실행이 안됨
$ mkdir test(실패) && cd test && touch abc
$ mkdir test3 && { cd test3; touch abc; echo 'success!!' } || echo 'There is no dir';
```

## ubuntu zombie process kill

> ` => There is 1 zombie process.` 
```bash
$ ps -elf --forest | grep -C5 '<[d]efunct>'
$ sudo kill -9 <parent process number>
```


## node_modules, bin, obj, packages, .vs 일괄 삭제

```bash
$ find . -name 'node_modules' -type d -prune
$ find . -name 'node_modules' -type d -prune -exec rm -rf {} +
$ find . -name 'bin' -type d -prune -exec rm -rf {} +
$ find . -name 'obj' -type d -prune -exec rm -rf {} +
$ find . -name 'packages' -type d -prune -exec rm -rf {} +
$ find . -name '.vs' -type d -prune -exec rm -rf {} +
```
