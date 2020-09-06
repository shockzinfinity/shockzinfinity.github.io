---
sidebar: auto
---

# SSL tip

## SSL 인증서 key 파일 비밀번호 제거/추가

```bash
# 비밀번호 제거
$ openssl rsa -in ssl.key -out ssl_nopass.key

# 비밀번호 생성
$ openssl rsa -in ssl_nopass.key -passout pass:'password123' -out ssl.key -des3
```

## SSL 인증서 포맷 변환 (.crt (apache) <-> .pfx (iis) -> .jks (tomcat))

```bash
# pfx -> crt
$ openssl pkcs12 -in filename.pfx -nocerts -out filename.key # 키 파일 추출
$ openssl pkcs12 -in filename.pfx -nokeys -clcerts -out filename.crt # 인증서 파일 추출
$ openssl pkcs12 -in filename.pfx -nodes -cacerts -passin pass:비밀번호 -out chain.crt # 체인인증서 추출

# crt -> pfx
$ openssl pkcs12 -inkey keyfile.key -in crtfile.crt -certfile ChainCA.crt -export -out pfxfile.pfx -name "domainname"

# pfx -> jks
$ keytool -importkeystore -srckeystore pfxfile.pfx -srcstoretype pkcs12 -destkeystore keystore.jks -deststoretype jks -alias "keystorename"

# jks 정보확인
$ keytool -list -keystore cert.jks -rfc
$ keytool -list -keystore cert.jks -v
```

## crt, key => pem 변환

```bash
# key 변경
$ openssl rsa -in server.key -text > private.pem

# crt 변경
$ openssl x509 -inform PEM -in server.crt > public.pem
```

## 자체서명 인증서 생성 (windows)

> ps1 파일로 저장 후 PS command(관리자 권한 필요)에서 실행
```ps1
# setup certificate properties including the commonName (DNSName) property for Chrome 58+
$certificate = New-SelfSignedCertificate `
    -Subject localhost `
    -DnsName localhost `
    -KeyAlgorithm RSA `
    -KeyLength 2048 `
    -NotBefore (Get-Date) `
    -NotAfter (Get-Date).AddYears(2) `
    -CertStoreLocation "cert:CurrentUser\My" `
    -FriendlyName "Localhost Certificate for .NET Core" `
    -HashAlgorithm SHA256 `
    -KeyUsage DigitalSignature, KeyEncipherment, DataEncipherment `
    -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.1")
$certificatePath = 'Cert:\CurrentUser\My\' + ($certificate.ThumbPrint)

# create temporary certificate path
$tmpPath = "D:\00.ALM\HelloAspNetCore3"
If(!(test-path $tmpPath))
{
New-Item -ItemType Directory -Force -Path $tmpPath
}

# set certificate password here
$pfxPassword = ConvertTo-SecureString -String "temp" -Force -AsPlainText
$pfxFilePath = "D:\00.ALM\HelloAspNetCore3\localhost.pfx"
$cerFilePath = "D:\00.ALM\HelloAspNetCore3\localhost.cer"

# create pfx certificate
Export-PfxCertificate -Cert $certificatePath -FilePath $pfxFilePath -Password $pfxPassword
Export-Certificate -Cert $certificatePath -FilePath $cerFilePath

# import the pfx certificate
Import-PfxCertificate -FilePath $pfxFilePath Cert:\LocalMachine\My -Password $pfxPassword -Exportable

# trust the certificate by importing the pfx certificate into your trusted root
Import-Certificate -FilePath $cerFilePath -CertStoreLocation Cert:\CurrentUser\Root

# optionally delete the physical certificates (don’t delete the pfx file as you need to copy this to your app directory)
# Remove-Item $pfxFilePath
Remove-Item $cerFilePath
```

::: tip
파워쉘 실행 시 실행정책(ExecutionPolicy) 관련 오류 시  
Get-ExecutionPolicy 확인  
Set-ExecutionPolicy RemoteSigned  
[참고](https://m.blog.naver.com/vanstraat/221732533202)
:::

## Reference Site

- [Develop Locally with HTTPS, Self-Signed Certificates and ASP.NET Core](https://www.humankode.com/asp-net-core/develop-locally-with-https-self-signed-certificates-and-asp-net-core)
- [thecarlo/https-with-asp-net-core](https://github.com/thecarlo/https-with-asp-net-core)
