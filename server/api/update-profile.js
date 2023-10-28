const { getSdk } = require("../api-util/sdk");
const sharetribeSdk = require('sharetribe-flex-sdk');


module.exports = (req, res) => {
   // Create new SDK instance
// To obtain a client ID, see Applications in Flex Console
const sdk = sharetribeSdk.createInstance({
    clientId: process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID
  });
  
  // Query first 5 listings
  sdk.listings
    .query({ perPage: 5 })
    .then(res => {
      // Print listing titles
      res.data.data.forEach(listing => {
        console.log(`Listing: ${listing.attributes.title}`);
        //res.send(`Listing: ${listing.attributes}`);
      });
    })
    .catch(res => {
      // An error occurred
      console.log(`Request failed with status: ${res.status} ${res.statusText}`);
    });

    const UUID = {uuid: req.body.resource.purchase_units[0].reference_id };
    const dataToUpdate = {
                               
                               
                               
                                privateData: {
                                
                                    paypalMerchantId:req.body.resource.payer.payer_id

                                }
                            };


      sdk.currentUser.updateProfile(dataToUpdate, {
        expand: true
        
      }).then(res => {
        console.log(`Working: ${ req.body.resource.payer.payer_id}`);
      });
      res.status(200).send(dataToUpdate);
    
    
    
     
      
  };

  


// Create new SDK instance
// To obtain a client ID, see Applications in Flex Console
