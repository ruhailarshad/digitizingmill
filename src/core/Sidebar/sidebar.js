import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Menu } from "antd";

import Logo from "../../assets/finallogodm.png";
import { Content, Header } from "antd/lib/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import RouteNames from "../../routes/RouteNames";
import { accessTokenKey } from "../../constants/localStorageKeys";
import { useUserData } from "../../pages/Login/userContext";
import { BiLogOut } from "react-icons/bi";
import {IoMdClose} from 'react-icons/io'
import { FiMenu } from "react-icons/fi";
const { Sider } = Layout;

const SideNav = ({ data, Body, indexRoute }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [collapsed, setCollapsed] = useState(true);
  let location = useLocation();
const ref=useRef()
  const [current, setCurrent] = useState(indexRoute);
  
  const { userData,setUserData } = useUserData();

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem(accessTokenKey);
    navigate('/');
    setUserData("");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
       
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setCollapsed(true)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref])
  useEffect(() => {
    if (location) {
      const loc = location.pathname.split("/");
      
      const path = loc[2] ? loc[2] : loc[1];

      if (path !== current) {
        
        
        setCurrent(path);
      }
    }
  }, [location, current]);

  function handleClick(e) {
    setCurrent(e.key);
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
      ref={ref}
        className="slderhover"
        onMouseEnter={() => {
          if (collapsed && !isTabletOrMobile) {
            setCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          if (!collapsed && !isTabletOrMobile) {
            setCollapsed(true);
          }
        }}
        collapsedWidth={isTabletOrMobile ? 0 : 80}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 99,
          transition: "all 0.2s linear",
        }}
        collapsed={collapsed}
        collapsible
        theme="light"
        trigger={null}
      >
        {isTabletOrMobile && (
          <div
            className="absolute right-10 top-10 "
            onClick={() => setCollapsed(true)}
          >
              <IoMdClose size={26} color={'#A5ADBA'} />
          </div>
        )}
        <div className="logo my-20 mb-40 flex justify-center">
          <img width={100} height={80} src={Logo} alt="logo"></img>
        </div>
        <Menu
          className="dm_sideNav_wrap"
          theme="light"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
        >
          {data.map((item, i) => (
            <Menu.Item
              danger
              key={item.link ? item.link : indexRoute}
              icon={item.icon}
            >
              <Link to={item.link}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button
          onClick={onLogout}
          type="primary"
          className="mt-40 flex items-center justify-center"
          block
          danger
          size="large"
        >
          {isTabletOrMobile ? <BiLogOut /> : "Logout"}
        </Button>
      </Sider>

      <Content className="container">
      {isTabletOrMobile && (
          <div
            className="  absolute left-10 top-10 "
            onClick={() => setCollapsed(false)}
          >
              <FiMenu size={26} />
          </div>
        )}
        <Outlet context={{ tokenData: userData }} />
      </Content>
    </Layout>
  );
};
export default SideNav;
