import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oftqgcjdedruaoudiizv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);