import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

class Form extends React.Component {

  state = { type: null }

  componentWillMount = () => {
    const { initialValues } = this.props;
    const v = initialValues.toJS();
    if (v.type) {
      this.setState({ type: v.type.name });
    }
  }

  switchType = (type) => {
    this.setState({ type: type.name });
  }

  fields = () => {
    const { materialTypes, colors } = this.props;
    return [
      {
        name: 'Global',
        components: [
          <Field name="type" type="select" component={DataRow} label="Type" data={materialTypes} onChanged={this.switchType} />,
          <Field name="name" type="text" component={DataRow} label="Name" />,
          <Field name="identifier" type="text" component={DataRow} label="Identifier" />,
          <Field name="color" type="select" component={DataRow} label="Color" data={colors} />,
          <Field name="cost_base" type="text" component={DataRow} label="Base cost" />,
        ],
      }, {
        name: 'Fabric',
        components: [
          <Field name="composition" type="text" component={DataRow} label="Composition" />,
        ],
      },
    ];
  }

  showFieldsFor = (type) => {
    return null;
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="bg-white data-rows" onSubmit={handleSubmit}>
        {this.fields().map((field, index) => {
          if (field.name === 'Global' || field.name === this.state.type) {
            return field.components;
          }
        })}
        <footer className="p2 center">
          <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
        </footer>
      </form>
    );
  }
}

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  materialTypes: PropTypes.array,
  colors: PropTypes.array,
};

export default reduxForm({
  form: 'Material',
})(Form);
