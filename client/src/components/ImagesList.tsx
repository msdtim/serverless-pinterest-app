import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getImages } from '../api/images-api'
import { getBoard } from '../api/boards-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { UdagramImage } from './UdagramImage'
import { History } from 'history'
import Auth from '../auth/Auth'
import { BoardModel } from '../types/BoardModel'

interface ImagesListProps {
  history: History
  auth: Auth
  match: {
    params: {
      boardId: string
    }
  }
}

interface ImagesListState {
  images: ImageModel[]
  boardName: string
}

export class ImagesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
> {
  state: ImagesListState = {
    images: [],
    boardName: ''
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/${this.props.match.params.boardId}/create`)
  }

  async componentDidMount() {
    try {
      const board = await getBoard(this.props.match.params.boardId, this.props.auth.getIdToken())
      const images = await getImages(this.props.match.params.boardId, this.props.auth.getIdToken())
      this.setState({
        images,
        boardName: board.name
      })
    } catch (e) {
      alert(`Failed to fetch images for board : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.boardName}</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
        >
          Upload new image
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.images.map(image => {
            return <UdagramImage key={image.imageId} image={image} />
          })}
        </Card.Group>
      </div>
    )
  }
}
