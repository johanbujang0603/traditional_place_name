import { Heart } from 'react-feather'
import { Button, UncontrolledTooltip } from 'reactstrap'

import './tooltip.css'

const Footer = () => {
  const iconImg = require('@src/assets/images/footer_icon.png').default
  return (
    <>
    <span className='clearfix mb-0 d-flex align-items-center justify-content-center'>
      © 2021 - All rights reserved. Made with <Heart size={14} />&nbsp; in Kuring-gai Country. 
    </span>
    <div className="w-100 text-center mt-1">
      <Button id='tooltip' className="px-0 py-0">
        <img src={iconImg}  width={50} alt="logo" />
      </Button>
      <UncontrolledTooltip placement='top' target='tooltip'>
        I acknowledge the Traditional Owners of the land where I work and live. I pay my respects to their Elders, past, present and emerging. I celebrate the stories, culture and traditions of Aboriginal and Torres Strait Islander Elders of all communities who also work and live on this land.
      </UncontrolledTooltip>
    </div>
    </>
  )
}

export default Footer
