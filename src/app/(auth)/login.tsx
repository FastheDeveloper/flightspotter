// screens/auth/Login.tsx
import { View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardAvoidingScroll from '~/src/components/KeyboardAvoidingScroll/KeyboardAvoidingScroll';
import { Divider } from '~/src/components/Divider/Divider';
import AppText from '~/src/components/AppText/AppText';

import { router } from 'expo-router';
import LoginForm from '~/src/components/forms/LoginForm';

const Login = () => {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingScroll>
      <View className="bg-APP_BACKGROUND flex-1 justify-between">
        <View className="mt-5 px-4" style={{ paddingTop: insets.top }}>
          <View className="mb-4 flex-row items-center justify-center">
            {/* Logo can go here */}
          </View>

          <AppText header>Welcome back</AppText>
          <Divider height={height > 650 ? 40 : 20} />

          <LoginForm />
        </View>

        <View className="mb-6 items-center">
          <AppText indicator onPress={() => router.replace('/(auth)/signUp')}>
            Don’t have an account? <AppText link>Sign up</AppText>
          </AppText>
        </View>
      </View>
    </KeyboardAvoidingScroll>
  );
};

export default Login;
