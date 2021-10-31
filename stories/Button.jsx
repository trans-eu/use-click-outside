import PropTypes from 'prop-types';
import React from 'react';
import useClickOutside from '..';
import './button.css';

export const Button = ({
  label,
  onClickOutside = () => { },
  ...props
}) => {

  const { ref, onClickCapture } = useClickOutside(onClickOutside);

  return (
    <button
      ref={ref}
      onClickCapture={onClickCapture}
      type="button"
      className={'storybook-button'}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClickOutside: PropTypes.func,
};
