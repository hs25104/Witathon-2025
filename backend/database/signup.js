import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
import bcrypt from 'https://cdn.skypack.dev/bcryptjs';

const supabaseUrl = 'https://gtvtjpqllbljhaqgmmsw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnRqcHFsbGJsamhhcWdtbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTIyMjIsImV4cCI6MjA1NzAyODIyMn0.W-z3nsymA60xGYXjMt2d7ascnoBtIgRCdkZrIL_6bPI";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function sign_up(firstName, lastName, institutionName, institutionType, email, password, confirmPassword) {

    if (password !== confirmPassword) {
        console.error('Passwords do not match!');
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('leader_data')
        .insert([
            {
                first_name: firstName,
                last_name: lastName,
                institution_name: institutionName,
                institution_type: institutionType,
                email: email,
                password: hashedPassword, 
            }
        ]);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data inserted:', data);
    }
}
