import * as uuid from 'uuid'

import { Board } from '../models/Board'
import { BoardAccess } from '../dataLayer/boardsAccess'
import { CreateBoardRequest } from '../requests/CreateBoardRequest'
import { getUserId } from '../auth/utils'

const boardAccess = new BoardAccess()

export async function getBoards(jwtToken: string): Promise<Board[]> {
  const userId = 'user'//getUserId(jwtToken)
  return boardAccess.getBoards(userId)
}

export async function createBoard(
  createBoardRequest: CreateBoardRequest,
  jwtToken: string
): Promise<Board> {

  const itemId = uuid.v4()
  const userId = 'user'//getUserId(jwtToken)

  return await boardAccess.createBoard({
    id: itemId,
    userId: userId,
    name: createBoardRequest.name,
    description: createBoardRequest.description,
    private: createBoardRequest.private,
    timestamp: new Date().toISOString()
  })
}

export async function boardExists (
  boardId: string,
  jwtToken: string
): Promise<boolean> {
  const userId = 'user'//getUserId(jwtToken)
  return await boardAccess.boardExists(
    userId,
    boardId
  )
}

export async function getBoard (
  boardId: string,
  jwtToken: string
): Promise<Board> {
  const userId = 'user'//getUserId(jwtToken)
  return await boardAccess.getBoard(
    userId,
    boardId
  )
}