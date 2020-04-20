import { BoardModel } from '../types/BoardModel'
import { apiEndpoint } from '../config'
import { BoardUploadInfo } from '../types/BoardUploadInfo'

export async function getBoards(idToken: string): Promise<BoardModel[]> {
  console.log('Fetching boards')

  const response = await fetch(`${apiEndpoint}/boards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}

export async function createBoard(
  idToken: string,
  newBoard: BoardUploadInfo
): Promise<BoardModel> {
  const reply = await fetch(`${apiEndpoint}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${idToken}`
      'Authorization': `Bearer 123`
    },
    body: JSON.stringify({
      name: newBoard.name,
      description: newBoard.description
    })
  })
  const result = await reply.json()
  return result.newItem
}
