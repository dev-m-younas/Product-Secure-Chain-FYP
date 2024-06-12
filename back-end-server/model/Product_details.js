const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    barcodeID: { type: String, required: true },
    blockhash: { type: String, required: true }
    
});

module.exports = mongoose.model('Product_details', ProductSchema);