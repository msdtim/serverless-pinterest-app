import * as React from 'react'
import { BoardModel } from '../types/BoardModel'
import { getBoards, deleteBoard } from '../api/boards-api'
import { Card, Button, Divider, Icon } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { Link } from 'react-router-dom'

interface BoardsListProps {
  history: History
  auth: Auth
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

  onBoardDelete = async (boardId: string) => {
    try {
      await deleteBoard(boardId, this.props.auth.getIdToken())
      this.setState({
        boards: this.state.boards.filter(board => board.id != boardId)
      })
    } catch {
      alert('Image deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const boards = await getBoards(this.props.auth.getIdToken())
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
        <h1>My Boards</h1>

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
            return       <Card key={board.id}>
            <Card.Content>
              <Card.Header>
                <Link to={`/images/${board.id}`}>{board.name}</Link>
                <Button
                      icon
                      color="red"
                      size="mini"
                      onClick={() => this.onBoardDelete(board.id)}
                      floated="right"
                    >
                      <Icon name="delete" />
                </Button>
              </Card.Header>
              <Card.Description>{board.description}</Card.Description>
            </Card.Content>
            </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
