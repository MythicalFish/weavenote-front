import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/subcomponents/Form';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import Toolbar from './AddMaterialToolbar';
import { VIEW } from '../constants';

export default class AddMaterial extends React.PureComponent {
  state = { view: VIEW.list };
  setView = (view) => this.setState({ view });
  render() {
    const { selectMaterial, createComponents, selectedMaterials } = this.props;
    const { view } = this.state;
    return (
      <Modal id="materials" width="100%" maxWidth="1000px">
        <div className="p4">
          <Toolbar currentView={view} changeView={this.setView} />
        </div>
        <div className="vh-y50">
          <ScrollArea className="px4">
            {view === VIEW.list && (
              <MaterialList
                selectable
                onSelect={selectMaterial}
                selectedMaterials={selectedMaterials}
              />
            )}
            {view === VIEW.create && (
              <div className="pb4">
                <MaterialManager id="new" {...this.props} />
              </div>
            )}
          </ScrollArea>
        </div>
        {view === VIEW.list && (
          <div className="px4 pb4 right-align flex-none">
            <Button
              onClick={createComponents}
              label="Add"
              disabled={selectedMaterials.size === 0}
            />
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
};
