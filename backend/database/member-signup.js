import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
import bcrypt from 'https://cdn.skypack.dev/bcryptjs';

const supabaseUrl = 'https://gtvtjpqllbljhaqgmmsw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnRqcHFsbGJsamhhcWdtbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTIyMjIsImV4cCI6MjA1NzAyODIyMn0.W-z3nsymA60xGYXjMt2d7ascnoBtIgRCdkZrIL_6bPI";
const supabase = createClient(supabaseUrl, supabaseKey);

// Change this variable to determine how long the member's passwords are 
const PASSWORD_LENGTH = 6;

function generate_password(length) {
    const possible_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function generate_username(firstname, lastname)
{
    let result = '';
    result += firstname[0].toLowerCase();
    result += lastname.toLowerCase();
    result += Math.floor(Math.random * 4).toString();
    return result;
}

export async function member_sign_up(firstName, lastName) {

    const password = generate_password(PASSWORD_LENGTH);

    const generated_username = generate_username(firstName, lastName);

    // assumed that members share the same institution name as their community leaders so autofill this 
    const institutionName = sessionStorage.getItem('institutionName');

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('user_data')
        .insert([
            {
                first_name: firstName,
                last_name: lastName,
                username: generated_username,
                institution: institutionName,
                password: hashedPassword, 
            }
        ]);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data inserted:', data);
    }
}
