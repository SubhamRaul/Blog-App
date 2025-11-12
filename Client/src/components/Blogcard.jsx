import React from 'react'
import { useNavigate } from 'react-router-dom';

function Blogcard({blog}) {

    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/blog/${_id}`)}} className='cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300'>
      <img src={image} alt="" className='aspect-video' />
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html":description.slice(0, 80) + "..."}}></p>
      </div>
    </div>
  )
}

export default Blogcard
