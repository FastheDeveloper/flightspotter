import { useRef, useEffect, useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Redirect, router, Stack, useFocusEffect } from 'expo-router';
import { useFonts } from 'expo-font';
import { FONT_NAMES } from '@constants/fontNames';
import { getValueFor } from '@utils/secureStorage';
// import { STORAGE_KEYS } from "../constants/asyncKeys";
STORAGE_KEYS;
import * as SplashScreen from 'expo-splash-screen';
// import { useAuth } from "../providers/AuthProvider";
import { STORAGE_KEYS } from '@constants/asyncKeys';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const animation = useRef<LottieView>(null);
  //   const { isAuthenticated } = useAuth();
  const [fontsLoaded, fontError] = useFonts({
    [FONT_NAMES.POPPINS_REGULAR]: require('@src/assets/fonts/Poppins-Regular.ttf'),
    [FONT_NAMES.POPPINS_MEDIUM]: require('@src/assets/fonts/Poppins-Medium.ttf'),
    [FONT_NAMES.POPPINS_SEMIBOLD]: require('@src/assets/fonts/Poppins-SemiBold.ttf'),
    [FONT_NAMES.POPPINS_BOLD]: require('@src/assets/fonts/Poppins-Bold.ttf'),
    [FONT_NAMES.POPPINS_EXTRABOLD]: require('@src/assets/fonts/Poppins-ExtraBold.ttf'),
    [FONT_NAMES.POPPINS_BLACK]: require('@src/assets/fonts/Poppins-Black.ttf'),
  });

  const checkOnboardingStatus = async () => {
    try {
      const hasLaunchedOnboarding = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      return hasLaunchedOnboarding != null;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  };

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    setTimeout(() => {
      animation.current?.play();
    }, 1000);
  }, []);

  //   const handleSplashScreen = async () => {
  //     console.log("DONE HERE");
  //     const appIsReady = true;
  //     if (appIsReady) {
  //       const isOnBoardingCompleted = await checkOnboardingStatus();

  //       if (!isOnBoardingCompleted) {
  //         // await new Promise((resolve) => setTimeout(resolve, 3000));

  //         router.replace("/onboarding");
  //         console.log("====================================");
  //         console.log(".onboard");
  //         console.log("====================================");
  //       } else if (isAuthenticated) {
  //         // await new Promise((resolve) => setTimeout(resolve, 3000));
  //         router.replace("/(protected)/(tabs)");
  //         console.log("====================================");
  //         console.log(".yabs");
  //         console.log("====================================");
  //         // return <Redirect hre
  //         // f={"/(protected)/(tabs)"} />;
  //       } else {
  //         // Default navigation if no URL is passed
  //         router.replace("/(auth)/signin");

  //         // return <Redirect href={"/(auth)/signin"} />;
  //       }
  //     }
  //   };

  return (
    <View style={styles.animationContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView
        ref={animation}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#eee',
        }}
        resizeMode="cover"
        source={require('@src/assets/jsons/animation.json')}
        onAnimationFinish={() => console.log('fas')}
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
  buttonContainer: {
    paddingTop: 20,
  },
});
