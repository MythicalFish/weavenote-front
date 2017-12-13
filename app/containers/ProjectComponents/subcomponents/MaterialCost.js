import React, { PropTypes } from 'react';
import Price from 'components/Price';

const MaterialCost = ({ materialCost, role }) => {
  if (role.get('name') === 'Guest') return null;
  return (
    <div className="p2 flex justify-between bt1">
      <div>Total</div>
      <div>
        <Price value={materialCost} />
      </div>
    </div>
  );
};

MaterialCost.propTypes = {
  materialCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  role: PropTypes.object,
};

export default MaterialCost;
