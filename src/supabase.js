import { createClient } from '@supabase/supabase-js'

// Certifique-se de definir estas variáveis no Netlify (Environment Variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
