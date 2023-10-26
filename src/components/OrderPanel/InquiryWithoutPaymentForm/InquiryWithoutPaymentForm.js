import React from 'react';
import { func, string } from 'prop-types';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';

import { Form, PrimaryButton } from '../..';

import css from './InquiryWithoutPaymentForm.module.css';
import Checkout from '../../PaypalCom/Checkout';

const renderForm = formRenderProps => {
  // FormRenderProps from final-form
  const { formId, className, rootClassName, handleSubmit } = formRenderProps;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <>
    <Form id={formId} onSubmit={handleSubmit} className={classes}>
      <div className={css.submitButton}>
        <PrimaryButton className={css.marginB} type="submit">
          <FormattedMessage id="InquiryWithoutPaymentForm.ctaButton" />
        </PrimaryButton>
        
          
      </div>
    </Form>
    <Checkout/>
    </>
    
  );
};

const InquiryWithoutPaymentForm = props => {
  const intl = useIntl();
  const initialValues = {};

  return <FinalForm initialValues={initialValues} {...props} intl={intl} render={renderForm} />;
};

InquiryWithoutPaymentForm.defaultProps = {
  rootClassName: null,
  className: null,
};

InquiryWithoutPaymentForm.propTypes = {
  rootClassName: string,
  className: string,

  // form
  formId: string.isRequired,
  onSubmit: func.isRequired,
};

export default InquiryWithoutPaymentForm;
