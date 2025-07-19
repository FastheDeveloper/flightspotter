import '../../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

import { AuthContextProvider } from '../contexts/AuthContext';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
SplashScreen.setOptions({
  duration: 600,
  fade: true,
});

const queryClient = new QueryClient();

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <KeyboardProvider>
          <AppContent />
        </KeyboardProvider>
      </AuthContextProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
