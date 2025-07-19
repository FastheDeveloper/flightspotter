import { View, Image, Dimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

import AppText from '~/src/components/AppText/AppText';
import AppButton from '~/src/components/BaseButton';
import Footer from '~/src/components/Footer/Footer';
import { APP_COLOR } from '~/src/constants/Colors';
import { save } from '~/src/utils/secureStorage';
import { STORAGE_KEYS } from '~/src/constants/asyncKeys';

const Onboarding = () => {
  const { width, height } = Dimensions.get('window');

  const handleAction = async (path: any) => {
    await save(STORAGE_KEYS.HAS_APP_BEEN_USED, 'true');
    router.replace(path);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      className="flex-1"
      style={{ width, backgroundColor: APP_COLOR.APP_BACKGROUND }}>
      {/* Top Image & Blur Layer */}
      <View>
        <Image
          source={require('@src/assets/images/airplaneOnboard.jpg')}
          style={{ height: height * 0.65 }}
          className="w-full object-cover"
        />
        <View
          className="absolute top-0 z-10 w-full overflow-hidden"
          style={{ height: height * 0.65, backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <BlurView
            intensity={20}
            tint="regular"
            style={{ height: '100%', width: '100%' }}
            experimentalBlurMethod="none"
            blurReductionFactor={1}>
            <BlurView className="absolute bottom-0 w-full justify-center gap-2 px-4 py-8">
              <AppText className="font-POPPINS_BOLD text-4xl text-white">Easy Way</AppText>
              <AppText className="font-POPPINS_BOLD text-4xl text-white">To Your Next Spot</AppText>
              <AppText className="font-POPPINS_BOLD text-xl text-white">
                The world's most popular flight tracker - #1 Travel app in over 150 countries
              </AppText>
            </BlurView>
          </BlurView>
        </View>
      </View>

      {/* Action Buttons & Footer */}
      <View className="bg-APP_BACKGROUND flex-1 px-5 pt-14">
        <View className="mt-10 flex flex-col gap-5">
          <AppButton
            label="Find a flight"
            className="rounded-full"
            onPress={() => handleAction('/(tabs)')}
          />
          <AppButton
            label="Login"
            variant="secondary"
            className="rounded-full"
            onPress={() => handleAction('/(auth)/login')}
          />
        </View>

        <Footer className="items-center">
          <AppText indicator onPress={() => handleAction('/(auth)/signUp')}>
            Don't have an account? <AppText link>Sign Up</AppText>
          </AppText>
        </Footer>
      </View>
    </ScrollView>
  );
};

export default Onboarding;
