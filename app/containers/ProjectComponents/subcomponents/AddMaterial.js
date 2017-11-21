import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/Form';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import Toolbar from './AddMaterialToolbar';
import { VIEW } from '../constants';

export default class AddMaterial extends React.PureComponent {
  render() {
    const {
      selectMaterial,
      createComponents,
      selectedMaterials,
      createMaterial,
      materialListHeight,
      editMaterial,
      materialID,
      view,
      abilities,
    } = this.props;
    return (
      <Modal id="materials" width="100%" maxWidth="1000px">
        {abilities.getIn(['Material', 'update']) ? (
          <div className="py3 px4">
            <Toolbar {...this.props} />
          </div>
        ) : (
          <div className="pt3" />
        )}
        {view === VIEW.list && (
          <div>
            <div className="vh-ymax50" style={{ height: materialListHeight() }}>
              <ScrollArea className="px4">
                <MaterialList
                  selectable
                  onSelect={selectMaterial}
                  onEdit={editMaterial}
                  selectedMaterials={selectedMaterials}
                  inModal
                />
              </ScrollArea>
            </div>
            <Footer>
              <Button
                onClick={createComponents}
                label="Add to project"
                disabled={selectedMaterials.size === 0}
              />
            </Footer>
          </div>
        )}
        {[VIEW.create, VIEW.edit].includes(view) && (
          <div className="vh-y50">
            <ScrollArea className="px4">
              <div className="pb4">
                <MaterialManager id={materialID || 'new'} {...this.props} />
              </div>
            </ScrollArea>
          </div>
        )}
        {view === VIEW.create && (
          <Footer>
            <Button
              onClick={createMaterial}
              label="Create & Add Material"
              icon="Plus"
            />
          </Footer>
        )}
      </Modal>
    );
  }
}

const Footer = ({ children }) => (
  <div className="modal-footer right-align flex-none">{children}</div>
);

Footer.propTypes = {
  children: PropTypes.node,
};

AddMaterial.propTypes = {
  selectMaterial: PropTypes.func,
  createMaterial: PropTypes.func,
  createComponents: PropTypes.func,
  selectedMaterials: PropTypes.object,
  editMaterial: PropTypes.func,
  materialID: PropTypes.number,
  materialListHeight: PropTypes.func,
  view: PropTypes.string,
  abilities: PropTypes.object,
};
