import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  const itemsPerRow = 4;


  return (
    <div className="container">
      <div className="section page-banner-section" style={{backgroundImage: 'url(assets/images/bg/page-banner.jpg)'}}>
        <div className="shape-1">
          <img src="assets/images/shape/shape-7.png" alt=""/>
        </div>
        <div className="shape-2">
          <img src="assets/images/shape/shape-1.png" alt=""/>
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
              
  <iframe 
    src={`../upload/${post.pdf}`} 
    title="Course PDF" 
    style={{ width: "100%", height: "300px" }}
  />


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
                                                                <div className="rating-active" style={{width: '60%'}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
       
       
       </div>
              
            
        
          // Create a new row after every 4 images
        //   {(index + 1) % itemsPerRow === 0 && <div className="w-100"></div>}
       ) )}
      </div>
    </div>
  );
};

export default Home;
