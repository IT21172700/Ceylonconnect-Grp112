import React from "react";
import "./styles.css";
import Logo from "../../images/LOGO.png";
import { UilHome, UilPhone, UilEnvelope } from "@iconscout/react-unicons";

const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4"
    style={{ backgroundColor: "#e9ede8", marginTop: "2rem" }}
  >
    <div className="container-fluid text-center text-md-left">
      <div className="row" style={{ justifyContent: "space-around" }}>
        <div className="col-md-4 mt-md-0 mt-3">
          <h5
            className="text-start"
            style={{ color: "#25D828", fontWeight: 600, cursor: "pointer" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "6rem",
                marginRight: "0.6rem",
                marginBottom: "0.2rem",
                marginLeft: "-0.4rem",
              }}
            />
            {/* Plannify */}
          </h5>
          <p className="text-start">
          Ceylonconnect offers a comprehensive guide to the top destinations, tours
            in Sri Lanka. We provide secure online payment options, expert
            travel advice, and trusted local partners to ensure your safety and
            enjoyment. Whether you're a first-time visitor or a seasoned
            explorer, we have everything you need to create your dream trip to
            Sri Lanka.
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3 text-start">
          <h6 className="text-uppercase ">Services</h6>
          <ul className="list-unstyled">
            <li>
              <a
                href="/convertor"
                style={{ textDecoration: "none", color: "black"}}
              >
                Convertor
              </a>
            </li>
            <li>
              <a
                href="/new-places"
                style={{ textDecoration: "none", color: "black" }}
              >
                Customized Packages
              </a>
            </li>
            <li>
              <a
                href="/weather"
                style={{ textDecoration: "none", color: "black" }}
              >
                Weather
              </a>
            </li>
            <li>
              <a
                href="/user-inquiry"
                style={{ textDecoration: "none", color: "black" }}
              >
                Inquire
              </a>
            </li>
            <li>
              <a
                href="/feedback"
                style={{ textDecoration: "none", color: "black" }}
              >
                Feedbacks
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3 text-start">
          <h6 className="text-uppercase">Contact</h6>
          <ul className="list-unstyled">
            <li>
              <p>
                <UilHome
                  size="25"
                  style={{ marginRight: "0.3rem", marginBottom: "0.1rem" }}
                />
                119, Malabe, Colombo, Sri Lanka
              </p>
            </li>
            <li>
              <p>
                <UilEnvelope
                  size="25"
                  style={{ marginRight: "0.5rem", marginBottom: "0.1rem" }}
                />
                info@Ceylonconnect.com
              </p>
            </li>
            <li>
              <p>
                <UilPhone
                  size="25"
                  style={{ marginRight: "0.4rem", marginBottom: "0.1rem" }}
                />
                0112 60 70 60
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      className="footer-copyright text-center py-3"
      style={{ backgroundColor: "#c9cfc8" }}
    >
      © 2023 Copyright:
      <a href="/" style={{ textDecoration: "none", color: "black" }}>
        {" "}
        Ceylonconnect
      </a>
    </div>
  </footer>
);

export default Footer;
