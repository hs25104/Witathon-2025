import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
import bcrypt from 'https://cdn.skypack.dev/bcryptjs';

const supabaseUrl = 'https://gtvtjpqllbljhaqgmmsw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dnRqcHFsbGJsamhhcWdtbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTIyMjIsImV4cCI6MjA1NzAyODIyMn0.W-z3nsymA60xGYXjMt2d7ascnoBtIgRCdkZrIL_6bPI";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function login(event) {
    event.preventDefault(); 

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    const { data, error } = await supabase
        .from('leader_data')
        .select('password') 
        .eq('email', email) 
        .single(); 

    if (error) {
        document.getElementById("error-message").innerText = "Email not found!";
        return;
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if (passwordMatch) {
        document.getElementById("error-message").innerText = "Login successful! Redirecting...";
        document.getElementById("error-message").style.color = "green"; 

        setTimeout(() => {
            window.location.href = "leader-dash.html"; 
        }, 2000); 
    } else {
        document.getElementById("error-message").innerText = "Incorrect password!";
        document.getElementById("error-message").style.color = "red";
    }

    if (data) {
        sessionStorage.setItem('institutionName', data.institution_name);
        sessionStorage.setItem('institutionType', data.institution_type);

        window.location.href = 'signup.html';
    }
}

document.getElementById("form").addEventListener("submit", login);