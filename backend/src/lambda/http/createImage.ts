import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreateImageRequest } from '../../requests/CreateImageRequest'
import { boardExists } from '../../businessLogic/boards'
import { createImage, getUploadUrl } from '../../businessLogic/images'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const boardId = event.pathParameters.boardId
  const validBoardId = await boardExists(boardId, jwtToken)

  if (!validBoardId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Board not found'
      })
    }
  }

  const newImage: CreateImageRequest = JSON.parse(event.body)
  const newItem = await createImage(newImage, boardId, jwtToken)

  const url = getUploadUrl(newItem.imageId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}
