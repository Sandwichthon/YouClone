import React from 'react';
import './Footer.css';

// Composant de pied de page
const Footer = () => {
  return (
    <footer className="footer">
      <div className="ui container">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
        <p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
