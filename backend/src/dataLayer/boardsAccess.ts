import * as AWS  from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { Board } from '../models/Board'

export class BoardAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly boardsTable = process.env.BOARDS_TABLE) {
  }

  async getBoards(userId: string): Promise<Board[]> {
    console.log('Getting boards')
    const result = await this.docClient.query({
      TableName: this.boardsTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as Board[]
  }

  async boardExists(userId: string, boardId: string): Promise<boolean> {
    const params = {
      TableName: this.boardsTable,
      Key: {
        id: boardId,
        userId: userId
      }
    }
    const result = await this.docClient.get(params).promise()

    return !!result.Item
  }

  async createBoard(board: Board): Promise<Board> {
    await this.docClient.put({
      TableName: this.boardsTable,
      Item: board
    }).promise()

    return board
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}