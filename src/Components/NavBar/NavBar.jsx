import React, { useState } from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import logo from "../../assets/logo.png";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiOutlineGlobal } from "react-icons/ai";
import { Button, Modal } from "antd";
import "./NavBar.css"; // Import your custom CSS for styling

function NavBar({handleLogout}) {
  const [active, setActive] = useState("navBarMenu");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showNavBar = () => {
    setActive("navBarMenu showNavBar");
  };
  const toggleNavbar = () => {
    if (active === "navBarMenu") {
      showNavBar();
    } else {
      removeNavBar();
    }}

  const removeNavBar = () => {
    setActive("navBarMenu");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [noBG, addBg] = useState("NavigationBarTwo");
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("NavigationBarTwo navbarWithBg");
    } else {
      addBg("NavigationBarTwo");
    }
  };
  window.addEventListener("scroll", addBgColor);

  return (
    <div className="NavigationBar flex">
      <div className="NavigationBarOne flex">
        <div>
          <FaTachometerAlt className="icon"></FaTachometerAlt>
        </div>
        <div className="none flex">
          <li className="flex">
            <FcSupport className="icon"></FcSupport> Support
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon"></AiOutlineGlobal> Languages
          </li>
        </div>
        <div className="ats flex">
          {/* <span>Sign In</span> */}
          <span onClick={handleLogout}>Log Out</span>
        </div>
      </div>
      <div className={noBG}>
        <div className="logoDiv">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <div className={active}>
          <ul className="menu flex">
            <li onClick={removeNavBar} className="listItem">Home</li>
            <li onClick={removeNavBar} className="listItem">About</li>
            <li onClick={removeNavBar} className="listItem">Offer</li>
            <li onClick={removeNavBar} className="listItem">Seats</li>
            <li onClick={removeNavBar} className="listItem">Destinations</li>
          </ul>
          <Button onClick={showModal} className="btn flex btnOne">Contact</Button>
        </div>
        <Button onClick={showModal} className="btn flex btnTwo">Contact</Button>
        <div onClick={toggleNavbar} className="toggleIcon">
          <TfiMenuAlt className="icon"></TfiMenuAlt>
        </div>
      </div>
      <Modal
        title="Contact Information"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        footer={null}
      >
        <div className="user-info">
          <div className="user">
            <p className="user-name">MD TAUFIQUL KADIR</p>
            <p className="user-contact">+8801787986288</p>
          </div>
          <div className="user">
            <p className="user-name">SAKINA REZAI</p>
            <p className="user-contact">+90 552 443 24 90</p>
            <p className="user-email">kadirdihan5520000@gmail.com</p>
          </div>
          <div className="user-address">
            <p>Address: TUSHVANDER ROAD 4, LALMONIRHAT, RANGPUR, DHAKA</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NavBar;