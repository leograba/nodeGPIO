# nodeGPIO
Using Node.js and the Express framework to Access the Toradex Colibri VF61 GPIO via web

# Project description
This directory contains the code files needed to run the demo described step-by-step in the article "Using Node.js and the Express framework to Access the Colibri VF61 GPIO via web".

The server-side application is built using Node.js to access the board GPIOs, via filesystem operations, and the Express framework to run a webserver which handles incoming POST requests by the client-side application, changing GPIO states and answering to the client as needed.

The client-side application has two styling approaches: near-zero CSS, focusing on the functionality rather than style; and using the Bootstrap framework - providing a quick example on how to build a simple yet welcoming user-interface. Regarding the functionality, Javascript jQuery, along with AJAX, is used to create a responsive experience.
