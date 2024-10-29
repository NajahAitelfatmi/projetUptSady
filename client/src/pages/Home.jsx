import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
        
        // Vérifiez les données récupérées dans la console
        console.log("Données récupérées:", res.data);
        
      } catch (err) {
        console.log("Erreur lors de la récupération des données:", err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  
  const itemsPerRow = 4;

  return (
    <div className="container">
      <div className="section page-banner-section" style={{ backgroundImage: 'url(assets/images/bg/page-banner.jpg)' }}>
        <div className="shape-1">
          <img src="assets/images/shape/shape-7.png" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/images/shape/shape-1.png" alt="" />
        </div>
        <div className="shape-3"></div>
        <div className="container">
          <div className="page-banner-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-banner text-center">
                  <h2 className="title">Course Sidebar</h2>
                  <ul className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Course Sidebar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className={`col-lg-${12 / itemsPerRow} col-sm-6`}>
            <div className="single-course" style={{ margin: "20px" }}>
              <div className="courses-image">
                <Link to="/">
                  {/* Assurez-vous que post.img contient l'URL complète ou le chemin relatif de l'image */}
                  <img src={post.img} alt="Courses" style={{ width: "100%", height: "200px" }} />
                </Link>
              </div>
              <div className="courses-content">
                <div className="top-meta">
                  <div className="tag-time">
                    <h3 className="title"><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                  </div>
                </div>
                <p>{getText(post.desc)}</p>
                <div className="courses-meta">
                  <div className="rating">
                    <div className="rating-star">
                      <div className="rating-active" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
