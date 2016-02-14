# nodeGPIO
**This repo is outdated, please check the nodeGPIOdemo repositories from my github to get up-to-date codes!**

[Demo 1 - Control GPIO using Node.js](https://github.com/leograba/NodeGPIOdemo.git)

[Demo 2 - Control one GPIO via web using Node.js](https://github.com/leograba/WebNodeGPIOdemo.git)

[Demo 3 - Control multiple GPIO via a friendly web UI, using Node.js](https://github.com/leograba/WebNodeMultiGPIOdemo.git)

Using Node.js and the Express framework to Access the Toradex Colibri VF61 GPIO via web

# Project description
This directory contains the code files needed to run the demo described step-by-step in the article "Using Node.js and the Express framework to Access the Colibri VF61 GPIO via web".

The server-side application is built using Node.js to access the board GPIOs, via filesystem operations, and the Express framework to run a webserver which handles incoming POST requests by the client-side application, changing GPIO states and answering to the client as needed.

The client-side application has two styling approaches: near-zero CSS, focusing on the functionality rather than style; and using the Bootstrap framework - providing a quick example on how to build a simple yet welcoming user-interface. Regarding the functionality, Javascript jQuery, along with AJAX, is used to create a responsive experience.

# Dependencies
To run this application some node modules need to be installed:

  [Express framework](http://expressjs.com/):
    npm install express # install the Express framework to build a webserver
    
  [Body-parser](https://github.com/expressjs/body-parser) middleware for Express:
    npm install body-parser # install this Node.js middleware to parse JSON body for the Express framework

## How to run this app
After installing the dependencies you can run the application using Node. Then just access http://192.168.0.180:3000/ (default values - modify the server codes for other values) to get to the menu. **Notice that only the corresponding links will work properly, when you chose one of the node applications below.**
- node server-onebtn.js
- node server-multibtn.js
- node server-switches.js

# Helpful modules
To help the development of node applications, there are some modules that can be useful
  
  [Nodemon](http://nodemon.io/):
    npm install -g nodemon # restart the app whenever a file within the project changes
    
  [Debug](https://www.npmjs.com/package/debug) (already installed with Express):
    npm install debug # anyway if you need it for other projects
	
