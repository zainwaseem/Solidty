import React from "react";
import logo from "../logo.jpg";
export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top"   >
     <div className="container" style={{ marginLeft: 0 }}>

        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button> 
           <img className="navbar-brand page-scroll" src={logo} alt="Logo" style={{ transform: "scale(3.5)" }}/>
          <a className="navbar-brand page-scroll" href="#page-top"  style={{ marginLeft:"1px"}}>
            FURC
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1" style={{ marginRight: '0px' }}
        >
          <ul className="nav navbar-nav navbar-right" style={{ marginRight: '0px' }}>

            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>

            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>

            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
