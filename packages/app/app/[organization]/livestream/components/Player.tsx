'use server'
import { Livepeer } from 'livepeer'
import { IExtendedStage } from '@/lib/types'
import Counter from './Counter'
import { PlayerWithControls } from '@/components/ui/Player'
import { buildPlaybackUrl } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'

const Player = async ({ stage }: { stage: IExtendedStage }) => {
  const livepeer = new Livepeer({
    apiKey: process.env.LIVEPEER_API_KEY,
  })

  const stream = (
    await livepeer.stream.get(stage.streamSettings?.streamId ?? '')
  ).stream

  if (!stream || !stream.playbackId) {
    return notFound()
  }

  const timeLeft =
    new Date(stage.streamDate as string).getTime() - Date.now()

  // const prevChatMessages = await fetchChat({ stageId: stage?._id })

  return (
    <div className="flex flex-col w-full h-full ">
      {timeLeft > 0 ? (
        <Counter timeToStart={timeLeft} />
      ) : (
        <div className="w-full h-full relative md:p-4">
          <PlayerWithControls
            src={[
              {
                src: buildPlaybackUrl(
                  stream.playbackId
                ) as `${string}m3u8`,
                width: 1920,
                height: 1080,
                mime: 'application/vnd.apple.mpegurl',
                type: 'hls',
              },
            ]}
          />
          {/* <div className='absolute top-0 right-0 h-full w-[400px] flex'>
                <ChatBar stageId={stage._id} prevChatMessages={prevChatMessages} />
              </div> */}
        </div>
      )}
    </div>
  )
}

export default Player