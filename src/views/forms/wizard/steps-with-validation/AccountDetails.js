// ** React Imports
import { Fragment } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  contactNo: '',
  password: '',
  confirmPassword: '',
  alternativeEmail: '',
  alternativeContactNo: '',
  nationality: '',
  dateOfBirth: ''
}

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    contactNo: yup.string().required('Contact number is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    alternativeEmail: yup.string().email('Invalid email'),
    alternativeContactNo: yup.string(),
    nationality: yup.string().required('Nationality is required'),
    dateOfBirth: yup.date().required('Date of Birth is required')
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Account Details</h5>
        <small className='text-muted'>Enter Your Account Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='firstName'>
              First Name
            </Label>
            <Controller
              id='firstName'
              name='firstName'
              control={control}
              render={({ field }) => <Input placeholder='Enter First Name' invalid={errors.firstName && true} {...field} />}
            />
            {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='lastName'>
              Last Name
            </Label>
            <Controller
              id='lastName'
              name='lastName'
              control={control}
              render={({ field }) => <Input placeholder='Enter Last Name' invalid={errors.lastName && true} {...field} />}
            />
            {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <Controller
              control={control}
              id='email'
              name='email'
              render={({ field }) => <Input type='email' placeholder='Enter Email' invalid={errors.email && true} {...field} />}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='contactNo'>
              Contact Number
            </Label>
            <Controller
              control={control}
              id='contactNo'
              name='contactNo'
              render={({ field }) => <Input placeholder='Enter Contact Number' invalid={errors.contactNo && true} {...field} />}
            />
            {errors.contactNo && <FormFeedback>{errors.contactNo.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='password'>
              Password
            </Label>
            <Controller
              id='password'
              name='password'
              control={control}
              render={({ field }) => <Input type='password' placeholder='Enter Password' invalid={errors.password && true} {...field} />}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='confirmPassword'>
              Confirm Password
            </Label>
            <Controller
              control={control}
              id='confirmPassword'
              name='confirmPassword'
              render={({ field }) => <Input type='password' placeholder='Confirm Password' invalid={errors.confirmPassword && true} {...field} />}
            />
            {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='alternativeEmail'>
              Alternative Email
            </Label>
            <Controller
              id='alternativeEmail'
              name='alternativeEmail'
              control={control}
              render={({ field }) => <Input type='email' placeholder='Enter Alternative Email' invalid={errors.alternativeEmail && true} {...field} />}
            />
            {errors.alternativeEmail && <FormFeedback>{errors.alternativeEmail.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='alternativeContactNo'>
              Alternative Contact Number
            </Label>
            <Controller
              id='alternativeContactNo'
              name='alternativeContactNo'
              control={control}
              render={({ field }) => <Input placeholder='Enter Alternative Contact Number' invalid={errors.alternativeContactNo && true} {...field} />}
            />
            {errors.alternativeContactNo && <FormFeedback>{errors.alternativeContactNo.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nationality'>
              Nationality
            </Label>
            <Controller
              id='nationality'
              name='nationality'
              control={control}
              render={({ field }) => <Input placeholder='Select...' invalid={errors.nationality && true} {...field} />}
            />
            {errors.nationality && <FormFeedback>{errors.nationality.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='dateOfBirth'>
              Date of Birth
            </Label>
            <Controller
              id='dateOfBirth'
              name='dateOfBirth'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.dateOfBirth && true} {...field} />}
            />
            {errors.dateOfBirth && <FormFeedback>{errors.dateOfBirth.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
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

export default AccountDetails
