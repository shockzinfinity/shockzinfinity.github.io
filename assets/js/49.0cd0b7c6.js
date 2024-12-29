(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{430:function(s,t,n){s.exports=n.p+"assets/img/seq.ingestion.1.450bddbc.png"},630:function(s,t,n){"use strict";n.r(t);var a=n(25),e=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"seq"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#seq"}},[s._v("#")]),s._v(" Seq")]),s._v(" "),t("TagLinks"),s._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#seq-docker-compose"}},[s._v("seq docker-compose")])]),t("li",[t("a",{attrs:{href:"#netcore-에서-seq-사용"}},[s._v("netcore 에서 Seq 사용")])])])]),t("p"),s._v(" "),t("h2",{attrs:{id:"seq-docker-compose"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#seq-docker-compose"}},[s._v("#")]),s._v(" seq docker-compose")]),s._v(" "),t("ul",[t("li",[s._v("구동환경: nginx reverse proxy 를 통해 구동")]),s._v(" "),t("li",[s._v("reverse proxy 는 jwilder/nginx-proxy 를 이용")]),s._v(" "),t("li",[t("code",[s._v("docker-compose.yml")])])]),s._v(" "),t("div",{staticClass:"language-docker line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-docker"}},[t("code",[s._v('version: "3.7"\n\nservices:\n  seq:\n    image: datalust/seq:latest\n    container_name: seq\n    expose:\n        - "80"\n        - "5341"\n    restart: "unless-stopped"\n    environment:\n        - ACCEPT_EULA=Y\n        - SEQ_API_INGESTIONPORT=5341\n        - VIRTUAL_HOST=logdomain.xxx.xxx\n        - VIRTUAL_PORT=80\n        - LETSENCRYPT_HOST=logdomain.xxx.xxx\n        - LETSCRYPT_EMAIL=email@yourmail.com\n    ports:\n        - "5341:5341"\n    volumes:\n        - ./data:/data\n\nnetworks:\n  default:\n    external:\n      name: nginx-proxy\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br")])]),t("ul",[t("li",[s._v("ingestion port 는 http 전송")])]),s._v(" "),t("h2",{attrs:{id:"netcore-에서-seq-사용"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#netcore-에서-seq-사용"}},[s._v("#")]),s._v(" netcore 에서 Seq 사용")]),s._v(" "),t("ul",[t("li",[s._v("netcore 코드 상에서 Serilog 등을 이용하여 ingestion port 로 전송")]),s._v(" "),t("li",[s._v("logger configuration 을 조정하여 "),t("code",[s._v("Program.cs")]),s._v(" 혹은 "),t("code",[s._v("Startup.cs")]),s._v(" 에 등록하여 사용")])]),s._v(" "),t("div",{staticClass:"language-csharp line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-csharp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")])]),s._v(" seqUri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Configuration"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token generic-method"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("GetValue")]),t("span",{pre:!0,attrs:{class:"token generic class-name"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("string")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"SeqConfiguration:Uri"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token class-name"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")])]),s._v(" apiKey "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Configuration"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token generic-method"}},[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("GetValue")]),t("span",{pre:!0,attrs:{class:"token generic class-name"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("string")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"SeqConfiguration:ApiKey"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nLog"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Logger "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token constructor-invocation class-name"}},[s._v("LoggerConfiguration")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("MinimumLevel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Override")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Microsoft.AspNetCore"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" LogEventLevel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Warning"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Enrich"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("FromLogContext")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Enrich"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("WithProperty")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Envrionment"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" context"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HostingEnvironment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("EnvrionmentName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Enrich"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("WithProperty")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Application"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" context"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HostingEnvironment"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ApplicationName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Enrich"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("WithMachineName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("WriteTo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Debug")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("WriteTo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Console")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("WriteTo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Seq")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("seqUri"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token named-parameter punctuation"}},[s._v("apiKey")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" apiKey"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("CreateLogger")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("p",[t("img",{attrs:{src:n(430),alt:"seq.ingestion"}})])],1)}),[],!1,null,null,null);t.default=e.exports}}]);