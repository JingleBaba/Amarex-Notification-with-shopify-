Step 1
Please install all the required dependencies
If you using on localhost, you need to install localtunnel npm package globally.
you can learn more about it here: https://www.npmjs.com/package/localtunnel

Step 2: 
We are using shopify webhooks for order related callbacks.
Make sure you create those webhooks onto the store you prefer to use.

Step 3
To build the package for production,
Use "yarn build" , we are using babel for transpiling the es6/es7 code .

For dev purpose use ,
"yarn dev" 
It'll create a local https server using the localtunner with hot server load.

