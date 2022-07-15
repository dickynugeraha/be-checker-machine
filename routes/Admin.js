const router = require("express").Router();
const AdminController = require("../controllers/Admin");
const isAuth = require("../middleware/isAuth");

// USER

// dapetin data 1 user
router.get("/user", isAuth, AdminController.getSingleUser);

// update user
router.put("/user", isAuth, AdminController.putEditUser);

// seluruh data operator
router.get("/operators", isAuth, AdminController.getAllOperator);

// nambah operator
// pake endpoint register role nya operator

// data operator buat di edit
router.post("/get-operator", isAuth, AdminController.postGetOperator);

// update data operator
router.put("/operator", isAuth, AdminController.putEditOperator);

// delete data operator
router.delete("/operator", isAuth, AdminController.deleteOperator);

module.exports = router;
