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

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]); // State pour les commentaires
  const [newComment, setNewComment] = useState(""); // State pour le commentaire à ajouter
  const [rating, setRating] = useState(0); // State pour la note (étoiles)
  
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        const commentRes = await axios.get(`/comments/post/${postId}`); // Charger les commentaires pour ce post
        setComments(commentRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/h");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const newCommentObj = {
        userId: currentUser._id,
        postId: postId,
        rating: rating,
        text: newComment,
      };
      await axios.post(`/comments`, newCommentObj); // Envoi du commentaire au backend
      setNewComment(""); // Réinitialiser le champ de commentaire
      setRating(0); // Réinitialiser la note
      // Recharger les commentaires après ajout
      const commentRes = await axios.get(`/comments/post/${postId}`);
      setComments(commentRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div
      className="single"
      style={{
        marginTop: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        marginLeft: "20px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        className="content"
        style={{
          flex: "5",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
          }}
        >
          <img
            src={`../upload/${post?.img}`}
            alt=""
            style={{
              height: "400px",
              width: "auto",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
                margin: "0",
              }}
            >
              {post.title}
            </h3>
            <div
              className="user"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                By {post.username}
              </span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>

            {/* Star Rating - Font Awesome Icons */}
            <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${index < rating ? "checked" : ""}`}
                  onClick={() => setRating(index + 1)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            textAlign: "justify",
            lineHeight: "1.6",
            marginLeft: "10px",
            marginRight: "40px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "18px",
            backgroundColor: "#f9f9f9",
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>

        <div>
          <Link
            to={`/category/${post.cat}`}
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            View All
          </Link>
        </div>

        {/* Comment Section */}
        <div style={{ marginTop: "30px", width: "100%" }}>
          <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>Commentaires</h4>
          
          {/* Comment Input */}
          <div style={{ marginBottom: "20px" }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleCommentSubmit}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Ajouter un commentaire
            </button>
          </div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div>
              {comments.map((comment, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {comment.username}
                    </span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`fa fa-star ${index < comment.rating ? "checked" : ""}`}
                        ></span>
                      ))}
                    </div>
                  </div>
                  <p>{comment.text}</p>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    {moment(comment.date).fromNow()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun commentaire</p>
          )}
        </div>

        {/* Menu en bas */}
        <Menu
          cat={post.cat}
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default Single;
