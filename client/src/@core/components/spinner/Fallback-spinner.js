// ** Loading Gif
import loadingGif from '@src/assets/images/spinner.svg'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={loadingGif} alt='logo' />
    </div>
  )
}

export default SpinnerComponent
