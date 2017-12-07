import React, { PropTypes } from 'react';
import MaterialList from 'containers/MaterialList/subcomponents/List';
import MaterialManager from 'containers/MaterialManager/Form';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ScrollArea from 'components/ScrollArea';
import SearchInput from 'components/SearchInput';
import Toolbar from './AddMaterialToolbar';
import { VIEW } from '../constants';

export default class AddMaterial extends React.PureComponent {
  render() {
    const {
      filterMaterials,
      createComponents,
      selectedMaterials,
      createMaterial,
      materialListHeight,
      abilities,
      view,
      materialID,
    } = this.props;
    return (
      <Modal id="materials" width="100%" maxWidth="1000px">
        <div className="flex items-center justify-center pt4">
          <div className="flex-none">
            <SearchInput onChange={filterMaterials} />
          </div>
        </div>
        {abilities.getIn(['Material', 'update']) ? (
          <div className="py3 px4">
            <Toolbar {...this.props} />
          </div>
        ) : (
          <div className="pt3" />
        )}
        {view === VIEW.list && (
          <div>
            <div
              className="vh-ymax40 bg-shadowY bt2"
              style={{ height: materialListHeight() }}
            >
              <ScrollArea className="px4">
                <MaterialList {...this.props} selectable />
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
          <div className="vh-y40 bg-shadowY bt2">
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
  filterMaterials: PropTypes.func,
  createMaterial: PropTypes.func,
  createComponents: PropTypes.func,
  selectedMaterials: PropTypes.object,
  materialListHeight: PropTypes.func,
  abilities: PropTypes.object,
  view: PropTypes.string,
  materialID: PropTypes.number,
};
