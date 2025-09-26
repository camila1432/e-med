import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.com/dashboard/project/rhhorhrmxcgzqerwcded';
const supabaseAnonKey = 'agathaerio1432';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
