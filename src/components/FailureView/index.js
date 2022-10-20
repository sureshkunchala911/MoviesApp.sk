import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }
  return (
    <div className="failed-view">
      <img
        className="failed-image"
        src="https://res.cloudinary.com/dxwppeplp/image/upload/v1666277416/Background-Complete_clrale.png"
        alt="failure view"
      />
      <p className="failed-heading">Something went wrong. Please try again</p>
      <button className="retry-btn" type="button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
