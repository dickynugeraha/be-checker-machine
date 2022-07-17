const router = require("express").Router();
const AdminController = require("../controllers/Admin");
const isAuth = require("../middleware/isAuth");

// USER

// dapetin 1 user
router.get("/user", isAuth, AdminController.getSingleUser);

// update user
router.put("/user", isAuth, AdminController.putEditUser);

// seluruh operator
router.get("/operators", isAuth, AdminController.getAllOperator);

// nambah operator, pake endpoint register role nya operator

// operator buat di edit
router.post("/get-operator", isAuth, AdminController.postGetOperator);

// update operator
router.put("/operator", isAuth, AdminController.putEditOperator);

// delete operator
router.delete("/operator", isAuth, AdminController.deleteOperator);

module.exports = router;
