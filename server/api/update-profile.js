

const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console

 // Create new SDK instance

 const integrationSdk = sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET
  });

  const sdkUtil = sharetribeIntegrationSdk.util;

  
  const separateObject = obj => {

    if(obj === undefined || obj === null)return[];
    const res = [];
    const keys = Object?.keys(obj);
    keys.forEach(key => {
       res.push(
         obj[key]
       );
    });
    return res;
 };


  let refId = req.body.resource.purchase_units[0].reference_id;//Contains buyerId, author and listingId
  let dataArray = refId.split(" ");
  const buyerId = dataArray[0];
  const authorId = dataArray[1]
  const listingId = dataArray[2];

  //Get Author profile info including profile image Id
  integrationSdk.users.show({
      id: authorId,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
       // SDK provides a util function to construct image variant URL param strings
  "imageVariant.my-variant": sdkUtil.objectQueryString({
    w: 320,
    h: 640,
    fit: 'scale'
  })
    
  }).then(res => {
    const {firstName, lastName} = res?.data.data.attributes.profile;
    const profileImage = res?.data.data.relationships.profileImage.data .id.uuid;

    console.log("-----------------------------------------------------------------");
    console.log(`00000000000000000000   :    ${JSON.stringify(res?.data.data)}`);
    console.log("-----------------------------------------------------------------");
   
    
    //Get the exiting info for this Buyer before updating
    integrationSdk.users.show({id: buyerId}).then(res => {
      const currentListing = res?.data.data.attributes.profile.privateData.listingPaidFor;
      updateBuyerProfileData(currentListing,firstName,lastName);
    });
   
  })

  
  const updateBuyerProfileData = (currentListings,firstName,lastName)=>{
    const listingDetails = {
      listingId:listingId,   //Id of the listing that is being paid for
      amountReceived:req.body.resource.purchase_units[0].amount,      //Amount paid, this can be full payment or part payment
      datetimeOfPayment:req.body.resource.create_time,
      buyerName:firstName+" "+lastName,
      buyerId:buyerId             
    };

    const newCon = separateObject(currentListings);
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
  integrationSdk.users.show({
    id: buyerId,
    include: ['profileImage'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
     // SDK provides a util function to construct image variant URL param strings
"imageVariant.my-variant": sdkUtil.objectQueryString({
  w: 320,
  h: 640,
  fit: 'scale'
})
  
}).then(res => {
  const {firstName, lastName} = res?.data.data.attributes.profile;
  const profileImage = res?.data.data.relationships.profileImage.data .id.uuid;

 
 
  //Update Influencer details
  integrationSdk.users.show({id: buyerId}).then(res => {
    const currentListing = res?.data.data.attributes.profile.privateData.listingPaidFor;
    updateInfluencerProfileData(currentListing,firstName,lastName);
  });

})


  const updateInfluencerProfileData = (currentListings,firstName,lastName)=>{
    const listingDetails = {
      listingId:listingId,   //Id of the listing that is being paid for
      amountPaid:req.body.resource.purchase_units[0].amount,      //Amount paid, this can be full payment or part payment
      datetimeOfPayment:req.body.resource.create_time,
      authorName:firstName+" "+lastName,
      authorId:authorId             
    };

    const newCon = separateObject(currentListings);
    newCon.push(listingDetails);
  
    const updatedListing = Object.assign({},newCon);
    console.log(`step3333:    ${JSON.stringify(updatedListing)}`);
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
