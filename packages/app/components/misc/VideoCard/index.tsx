'use client'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Thumbnail from './thumbnail'
import Image from 'next/image'
import { IExtendedSession, IExtendedEvent } from '@/lib/types'

const VideoCard = ({
  session,
  invertedColors,
  event,
}: {
  session: IExtendedSession
  invertedColors?: boolean
  event?: IExtendedEvent
}) => {
  const headerClass = invertedColors ? ' ' : ''
  const descriptionClass = invertedColors ? '' : ''

  return (
    <div className="min-h-full w-full rounded-xl  uppercase">
      <Thumbnail
        imageUrl={session.coverImage}
        fallBack={event?.eventCover}
      />
      <CardHeader
        className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none ${headerClass}`}>
        <CardTitle className={`text-sm truncate ${descriptionClass}`}>
          {session.name}
        </CardTitle>
        {event && (
          <div className="flex flex-row items-center justify-start">
            <Image
              className="rounded-md mr-2"
              alt="logo"
              quality={80}
              src={event.logo!}
              height={24}
              width={24}
            />
            <CardDescription
              className={`text-xs truncate ${descriptionClass}`}>
              {event?.name}
            </CardDescription>
          </div>
        )}
      </CardHeader>
    </div>
  )
}

export default VideoCard
