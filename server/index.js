const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// API route
app.post('/api/complaints', async (req, res) => {
  const { name, email, complaint } = req.body;

  const { data, error } = await supabase
    .from('complaints')
    .insert([{ name, email, complaint }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Failed to save complaint' });
  }

  console.log('Complaint saved:', data);
  res.status(200).json({ message: 'Complaint stored in Supabase', data });
});

app.get('/api/complaints', async (req, res) => {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching complaints:', error.message);
    return res.status(500).json({ error: 'Failed to fetch complaints' });
  }

  res.status(200).json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
