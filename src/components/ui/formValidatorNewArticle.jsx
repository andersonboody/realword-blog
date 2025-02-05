const InputTitle = ({ register, errors, defaultValue = '' }) => {
  return (
    <label className="form-label form-article__label">
      Title
      <input
        type="text"
        className={`form-input form-article__input ${errors.title ? 'form-input-error-border' : ''}`}
        placeholder="Title"
        defaultValue={defaultValue}
        {...register('title', {
          required: 'The field must be filled in.',
        })}
      />
      {errors?.title && <span className="form-input-error">{errors?.title?.message || 'Error!'}</span>}
    </label>
  )
}

const InputShortDescription = ({ register, errors, defaultValue = '' }) => {
  return (
    <label className="form-label form-article__label">
      Short description
      <input
        type="text"
        className={`form-input form-article__input ${errors.shortDescription ? 'form-input-error-border' : ''}`}
        placeholder="Short description"
        defaultValue={defaultValue}
        {...register('shortDescription', {
          required: 'The field must be filled in.',
        })}
      />
      {errors?.shortDescription && (
        <span className="form-input-error">{errors?.shortDescription?.message || 'Error!'}</span>
      )}
    </label>
  )
}

const InputText = ({ register, errors, defaultValue = '' }) => {
  return (
    <label className="form-label form-article__label">
      Text
      <textarea
        type="text"
        className={`form-input form-article__input-area ${errors.text ? 'form-input-error-border' : ''}`}
        placeholder="Text"
        defaultValue={defaultValue}
        {...register('text', {
          required: 'The field must be filled in.',
        })}
      />
      {errors?.text && <span className="form-input-error">{errors?.text?.message || 'Error!'}</span>}
    </label>
  )
}

const InputTags = ({ register, errors, fields, remove, append }) => {
  return (
    <label className="form-label form-article__tags">
      <span className="form-title form-article__tags-title">Tags</span>
      {fields.length === 0 && (
        <div className="form-label form-article__tags-block">
          <button
            className="btn blog-button blog-button--add"
            onClick={() => {
              append()
            }}
          >
            Add tag
          </button>
        </div>
      )}
      {fields.map((field, index) => {
        return (
          <div className="form-label form-article__tags-block" key={index}>
            <input
              type="text"
              className={`form-input form-article__tags-input ${errors.shortDescription ? 'form-input-error-border' : ''}`}
              placeholder="Tag"
              defaultValue={field[index]}
              {...register(`tags.${index}`, {
                maxLength: 30,
              })}
            />
            {errors?.tags?.[index] && (
              <span className="form-input-error">{errors?.tags?.[index]?.message || 'Error!'}</span>
            )}
            <button
              type="button"
              className="btn blog-button blog-button--delete"
              onClick={() => {
                remove(index)
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn blog-button blog-button--add"
              onClick={() => {
                append()
              }}
            >
              Add tag
            </button>
          </div>
        )
      })}
    </label>
  )
}

export { InputTitle, InputShortDescription, InputText, InputTags }
