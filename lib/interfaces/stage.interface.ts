export interface TargetOutput {
  id?: string
  name?: string
}
export interface IStreamSettings {
  streamId?: string
  parentId?: string
  playbackId?: string
  isHealthy?: boolean
  isActive?: boolean
  streamKey?: string
  ipfshash?: string
  targets?: TargetOutput[] // stream?.multistream?.targets
}

export interface IPlugin {
  name: string
}

export class IStage {
  _id?: string
  name: string
  description?: string
  eventId?: string
  streamSettings?: IStreamSettings
  plugins?: IPlugin[]
  order?: number
  slug?: string
  published?: boolean
  organizationId: string
  thumbnail?: string
  streamDate?: Date | string
  mintable?: boolean
  createdAt?: string
  nftCollections?: string[]
}
