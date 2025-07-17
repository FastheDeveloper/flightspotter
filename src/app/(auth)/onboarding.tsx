import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

import AppText from '~/src/components/AppText/AppText';
import AppButton from '~/src/components/BaseButton';
import Footer from '~/src/components/Footer/Footer';
import { APP_COLOR } from '~/src/constants/Colors';

const Onboarding = () => {
  const { width, height } = Dimensions.get('window');
  // Farouq12@#
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
              <AppText className="font-POPPINS_BOLD text-APP_BACKGROUND text-4xl">Easy Way</AppText>
              <AppText className="font-POPPINS_BOLD text-APP_BACKGROUND text-4xl">
                To Your Next Spot
              </AppText>
              <AppText className="font-POPPINS_BOLD text-APP_BACKGROUND text-xl">
                The world's most popular flight tracker - #1 Travel app in over 150 countries
              </AppText>
            </BlurView>
          </BlurView>
        </View>
      </View>

      {/* Action Buttons & Footer */}
      <View className="bg-APP_BACKGROUND flex-1 px-5 pt-14">
        <View className="mt-10 flex flex-col gap-5">
          <AppButton label="Find a flight" className="rounded-full" />
          <AppButton label="Login" variant="secondary" className="rounded-full" />
        </View>

        <Footer className="items-center">
          <AppText indicator onPress={() => router.replace('/(auth)/signUp')}>
            Don't have an account? <AppText link>Sign Up</AppText>
          </AppText>
        </Footer>
      </View>
    </ScrollView>
  );
};

export default Onboarding;
