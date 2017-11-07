/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import fieldConstructor from './field';
import { selectMaterial } from '../selectors';
import { fetchMaterial, updateMaterial, createMaterial } from '../actions';
import Form from './Form';

export class MaterialManager extends React.PureComponent {
  state = { type: null };

  componentWillMount() {
    const { params, id } = this.props;
    this.props.fetchMaterial(id || params.id);
  }

  componentWillUpdate = () => {
    if (this.state.type) return;
    const { initialValues: v } = this.props;
    if (!v) return;
    const type = v.get('type');
    if (type) this.switchType(type);
  };

  onSubmit = () => {
    const { params, id } = this.props;
    if ((id || params.id) === 'new') {
      this.props.createMaterial();
    } else {
      this.props.updateMaterial();
    }
  };

  switchType = (type) => {
    this.setState({ type: type.get('name') });
  };

  typeIs = (type) => {
    let t = type;
    if (!Array.isArray(t)) t = [t];
    return t.includes(this.state.type);
  };

  abilities = this.props.abilities.get('Material').toJS();
  readOnly = !this.abilities.update;
  Field = fieldConstructor({
    readOnly: this.readOnly,
    onChange: () => {
      if (!this.isNew) this.props.updateMaterial();
    },
  });
  render() {
    const { initialValues, globalData } = this.props;
    if (!globalData || !initialValues) return null;
    const { onSubmit, typeIs, switchType, Field } = this;
    const { abilities, readOnly } = this;
    const { type } = this.state;
    const fProps = {
      ...this.props,
      onSubmit,
      typeIs,
      type,
      switchType,
      abilities,
      readOnly,
      isNew: !initialValues.get('id'),
      Field,
    };
    return <Form {...fProps} />;
  }
}

const mapState = createStructuredSelector({
  initialValues: selectMaterial(),
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      fetchMaterial,
      updateMaterial,
      createMaterial,
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(MaterialManager);
