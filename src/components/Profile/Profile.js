import React from 'react';
import css from './Profile.module.css';
import w1 from '../../assets/cover1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import NamedLink from '../NamedLink/NamedLink';
import ExternalLink from '../ExternalLink/ExternalLink';


const Profile = props => {

  const {user} = props;
  //if(user.profileImage === null || user.profileImage.attributes === null)return;
  const profileImageUrl = user.profileImage.attributes.variants["square-small"].url;
  const {firstName, lastName,bio,protectedData} = user.attributes.profile;
  const storeFront = user.attributes.profile.protectedData['store-front'];
  //
  return (
    <>

      <div className={css.container}>
          <div className={css.containerMain}>
              <div>
                      <img className={classNames(css.imgFluid,css.round)} src={profileImageUrl}/>
                      <h3 className={css.magTop30}>{firstName} {lastName}</h3>
                      <ExternalLink className={css.link} href={storeFront}>
                          Visit my store
                      </ExternalLink>
                      <p>{bio} </p>
              </div>
              
          </div>
          
      
      </div>

    </>
  );
};


export default Profile;
