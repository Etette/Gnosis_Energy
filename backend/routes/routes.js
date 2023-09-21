const express = require('express');
const router = express.Router();
const routes = require('../utils/gnosisContract'); 

// Define routes

router.get('/userTransactions/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const result = await routes.getUserTransactions(address);
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
  const newPrice = req.body.newPrice;
  try {
    const result = await routes.updatePrice(newPrice);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/buyEnergy', async (req, res) => {
  const amount = req.body.amount;
  try {
    const result = await routes.buyEnergy(amount);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/withdraw', async (req, res) => {
  const address = req.body.address;
  try {
    const result = await routes.withdraw(address);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;