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
  transactionHistory,
  transactionHistoryClear,
  resetPassword,
} from '../TransactionHistoryPage/TransactionHistoryPage.duck';
import { logout } from '../../ducks/auth.duck';
import css from './TransactionHistoryPage.module.css';

export const TransactionHistoryPageComponent = props => {
  const {
    transactionHistoryError,
    transactionHistoryInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitTransactionHistory,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    transactionHistory,
    scrollingDisabled,
    intl,
  } = props;

  const handleTransactionHistory = values => {
    return onSubmitTransactionHistory(values).then(() => {
      onLogout();
    });
  };

  useEffect(() => {
    return onChange();
  }, []);

  const pageDetails = (
    <div className={css.details}>
      <FormattedMessage
        id={
          transactionHistoryError?.status == 409
            ? 'TransactionHistoryPage.error'
            : 'TransactionHistoryPage.details'
        }
        values={{ errorCause: transactionHistoryError?.message }}
      />
    </div>
  );

  const title = intl.formatMessage({ id: 'TransactionHistoryPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="TransactionHistoryPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav currentPage="TransactionHistoryPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="TransactionHistoryPage"
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="TransactionHistoryPage.heading" />
          </H3>
          {pageDetails}
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

TransactionHistoryPageComponent.defaultProps = {
  transactionHistoryError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

TransactionHistoryPageComponent.propTypes = {
  transactionHistoryError: propTypes.error,
  transactionHistoryInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitTransactionHistory: func.isRequired,
  transactionHistory: bool,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    transactionHistoryError,
    transactionHistoryInProgress,
    transactionHistory,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.TransactionHistoryPage;
  const { currentUser } = state.user;
  return {
    transactionHistoryError,
    transactionHistoryInProgress,
    currentUser,
    transactionHistory,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(transactionHistoryClear()),
  onLogout: () => dispatch(logout()),
  onSubmitTransactionHistory: values => dispatch(transactionHistory(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const TransactionHistoryPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(TransactionHistoryPageComponent);

export default TransactionHistoryPage;