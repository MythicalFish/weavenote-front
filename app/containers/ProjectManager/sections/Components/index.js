import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import { fetchComponents, switchComponent } from '../../actions';
import { selectComponents, selectCurrentComponent } from '../../selectors';

class Components extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetchComponentsFor, project } = this.props;
    fetchComponentsFor(project.id);
  }

  render() {
    const { components, currentComponent, switchComponentTo } = this.props;
    return (
      <div className="itemization">
        {components && components.toJS().map((component) => (
          <ComponentRow
            key={`component-${component.id}`}
            component={component}
            currentComponent={currentComponent}
            handleClick={() => { switchComponentTo(component); }}
          />
        ))}
      </div>
    );
  }
}

const ComponentRow = (props) => {
  const { component, currentComponent, handleClick } = props;
  return (
    <div>
      <div className="item">
        <div>
          {component.material.name}
        </div>
        <button onClick={handleClick}>
          <i className="fa fa-chevron-down"></i>
        </button>
      </div>
      {currentComponent && currentComponent.id === component.id &&
        <Form />
      }
    </div>
  );
};

ComponentRow.propTypes = {
  component: PropTypes.object,
  currentComponent: PropTypes.object,
  handleClick: PropTypes.func,
};

Components.propTypes = {
  project: PropTypes.object,
  components: PropTypes.object,
  currentComponent: PropTypes.object,
  fetchComponentsFor: PropTypes.func,
  switchComponentTo: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    fetchComponentsFor: (id) => { dispatch(fetchComponents(id)); },
    switchComponentTo: (component) => { dispatch(switchComponent(component)); },
  };
}

const mapState = createStructuredSelector({
  components: selectComponents(),
  currentComponent: selectCurrentComponent(),
});

export default connect(mapState, mapDispatch)(Components);
