import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createBoard } from '../api/boards-api'
import { Redirect } from 'react-router-dom'
import Auth from '../auth/Auth'

interface CreateBoardProps {
  auth: Auth
}

interface CreateBoardState {
  name: string
  description: string
  uploadingBoard: boolean
  redirect: boolean
}

export class CreateBoard extends React.PureComponent<
  CreateBoardProps,
  CreateBoardState
> {
  state: CreateBoardState = {
    name: '',
    description: '',
    uploadingBoard: false,
    redirect: false
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.name || !this.state.description) {
        alert('Name and description should be provided')
        return
      }

      this.setUploadState(true)
      const board = await createBoard(this.props.auth.getIdToken(), {
        name: this.state.name,
        description: this.state.description
      })

      console.log('Created description', board)

      alert('Board was created!')
      this.setRedirect(true)
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      this.setUploadState(false)
    }
  }

  setUploadState(uploadingBoard: boolean) {
    this.setState({
      uploadingBoard
    })
  }

  setRedirect(redirect: boolean) {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <h1>Upload new board</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Board name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Board description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <Button loading={this.state.uploadingBoard} type="submit">
        Create
      </Button>
    )
  }
}
