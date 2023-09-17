import React from "react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div
        className="container-fluid"
        style={{
          maxWidth: 1150,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <a
          className="navbar-brand"
          style={{
            fontWeight: "bold",
            alignItems: "center",
          }}
          href="/"
        >
          <img width={46} src={"/logo.png"} />
          Bl0ckify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ fontWeight: "bold" }}
                href="/marketplace"
              >
                Marketplace
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ fontWeight: "bold" }}
                href="/dashboard"
              >
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ fontWeight: "bold" }}
                href="/trades"
              >
                Trades
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <AuthButton />
          </form>
        </div>
      </div>
    </nav>
  );
}
