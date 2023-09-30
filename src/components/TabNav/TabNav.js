import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { propTypes } from '../../util/types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';

const Tab = props => {
  const { className, id, disabled, text, selected, linkProps } = props;
  const linkClasses = classNames(css.link, {
    [css.selectedLink]: selected,
    [css.disabled]: disabled,
  });

  return (
    <div id={id} className={className}>
      <NamedLink className={linkClasses} {...linkProps}>
      <FontAwesomeIcon className={css.ms2} icon={faEarth}/>
        {text}
      </NamedLink>
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

const { arrayOf, bool, node, object, string } = PropTypes;

Tab.propTypes = {
  id: string.isRequired,
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNavCom = props => {
  const { className, rootClassName, tabRootClassName, tabs,currentUser } = props;
  const classes = classNames(rootClassName || css.root, className);
  const tabClasses = tabRootClassName || css.tab;
  let roleData = {};
  let role = {};
  if(currentUser !== null){
     roleData = JSON.stringify(currentUser.attributes.profile.protectedData);
     role = JSON.parse(roleData)["role"];
  }
  
  return (
    <nav className={classes}>
      <h3 className={css.header}>{role}</h3>
      {tabs.map((tab, index) => {
        const id = typeof tab.id === 'string' ? tab.id : `${index}`;
        return <Tab key={id} id={id} className={tabClasses} {...tab} />;
      })}
    </nav>
  );
};

TabNavCom.defaultProps = {
  currentUser: null,
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
};

TabNavCom.propTypes = {
  currentUser: propTypes.currentUser,
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
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
const TabNav = compose(
  withRouter,
  connect(
    mapStateToProps
    
  ),
  injectIntl
)(TabNavCom);


export default TabNav;
