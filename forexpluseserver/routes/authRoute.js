const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
    origin: 'https://forexpluse.vercel.app', 
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  };

  //https://forexpluse.vercel.app
  
  router.use(cors(corsOptions));
  router.options('*', cors(corsOptions)); 

const { test, loginUser, createUser, loginAdmin, getUser, getUsers, addBalance , withdrawBank, withdrawCrypto, AdminGetCrypto, AdminGetBankR, getBankRecords, getCryptoRecords} = require("../controllers/authController");

router.get('/test', test);
router.post("/getUser", getUser);
router.get("/getUsers", getUsers);
router.post('/login', loginUser);
router.post('/register', createUser);
router.post('/adminAuth', loginAdmin);
router.post('/addBalance', addBalance);
router.post("/withdrawBank", withdrawBank);
router.post("/AdminGetBankR", AdminGetBankR);
router.post("/AdminGetCrypto", AdminGetCrypto);
router.post("/withdrawCrypto", withdrawCrypto);
router.post("/getBankRecords", getBankRecords);
router.post("/getCryptoRecords", getCryptoRecords);


module.exports = router;