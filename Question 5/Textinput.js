import React from 'react';
import { createRoot } from 'react-dom/client';

class Input extends React.PureComponent {
  render() {
    let { forwardedRef, ...otherProps } = this.props;
    return <input {...otherProps} ref={forwardedRef} />;
  }
}

const TextInput = React.forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />;
});

class FocusableInput extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    // If focused prop is true on mounting, the input should receive the focus.
    if (this.props.focused) {
      this.focusInput();
    }
  }

  componentDidUpdate(prevProps) {
    // When the focused prop is changed from false to true, and the input is not focused,
    // it should receive focus.
    if (!prevProps.focused && this.props.focused) {
      this.focusInput();
    }
  }

  focusInput() {
    this.ref.current.focus();
  }

  render() {
    return <TextInput ref={this.ref} />;
  }
}

FocusableInput.defaultProps = {
  focused: false,
};

const App = (props) => <FocusableInput focused={props.focused} />;

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));
root.render(<App focused={true} />); // You can change focused to false or true to test
