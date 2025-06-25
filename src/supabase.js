import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tuinstancia.supabase.co'; // Reemplaza con tu URL
const supabaseKey = 'tu_clave_publica'; // Reemplaza con tu clave pública

export const supabase = createClient(supabaseUrl, supabaseKey);
