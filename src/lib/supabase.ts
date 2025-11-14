import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://usqgmsbivhvstlfaawql.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzcWdtc2Jpdmh2c3RsZmFhd3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDkzOTIsImV4cCI6MjA3NzAyNTM5Mn0.ukTsHytyB4MOMHDxXKYnlu0VNxTIZ-Zz7cwNY-azd74'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
