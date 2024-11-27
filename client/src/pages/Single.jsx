import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import "../style.scss";
import Comments from "../components/Comments";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://projetuptsady-8.onrender.com/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://projetuptsady-8.onrender.com/api/posts/${postId}`);
      navigate("/h");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single" style={{ marginTop: "200px", display: "flex", gap: "50px" }}>
      <div className="content" style={{ flex: "5", display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* PDF Embed */}
        <iframe 
          src={`../upload/${post.pdf}`} 
          title="Course PDF" 
          style={{ width: "100%", height: "500px" }}
        />
        
        {/* Title Section */}
        <div className="title" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h3 style={{ fontSize: "20px", color: "#333", margin: "0" }}>{post.title}</h3>
          
          {/* Post Description */}
          <p 
            style={{ textAlign: "justify", lineHeight: "1.6", color: "#555", margin: "0" }} 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} 
          ></p>
        </div>

        {/* User Info Section */}
        <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {post.userImg && (
              <img 
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} 
                src={post.userImg} 
                alt="user" 
              />
            )}
            <div className="info" style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "bold" }}>Auteur: {post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>

          {/* Edit and Delete Buttons (Right-Aligned) */}
          {(currentUser.username === post.username || currentUser.userType === "Admin") && (
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

        {/* Comments Section */}
        <Comments postId={postId} currentUser={currentUser} />
      </div>

      {/* Menu */}
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
