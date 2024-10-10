import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="container mx-auto text-light py-4 bg-blue-800 text-2xl min-h-screen">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="font-semibold text-white text-2xl ml-2">Explore</h3>
          <ul className="list-none mt-2 ml-2">
            <li><a href="index.html" className="text-white">Home</a></li>
            <li><a href="about.html" className="text-white">About Us</a></li>
            <li><a href="projects.html" className="text-white">Our Services</a></li>
            <li><a href="contact.html" className="text-white">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-6">
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="list-none mt-2">
            <li><a href="#faq" className="text-white">FAQ</a></li>
            <li><a href="#privacy" className="text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-6 text-2xl">
          <h3 className="font-semibold text-white">Socials</h3>
          <ul className="list-none mt-2"> 
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white flex items-center">
                <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white flex items-center">
                <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
