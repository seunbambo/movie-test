import React from "react";
import PropTypes from "prop-types";
import "./loading.css";

const Loading = (props) => {
  const { width, height } = props;

  return <div className="Loading" style={{ width, height }} />;
};

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Loading.defaultProps = {
  width: "5rem",
  height: "5rem",
};

export default Loading;
