import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Accordion from 'components/Accordion';
import Button from 'components/Button';
import RowHeader from './subcomponents/RowHeader';
import Form from './subcomponents/Form';
import {
  fetchInstructions,
  updateInstruction,
  createInstruction,
  deleteInstruction,
} from './actions';
import { selectInstructions } from './selectors';

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
        {this.state.creating ? (
          <Form
            onSubmit={this.createInstruction}
            label="Add instruction"
            initialValues={{ image_ids: [] }}
            disableAutosave
            toggleCreate={this.toggleCreate}
          />
        ) : (
          <div>
            <Button
              onClick={this.toggleCreate}
              label="Add Instruction"
              icon="Plus"
            />
            <Accordion
              items={this.props.instructions}
              updateItem={this.props.updateInstruction}
              formValues={this.props.current}
              RowHeader={RowHeader}
              Form={Form}
              deleteInstruction={this.props.deleteInstruction}
            />
          </div>
        )}
      </div>
    );
  }
}

ProjectInstructions.propTypes = {
  project: PropTypes.object,
  instructions: PropTypes.object,
  current: PropTypes.object,
  fetchInstructions: PropTypes.func,
  updateInstruction: PropTypes.func,
  createInstruction: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {
      fetchInstructions,
      updateInstruction,
      createInstruction,
      deleteInstruction,
    },
    dispatch
  );
}

const mapState = createStructuredSelector({
  instructions: selectInstructions(),
});

export default connect(mapState, mapDispatch)(ProjectInstructions);
