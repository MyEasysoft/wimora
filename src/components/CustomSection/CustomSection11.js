import React from 'react';
import css from './CustomSection11.module.css';
import s3 from '../../assets/icons/icon5.PNG';
import s1 from '../../assets/icons/icon6.PNG';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CustomSectionComponent11 = props =>{

    const {sectionName,description,blocks,title} = props;

    const list = blocks.map((val)=>{
        return(
                <div className={css.rowTwo}>
                        <div className={css.row4}>
                            <div>
                                <p >
                                    {val.title.content}<br/>
                                    <span>{val.text.content}</span>
                                </p>
                            </div>
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>
                </div>
                
        ) 
    });

  return (
   
    <div className={css.container +' '+ css.textCenter +' '+ css.sectionBgWhite}>

       
        <div className={css.containerMain}>

           <div className={css.col}>
              
                <div className={css.textLeft}>
                            <h2 className={classNames(css.description,css.marginB20)  }>
                                {title.content}<br/>
                            </h2>
                </div>
           </div>
            <div className={classNames(css.col50,css.fontSmall)}>
                
                {list}
                    
            </div>
        </div>
		
	</div>

  );
};

export default CustomSectionComponent11;
