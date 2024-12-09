import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || ""); // Corrected to populate description
  const [title, setTitle] = useState(state?.title || ""); // Corrected to populate title
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState(null); // Error state for API errors

  const navigate = useNavigate();

  const upload = async () => {
    if (!file || file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `https://projetuptsady-quxd.onrender.com/api/upload`,
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
      setError("File upload failed. Please try again.");
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors
    setLoading(true); // Start loading

    const imgUrl = file ? await upload() : "";

    if (file && !imgUrl) {
      setLoading(false);
      return; // Stop if file upload fails
    }

    try {
      const payload = {
        title,
        desc: value,
        cat,
        pdf: imgUrl,
      };

      if (!state) {
        payload.date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        await axios.post(
          `https://projetuptsady-quxd.onrender.com/api/posts/`,
          payload
        );
      } else {
        await axios.put(
          `https://projetuptsady-quxd.onrender.com/api/posts/${state.id}`,
          payload
        );
      }

      navigate("/h");
    } catch (err) {
      console.error(err);
      setError("Failed to save the post. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="add" style={{ marginTop: "100px", display: "flex", gap: "20px" }}>
      <div
        className="content"
        style={{
          flex: "5",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          border: "1px solid #e2e2e2",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {error && <div style={{ color: "red" }}>{error}</div>}
        <input
          style={{
            padding: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            borderRadius: "5px",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
          type="text"
          placeholder="Title"
          value={title} // Added value to pre-populate input
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          className="editorContainer"
          style={{
            height: "300px",
            overflow: "scroll",
            border: "1px solid #ddd",
            padding: "10px",
            backgroundColor: "#fafafa",
            borderRadius: "5px",
          }}
        >
          <ReactQuill
            className="editor"
            style={{
              height: "100%",
              border: "none",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
            }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div
        className="menu"
        style={{
          flex: "2",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          border: "1px solid #e2e2e2",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="item"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "#555",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            className="file"
            htmlFor="file"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "#007bff",
              marginTop: "15px",
              fontSize: "16px",
            }}
          >
            Upload PDF
          </label>
          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <button
              onClick={handleClick}
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "#007bff",
                border: "1px solid #007bff",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
              disabled={loading}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        <div
          className="item"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            color: "#555",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Art
            </label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Science
            </label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Technology
            </label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Cinema
            </label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Design
            </label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food" style={{ fontSize: "16px", marginLeft: "8px" }}>
              Food
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
