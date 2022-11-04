import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footerContainer">
      <FaGoogle className="footerIcons" />

      <FaTwitter className="footerIcons" />

      <FaInstagram className="footerIcons" />

      <FaYoutube className="footerIcons" />
    </div>
    <p className="footerContactUs">Contact us</p>
  </>
)
export default Footer
