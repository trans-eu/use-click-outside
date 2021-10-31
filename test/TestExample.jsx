import PropTypes from 'prop-types';
import React from 'react';
import useClickOutside from '../';

export const TestExample = ({
  withRefId = 'with hook ref',
  withoutRefId = 'without hook ref',
  onClickOutside = () => { },
}) => {

  const { ref, onClickCapture } = useClickOutside(onClickOutside);

  return (
    <>
      <div
        ref={ref}
        data-testid={withRefId}
        onClickCapture={onClickCapture}
      >
      </div>
      <div
        data-testid={withoutRefId}>
      </div>
    </>
  );
};

TestExample.propTypes = {
  withRefId: PropTypes.string,
  withoutRefId: PropTypes.string,
  onClickOutside: PropTypes.func,
};
