import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Comments from "../components/Comments";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import "../style.scss";
const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/h")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    
    <div className="single" style={{
      marginTop:"200px", 
       display: "flex",
        gap: "50px"}}>
      <div className="content" style={{ 
        flex: "5",
        display: "flex",
        flexDirection: "column",
        gap: "30px"}}>
        <img src={`../upload/${post?.img}`} alt=""  style={{ height:'400px', width:'400px', marginLeft:'300px'}}/>
        <div className="user" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
        }}>
          {post.userImg && <img style={{ 
            width: "100px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span style={{fontWeight: "bold"}}>Auteur:{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
             <div className="edit" style={{ display: "flex", gap: "10px" }}>
                <Link to={`/write?edit=2`} state={post}>
                  <img 
                    src={Edit} 
                    alt="Edit" 
                    style={{ cursor: "pointer", width: "40px", height: "40px" }} 
                  />
                </Link>
                <img 
                  onClick={handleDelete} 
                  src={Delete} 
                  alt="Delete" 
                  style={{ cursor: "pointer", width: "40px", height: "40px" }} 
                />
              </div>
            )}
         
            </div>
            <Comments postId={postId} currentUser={currentUser} />
        <h3 style={{ fontSize:"14px",
          color: "#333"}}>{post.title}</h3>
        <p style={{ textAlign: "justify",
          lineHeight: "15px"}}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>      </div>
      <Menu  cat={post.cat}/>
    </div>
  );
};

export default Single;
