// Dashboard disabled for now
// Redirects to /projects

import React, { PropTypes } from 'react';
import Header from 'components/Header';
import { browserHistory } from 'react-router';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    browserHistory.push('/projects');
  }
  render() {
    const { stats } = this.props;
    if (!stats) return null;

    const { projects: { counts } } = stats;

    let countsByStage = <li />;

    if (counts && counts.by_stage) {
      countsByStage = counts.by_stage.map((item, index) =>
        <li key={`item-${index}`}>
          {`${item.label}: ${item.count}`}
        </li>
      );
    }

    return (
      <div>
        <Header />
        <div className="p4">
          <div className="row flex">
            <div className="col-xs-12 col-md-7">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="bg-white center b1">
                    <div className="h1 p3 bb1 lh1">
                      {counts.active}
                    </div>
                    <div className="p2 smaller1">Active projects</div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="bg-white center b1">
                    <div className="h1 p3 bb1 lh1">
                      {counts.active}
                    </div>
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
              <div className="p3 bg-white flex-auto b1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  stats: PropTypes.object,
};

export default Dashboard;
