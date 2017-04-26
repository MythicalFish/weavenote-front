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

import React from 'react';

export default class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="p4">
        <div className="row flex">
          <div className="col-xs-12 col-md-7">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="p3 bg-white">
                  
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="p3 bg-white">
                  
                </div>
              </div>
              <div className="col-xs-12 mt2">
                <div className="p3 bg-white">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-5 flex">
            <div className="p3 bg-white flex-auto">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
