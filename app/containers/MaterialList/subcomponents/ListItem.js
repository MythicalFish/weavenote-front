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
    const { selectable, selectMaterial, material } = this.props;
    if (selectable && selectMaterial) {
      selectMaterial(material);
    } else {
      browserHistory.push(this.url);
    }
  };
  handleEdit = () => {
    const { editMaterial, material } = this.props;
    if (editMaterial) {
      editMaterial(material);
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
    const { material, selectable, fileMaterial } = this.props;
    const { id, archived } = material.toObject();
    const linked = {
      onClick: this.handleSelect,
      className: 'cursor-pointer',
    };
    return (
      <tr>
        {selectable && (
          <td
            onClick={this.handleSelect}
            className="cursor-pointer flex items-center"
          >
            <Checkbox checked={this.isSelected()} />
          </td>
        )}
        <td {...linked}>{material.getIn(['type', 'name'])}</td>
        <td {...linked}>{material.get('identifier')}</td>
        <td {...linked}>{material.get('display_name')}</td>
        <td {...linked}>{material.get('color')}</td>
        {!selectable && <td {...linked}>{material.get('supplier_name')}</td>}
        <td {...linked}>
          <Price
            value={material.get('cost_total')}
            currency={material.getIn(['currency', 'iso_code'])}
          />
        </td>
        <td className="right-align">
          <Dropdown icon="more">
            {!archived && <button onClick={this.handleEdit}>Edit</button>}
            {!archived && (
              <button onClick={this.handleDuplicate}>Duplicate</button>
            )}
            <button onClick={() => fileMaterial({ id, archived: !archived })}>
              {archived ? 'Restore' : 'Archive'}
            </button>
            {archived && <button onClick={this.handleDelete}>Delete</button>}
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
  selectMaterial: PropTypes.func,
  editMaterial: PropTypes.func,
  duplicateMaterial: PropTypes.func,
  fileMaterial: PropTypes.func,
  selectedMaterials: PropTypes.object,
};

export default ListItem;
