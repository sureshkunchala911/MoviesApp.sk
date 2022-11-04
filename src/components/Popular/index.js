import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Movie from '../Movie'
import './index.css'
import FailureView from '../FailureView'
import Navbar from '../Navbar'
import Footer from '../Footer'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: status.initial,
    moviesList: [],
  }

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({apiStatus: status.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        title: each.title,
      }))
      this.setState({moviesList: updatedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  onRetry = () => this.getPopularData()

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  renderSuccessView = () => {
    const {moviesList} = this.state
    return (
      <div className="popularListContainer">
        <ul className="moviesListPopular">
          {moviesList.map(eachMovie => (
            <Movie eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.success:
        return this.renderSuccessView()
      case status.failure:
        return this.renderFailureView()
      case status.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="popularContainer">
        <Navbar />
        <div className="moviesContainer">{this.renderPopularMovies()}</div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default Popular
