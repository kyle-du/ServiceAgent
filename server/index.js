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

// API POST endpoint
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

// GET endpoint
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

// PATCH endpoint
app.patch('/api/complaints/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { data, error } = await supabase
    .from('complaints')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating complaint status:', error.message);
    return res.status(500).json({ error: 'Failed to update status' });
  }

  res.status(200).json(data[0]);
});

// DELETE endpoint
app.delete('/api/complaints/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('complaints')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting complaint:', error.message);
    return res.status(500).json({ error: 'Failed to delete complaint' });
  }

  res.status(200).json({ message: 'Complaint deleted successfully' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
