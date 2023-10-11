import React, { useState } from 'react';
import { bool, node, string } from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';

import LayoutComposer from '../LayoutComposer';
import LayoutWrapperAccountSettingsSideNav from './LayoutWrapperAccountSettingsSideNav';

import css from './LayoutSideNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faContactBook, faEnvelope, faHistory, faKey, faRemove, faTimeline } from '@fortawesome/free-solid-svg-icons';
import NamedLink from '../../NamedLink/NamedLink';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


// Commonly used layout
const LayoutSideNavigationCom = props => {
  const {
    currentUser,
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
    name: 'InboxBasePage',
    match: { url: '/' },
  };
  
  const[show,setShow] = useState(false);
  

  const showMenu = ()=>{
    setShow((show) => true);
  }

  const hideMenu = ()=>{
    setShow((show) => !show);
  }

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

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faKey}/>
                          <NamedLink {...EarningsPage} className={css.accountSetting} >My Earnings</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faContactBook}/>
                          <NamedLink {...ProjectsPage} className={css.accountSetting} >My Project</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faHistory}/>
                          <NamedLink {...PendingProposalsPage} className={css.accountSetting} >Pending Proposal</NamedLink>
                        </button>

                        <button onClick={hideMenu}  className={classNames(css.dropDown,css.accountSetting)}>
                          <FontAwesomeIcon icon={faEnvelope}/>
                          <NamedLink {...InboxBasePage} className={css.accountSetting} >Messages</NamedLink>
                        </button>
                        
                        
                    </div>
                  
                
              

              </aside>
              <div className={classNames(css.main, mainColumnClassName)}>
                
                <main className={css.magL2} >{children}</main>
              </div>
              
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

  return {
    
    currentUser,
    
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
