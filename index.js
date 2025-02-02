const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString()); 
  });

  app.get('/membership-discount', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let isMember = req.query.isMemer === 'true';
    let finalPrice = cartTotal;
    if (isMember) {  
    let discountPercentage = 0.1;
    finalPrice = cartTotal - (cartTotal * discountPercentage)
    }
    res.send(finalPrice.toString());
    });

    app.get('/calculate-tax', (req, res) => {
      let cartTotal = parseFloat(req.query.cartTotal);
      let taxRate = 0.5;
      let taxAmount = cartTotal * taxRate;
      res.send(taxAmount.toString());
      }); 

      app.get('/estimate-delivery', (req, res) => {
        let { shippingMethod, distance } = req.query;
        
        if (!shippingMethod || !distance) {
            return res.status(400).send('Missing required query parameters: shippingMethod and distance');
        }
        
        let parsedDistance = parseFloat(distance);
        if (isNaN(parsedDistance) || parsedDistance < 0) {
            return res.status(400).send('Invalid distance value');
        }
    
        let deliveryDays;
        
        if (shippingMethod === 'Standard') {
            deliveryDays = Math.ceil(parsedDistance / 50);
        } else if (shippingMethod === 'Express') {
            deliveryDays = Math.ceil(parsedDistance / 100);
        } else {
            return res.status(400).send('Invalid shipping method. Choose either Standard or Express');
        }
    
        res.send(`Estimated delivery time: ${deliveryDays} days`);
    });
    
    app.get('/shipping-cost', (req, res) => {
      let weight = parseFloat(req.query.weight);
      let distance = parseFloat(req.query.distance);
  
      if (isNaN(weight) || isNaN(distance) || weight <= 0 || distance <= 0) {
          return res.status(400).send('Invalid input. Weight and distance must be positive numbers.');
      }
  
      let shippingCost = weight * distance * 0.1;
      res.send(shippingCost.toString());
  });

  app.get('/loyalty-points', (req, res) => {
    let purchaseAmount = parseFloat(req.query.purchaseAmount);
    
    if (isNaN(purchaseAmount) || purchaseAmount < 0) {
        return res.status(400).send('Invalid purchase amount');
    }
    
    let loyaltyPoints = purchaseAmount * 2; // Assuming 2x points per currency unit
    
    res.send(loyaltyPoints.toString());
});

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
