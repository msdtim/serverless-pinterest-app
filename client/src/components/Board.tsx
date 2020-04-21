import * as React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
import { BoardModel } from '../types/BoardModel'
import { Link } from 'react-router-dom'

interface BoardCardProps {
  board: BoardModel
}

interface BoardCardState {
}

export class Board extends React.PureComponent<BoardCardProps, BoardCardState> {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Link to={`/images/${this.props.board.id}`}>{this.props.board.name}</Link>
            <Button
                  icon
                  color="red"
                  size="mini"
                  //onClick={() => this.onTodoDelete(todo.todoId)}
                  floated="right"
                >
                  <Icon name="delete" />
            </Button>
          </Card.Header>
          <Card.Description>{this.props.board.description}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
