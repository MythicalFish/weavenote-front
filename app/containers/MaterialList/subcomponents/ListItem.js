import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { toggleState } from 'utils/misc';
import Price from 'components/Price';
import Dot from 'components/Dot';
import Dropdown from 'components/Dropdown';
import confirm from 'utils/confirm';

class ListItem extends React.PureComponent {
  state = { checked: false };
  Checkbox = () => <div>{this.state.checked ? 'x' : 'o'}</div>;
  render() {
    const { material, deleteMaterial, selectable, onSelect } = this.props;
    const { Checkbox } = this;
    const url = `/materials/${material.get('id')}`;
    const onClick = () => {
      if (selectable && onSelect) {
        onSelect(material);
        toggleState(this, 'checked');
      } else {
        browserHistory.push(url);
      }
    };
    const linked = {
      onClick,
      className: 'cursor-pointer',
    };
    return (
      <tr>
        {selectable && (
          <td>
            <Checkbox />
          </td>
        )}
        <td {...linked}>{material.getIn(['type', 'name'])}</td>
        <td {...linked}>{material.get('identifier')}</td>
        <td {...linked}>{material.get('name')}</td>
        <td {...linked}>
          <Dot color={material.getIn(['color', 'hex_code'])} className="mr1" />
          {material.getIn(['color', 'name'])}
        </td>
        <td />
        <td {...linked}>
          <Price
            value={material.get('cost_total')}
            currency={material.getIn(['currency', 'iso_code'])}
          />
        </td>
        <td className="right-align">
          <Dropdown icon="more">
            <Link to={url}>Manage</Link>
            <button
              onClick={() => {
                confirm(
                  'Are you sure you want to delete this material?'
                ).then(() => {
                  deleteMaterial(material.get('id'));
                });
              }}
            >
              Delete
            </button>
          </Dropdown>
        </td>
      </tr>
    );
  }
}

ListItem.propTypes = {
  material: PropTypes.object.isRequired,
  deleteMaterial: PropTypes.func,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default ListItem;
