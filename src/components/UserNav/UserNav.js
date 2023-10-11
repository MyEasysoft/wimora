import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routing/routeConfiguration';
import { LinkTabNavHorizontal } from '../../components';

import css from './UserNav.module.css';
import ReactDropdown from 'react-dropdown';

const UserNav = props => {
  const { className, rootClassName, currentPage } = props;
  const classes = classNames(rootClassName || css.root, className);

const onSelect = (e)=>{
  e.preventDefault();
  
}

  const tabs = [

    {
      text: <FormattedMessage id="UserNav.dashboard" />,
      selected: currentPage === 'EarningsPage',
      disabled: false,
      linkProps: {
        name: 'EarningsPage',
      },
    },
   
    {
      text: <FormattedMessage id="UserNav.yourListings" />,
      selected: currentPage === 'ManageListingsPage',
      linkProps: {
        name: 'ManageListingsPage',
      },
    },
    {
      text: <FormattedMessage id="UserNav.profileSettings" />,
      selected: currentPage === 'ProfileSettingsPage',
      disabled: false,
      linkProps: {
        name: 'ProfileSettingsPage',
      },
    },
   
  ];

  return (
    <>
    
       <LinkTabNavHorizontal className={classes} tabRootClassName={css.tab} tabs={tabs} skin="dark" />
   
    </>
   
  );
};

UserNav.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string } = PropTypes;

UserNav.propTypes = {
  className: string,
  rootClassName: string,
  currentPage: string.isRequired,
};

export default UserNav;
