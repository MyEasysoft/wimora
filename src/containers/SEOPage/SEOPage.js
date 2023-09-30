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
  seo,
  seoClear,
  resetPassword,
} from '../SEOPage/SEOPage.duck';
import { logout } from '../../ducks/auth.duck';
import css from './SEOPage.module.css';

export const SEOPageComponent = props => {
  const {
    seoError,
    seoInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitSEO,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    accountSales,
    scrollingDisabled,
    intl,
  } = props;

  const handleSEO = values => {
    return onSubmitSEO(values).then(() => {
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
          seoError?.status == 409
            ? 'SEOPage.error'
            : 'SEOPage.details'
        }
        values={{ errorCause: seoError?.message }}
      />
    </div>
  );

  const title = intl.formatMessage({ id: 'SEOPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="SEOPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav currentPage="SEOPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="SEOPage"
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="SEOPage.heading" />
          </H3>
          {pageDetails}
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

SEOPageComponent.defaultProps = {
  seoError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

SEOPageComponent.propTypes = {
  seoError: propTypes.error,
  seoInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitSEO: func.isRequired,
  accountSalesd: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    seoError,
    seoInProgress,
    accountSalesd,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.SEOPage;
  const { currentUser } = state.user;
  return {
    seoError,
    seoInProgress,
    currentUser,
    accountSalesd,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(seoClear()),
  onLogout: () => dispatch(logout()),
  onSubmitSEO: values => dispatch(seo(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const SEOPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(SEOPageComponent);

export default SEOPage;