import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import '../../styles/AppForm.scss'
import { InputEmail, InputImage, InputPassword, InputUserName } from '../ui/formValidationUser'
import { updateDataUser } from '../../store/slices/usersSlice'

const AppProfile = () => {
  const [show, setShow] = useState(false)
  const { userName, email, auth, image } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitHandle = (data) => {
    dispatch(updateDataUser(data))
  }

  useEffect(() => {
    if (!auth) {
      navigate('/sign-in')
    }
  }, [auth, navigate])

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitHandle)}>
        <h3 className="form-title">Edit Profile</h3>
        <InputUserName register={register} errors={errors} defaultValue={userName} />
        <InputEmail register={register} errors={errors} defaultValue={email} />
        <InputPassword
          register={register}
          errors={errors}
          show={show}
          setShow={setShow}
          title="New Password"
          noRequired={false}
        />
        <InputImage register={register} defaultValue={image} />
        <button className="form-button">Save</button>
      </form>
    </div>
  )
}

export default AppProfile
