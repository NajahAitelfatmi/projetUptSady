import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  // Fonction d'upload
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Gestion du clic sur "Publier"
  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Récupérer le token d'authentification
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `https://projetuptsady-8.onrender.com/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              pdf: file ? imgUrl : "",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await axios.post(
            `https://projetuptsady-8.onrender.com/api/posts/`,
            {
              title,
              desc: value,
              cat,
              pdf: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      navigate("/h");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Non autorisé. Veuillez vous reconnecter.");
        navigate("/login");
      } else {
        console.log(err);
      }
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
          placeholder="Titre"
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
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Publier
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
          <h1 style={{ fontSize: "20px", marginBottom: "15px", fontWeight: "600" }}>Catégorie</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div key={category} className="cat">
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
