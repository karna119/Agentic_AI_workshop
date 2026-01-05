import { User } from './auth';
import { supabase } from './supabaseClient';

/**
 * Service to handle user-related database operations.
 */
export const syncUserToDatabase = async (user: User) => {
    console.log('Syncing user to database:', user);

    try {
        const { data, error } = await supabase
            .from('users')
            .upsert({
                email: user.email,
                name: user.name,
                phone: user.phone,
                last_login: new Date().toISOString()
            }, { onConflict: 'email' });

        if (error) {
            console.error('Error syncing user to Supabase:', error);
            throw error;
        }

        console.log('User synced successfully:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error syncing user:', err);
        // We don't want to block login if DB sync fails, so we return a success-like response
        // or re-throw depending on strictness requirements. For now, we'll log and proceed.
        return { success: false, error: err };
    }
};
