import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://projetuptsady-8.onrender.com/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div
      className="menu"
      style={{
        flex: "2",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "30px",
        backgroundColor: "#fafafa", // Light background
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          color: "#2f3c48",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "40px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Other posts you may like
      </h1>
      {posts.map((post) => (
        <div
          className="post"
          key={post.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "25px",
            backgroundColor: "#fff",
            borderRadius: "12px", // Rounded corners for a modern feel
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", // Stronger shadow for depth
            transition: "all 0.3s ease-in-out", // Smooth hover effect
          }}
        >
<iframe
  src={`../upload/${post.pdf}`}
  title="Course PDF"
  style={{
    width: "100%",
    height: "300px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  }}
/>


          <h2
            style={{
              color: "#333",
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "500",
              marginTop: "15px",
              cursor: "pointer", // Pointer cursor to indicate interactivity
              transition: "color 0.3s ease-in-out", // Smooth color change on hover
            }}
            onMouseOver={(e) => e.target.style.color = "#008CBA"} // Change color on hover
            onMouseOut={(e) => e.target.style.color = "#333"} // Revert color on mouse out
          >
            {post.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Menu;
