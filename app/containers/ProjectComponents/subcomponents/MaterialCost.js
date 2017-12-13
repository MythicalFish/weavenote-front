import React, { PropTypes } from 'react';
import Price from 'components/Price';
import Dropdown from 'components/Dropdown';

const MaterialCost = (props) => {
  const {
    materialCost,
    role,
    preferredCurrency,
    globalData,
    switchCurrency,
  } = props;
  if (role.get('name') === 'Guest') return null;
  const dProps = {
    value: preferredCurrency,
    data: globalData.currencies,
    onChange: switchCurrency,
  };
  return (
    <div className="p2 flex justify-between bt1">
      <div>Total</div>
      <Dropdown {...dProps} />
      <div>
        <Price
          value={materialCost}
          currency={preferredCurrency.get('iso_code')}
        />
      </div>
    </div>
  );
};

MaterialCost.propTypes = {
  materialCost: PropTypes.string,
  preferredCurrency: PropTypes.object,
  globalData: PropTypes.object,
  switchCurrency: PropTypes.func,
  role: PropTypes.object,
};

export default MaterialCost;
