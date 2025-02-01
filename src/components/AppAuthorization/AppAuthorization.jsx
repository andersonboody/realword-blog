import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import '../../styles/AppForm.scss'
import { InputEmail, InputPassword } from '../ui/formValidationUser'
import { authorizationUser } from '../../store/slices/usersSlice'

const AppAuthorization = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const submitHandler = (data) => {
    dispatch(authorizationUser(data))
  }
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitHandler)}>
        <h3 className="form-title">Sign In</h3>

        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} show={show} setShow={setShow} />

        <button className="form-button">Login</button>
        <p className="form-login">
          {'Don’t have an account? '}
          <Link to={'/sign-up'} className="form-login-link">
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  )
}

export default AppAuthorization
