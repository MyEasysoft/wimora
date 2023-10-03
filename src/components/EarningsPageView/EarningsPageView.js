import React, { useEffect, useState } from 'react';
import css from './CustomSection.module.css';
import classNames from 'classnames';
import s1 from '../../assets/new/Influencer1.PNG';
import s2 from '../../assets/new/Influencer2.PNG';
import s3 from '../../assets/new/Influencer3.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faHeart, faSignIn, faEnvelope, faBook, faGear} from '@fortawesome/free-solid-svg-icons';
import {
    Avatar,
    InlineTextButton,
    LinkedLogo,
    Menu,
    MenuLabel,
    MenuContent,
    MenuItem,
    NamedLink,
  } from '..';
  
  import {AreaChart} from '../ChartViews/area charts/AreaChart';
  import BarChart from '../ChartViews/area charts/BarChart';
  import BarChart2 from '../ChartViews/area charts/BarChart2';
import LineChart from '../ChartViews/area charts/LineChart';

function EarningsPageViewComponent(props){

    const {
      totalTransactionLabel,
      totalTransactionValue,
      showTotalTransaction,
      totalCompletedLabel,
      totaLCompletedValue,
      showTotalCompleted,
      totalDeclinedLabel,
      totalDeclinedValue,
      showTotalDeclined,
      totalProfitLabel,
      totalProfitValue,
      showTotalProfit
    } = props;


    const[plan,setPlan] = useState("Basic");


    const  handleBasicClicked = (event)=>{
        event.preventDefault();
       setPlan("Basic");

    }

   const handleProClicked = (event)=>{
    event.preventDefault();
        setPlan("Pro");
    }

  return (
   
    <div className={css.container +' '+ css.textCenter+' '+ css.sectionBgWhite}>

          <div className={css.cardRow}>
              <div className={css.card1}>
                  <div className={css.row3}>
                    <h5 className={css.cardHeader}>{totalTransactionLabel}</h5>
                    
                  </div>
                  <div className={css.row3}>
                    <b className={css.amount}>{totalTransactionValue}</b>
                  </div>
              </div>

              <div className={css.card1}>
                  <div className={css.row3}>
                    <h5 className={css.cardHeader}>{totalCompletedLabel}</h5>
                   
                  </div>
                  <div className={css.row3}>
                    
                    <b className={css.amount}>{totaLCompletedValue}</b>
                  </div>
              </div>

              <div className={css.card1}>
                  <div className={css.row3}>
                    <h5 className={css.cardHeader}>{totalDeclinedLabel}</h5>
                   
                  </div>
                  <div className={css.row3}>
                    
                    <b className={css.amount}>{totalDeclinedValue}</b>
                  </div>
              </div>

              <div className={css.card1}>
                  <div className={css.row3}>
                    <h5 className={css.cardHeader}>{totalProfitLabel}</h5>
                   
                  </div>
                  <div className={css.row3}>
                    
                    <b className={css.amount}>{totalProfitValue}</b>
                  </div>
              </div>


          </div>


        <div className={css.cardRow}>
            

            <div className={css.cardNormal}>

              <div className={css.card5}>
                  <div className={css.row3}>
                    <h5 className={css.cardHeader}>TOTAL LOST</h5>
                   
                  </div>
                  <div className={css.row3}>
                    
                    <b className={css.amount}>$55</b>
                  </div>
              </div>
              

                <div className={classNames(css.col4,css.pad1,css.plans)}>
                   <BarChart2 className={css.pie} />
                </div>
            </div>

            

            <div className={css.card2}>
                <div className={classNames(css.col4,css.pad1,css.plans)}>
                   <AreaChart className={css.pie} />
                </div>
            </div>

           

           

        </div>
	</div>

   
  );
};

export default EarningsPageViewComponent;
