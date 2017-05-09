import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Form from './Form';
import ListItem from './ListItem';
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
        const isCurrent = current && current.id === component.id;
        return (
          <div key={`component-${component.id}`}>
            <ListItem
              component={component}  
              isCurrent={isCurrent}
              switchTo={switchTo}
            />
            {isCurrent &&
              <Form
                onSubmit={handleSubmit}
                initialValues={initialValues}
                material={current.material}
              />
            }
          </div>
        );
      });
    }
    return (
      <div className="data-rows">
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
