import { IOrganization } from '@/lib/interfaces/organization.interface'
import { IEvent } from '@/lib/interfaces/event.interface'
import { ISession } from '@/lib/interfaces/session.interface'
import { IStage } from '@/lib/interfaces/stage.interface'
import { ISpeaker } from '@/lib/interfaces/speaker.interface'
import { IState } from '@/lib/interfaces/state.interface'
import { IUser } from '@/lib/interfaces/user.interface'
import { IChat } from '@/lib/interfaces/chat.interface'
import { INftCollection } from '@/lib/interfaces/nft.collection.interface'

export enum eSort {
  asc_alpha = 'asc_alpha',
  desc_alpha = 'desc_alpha',
  asc_date = 'asc_date',
  desc_date = 'desc_date',
}

export enum eLayout {
  grid = 'grid',
  list = 'list',
}

export interface Page {
  name: string
  href: string
  bgColor?: string
  icon?: React.JSX.Element
}
export interface NavBarProps {
  pages: Page[]
  logo: string
  homePath: string
  showNav: boolean
}

export interface EventPageProps {
  params: {
    event: string
    organization: string
    stage?: string
  }
  searchParams: {
    stage?: string
    date?: string
    page?: number
  }
}
export interface SearchPageProps {
  searchParams: {
    organization?: IOrganization['slug']
    event?: string
    searchQuery?: string
    page?: string
  }
}

export interface OrganizationPageProps {
  params: {
    organization: string
  }
  searchParams: {
    id: string
    streamId: string
    session: string
    event?: string
    searchQuery?: string
    page?: string
    collectionId?: string
    stage?: string
  }
}

export interface WatchPageProps {
  searchParams: {
    event: string
    session: string
    assetId: string
  }
}

export interface IPagination {
  currentPage?: number
  totalPages: number
  totalItems: number
  limit: number
}
export interface studioPageParams {
  params: {
    organization: string
    session: string
    eventId?: string
  }
  searchParams: {
    eventId?: string
    settings: string
    stage: string
    stageSetting: string
    streamId: string
    collapsed?: boolean
  }
}

export interface ClipsPageParams {
  params: {
    organization: string
    session: string
    eventId: string
  }
  searchParams: {
    stage: string
    selectedSession: string
    selectedRecording: string
    replaceAsset: string
    previewId: string
  }
}

export interface IGoogleAuth {
  web: {
    client_id: string
    project_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_secret: string
    redirect_uris: string[]
    javascript_origins: string[]
  }
}

export interface IExtendedEvent extends IEvent {
  _id: string
}
export interface IExtendedOrganization
  extends Omit<IOrganization, '_id'> {
  _id: string
}
export interface IExtendedSession
  extends Omit<ISession, '_id' | 'nftCollections'> {
  _id: string
  nftCollections?: string[]
  createdAt?: string
  updatedAt?: string
  __v?: string
}
export interface IExtendedStage
  extends Omit<IStage, '_id' | 'nftCollections'> {
  _id?: string
  nftCollections?: string[]
  createdAt?: string
  updatedAt?: string
  __v?: string
}
export interface IExtendedSpeaker
  extends Omit<ISpeaker, 'organizationId'> {}
export interface IExtendedUser extends Omit<IUser, 'organizations'> {
  _id: string
  organizations: IExtendedOrganization[]
}
export interface IExtendedChat extends Omit<IChat, '_id'> {
  _id: string
}

export interface IExtendedState extends Omit<IState, '_id'> {
  _id: string
}

export interface IExtendedNftCollections
  extends Omit<INftCollection, '_id'> {
  _id: string
  createdAt?: string
  updatedAt?: string
  __v?: string
}

export interface EmbedPageParams {
  searchParams: {
    vod: string
    playbackId: string
  }
}

export interface LivestreamPageParams {
  params: {
    organization: string
    streamId: string
  }
  searchParams: { layout: eLayout; sort: eSort; show: boolean }
}

export interface IGenerateEmbed {
  playbackId?: string
  vod?: boolean
  streamId?: string
  playerName: string
}

export interface IGenerateEmbedCode extends IGenerateEmbed {
  url: string
}

export interface ChannelPageParams {
  params: {
    organization: string
  }
  searchParams: {
    tab?: string
    search: string
    id: string
    streamId: string
  }
}

export interface INFTSessions extends IExtendedSession {
  videoType: string
}
