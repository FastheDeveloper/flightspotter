import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { FONT_NAMES } from '@constants/fontNames';
import { STORAGE_KEYS } from '@constants/asyncKeys';
import { getValueFor } from '@utils/secureStorage';
import { useAuth } from '~/src/hooks/useAuth';

export default function App() {
  const animation = useRef<LottieView>(null);
  const { session, isReady } = useAuth();
  const [fontsLoaded] = useFonts({
    [FONT_NAMES.POPPINS_REGULAR]: require('@src/assets/fonts/Poppins-Regular.ttf'),
    [FONT_NAMES.POPPINS_MEDIUM]: require('@src/assets/fonts/Poppins-Medium.ttf'),
    [FONT_NAMES.POPPINS_SEMIBOLD]: require('@src/assets/fonts/Poppins-SemiBold.ttf'),
    [FONT_NAMES.POPPINS_BOLD]: require('@src/assets/fonts/Poppins-Bold.ttf'),
    [FONT_NAMES.POPPINS_EXTRABOLD]: require('@src/assets/fonts/Poppins-ExtraBold.ttf'),
    [FONT_NAMES.POPPINS_BLACK]: require('@src/assets/fonts/Poppins-Black.ttf'),
  });

  const [hasNavigated, setHasNavigated] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const hasLaunched = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      return !!hasLaunched;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Wait until fonts and auth are ready
    if (!isReady || !fontsLoaded || hasNavigated) return;

    const proceed = async () => {
      animation.current?.play();

      const hasUsedApp = await checkOnboardingStatus();

      setTimeout(() => {
        if (!hasUsedApp) {
          router.replace('/(auth)/onboarding');
        } else if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
        setHasNavigated(true);
      }, 1000); // Let animation play out a bit before navigating
    };

    proceed();
  }, [isReady, fontsLoaded]);

  return (
    <View style={styles.animationContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView
        ref={animation}
        style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}
        resizeMode="cover"
        source={require('@src/assets/jsons/animation.json')}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
