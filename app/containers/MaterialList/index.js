import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentSection } from 'containers/App/selectors';
import { changeSection } from 'containers/App/actions';
import * as sections from 'containers/App/constants/sections';
import Header from 'components/Header';
import { fetchMaterials } from './actions';
import Toolbar from './subcomponents/Toolbar';
import ListItem from './subcomponents/ListItem';
import { selectMaterials } from './selectors';

export class MaterialList extends React.PureComponent {
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
        <div className="container-narrow px2 py4">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Ref.</th>
                <th>Name</th>
                <th>Color</th>
                <th>Factory</th>
                <th>Price</th>
                <th>Status</th>
                <th>Tags</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {materials &&
                materials
                  .toArray()
                  .map((material) => (
                    <ListItem
                      material={material}
                      key={`material-${material.get('id')}`}
                    />
                  ))}
            </tbody>
          </table>
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
  return bindActionCreators({ changeSection, fetchMaterials }, dispatch);
}

export default connect(mapState, mapDispatch)(MaterialList);
