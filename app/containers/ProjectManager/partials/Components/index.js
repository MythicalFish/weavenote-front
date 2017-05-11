import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CreateComponent from './CreateComponent';
import ListComponents from './ListComponents';
import { fetchComponents, switchComponent, updateComponent } from '../../actions';
import { selectComponents, selectCurrentComponent, selectComponentForm } from '../../selectors';

class Components extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      creating: false,
    };
  }

  componentDidMount() {
    const { fetch, project } = this.props;
    fetch(project.id);
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  }

  render() {
    return (
      <div>
        {
          this.state.creating
            ? <CreateComponent {...this.props} toggleCreate={this.toggleCreate} />
            : <ListComponents {...this.props} toggleCreate={this.toggleCreate} />
        }
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  fetch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    fetch: (id) => { dispatch(fetchComponents(id)); },
    switchTo: (component) => { dispatch(switchComponent(component)); },
    handleSubmit: (data) => {
      dispatch(updateComponent(data));
    },
  };
}

const mapState = createStructuredSelector({
  components: selectComponents(),
  current: selectCurrentComponent(),
  initialValues: selectComponentForm(),
});

export default connect(mapState, mapDispatch)(Components);
