import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Price from 'components/Price';
import Dropdown from 'components/Dropdown';
import confirm from 'utils/confirm';
import Checkbox from 'components/Checkbox';

class ListItem extends React.PureComponent {
  url = `/materials/${this.props.material.get('id')}`;
  isSelected = () => {
    const { selectedMaterials, material } = this.props;
    const i = selectedMaterials.findKey((id) => material.get('id') === id);
    return i !== undefined;
  };
  handleSelect = () => {
    const { selectable, onSelect, material } = this.props;
    if (selectable && onSelect) {
      onSelect(material);
    } else {
      browserHistory.push(this.url);
    }
  };
  handleEdit = () => {
    const { onEdit, material } = this.props;
    if (onEdit) {
      onEdit(material);
    } else {
      browserHistory.push(this.url);
    }
  };
  handleDelete = () => {
    const { deleteMaterial, material } = this.props;
    confirm('Are you sure you want to delete this material?').then(() => {
      deleteMaterial(material.get('id'));
    });
  };
  handleDuplicate = () => {
    const { duplicateMaterial, material } = this.props;
    duplicateMaterial(material.get('id'));
  };
  render() {
    const { material, selectable } = this.props;
    const linked = {
      onClick: this.handleSelect,
      className: 'cursor-pointer',
    };
    return (
      <tr>
        {selectable && (
          <td {...linked}>
            <Checkbox checked={this.isSelected()} />
          </td>
        )}
        <td {...linked}>{material.getIn(['type', 'name'])}</td>
        <td {...linked}>{material.get('identifier')}</td>
        <td {...linked}>{material.get('name')}</td>
        <td {...linked}>{material.get('color')}</td>
        <td>{material.get('supplier_name')}</td>
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
            <button onClick={this.handleDuplicate}>Duplicate</button>
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
  duplicateMaterial: PropTypes.func,
  selectedMaterials: PropTypes.object,
};

export default ListItem;
