import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IExtendedOrganization, IExtendedStage } from '@/lib/types'
import { formatDate } from '@/lib/utils/time'
import Link from 'next/link'
import React from 'react'
import DeleteLivestream from './DeleteLivestream'

import ShareLivestream from './ShareLivestream'
import ToggleLivestreamVisibility from './ToggleLivestreamVisibility'
import TableSort from '@/components/misc/TableSort'
import { Button } from '@/components/ui/button'
import { ScissorsLineDashed } from 'lucide-react'
import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import DefaultThumbnail from '@/lib/svg/DefaultThumbnail'
import CreateLivestreamModal from './CreateLivestreamModal'
import EditLivestream from './EditLivestream'

const LivestreamTable = ({
  streams,
  organizationSlug,
  organization,
}: {
  organization: IExtendedOrganization
  streams: IExtendedStage[]
  organizationSlug: string
}) => {
  // TODO: Somewhere in the last Table cell is a hydration error

  return (
    <div>
      <Table className="bg-white">
        <TableHeader className="sticky top-0 z-50 bg-white">
          <TableRow className="hover:bg-white">
            <TableHead>
              <TableSort title="Title" sortBy="name" />
            </TableHead>
            <TableHead>
              <TableSort title="Date" sortBy="date" />
            </TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {streams?.map((stream) => (
            <TableRow key={stream._id}>
              <TableCell className="font-medium max-w-[500px]">
                <Link
                  key={stream._id}
                  href={`/studio/${organizationSlug}/livestreams/${stream?._id}`}>
                  <div className="flex flex-row items-center space-x-4 w-full">
                    <div className="overflow-hidden min-w-[100px] w-[100px]">
                      {stream.thumbnail ? (
                        <Thumbnail imageUrl={stream.thumbnail} />
                      ) : (
                        <DefaultThumbnail />
                      )}
                    </div>
                    <p className="hover:underline line-clamp-3">
                      {stream?.name}
                    </p>
                  </div>
                </Link>
              </TableCell>

              <TableCell>
                {stream.streamDate ? (
                  <p>
                    {formatDate(
                      new Date(stream?.streamDate),
                      'ddd. MMMM. D, YYYY'
                    )}{' '}
                    {new Date(stream.streamDate) > new Date() && (
                      <span className="block text-sm text-muted-foreground">
                        Scheduled
                      </span>
                    )}
                  </p>
                ) : (
                  formatDate(
                    new Date(stream?.createdAt as string),
                    'ddd. MMMM. D, YYYY'
                  )
                )}
              </TableCell>
              <TableCell>
                <ToggleLivestreamVisibility item={stream} />
              </TableCell>
              <TableCell>
                <div className="flex gap-3 items-center">
                  <EditLivestream
                    organizationSlug={organizationSlug}
                    livestream={stream}
                  />
                  <Link
                    href={`/studio/${organizationSlug}/clips?stage=${stream._id}`}>
                    <Button
                      variant="outline"
                      className="flex gap-1 items-center">
                      <ScissorsLineDashed className="w-4 h-4" />
                      Clip
                    </Button>
                  </Link>
                  <ShareLivestream
                    organization={organizationSlug}
                    streamId={stream._id}
                  />
                  <DeleteLivestream stream={stream} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default LivestreamTable
