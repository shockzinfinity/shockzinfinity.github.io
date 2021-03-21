---
title: Windows 개발 환경 관련
lang: ko-KR
meta:
  - name: description
    content: Windows 개발 환경 구성 시 참고
  - name: keywords
    content: windows, development, env
tags: ["windows", "dev", "env"]
sidebar: auto
feed:
  enable: true
  title: Windows 개발 환경 관련
  description: Windows 개발 환경 구성 시 참고
  image: /public/img/logo.png
  author:
    -
      name: shockz
      email: shockzinfinity@gmail.com
      link: https://shockzinfinity.github.io/etc/windows.html
---

# Windows 개발 환경 구성

<TagLinks />

[[toc]]

## Cmder + Windows Terminal

- Cmder 위치
    %APPDATA%\Cmder
- 환경 변수 세팅
    CMDER_ROOT, CmdEmuDir
- UTF-8 세팅
    chcp utf-8
- 기본 환경 설정

- Windows Terminal 연계
    default setting 변경
- Windows Terminal 세팅
    기타 설정
![windows.cmder](./image/windows.cmder.1.png)
![windows.cmder](./image/windows.cmder.2.png)
![windows.cmder](./image/windows.cmder.3.png)

## yarn global path 지정

```bash
$ yarn global bin
C:\Users\user\AppData\Local\Yarn\bin
```
- 해당 path를 windows path 변수에 등록
![windows.path](./image/windows.path.1.png)

## 윈도우 10 긴 파일 이름 길이 제한 해제 설정

- gpedit.msc 실행
- `컴퓨터 구성 > 관리 템플릿 > 시스템 > 파일 시스템` 에서 `Win32 긴 경로 사용` 에서 '사용' 체크
- `gpupdate /force` 로 적용

## Powershell 관리자 권한

- 관리자 권한으로 터미널 실행
```powershell
> ExecutionPolicy
Restricted
> Set-ExecutionPolicy Unrestricted
> ExecutionPolicy
Unrestricted
```

## WSL 터미널 설정
> WSL2 Ubuntu 기준

### zsh & oh-my-zsh 설치

```bash
$ sudo apt update && sudo apt upgrade
$ sudo apt install git zsh

# chsh 수동 (필요한 경우)
$ sudo chsh -s $(which zsh)

# oh-my-zsh 설치
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/master/tools/install.sh)"
```

### zsh-completions, zsh-syntax-highlighting, zsh-autosuggestions

```bash
$ cd ~
$ git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions

# .zshrc plugins 부분에 추가
plugins = (
  ...
  zsh-completions
  ...
)

$ autoload -U compinit && compinit

# zsh-syntax-highlighting
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# zsh-autosuggestions
$ git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# .zshrc plugins
plugins=(
  ...
  zsh-completions
  zsh-highlighting
  zsh-autosuggestions
)
```

### powerlevel10k theme

```bash
$ git clone https://github.com/romkatv/powerlevel10k.git  $ZSH_CUSTOM/themes/powerlevel10k

# .zshrc theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# NerdFonts
# https://github.com/romkatv/dotfiles-public/.local/share/fonts/NerdFonts

$ p10k configure
```

### neovim

```bash
$ sudo apt install neovim
$ curl -sLf https://spacevim.org/install.sh | bash

# .zshrc alias
alias vim="nvim"
alias vi="nvim"
alias vimdiff="nvim -d"
export EDITOR=/usr/bin/nvim

$ mkdir ~/.SpaceVim.d/colors
# ADD snazzy colorscheme download

# ~/.SpaceVim.d/init.toml 수정
[options]
  colorscheme = "snazzy-custom"
  enable_guicolors = true
  statusline_separator = "arraw"
  enable_tabline_filetype_icon = true
  enable_statusline_mode = true
  statusline_unicode_symbols = true
```

### fzf, fasd, tig, jq, neofetch

```bash
$ sudo apt install fzf fasd tig jq neofetch
```

### nvm

- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
```bash
$ nvm --version
$ nvm ls-remote
$ nvm install v12.21.0
$ npm use v12.21.0
```

### Windows Terminal settings

