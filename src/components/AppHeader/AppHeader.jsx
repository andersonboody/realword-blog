import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './AppHeader.scss'
import icon from '../../assets/image/smiley.png'
import { logout } from '../../store/slices/usersSlice'

const AppHeader = () => {
  const { userName, auth, image } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  const isSignInPage = location.pathname === '/sign-in'
  const isSignUpPage = location.pathname === '/sign-up'

  const logoutSite = () => {
    dispatch(logout())
    document.cookie = `token=;expires=${new Date(0)}`
    navigate('/')
  }

  return (
    <div className="header__inner">
      <div className="header__logo">
        <Link to={'/articles'} className="header__logo-link">
          Realworld Blog
        </Link>
      </div>
      {auth ? (
        <div className="header__btn-group">
          <Link to={'/new-article'} className="btn btn-create">
            Create article
          </Link>
          <Link to={'/profile'} className="header__card card">
            <span className="header__card-name">{userName}</span>
            <img src={image ? image : icon} alt="Photo" className="card-avatar" />
          </Link>
          <button className="btn btn-logout" onClick={logoutSite}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="header__btn-group">
          <Link to={'/sign-in'} className={`btn ${isSignInPage ? 'btn--success' : ''}`}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={`btn ${isSignUpPage ? 'btn--success' : ''}`}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
export default AppHeader
