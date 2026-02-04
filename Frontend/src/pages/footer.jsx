import React from 'react'
import '../pages/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-about">
          <h2>JobFinder</h2>
          <p>
            Your trusted platform to explore jobs, connect with companies, 
            and build your career.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <h3>Contact Us</h3>
<p>Email: <a href="mailto:raviisharmaa.2004@gmail.com">support@jobfinder.com</a></p>
<p>Phone: +91 98765 00000</p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
           <a href="https://www.linkedin.com/in/ravi-sharma-3b1b29334/" target='_blank'>Linkedin</a>
           <a href="https://github.com/ravisharma-16" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JobFinder. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
