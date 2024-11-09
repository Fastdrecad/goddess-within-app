import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/sell" },
    { id: 2, name: "Shipping", to: "/shipping" }
  ];

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={"/"}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase text-center">Customer Service</h3>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase">Links</h3>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-block">
            <div className="block-title">
              <h3 className="text-uppercase">You can also find us on</h3>
              <div className="block-content">
                <ul className="footer-social-item">
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Facebook page"
                    >
                      <FaFacebook className="social-icon facebook-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Instagram page"
                    >
                      <svg width="0" height="0">
                        <linearGradient
                          id="instagram-gradient"
                          x1="100%"
                          y1="100%"
                          x2="0%"
                          y2="0%"
                        >
                          <stop stopColor="#fff200" offset="0%" />
                          <stop stopColor="#f45c25" offset="25%" />
                          <stop stopColor="#ec3e0e" offset="50%" />
                          <stop stopColor="#cc2366" offset="75%" />
                          <stop stopColor="#bc1888" offset="100%" />
                        </linearGradient>
                      </svg>
                      <FaInstagram className="social-icon instagram-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Pinterest page"
                    >
                      <FaPinterest className="social-icon pinterest-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} Goddess Within</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
