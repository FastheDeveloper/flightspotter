import { supabase } from '~/src/utils/supabase';
import { clearSession } from '~/src/utils/secureStorage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export const logout = async (redirectToLogin: boolean = true) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error during logout:', error.message);
            Toast.show({
                type: 'error',
                text1: 'Logout Failed',
                text2: error.message,
            });
            return;
        }

        await clearSession(); // ✅ Remove session from SecureStore

        Toast.show({
            type: 'success',
            text1: 'Logged Out',
            text2: 'You’ve been signed out successfully.',
        });

        if (redirectToLogin) {
            router.replace('/(auth)/login');
        }
    } catch (err) {
        console.error('Unexpected logout error:', err);
        Toast.show({
            type: 'error',
            text1: 'Unexpected error',
        });
    }
};
