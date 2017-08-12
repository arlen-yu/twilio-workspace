import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const Input = props => (
  <MuiThemeProvider>
    <div style={{ textAlign: 'center' }}>
      <TextField
        name={'username'}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            props.onSubmit();
          }
        }}
      />
    </div>
  </MuiThemeProvider>
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Input;
