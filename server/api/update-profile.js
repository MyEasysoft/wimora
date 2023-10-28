const { getSdk } = require("../api-util/sdk");

module.exports = (req, res) => {
    
    const { isSpeculative, orderData, bodyParams, queryParams } = req.body;
    const sdk = getSdk(req, res);
    const UUID = {uuid: req.body.reference_id};
    const dataToUpdate = {
                                firstName: req.body.name.familyName,
                                bio: "I just created a Paypal account",
                                profileImageId: UUID ,
                                publicData: {
                                age: 27
                                },
                                protectedData: {
                                phoneNumber: "+1-202-555-4444"
                                },
                                privateData: {
                                discoveredServiceVia: "Twitter",
                                paypalMerchantId:req.body.id

                                }
                            };
    
    sdk.currentUser.updateProfile(dataToUpdate, {
        expand: true,
        include: ["profileImage"]
      }).then(res => {
        // res.data
      });
    res.status(200).send(dataToUpdate);
    return;
      
  };
  