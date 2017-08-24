import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Accordion from 'components/Accordion';
import PlusButton from 'components/PlusButton';
import ListItem from './subcomponents/ListItem';
import Form from './subcomponents/Form';
import {
  fetchInstructions,
  switchInstruction,
  updateInstruction,
  createInstruction,
} from './actions';
import { selectInstructions, selectCurrentInstruction } from './selectors';

class ProjectInstructions extends React.Component {
  state = { creating: false };

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchInstructions(project.get('id'));
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  };

  createInstruction = (data) => {
    this.props.createInstruction(data);
    this.toggleCreate();
  };

  render() {
    return (
      <div>
        {this.state.creating
          ? <Form
            onSubmit={this.createInstruction}
            label="Add instruction"
            initialValues={{
              project_id: this.props.project.get('id'),
            }}
          />
          : <div>
            <PlusButton onClick={this.toggleCreate} />
            <Accordion
              items={this.props.instructions}
              updateItem={this.props.updateInstruction}
              formValues={this.props.current}
              ListItem={ListItem}
              Form={Form}
            />
          </div>}
      </div>
    );
  }
}

ProjectInstructions.propTypes = {
  project: PropTypes.object,
  instructions: PropTypes.object,
  current: PropTypes.object,
  fetchInstructions: PropTypes.func,
  switchInstruction: PropTypes.func,
  updateInstruction: PropTypes.func,
  createInstruction: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchInstructions,
      switchInstruction,
      updateInstruction,
      createInstruction,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  instructions: selectInstructions(),
  current: selectCurrentInstruction(),
});

export default connect(mapState, mapDispatch)(ProjectInstructions);
