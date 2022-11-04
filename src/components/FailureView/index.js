import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }
  return (
    <div className="home-failure">
      <img
        className="failed-image"
        alt="failure view"
        src="https://res.cloudinary.com/dxwppeplp/image/upload/v1666277416/Background-Complete_clrale.png"
      />
      <p className="home-failed-heading">
        Something went wrong. Please try again
      </p>
      <button className="home-retry-btn" type="button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
