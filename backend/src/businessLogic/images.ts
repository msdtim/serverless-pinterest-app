import * as uuid from 'uuid'

import { Image } from '../models/Image'
import { ImagesAccess } from '../dataLayer/imagesAccess'
import { CreateImageRequest } from '../requests/CreateImageRequest'
import { getUserId } from '../auth/utils'

const bucketName = process.env.IMAGES_S3_BUCKET

const imagesAccess = new ImagesAccess()

export async function createImage(
  createImageRequest: CreateImageRequest, 
  boardId: string,
  jwtToken: string
): Promise<Image> {

  const imageId = uuid.v4()
  const userId = 'user'//getUserId(jwtToken)

  return await imagesAccess.createImage({
    boardId: boardId,
    userId: userId,
    timestamp: new Date().toISOString(),
    imageId: imageId,
    title: createImageRequest.title,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  })
}

export function getUploadUrl(imageId: string) {
  return imagesAccess.getUploadUrl(imageId)
}


export async function getImages(boardId: string): Promise<Image[]> {
  return imagesAccess.getImages(boardId)
}