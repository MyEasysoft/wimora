

const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console

 // Create new SDK instance
 const integrationSdk = sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET
  });

  const listingDetails = {
    listingId:req.body.resource.purchase_units[0].listing_id,
    amountPaid:req.body.resource.purchase_units[0].amount,
    datetimeOfPayment:req.body.resource.create_time
  };
  
    integrationSdk.users.updateProfile({
        id: req.body.resource.purchase_units[0].reference_id,
        
       
        privateData: {
          discoveredServiceVia: null,
          paypalMerchantId:req.body.resource.payer.payer_id,
          listingPaidFor:listingDetails

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


}














  


// Create new SDK instance
// To obtain a client ID, see Applications in Flex Console
