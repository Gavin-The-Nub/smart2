// Simple Express server to run Vercel API functions locally
// Run with: node server-dev.cjs (should be on port 3001)

// Load environment variables from .env.local or .env
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Also try .env as fallback

// Verify required environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  WARNING: STRIPE_SECRET_KEY not found in environment variables');
  console.warn('   Make sure you have a .env.local file with STRIPE_SECRET_KEY set');
} else {
  console.log('✅ STRIPE_SECRET_KEY loaded');
}

if (!process.env.SUPABASE_URL) {
  console.warn('⚠️  WARNING: SUPABASE_URL not found in environment variables');
} else {
  console.log('✅ SUPABASE_URL loaded');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  WARNING: SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
} else {
  console.log('✅ SUPABASE_SERVICE_ROLE_KEY loaded');
}

const express = require('express');
const cors = require('cors');
const checkoutHandler = require('./api/create-checkout-session.cjs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Wrap Vercel-style handler to work with Express
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    // Convert Express req/res to Vercel-style
    const vercelReq = {
      method: req.method,
      body: req.body,
      headers: req.headers,
    };

    let statusCode = 200;
    const vercelRes = {
      status: (code) => {
        statusCode = code;
        return vercelRes;
      },
      setHeader: (name, value) => {
        res.setHeader(name, value);
      },
      json: (data) => {
        res.status(statusCode).json(data);
      },
    };

    await checkoutHandler(vercelReq, vercelRes);
  } catch (error) {
    console.error('Error in checkout handler:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API dev server running on http://localhost:${PORT}`);
  console.log(`   Make sure Vite is running on port 8080`);
});
