import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Navbar extends Component {
  state = {
    showMenuBar: false,
    showSearchBar: false,
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickShowMenu = () => {
    this.setState({showMenuBar: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenuBar: false})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    const {showMenuBar, showSearchBar} = this.state
    const {match} = this.props
    const {path} = match
    let SwitchHome
    let SwitchPopular
    let SwitchAccount
    let contClassName
    console.log(match)
    switch (path) {
      case '/popular':
        SwitchHome = 'No'
        SwitchAccount = 'No'
        SwitchPopular = 'Active'
        contClassName = 'cont'
        break

      case '/account':
        SwitchHome = 'No'
        SwitchPopular = 'No'
        SwitchAccount = 'Active'
        contClassName = 'cont'
        break

      default:
        SwitchHome = 'Active'
        SwitchAccount = 'No'
        SwitchPopular = 'No'
        contClassName = 'navbarContainer'
        break
    }

    if (showMenuBar === true) {
      contClassName = 'cont cont2'
    }

    return (
      <div className={contClassName}>
        <div className="top1">
          <div className="container1">
            <img
              src="https://res.cloudinary.com/dxwppeplp/image/upload/v1664025947/Group_7399_d0or4f.png"
              alt="website logo"
              className="image1"
            />
            <ul className="homeAndPopular">
              <Link to="/" className="nav-link">
                <li className={`Home ${SwitchHome}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popular ${SwitchPopular}`}>Popular</li>
              </Link>
            </ul>
          </div>
          <div className="container2">
            <div className="search-container">
              {(showSearchBar || path === '/search') && (
                <input
                  type="search"
                  onKeyDown={this.onChangeSearchInput}
                  placeholder="search"
                  className="search"
                />
              )}
              <Link to="/search">
                <button type="button" className="icon-button">
                  <AiOutlineSearch
                    className="icon"
                    testid="searchButton"
                    onClick={this.onClickSearchIcon}
                  />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                className="avatar"
                src="https://res.cloudinary.com/dxwppeplp/image/upload/v1665233768/Avatar_tzum69.png"
                alt="avatar"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenuBar && (
          <div>
            <ul className="list-mini">
              <Link to="/" className="nav-link">
                <li className={`Home ${SwitchHome}`}>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popular ${SwitchPopular}`}>Popular</li>
              </Link>

              <Link to="/account" className="nav-link">
                <li className={`popup-heading ${SwitchAccount}`}>Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon1"
              />
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(Navbar)
