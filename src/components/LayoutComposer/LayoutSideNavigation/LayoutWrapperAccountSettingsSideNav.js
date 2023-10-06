/**
 * This is a wrapper component for different Layouts.
 * Navigational 'aside' content should be added to this wrapper.
 */
import React, { useEffect } from 'react';
import { node, number, string, shape } from 'prop-types';
import { compose } from 'redux';

import { FormattedMessage } from '../../../util/reactIntl';
import { withViewport } from '../../../util/uiHelpers';

import { TabNav } from '../../../components';

import { createGlobalState } from './hookGlobalState';

import css from './LayoutSideNavigation.module.css';

const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

// Add global state for tab scrolling effect
const initialScrollState = { scrollLeft: 0 };
const { useGlobalState } = createGlobalState(initialScrollState);

// Horizontal scroll animation using element.scrollTo()
const scrollToTab = (currentPage, scrollLeft, setScrollLeft) => {
  const el = document.querySelector(`#${currentPage}Tab`);

  if (el) {
    // el.scrollIntoView doesn't work with Safari and it considers vertical positioning too.
    // This scroll behaviour affects horizontal scrolling only
    // and it expects that the immediate parent element is scrollable.
    const parent = el.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const maxScrollDistance = parent.scrollWidth - parentRect.width;

    const hasParentScrolled = parent.scrollLeft > 0;
    const scrollPositionCurrent = hasParentScrolled ? parent.scrollLeft : scrollLeft;

    const tabRect = el.getBoundingClientRect();
    const diffLeftBetweenTabAndParent = tabRect.left - parentRect.left;
    const tabScrollPosition = parent.scrollLeft + diffLeftBetweenTabAndParent;

    const scrollPositionNew =
      tabScrollPosition > maxScrollDistance
        ? maxScrollDistance
        : parent.scrollLeft + diffLeftBetweenTabAndParent;

    const needsSmoothScroll = scrollPositionCurrent !== scrollPositionNew;

    if (!hasParentScrolled || (hasParentScrolled && needsSmoothScroll)) {
      // Ensure that smooth scroll animation uses old position as starting point after navigation.
      parent.scrollTo({ left: scrollPositionCurrent });
      // Scroll to new position
      parent.scrollTo({ left: scrollPositionNew, behavior: 'smooth' });
    }
    // Always keep track of new position (even if smooth scrolling is not applied)
    setScrollLeft(scrollPositionNew);
  }
};

const LayoutWrapperAccountSettingsSideNavComponent = props => {
  const [scrollLeft, setScrollLeft] = useGlobalState('scrollLeft');
  useEffect(() => {
    const { currentPage, viewport } = props;
    let scrollTimeout = null;

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasHorizontalTabLayout) {
      scrollTimeout = window.setTimeout(() => {
        scrollToTab(currentPage, scrollLeft, setScrollLeft);
      }, 300);
    }

    return () => {
      // Update scroll position when unmounting
      const el = document.querySelector(`#${currentPage}Tab`);
      setScrollLeft(el.parentElement.scrollLeft);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  });

  const { currentPage } = props;

  const tabs = [
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.GigsTrackingPageTabTitle" />,
      selected: currentPage === 'GigsTrackingPage',
      id: 'GigsTrackingPageTab',
      linkProps: {
        name: 'GigsTrackingPage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.IncomePageTabTitle" />,
      selected: currentPage === 'IncomePage',
      id: 'IncomePageTab',
      linkProps: {
        name: 'IncomePage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.ProjectsTabTitle" />,
      selected: currentPage === 'ProjectsPage',
      id: 'ProjectsPageTab',
      linkProps: {
        name: 'ProjectsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.EarningsTabTitle" />,
      selected: currentPage === 'EarningsPage',
      id: 'EarningsPageTab',
      linkProps: {
        name: 'EarningsPage',
      },
    },
    
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.GigsTabTitle" />,
      selected: currentPage === 'GigsPage',
      id: 'GigsPageTab',
      linkProps: {
        name: 'GigsPage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.PendingProposalsPageTabTitle" />,
      selected: currentPage === 'PendingProposalsPage',
      id: 'PendingProposalsPageTab',
      linkProps: {
        name: 'PendingProposalsPage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.TransactionHistoryPageTabTitle" />,
      selected: currentPage === 'TransactionHistoryPage',
      id: 'TransactionHistoryPageTab',
      linkProps: {
        name: 'TransactionHistoryPage',
      },
    },

    

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.contactDetailsTabTitle" />,
      selected: currentPage === 'ContactDetailsPage',
      id: 'ContactDetailsPageTab',
      linkProps: {
        name: 'ContactDetailsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.passwordTabTitle" />,
      selected: currentPage === 'PasswordChangePage',
      id: 'PasswordChangePageTab',
      linkProps: {
        name: 'PasswordChangePage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentsTabTitle" />,
      selected: currentPage === 'StripePayoutPage',
      id: 'StripePayoutPageTab',
      linkProps: {
        name: 'StripePayoutPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />,
      selected: currentPage === 'PaymentMethodsPage',
      id: 'PaymentMethodsPageTab',
      linkProps: {
        name: 'PaymentMethodsPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.deleteAccountTabTitle" />,
      selected: currentPage === 'DeleteAccountPage',
      id: 'DeleteAccountPageTab',
      linkProps: {
        name: 'DeleteAccountPage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.SalesTabTitle" />,
      selected: currentPage === 'SalesAccountPage',
      id: 'SalesAccountPageTab',
      linkProps: {
        name: 'SalesAccountPage',
      },
    },

    
   

  
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.RefundsTabTitle" />,
      selected: currentPage === 'RefundsPage',
      id: 'RefundsPageTab',
      linkProps: {
        name: 'RefundsPage',
      },
    },
   
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.ProductTabTitle" />,
      selected: currentPage === 'ProductPage',
      id: 'ProductPageTab',
      linkProps: {
        name: 'ProductPage',
      },
    },

    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.WishlistTabTitle" />,
      selected: currentPage === 'WishlistPage',
      id: 'WishlistPageTab',
      linkProps: {
        name: 'WishlistPage',
      },
    },
    {
      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.CanceledTabTitle" />,
      selected: currentPage === 'CanceledPage',
      id: 'CanceledPageTab',
      linkProps: {
        name: 'CanceledPage',
      },
    },

  ];

  return <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />;
};

LayoutWrapperAccountSettingsSideNavComponent.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  currentPage: null,
};

LayoutWrapperAccountSettingsSideNavComponent.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
  currentPage: string,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
};

const LayoutWrapperAccountSettingsSideNav = compose(withViewport)(
  LayoutWrapperAccountSettingsSideNavComponent
);

export default LayoutWrapperAccountSettingsSideNav;
