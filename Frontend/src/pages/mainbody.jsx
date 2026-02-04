import React, { useState } from 'react'
import './Mainbody.css'

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
]

const Mainbody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; 

  const nextSlide = () => {
    if (currentIndex < Category.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
    <div className='cat'>
      <h2 style={{color:"gray",margin:"12px"}}>Categories</h2>
      <h4>Explore our extensive job market.</h4>
    </div>
    <div className="carousel-wrapper">
      <button className="nav-btn left" onClick={prevSlide}>◀</button>

      <div className="carousel-container">
        <div className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
          {Category.map((category, index) => (
            <div key={index} className="carousel-item">
              {category}
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn right" onClick={nextSlide}>▶</button>
    </div>
    </>
  )
}

export default Mainbody
