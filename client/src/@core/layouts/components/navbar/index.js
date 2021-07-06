// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Custom Components
import NavbarUser from './NavbarUser'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      
      <Link to='/' className='navbar-brand-mobile'>
        <span className='brand-logo-mobile'>
          <img src={themeConfig.app.appLogoImage} alt='logo' />
        </span>
      </Link>
      <NavbarUser skin={skin} setSkin={setSkin} setMenuVisibility={setMenuVisibility} />
    </Fragment>
  )
}

export default ThemeNavbar
