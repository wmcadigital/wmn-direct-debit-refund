import React from 'react';
import PropTypes from 'prop-types';
import useInput from 'customHooks/useFormValidation';

const Input = ({ className, inputmode, label, name, spellcheck, type }) => {
  const customFunc = () => {
    console.log('hello');
  };

  const { handleChange, handleBlur, error } = useInput(name, label, customFunc);

  // Set input to render below
  const input = (
    <>
      <input
        className={`wmnds-fe-input ${error ? 'wmnds-fe-input--error' : ''}`}
        id={name}
        name={name}
        type={type}
        inputMode={inputmode}
        spellCheck={spellcheck}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );

  return (
    <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
      {label && (
        <label className="wmnds-fe-label" htmlFor={name}>
          {label}
        </label>
      )}

      {/* If there is an error, show here */}
      {error && <span className="wmnds-fe-error-message">{error}</span>}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputmode: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  inputmode: 'text',
  className: '',
  spellcheck: false,
  type: 'text',
};

export default Input;
