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
  ads,
  adsClear,
  resetPassword,
} from './AdsPage.duck';
import { logout } from '../../ducks/auth.duck';
import css from './AdsPage.module.css';

export const AdsPageComponent = props => {
  const {
    adsError,
    adsInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitAds,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    accountDeleted,
    scrollingDisabled,
    intl,
  } = props;

  const handleAds = values => {
    return onSubmitAds(values).then(() => {
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
          adsError?.status == 409
            ? 'AdsPage.error'
            : 'AdsPage.details'
        }
        values={{ errorCause: adsError?.message }}
      />
    </div>
  );

  const title = intl.formatMessage({ id: 'AdsPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="AdsPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav currentPage="AdsPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="AdsPage"
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="AdsPage.heading" />
          </H3>
          {pageDetails}
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

AdsPageComponent.defaultProps = {
  adsError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

AdsPageComponent.propTypes = {
  adsError: propTypes.error,
  adsInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitAds: func.isRequired,
  accountDeleted: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    adsError,
    adsInProgress,
    accountDeleted,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.AdsPage;
  const { currentUser } = state.user;
  return {
    adsError,
    adsInProgress,
    currentUser,
    accountDeleted,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(adsClear()),
  onLogout: () => dispatch(logout()),
  onSubmitAds: values => dispatch(ads(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const AdsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(AdsPageComponent);

export default AdsPage;