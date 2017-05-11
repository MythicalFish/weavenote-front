import React from 'react';

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({ active: false });
  }
  toggleMenu = () => {
    this.state.active
      ? this.setState({ active: false })
      : this.setState({ active: true });
  }
  handleClick = (item) => {
    const { input } = this.props;
    input.onChange(item);
    this.setState({ active: false });
  }
  render() {

    const { input, data, meta } = this.props;
    let val = input.value;
    if (val.toJS) { val = val.toJS(); }

    const options = data.map((item, index) => (
      <li key={`select-${input.name}-${index}`} onClick={this.handleClick}>
        {item.name}
      </li>
    ));

    return (
      <div className="select-input">
        <button onClick={this.toggleMenu}>{val.name}</button>
        {this.state.active &&
          <ul>
            {options}
          </ul>
        }
      </div>
    );
  }
}
