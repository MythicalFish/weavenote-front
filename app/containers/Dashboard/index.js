/*
 * Dashboard
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
import { getStats } from 'containers/App/actions';

class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getStats();
  }
  render() {
    const stats = this.props.globalState.stats;
    const counts = stats.projects.counts;

    let countsByStage = (<li></li>);

    if (counts.by_stage) {
      countsByStage = counts.by_stage.map((item, index) => (
        <li key={`item-${index}`}>
          {`${item.label}: ${item.count}`}
        </li>
      ));
    }    

    return (
      <div className="p4">
        <div className="row flex">
          <div className="col-xs-12 col-md-7">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="bg-white center b1">
                  <div className="h1 p3 bb1 lh1">{counts.active}</div>
                  <div className="p2 smaller1">Active projects</div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="bg-white center b1">
                  <div className="h1 p3 bb1 lh1">{counts.active}</div>
                  <div className="p2 smaller1">Recently updated</div>
                </div>
              </div>
              <div className="col-xs-12 mt2">
                <div className="p3 bg-white smaller b1">
                  <ul>
                    {countsByStage}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-5 flex">
            <div className="p3 bg-white flex-auto b1">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  globalState: PropTypes.object,
  getStats: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStats: () => dispatch(getStats()),
  };
}

const mapStateToProps = createStructuredSelector({
  globalState: selectGlobal(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
