import * as z from 'zod'

const GSheetConfigSchema = z.object({
  sheetId: z.string().optional(),
  apiKey: z.string().optional(),
  driveId: z.string().optional(),
  driveApiKey: z.string().optional(),
})

const PretalxConfigSchema = z.object({
  url: z.string(),
  apiToken: z.string(),
})

const IDataImporterSchema = z.union([
  z.object({ type: z.literal('gsheet'), config: GSheetConfigSchema }),
  z.object({
    type: z.literal('pretalx'),
    config: PretalxConfigSchema,
  }),
])

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string(),
  start: z.date(),
  end: z.date(),
  location: z.string(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  eventCover: z.string().optional(),
  archiveMode: z.boolean().optional(),
  website: z.string().optional(),
  timezone: z.string().min(1, 'timezone is required'),
  accentColor: z.string().min(1, { message: 'color is required' }),
  unlisted: z.boolean().optional(),
  enableVideoDownloader: z.boolean().optional(),
  dataImporter: z.array(IDataImporterSchema).optional(),
})

const IPluginsSchema = z.object({
  disableChat: z.boolean(),
  hideSchedule: z.boolean().optional(),
  hideSpeaker: z.boolean().optional(),
})

const IEventNFTSchema = z.object({
  address: z.string().optional(),
  name: z.string().optional(),
  symbol: z.string().optional(),
  uri: z.string().optional(),
  limitedSupply: z.string().optional(),
  maxSupply: z.string().optional(),
  mintFee: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
})

export const eventSchema = z.object({
  ...formSchema.shape,
  dataImporter: z.array(IDataImporterSchema).optional(),
  plugins: IPluginsSchema.optional(),
  unlisted: z.boolean().optional(),
  archiveMode: z.boolean().optional(),
  eventNFT: IEventNFTSchema.optional(),
})

const IStreamSettingsSchema = z.object({
  streamId: z.string().optional(),
})

const IPluginSchema = z.object({
  name: z.string(),
})

export const StageSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is Required' })
    .max(55, { message: 'Name is too long. (Max 30 length)' }),
  eventId: z.string().optional(),
  streamSettings: IStreamSettingsSchema.optional(),
  plugins: z.array(IPluginSchema).optional(),
  order: z.number().optional(),
  streamDate: z.date().optional(),
  streamTime: z.string().optional(),
  thumbnail: z.string().optional(),
  organizationId: z.string(),
})

// Sessions

// Define a schema for the speaker
const speakerSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  eventId: z.string(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  website: z.string().optional(),
  photo: z.string().optional(),
  company: z.string().optional(),
})

export const sessionSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(25, { message: 'Name is too long' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(150, { message: 'Description is too long' }),
  coverImage: z.string().optional(),
  assetId: z.string().min(1, { message: 'Please upload a video' }),
})

export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(25, { message: 'Name is too long' }),
  logo: z.string().min(1, 'Logo is required'),
  banner: z.string().optional(),
  bio: z.string().optional(),
  description: z
    .string()
    .max(400, { message: 'Description is too long' })
    .optional(),
  email: z.string().email().min(1, 'Email is required'),
  // url: z.string().optional(),
})

export const supportSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  telegram: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
})

export const nftSchema = z.object({
  name: z.string().min(1, 'Message is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description is too long'),
  thumbnail: z.string(),
  symbol: z.string(),
  mintFee: z.string(),
  maxSupply: z.string(),
  limitedSupply: z.string(),
})

export const addOrganizationMemberSchema = z.object({
  walletAddress: z
    .string()
    .min(42, 'WalletAddress is required')
    .max(42, 'Check Wallet Address'),
})
