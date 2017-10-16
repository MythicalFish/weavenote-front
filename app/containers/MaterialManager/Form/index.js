/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import fieldConstructor from './field';
import { selectMaterial } from '../selectors';
import {
  fetchMaterial,
  updateMaterial,
  createMaterial,
  newSupplier,
  toggleCareLabel,
} from '../actions';
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

  render() {
    const { initialValues, globalData } = this.props;
    const abilities = this.props.abilities.get('Material');
    const isRestricted = !abilities.update;
    const isNew = this.props.params.id === 'new';
    if (!globalData || !initialValues) return null;
    const { onSubmit, typeIs, switchType } = this;
    const { type } = this.state;
    const fProps = {
      ...this.props,
      onSubmit,
      typeIs,
      type,
      switchType,
      abilities,
      isRestricted,
      isNew,
      Field: fieldConstructor({ isNew, isRestricted, onSubmit }),
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
      toggleCareLabel,
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(MaterialManager);
