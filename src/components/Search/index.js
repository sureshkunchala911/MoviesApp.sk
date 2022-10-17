import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'
import Navbar from '../Navbar'
import Footer from '../Footer'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    apiStatus: status.initial,
    moviesList: [],
  }

  componentDidMount() {
    this.getSearchData()
  }

  getSearchData = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: status.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
      console.log(updatedData)
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  searchInput = text => {
    this.setState(
      {
        searchInput: text,
      },
      this.getSearchData,
    )
  }

  renderFailureView = () => (
    <div>
      <h1>Failure</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  notFound = () => (
    <div>
      <p>Not Found</p>
    </div>
  )

  renderSuccessView = () => {
    const {moviesList} = this.state
    const length = moviesList.length > 0
    return (
      <>
        {length ? (
          <div>
            <ul className="moviesList">
              {moviesList.map(eachMovie => (
                <Link to={`/movies/${eachMovie.id}`}>
                  <li className="listMovie" key={eachMovie.id}>
                    <img
                      className="popularImg"
                      src={eachMovie.posterPath}
                      alt={eachMovie.title}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          this.notFound()
        )}
      </>
    )
  }

  renderCheckView = () => {
    const {searchInput} = this.state
    const emptySearch = searchInput === ''
    return (
      <div>
        {emptySearch ? (
          <div>
            <p className="empty-text">
              Search the movie,by clicking on the search Icon
            </p>
          </div>
        ) : (
          this.renderSuccessView()
        )}
      </div>
    )
  }

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.success:
        return this.renderCheckView()
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
        <div>
          <Navbar searchInput={this.searchInput} />
        </div>
        <div className="moviesContainer">{this.renderPopularMovies()}</div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default Search
