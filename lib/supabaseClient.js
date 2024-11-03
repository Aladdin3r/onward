import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jndgvlobhprynoeqxvhn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);