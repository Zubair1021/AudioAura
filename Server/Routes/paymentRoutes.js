require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { username, price, interval } = req.body; 
  console.log(username, price, interval);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AudioAura Premium Membership', // Custom product name
              description: 'Get access to premium features, exclusive content, and more with AudioAura Premium Membership.',
              images: ['https://i.imgur.com/xUXM7Pz.png'], 
            },
            unit_amount: price * 100, 
            recurring: {
              interval: interval, 
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
