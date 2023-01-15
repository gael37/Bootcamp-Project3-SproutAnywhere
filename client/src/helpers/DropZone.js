import { useDropzone } from 'react-dropzone'
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const DropZone = ({ formFields, setFormFields  }) => {

  const [ files, setFiles ] = useState([])

  const onDrop = useCallback(files => setFiles(files), [setFiles])

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({ onDrop })

  // const fileInput = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ))

  useEffect(() => {
    const getFiles = async () => {
      if (files.length > 0)
        try {
          const formData = new FormData()
          // Appends the file information of the file to be uploaded
          formData.append('file', files[0])
          // Appends the upload preset information
          formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
          // Sends the file data to the cloudinary serve
          const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
          console.log('DATA', data)
          setFormFields({ ...formFields, thumbnail: data.secure_url })
        } catch (err) {
          console.log(err)
        }
    }
    getFiles()
  }, [files])

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input className="blog-form-input" {...getInputProps()} />
      <div className="blog-form-input">
        { isDragActive ? 
          <p className="dropzone-content">
          Release to drop the files here</p>
          :
          <p className="dropzone-content">
            Drag and drop hero image here, or click this box to select image
          </p>
        }
        <aside>
          <div className="thumbsContainer">
            <img
              className="thumb-img "
              src={formFields.thumbnail}
              // Revoke data uri after image is loaded
              onLoad={() => { 
                URL.revokeObjectURL(formFields.thumbnail) 
              } }
            />
          </div>
        </aside>
      </div>
    </div>  
  )
}

export default DropZone