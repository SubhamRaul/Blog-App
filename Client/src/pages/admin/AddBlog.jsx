import React, { useState , useRef, useEffect } from 'react'
import {assets, blogCategories} from '../../assets/assets'
import quill from  'quill'

function AddBlog() {

  const editorRef = useRef(null);
  const quillref = useRef(null);

  const [image , setImage] = useState(false);
  const [title , setTitle] = useState("");
  const [subtitle , setSubtitle] = useState("");
  const [category , setCategory] = useState("Startup");
  const [isPublished , setIsPublished] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const GenerateContent = async ()=>{}

  useEffect(()=>{
    if(!quillref.current && editorRef.current){
      quillref.current = new quill(editorRef.current, {
        theme: 'snow',
      }
    )
  }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex-1 bg-blue-50 text-gray-600 h-full overflow-scroll " >
      <div className='bg-whitew-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded' >
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ?  assets.upload_area : URL.createObjectURL(image)} 
          alt="" 
          className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Type here' required 
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
        />

        <p className='mt-4'>Blog SubTitle</p>
        <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} type="text" placeholder='Type here' required 
        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
        />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button 
          type='button' onClick={GenerateContent}
          className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer '
          >Generate with AI</button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select 
        name="category" 
        value={category} 
        onChange={(e)=>setCategory(e.target.value)} className=' max-w-lg mt-2 text-gray-800 p-2 border border-gray-300 outline-none rounded cursor-pointer'>
          <option value="">Select Category</option>
          {
            blogCategories.map((item , index) => {
              return <option key={index} value={item} className='text-black' >{item}</option>
            } )
          }
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished}
          className='scale-125 cursor-pointer'
           onChange={(e)=>setIsPublished(e.target.checked)} />
        </div>

        <button type='submit'
        className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'
        >Add Blog</button>


      </div>
    </form>
  )
}

export default AddBlog
