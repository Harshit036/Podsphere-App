import React from "react";
import SidebarFields from "./NavRoutes.js";
import "./index.css";

const Sidebar = ({ userId }) => {
  return (
    <div className="sidebarWrapper">
      <div className="sidebarRoutes">
        {SidebarFields.map((val, key) => {
          console.log(val.linkTo);
          console.log(window.location.pathname);
          return (
            <div
              className="sidebarRoute"
              id={
                window.location.pathname === "/" + val.linkTo
                  ? "sideActive"
                  : "sideInactive"
              }
            >
              <div className="routeIcon">
                <img src={val.Icon} alt="/" />
              </div>
              <div
                className="routeName"
                onClick={() => {
                  window.location.pathname = val.linkTo;
                }}
              >
                {val.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sidebarOptions">
        <div className="invoice" style={{ padding: "1rem" }}>
          Invoice
        </div>
        <div className="faq" style={{ padding: "1rem" }}>
          FAQ
        </div>
        <div className="helpSupport" style={{ padding: "1rem" }}>
          Help & Support
        </div>
        <div className="sidebarLogout">
          <button className="yellowBtn">LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
