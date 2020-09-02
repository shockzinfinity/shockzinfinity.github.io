---
sidebar: auto
---

# Synology

[[toc]]

## Let's Encrypt SSL 인증서 적용

> acme.sh 이용

```bash
$ wget https://raw.githubusercontent.com/acmesh-official/acme.sh/master/acme.sh
$ chmod a+x acme.sh

$ ./acme.sh --issue --dns --force -d shockz.io -d *.shockz.io --yes-I-know-dns-manual-mode-enough-go-ahead-please
# Domain: 확인
# TXT Value: 확인
# DNS TXT 레코드 변경 후 확인
$ nslookup
$ set type=txt
$ _acme-challenge.shockz.io
$ ./acme.sh --renew --dns --force -d shockz.io -d *.shockz.io --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

> ca.cer, shockz.io.key, shockz.io.cer 다운로드 후
> ![1](./image/synology.ssl.1.png)  
> ![2](./image/synology.ssl.2.png)  
> ![3](./image/synology.ssl.3.png)  
> ![4](./image/synology.ssl.4.png)

> 작업스케줄러 등록 (인증서 갱신, 매주 금)
> ![5](./image/synology.ssl.5.png)  
> ![6](./image/synology.ssl.6.png)  
> ![7](./image/synology.ssl.7.png)  
> ![8](./image/synology.ssl.8.png)  
> 스크립트 내용

```bash
# 인증서 갱신
/root/acme.sh --renew --dns --force -d shockz.io -d *.shockz.io --yes-I-know-dns-manual-mode-enough-go-ahead-please

# 인증서 등록
# 복사할 폴더 확인 cat /usr/syno/etc/certificate/_archive/DEFAULT
cp /root/.acme.sh/shockz.io/shockz.io.cer /usr/syno/etc/certificate/_archive/aU6fsT/cert.pem
cp /root/.acme.sh/shockz.io/ca.cer /usr/syno/etc/certificate/_archive/aU6fsT/chain.pem
cp /root/.acme.sh/shockz.io/fullchain.cer /usr/syno/etc/certificate/_archive/aU6fsT/fullchain.pem
cp /root/.acme.sh/shockz.io/shockz.io.key /usr/syno/etc/certificate/_archive/aU6fsT/privkey.pem

# nginx 재시작
/usr/syno/sbin/synoservicectl --reload nginx
```
