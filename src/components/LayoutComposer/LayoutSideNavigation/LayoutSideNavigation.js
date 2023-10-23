import React, { useState } from 'react';
import { bool, node, string } from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LayoutComposer from '../LayoutComposer';
import LayoutWrapperAccountSettingsSideNav from './LayoutWrapperAccountSettingsSideNav';

import css from './LayoutSideNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faContactBook, faDollarSign, faEnvelope, faHistory, faKey, faRemove, faTimeline } from '@fortawesome/free-solid-svg-icons';
import NamedLink from '../../NamedLink/NamedLink';
import { injectIntl } from 'react-intl';
import { useLocation, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Profile from '../../Profile/Profile';
import { getMarketplaceEntities } from '../../../ducks/marketplaceData.duck';


// Commonly used layout
const LayoutSideNavigationCom = props => {
  const {
    currentUser,
    user,
    className,
    rootClassName,
    containerClassName,
    mainColumnClassName,
    sideNavClassName,
    children,
    topbar: topbarContent,
    footer: footerContent,
    sideNav: sideNavContent,
    useAccountSettingsNav,
    currentPage,
    ...rest
  } = props;

  let roleData = {};
  let role = "";
  if(currentUser !== null){
    roleData = JSON.stringify(currentUser.attributes.profile.protectedData);
    role = JSON.parse(roleData)["role"];
    //console.log(role+"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
 }


  const classes = classNames(rootClassName || css.root, className);
  const containerClasses = containerClassName || css.container;

  // TODO: since responsiveAreas are still experimental,
  //       we don't separate "aside" through layoutComposer
  const layoutAreas = `
    topbar
    main
    footer
  `;

  const ProjectsPage = {
    name: 'ProjectsPage',
    match: { url: '/' },
  };

  const EarningsPage = {
    name: 'EarningsPage',
    match: { url: '/' },
  };

  const PendingProposalsPage = {
    name: 'PendingProposalsPage',
    match: { url: '/' },
  };

  const InboxBasePage = {
    
    match: { url: '/' },
    name: 'InboxPage',
    params: { tab: 'sales' },
  };

  const InboxAsCustomer = {
    
    match: { url: '/' },
    name: 'InboxPage',
    params: { tab: 'orders' },
  };

  const PaypalAppPage = {
    name: 'PaypalAppPage',
    match: { url: '/' },
  };
  
  
  
  const[show,setShow] = useState(false);
  

  const showMenu = ()=>{
    setShow((show) => true);
  }

  const hideMenu = ()=>{
    setShow((show) => !show);
  }

  const location = useLocation();
  const path = location.pathname;

  const isListingProfile = (path.indexOf('u')===1);


  if(user !== null && user !== undefined){
    user.attributes.profile.protectedData = user.attributes.profile.publicData;
  }

  const showStore = role === 'Seller';

  const userProfileToShow = user && isListingProfile?user:currentUser;

  const profile = userProfileToShow?.profileImage?<Profile user={userProfileToShow} showStore={showStore} />:"";

  const influencerActions = <>
   <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faKey}/>
                          <NamedLink {...EarningsPage} className={css.accountSetting} >My Earnings</NamedLink>
                        </button>

                       
                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faContactBook}/>
                          <NamedLink {...ProjectsPage} className={css.accountSetting} >Gig Orders</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faHistory}/>
                          <NamedLink {...PendingProposalsPage} className={css.accountSetting} >Pending Proposal</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faEnvelope}/>
                          <NamedLink {...InboxBasePage} className={css.accountSetting} >Sent Messages</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faEnvelope}/>
                          <NamedLink {...InboxAsCustomer} className={css.accountSetting} >Sellers Messages</NamedLink>
                        </button>

                       
  </>;

  const sellerActions = <>
        

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faContactBook}/>
                          <NamedLink {...ProjectsPage} className={css.accountSetting} >My Jobs</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faEnvelope}/>
                          <NamedLink {...InboxBasePage} className={css.accountSetting} >Sent Messages</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faEnvelope}/>
                          <NamedLink {...InboxAsCustomer} className={css.accountSetting} >Influencers Messages</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faDollarSign}/>
                          <NamedLink {...PaypalAppPage} className={css.accountSetting} >Payments</NamedLink>
                        </button>
  </>
  
  const userAction = role === "Seller"?sellerActions:influencerActions;

  return (
    <LayoutComposer areas={layoutAreas} className={classes} {...rest}>
      {layoutProps => {
        const { Topbar, Main, Footer } = layoutProps;
        return (
          <>
            <Topbar as="header" className={css.topbar}>
              {topbarContent}
            </Topbar>
            <Main as="div" className={containerClasses}>
              <aside className={classNames(css.sideNav, sideNavClassName)}>
                    <div className={css.navMenu} onClick={hideMenu} >
                    <h3 className={classNames(css.role,css.dropDownmain)}>{role}</h3>

                       {userAction}
                        
                    </div>
              

              </aside>
              <div className={classNames(css.main, mainColumnClassName)}>
                
                <main className={css.magL2} >{children}</main>
              </div>
              
              {profile}
              
            </Main>
            <Footer>{footerContent}</Footer>
          </>
        );
      }}
    </LayoutComposer>
  );
};

LayoutSideNavigationCom.displayName = 'LayoutSideNavigation';

LayoutSideNavigationCom.defaultProps = {
  className: null,
  rootClassName: null,
  sideNav: null,
  footer: null,
  useAccountSettingsNav: false,
  currentPage: null,
};

LayoutSideNavigationCom.propTypes = {
  className: string,
  rootClassName: string,
  children: node.isRequired,
  topbar: node.isRequired,
  sideNav: node,
  footer: node,
  useAccountSettingsNav: bool,
  currentPage: string,
};


const mapStateToProps = state => {
  
  const { currentUser } = state.user;
  const {
    userId,
    userListingRefs,
    reviews,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    currentUser,
    user,
    listings,
    reviews,
    
  };
};



// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LayoutSideNavigation = compose(
  withRouter,
  connect(
    mapStateToProps
  ),
  injectIntl
)(LayoutSideNavigationCom);

export default LayoutSideNavigation;
