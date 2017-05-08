import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import * as sections from 'containers/App/constants/sections';
import SubHeader from 'components/SubHeader';
import { selectMaterialsList } from './selectors';
import { fetchMaterials, createMaterial } from './actions';
import Navigation from './partials/Navigation';
import ListItem from './partials/ListItem';

export class MaterialList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchMaterials();
    this.props.changeSection(sections.ActiveMaterials);
  }

  render() {
    const { materials } = this.props;
    return (
      <div>
        <SubHeader>
          <Navigation
            changeSection={this.props.changeSection}
            currentSection={this.props.currentSection}
            create={this.props.createMaterial}
            fetch={this.props.fetchMaterials}
          />
        </SubHeader>
        {materials && materials.map((material) => (
          <ListItem material={material} key={`material-${material.id}`} />
        ))}
      </div>
    );
  }
}

MaterialList.propTypes = {
  fetchMaterials: PropTypes.func.isRequired,
  currentSection: PropTypes.object,
  changeSection: PropTypes.func,
  createMaterial: PropTypes.func,
  materials: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

const mapState = createStructuredSelector({
  materials: selectMaterialsList(),
  currentSection: selectCurrentSection(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { changeSection, fetchMaterials, createMaterial },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialList);
