import '../../global.css';

import { Redirect, Stack, useRouter } from 'expo-router';
// import { vexo } from "vexo-analytics";

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FONT_NAMES } from '../constants/fontNames';
import AuthProvider, { useAuth } from '../providers/AuthProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ActivityIndicator } from 'react-native';

import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
const queryClient = new QueryClient();
// Prevent the splash screen from auto-hiding before asset loading is complete.

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 600,
  fade: true,
});

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#ddd' }}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
      text2Style={{ fontSize: 14, color: '#ddd' }}
    />
  ),
};

function AppContent() {
  useReactQueryDevTools(queryClient);
  const {
    hasBeenUsed,
    isAuthenticated,
    isFirstUse,
    checkAuthStatus,
    authToken,
    authChecked,
    getUserSession,
  } = useAuth();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus(); // Ensure auth status is checked on mount
    };

    initializeAuth(); // Call the async function
  }, [checkAuthStatus]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <KeyboardProvider>
          <AppContent />
        </KeyboardProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
