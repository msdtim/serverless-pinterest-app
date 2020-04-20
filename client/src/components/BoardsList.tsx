import * as React from 'react'
import { BoardModel } from '../types/BoardModel'
import { Board } from './Board'
import { getBoards } from '../api/boards-api'
import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

interface BoardsListProps {
  history: History
}

interface BoardsListState {
  boards: BoardModel[]
}

export class BoardsList extends React.PureComponent<BoardsListProps, BoardsListState> {
  state: BoardsListState = {
    boards: []
  }

  handleCreateBoard = () => {
    this.props.history.push(`/boards/create`)
  }

  async componentDidMount() {
    try {
      const boards = await getBoards()
      this.setState({
        boards
      })
    } catch (e) {
      alert(`Failed to fetch boards: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Boards</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateBoard}
        >
          Create new board
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.boards.map(board => {
            return <Board key={board.id} board={board} />
          })}
        </Card.Group>
      </div>
    )
  }
}
