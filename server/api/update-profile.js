

const { cancel } = require('raf');
const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');
const { error } = require('../log');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console

 // Create new SDK instance

 const integrationSdk = sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET
  });

  const sdkUtil = sharetribeIntegrationSdk.util;
  let listExist = false;

  
  const separateObject = obj => {
    if(listExist)return[];
   

    if(obj === undefined || obj === null)return[];
    const res = [];
    const keys = Object?.keys(obj);
    keys.forEach(key => {
      
      try{
        
          if(parseInt(obj[0]) !== undefined && obj[key].listingId === listingId){
            listExist = true;
            console.log(obj[key].listingId+"  ooooooooooooooooooooooooooooooooooooooooo    "+ listingId);
          }
          res.push(
            obj[key]
          );

      }catch(error){}
     
    });
    return res;
 };


  let refId = req.body.resource.purchase_units[0].reference_id;//Contains buyerId, author and listingId
  let dataArray = refId.split(" ");
  const buyerId = dataArray[0];
  const authorId = dataArray[1]
  const listingId = dataArray[2];

  const parameters ={
    id: authorId,
    include: ['profileImage'],
    'fields.image': [
      'variants.square-small',
      'variants.square-small2x',
      'variants.square-xsmall',
      'variants.square-xsmall2x',
    ],
    'imageVariant.square-xsmall': sdkUtil.objectQueryString({
      w: 40,
      h: 40,
      fit: 'crop',
    }),
    'imageVariant.square-xsmall2x': sdkUtil.objectQueryString({
      w: 80,
      h: 80,
      fit: 'crop',
    }),
  };

  //Get Author profile info including profile image Id
  integrationSdk.users.show(
      
      parameters
    
  ).then(res => {
    if(listExist)return;
    const {firstName, lastName} = res?.data.data.attributes.profile;
    const profileImage = res?.data.included[0].attributes.variants["square-small"].url;

    
    //Get the exiting info for this Buyer before updating
    integrationSdk.users.show({id: buyerId}).then(res => {
      const currentListing = res?.data.data.attributes.profile.privateData.listingPaidFor;
      updateBuyerProfileData(currentListing,firstName,lastName,profileImage);
    });
   
  })

  
  const updateBuyerProfileData = (currentListings,firstName,lastName,profileImage)=>{
    const listingDetails = {
      listingId:listingId,   //Id of the listing that is being paid for
      amountReceived:req.body.resource.purchase_units[0].amount,      //Amount paid, this can be full payment or part payment
      datetimeOfPayment:req.body.resource.create_time,
      buyerName:firstName+" "+lastName,
      buyerId:buyerId,
      buyerPhoto: profileImage            
    };

    const newCon = separateObject(currentListings);
    if(listExist)return null;
    newCon.push(listingDetails);
  
    const updatedListing = Object.assign({},newCon);
    
    integrationSdk.users.updateProfile({
      id: authorId,

      privateData: {
       
        listingPaidFor:updatedListing,
      
      },
      metadata: {
        identityVerified: true
      }
     
    }, {
      expand: true,
      include: ["profileImage"]
    }).then(res => {
     
      
    })
    .catch(res=>{
      console.log(`Request failed with status: ${res.status} ${res.statusText}`);
    });
  };



 //For Influencer
  //Get Buyer profile info including profile image Id
  const parameter2 ={
    id: buyerId,
    include: ['profileImage'],
    'fields.image': [
      'variants.square-small',
      'variants.square-small2x',
      'variants.square-xsmall',
      'variants.square-xsmall2x',
    ],
    'imageVariant.square-xsmall': sdkUtil.objectQueryString({
      w: 40,
      h: 40,
      fit: 'crop',
    }),
    'imageVariant.square-xsmall2x': sdkUtil.objectQueryString({
      w: 80,
      h: 80,
      fit: 'crop',
    }),
  };
  integrationSdk.users.show(parameter2)
  .then(res => {
  if(listExist)return;
  const {firstName, lastName} = res?.data.data.attributes.profile;
  const profileImage =  res?.data.included[0].attributes.variants["square-small"].url;

 
 
  //Update Influencer details
  integrationSdk.users.show({id: buyerId}).then(res => {
    const currentListing = res?.data.data.attributes.profile.privateData.listingPaidFor;
    updateInfluencerProfileData(currentListing,firstName,lastName,profileImage);
  });

})


  const updateInfluencerProfileData = (currentListings,firstName,lastName,profileImage)=>{
    const listingDetails = {
      listingId:listingId,   //Id of the listing that is being paid for
      amountPaid:req.body.resource.purchase_units[0].amount,      //Amount paid, this can be full payment or part payment
      datetimeOfPayment:req.body.resource.create_time,
      authorName:firstName+" "+lastName,
      authorId:authorId,
      authorPhoto: profileImage                 
    };

    const newCon = separateObject(currentListings);
    if(listExist)return;
    newCon.push(listingDetails);
  
    const updatedListing = Object.assign({},newCon);
    //console.log(`step3333:    ${JSON.stringify(updatedListing)}`);
    integrationSdk.users.updateProfile({
      id: buyerId,

      privateData: {
        discoveredServiceVia: null,
        paypalMerchantId:req.body.resource.payer.payer_id,
        listingPaidFor:updatedListing,
        

      },
      metadata: {
        identityVerified: true
      }
     
    }, {
      expand: true,
      include: ["profileImage"]
    }).then(res => {
      console.log(`Success: ${res.status} ${res.statusText}`);
      
    })
    .catch(res=>{
      console.log(`Request failed with status: ${res.status} ${res.statusText}`);
    });
  };
  
    


}














  


// Create new SDK instance
// To obtain a client ID, see Applications in Flex Console
