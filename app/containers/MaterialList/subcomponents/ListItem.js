import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Price from 'components/Price';
import Dot from 'components/Dot';
import Dropdown from 'components/Dropdown';
import confirm from 'utils/confirm';

class ListItem extends React.PureComponent {
  url = `/materials/${this.props.material.get('id')}`;
  isSelected = () => {
    const { selectedMaterials, material } = this.props;
    const i = selectedMaterials.findKey((id) => material.get('id') === id);
    return i !== undefined;
  };
  handleDelete = () => {
    const { deleteMaterial, material } = this.props;
    confirm('Are you sure you want to delete this material?').then(() => {
      deleteMaterial(material.get('id'));
    });
  };
  handleEdit = () => {
    const { onEdit, material } = this.props;
    if (onEdit) {
      onEdit(material);
    } else {
      browserHistory.push(this.url);
    }
  };
  handleClick = () => {
    const { selectable, onSelect, material } = this.props;
    if (selectable && onSelect) {
      onSelect(material);
    } else {
      browserHistory.push(this.url);
    }
  };
  Checkbox = () => <div>{this.isSelected() ? 'x' : 'o'}</div>;
  render() {
    const { material, selectable } = this.props;
    const { Checkbox } = this;
    const linked = {
      onClick: this.handleClick,
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
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={this.handleDelete}>Delete</button>
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
  onEdit: PropTypes.func,
  selectedMaterials: PropTypes.object,
};

export default ListItem;
