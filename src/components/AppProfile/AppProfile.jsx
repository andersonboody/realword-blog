import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import '../../styles/AppForm.scss'
import { InputEmail, InputImage, InputPassword, InputUserName } from '../ui/formValidationUser'
import { updateDataUser } from '../../store/slices/usersSlice'

const AppProfile = () => {
  const [show, setShow] = useState(false)
  const { userName, email } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const submitHandle = (data) => {
    dispatch(updateDataUser(data))
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(submitHandle)}>
        <h3 className="form-title">Edit Profile</h3>
        <InputUserName register={register} errors={errors} defaultValue={userName} />
        <InputEmail register={register} errors={errors} defaultValue={email} />
        <InputPassword register={register} errors={errors} show={show} setShow={setShow} title="New Password" />
        <InputImage register={register} />
        <button className="form-button">Save</button>
      </form>
    </div>
  )
}

export default AppProfile
