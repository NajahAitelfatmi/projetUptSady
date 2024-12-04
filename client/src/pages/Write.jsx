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

  const upload = async () => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("https://projetuptsadya.onrender.com/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`https://projetuptsadya.onrender.com/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            pdf: imgUrl,
          }, { withCredentials: true })
        : await axios.post("https://projetuptsadya.onrender.com/api/posts", {
            title,
            desc: value,
            cat,
            pdf: imgUrl,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
          }, { withCredentials: true });
      navigate("/h");
    } catch (err) {
      console.error("Error publishing post:", err);
    }
  };

  return (
    <div className="add" style={{ marginTop: "100px", display: "flex", gap: "20px" }}>
      <div className="content" style={{ flex: "5", ...contentStyle }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <div className="editorContainer" style={editorContainerStyle}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ height: "100%", borderRadius: "5px" }}
          />
        </div>
      </div>
      <div className="menu" style={{ flex: "2", ...menuStyle }}>
        <div className="item" style={itemStyle}>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" style={fileLabelStyle}>Upload PDF</label>
          <div className="buttons" style={{ marginTop: "30px" }}>
            <button onClick={handleClick} style={buttonStyle}>Publish</button>
          </div>
        </div>
        <div className="item" style={itemStyle}>
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div key={category} className="cat">
              <input
                type="radio"
                name="cat"
                value={category}
                id={category}
                checked={cat === category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  border: "1px solid #e2e2e2",
  padding: "20px",
  borderRadius: "10px",
};

const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "5px",
};

const editorContainerStyle = {
  height: "300px",
  overflow: "scroll",
  border: "1px solid #ddd",
  padding: "10px",
  backgroundColor: "#fafafa",
  borderRadius: "5px",
};

const menuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  border: "1px solid #e2e2e2",
};

const itemStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const fileLabelStyle = {
  textDecoration: "underline",
  cursor: "pointer",
  marginTop: "15px",
};

const buttonStyle = {
  color: "white",
  backgroundColor: "#007bff",
  padding: "10px 20px",
  borderRadius: "5px",
};

export default Write;
