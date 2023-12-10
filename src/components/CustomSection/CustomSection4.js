import React from 'react';
import css from './CustomSection4.module.css';
import Calendar from 'react-calendar'; 
import classNames from 'classnames';

const CustomSectionComponent4 = props =>{

    const {sectionName, description,blocks} = props;
    const content = blocks[0].text.content;
    const title = blocks[0].title;

    
  const hireTopTalent = (event)=>{
    event.preventDefault();
    history.push("/s?pub_role=Freelancers");
  }

    return (

        <>
        
            <div className={css.container +' '+ css.textCenter +' '+ css.sectionBgWhite+' '+ css.desktop}>
                <div className={css.containerMain}>
                    <div className={css.aboutContent}>
                        <p>
                            <span className={classNames(css.description,css.marginB50)}>{sectionName}</span>
                        </p>
                    
                        <p>
                            {description.content}<br/>
                            <button className={css.roundBtn} onClick={hireTopTalent}>
                                Hire top talents
                            </button>
                        </p>
                    </div>

                    <div className={css.calendarCon}>
                        <Calendar/>
                    </div>
                </div>
            </div>

            <div className={css.mobile}>
                     <div className={css.aboutContent}>
                        <p>
                            <span className={classNames(css.description,css.marginB50)}>{sectionName}</span>
                        </p>
                    
                        <p>
                            {description.content}<br/>
                            <button className={css.roundBtn} onClick={hireTopTalent}>
                                Hire top talents
                            </button>
                        </p>
                    </div>

                    <div className={css.calendarCon}>
                        <Calendar/>
                    </div>


            </div>
        
        </>
      
    );
};


export default CustomSectionComponent4;
