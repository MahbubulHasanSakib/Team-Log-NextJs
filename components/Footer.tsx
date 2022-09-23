import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="footer-10 footerSection">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">About</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="d-block">
                      Out story
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Awards
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Career
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">Company</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="d-block">
                      Our services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Clients
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 mb-md-0 mb-4">
                <h2 className="footer-heading">Resources</h2>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="d-block">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-block">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-md-0 mb-4">
            <h2 className="footer-heading">Subscribe</h2>
            <form action="#" className="subscribe-form">
              <div className="form-group d-flex">
                <input
                  type="text"
                  className="form-control rounded-left"
                  placeholder="Enter email address"
                />
                <button
                  type="submit"
                  className="form-control submit rounded-right"
                >
                  Subscribe
                </button>
              </div>
              <span className="subheading">Get updates in your mailbox</span>
            </form>
          </div>
        </div>
        <div className="row mt-5 pt-4 border-top">
          <div className="col-md-6 col-lg-8 mb-md-0">
            <p className="copyright mb-0">
              Copyright &copy;{new Date().getFullYear()} All rights reserved by
              ITGarage.
            </p>
          </div>
          <div className="col-md-6 col-lg-4 text-md-right">
            <ul className="ftco-footer-social p-0">
              <li className="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
