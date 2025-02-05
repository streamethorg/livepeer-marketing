'use server'
import { Livepeer } from 'livepeer'
import {
  createMultistream,
  createStage,
  deleteMultistream,
  deleteStage,
  updateStage,
} from '../services/stageService'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { IExtendedStage } from '../types'

const livepeer = new Livepeer({
  apiKey: process.env.LIVEPEER_API_KEY,
})

export const createStageAction = async ({
  stage,
}: {
  stage: IExtendedStage
}) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }

  const response = await createStage({
    stage: stage,
    authToken,
  })

  if (!response) {
    throw new Error('Error creating stage')
  }
  revalidatePath('/studio')
  return response
}

export const deleteStageAction = async ({
  stageId,
  organizationId,
}: {
  stageId: string
  organizationId: string
}) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }

  const response = await deleteStage({
    stageId,
    organizationId,
    authToken,
  })
  if (!response) {
    throw new Error('Error deleting stage')
  }
  revalidatePath('/studio')
  return response
}

export const getStageStream = async (streamId: string) => {
  try {
    const stream = await livepeer.stream.get(streamId)
    if (!stream.stream) {
      return null
    }
    return stream.stream
  } catch (error) {
    console.error('Error getting stream:', error)
    return null
  }
}

export const createMultistreamAction = async (
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) => {
  'use server'
  const streamId = formData.get('streamId') as string
  const name = formData.get('name') as string
  const url = formData.get('url') as string
  const streamKey = formData.get('streamKey') as string
  const organizationId = formData.get('organizationId') as string

  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }
  try {
    const response = await createMultistream({
      streamId,
      name,
      targetURL: url,
      targetStreamKey: streamKey,
      authToken,
      organizationId,
    })

    revalidatePath('/studio')
    if (!response) {
      throw new Error('Error creating multistream:')
    }
    return { message: response.message, success: true }
  } catch (error) {
    console.error(error)
    return { message: 'Error creating multistream:', success: false }
  }
}

export const deleteMultistreamAction = async (
  streamId: string,
  organizationId: string,
  targetId: string
) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }
  const response = await deleteMultistream({
    streamId,
    targetId,
    organizationId,
    authToken,
  })
  if (!response) {
    throw new Error('Error deleting stage')
  }
  revalidatePath('/studio')

  return response
}

export const getMultistreamTarget = async ({
  targetId,
}: {
  targetId: string
}) => {
  'use server'
  const response = await livepeer.multistream.get(targetId)
  if (response.statusCode !== 200) {
    console.error('Error getting multistream target')
    return null
  }
  revalidatePath('/studio')

  return response.multistreamTarget
}

export const updateStageAction = async ({
  stage,
}: {
  stage: IExtendedStage
}) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }

  const response = await updateStage({
    stage: { ...stage },
    authToken,
  })
  if (!response) {
    throw new Error('Error updating stage')
  }
  revalidatePath('/studio')
  return response
}
