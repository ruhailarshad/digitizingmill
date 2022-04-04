import React, { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";

import Logo from "../../assets/finallogodm.png";
import { Content } from "antd/lib/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import RouteNames from "../../routes/RouteNames";
import { accessTokenKey } from "../../constants/localStorageKeys";
import { getUserData } from "../../services/utils";
const { Sider } = Layout;

const SideNav = ({ data, Body,indexRoute }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 756px)' })
  const [collapsed, setCollapsed] = useState(false);
  let location = useLocation();


  const [current, setCurrent] = useState(indexRoute);
  console.log(current,"initial");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem(accessTokenKey);
    navigate(RouteNames.login);
  }

  useEffect(() => {
    if (location) {
      const loc = location.pathname.split("/");
      console.log(loc)
      const path = loc[2] ? loc[2] : loc[1];

      if (path !== current) {
      console.log(path,"path")
      console.log(current,"current")
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
        collapsible
        collapsed={isTabletOrMobile || collapsed}
        theme="light"
        onCollapse={() => setCollapsed(!collapsed)}
      >

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
              <Menu.Item danger key={item.link ? item.link : indexRoute} icon={item.icon}>
                <Link to={item.link}>{item.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <Button onClick={onLogout} type="primary" className="mt-40" block  danger size="large">
            Logout
          </Button>

      </Sider>
      <Content>
        <Outlet context={{tokenData:getUserData().data}}/>
      </Content>
    </Layout>
  );
};
export default SideNav;
