import { apiEndpoint } from '../config'
import { ImageModel } from '../types/ImageModel'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'

export async function getImages(boardId: string, idToken: string): Promise<ImageModel[]> {
  console.log('Fetching images')

  const response = await fetch(`${apiEndpoint}/boards/${boardId}/images`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}

export async function createImage(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {

  const reply = await fetch(
    `${apiEndpoint}/boards/${newImage.boardId}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title
      })
    }
  )

  return await reply.json()
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}

export async function deleteImage(imageId: string, idToken: string): Promise<void> {
  console.log('Deleting images')

  await fetch(`${apiEndpoint}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
}