import axios from 'axios';


let body = {
  "Shipments": [],
  "GetLastTrackingUpdateOnly": true,
  "ClientInfo": {
    "UserName": "umahatara@gmail.com",
    "Password": "Umesh2435$$",
    "Version": "v1",
    "AccountNumber": "20016",
    "AccountPin": "543543",
    "AccountEntity": "AMM",
    "AccountCountryCode": "JO",
    "Source": 24,
    "PreferredLanguageCode": null
  },
  "Transaction": null
}

export const getStatus = async (trackId) => {
  console.log("get status tracking code", trackId);
  let Shipments = [];
  Shipments = [...Shipments, trackId];
  body["Shipments"] = Shipments;

  let config = {
      method: 'post',
      url: 'https://ws.aramex.net/ShippingAPI.V2/Tracking/Service_1_0.svc/json/TrackShipments',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      data: JSON.stringify(body)
    };

  //test server for checking update code manually
  // let config2 = {
  //   method: 'get',
  //   url: 'https://testserver.loca.lt/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   data: JSON.stringify(body)
  // };
  
  const result = await axios(config);
  const { data: { TrackingResults } } = result;
  const { UpdateCode } = TrackingResults[0].Value[0];
  console.log("last update code", UpdateCode);
  return UpdateCode;
}

