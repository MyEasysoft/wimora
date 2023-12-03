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
import w1 from '../../assets/computerstudent.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'


const CustomSectionComponent2 = props =>{

    const {sectionName, description,blocks} = props;
    const content = blocks[0].text.content;
    const title = blocks[0].title;

  return (
   
    <div className={css.container +' '+ css.textCenter +' '+ css.sectionBgWhite}>
        <div className={css.containerMain}>
            
            <div className={css.col8 +" "+css.pad1 +" "+css.leftAlign}>
                    <img className={css.imgFluid} src={w1}/>
                    <div className={css.noOfFreelancers}>
                        <span className={css.freelancerCount}>143+</span><br/>
                        <span className={css.countDescription}>Freelancers onboard</span>
                    </div>
            </div>
            <div className={css.aboutContent}>
                <p>
                    {sectionName} <br/>
                    <span className={css.description}>{description.content}</span><br/>
                    {content}
                </p>
                    
            </div>
                
                   
           
        </div>
        
		
	</div>

   
  );
};


export default CustomSectionComponent2;
