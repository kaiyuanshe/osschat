import wechaty          from './wechaty'
import zixia            from './zixia'
import tensorflowBook   from './tensorflow-book'
import baidu            from './baidu'
import preangel         from './preangel'
import apache           from './apache'
import webank           from './webank'
import qihoo360         from './qihoo360'
import tencent          from './tencent'
import kaiyuanshe       from './kaiyuanshe'
import others           from './others'
import streamnative     from './streamnative'

/**
 * Huan(202003)
 *  Key   - GitHub Repo Full Name: "Org/Repo"
 *  Value - WeChat Room Id / Id List
 *
 *  Key should be in ascending order
 */
export const projectsRepoConfig = {
  ...apache,
  ...baidu,
  ...kaiyuanshe,
  ...preangel,
  ...qihoo360,
  ...streamnative,
  ...tencent,
  ...tensorflowBook,
  ...webank,
  ...wechaty,
  ...zixia,

  // others
  ...others,
}

export default projectsRepoConfig
