import './App.css'
import {Switch, Redirect, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import Account from './components/Account'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <div className="main-container">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
