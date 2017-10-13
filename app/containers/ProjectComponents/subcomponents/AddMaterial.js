import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/subcomponents/Form';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import Toolbar from './AddMaterialToolbar';
import { VIEW } from '../constants';

export default class AddMaterial extends React.PureComponent {
  state = { view: VIEW.list, id: null };
  setView = (view) => this.setState({ view });
  materialListHeight = this.props.materials.size * 50 + 100;
  editMaterial = (material) => {
    this.setState({ id: material.get('id'), view: VIEW.edit });
  };
  render() {
    const { selectMaterial, createComponents, selectedMaterials } = this.props;
    const { view } = this.state;
    return (
      <Modal id="materials" width="100%" maxWidth="1000px">
        <div className="p4">
          <Toolbar currentView={view} changeView={this.setView} />
        </div>
        {view === VIEW.list && (
          <div>
            <div
              className="vh-ymax50"
              style={{ height: this.materialListHeight }}
            >
              <ScrollArea className="px4">
                <MaterialList
                  selectable
                  onSelect={selectMaterial}
                  onEdit={this.editMaterial}
                  selectedMaterials={selectedMaterials}
                />
              </ScrollArea>
            </div>
            <div className="px4 pb4 right-align flex-none">
              <Button
                onClick={createComponents}
                label="Add to project"
                disabled={selectedMaterials.size === 0}
              />
            </div>
          </div>
        )}
        {[VIEW.create, VIEW.edit].includes(view) && (
          <div className="vh-y60">
            <ScrollArea className="px4">
              <div className="pb4">
                <MaterialManager id={this.state.id || 'new'} {...this.props} />
              </div>
            </ScrollArea>
          </div>
        )}
      </Modal>
    );
  }
}

AddMaterial.propTypes = {
  selectMaterial: PropTypes.func,
  createComponents: PropTypes.func,
  selectedMaterials: PropTypes.object,
  materials: PropTypes.object,
};
