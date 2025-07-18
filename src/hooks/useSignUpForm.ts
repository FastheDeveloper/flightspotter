import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '~/src/utils/supabase';
import { validateEmail } from '../utils/emailUtils';
import Toast from 'react-native-toast-message';
import { saveSession } from '../utils/secureStorage';

export const useSignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isCheckedError, setIsCheckedError] = useState(false);
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
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm Password is required');
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const toggleCheck = () => {
        setIsCheckedError(false);
        setIsChecked((prev) => !prev);
    };

    const handleSignUp = async () => {
        handleEmailBlur();
        handlePasswordBlur();
        handleConfirmPasswordBlur();
        if (!isChecked) setIsCheckedError(true);

        const isValid =
            validateEmail(email) && password.length >= 6 && password === confirmPassword && isChecked;

        if (!isValid) return;

        setIsLoading(true);

        const { error, data } = await supabase.auth.signUp({ email, password });

        if (error) {
            setEmailError(error.message || 'Signup failed');
            Toast.show({
                type: 'error',
                text1: 'Sign Up Failed',
                text2: error.message || 'Try again.',
            });
        } else {
            const needsConfirmation = !data.session;

            Toast.show({
                type: 'success',
                text1: 'Sign Up Successful',
                text2: 'Welcome aboard!',
            });
            console.log('====================================');
            console.log(data);
            console.log('====================================');

            if (data.session) {
                await saveSession(data); // ✅ Save full session JSON
                router.replace('/(tabs)');
            }

        }

        setIsLoading(false);
    };

    return {
        email,
        setEmail,
        emailError,
        handleEmailBlur,
        password,
        setPassword,
        passwordError,
        handlePasswordBlur,
        confirmPassword,
        setConfirmPassword,
        confirmPasswordError,
        handleConfirmPasswordBlur,
        isChecked,
        toggleCheck,
        isCheckedError,
        handleSignUp,
        isLoading,
    };
};
