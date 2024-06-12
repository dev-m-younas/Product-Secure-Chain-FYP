const express = require('express');
const Product_details = require('../model/Product_details');

const router = express.Router();

// Route to handle POST request
router.post('/productinfo', async (req, res) => {
  try {
    const { barcodeID, blockhash } = req.body;
    
    // Create a new product instance
    const newProduct = new Product_details({
      blockhash,
      barcodeID
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product information saved successfully' });
  } catch (error) {
    console.error('Error while saving product information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.post('/check-authenticity', async (req, res) => {
  try {
    const { barcodeID } = req.body;

    // Find the product in the database by barcodeID
    const product = await Product_details.findOne({ barcodeID });

    if (!product) {
      return res.status(200).json({ message: 'Product is fake' });
    }

    // Check if any blockhash is present for the product
    if (product.blockhash) {
      return res.status(200).json({ message: 'Product is original' });
    } else {
      return res.status(200).json({ message: 'Product is fake' });
    }

  } catch (error) {
    console.error('Error while checking product authenticity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;