- `...\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState\sitecore-theme` 에 `Sitecore-Dark2.png`, `sitecore-icon.png` 복사
- 참고: [https://terminalsplash.com/](https://terminalsplash.com/)
```json
{
  "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
  "profiles": {
    "defaults": {
      // Put settings here that you want to apply to all profiles.
    },
    "list": [
      ...,
      {
        "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
        "hidden": false,
        "fontFace": "MesloLGS NF",
        "fontSize": 9,
        "name": "Ubuntu",
        "source": "Windows.Terminal.Wsl",
        "backgroundImage": "ms-appdata:///roaming/sitecore-theme/Sitecore-Dark2.png",
        "backgroundImageOpacity": 0.80000001192092896,
        "backgroundImageStretchMode": "uniformToFill",
        "icon": "ms-appdata:///roaming/sitecore-theme/sitecore-icon.png",
        "colorScheme": "wsl"
      },
      ...
    ],
  },
    "schemes": [
    {
      "name": "Aurelia",
      "background": "#1a1a1a",
      "black": "#000000",
      "blue": "#579BD5",
      "brightBlack": "#797979",
      "brightBlue": "#9CDCFE",
      "brightCyan": "#2BC4E2",
      "brightGreen": "#1AD69C",
      "brightPurple": "#975EAB",
      "brightRed": "#EB2A88",
      "brightWhite": "#EAEAEA",
      "brightYellow": "#e9ad95",
      "cyan": "#00B6D6",
      "foreground": "#EA549F",
      "green": "#4EC9B0",
      "purple": "#714896",
      "red": "#E92888",
      "white": "#EAEAEA",
      "yellow": "#CE9178"
    },
    {
      "name": "wsl",
      "background": "#002B36",
      "black": "#002B36",
      "blue": "#268BD2",
      "brightBlack": "#657B83",
      "brightBlue": "#839496",
      "brightCyan": "#D33682",
      "brightGreen": "#B58900",
      "brightPurple": "#EEE8D5",
      "brightRed": "#CB4B16",
      "brightWhite": "#FDF6E3",
      "brightYellow": "#586E75",
      "cyan": "#2AA198",
      "foreground": "#93A1A1",
      "green": "#859900",
      "purple": "#6C71C4",
      "red": "#DC322F",
      "white": "#93A1A1",
      "yellow": "#B58900"
    }
  ],
}
```

## wsl, php, xdebug, vscode

- TODO: WSL 설치
- TODO: VisualStudio Code Terminal 설정
- WSL 설정 (Ubuntu 20.04 기준)
```bash
$ sudo apt update && sudo apt upgrade
$ sudo apt-cache policy nginx
$ sudo apt update
$ sudo apt-get update
$ sudo apt install nginx
$ nginx -v
$ sudo chown -R www-data:ubuntu /var/www/
$ sudo apt install php7.4 php7.4-cli php7.4-fpm php7.4-bcmath php7.4-bz2 php7.4-common php7.4-curl php7.4-dba php7.4-gd php7.4-json php7.4-mbstring php7.4-opcache php7.$ 4-readline php7.4-soap php7.4-xml php7.4-xmlrpc php7.4-zip php-redis php7.4-mysql php-imagick php7.4-intl php7.4-mysql php7.4-gmp php-geoip php7.4-dev -y
$ php -v
$ sudo nginx -t
$ sudo systemctl reload nginx
$ sudo service nginx restart
$ sudo service php7.4-fpm start
$ sudo apt install mariadb-client-core-10.3

```
- `/etc/php/7.4/fpm/php.ini` 설정
```ini
max_execution_time = 1800
max_input_vars = 10000
memory_limit = 256M
post_max_size = 200M
upload_max_filesize = 200M
```
- `/etc/nginx/sites-available/default` 설정
```ini
server {
	root /var/www/html;
	index index.php index.html index.htm index.nginx-debian.html;
	server_name dev4.koreatraveleasy.com;
        server_tokens off;
        client_max_body_size 100M;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;

	location = /robots.txt {
                add_header Content-Type text/plain;
                return 200 "User-agent: *\nDisallow: /\n";
  }
	location / {
		try_files $uri $uri/ =404;
		if (!-e $request_filename) {
			rewrite ^.*$ /index.php last;
		}
	}
	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
		fastcgi_read_timeout 300;
	}
	location ~ /\.ht {
		deny all;
	}
  location = /favicon.ico {
    log_not_found off; access_log off;
  }
  location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
    expires max;
    log_not_found off;
  }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/dev4.koreatraveleasy.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/dev4.koreatraveleasy.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = dev4.koreatraveleasy.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80 default_server;
	listen [::]:80 default_server;
	server_name dev4.koreatraveleasy.com;
    return 404; # managed by Certbot
}
```
- `/var/www/html` 권한 조정
```bash
$ sudo chown -R www-data:usergroup /var/www/html/
$ sudo chmod -R 775 /var/www/html/
```
- `/var/www/html/index.php` 작성
```php
<?php phpinfo(); ?>
```
- xdebug 설치
```bash
$ sudo apt install php-pear php-dev
$ sudo pecl install xdebug
...
Build complete.
Don't forget to run 'make test'.

running: make INSTALL_ROOT="/tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3" install
Makefile:228: warning: overriding recipe for target 'test'
Makefile:132: warning: ignoring old recipe for target 'test'
Installing shared extensions:     /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr/lib/php/20190902/

  +----------------------------------------------------------------------+
  |                                                                      |
  |   INSTALLATION INSTRUCTIONS                                          |
  |   =========================                                          |
  |                                                                      |
  |   See https://xdebug.org/install.php#configure-php for instructions  |
  |   on how to enable Xdebug for PHP.                                   |
  |                                                                      |
  |   Documentation is available online as well:                         |
  |   - A list of all settings:  https://xdebug.org/docs-settings.php    |
  |   - A list of all functions: https://xdebug.org/docs-functions.php   |
  |   - Profiling instructions:  https://xdebug.org/docs-profiling2.php  |
  |   - Remote debugging:        https://xdebug.org/docs-debugger.php    |
  |                                                                      |
  |                                                                      |
  |   NOTE: Please disregard the message                                 |
  |       You should add "extension=xdebug.so" to php.ini                |
  |   that is emitted by the PECL installer. This does not work for      |
  |   Xdebug.                                                            |
  |                                                                      |
  +----------------------------------------------------------------------+


running: find "/tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3" | xargs ls -dils
76224    4 drwxr-xr-x 3 root root    4096 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3
76334    4 drwxr-xr-x 3 root root    4096 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr
76335    4 drwxr-xr-x 3 root root    4096 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr/lib
76336    4 drwxr-xr-x 3 root root    4096 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr/lib/php
76337    4 drwxr-xr-x 2 root root    4096 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr/lib/php/20190902
76332 2396 -rwxr-xr-x 1 root root 2451512 Mar 21 17:19 /tmp/pear/temp/pear-build-rootaAavFR/install-xdebug-3.0.3/usr/lib/php/20190902/xdebug.so

Build process completed successfully
Installing '/usr/lib/php/20190902/xdebug.so'
install ok: channel://pecl.php.net/xdebug-3.0.3
configuration option "php_ini" is not set to php.ini location
You should add "zend_extension=/usr/lib/php/20190902/xdebug.so" to php.ini
```
- `/etc/php/7.4/fpm/php.ini` 끝에 xdebug 관련 설정 추가
```ini
...
[XDEBUG]
zend_extension=/usr/lib/php/20190902/xdebug.so
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_port = 9000
```
```bash
$ sudo service nginx restart
$ sudo service php7.4-fpm restart
```
![windows.php.dev](./image/windows.php.dev.1.png)
- vscode debug 설정
![windows.php.dev](./image/windows.php.dev.2.png)
- `/var/www/html/.vscode/launch.json` 설정 추가
```json
{
  // IntelliSense를 사용하여 가능한 특성에 대해 알아보세요.
  // 기존 특성에 대한 설명을 보려면 가리킵니다.
  // 자세한 내용을 보려면 https://go.microsoft.com/fwlink/?linkid=830387을(를) 방문하세요.
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for XDebug",
      "type": "php",
      "request": "launch",
      "port": 9000
    },
    {
      "name": "Launch currently open script",
      "type": "php",
      "request": "launch",
      "program": "${file}",
      "cwd": "${fileDirname}",
      "port": 9000
    }
  ]
}
```
