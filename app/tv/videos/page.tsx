import {
  ChannelPageParams,
  IExtendedEvent,
  OrganizationPageProps,
} from '@/lib/types'
import { Metadata, ResolvingMetadata } from 'next'
import { fetchEvents } from '@/lib/services/eventService'
import { Suspense } from 'react'
import ArchiveVideos from './components/ArchiveVideos'
import ArchiveVideoSkeleton from '../livestream/components/ArchiveVideosSkeleton'
import Image from 'next/image'
import { fetchOrganization } from '@/lib/services/organizationService'
import { notFound } from 'next/navigation'
import EventSelect from './components/eventSelect'
import { fetchAllSessions } from '@/lib/data'
import {
  generalMetadata,
  livestreamMetadata,
  organizationMetadata,
} from '@/lib/utils/metadata'

export default async function ArchivePage({
  params,
  searchParams,
}: OrganizationPageProps) {
  if (!process.env.NEXT_ORGANIZATION) {
    return notFound()
  }

  const organization = await fetchOrganization({
    organizationSlug: process.env.NEXT_ORGANIZATION,
  })

  if (!organization) {
    return notFound()
  }

  const events = await fetchEvents({
    organizationId: organization?._id,
  })

  const results = await Promise.all(
    events.map(async (event) => {
      const sessions = (
        await fetchAllSessions({
          event: event._id.toString(),
          onlyVideos: true,
          published: true,
        })
      ).sessions

      return sessions.length > 0 ? event : undefined
    })
  )

  const eventsWithVideos = results.filter(
    (event) => event !== undefined
  )

  return (
    <div className="flex flex-col w-full h-full">
      {organization.banner && (
        <div className="hidden relative w-full h-full md:block max-h-[200px] aspect-video">
          <Image
            src={organization.banner}
            alt="banner"
            quality={100}
            objectFit="cover"
            fill
            priority
          />
        </div>
      )}
      <div className="p-4 m-auto w-full max-w-7xl h-full">
        <div className="flex flex-row justify-between items-center mb-4 space-x-2 w-full">
          <div className="w-full text-lg font-bold">
            {searchParams.searchQuery
              ? 'Search results'
              : 'All videos'}
          </div>
          <div>
            <EventSelect
              events={eventsWithVideos as IExtendedEvent[]}
            />
          </div>
        </div>
        <Suspense fallback={<ArchiveVideoSkeleton />}>
          <ArchiveVideos
            organizationSlug={process.env.NEXT_ORGANIZATION}
            searchQuery={searchParams.searchQuery || ''}
            page={Number(searchParams.page || 1)}
            event={searchParams.event}
          />
        </Suspense>
      </div>
    </div>
  )
}

export async function generateMetadata(
  { params }: ChannelPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.NEXT_ORGANIZATION) {
    return generalMetadata
  }

  const organization = await fetchOrganization({
    organizationSlug: process.env.NEXT_ORGANIZATION,
  })

  if (!organization) {
    return generalMetadata
  }

  return organizationMetadata({
    organization,
  })
}
