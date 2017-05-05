import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import { fetchComponents, switchComponent } from '../../actions';
import { selectComponents, selectCurrentComponent } from '../../selectors';

class Components extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetch, project } = this.props;
    fetch(project.id);
  }

  render() {
    const { components, current, switchTo } = this.props;
    return (
      <div className="itemization">
        {components && components.toJS().map((component) => (
          <ComponentRow
            key={`component-${component.id}`}
            component={component}
            current={current}
            switchTo={switchTo}
          />
        ))}
      </div>
    );
  }
}

const ComponentRow = (props) => {
  const { component, current, switchTo } = props;
  const isCurrent = current && current.id === component.id;
  let chevronClass = 'fa fa-chevron-down';
  let switchTarget = component;
  if (isCurrent) {
    chevronClass = 'fa fa-chevron-up';
    switchTarget = null;
  }
  const handleClick = () => { switchTo(switchTarget); };
  return (
    <div>
      <button className="item" onClick={handleClick}>
        <div className="left-align">
          {component.material.name}
        </div>
        <div className="right-align">
          <i className={`${chevronClass} gray`}></i>
        </div>
      </button>
      {isCurrent && <Form initialValues={current} material={current.material} /> }
    </div>
  );
};

ComponentRow.propTypes = {
  component: PropTypes.object,
  current: PropTypes.object,
  switchTo: PropTypes.func,
};

Components.propTypes = {
  project: PropTypes.object,
  components: PropTypes.object,
  current: PropTypes.object,
  fetch: PropTypes.func,
  switchTo: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    fetch: (id) => { dispatch(fetchComponents(id)); },
    switchTo: (component) => { dispatch(switchComponent(component)); },
  };
}

const mapState = createStructuredSelector({
  components: selectComponents(),
  current: selectCurrentComponent(),
});

export default connect(mapState, mapDispatch)(Components);
