const express=require('express')

const routes=express.Router();
const AdminCtl=require('../Controller/AdminCtl');



routes.post("/registration",AdminCtl.Registration);
routes.post("/loginadmin",AdminCtl.loginadmin)
routes.post("/changepass",AdminCtl.changepass)
routes.post("/forgetpass",AdminCtl.forgetpass)
routes.post("/verifyOtp",AdminCtl.verifyOtp)
routes.get("/viewadmin",AdminCtl.viewAdmin)
routes.post("/insertadmin",AdminCtl.insertadmin)
routes.delete("/deleteadmin",AdminCtl.deleteadmin)


module.exports=routes;