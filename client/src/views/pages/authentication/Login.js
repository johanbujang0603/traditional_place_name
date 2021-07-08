import { useState, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import InputPasswordToggle from '@components/input-password-toggle'
import { toast, Slide } from 'react-toastify'
import { isObjEmpty } from '@utils'
import { handleLogin } from '@store/actions/auth'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { Coffee, X } from 'react-feather'
import axios from 'axios'
import '@styles/base/pages/page-auth.scss'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Autofast Nigeria. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const ErrorToast = (error) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Error!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        error
      </span>
    </div>
  </Fragment>
)

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()

  const appLogo = require('@src/assets/images/logo/logo.png').default

  const { register, errors, handleSubmit } = useForm()

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      axios
      .post("/api/authenticate/login", {
        email: data.email,
        password: data.password
      })
      .then(response => {
        if (response.data) {
          const {user, token} = response.data
          dispatch(handleLogin({user, token}))
          toast.success(
            <ToastContent name={"Administrator"} role={'admin'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          history.push("/dashboard")
        }
      })
      .catch(err => {
        if (err.response.data.message) toast.error(<ErrorToast err={err.response.data.message} />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      })
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            {/* <img className='img-fluid' src={source} alt='Login V2' /> */}
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5 position-relative' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <img src={appLogo}  width={200} alt="logo" className='mb-2' />
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  name='email'
                  id='email'
                  placeholder='john@example.com'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}  
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple type="submit" color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
