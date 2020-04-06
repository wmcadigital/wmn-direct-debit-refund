import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Radio from 'components/shared/FormElements/Radio/Radio';

const Step1 = ({
  currentStep,
  setCurrentStep,
  setIsPaperTicket,
  setIsSwiftCard,
}) => {
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext

  // Update customerType on radio button change
  const handleRadioChange = (e) => {
    formDispatch({ type: 'UPDATE_CUSTOMER_TYPE', payload: e.target.value });

    // If paper ticket chosen
    if (e.target.value === 'PaperTicket') {
      setIsPaperTicket(true); // Then set paper ticket to true (value used in step 3)
    } else {
      setIsPaperTicket(false); // Else set to false
    }

    if (e.target.value === 'SwiftCard') {
      setIsSwiftCard(true);
    } else {
      setIsSwiftCard(false);
    }
  };

  // Update the current step to the correct one depending on users selection
  const handleContinue = () => {
    // SwiftCard, paperTicket
    if (
      formState.CustomerType === 'SwiftCard' ||
      formState.CustomerType === 'PaperTicket'
    ) {
      setCurrentStep(currentStep + 1); // Go to next step(2) so we can set customerType
    }
    // classPass, scratchcard
    else if (
      formState.CustomerType === 'Scratchcard' ||
      formState.CustomerType === 'ClassPass'
    ) {
      setCurrentStep(currentStep + 3); // Skip to last steps as payment info isn't needed for scratchcard and classPass
    }
    // swiftOnMobile;
    else {
      setCurrentStep(currentStep + 2); // Skip two steps(step 3) as customerType has been set
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h2>About your ticket</h2>
      <div className="wmnds-fe-group">
        <fieldset className="wmnds-fe-fieldset">
          <legend className="wmnds-fe-fieldset__legend">
            <h3 className="wmnds-fe-question">
              Which best describes your ticket?
            </h3>
          </legend>
          <div className="wmnds-fe-radios">
            <Radio
              name="CustomerType"
              text="Swift card"
              value="SwiftCard"
              onChange={handleRadioChange}
            />
            <Radio
              name="CustomerType"
              text="Paper ticket"
              value="PaperTicket"
              onChange={handleRadioChange}
            />
            <Radio
              name="CustomerType"
              text="Swift on Mobile app"
              value="SwiftPortal"
              onChange={handleRadioChange}
            />
            <Radio
              name="CustomerType"
              text="Scratchcard"
              value="Scratchcard"
              onChange={handleRadioChange}
            />
            <Radio
              name="CustomerType"
              text="Class pass"
              value="ClassPass"
              onChange={handleRadioChange}
            />
          </div>
        </fieldset>
      </div>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={() => handleContinue()}
        disabled={!formState.CustomerType}
      >
        Continue
      </button>
    </>
  );
};

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setIsPaperTicket: PropTypes.func.isRequired,
  setIsSwiftCard: PropTypes.func.isRequired,
};

export default Step1;
