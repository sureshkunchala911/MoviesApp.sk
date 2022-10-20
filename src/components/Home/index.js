import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Poster from '../Poster/index'
import Trending from '../Trending/index'
import Originals from '../Originals/index'
import FailureView from '../FailureView'
import Footer from '../Footer/index'
import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    mainPoster: {},
    apiStatus: status.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: status.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const dataLength = data.total
      const randomPoster = data.results[Math.floor(Math.random() * dataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      this.setState({mainPoster: {...updatedData}, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderSuccessView = () => {
    const {mainPoster} = this.state
    return (
      <>
        <Poster details={mainPoster} />
        {/* <div className="homeContainer">
          <div className="home-sizes-container">
            <Poster details={mainPoster} />
          </div>
        </div>
        <div className="trendingContainer">
          <h1 className="trending">Trending</h1>
          <Trending />
        </div>
        <div className="originalContainer">
          <h1 className="original">Original</h1>
          <Originals />
        </div>
        <div>
          <Footer />
        </div> */}
      </>
    )
  }

  onRetry = () => {
    this.getData()
  }

  renderFailureView = () => (
    <div>
      <FailureView onRetry={this.onRetry} />
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

  poster = () => {
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
      <>
        {/* <div className="homeContainer">
          <div className="homeContainer">
            {a && <Navbar />}
            {this.poster()}
          </div>
        </div> */}
        <div className="homeContainer">
          <div className="home-sizes-container">{this.poster()}</div>
        </div>
        <div className="trendingContainer">
          <h1 className="trending">Trending</h1>
          <Trending />
        </div>
        <div className="originalContainer">
          <h1 className="original">Original</h1>
          <Originals />
        </div>
        <div>
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
