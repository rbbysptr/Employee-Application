const express = require('express')
const Controller = require('../controllers/controller');
const router = express.Router()

router.get("/", Controller.readEmployee);
router.get("/employees/add", Controller.getAdd);
router.post("/employees/add", Controller.postAdd);
router.get("/employees/edit/:id", Controller.getEdit);
router.post("/employees/edit/:id", Controller.postEdit);
router.get("/employees/delete/:id", Controller.delete);

module.exports = router