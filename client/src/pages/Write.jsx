import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();
  const apiUrl = "https://projetuptsadya.onrender.com/api";

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem("token");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add JWT token
        },
      });
      return res.data;
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : "";

    try {
      const postData = {
        title,
        desc: value,
        cat,
        pdf: imgUrl,
      };

      if (state) {
        // Edit existing post
        await axios.put(`https://projetuptsadya.onrender.com/api/posts/${state.id}`, postData, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Add JWT token
          },
        });
      } else {
        // Create new post
        await axios.post(`https://projetuptsadya.onrender.com/api/posts/`, {
          ...postData,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Add JWT token
          },
        });
      }

      navigate("/h");
    } catch (err) {
      console.error("Post Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="add" style={{ marginTop: "100px", display: "flex", gap: "20px" }}>
      <div className="content" style={{ flex: "5", display: "flex", flexDirection: "column", gap: "20px", border: "1px solid #e2e2e2", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <input
          style={{ padding: "12px", border: "1px solid #ddd", fontSize: "16px", borderRadius: "5px", outline: "none", transition: "border-color 0.3s ease" }}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer" style={{ height: "300px", overflow: "scroll", border: "1px solid #ddd", padding: "10px", backgroundColor: "#fafafa", borderRadius: "5px" }}>
          <ReactQuill
            className="editor"
            style={{ height: "100%", border: "none", backgroundColor: "#ffffff", borderRadius: "5px" }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu" style={{ flex: "2", display: "flex", flexDirection: "column", gap: "20px", padding: "20px", border: "1px solid #e2e2e2", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="item" style={{ border: "1px solid #ddd", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "14px", color: "#555", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <input style={{ display: "none" }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file" style={{ textDecoration: "underline", cursor: "pointer", color: "#007bff", marginTop: "15px", fontSize: "16px" }}>Upload PDF</label>
          <div className="buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
            <button
              onClick={handleClick}
              style={{ cursor: "pointer", color: "white", backgroundColor: "#007bff", border: "1px solid #007bff", padding: "10px 20px", borderRadius: "5px", fontSize: "16px", transition: "background-color 0.3s ease" }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
            >
              Publish
            </button>
          </div>
        </div>
        {/* Category Selection */}
        <div className="item" style={{ border: "1px solid #ddd", padding: "20px", display: "flex", flexDirection: "column", fontSize: "14px", color: "#555", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>Category</h1>
          {/* Categories Radio Buttons */}
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div className="cat" key={category}>
              <input
                type="radio"
                checked={cat === category}
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category} style={{ fontSize: "16px", marginLeft: "8px" }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
