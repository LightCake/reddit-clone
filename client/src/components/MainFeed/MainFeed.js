import React from "react";
import PropTypes from "prop-types";
import "./MainFeed.css";
import Button from "../Button/Button";
import RegisterContainer from "../Register/RegisterContainer";
import LoginContainer from "../Login/LoginContainer";

const MainFeed = props => {
  const { toggleRegister, toggleLogin } = props;

  React.useEffect(() => {
    console.log(toggleRegister);
  }, []);

  return (
    <div className="main_feed">
      <div className="main_feed_header">
        <Button label="Register" onClick={toggleRegister} />
        <Button label="Login" onClick={toggleLogin} />
        <RegisterContainer />
        <LoginContainer />
      </div>
    </div>
  );
};

MainFeed.propTypes = {};

export default MainFeed;
