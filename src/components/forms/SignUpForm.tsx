// components/forms/SignUpForm.tsx

import AppInput from '~/src/components/AppInput/AppInput';
import AppButton from '~/src/components/BaseButton';
import CheckboxWithLabel from '~/src/components/CheckBox/CheckBox';
import { Divider } from '~/src/components/Divider/Divider';
import EyeOpenIcon from '~/src/assets/svgs/eyeOpenIcon';
import EyeCloseicon from '~/src/assets/svgs/eyeCloseIcon';
import { useSignUpForm } from '~/src/hooks/useSignUpForm';

const SignUpForm = () => {
  const {
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
  } = useSignUpForm();

  return (
    <>
      <AppInput
        label="Email address"
        placeholder="abdgy@gmail.com"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        errorMessage={emailError}
        onBlur={handleEmailBlur}
      />
      <Divider height={5} />

      <AppInput
        label="Password"
        placeholder="*******"
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
        onBlur={handlePasswordBlur}
        passwordToggle
        secureTextEntry
        customShowIcon={<EyeOpenIcon width={24} height={24} />}
        customHideIcon={<EyeCloseicon width={24} height={24} />}
      />
      <Divider height={5} />

      <AppInput
        label="Confirm Password"
        placeholder="*******"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={confirmPasswordError}
        onBlur={handleConfirmPasswordBlur}
        passwordToggle
        secureTextEntry
        customShowIcon={<EyeOpenIcon width={24} height={24} />}
        customHideIcon={<EyeCloseicon width={24} height={24} />}
      />

      <CheckboxWithLabel
        isChecked={isChecked}
        onToggle={toggleCheck}
        label="I agree to the terms and privacy policy"
        error={isCheckedError}
      />
      <Divider height={40} />

      <AppButton label="Sign Up" onPress={handleSignUp} loading={isLoading} />
    </>
  );
};

export default SignUpForm;
