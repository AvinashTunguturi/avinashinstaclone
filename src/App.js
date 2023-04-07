import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import SearchContext from './context/SearchContext'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    searchInput: '',
    searchOn: false,
    searchOff: true,
  }

  onClickSearchButton = searchText => {
    this.setState({
      searchInput: searchText,
      searchOn: true,
      searchOff: false,
    })
  }

  onClickRouteLink = () => {
    this.setState({
      searchOn: false,
      searchOff: true,
    })
  }

  render() {
    const {searchInput, searchOn, searchOff} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          searchOn,
          searchOff,
          onClickSearchButton: this.onClickSearchButton,
          onClickRouteLink: this.onClickRouteLink,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />

          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute path="/users/:userId" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
