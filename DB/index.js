import mongoose from "mongoose";
import DBname from "../src/constance.js"

const ConnectDB = async () =>{
    try{
        const DBinstance = await mongoose.connect(`${process.env.DBstring}/${DBname}`);
        console.log(`\n Mongodb connect !! DB Host: ${DBinstance.connection.host} `)

    }catch(err){
        console.log("Connection failed from DB",err);
        throw err;
    }
}

export default ConnectDB