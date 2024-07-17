import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="w-screen bg-black py-4 text-[9px] text-white z-10 bottom-0 2xl:py-10">
        <div className="container mx-auto px-6">
          <h6 className="mb-3 2xl:mb-5">Questions? Call 000-800-919-1694</h6>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5 px-1">
            <a className="footer-link" href="/">
              FAQ
            </a>
            <a className="footer-link" href="/">
              Help Centre
            </a>
            <a className="footer-link" href="/">
              Account
            </a>
            <a className="footer-link" href="/">
              Media Centre
            </a>
            <a className="footer-link" href="/">
              Investor Relations
            </a>
            <a className="footer-link" href="/">
              Jobs
            </a>
            <a className="footer-link" href="/">
              Ways to Watch
            </a>
            <a className="footer-link" href="/">
              Terms of Use
            </a>
            <a className="footer-link" href="/">
              Privacy
            </a>
            <a className="footer-link" href="/">
              Cookies Preferences
            </a>
            <a className="footer-link" href="/">
              Corporate Information
            </a>
            <a className="footer-link" href="/">
              Contact Us
            </a>
            <a className="footer-link" href="/">
              Speed Test
            </a>
            <a className="footer-link" href="/">
              Legal Notices
            </a>
            <a className="footer-link" href="/">
              Only on Netflix
            </a>
          </div>

          <div className="flex items-center">
            <select className="footer-language text-black" href="/">
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
            </select>
            <FontAwesomeIcon icon={faGlobe} className='mx-5'></FontAwesomeIcon>
          </div>

          <h6 className="mt-5">NetflixGBT India</h6>
          <hr className="border-white my-5" />
          <h4 className="text-center">
            Made by <b>Aman</b>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Footer;
