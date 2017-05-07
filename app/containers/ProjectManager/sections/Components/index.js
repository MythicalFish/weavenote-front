import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import { fetchComponents, switchComponent, updateComponent } from '../../actions';
import { selectComponents, selectCurrentComponent, selectComponentForm } from '../../selectors';

class Components extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { fetch, project } = this.props;
    fetch(project.id);
  }

  render() {
    const { components, current, switchTo, handleSubmit, initialValues } = this.props;
    let items = [];
    if (components) {
      items = components.toJS().map((component) => {
        const key = `component-${component.id}`;
        let chevronClass = 'fa-chevron-down';
        let switchTarget = component;
        const isCurrent = current && current.id === component.id;
        if (isCurrent) {
          chevronClass = 'fa-chevron-up';
          switchTarget = null;
        }
        const handleClick = () => { switchTo(switchTarget); };
        const item = [];
        item.push((
          <button className="item" onClick={handleClick} key={`component-item-${component.id}`}>
            <div className="left-align">
              {component.material.name}
            </div>
            <div className="right-align">
              <i className={`fa ${chevronClass} gray`}></i>
            </div>
          </button>
        ));
        if (isCurrent) {
          item.push((
            <Form
              onSubmit={handleSubmit}
              initialValues={initialValues}
              material={current.material}
              key={`component-form-${component.id}`}
            />
          ));
        }
        return (
          <div key={key}>
            {item}
          </div>
        );
      });
    }
    return (
      <div className="itemization">
        {items}
      </div>
    );
  }
}

Components.propTypes = {
  project: PropTypes.object,
  components: PropTypes.object,
  current: PropTypes.object,
  fetch: PropTypes.func,
  switchTo: PropTypes.func,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
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
