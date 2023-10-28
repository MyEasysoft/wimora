

const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console

 // Create new SDK instance
 const integrationSdk = sharetribeIntegrationSdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET
  });

    integrationSdk.users.updateProfile({
        id: "6537260f-69c6-4293-a27f-54ed3755f024",
        
       
        privateData: {
          discoveredServiceVia: null,
          paypalMerchantId:req.body.resource.payer.payer_id

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
