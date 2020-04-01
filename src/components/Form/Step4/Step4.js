import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Company from './Company/Company';
import DOB from './DOB/DOB';
import Address from './Address/Address';
import Email from './Email/Email';
import Telephone from './Telephone/Telephone';
import Name from './Name/Name';

const Step4 = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext

  const { CustomerType } = formState; // Destructure customertype

  return (
    <>
      <h2>Tell us about yourself</h2>
      <p>
        We’ll use this information to confirm your identity and contact you if
        we need more information
      </p>

      <Name />

      {/* Only show Company if customer is one of the below */}
      {(CustomerType === 'DirectDebit' ||
        CustomerType === 'Shop' ||
        CustomerType === 'SwiftPortal' ||
        CustomerType === 'Workwise') && <Company />}

      {/* Only show address and DOB if not scratchcard and not classpass */}
      {CustomerType !== 'Scratchcard' && CustomerType !== 'ClassPass' && (
        <>
          <DOB />
          <Address />
        </>
      )}

      <Email />
      <Telephone />
    </>
  );
};

export default Step4;
