import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";

import app from "../context/axiosConfig";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [verifiedPost, setVerifiedPost] = useState(false);

  const cat = useLocation().search;

  const fetchData = async () => {
    if (admin != null && verifiedPost == false) {
      try {
        const res = await app.get(`/posts/verify${cat}`);
        setPosts(res.data);
        
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await app.get(`/posts${cat}`);
        setPosts(res.data);
        
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat,posts]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const { currentUser } = useContext(AuthContext);
  const { admin } = useContext(AuthContext);

  const verifiedPosts = async() => {
    if(verifiedPost === false){
   setVerifiedPost(true);
   await fetchData()
    }
   else{
    setVerifiedPost(false)
    await fetchData()
   }
   
  }
      


  return (
    <div className="home">
      {admin != null && (
        <div className="admin">
          <h1>Welcome Admin!</h1>
          <div className="adminbuttons">
            <Link to="/verifytests" className="link">
              <button>Blood Tests Verification</button>
            </Link>
            <Link className="link">
              {verifiedPost == false ? <button onClick={()=>{ fetchData(); setVerifiedPost(true); 
    }}>View Verified Posts</button>: <button onClick={()=>{setVerifiedPost(false);
      fetchData()}}>View posts for verifying</button>}
            </Link>
          </div>
        </div>
      )}

      {currentUser != null && (
        <div className="admin">
          <h1>Welcome, {currentUser?.username}</h1>
          <Link to="/booktest" className="link">
            {" "}
            <button>Book a Blood Test</button>
          </Link>
        </div>
      )}

      <div className="posts">
        {[...posts].reverse().map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                {`${getText(post.desc).substring(0, 255)} ....`}
                <p style={{ padding: "1rem 0" }}>{`Posted on ${moment(
                  post.date
                ).format("DD/MM/YYYY")}`}</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

