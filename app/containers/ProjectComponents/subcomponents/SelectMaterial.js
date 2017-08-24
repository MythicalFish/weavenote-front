import React, { PropTypes } from 'react';
import Button from 'components/Button';
import ListItemLabel from './ListItemLabel';

export default class SelectMaterial extends React.PureComponent {
  handleClick = (material) => {
    this.props.createComponent({
      material_id: material.get('id'),
      project_id: this.props.project.get('id'),
    });
    this.props.toggleCreate();
  };

  render() {
    const { materials } = this.props;
    return (
      <div>
        <div className="center mb2 bold">Add material:</div>
        <div className="accordion">
          {materials &&
            materials.map((material) =>
              <div className="accordion-row" key={material}>
                <button
                  type="button"
                  onClick={() => this.handleClick(material)}
                  className="accordion-row-header"
                >
                  <ListItemLabel material={material} />
                </button>
              </div>
            )}
        </div>
        <div className="pt2 center">
          <div className="mb2">
            <Button
              to="/materials/new"
              inlineIcon="plus"
              label="New material"
              shy
            />
          </div>
          <Button
            className="btn btn-shy gray"
            onClick={this.props.toggleCreate}
            label="Cancel"
          />
        </div>
      </div>
    );
  }
}

SelectMaterial.propTypes = {
  project: PropTypes.object,
  toggleCreate: PropTypes.func,
  createComponent: PropTypes.func,
  materials: PropTypes.object,
};
