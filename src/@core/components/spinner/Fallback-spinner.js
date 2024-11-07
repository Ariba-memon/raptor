// ** Logo
import logo from '@src/assets/images/pages/Scooter.svg'
import raptorLogo from '../../../@core/assets/images/Raptor-logo.svg'
const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={logo} alt='logo' width="150px" />
      <img className='fallback-logo' src={raptorLogo} alt='logo' width="80px" />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
