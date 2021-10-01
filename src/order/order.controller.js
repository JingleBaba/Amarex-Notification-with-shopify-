import { sendMsg } from '../utilities/sendMsg';
import { getStatus } from '../orderStatus/orderStatus';
import cronTask from '../utilities/cron';

export const getOrderConfirmation = (req, res) => {   //shopify webhook
    res.send('OK');
    try {
        console.log("Order created");
        let { shipping_address: { phone } } = req.body;
        console.log("Shipping phone number", phone)
        if (phone && phone != '') {
            sendMsg(`${phone}`, `Dear customer, your order has been placed.We'll update you once its ready for shipment`);
        }
    }
    catch (e) {
        console.log(e);
        console.log("order creation error");
    }
}

export const getOrderFulfilled = (req, res) => {  //shopify webhook

    res.send('OK');
    const { shipping_address: { phone }, fulfillments } = req.body;
    const { tracking_number, tracking_url } = fulfillments[0];

    console.log("Order fulfilled");
    console.log("order fulfillment phone number", phone);
    console.log("order fulfillment tracking number", tracking_number);
    console.log("order tracking url", tracking_url)


    //once fulfilled i.e, order been given to carrier partner
    if (tracking_number && phone) { //take tracking number and phone
        sendMsg(`${phone}`, `Dear customer, Your order is ready for shipping. Don't worry ! we'll keep you updated`); //send the update
        new cronTask(() => { return getStatus(tracking_number) }, phone, tracking_url).track(); //create new cron for that tracking number
        //custom constructor for creating new crontask , it accepts 
        //1)function that check the current order tracking status
        //2)Customer shipping address phone number 
        //3)tracking url, that is generated after fulfilling
        console.log("cronTask created");
    }
    else {
        console.log("either tracking number or phone number missing");
    }

}

export const getOrderCancelled = (req, res) => {  //shopify webhook
    res.send('OK');
    try {
        let { shipping_address: { phone } } = req.body;
        console.log("order has been cancelled");
        console.log("order cancel phone", phone);
        if (phone && phone != '') {
            sendMsg(`${phone}`, `Dear customer, your order has been cancelled. Any amount deducted will be reflected in your account within 7 working days`);
        }
    }
    catch (e) {
        console.log(e);
        console.log("some error occured in order cancellation")
    }
}
