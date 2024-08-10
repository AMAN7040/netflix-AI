import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-screen bg-black py-4 text-[0.6rem] text-white z-10 bottom-0 2xl:py-10">
      <div className="container mx-auto px-6">
        <h6 className="mb-3 2xl:mb-5">Questions? Call 000-800-919-1694</h6>
        <section className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5 px-1">
          {[
            'FAQ',
            'Help Centre',
            'Account',
            'Media Centre',
            'Investor Relations',
            'Jobs',
            'Ways to Watch',
            'Terms of Use',
            'Privacy',
            'Cookies Preferences',
            'Corporate Information',
            'Contact Us',
            'Speed Test',
            'Legal Notices',
            'Only on Netflix'
          ].map((item) => (
            <a key={item} className="footer-link" href="/">
              {item}
            </a>
          ))}
        </section>

        <div className="flex items-center">
          <select className="footer-language text-black">
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>
          <FontAwesomeIcon icon={faGlobe} className='mx-5' />
        </div>

        <h6 className="mt-5">NetflixGBT India</h6>
        <hr className="border-white my-5" />
        <h4 className="text-center">
          Made by <b>Aman</b>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
