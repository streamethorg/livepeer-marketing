'use client'
import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Credenza, CredenzaTrigger } from '../ui/crezenda'
import { IExtendedSpeaker } from '@/lib/types'

export default function SpeakerIcon({
  speaker,
  onlyImage = false,
}: {
  speaker: IExtendedSpeaker
  onlyImage?: boolean
}) {
  if (onlyImage) {
    return (
      <Avatar className="my-2">
        <AvatarImage src={speaker.photo} />
        <AvatarFallback>
          {speaker.name.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    )
  }
  return (
    <Credenza>
      <CredenzaTrigger>
        <Badge className="z-50 border bg-background text-primary border-secondary">
          <Avatar className="my-1">
            <AvatarImage src={speaker?.photo} />
            <AvatarFallback className="">
              {speaker?.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm">{speaker?.name}</span>
        </Badge>
      </CredenzaTrigger>
    </Credenza>
  )
}
