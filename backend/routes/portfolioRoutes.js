// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const crypto=require('crypto');



router.post('/', async (req, res) => {
  try {
    const shareableLink = crypto.randomBytes(8).toString('hex');
    const portfolio = new Portfolio({
      ...req.body,
      shareableLink
    });
    const savedPortfolio = await portfolio.save();
    console.log('Created portfolio:', savedPortfolio);
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(400).json({ message: error.message });
  }
});
// Get portfolio by shareable link
router.get('/:shareableLink', async (req, res) => {
  try {
    console.log('Received request for portfolio:', req.params.shareableLink);
    
    const portfolio = await Portfolio.findOne({ 
      shareableLink: req.params.shareableLink 
    });
    
    console.log('Found portfolio:', portfolio);

    if (!portfolio) {
      return res.status(404).json({ 
        message: 'Portfolio not found',
        details: 'No portfolio exists with the provided shareable link'
      });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ 
      message: 'Error fetching portfolio',
      details: error.message 
    });
  }
});

module.exports = router;