/**
 * Project: TensorFlow
 * GitHub: https://github.com/snowkylin/tensorflow-handbook/
 * Maintainer: Huan LI (李卓桓) https://github.com/huan
 *
 */
import type {
  RepoConfig,
}                 from './config.js'

const ROOM_ID       = '4510565418@chatroom'
const JAVASCRIPT_ML = '4383052528@chatroom'  // Machine Learning in JavaScript

export const config: RepoConfig = {
  'huan/tensorflow-handbook-javascript' : [
    ROOM_ID,
    JAVASCRIPT_ML,
  ],
  'huan/tensorflow-handbook-swift'      : ROOM_ID,
  'huan/tensorflow-handbook-tpu'        : ROOM_ID,
  'snowkylin/tensorflow-handbook'       : ROOM_ID,
}

export default config
