// screens/auth/SignUp.tsx
import { View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardAvoidingScroll from '~/src/components/KeyboardAvoidingScroll/KeyboardAvoidingScroll';
import { Divider } from '~/src/components/Divider/Divider';
import AppText from '~/src/components/AppText/AppText';
import SignUpForm from '~/src/components/forms/SignUpForm';
import { router } from 'expo-router';

const SignUp = () => {
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingScroll>
      <View className="bg-APP_BACKGROUND flex-1 justify-between">
        <View className="mt-5 px-4" style={{ paddingTop: insets.top }}>
          <View className="mb-4 flex-row items-center justify-center">
            {/* Logo can go here */}
          </View>

          <AppText header>Let's create your account</AppText>
          <Divider height={height > 650 ? 40 : 20} />

          <SignUpForm />
        </View>

        <View className="mb-6 items-center">
          <AppText indicator onPress={() => router.replace('/(auth)/login')}>
            Already have an account? <AppText link>Log in</AppText>
          </AppText>
        </View>
      </View>
    </KeyboardAvoidingScroll>
  );
};

export default SignUp;
