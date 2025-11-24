import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Header = () => {

  const {input , setinput} = useAppContext();

  const inputref = useRef();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    setinput(inputref.current.value);
  }
  const onClear = () => {
    setinput("");
    inputref.current.value = "";
  }


  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-2 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} alt="" className='w-2.5' />
        </div>

        <h2 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Welcome to your <span className='text-primary'>Blogging</span> <br /> App</h2>

        <p className='my-4 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600'>Discover insightful articles, share your thoughts, and connect with a community of readers and writers.</p>

        <form onSubmit={onsubmitHandler} className=' flex justify-between max-w-lg max-sm:scale-75 border border-gray-300 bg-white m-auto overflow-hidden rounded-3xl px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300'>
            <input ref={inputref} type="text" placeholder='search for blogs' required
            className='w-full pl-4 outline-none' />
            <button type='submit'
            className='bg-primary text-white px-8 py-2 m-1.5 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer'
            >Search</button>
        </form>

      </div>
      <div className='text-center'>
        {
        input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer' >Clear Search</button>
        }
      </div>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 ' />
    </div>
  )
}

export default Header
