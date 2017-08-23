import React, { PropTypes } from 'react';
import Price from 'components/Price';

const MaterialCost = ({ cost }) =>
  <div className="p2 flex justify-between bt1">
    <div>Total</div>
    <div>
      <Price value={cost} />
    </div>
  </div>;

MaterialCost.propTypes = {
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MaterialCost;
