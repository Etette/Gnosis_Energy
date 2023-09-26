const express = require('express');
const router = express.Router();
const routes = require('../utils/gnosisContract'); 


// Define routes
// accounts
const account = null;

router.post('/wallet', async (req, res) => {
  const accounts = req.body;
try {
    if (accounts){
    account = accounts;
    console.log('wallet connect successful', accounts);
    return true;
  }
  console.log('wallet connect failed');
  return false;
  } catch (e) {
    return {success: false, err: e.message}
  }
});

router.get('/transactions/:address', async (req, res) => {
  const _address = req.params.address;
  try {
    const result = await routes.getUserTransactions(_address);
    if(!result){
        return res.status(400).json({success: false})
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/price', async (req, res) => {
  try {
    const result = await routes.getPrice();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/owner', async (req, res) => {
  try {
    const result = await routes.getOwner();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/updatePrice', async (req, res) => {
  const newPrice = req.body;
  try {
    const result = await routes.updatePrice(newPrice);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/buyEnergy', async (req, res) => {
  const amount = req.body;
  try {
    const result = await routes.buyEnergy(amount);
    return res.status(200).json({ success: true, data: result});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/withdraw', async (req, res) => {
  const address = req.body;
  try {
    const result = await routes.withdraw(address);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// export default {account};
module.exports = router;
