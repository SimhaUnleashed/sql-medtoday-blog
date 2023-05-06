import React from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import axios from 'axios';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useEffect,useState,useContext } from 'react';
import Menu from '../components/Menu';
import { AuthContext } from '../context/authContext';
import moment from "moment";
import app from '../context/axiosConfig';
import parse from 'html-react-parser';


const Single = (props) => {
  

  const [post,setPost] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2]
  
  const {currentUser,admin} =  useContext(AuthContext)

  const fetchData = async()=>{
    if(admin!=null){
      try{
        const res = await app.get(`posts/verify${postId}`)
        if(res.data!="")
        setPost(res.data);
        else{
          const res = await app.get(`posts/${postId}`);
          setPost(res.data);
        }
      }
      catch(err){
        console.log(err)
      }
    }
    else{
      try{
        const res = await app.get(`posts/${postId}`)
        setPost(res.data);
      }
      catch(err){
        console.log(err)
      }
    }
    
  };

  useEffect(()=>{
    
    fetchData();
  },[postId]);

  const handleDelete = async ()=>{
    if(admin!=null){
      try{
        const res = await app.delete(`/posts/${postId}`);
        const res2 = await app.delete(`/posts/verify/${postId}`)
        navigate("/")
        console.log(res)
      }
      catch(err){
        console.log(err)
      }
    }
    else{
      try{
        const res = await app.delete(`/posts/${postId}`);
        navigate("/")
        console.log(res)
      }
      catch(err){
        console.log(err)
      }
    }
  }

  const handleVerify = async() =>{
    try{
    const res = await app.post(`/posts/verify${postId}`)
    navigate("/")
    console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }

  

  return (
    <div className='single'>
      {(currentUser===null && admin===null) ? navigate("/login"): <div className="content">
          
          <img src={`../upload/${post?.img}`} alt="" />
          <div className="user">
            {post.userimg&& <img src={post.userimg} alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
              {(currentUser?.username ===
              post.username || admin)
                && <div className="edit">
                <Link to={`/write?edit=2` } state={post}><img src={Edit} alt="" /></Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>}
              </div>
          <h1>{post.title} </h1>
          <div className="description">
          
          {parse(`${post.desc}`)}
          </div>
         
          {admin!=null&&
      <div className="admin">
      
      <button onClick={handleVerify}>Verify Post</button>
      </div>}
          </div>}
          
          
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single