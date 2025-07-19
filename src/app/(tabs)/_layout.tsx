import { useEffect } from 'react';
import { Link, Redirect, Tabs } from 'expo-router';
import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '~/src/hooks/useAuth';
import { APP_COLOR } from '~/src/constants/Colors';

export default function TabLayout() {
  const { session, isReady } = useAuth();

  // Wait until auth is loaded
  if (!isReady) return null;

  // Redirect to login if not authenticated
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_COLOR.PRIMARY_COLOR,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
