// hooks/useLoginForm.ts
import { useState } from 'react';
import { supabase } from '~/src/utils/supabase';

import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../utils/emailUtils';
import { saveSession } from '../utils/secureStorage';

export const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailBlur = () => {
        if (!email.trim()) {
            setEmailError('Email is required');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordBlur = () => {
        if (!password.trim()) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = async () => {
        handleEmailBlur();
        handlePasswordBlur();

        const isValid = validateEmail(email) && password.trim().length > 0;
        if (!isValid) return;

        setIsLoading(true);

        const { error, data } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setEmailError(error.message || 'Login failed');
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Try again.',
            });
        } else {
            await saveSession(data);
            Toast.show({
                type: 'success',
                text1: 'Login  Successful',
                text2: 'Welcome Back!',
            });
            router.replace('/(tabs)'); // Adjust route as needed
        }

        setIsLoading(false);
    };

    return {
        email, setEmail, emailError, handleEmailBlur,
        password, setPassword, passwordError, handlePasswordBlur,
        handleLogin, isLoading
    };
};
