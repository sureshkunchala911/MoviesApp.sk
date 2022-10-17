import {FaGoogle, FaTwitter, FaInstagram} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footerContainer">
      <button type="button" className="iconButton">
        <FaGoogle className="footerIcons" />
      </button>
      <button type="button" className="iconButton">
        <FaTwitter className="footerIcons" />
      </button>
      <button type="button" className="iconButton">
        <FaInstagram className="footerIcons" />
      </button>
    </div>
    <p className="footerContactUs">Contact us </p>
  </>
)
export default Footer
