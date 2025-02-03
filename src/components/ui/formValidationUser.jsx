import { EyeOutlined } from '@ant-design/icons'

const InputUserName = ({ register, errors, defaultValue = '' }) => {
  return (
    <label className="form-label">
      Username
      <input
        type="text"
        placeholder="Username"
        className={`form-input ${errors.userName ? 'form-input-error-border' : ''}`}
        defaultValue={defaultValue}
        {...register('userName', {
          required: 'The field must be filled in.',
          minLength: { value: 3, message: 'Your name must consist of at least 3 characters.' },
          maxLength: { value: 20, message: 'Your name must not exceed 20 characters.' },
        })}
      />
      {errors?.userName && <span className="form-input-error">{errors?.userName?.message || 'Error!'}</span>}
    </label>
  )
}

const InputEmail = ({ register, errors, defaultValue = '' }) => {
  return (
    <label className="form-label">
      Email address
      <input
        type="text"
        placeholder="Email address"
        className={`form-input ${errors.email ? 'form-input-error-border' : ''}`}
        defaultValue={defaultValue}
        {...register('email', {
          required: 'The field must be filled in.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      {errors?.email && <span className="form-input-error">{errors?.email?.message || 'Error!'}</span>}
    </label>
  )
}

const InputPassword = ({ register, errors, show, setShow, title = 'Password' }) => {
  return (
    <label className="form-label">
      {title}
      <div className="form-input-password">
        <input
          type={show ? 'text' : 'password'}
          placeholder={title}
          className={`form-input ${errors.password ? 'form-input-error-border' : ''}`}
          {...register('password', {
            required: 'The field must be filled in.',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must not exceed 40 characters.',
            },
            validate: {
              mixed: (value) => {
                const onlyDigits = /^\d+$/.test(value)
                const onlyLetters = /^[a-zA-Z]+$/.test(value)
                if (onlyDigits) {
                  return "Password can't be only digits"
                }
                if (onlyLetters) {
                  return "Password can't be only letters"
                }
                return true
              },
            },
          })}
        />
        <EyeOutlined
          className="form-input-password-show"
          onClick={() => {
            setShow(!show)
          }}
        />
      </div>
      {errors?.password && <span className="form-input-error">{errors?.password?.message || 'Error!'}</span>}
    </label>
  )
}

const InputRepeatPassword = ({ register, errors, watch, show, setShow }) => {
  return (
    <label className="form-label">
      Repeat Password
      <div className="form-input-password">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Password"
          className={`form-input ${errors.passwordRepeat ? 'form-input-error-border' : ''}`}
          {...register('passwordRepeat', {
            required: 'The field must be filled in.',
            validate: (value) => {
              if (watch('password') !== value) {
                return 'Passwords must match'
              }
            },
          })}
        />
        <EyeOutlined
          className="form-input-password-show"
          onClick={() => {
            setShow(!show)
          }}
        />
      </div>
      {errors?.passwordRepeat && (
        <span className="form-input-error">{errors?.passwordRepeat?.message || 'Error!'}</span>
      )}
    </label>
  )
}

const InputCheckboxConsent = ({ register, errors }) => {
  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        defaultChecked
        {...register('checkboxConsent', {
          required: 'Required to fill in.',
        })}
      />
      <span>I agree to the processing of my personal information</span>
      {errors?.checkboxConsent && (
        <span className="form-input-error">{errors?.checkboxConsent?.message || 'Error!'}</span>
      )}
    </label>
  )
}

const InputImage = ({ register, defaultValue = '' }) => {
  return (
    <label className="form-label">
      Avatar image (url)
      <input
        type="text"
        placeholder="Avatar image"
        className="form-input"
        defaultValue={defaultValue}
        {...register('imageUser')}
      />
    </label>
  )
}

export { InputEmail, InputPassword, InputUserName, InputRepeatPassword, InputCheckboxConsent, InputImage }
