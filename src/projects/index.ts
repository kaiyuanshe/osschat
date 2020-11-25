import wechaty          from './wechaty'
import zixia            from './zixia'
import tensorflowBook   from './tensorflow-book'
import paddlepaddle     from './paddlepaddle'

export const projectsRepoConfig = {
  ...paddlepaddle,
  ...tensorflowBook,
  ...wechaty,
  ...zixia,
}

export default projectsRepoConfig
