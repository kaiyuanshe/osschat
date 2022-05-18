import apache           from './apache.js'
import authing          from './authing.js'
import baidu            from './baidu.js'
import bjNodejsClube    from './bj-nodejs-club.js'
import chatopera        from './chatopera.js'
import hailiangWang     from './hailiang-wang.js'
import kaiyuanshe       from './kaiyuanshe.js'
import preangel         from './preangel.js'
import qihoo360         from './qihoo360.js'
import tencent          from './tencent.js'
import tensorflowBook   from './tensorflow-book.js'
import webank           from './webank.js'
import wechaty          from './wechaty.js'
import zixia            from './zixia.js'
import smallWuPond      from './small-wu-pond.js'

// others
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
  ...authing,
  ...baidu,
  ...kaiyuanshe,
  ...preangel,
  ...qihoo360,
  ...tencent,
  ...tensorflowBook,
  ...webank,
  ...wechaty,
  ...zixia,
  ...bjNodejsClube,
  ...chatopera,
  ...hailiangWang,
  ...smallWuPond,

  // others
  ...others,
}

export default projectsRepoConfig
