import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const supabaseUrl = 'https://gtvtjpqllbljhaqgmmsw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnRqcHFsbGJsamhhcWdtbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTIyMjIsImV4cCI6MjA1NzAyODIyMn0.W-z3nsymA60xGYXjMt2d7ascnoBtIgRCdkZrIL_6bPI"; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function test_database() {
    const { data, error } = await supabase
        .from('user_data')
        .insert({username: 'test'},
            {first_name: 'test' },
            {last_name: 'test'},
        );

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data inserted:', data);
    }
}
