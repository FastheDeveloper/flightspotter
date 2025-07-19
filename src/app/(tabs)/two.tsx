import { AntDesign } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from '~/src/assets/svgs/ArrowLeftIcon';
import CaretDown from '~/src/assets/svgs/CaretDown';
import PaperPlane from '~/src/assets/svgs/PaperPlane';
import AppText from '~/src/components/AppText/AppText';
import { Divider } from '~/src/components/Divider/Divider';
import Footer from '~/src/components/Footer/Footer';

import { ScreenContent } from '~/src/components/ScreenContent';
import { APP_COLOR } from '~/src/constants/Colors';
import { useAuth } from '~/src/contexts/AuthContext';
import { logout } from '~/src/utils/logout';

export default function Home() {
  const { session } = useAuth();
  return (
    <SafeAreaView className="bg-APP_BACKGROUND flex-1 ">
      <ScrollView contentContainerClassName="flex-grow " showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between px-4">
          {/* Back Button */}
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <ArrowLeftIcon
              width={16}
              height={16}
              onPress={() => router.navigate('/(tabs)')}
              color="black"
            />
          </View>

          {/* Flight Info */}
          <View className="mx-4 flex-1 items-center">
            <AppText className="font-POPPINS_SEMIBOLD text-2xl">My Profile</AppText>
          </View>

          {/* Filter Icon */}
          <View className="rounded-3xl border border-transparent bg-transparent p-3">
            <AntDesign name="filter" size={16} color="transparent" />
          </View>
        </View>

        <View className="items-center">
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="h-40 w-40 rounded-full" />
          <AppText header className="py-5">
            {session?.user.email}
          </AppText>
        </View>

        <Footer className="bg-PRIMARY_COLOR rounded-t-3xl px-2 py-4">
          <Divider height={15} />

          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Edit Profile
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Passenger list
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                My Voucher
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Payment Method
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Settings
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Help and support
              </AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">{`>`}</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => logout()}>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-2xl">
                Logout
              </AppText>
            </Pressable>
          </View>
        </Footer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
