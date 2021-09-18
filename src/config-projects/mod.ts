import wechaty          from './wechaty.js'
import zixia            from './zixia.js'
import tensorflowBook   from './tensorflow-book.js'
import baidu            from './baidu.js'
import preangel         from './preangel.js'
import apache           from './apache.js'
import webank           from './webank.js'
import qihoo360         from './qihoo360.js'
import tencent          from './tencent.js'
import kaiyuanshe       from './kaiyuanshe.js'
import others           from './others.js'

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
  ...tencent,
  ...tensorflowBook,
  ...webank,
  ...wechaty,
  ...zixia,

  // others
  ...others,
}

export default projectsRepoConfig
