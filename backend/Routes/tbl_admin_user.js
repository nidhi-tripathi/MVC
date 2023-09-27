const express = require('express')
// const tbl_admin_user_validation = require("../Validation/tbl_admin_user")
const AdminUser = express.Router();

const { getAdminUser, addAdminUser, updateAdminUser, deleteAdminUser } = require("../Controllers/tbl_admin_user")


const aws = require('aws-sdk');
let  multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "bucketname";

//store file in AWS S3 configuration 
const s3 = new S3Client({
    region:  "us-east-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
})

//Storage Configuraion
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }

})
let upload = multer({ storage: storage })
    ///////////////////////////

// SWAGGER API OF ALL TABLES
/**
 * @swagger
 * components:
 *   schemas:
 *     tbl_admin_user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         mobile:
 *           type: string
 *         photo:
 *           type: string
 *         aadhar:
 *           type: string
 *         doj:
 *           type: string
 *         qualification:
 *           type: string
 *         dob:
 *           type: integer
 *         address:
 *           type: string
 *         state:
 *           type: string
 *         city:
 *           type: string
 *         pin:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /api/admin/viewuser:
 *  get:
 *      summary: This api is used to check whether api is working or not in (tbl_admin_user)
 *      description: This api is used to check whether api is working or not in (tbl_admin_user)
 *      responses:
 *          200:
 *              description: To test Get method
 *              content: 
 *                    application/json:
 *                           schema:
 *                               type: array
 *                               items:
 *                                $ref : '#components/schemas/tbl_admin_user'
 */

/**
 * @swagger
 * /api/admin/adduser:
 *  post:
 *      summary: used to insert data into mysql database (tbl_admin_user)
 *      description: This api is used to insert data into mysql database (tbl_admin_user)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/tbl_admin_user'
 *      responses:
 *          200:
 *              description: Added successfully
 */


AdminUser.get("/api/admin/viewuser", getAdminUser);
AdminUser.post("/api/admin/adduser", upload.single('photo'), addAdminUser);
AdminUser.put("/api/admin/updateuser/:id", updateAdminUser);
AdminUser.delete("/api/admin/deleteuser/:id", deleteAdminUser);


module.exports = { AdminUser }