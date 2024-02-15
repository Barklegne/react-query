import { createClient } from '@supabase/supabase-js'
// import process from 'process' // Import the 'process' module
const supabaseUrl = 'https://mifuoxtnoseuqyhsorzx.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
