# How to use 

## 1、install osschat for github project
if project is apache project,please referer to page 1.1, if not, please refer to page 1.2 

###  1.1 install app for apache project

Ask for infrastructure service of ASF from here: https://issues.apache.org/jira/ .

Create a new issue follow the template following:

```
Dear Infra team,

Can you please install / enable GitHub osschat(https://github.com/apps/osschat) application for our apache/${Your project name} GitHub repo?

Thanks
```

A previous case for reference: https://issues.apache.org/jira/browse/INFRA-19925

### 1.2 install app for opensource project
- please open [https://github.com/apps/osschat](https://github.com/apps/osschat) in browser, and install osschat app. 
- then, give osschat Repository access privilege: All repositories or just choose some repositories that you want to use osschat
 
```
Note: for now, osschat just only need 2 privileges:
    - Read access to metadata 
    - Read and write access to issues and pull requests
``` 

## 2. add OssChat wechat(wxid: OSSChat) as friend, then invite OssChat into your wechat group

- TODO: Need a QR code

## 3.  find your corresponding wechat group id
visit [https://oss.chat/dashboard/](https://oss.chat/dashboard/) to get your wechat group id

## 4. edit config.ts
edit  [config.ts](http://github.com/kaiyuanshe/osschat/blob/master/src/config.ts) file, and add your group id to `RepoConfig`
```
export const managedRepoConfig: RepoConfig = {
  'BUPT/ai-ml.club': '18968477245@chatroom',
  'DSExtension/DSExtension': '18039997009@chatroom',
  'apache/incubator-dolphinscheduler' : '8676247154@chatroom',
  'apache/incubator-iotdb' : '18378203056@chatroom',
  'apache/incubator-shardingsphere'     : [
    '10693004861@chatroom',
    '12353073946@chatroom',
    '12567163222@chatroom',
    '22584955790@chatroom',
  ],
  'dailidong/ossbot': '18039997009@chatroom',
  'kaiyuanshe/osschat'     : [
    '17591588552@chatroom',
    '17384390178@chatroom',
  ],
  'qihoo360/quicksql' : [
    '4808709382@chatroom',
    '4344886880@chatroom',
  ],
  ...wechatyRepoConfig,
}
```

then submit a pull request, when pr is been merged, wait 5~10 minutes, you can submit an issue on your project, if everything is ok, osschat will send this issue to your wechat group. 

if you meet any problem, please submit an issue
