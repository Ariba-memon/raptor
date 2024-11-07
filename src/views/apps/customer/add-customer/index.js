// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import SocialLinks from '../../../forms/wizard/steps-with-validation/SocialLinks'
import Address from '../../../forms/wizard/steps-with-validation/Address'
import PersonalInfo from '../../../forms/wizard/steps-with-validation/PersonalInfo'
import AccountDetails from '../../../forms/wizard/steps-with-validation/AccountDetails'

// ** Steps


const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account Details',
      subtitle: 'Enter Your Account Details.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Customer Info',
      subtitle: 'Add Customer Info',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'Passport Info',
      subtitle: 'Add Passport Info',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'Social Links',
      subtitle: 'Add Social Links',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
