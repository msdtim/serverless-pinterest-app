import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getAllImages } from '../api/images-api'
import { Card, Divider, Button, Icon, Image } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'

interface ImagesDiscoverProps {
  history: History
  auth: Auth
  match: {
    params: {
      boardId: string
    }
  }
}

interface ImagesDiscoverState {
  images: ImageModel[]
}

export class ImagesDiscover extends React.PureComponent<
  ImagesDiscoverProps,
  ImagesDiscoverState
> {
  state: ImagesDiscoverState = {
    images: [],
  }

  async componentDidMount() {
    try {
      const images = await getAllImages(this.props.auth.getIdToken())
      this.setState({
        images
      })
    } catch (e) {
      alert(`Failed to fetch images for board : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Discover</h1>

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
                      // onClick={() => this.onPinImage(image.imageId)}
                      floated="right"
                    >
                      <Icon name="pin" />
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