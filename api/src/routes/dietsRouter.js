const { Router } = require("express");
const { Diet_type } = require("../db");
const express = require("express");
const {getDiets} = require('../controllers/Diets')

const router = Router();
router.use(express.json());

router.get('/',async (req,res)=>{
    let value = await getDiets();
    //console.log(value);
    res.send(value);
});



module.exports = router;