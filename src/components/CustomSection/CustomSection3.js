import React from 'react';
import css from './CustomSection.module.css';
import bag1 from '../../assets/bag1.jpg';
import bag2 from '../../assets/bag2.jpg';
import bag3 from '../../assets/bag3.jpg';
import bag4 from '../../assets/bag4.jpg';
import bag5 from '../../assets/bag4.jpg';
import bag6 from '../../assets/bag3.jpg';
import profileImg from '../../assets/bg.png';
import s1 from '../../assets/s1.jpg';
import s2 from '../../assets/s2.jpg';
import s3 from '../../assets/s3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'

function CustomSectionComponent3(){

  return (
    <>
    <div className={css.container +' '+ css.textCenter+' '+ css.sectionBgWhite}>
        <div className={css.containerMain}>
            <div className={css.col12 +" "+ css.magB4}>
                <h4 className={css.magB4 +" "+css.sectionTitle}>About Influencer Connect</h4>
                <p className={css.magB4}>Influencer Connect is a modern marketplace where buyers meet Sellers and Creators in a creative way. Influencer Connect is a modern marketplace where buyers meet Sellers and Creators in a creative way.</p>
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
