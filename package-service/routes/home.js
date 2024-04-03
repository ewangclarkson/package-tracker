const express = require('express');
const router = express.Router();


router.get('/',(req,res) => {

    res.send("Delivery Service is up and Running");
});

module.exports = router;