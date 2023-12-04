const express = require("express");
const { addNewToy, getToys,searchToy,searchByCategory,deleteToy,editToy,getByIdToy, funcMinMax } = require("../controllers/toys.controllers");
const { auth, authNoPermistion } = require("../middlewares/auth");
const router = express.Router();

// roles=['admin', 'user'];

// crud => 
router.post("/", auth(),addNewToy);
router.get("/", getToys);
router.get("/search", searchToy);
router.get("/prices", funcMinMax);
router.get("/:catname", searchByCategory);

router.get("/byId/:idGet", getByIdToy);
router.delete("/:idDel", auth(),deleteToy);
router.patch("/:editId", auth(),editToy);



module.exports = router;
