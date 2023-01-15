import DropZone from '../helpers/DropZone'

const ImageUpload = ({ formFields, setFormFields }) => {

  return (
    <div className="image-field">
      <label className="image-input-field">Image <span className="required">*</span></label>
      <br />
      <small>Recommended to use image size 1600px x 500px</small>
      <DropZone
        formFields={formFields}
        setFormFields={setFormFields}
      />
    </div>
  )
}

export default ImageUpload