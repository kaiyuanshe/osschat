import { Message } from 'wechaty'
import NodeCache from 'node-cache'

export interface VoteCache {
  voteCount: number,
  voteMemberIdList: string[]
}

const VOTE_KEY = [
  '[弱]',
  '/:MMWeak',
]

const DEFAULT_VOTE_THRESHOLD = 3

const MANAGED_ROOM_NAME_PATTERN = [
  /OSS/,
]

export class VoteManager {

  private static cache = new NodeCache()

  /**
   * @param message
   * @description Check whether the message is a vote message
   */
  public static async checkVote (message: Message) {

    const room = message.room()
    const contact = message.from()
    const content = message.text()

    if (!room || !contact || message.type() !== Message.Type.Text) {
      return
    }

    const topic = await room.topic()
    const topicMatched = MANAGED_ROOM_NAME_PATTERN.filter(pattern => pattern.test(topic)).length > 0
    if (!topicMatched) {
      return
    }

    const mentions = await message.mention()
    if (!mentions || mentions.length === 0) {
      return
    }

    const mentionNames = await Promise.all(mentions.map(async member => {
      const name = member.name()
      const alias = await room.alias(member)
      return alias || name
    }))

    const pureContent = mentionNames.reduce((prev, cur) => {
      const regex = new RegExp(`@${cur}[\u2005\u0020]`)
      return prev.replace(regex, '')
    }, content)

    const isKeyword = VOTE_KEY.includes(pureContent.trim())
    if (!isKeyword) {
      return
    }

    for (const mention of mentions) {
      if (mention.id === message.wechaty.self().id) {
        return
      }

      const KEY = `${room.id}-${mention.id}-kick`
      let cache = this.cache.get<VoteCache>(KEY)
      if (!cache) {
        cache = {
          voteCount: 1,
          voteMemberIdList: [mention.id],
        }
        this.cache.set<VoteCache>(KEY, cache)
      }
      const { voteCount, voteMemberIdList } = cache

      const isVoted = voteMemberIdList.reduce((res, id) => res || (id === contact.id), false)
      if (isVoted) {
        await room.say(`You have warned user {user}, please do not warn anyone consecutively.`, contact)
      }

      if (voteCount >= DEFAULT_VOTE_THRESHOLD) {
        await room.say(`You have been voted to be an unwelcome guest in this room, kicking you out is a significant notice for everyone who is still in this room be nice, bye-bye..`, mention)
        await room.del(mention)
        this.cache.del(KEY)
      } else {
        this.cache.set<VoteCache>(KEY, {
          voteCount: voteCount + 1,
          voteMemberIdList: [...voteMemberIdList, contact.id],
        })
        await room.say(`You have been warned ${voteCount} times，you will be removed if you receive three consecutive warnings.`, mention)
      }
    }
  }

}
