import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const AppContext = createContext(null);

export const AppProvider = ({children}) => {

    const navigate = useNavigate();

    const [token , settoken] = useState(null);
    const [blogs , setblogs] = useState([]);
    const [input , setinput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            if (data && data.success) setblogs(data.blogs);
            else toast.error("Failed to fetch blogs");
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem("Blog_token");
        if (token) {
            settoken(token);
            axios.defaults.headers.common["Authorization"] = token;
        }
    }, []);

    const value = {
        axios,navigate,token,settoken,blogs,setblogs,input,setinput
    }

    return (

        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppProvider');
    return context;
};