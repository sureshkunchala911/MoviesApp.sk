import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import TrendingCard from '../TrendingCard/index'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: status.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({apiStatus: status.success, trendingList: updatedData})
    } else {
      this.setState({
        apiStatus: status.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <>
        <TrendingCard movies={trendingList} />
      </>
    )
  }

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

  renderFailureView = () => (
    <div>
      <p>Failure view</p>
    </div>
  )

  renderTrending = () => {
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
    return <div className="trending-now-container">{this.renderTrending()}</div>
  }
}
export default Trending
