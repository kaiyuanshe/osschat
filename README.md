# OSSChat

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/wechaty/wechaty)
[![Node.js CI](https://github.com/kaiyuanshe/osschat/workflows/Node.js%20CI/badge.svg)](https://github.com/kaiyuanshe/osschat/actions?query=workflow%3A%22Node.js+CI%22)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

[![OSS Chat](docs/images/osschat.svg)](https://oss.chat)

Apache [OSS.Chat](https://oss.chat) Project.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## What is OSSChat

OSSChat is for bridging IM apps (e.g., WeChat) and Apache community tools (e.g., mailing list, and jira).

OSSChat will serve users as a cloud service.

- YouTube Video: [Introducing OSSChat: Sync GitHub Issues with WeChat Groups for Open-source Projects](https://youtu.be/HNksCmm_pvY), talk by [@huan](https://github.com/huan) at [OSSChat Meeting](https://shimo.im/docs/wGHydDxvWGjWKgDK) 2020-03-05 (Thu) 20:30 - 21:00 CST
- OSS.Chat - A bridge to the Apache Way in China (OSS.Chat - 通往 Apache Way 的一道虹桥)
  - [slides](https://docs.google.com/presentation/d/1ws1loxT0JVzNkZO_7G5Xx8T3mDvAmh8PCZ-sAs9rfqM)
  - [ApacheCon @Home 2020](https://apachecon.com/acah2020/) (video: [link](https://www.youtube.com/watch?v=KWS4V86heh0))
  - [2020 中国开源年会暨阿帕奇中国路演 COSCon'20 & Apache Roadshow - China](http://coscon.kaiyuanshe.cn/), (intro [link](https://coscon.kaiyuanshe.cn/#activity/agenda?pid=135), video [link](http://coscon.kaiyuanshe.cn/#activity/agenda?pid=135))
- Read more [documention](https://osschat.readthedocs.io/en/latest/)

## HOT! OSS.Chat 加入 2022 年腾讯“开源摘星计划”

![开源摘星计划](https://raw.githubusercontent.com/weopenprojects/WeOpen-Star/main/assets/imgs/weopenstar.jpeg)

开源摘星计划（WeOpen Star） 是由腾源会 2022 年推出的全新项目，旨在为开源人提供成长激励，为开源项目提供成长支持，助力开发者更好地了解开源，更快地跨越鸿沟，参与到开源的具体贡献与实践中。

不管你是开源萌新，还是希望更深度参与开源贡献的老兵，跟随“开源摘星计划”开启你的开源之旅，从一篇学习笔记、到一段代码的提交，不断挖掘自己的潜能，最终成长为开源社区的“闪亮之星”。

详情：[OSS.Chat X 开源摘星计划](https://github.com/weopenprojects/WeOpen-Star/issues/38)

## Using OSSChat as a service

TBD

## Run OSSChat locally

To run OSSChat, Node.js is required.

Install [Node.js](https://nodejs.org) first if you are not.

```shell
npm install
npm run heroku:local
```

Then visit <http://localhost:5000>

### Output Messages

After started the bot you should see the following log messages:

```shell
16:57:45 INFO Wechaty <wechaty-puppet-puppeteer>(heroku-wechaty) start() v0.29.7 is starting...
16:57:47 INFO startWeb startWeb() listening to http://localhost:8788
```

After scan the qrcode, you can find the following result here

```shell
17:12:57 INFO chatops chatops(Der! I just got online!
OSSChat v0.0.24)
17:12:57 INFO startBot onLogin(Contact<李佳芮>) 李佳芮 Heroku Wechaty Getting Started v0.29.7 logined
```

### Advance

1. Using an advance puppet to get a more stable version. Learn more about it from the [Wechaty Puppet Directory](https://github.com/wechaty/wechaty-puppet/wiki/Directory)

2. Using [Chatopera Cloud Services](https://docs.chatopera.com/) to enable more dialogue skills and user engagements. (#TODO Blog, https://github.com/kaiyuanshe/osschat/issues/156)


## DevOps & CI/CD

### Heroku
We are current DevOps the master branch from the repo to Heroku under the protection of Travis CI.

You can visit the online system at <https://oss.chat>

### Docker
Build docker image with `scripts/build.sh`, after that service can be hosted with docker-compose.

```
cp sample.env .env # Modify .env file with your settings
docker-compose up -d
```

Note, the current docker image for osschat is not pushed into DockerHub yet.

## How to use

use osschat is so easy, just need 4 steps, please refer [How to use](https://github.com/kaiyuanshe/osschat/blob/master/docs/pages/how-to-use.md)

## Meeting Notes

- [Weekly Meeting Notes](https://shimo.im/docs/wGHydDxvWGjWKgDK)

## Apache Incubator Proposal

- [Incubator OSSChat Proposal](https://cwiki.apache.org/confluence/display/INCUBATOR/OSSBotProposal)

## Mentors

- [Craig L. Russell](https://github.com/clr-apache), Chairman, Apache Software Fundation
- [Junping Du](https://github.com/JunpingDu), Chairman, Tencent Open Source Alliance
- [Ted Liu](https://github.com/tedliu1), Chairman, kaiyuanshe
- To Be Added ...

## Committers

- [Zhuang Biaowei](https://github.com/zhuangbiaowei), [(庄表伟)](http://www.zhuangbiaowei.com/blog/), Product Manager from Huawei technologies co. ltd
- [Huan](https://github.com/huan) [(李卓桓)](http://linkedin.com/in/zixia), [Tencent TVP of Chatbot](https://cloud.tencent.com/tvp/138), <huan@kaiyuanshe.org>
- [Rui](https://github.com/lijiarui)[(李佳芮)](https://lijiarui.github.io), [Wechaty](https://github.com/wechaty/wechaty) Co-author, Founder of [JuziBot](https://www.botorange.com/)
- [Hai Liang WANG](https://github.com/hailiang-wang), [(王海良)](https://www.linkedin.com/in/hai-liang-wang/), [Chatopera](https://docs.chatopera.com/), Chatbot Operator.
- To Be Added ...

## Pilots

To be added...

[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/0)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/0)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/1)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/1)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/2)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/2)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/3)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/3)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/4)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/4)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/5)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/5)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/6)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/6)
[![contributor](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/images/7)](https://sourcerer.io/fame/huan/kaiyuanshe/osschat/links/7)

## History

### Master v0.11

### v0.10 (Nov 2, 2021)

This branch works with Wechaty v0.68, for compatible with those modules (like PadLocal) does not support Wechaty v1.0 (yet)

### v0.9 (May 30, 2021)

1. Upgrade RxJS to v7
1. Upgrade Wechaty to v0.60

## Thanks

- OSS mentored by: Apache Software Fundation
- Project Lead by: 开源社
- Heroku Dyno sponsored by: [JuziBot](https://www.juzi.bot)
- Wechaty Puppet Padplus sponsored by: [JuziBot](https://www.juzi.bot)
- Heroku Getting Started Template from [Wechaty](https://github.com/wechaty/)

## Links

- [Scaling your Redux App with ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions)
- [Run your app locally using the Heroku Local command line tool](https://devcenter.heroku.com/articles/heroku-local)

## Copyright & License

- Code & Docs © 2019-now 开源社
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
