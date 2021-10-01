import cron from 'node-cron';
import { sendMsg } from './sendMsg';


//Each cronTask will have its own destroy method that will stop and delete itself, that will be called based on some conditions
//That's the reason for using class here, cause we can define its private object and method that refers to its own object instance created by new instead of window object.
export default class cronTask {
    constructor(fun = () => { return }, phone = '', url = '', status = '', task = null) {
        this.fun = fun; //function to get the current order status
        this.status = status; //to store changed status
        this.task = task; //cron task
        this.phone = phone; //phone number of the customer
        this.url = url; //tracking url
    }

    track = () => {
        this.task = cron.schedule('*/10 * * * * *', async () => {
            let statusArr = [
                {
                    code: "SH291,SH292,SH223", //in transit
                    text: `Dear customer, your order has been shipped and is in your way. You can track your order here: [ ${this.url} ]  `,
                    stop: false,
                },
                {
                    code: "SH003,SH004,SH073,SH252", //out for delivery
                    text: `Dear customer, your order is out for delivery`,
                    stop: false,
                },
                {
                    code: "SH005,SH006,SH007,SH154,SH234,SH496", //delivered
                    text: `Dear customer, your order has been delivered`,
                    stop: true
                },
                {
                    code: "SH033,SH043,SH074,SH294,SH480", //failed attempt
                    text: `Dear customer, your order could not be delivered. We'll try again tomorrow`,
                    stop: false
                },
                {
                    code: "SH532", //customer request dropoff point
                    text: `Dear customer, your order has been delivered to your requested location`,
                    stop: true
                },
                {
                    code: "SH552,SH551",//shipment cancelled
                    text: null,
                    stop: true
                }

            ];
            //here "this" denotes to the class not the cron instance
            let data = await this.fun(); //get the current order tracking update code
            if (this.status != data) { //if its not same as previous update code
                this.status = data; //update the new tracking update code into status property of the class

                let statusUpdate = statusArr.find(status => (status.code).includes(this.status)); //check if its one of the code to notify the customer
                console.log("Status matched to notify customer ?", statusUpdate ?? false);
                //if it is the update code to notify customer
                if (statusUpdate) {
                    const { text } = statusUpdate;
                    console.log("Code has been matched", statusUpdate);
                    if (statusUpdate.stop) { //check if it should stop and destroy the current cron
                        if (text) sendMsg(this.phone, text);
                        this.destroy() //destroy the current cron
                    }
                    else {  //cron should continue be running for further tracking status
                        console.log("tracking status phone", this.phone);
                        console.log("tracking status text", text);
                        if (text) sendMsg(this.phone, text);
                    }
                }
            }
        })
    }

    destroy = () => {
        try {
            this.task.destroy(); //delete the current cron
            console.log(this.task.getStatus()); //check if its destroyed
        }
        catch (e) {
            console.log(e);
        }
    }
}