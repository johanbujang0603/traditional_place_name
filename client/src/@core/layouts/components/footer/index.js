const Footer = () => {
  const footerLogo = require('@src/assets/images/logo/footer_logo.png').default
  return (
    <p className='clearfix mb-0 d-flex align-items-center justify-content-center'>
      <img src={footerLogo} alt="Footer Logo" height={25} className="mr-1" />
      © 2021 - All rights reserved. CFAO Automotive.
    </p>
  )
}

export default Footer
