import Navbar from '../Navbar/index'
import './index.css'

const Poster = props => {
  const {details} = props
  const {backdropPath, title, overview} = details
  const backgroundColor = '#131313'

  return (
    <>
      <div
        className="devices-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <Navbar oneProp={backgroundColor} />
        <div className="nameContainer">
          <h1 className="title1">{title}</h1>
          <p className="overView">{overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    </>
  )
}
export default Poster
