import {
  MemoryCard,
}                 from 'memory-card'

import {
  log,
}                 from './config'

export let memory: MemoryCard

export function getMemory (name: string): MemoryCard {
  log.verbose('getMemory', 'getMemory(%s)', name)

  if (memory) {
    return memory
  }

  const AWS_ACCESS_KEY_ID     = process.env.AWS_ACCESS_KEY_ID as string
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string
  const AWS_REGION            = process.env.AWS_REGION as string
  const AWS_S3_BUCKET         = process.env.AWS_S3_BUCKET as string

  if (AWS_ACCESS_KEY_ID
    && AWS_REGION
    && AWS_SECRET_ACCESS_KEY
    && AWS_S3_BUCKET
  ) {
    log.verbose('getMemory', 'getMemory() creating new s3 memory')

    memory = new MemoryCard({
      name,
      storageOptions: {
        accessKeyId     : AWS_ACCESS_KEY_ID,
        bucket          : AWS_S3_BUCKET,
        region          : AWS_REGION,
        secretAccessKey : AWS_SECRET_ACCESS_KEY,
        type            : 's3',
      },
    })
  } else {
    log.verbose('getMemory', 'getMemory() creating new file memory')
    memory = new MemoryCard({ name })
  }

  return memory
}
