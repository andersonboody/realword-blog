import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import '../../styles/AppForm.scss'
import { registrationUser } from '../../store/slices/usersSlice'
import {
  InputCheckboxConsent,
  InputEmail,
  InputPassword,
  InputRepeatPassword,
  InputUserName,
} from '../ui/formValidationUser'

const AppRegistration = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const submitHandler = (data) => {
    dispatch(registrationUser(data))
  }

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          <h3 className="form-title">Create new account</h3>

          <InputUserName register={register} errors={errors} />
          <InputEmail register={register} errors={errors} />
          <InputPassword register={register} errors={errors} show={show} setShow={setShow} />
          <InputRepeatPassword register={register} errors={errors} watch={watch} show={show} setShow={setShow} />
          <InputCheckboxConsent register={register} errors={errors} />

          <button className="form-button">Create</button>
          <p className="form-login">
            Already have an account?{' '}
            <Link to={'/sign-in'} className="form-login-link">
              Sign In.
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default AppRegistration
