import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/NavigateNext';
import BackIcon from '@material-ui/icons/NavigateBefore';
import styles from "../../styles/Carousel.module.scss";

const ArrowNav = ({ handleClick, backward, className }) => {
  return (
    <div className={className}>
      <IconButton className={styles.button}>
        {backward ? (
          <BackIcon onClick={handleClick} fontSize="large" />
        ) : (
          <ForwardIcon onClick={handleClick} fontSize="large" />
        )}
      </IconButton>
    </div>
  );
};

ArrowNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  backward: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

ArrowNav.defaultProps = {
  backward: false,
};

export default ArrowNav;
