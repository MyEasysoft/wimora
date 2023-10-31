import React, { useEffect, useState } from 'react';
import css from './CustomSection.module.css';
import classNames from 'classnames';
import s1 from '../../assets/new/Influencer1.PNG';
import s2 from '../../assets/new/Influencer2.PNG';
import s3 from '../../assets/new/Influencer3.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faHeart, faSignIn, faEnvelope, faBook, faGear, faKey} from '@fortawesome/free-solid-svg-icons';
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
import EarningsPage from '../../containers/EarningsPage/EarningsPage';
import ListingItemComponent from '../ListingPaymentListItems/ListingPaymentListItem';

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
      showTotalProfit,
      listingPaidFor,
      paypalMerchantId

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

    const EarningsPage = {
      name: 'EarningsPage',
      match: { url: '/' },
    };

    const paypalHeader = paypalMerchantId !== undefined && paypalMerchantId !== null && paypalMerchantId !== ""?paypalMerchantId:
    "You have not connect your account to Paypal yet";

    const projectListings = (
      <div className={css.details}>
         <p>Paypal Merchant Id: {paypalHeader}</p> 
         <ListingItemComponent 
              listingPaidFor={listingPaidFor}
             
            />
         
      </div>
    );

  return (
   
    <div className={css.container +' '+ css.textCenter+' '+ css.sectionBgWhite}>
          {/* <div className={css.cardRow2}>
            <button className={css.innerMenu}>
              <FontAwesomeIcon icon={faKey}/>
              <NamedLink {...EarningsPage} className={css.link} >Gigs</NamedLink>
            </button>
            <button className={css.innerMenu}>
              <FontAwesomeIcon icon={faKey}/>
              <NamedLink {...EarningsPage} className={css.link} >My Earnings</NamedLink>
            </button>
            <button className={css.innerMenu}>
              <FontAwesomeIcon icon={faKey}/>
              <NamedLink {...EarningsPage} className={css.link} >My Earnings</NamedLink>
            </button>

           
              
          </div> */}
         
         
            {projectListings}
          
         


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
