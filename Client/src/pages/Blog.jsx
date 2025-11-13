import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import moment from 'moment';
import Loader from '../components/Loader';


const Blog = () => {
  const {id} = useParams();
  const [data , setdata] = useState(null);
  const [comment , setcomment] = useState([]);

  const [name , setname] = useState('');
  const [content , setcontent] = useState('');

  const fetchBlog = async ()=>{
    const data = blog_data.find(item => item._id === id);
    setdata(data);
  }

  const fetchComments = async ()=>{
    setcomment(comments_data);
  }

  const addComment = async (e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  return data? (
    <div className='relative'>

      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 ' />

      <Navbar />

      <div className=' text-center mt-20 text-gray-600 '>
        <p className=' text-primary py-4 font-medium '>Published on: {moment(data.createdAt).format("MMMM Do, YYYY")}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800' >{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto '>{data.subTitle}</h2>
        <p className=' inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary '>Monkey D. Luffy</p>
      </div>

      <div className=' mx-5 max-w-5xl md:mx-auto my-10 mt-6 '>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />

        <div dangerouslySetInnerHTML={{__html:data.description}} className='rich-text max-w-3xl mx-auto'></div>

        {/* Comments Section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-2'>Comments : {comment.length}</p>
          <div className='flex flex-col gap-4'>
            {comment.map((item , index)=>(
              <div key={index} className='relative bg-primary/5 border border-primary/5 rounded-xl text-gray-600 p-4 max-w-xl'>
                <div className='flex items-center gap-2 mb-2 '>
                <img src={assets.user_icon} alt="" className='w-6' />
                <p className=' font-medium '>{item.name}
                  <span className=' text-sm font-normal text-gray-500 '> - {moment(item.createdAt).fromNow()}</span> </p>
                </div>
                <p className=' text-sm max-w-md ml-8 '>{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}

        <div className=' max-w-3xl mx-auto '>
          <p className=' font-semibold mb-4 '>Add your comment</p>
          <form onSubmit={addComment} className=' flex flex-col items-start gap-4 max-w-lg '>
            <input type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' onChange={(e) => setname(e.target.value)} value={name} />

            <textarea placeholder="Your comment" required className='w-full p-2 border border-gray-300 rounded outline-none' onChange={(e) => setcontent(e.target.value)} value={content}></textarea>

            <button type='Submit' className='bg-primary text-white py-2 px-4 rounded'>Submit</button>
          </form>
        </div>

        {/* {Share Buttons} */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} alt="" width={50} />
            <img src={assets.twitter_icon} alt="" width={50} />
            <img src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  ) : <Loader />
}

export default Blog
