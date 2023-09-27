const connection = require("../Model/model");
const Joi = require("joi");

const getAdminUser = async(req, res) =>{ 
   try{
    let sqlQuery = "select * from tbl_admin_user";
    let data = req.body;

    await connection.query(sqlQuery, data, function(error, result){
        if(error){
            console.log("error", error.sqlMessage)
        }
        else{
            res.json(result)
        }
    })
   }catch(error){
    console.log(error.message)
   }
}


const addAdminUser = async(req, res)=>{
    try{
        let sqlQuery = "insert into tbl_admin_user set?";
        let data = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            photo:req.file.location,
            aadhar: req.body.aadhar,
            doj: req.body.doj,
            qualifation: req.body.qualifation,
            dob: req.body.dob,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            status: req.body.status
        }

        await connection.query(sqlQuery, data, function(error, result){
            if(error){
                console.log("error", error.sqlMessage)
            }
            else{
                res.json(result)
            }
        })

    }catch(error){
        console.log("error found...")
    }
}


const updateAdminUser = async(req,res)=>{
    try{
      let sqlQuery = "UPDATE tbl_admin_user SET name = ?,email = ?, password = ?, mobile = ?, photo = ?, aadhar = ?, doj = ?, qualifation = ?, dob = ?, state = ?, address = ?, city = ?, pin = ?, status = ? WHERE id= ?" ;
      let Data = [req.body.name,
                  req.body.email,
                  req.body.password,
                  req.body.mobile,
                  req.body.photo,
                  req.body.aadhar,
                  req.body.doj,
                  req.body.qualifation,
                  req.body.dob,
                  req.body.address,
                  req.body.state,
                  req.body.city,
                  req.body.pin,
                  req.body.status,
                  req.params.id
                 ]
      await connection.query(sqlQuery,Data, function(error, result){
        if(error){
            console.log("Error",error.sqlMessage)
        }
        else{
            res.json(result);
        }
      })           
    }
    catch(error){
        res.send(error.sqlMessage);
    }
}

const deleteAdminUser = (req,res) =>{
    try{
        const sqlQuery = "DELETE from tbl_user_admin WHERE id = ? ";
        const Data = req.params.id;
        connection.query(sqlQuery,Data, function(error, result){
            if(error){
                console.log("Error",error.sqlMessage);
            }
            else{
                res.json(result);
    
            }
        })     
    }
    catch(error){
        res.send(error.sqlMessage);
    }
}

module.exports = {getAdminUser,addAdminUser,updateAdminUser,deleteAdminUser}