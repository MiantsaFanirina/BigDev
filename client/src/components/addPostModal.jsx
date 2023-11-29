import {useEffect, useState} from 'react'
import { createPortal } from 'react-dom'

// icons
import { X, ImageDown } from 'lucide-react'


// modal component
export default function AddPostModal({toggleAddPostModal}) {
  return createPortal(
    <div className="w-full h-screen bg-slate-50 dark:bg-black dark:bg-opacity-50 bg-opacity-80 z-50 absolute top-0 left-0 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 md:shadow w-full md:w-[520px] md:h-auto h-full md:overflow-y-scroll md:overflow-x-hidden p-10 rounded overflow-hidden">

            <ModalHeader toggleAddPostModal={toggleAddPostModal}/>

            <hr className="mt-8" />

            <ProfileSection />

            <div className="max-h-[400px] overflow-y-scroll">
                <FormSection />
            </div>

            <button onClick={toggleAddPostModal} className="w-full mt-6 bg-slate-400 dark:bg-slate-800 hover:dark:bg-slate-700 hover:bg-slate-600 text-white py-3 rounded">publier</button>
        </div>
    </div>
  , document.body)
}


// Modal Header
function ModalHeader({toggleAddPostModal}) {
  return (
    <header className="flex items-center justify-center relative">
        <h1 className="font-semibold dark:text-slate-100 text-lg">Creer un nouveau post</h1>
        <button onClick={toggleAddPostModal} className="text-slate-500 dark:text-slate-300 absolute right-1 w-14 h-14 rounded-full bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 hover:bg-slate-100 cursor-pointer flex items-center justify-center">
            <X />
        </button>
    </header>
  )
}


// Profile indicator
function ProfileSection() {
  return (
    <div className="flex items-center mt-8 mb-3">
        <div className="bg-slate-500 w-[40px] h-[40px] rounded-full mr-5"></div>
        <h1 className="font-semibold dark:text-slate-200">Rakotondrafara Miantsa Fanirina</h1>
    </div>
  )
}


// Form post
function FormSection() {
    const [textareaValue, setTextareaValue] = useState('')
    const [images, setImages] = useState(null)

    const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value)
    }
  
    const autoResizeTextarea = (element) => {
      element.style.height = 'auto'
      element.style.height = element.scrollHeight + 'px'
    }
  
    const handleAutoResize = (event) => {
      autoResizeTextarea(event.target)
    }
  
    const handleFileUpload = (event) => {     
        const files = event.target.files
        const newImages = []

        // Convert FileList to an array and push each file into the newImages array
        for (let i = 0; i < files.length; i++) {
            newImages.push(files[i])
        }

        // Update the state with the new array of images
        setImages(newImages)

    }
  
    const handleDragOver = (event) => {
      event.preventDefault()
    }

    const removeImage = (index) => {
      const updatedImages = [...images]
      updatedImages.splice(index, 1)
    
      // Check if updatedImages is an empty array
      if (updatedImages.length === 0) {
        setImages(null)
      } else {
        setImages(updatedImages)
      }
    }
  
  
    const handleDrop = (event) => {
      event.preventDefault()
  
      const files = event.dataTransfer.files
      
      const newImages = []

      // Convert FileList to an array and push each file into the newImages array
      for (let i = 0; i < files.length; i++) {
          newImages.push(files[i])
      }

      // Update the state with the new array of images
      setImages(newImages)
    }
  

    return (
      <>
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          onInput={handleAutoResize}
          placeholder="Quoi de neuf ?"
          className="my-6 w-full resize-none outline-none bg-transparent dark:text-slate-300"
        />
  
        {
        !images ?
            (<label
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            htmlFor="fileInput"
            className="w-full h-[300px] border-[1px] dark:border-slate-600 rounded-lg p-3 flex items-center justify-center cursor-pointer"
            >
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                />

                <div className="w-full h-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700 rounded-lg flex flex-col items-center justify-center">
                    
                    <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-slate-300 mb-3">
                        <ImageDown />
                    </div>

                    <h1 className="dark:text-slate-200">Ajouter des Photos/Videos</h1>
                    
                </div>
            </label>)
        :
            (<div className="w-full h-auto border-[1px] dark:border-slate-600 rounded-lg p-3 flex flex-wrap flex-grow items-center justify-center cursor-pointer">
                {images.length === 1 ? (
  
                  <div className="w-full h-[200px] flex items-center justify-center relative m-4 bg-slate-200 dark:bg-slate-800 rounded-md">
                      <img src={URL.createObjectURL(images[0])} alt={`image-0`}  className="w-full h-full object-contain object-center"/>
                      <button className="text-slate-500 dark:text-slate-300 absolute right-2 top-2 w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 hover:bg-slate-100 cursor-pointer flex items-center justify-center">
                          <X onClick={() => removeImage(0)} size={16}/>
                      </button>
                  </div>

                ) : (
                  images.map((image, index) => (
                    
                    <div key={index} className="w-[150px] h-[200px] flex items-center justify-center relative m-4 bg-slate-200 dark:bg-slate-800 rounded-md">
                        <img src={URL.createObjectURL(image)} alt={`image-${index}`}  className="w-full h-full object-contain object-center"/>
                        <button className="text-slate-500 dark:text-slate-300 absolute right-2 top-2 w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-900 hover:dark:bg-slate-800 hover:bg-slate-100 cursor-pointer flex items-center justify-center">
                            <X onClick={() => removeImage(index)} size={16}/>
                        </button>
                    </div>
                    
                  ))  
                )
                }
            </div>)
        }
      </>
    )
}