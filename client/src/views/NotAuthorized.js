import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import notAuthImg from '@src/assets/images/pages/autofast-error.jpg'

import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  const logoImage = require('@src/assets/images/logo/logo.png').default
  const footerLogo = require('@src/assets/images/logo/footer_logo.png').default
  return (
    <>
      <div className='misc-wrapper bg-white'>
        <div className='misc-inner p-2 p-sm-3 text-center'>
          <img src={logoImage} width={300} className="mb-3" />
          <div className='w-100 text-center'>
            <h2 className='mb-1'>You are not authorized! 🔐</h2>
            <p className='mb-2'>
              Your account role permissions does not allow you to access this page
            </p>
            <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
              Back to homepage
            </Button.Ripple>
            <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
          </div>
        </div>
    
        <p className='clearfix mb-0 d-flex align-items-center justify-content-center px-2' style={{ position: 'absolute', bottom: '30px'}}>
          <img src={footerLogo} alt="Footer Logo" height={25} className="mr-1" />
          © 2021 - All rights reserved. CFAO Automotive.
        </p>
      </div>
    </>
  )
}
export default NotAuthorized
