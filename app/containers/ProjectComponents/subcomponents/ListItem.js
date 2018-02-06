import React, { PropTypes } from 'react';
import Input from 'components/FormInput';
import Dropdown from 'components/Dropdown';

const ListItem = (props) => {
  const {
    component,
    material,
    updateComponent,
    deleteComponent,
    openModal,
    editMaterial,
    abilities,
  } = props;
  const handleClick = () => {
    editMaterial(material);
    openModal('materials');
  };
  const Col = ({ children, onClick, className }) => {
    const tdProps = { className: '' };
    if (onClick) {
      tdProps.onClick = onClick;
      tdProps.className = 'cursor-pointer';
    }
    if (className) tdProps.className += className;
    return (
      <td {...tdProps}>
        <span className="py2 block">{children}</span>
      </td>
    );
  };
  return (
    <tr>
      <Col onClick={handleClick}>{material.getIn(['type', 'name'])}</Col>
      <Col onClick={handleClick}>{material.get('display_name')}</Col>
      <Col className="center">
        {abilities.update ? (
          <Input
            defaultValue={component.get('quantity')}
            disableReduxForm
            small
            onChange={(e) =>
              updateComponent(component.set('quantity', e.target.value))
            }
          />
        ) : (
          <span>{component.get('quantity')}</span>
        )}
      </Col>
      <Col className="right-align">
        {abilities.destroy && (
          <Dropdown icon="more">
            <button onClick={() => deleteComponent({ ...component.toJS() })}>
              Delete
            </button>
          </Dropdown>
        )}
      </Col>
    </tr>
  );
};

ListItem.propTypes = {
  editMaterial: PropTypes.func,
  openModal: PropTypes.func,
  deleteComponent: PropTypes.func,
  updateComponent: PropTypes.func,
  component: PropTypes.object,
  material: PropTypes.object,
  abilities: PropTypes.object,
};

export default ListItem;
