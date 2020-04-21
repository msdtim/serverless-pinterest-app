import React, { Component } from 'react'
import { BoardsList } from './components/BoardsList'
import { Router, Link, Route, Switch } from 'react-router-dom'
import { Grid, Menu, Segment, Input } from 'semantic-ui-react'
import { ImagesList } from './components/ImagesList'
import { NotFound } from './components/NotFound'
import { CreateImage } from './components/CreateImage'
import { CreateBoard } from './components/CreateBoard'
import Auth from './auth/Auth'
import { ImagesDiscover } from './components/ImagesDiscover'
import { ImagesPins } from './components/ImagesPins'

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">My Boards</Link>
        </Menu.Item>
        <Menu.Item name="myPins">
          <Link to="/pins">My Pins</Link>
        </Menu.Item>
        <Menu.Item name="discover">
          <Link to="/images">Discover</Link>
        </Menu.Item>
        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    return (
      <Switch>
        <Route
          path="/boards/create"
          exact
          render={props => {
            return <CreateBoard {...props} auth={this.props.auth} />
          }}
        />

        <Route path="/images/:boardId" 
          exact 
          render={props => {
            return <ImagesList {...props} auth={this.props.auth} />
          }} />
        />

        <Route path="/images" 
          exact 
          render={props => {
            return <ImagesDiscover {...props} auth={this.props.auth} />
          }} />
        />

        <Route path="/pins" 
          exact 
          render={props => {
            return <ImagesPins {...props} auth={this.props.auth} />
          }} />
        />

        <Route
          path="/images/:boardId/create"
          exact
          render={props => {
            return <CreateImage {...props} auth={this.props.auth} />
          }}
        />

        <Route path="/" exact           
          render={props => {
            return <BoardsList {...props} auth={this.props.auth} />
          }} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
