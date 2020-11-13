# shockz-vue-press

> vuepress 세팅 시
> ./docs/.vuepress/config.js 에 base 설정 필요함

_./docs/.vuepress/config.js_

```bash
module.exports = {
  ...,
  base: "/",
  ...
}
```

> deploy.sh 필요

```bash
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/shockzinfinity/shockz-vue-press.git master:gh-pages

cd -
```

> 배포 시 [Cmder](https://cmder.net/) 이용 (Windows)

```bash
$ sh deploy.sh
```

> favicon.ico 설정 시  
> docs/.vuepress/public 에 추가

For more details, please head VuePress's [documentation](https://v1.vuepress.vuejs.org/).
