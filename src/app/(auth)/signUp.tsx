import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '~/src/utils/supabase';
import EyeCloseicon from '~/src/assets/svgs/eyeCloseIcon';
import EyeOpenIcon from '~/src/assets/svgs/eyeOpenIcon';
import { validateEmail } from '~/src/utils/emailUtils';
import AppText from '~/src/components/AppText/AppText';
import AppInput from '~/src/components/AppInput/AppInput';
import AppButton from '~/src/components/BaseButton';
import CheckboxWithLabel from '~/src/components/CheckBox/CheckBox';
import KeyboardAvoidingScroll from '~/src/components/KeyboardAvoidingScroll/KeyboardAvoidingScroll';
import { Divider } from '~/src/components/Divider/Divider';

const SignUp = () => {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
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

  const handleSignUp = async () => {
    handleEmailBlur();
    handlePasswordBlur();
    handleConfirmPasswordBlur();
    if (!isChecked) setIsCheckedError(true);

    const isValid =
      validateEmail(email) && password.length >= 6 && password === confirmPassword && isChecked;

    if (!isValid) return;

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setEmailError(error.message || 'Signup failed');
    } else {
      //   router.navigate('/(auth)/createProfile'); // or show verification notice
      console.log('Fas');
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingScroll>
      <View className="bg-APP_BACKGROUND flex-1 justify-between">
        <View className="mt-5 px-4" style={{ paddingTop: insets.top }}>
          {/* Logo */}
          <View className="mb-4 flex-row items-center justify-center">
            {/* <AppIcon width={48} height={48} />
            <AppName width={205} height={48} /> */}
          </View>

          <AppText header>Let's create your account</AppText>
          <Divider height={20} />
          {height > 650 && <Divider height={20} />}

          {/* Email */}
          <AppInput
            label="Email address"
            placeholder="abdgy@gmail.com"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text.toLowerCase());
              if (emailError) setEmailError('');
            }}
            errorMessage={emailError}
            onBlur={handleEmailBlur}
          />
          <Divider height={5} />

          {/* Password */}
          <AppInput
            label="Password"
            placeholder="*******"
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            errorMessage={passwordError}
            onBlur={handlePasswordBlur}
            passwordToggle
            secureTextEntry
            customShowIcon={<EyeOpenIcon width={24} height={24} />}
            customHideIcon={<EyeCloseicon width={24} height={24} />}
          />
          <Divider height={5} />

          {/* Confirm Password */}
          <AppInput
            label="Confirm Password"
            placeholder="*******"
            value={confirmPassword}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError('');
            }}
            errorMessage={confirmPasswordError}
            onBlur={handleConfirmPasswordBlur}
            passwordToggle
            secureTextEntry
            customShowIcon={<EyeOpenIcon width={24} height={24} />}
            customHideIcon={<EyeCloseicon width={24} height={24} />}
          />

          <CheckboxWithLabel
            isChecked={isChecked}
            onToggle={() => {
              setIsCheckedError(false);
              setIsChecked((prev) => !prev);
            }}
            label="I agree to the terms and privacy policy"
            error={isCheckedError}
          />
          <Divider height={20} />
          <Divider height={20} />

          <AppButton label="Sign Up" onPress={handleSignUp} loading={isLoading} />
        </View>

        {/* Bottom text */}
        <View className="mb-6 items-center">
          <AppText indicator onPress={() => router.replace('')}>
            Already have an account? <AppText link>Log in</AppText>
          </AppText>
        </View>
      </View>
    </KeyboardAvoidingScroll>
  );
};

export default SignUp;
