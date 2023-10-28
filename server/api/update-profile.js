const { denormalisedResponseEntities } = require("../../src/util/data");
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
        expand: true,
        include: ['profileImage'],
        'fields.image': ['variants.square-small', 'variants.square-small2x'],
        
      }).then(res => {
        console.log(`Working: ${listing.data}`);
      });
      



    const phoneNumber = '08067565788';
    sdk.currentUser
    .updateProfile(
      { protectedData: { phoneNumber } },
      {
        expand: true,
        include: ['profileImage'],
        'fields.image': ['variants.square-small', 'variants.square-small2x'],
      }
    )
    .then(response => {
      const entities = denormalisedResponseEntities(response);
      if (entities.length !== 1) {
        throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
      }

      const currentUser = entities[0];
      console.log("Working");
      return currentUser;
    })
    .catch(e => {
      dispatch(savePhoneNumberError(storableError(e)));
      // pass the same error so that the SAVE_CONTACT_DETAILS_SUCCESS
      // action will not be fired
      throw e;
    });









    
    
     
      
  };

  


// Create new SDK instance
// To obtain a client ID, see Applications in Flex Console
