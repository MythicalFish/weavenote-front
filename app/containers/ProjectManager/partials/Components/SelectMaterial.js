import React, { PropTypes } from 'react';

export default function SelectMaterial(props) {
  const { toggleCreate, materials, create } = props;
  return (
    <div>
      Select a material
      <div>
        {materials && materials.toArray().map((material) => (
          <button
            type="button"
            onClick={() => {
              create(material.get('id'));
              toggleCreate();
            }}
            key={material}
          >
            {material.get('name')}
          </button>
        ))}
        <button type="button" className="btn-shy">
          <i className="fa fa-plus mr1"></i>
          Create a material
        </button>
      </div>
      <div className="bt1 mt2 pt1">
        <button className="btn-shy" onClick={toggleCreate}>
          Cancel
        </button>
      </div>
    </div>
  );
}

SelectMaterial.propTypes = {
  toggleCreate: PropTypes.func,
  create: PropTypes.func,
  materials: PropTypes.object,
};

