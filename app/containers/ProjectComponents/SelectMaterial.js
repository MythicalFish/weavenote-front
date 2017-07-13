import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
        Select a material
        <div>
          {materials &&
            materials.toArray().map((material) =>
              <button
                type="button"
                onClick={() => {
                  this.handleClick(material);
                }}
                key={material}
              >
                {material.get('name')}
              </button>
            )}
          <Link to="/materials/new" className="btn-shy">
            <i className="fa fa-plus mr1" />
            Create a material
          </Link>
        </div>
        <div className="bt1 mt2 pt1">
          <button className="btn-shy" onClick={this.props.toggleCreate}>
            Cancel
          </button>
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
