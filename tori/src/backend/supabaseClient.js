import { createClient } from '@supabase/supabase-js';

// Use the environment variables for the URL and key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;