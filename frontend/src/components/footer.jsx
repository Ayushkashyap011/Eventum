import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo & Social Icons */}
        <div className="footer-logo">
          <h2 className="footer-brand">Eventum</h2>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-youtube"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><i className="fa-solid fa-location-dot"></i> Silicon University, Patia, Bhubaneswar, Odisha, 751024</p>
          <p><i className="fa-solid fa-phone"></i> +91 9430777011</p>
          <p><i className="fa-solid fa-phone"></i> +91 9430777012</p>
          <p><i className="fa-solid fa-envelope"></i> eventum@gmail.com</p>
        </div>

        {/* Google Map */}
        <div className="footer-map">
          <h3>Google Map</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.293550331192!2d85.81905487444916!3d20.34456088103785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909f75f9c0871%3A0xe0b69a85cba5df68!2sSilicon%20Institute%20of%20Technology%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1708195432105!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>Copyright &copy; 2024 Eventum.com | Design By Ayush Kashyap</p>
      </div>
    </footer>
  );
};

export default Footer;
