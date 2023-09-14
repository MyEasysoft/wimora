import React from 'react';
import css from './LandingPageMain.module.css';
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
import CustomSectionComponent1 from '../CustomSection/CustomSection1';
import CustomSectionComponent2 from '../CustomSection/CustomSection2';
import CustomSectionComponent3 from '../CustomSection/CustomSection3';
import CustomSectionComponent4 from '../CustomSection/CustomSection4';


function LandingPageMainComponent(){

  return (
    <>
		<CustomSectionComponent3 />
		<CustomSectionComponent1 />
		<CustomSectionComponent2 />
		<CustomSectionComponent4 />
    </>
  );
};


export default LandingPageMainComponent;
