// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  passportName: '',
  countryOfResidence: '',
  residentStatus: '',
  postalAddress: '',
  whatsappNo: '',
  primaryMobileNo: ''
}

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    let hasError = false;

    // Check if all fields have values
    for (const key in defaultValues) {
      if (data[key] === null || (typeof data[key] === 'string' && data[key].trim().length === 0)) {
        setError(key, {
          type: 'manual',
          message: `Please enter a valid ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`
        });
        hasError = true;
      }
    }

    // Proceed only if no errors
    if (!hasError) {
      stepper.next();
    }
  }

  const countryOptions = [
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'Spain', label: 'Spain' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Australia', label: 'Australia' }
  ]

  const residentStatusOptions = [
    { value: 'Resident', label: 'Resident' },
    { value: 'Non-Resident', label: 'Non-Resident' }
  ]

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Customer Info</h5>
        <small>Enter Your Customer Info.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='passportName'>
              Customer’s Name as per Passport
            </Label>
            <Controller
              id='passportName'
              name='passportName'
              control={control}
              rules={{ required: 'Customer’s Name as per Passport is required' }}
              render={({ field }) => <Input placeholder='Enter Name as per Passport' invalid={errors.passportName && true} {...field} />}
            />
            {errors.passportName && <FormFeedback>{errors.passportName.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='countryOfResidence'>
              Country of Residence
            </Label>
            <Controller
              id='countryOfResidence'
              name='countryOfResidence'
              control={control}
              rules={{ required: 'Country of Residence is required' }}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`countryOfResidence`}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  {...field}
                />
              )}
            />
            {errors.countryOfResidence && <FormFeedback>{errors.countryOfResidence.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='residentStatus'>
              Resident Status
            </Label>
            <Controller
              id='residentStatus'
              name='residentStatus'
              control={control}
              rules={{ required: 'Resident Status is required' }}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`residentStatus`}
                  className='react-select'
                  classNamePrefix='select'
                  options={residentStatusOptions}
                  {...field}
                />
              )}
            />
            {errors.residentStatus && <FormFeedback>{errors.residentStatus.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='postalAddress'>
              Postal Address
            </Label>
            <Controller
              id='postalAddress'
              name='postalAddress'
              control={control}
              rules={{ required: 'Postal Address is required' }}
              render={({ field }) => <Input placeholder='Enter Postal Address' invalid={errors.postalAddress && true} {...field} />}
            />
            {errors.postalAddress && <FormFeedback>{errors.postalAddress.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='whatsappNo'>
              Whatsapp No
            </Label>
            <Controller
              id='whatsappNo'
              name='whatsappNo'
              control={control}
              rules={{ required: 'Whatsapp No is required' }}
              render={({ field }) => <Input placeholder='Enter Whatsapp Number' invalid={errors.whatsappNo && true} {...field} />}
            />
            {errors.whatsappNo && <FormFeedback>{errors.whatsappNo.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='primaryMobileNo'>
              Primary Mobile No
            </Label>
            <Controller
              id='primaryMobileNo'
              name='primaryMobileNo'
              control={control}
              rules={{ required: 'Primary Mobile No is required' }}
              render={({ field }) => <Input placeholder='Enter Primary Mobile Number' invalid={errors.primaryMobileNo && true} {...field} />}
            />
            {errors.primaryMobileNo && <FormFeedback>{errors.primaryMobileNo.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo
