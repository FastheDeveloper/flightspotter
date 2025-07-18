// components/forms/LoginForm.tsx

import AppInput from '~/src/components/AppInput/AppInput';
import AppButton from '~/src/components/BaseButton';
import { Divider } from '~/src/components/Divider/Divider';
import EyeOpenIcon from '~/src/assets/svgs/eyeOpenIcon';
import EyeCloseicon from '~/src/assets/svgs/eyeCloseIcon';
import { useLoginForm } from '~/src/hooks/useLoginForm';

const LoginForm = () => {
  const {
    email,
    setEmail,
    emailError,
    handleEmailBlur,
    password,
    setPassword,
    passwordError,
    handlePasswordBlur,
    handleLogin,
    isLoading,
  } = useLoginForm();

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
      <Divider height={40} />

      <AppButton label="Log In" onPress={handleLogin} loading={isLoading} />
    </>
  );
};

export default LoginForm;
