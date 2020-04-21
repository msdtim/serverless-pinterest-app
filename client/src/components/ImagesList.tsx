import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getImages, deleteImage } from '../api/images-api'
import { getBoard } from '../api/boards-api'
import { Card, Divider, Button, Icon, Image } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'

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

  onImageDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId, this.props.auth.getIdToken())
      this.setState({
        images: this.state.images.filter(image => image.imageId != imageId)
      })
    } catch {
      alert('Todo deletion failed')
    }
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

        <Card.Group itemsPerRow={3}>
          {this.state.images.map(image => {
            return       <Card fluid color="blue" key={image.imageId}>
            <Card.Content>
              <Card.Header>{image.title}
                <Button
                      icon
                      color="red"
                      size="small"
                      onClick={() => this.onImageDelete(image.imageId)}
                      floated="right"
                    >
                      <Icon name="delete" />
                </Button>
              </Card.Header>
              <Card.Description>{image.timestamp}</Card.Description>
              {image.imageUrl && (
                <Image src={image.imageUrl} />
              )}
            </Card.Content>
          </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
