import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Accordion from 'components/Accordion';
import ListItem from './ListItem';
import Form from './Form';
import {
  fetchInstructions, switchInstruction, updateInstruction, createInstruction,
} from '../../actions';
import { selectInstructions, selectCurrentInstruction } from '../../selectors';
class Instructions extends React.Component {

  state = { creating: false }

  componentDidMount() {
    const { project } = this.props;
    this.props.fetchInstructions(project.id);
  }

  toggleCreate = () => {
    this.setState({ creating: !this.state.creating });
  }

  createInstruction = (data) => {
    this.props.createInstruction(data);
    this.toggleCreate();
  }

  render() {
    return (
      <div>
        {
          this.state.creating
            ? <Form
              onSubmit={this.createInstruction}
              initialValues={{
                title: '',
                description: '',
                projectID: this.props.project.id,
              }}
            />
            : <Accordion
              items={this.props.instructions}
              current={this.props.current}
              toggleCreate={this.toggleCreate}
              updateItem={this.props.updateInstruction}
              switchItem={this.props.switchInstruction}
              formValues={this.props.current}
              ListItem={ListItem}
              Form={Form}
            />
        }
      </div>
    );
  }
}

Instructions.propTypes = {
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
    { fetchInstructions, switchInstruction, updateInstruction, createInstruction },
    dispatch
  );
}

const mapState = createStructuredSelector({
  instructions: selectInstructions(),
  current: selectCurrentInstruction(),
});

export default connect(mapState, mapDispatch)(Instructions);
