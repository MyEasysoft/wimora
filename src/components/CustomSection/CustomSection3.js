import React from 'react';
import css from './CustomSection.module.css';

import s1 from '../../assets/new/Influencer1.PNG';
import s2 from '../../assets/new/Influencer2.PNG';
import s3 from '../../assets/new/Influencer3.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'

function CustomSectionComponent3(){

  return (
    <>
    <div className={css.container +' '+ css.textCenter+' '+ css.sectionBgWhite}>
        <div className={css.containerMain}>
            <div className={css.col12 +" "+ css.magB4}>
                <h4 className={css.magB4 +" "+css.sectionTitle}>About Influencer Connect</h4>
                <p className={css.magB4}>Welcome to Influence Connect, the premier destination where collaboration and creativity 
converge to redefine the world of influencer marketing. We are the ultimate platform where 
sellers come to obtain captivating shoppable videos for their products, and creators arrive 
to craft shoppable content and reap the rewards.</p>
                
            </div>
            <div className={css.col12 +" "+ css.magB4}>
                <h4 className={css.magB4 +" "+css.sectionTitle}>SLOGAN</h4>
                <p className={css.magB4}>"You’re all-in-one destination, where influencers and sellers unite to craft captivating shoppable videos."</p>
                <a className={css.linkBtn +" "+ css.magB4} href=''>Learn more about us</a>
            </div>
            <div className={css.col12 +" "+ css.magB2 +" "+ css.magT8}>
                <h4 className={css.magB2 +" "+css.sectionTitle}>INFLUENCERS</h4>
                
            </div>
            <div className={css.row}>
                <div className={css.col4 +" "+css.pad1 +" "+css.leftAlign}>
                    <img className={css.imgFluid} src={s1}/>
                    <p>
                        <span className={css.textbold+" "+css.stretch+" "+css.padB1}>John Frank
                        </span> <br/>New York, United States <br/><FontAwesomeIcon className={css.icon} icon={faMessage} />Enquire</p>
                </div>
                <div className={css.col4 +" "+css.pad1 +" "+css.leftAlign}>
                    <img className={css.imgFluid} src={s2}/>
                    <p>
                        <span className={css.textbold+" "+css.stretch+" "+css.padB1}>John Frank
                        </span> <br/>New York, United States <br/><FontAwesomeIcon className={css.icon} icon={faMessage} />Enquire</p>
                </div>
                <div className={css.col4 +" "+css.pad1 +" "+css.leftAlign}>
                    <img className={css.imgFluid} src={s3}/>
                    <p>
                        <span className={css.textbold+" "+css.stretch+" "+css.padB1}>John Frank
                        </span> <br/>New York, United States <br/><FontAwesomeIcon className={css.icon} icon={faMessage} />Enquire</p>
                </div>
            </div>
           
            <div className={css.col12 +" "+ css.magT6+" "+ css.magB4}>
                <a className={css.linkBtn } href=''>View well known Creators</a>
            </div>

        </div>
	</div>

    </>
  );
};

export default CustomSectionComponent3;
