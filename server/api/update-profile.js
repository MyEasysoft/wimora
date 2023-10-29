

const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console

 // Create new SDK instance
 const integrationSdk = sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET
  });

  let refId = req.body.resource.purchase_units[0].reference_id;//Contains OwnerId and ListingId
  let dataArray = refId.split(" ");
  const ownerId = dataArray[0];
  const listingId = dataArray[1];

  const listingDetails = {
    listingId:listingId,   //Id of the listing that is being paid for
    amountPaid:req.body.resource.purchase_units[0].amount,      //Amount paid, this can be full payment or part payment
    datetimeOfPayment:req.body.resource.create_time             //The time the money was paid
  };


  //Get the exiting info for this user before updating
  integrationSdk.users.show({id: ownerId}).then(res => {
    const currentListing = res.data.attributes.profile.privateData.listingPaidFor;
    updateProfileData(currentListing);
  });
  

  const updateProfileData = (currentListings)=>{
    const updatedListing = {currentListings,...listingDetails};
    integrationSdk.users.updateProfile({
      id: ownerId,

      privateData: {
        discoveredServiceVia: null,
        paypalMerchantId:req.body.resource.payer.payer_id,
        listingPaidFor:updatedListing

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
