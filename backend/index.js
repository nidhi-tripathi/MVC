const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
app.use(cors());


const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 5000;


//    SWAGGER REQUIRE
const swaggerui = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');


const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "NODE API documentation  BY Nivedita soni",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./Routes/tbl_admin_user.js"]
}


const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))

// app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerJSDoc(option)));



const {AdminUser} = require("./Routes/tbl_admin_user")
app.use("/", AdminUser);


app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});