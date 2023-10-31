import React, { useEffect, useState } from 'react';
import w1 from '../../assets/cover1.png';
import cancel from '../../assets/new/cancel.png';
import mark from '../../assets/new/mark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faHeart, faSignIn, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import css from './ListingPaymentListItems.module.css';


function ListingItemComponent(props){

    const[projectAuthors, setProjectAuthors] = useState([]);


    const {
        listingPaidFor,
        getAuthorListing,
        getListing,
        getUserById
        } = props;
    const hasListingPiadFor = listingPaidFor !== undefined && listingPaidFor !== null;
    if(!hasListingPiadFor)return "";

    useEffect(()=>{
        if (getListing === undefined)return;
        Object.keys(listingPaidFor).map((val, key) => {
           
            const currentAuthor =  getUserById(listingPaidFor[0].authorId);
            setProjectAuthors({projectAuthors,currentAuthor});
        })
    },[]);

  return (
   
           
            <table className={css.tbContainer}>
                <tr>
                    <th class={css.product}>Product</th>
                    <th>Product Name</th>
                    <th>Delivery Date</th>
                    <th>Status</th>
                    
                    <th>Due Date</th>
                    <th>Submission Date</th>
                    <th>Influencer</th>
                    <th>Amount Paid</th>
                    <th>Received</th>
                </tr>
                {Object.keys(listingPaidFor).map((val, key) => {
                    return (
                        <tr key={key}>
                            
                            <td><img className={css.product} src={w1}/></td>
                            <td>I will make the best video for your products</td>
                            <td>01-01-2023</td>
                            <td>Pending</td>
                           
                            <td>01-02-2023</td>
                            <td>01-03-2023</td>
                            <td><img className={css.roundImg} src={w1}/>{projectAuthors[{key}]}</td>
                            <td>{"500"}</td>
                            <td><img className={css.status} src={false?mark:cancel}/></td>
                            
                        </tr>
                    )
                })}
            </table>
       
		

	

    
  );
};


export default ListingItemComponent;
