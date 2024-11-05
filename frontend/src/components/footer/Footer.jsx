import React from 'react';
import './footer.css';
import { FaFacebook,FaInstagramSquare,FaLinkedin  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className='footer-content'>
      <p>
        &copy; 2024 your E-Learning Platform All Rights Reserved. <br/>
        Made With ❤️ <a href='https://github.com/HARSHGit45'>Harshal Mali</a>
      </p>
      <div className='social-links'>
        <a href='#'> <FaFacebook /> </a>
        <a href='#'> <FaInstagramSquare /> </a>
        <a href='#'> <FaLinkedin /> </a>
      </div>
      </div>
    </footer>
  )
}

export default Footer
