import React from 'react';
import css from './CustomSection3.module.css';

import s1 from '../../assets/new/Influencer1.PNG';
import s2 from '../../assets/new/Influencer2.PNG';
import s3 from '../../assets/icons/icon5.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';

const CustomSectionComponent3 = props =>{

    //
    const {sectionName,description,blocks,title} = props;
    const content0 = blocks[0];
    const content0Img = content0.media.image.attributes.variants.square400.url;
    const blockTitle = blocks[0].title;
    const content1 = blocks[1];
    const content1Img = content1.media.image.attributes.variants.square400.url;
    const content2 = blocks[2];
    const content2Img = content2.media.image.attributes.variants.square400.url;
    const content3 = blocks[3];
    const content3Img = content3.media.image.attributes.variants.square400.url;
    const content4 = blocks[4];
    const content4Img = content4.media.image.attributes.variants.square400.url;
    const contentArray = content4.title.content.split("&");
    const dev1Name = contentArray[0];
    const dev1Profession = contentArray[1];


    const content5 = blocks[5];
    const content5Img = content5.media.image.attributes.variants.square400.url;
    const contentArray5 = content5.title.content.split("&");
    const dev1Name5 = contentArray5[0];
    const dev1Profession5 = contentArray5[1];



    const content6 = blocks[6];
    const content6Img = content6.media.image.attributes.variants.square400.url;
    const contentArray6 = content6.title.content.split("&");
    const dev1Name6 = contentArray6[0];
    const dev1Profession6 = contentArray6[1];
    

  return (
    <>
    <div className={css.container +' '+ css.textCenter+' '+ css.sectionBgWhite}>
        <div className={css.containerMain}>

            <div className={css.contentCol1}>
                    <p className={css.sectionTitle}>
                        {title.content}<br/>
                        <span className={css.desP}>{description.content}</span><br/>
                    </p> 

                    <div className={classNames(css.marginB200,css.row) }>
                        <div>
                            <img src={content0Img}/><br/>
                            <span className={css.subTitles}>{content0.title.content}</span><br/>
                            <p className={css.desP}>{content0.text.content}</p>  
                        </div>
                        <div>
                            <img src={content1Img}/><br/>
                            <span className={css.subTitles}>{content1.title.content}</span><br/>
                            <p className={css.desP}>{content1.text.content}</p>  
                        </div>
                    </div>
                    <div className={css.row}>
                        <div>
                            <img src={content2Img}/><br/>
                            <span className={css.subTitles}>{content2.title.content}</span><br/>
                            <p className={css.desP}>{content2.text.content}</p>  
                        </div>
                        <div>
                            <img src={content3Img}/><br/>
                            <span className={css.subTitles}>{content3.title.content}</span><br/>
                            <p className={css.desP}>{content3.text.content}</p>  
                        </div>
                    </div>
                                  
            </div>

            <div className={css.developers}>

            <div className={css.devCard2} >
                    <img className={css.roundEdge} src={content4Img}/>

                    <div className={css.padding20}>
                        <span className={classNames(css.subTitlesName) }>{dev1Name}</span><br/>
                        
                        <div className={classNames(css.subTitlesProfession) }>
                            <img className={css.icon} src={s3}/>
                            <span >{dev1Profession}</span><br/>
                        </div>

                        <p className={css.desP}>
                            Year of experience<br/>
                           <span className={css.yearOfExperience}>{content4.text.content}</span> 
                        </p>  
                    </div>
                    

                </div>
                <div className={css.devCard} >
                    <img className={css.roundEdge} src={content5Img}/>

                    <div className={css.padding20}>
                        <span className={classNames(css.subTitlesName) }>{dev1Name5}</span><br/>
                        
                        <div className={classNames(css.subTitlesProfession) }>
                            <img className={css.icon} src={s3}/>
                            <span >{dev1Profession5}</span><br/>
                        </div>

                        <p className={css.desP}>
                            Year of experience<br/>
                           <span className={css.yearOfExperience}>{content5.text.content}</span> 
                        </p>  
                    </div>
                    

                </div>

                

                <div className={css.devCard3} >
                    <img className={css.roundEdge} src={content6Img}/>

                    <div className={css.padding20}>
                        <span className={classNames(css.subTitlesName) }>{dev1Name6}</span><br/>
                        
                        <div className={classNames(css.subTitlesProfession) }>
                            <img className={css.icon} src={s3}/>
                            <span >{dev1Profession6}</span><br/>
                        </div>
                        <p className={css.desP}>
                            Year of experience<br/>
                           <span className={css.yearOfExperience}>{content6.text.content}</span> 
                        </p>  
                    </div>
                </div>
               
            </div>

            
        </div>
	</div>

    </>
  );
};

export default CustomSectionComponent3;
