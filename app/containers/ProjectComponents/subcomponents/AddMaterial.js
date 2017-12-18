import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/Form';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import SearchInput from 'components/SearchInput';
import Toolbar from './AddMaterialToolbar';
import { VIEW } from '../constants';

export default function AddMaterial(props) {
  const {
    filterMaterials,
    createComponents,
    selectedMaterials,
    createMaterial,
    abilities,
    view,
    materialID,
  } = props;
  return (
    <Modal id="materials" width="100%" height="100%" maxWidth="1000px">
      <div className="flex flex-column y-fill">
        <div className="flex-none">
          <div className="flex-centered pt4">
            <div className="flex-none">
              <SearchInput onChange={filterMaterials} />
            </div>
          </div>
          {abilities.update ? (
            <div className="py3 px4">
              <Toolbar {...props} />
            </div>
          ) : (
              <div className="pt3" />
            )}
        </div>
        <div className="flex-auto flex flex-column bt2 relative">
          <div className="overlay">
            {view === VIEW.list && (
              <ScrollArea className="px4">
                <MaterialList {...props} selectable />
              </ScrollArea>
            )}
            {[VIEW.create, VIEW.edit].includes(view) && (
              <ScrollArea className="px4">
                <div className="pb4">
                  <MaterialManager id={materialID || 'new'} {...props} />
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
        {[VIEW.create, VIEW.list].includes(view) && (
          <div className="modal-footer right-align flex-none">
            {view === VIEW.create && (
              <Button
                onClick={createMaterial}
                label="Create & Add Material"
                icon="Plus"
              />
            )}
            {view === VIEW.list && (
              <Button
                onClick={createComponents}
                label="Add to project"
                disabled={selectedMaterials.size === 0}
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

AddMaterial.propTypes = {
  filterMaterials: PropTypes.func,
  createMaterial: PropTypes.func,
  createComponents: PropTypes.func,
  selectedMaterials: PropTypes.object,
  abilities: PropTypes.object,
  view: PropTypes.string,
  materialID: PropTypes.number,
};
