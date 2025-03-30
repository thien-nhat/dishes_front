import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://musaddqwlvxkclwnylai.supabase.co';       // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c2FkZHF3bHZ4a2Nsd255bGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMTM4NTMsImV4cCI6MjA1ODg4OTg1M30.GZcD3oeH760Z81P0EVycljSk5H8LLpzwAzMzfTN30YA'; // Replace with your anon ke
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;