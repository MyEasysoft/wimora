import React from 'react';
import css from './CustomSection5.module.css';

const CustomSectionComponent5 = props =>{

    const {sectionName, description,blocks} = props;
    const content = blocks[0].text.content;
    const title = blocks[0].title;

    const content1 = blocks[1].text.content;
    const title1 = blocks[1].title;

    const content2 = blocks[2].text.content;
    const title2 = blocks[2].title;

  return (
   
    <div className={css.container +' '+ css.textCenter +' '+ css.sectionBgWhite}>



       
        <div className={css.containerMain}>
            
           
            <div className={css.aboutContent}>
                <div className={css.circle}>
                    1
                </div>
                <p>
                    <span className={css.description}>{title.content}</span><br/>
                    {content}
                </p>
                    
            </div>

            <div className={css.aboutContent}>
                <div className={css.circle}>
                    2
                </div>
                <p>
                    <span className={css.description}>{title1.content}</span><br/>
                    {content1}
                </p>
                    
            </div>

            <div className={css.aboutContent}>
                <div className={css.circle}>
                    3
                </div>
                <p>
                    <span className={css.description}>{title2.content}</span><br/>
                    {content2}
                </p>
                    
            </div>
                
                   
           
        </div>
        
		
	</div>

   
  );
};


export default CustomSectionComponent5;
