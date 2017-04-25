import React from 'react';
import Navigation from './Navigation';
import Basics from './Basics';

class ShowProject extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnSubmit = (data) => {
    this.props.onSubmit(data);
  }
  render() {
    const p = this.props;
    let section;
    switch (p.currentSection) {
      default:
        section = <Basics {...p.basics} />;
    }
    return (
      <div>
        <Navigation />
        {section}
      </div>
    );
  }
}

ShowProject.propTypes = {
  id: React.PropTypes.number,
  basics: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  currentSection: React.PropTypes.string,
};

export default ShowProject;
