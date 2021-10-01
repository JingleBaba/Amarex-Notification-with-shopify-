import axios from "axios";
require('dotenv').config();

export const sendMsg = async (phoneNo, msg) => {
    console.log(process.env.APP_SID);
    let {data:response} = await axios.post('http://api.unifonic.com/rest/Messages/Send', {
        AppSid: `${process.env.APP_SID}`,
        Recipient: phoneNo,
        Body: `${process.env.COMPANY}: ${msg}`
    });
    console.log(response); 
}