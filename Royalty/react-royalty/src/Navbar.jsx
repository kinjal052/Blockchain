import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            creatorRoyalty
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/creator">
                  Creator
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/buyer">
                  Buyer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
