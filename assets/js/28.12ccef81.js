(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{407:function(s,a,e){s.exports=e.p+"assets/img/code-server.reverse.2.c7a540e0.png"},408:function(s,a,e){s.exports=e.p+"assets/img/code-server.reverse.1.8a5ed8aa.png"},409:function(s,a,e){s.exports=e.p+"assets/img/code-server.github.1.16459ffa.png"},410:function(s,a,e){s.exports=e.p+"assets/img/code-server.github.2.b2205d9c.png"},614:function(s,a,e){"use strict";e.r(a);var t=e(25),r=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"code-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#code-server"}},[s._v("#")]),s._v(" code-server")]),s._v(" "),a("TagLinks"),s._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#관련-링크"}},[s._v("관련 링크")])]),a("li",[a("a",{attrs:{href:"#docker-run"}},[s._v("Docker run")])]),a("li",[a("a",{attrs:{href:"#synology-reverse-proxy-설정"}},[s._v("Synology reverse proxy 설정")])]),a("li",[a("a",{attrs:{href:"#확장-설치"}},[s._v("확장 설치")])]),a("li",[a("a",{attrs:{href:"#github-연동"}},[s._v("github 연동")])]),a("li",[a("a",{attrs:{href:"#ubuntu-package-로-설치하는-방법"}},[s._v("ubuntu package 로 설치하는 방법")])])])]),a("p"),s._v(" "),a("h2",{attrs:{id:"관련-링크"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#관련-링크"}},[s._v("#")]),s._v(" 관련 링크")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://www.linuxserver.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("linuxserver/code-server"),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://github.com/cdr/code-server",target:"_blank",rel:"noopener noreferrer"}},[s._v("cdr/code-server"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[s._v("여기서는 linuxserver.io docker 이미지를 사용함")])])]),s._v(" "),a("h2",{attrs:{id:"docker-run"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-run"}},[s._v("#")]),s._v(" Docker run")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" firewall-cmd "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--permanent")]),s._v(" --add-port"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8443")]),s._v("/tcp\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" create "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("code-server "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--net")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("host --env-file"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./.env"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /home/shockz/docker/code-server/config:/config "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--restart")]),s._v(" unless-stopped linuxserver/code-server\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" start code-server\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("env 파일 예시")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" .env\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PASSWORD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("******** "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 원하는 패스워드")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SUDO_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("******** "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# code-server 내부적으로 sudo 사용 시 패스워드")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PUID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$UID")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PGID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("id")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-g")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$USER")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("TZ")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Asia/Seoul\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"synology-reverse-proxy-설정"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#synology-reverse-proxy-설정"}},[s._v("#")]),s._v(" Synology reverse proxy 설정")]),s._v(" "),a("ul",[a("li",[s._v("NAS 상에서 nginx reverse proxy 설정이 되어 있다는 가정하에 code-server 는 http 상으로 서비스하고, 인증서 처리는 NAS nginx 에 맡김."),a("br"),s._v(" "),a("img",{attrs:{src:e(407),alt:"code-server.reverse"}})])]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),a("ul",[a("li",[s._v("Synology NAS nginx 를 이용하여 reverse proxy 할 경우 아래 처럼 WebSocket 관련 헤더를 추가해줘야 함\n"),a("img",{attrs:{src:e(408),alt:"code-server.reverse"}})])])]),s._v(" "),a("h2",{attrs:{id:"확장-설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#확장-설치"}},[s._v("#")]),s._v(" 확장 설치")]),s._v(" "),a("ul",[a("li",[s._v("code-server 터미널을 이용하여 설치")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ code-server --install-extension "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("extension identifier"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"github-연동"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-연동"}},[s._v("#")]),s._v(" github 연동")]),s._v(" "),a("ul",[a("li",[s._v("container 를 이용하여 code-server 를 띄운 상황이므로 github 인증 기능이 원할하지 않을 수 있음")]),s._v(" "),a("li",[s._v("github.com > Settings > Developer settings > Personal Access Tokens (PATs) 에서 토큰을 추가하여 입력하면 해결 가능\n"),a("img",{attrs:{src:e(409),alt:"code-server.github"}}),s._v(" "),a("img",{attrs:{src:e(410),alt:"code-server.github"}})])]),s._v(" "),a("h2",{attrs:{id:"ubuntu-package-로-설치하는-방법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu-package-로-설치하는-방법"}},[s._v("#")]),s._v(" ubuntu package 로 설치하는 방법")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://github.com/cdr/code-server/releases/download/v3.7.2/code-server-3.7.2-linux-amd64.tar.gz\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" xvfz code-server-3.7.2-linux-amd64.tar.gz\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" ~/.config/code-server\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" https://gist.githubusercontent.com/shockzinfinity/aad803519b04c6bd06c9424f43f00233/raw/147d3e425744c8327efd62f750c7b18dbe463405/config.yaml "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" ~/.config/code-server/config.yaml\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" ~/project\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" https://gist.githubusercontent.com/shockzinfinity/227a0f2ef792fdbe01063c72f564ba7a/raw/7a06277a3f38c90543259aea9198d7ad22ebce2e/codeserver.service "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-o")]),s._v(" /lib/systemd/system/codeserver.service\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl start codeserver\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" codeserver\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("ul",[a("li",[a("code",[s._v("code-server/config.yaml")]),s._v(" 수정")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("bind-addr: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0:8080\nauth: password\npassword: ********\ncert: "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ul",[a("li",[s._v("필요에 따라 "),a("code",[s._v("codeserver.service")]),s._v(" 파일 수정")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Unit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Description")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Code Server IDE\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("After")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("network.target\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Service"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Type")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("simple\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("User")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("shockz\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Restart")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("on-failure\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("RestartSec")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WorkingDirectory")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/home/shockz/code-server-3.7.2-linux-amd64\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecStart")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/home/shockz/code-server-3.7.2-linux-amd64/code-server "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--port")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v(" /home/shockz/docker/deepo/data\n\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("StandardOutput")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("file:/var/log/code-server-output.log\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("StandardError")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("file:/var/log/code-server-error.log\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Install"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WantedBy")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("multi-user.target\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])])],1)}),[],!1,null,null,null);a.default=r.exports}}]);