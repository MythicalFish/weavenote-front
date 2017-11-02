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
  } = props;
  const handleClick = () => {
    editMaterial(material);
    openModal('materials');
  };
  const Col = ({ children, onClick, className }) => {
    const tdProps = { className: null };
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
      <Col onClick={handleClick}>{material.get('name')}</Col>
      <Col>
        <Input
          defaultValue={component.get('quantity')}
          disableReduxForm
          onChange={(e) =>
            updateComponent(component.set('quantity', e.target.value))}
        />
      </Col>
      <Col className="right-align">
        <Dropdown icon="more">
          <button onClick={() => deleteComponent({ ...component.toJS() })}>
            Delete
          </button>
        </Dropdown>
      </Col>
    </tr>
  );
};

ListItem.propTypes = {
  editMaterial: PropTypes.func,
  openModal: PropTypes.func,
  deleteComponent: PropTypes.func,
  component: PropTypes.object,
  material: PropTypes.object,
};

export default ListItem;
