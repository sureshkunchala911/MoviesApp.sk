import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Movie from '../Movie'
import './index.css'
import FailureView from '../FailureView/index'
import Navbar from '../Navbar'

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

  onRetry = () => {
    this.getSearchData()
  }

  renderFailureView = () => (
    <div>
      <FailureView onRetry={this.onRetry} />
    </div>
  )

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

  notFound = () => {
    const {searchInput} = this.state
    return (
      <div className="search-no-results-container">
        <img
          className="search-no-results"
          src="https://res.cloudinary.com/dxwppeplp/image/upload/v1666269018/Group_7394_bbxr4k.png"
          alt="search-no-results"
        />
        <p className="no-result-desc">
          {`Your search for ${searchInput} did not find any matches.`}
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {moviesList} = this.state
    const length = moviesList.length > 0
    return (
      <div className="listContainer">
        {length ? (
          <ul className="moviesList">
            {moviesList.map(eachMovie => (
              <Movie eachMovie={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        ) : (
          this.notFound()
        )}
      </div>
    )
  }

  renderCheckView = () => {
    const {searchInput} = this.state
    const emptySearch = searchInput === ''
    let classEmpty = ''
    if (emptySearch) {
      classEmpty = 'empty'
    }
    return (
      <div className={classEmpty}>
        {emptySearch ? (
          <div className="listContainer">
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
      <div className="searchContainer">
        <Navbar searchInput={this.searchInput} />
        <div className="moviesSearchContainer">
          {this.renderPopularMovies()}
        </div>
      </div>
    )
  }
}
export default Search
