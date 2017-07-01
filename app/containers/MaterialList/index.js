import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection, selectMaterials } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import * as sections from 'containers/App/constants/sections';
import Header from 'components/Header';
import { fetchMaterials } from './actions';
import Toolbar from './subcomponents/Toolbar';
import Item from './subcomponents/Item';

export class MaterialList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchMaterials();
    this.props.changeSection(sections.ActiveMaterials);
  }

  render() {
    const { materials } = this.props;
    return (
      <div>
        <Header />
        <Toolbar
          changeSection={this.props.changeSection}
          currentSection={this.props.currentSection}
          fetch={this.props.fetchMaterials}
        />
        <div className="m2 b1">
          {materials && materials.toArray().map((material) => (
            <Item material={material} key={`material-${material.get('id')}`} />
          ))}
        </div>
      </div>
    );
  }
}

MaterialList.propTypes = {
  fetchMaterials: PropTypes.func.isRequired,
  currentSection: PropTypes.object,
  changeSection: PropTypes.func,
  materials: PropTypes.object,
};

const mapState = createStructuredSelector({
  materials: selectMaterials(),
  currentSection: selectCurrentSection(),
});

function mapDispatch(dispatch) {
  return bindActionCreators(
    { changeSection, fetchMaterials },
    dispatch
  );
}

export default connect(mapState, mapDispatch)(MaterialList);
