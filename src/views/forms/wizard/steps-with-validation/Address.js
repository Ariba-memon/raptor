// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Input as CustomInput } from 'reactstrap'

const defaultValues = {
  passportNo: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  passportPdf: null,
  nationalIdNo: '',
  nationalIdIssueDate: '',
  nationalIdExpiryDate: '',
  nationalIdPdf: null,
  emiratesIdIssueDate: '',
  emiratesIdExpiryDate: '',
  emiratesIdAttachment: null
}

const Address = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    console.log('Submitted data:', data);

    let hasError = false;
    
    // Check if all fields have values
    for (const key in data) {
      if (data[key] === null || (typeof data[key] === 'string' && data[key].trim().length === 0)) {
        setError(key, {
          type: 'manual',
          message: `Please enter a valid ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`
        });
        hasError = true;
      }
    }

    // Log errors for debugging
    console.log('Form errors:', errors);

    // Proceed only if no errors
    if (!hasError) {
      console.log('No errors, proceeding to next step');
      stepper.next();
    } else {
      console.log('Errors present, not proceeding');
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Passport Info</h5>
        <small>Enter Your Passport and Documentation Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='passportNo'>
              Passport No
            </Label>
            <Controller
              id='passportNo'
              name='passportNo'
              control={control}
              render={({ field }) => <Input placeholder='Enter Passport No' invalid={errors.passportNo && true} {...field} />}
            />
            {errors.passportNo && <FormFeedback>{errors.passportNo.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='passportIssueDate'>
              Passport Issue Date
            </Label>
            <Controller
              id='passportIssueDate'
              name='passportIssueDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.passportIssueDate && true} {...field} />}
            />
            {errors.passportIssueDate && <FormFeedback>{errors.passportIssueDate.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='passportExpiryDate'>
              Passport Expiry Date
            </Label>
            <Controller
              id='passportExpiryDate'
              name='passportExpiryDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.passportExpiryDate && true} {...field} />}
            />
            {errors.passportExpiryDate && <FormFeedback>{errors.passportExpiryDate.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='passportPdf'>
              Passport PDF
            </Label>
            <Controller
              id='passportPdf'
              name='passportPdf'
              control={control}
              render={({ field }) => (
                <CustomInput type='file' id='passportPdf' label='Choose a file or drop it here...' invalid={errors.passportPdf && true} {...field} />
              )}
            />
            {errors.passportPdf && <FormFeedback>{errors.passportPdf.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nationalIdNo'>
              National Id No
            </Label>
            <Controller
              id='nationalIdNo'
              name='nationalIdNo'
              control={control}
              render={({ field }) => <Input placeholder='Enter National Id No' invalid={errors.nationalIdNo && true} {...field} />}
            />
            {errors.nationalIdNo && <FormFeedback>{errors.nationalIdNo.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nationalIdIssueDate'>
              National Id Issue Date
            </Label>
            <Controller
              id='nationalIdIssueDate'
              name='nationalIdIssueDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.nationalIdIssueDate && true} {...field} />}
            />
            {errors.nationalIdIssueDate && <FormFeedback>{errors.nationalIdIssueDate.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nationalIdExpiryDate'>
              National Id Expiry Date
            </Label>
            <Controller
              id='nationalIdExpiryDate'
              name='nationalIdExpiryDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.nationalIdExpiryDate && true} {...field} />}
            />
            {errors.nationalIdExpiryDate && <FormFeedback>{errors.nationalIdExpiryDate.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='nationalIdPdf'>
              National ID PDF
            </Label>
            <Controller
              id='nationalIdPdf'
              name='nationalIdPdf'
              control={control}
              render={({ field }) => (
                <CustomInput type='file' id='nationalIdPdf' label='Choose a file or drop it here...' invalid={errors.nationalIdPdf && true} {...field} />
              )}
            />
            {errors.nationalIdPdf && <FormFeedback>{errors.nationalIdPdf.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='emiratesIdIssueDate'>
              Emirates Id Issue Date
            </Label>
            <Controller
              id='emiratesIdIssueDate'
              name='emiratesIdIssueDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.emiratesIdIssueDate && true} {...field} />}
            />
            {errors.emiratesIdIssueDate && <FormFeedback>{errors.emiratesIdIssueDate.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='emiratesIdExpiryDate'>
              Emirates Id Expiry Date
            </Label>
            <Controller
              id='emiratesIdExpiryDate'
              name='emiratesIdExpiryDate'
              control={control}
              render={({ field }) => <Input type='date' invalid={errors.emiratesIdExpiryDate && true} {...field} />}
            />
            {errors.emiratesIdExpiryDate && <FormFeedback>{errors.emiratesIdExpiryDate.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='emiratesIdAttachment'>
              Emirates Id Attachment
            </Label>
            <Controller
              id='emiratesIdAttachment'
              name='emiratesIdAttachment'
              control={control}
              render={({ field }) => (
                <CustomInput type='file' id='emiratesIdAttachment' label='Choose a file or drop it here...' invalid={errors.emiratesIdAttachment && true} {...field} />
              )}
            />
            {errors.emiratesIdAttachment && <FormFeedback>{errors.emiratesIdAttachment.message}</FormFeedback>}
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

export default Address
