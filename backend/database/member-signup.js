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
        const randomIndex = Math.floor(Math.random() * possible_chars.length);
        result += possible_chars.charAt(randomIndex);
    }
    return result;
}

export async function member_sign_up(firstName, lastName) {
    const baseUsername = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}`;
    
    const { data: existingUsers, error: fetchError } = await supabase
        .from('user_data')
        .select('username')
        .ilike('username', `${baseUsername}%`);

    if (fetchError) {
        console.error('Error fetching usernames:', fetchError);
        return;
    }

    let maxNumber = 0;
    existingUsers.forEach(user => {
        const match = user.username.match(new RegExp(`^${baseUsername}(\\d*)$`));
        if (match && match[1]) {
            maxNumber = Math.max(maxNumber, parseInt(match[1], 10));
        }
    });

    const newUsername = `${baseUsername}${maxNumber + 1}`;

    const password = generate_password(PASSWORD_LENGTH);
    const institutionName = sessionStorage.getItem('institutionName');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(password)

    const { data, error } = await supabase
        .from('user_data')
        .insert([
            {
                first_name: firstName,
                last_name: lastName,
                username: newUsername,
                institution: institutionName,
                password: hashedPassword, 
            }
        ]);

        if (error) {
            console.error('Error inserting data:', error);
            return { success: false, message: 'Error creating user.' };
        } else {
            return {
                success: true,
                message: `User created successfully! \n Username: ${newUsername}, Password: ${password}`
            };
        }
}
