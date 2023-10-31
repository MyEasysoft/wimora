import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { LayoutSideNavigation, Page, UserNav, H3 } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import {
  paypalApp,
  paypalAppClear,
  resetPassword,
} from './PaypalAppPage.duck';
import { logout } from '../../ducks/auth.duck';
import css from './PaypalAppPage.module.css';
import ListingItemComponent from '../../components/ListingPaymentListItems/ListingPaymentListItem';



export const PaypalAppPageComponent = props => {
  const {
    
    paypalAppError,
    paypalAppInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitPaypalApp,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    accountSales,
    scrollingDisabled,
    intl,
  } = props;

  if (currentUser === undefined)return;
  const {paypalMerchantId,listingPaidFor} = currentUser?.attributes?.profile?.privateData;

  const handlePaypalApp = values => {
    return onSubmitPaypalApp(values).then(() => {
      onLogout();
    });
  };

  useEffect(() => {
    return onChange();
  }, []);

  const paypalHeader = paypalMerchantId !== undefined && paypalMerchantId !== null && paypalMerchantId !== ""?paypalMerchantId:
    "You have not connect your account to Paypal yet";

  const pageDetails = (
    <div className={css.details}>
       <p>Paypal Merchant Id: {paypalHeader}</p> 
       <ListingItemComponent 
            listingPaidFor={listingPaidFor}
           
          />
       
    </div>
  );


  const title = intl.formatMessage({ id: 'PaypalAppPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="PaypalAppPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav currentPage="PaypalAppPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="PaypalAppPage"
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="PaypalAppPage.heading" />
          </H3>
          {pageDetails}
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

PaypalAppPageComponent.defaultProps = {
  paypalAppError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

PaypalAppPageComponent.propTypes = {
  paypalAppError: propTypes.error,
  paypalAppInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitPaypalApp: func.isRequired,
  paypalApp: bool,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const getInfluencer = id=>{

}

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    paypalAppError,
    paypalAppInProgress,
    paypalApp,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.PaypalAppPage;
  const { currentUser } = state.user;

  const getUser = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };
  
  return {
    paypalAppError,
    paypalAppInProgress,
    currentUser,
    paypalApp,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
    getListing,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(paypalAppClear()),
  onLogout: () => dispatch(logout()),
  onSubmitPaypalApp: values => dispatch(paypalApp(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const PaypalAppPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(PaypalAppPageComponent);

export default PaypalAppPage;