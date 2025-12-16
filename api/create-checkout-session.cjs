const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

// This serverless function is designed to run on Vercel.
// Make sure to set STRIPE_SECRET_KEY, SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your Vercel project settings.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

/**
 * Expected POST body (JSON):
 * {
 *   type: 'individual' | 'corporate' | 'school' | 'foundation',
 *   amount?: number // in cents, required for corporate/school
 * }
 */

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe secret key is not configured' });
  }

  try {
    const { type, amount } = req.body || {};

    if (!type) {
      return res.status(400).json({ error: 'Missing sponsorship type' });
    }

    let lineItem;
    let mode = 'payment';

    switch (type) {
      case 'individual': {
        // Fixed $30 (one-time)
        lineItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Individual & Monthly Sponsorship',
            },
            unit_amount: 3000, // $30.00
          },
          quantity: 1,
        };
        mode = 'payment';
        break;
      }
      case 'corporate': {
        if (!amount || typeof amount !== 'number' || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount for corporate sponsorship' });
        }
        lineItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Corporate Partnership Sponsorship',
            },
            unit_amount: Math.round(amount),
          },
          quantity: 1,
        };
        mode = 'payment';
        break;
      }
      case 'school': {
        if (!amount || typeof amount !== 'number' || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount for school sponsorship' });
        }
        lineItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Schools & Districts Sponsorship',
            },
            unit_amount: Math.round(amount),
          },
          quantity: 1,
        };
        mode = 'payment';
        break;
      }
      case 'foundation': {
        // Monthly subscription with default $10/month
        lineItem = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Foundations & Grants Monthly Sponsorship',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 1000, // $10.00/month
          },
          quantity: 1,
        };
        mode = 'subscription';
        break;
      }
      default: {
        return res.status(400).json({ error: 'Unknown sponsorship type' });
      }
    }

    const origin = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [lineItem],
      success_url: `${origin}/sponsors?status=success`,
      cancel_url: `${origin}/sponsors?status=cancelled`,
    });

    // Persist a record of this transaction attempt in Supabase
    if (!supabase) {
      console.warn('Supabase client not configured; skipping transaction logging.');
    } else {
      const { error: dbError } = await supabase.from('sponsorship_transactions').insert({
        sponsorship_type: type,
        amount_cents: lineItem.price_data.unit_amount,
        currency: lineItem.price_data.currency || 'usd',
        mode,
        status: session.status || 'created',
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent || null,
        stripe_customer_id: session.customer || null,
        raw_request: req.body || null,
        raw_stripe_session: session,
      });

      if (dbError) {
        console.error('Failed to log sponsorship transaction', dbError);
      }
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return res.status(500).json({ error: 'Unable to create checkout session' });
  }
};
