import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const passLength = password.length
  const text = '*'
  const stingPass = text.repeat(passLength)
  const logoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="accBg">
      <Navbar />
      <div id="Account2">
        <h1 className="accountHead">Account</h1>
        <hr className="account-hr1" />
        <p className="name">
          Member ship <span className="account-username">{username}</span>
        </p>
        <p className="pass">Password : {stingPass}</p>
        <hr className="account-hr2" />
        <p className="name">
          Plan details{' '}
          <span className="account-username account-premium">Premium</span>
          <span className="account-username ultra">Ultra HD</span>
        </p>
        <hr className="account-hr3" />
        <div className="buttonContainer">
          <button className="accButton" type="button" onClick={logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Account
