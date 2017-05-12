import React from 'react';

export default class SelectInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  toggleMenu = () => {
    this.setState({ active: !this.state.active });
  }
  handleClick(item) {
    const { input } = this.props;
    input.onChange(item);
    this.setState({ active: false });
  }
  render() {

    const { input, data, meta } = this.props;
    let val = input.value;
    if (val.toJS) { val = val.toJS(); }

    const options = data.map((item, index) => (
      <li key={`select-${input.name}-${index}`} onClick={() => { this.handleClick(item); }}>
        {item.name}
      </li>
    ));

    return (
      <div className="select-input">
        <button onClick={this.toggleMenu} type="button">{val.name}</button>
        {this.state.active &&
          <ul>
            {options}
          </ul>
        }
      </div>
    );
  }
}
