import React, { useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from "react-hot-toast"

function ListBlogs() {

  const [blogs , setBlogs] = useState([]);
  const {axios} = useAppContext();

  const fetchBlogs = async ()=>{
    try {
      const {data} = await axios.get("/api/admin/blogs");
      if(data.success){
        setBlogs(data.allBlogs);
      }else{
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className='font-semibold'>All Blogs</h1>
      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white '>
        <table className='w-full text-sm text-teal-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4' >#</th>
              <th scope='col' className='px-2 py-4 xl:px-6' >Blog Title</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden' >Date</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden' >Status</th>
              <th scope='col' className='px-2 py-4' >Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog,index)=>{
              return <BlogTableItem key={blog.id} blog={blog} index={index} fetchBlogs={fetchBlogs} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlogs
