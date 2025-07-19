import { Pressable, ScrollView, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import ArrowLeftIcon from '../assets/svgs/ArrowLeftIcon';
import AppText from '../components/AppText/AppText';
import PaperPlane from '../assets/svgs/PaperPlane';
import { Divider } from '../components/Divider/Divider';
import { APP_COLOR } from '../constants/Colors';
import Footer from '../components/Footer/Footer';
import AppButton from '../components/BaseButton';

const FlightDetails = () => {
  return (
    <SafeAreaView className="bg-APP_BACKGROUND flex-1 px-4 py-6">
      <ScrollView contentContainerClassName="flex-grow " showsVerticalScrollIndicator={false}>
        <View className="mb-6 flex-row items-center justify-between">
          {/* Back Button */}
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <ArrowLeftIcon width={16} height={16} onPress={() => router.back()} color="black" />
          </View>

          {/* Flight Info */}
          <View className="mx-4 flex-1 items-center">
            <AppText className="font-POPPINS_SEMIBOLD text-2xl">Booking details</AppText>
          </View>

          {/* Filter Icon */}
          <View className="rounded-3xl  border-gray-300   p-3">
            <AntDesign name="filter" size={16} color="transparent" />
          </View>
        </View>

        <View className="rounded-xl border border-gray-300 bg-white p-4">
          <Pressable>
            <View className=" flex-row items-center justify-between ">
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: 'https://logos.skyscnr.com/images/airlines/favicon/A_.png' }}
                  width={60}
                  height={60}
                />
                <View>
                  <AppText>Lion air</AppText>
                  <AppText>JT-7390</AppText>
                </View>
              </View>

              <AppText className="  text-PRIMARY_COLOR rounded-xl p-2 text-lg">$200</AppText>
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <AppText className="text-PRIMARY_COLOR font-POPPINS_MEDIUM text-3xl">MCO</AppText>
                <AppText className="text-sm text-gray-700">Orlando</AppText>
                <Divider height={7} />

                <AppText className="text-xs text-gray-700">5:34 pm</AppText>
              </View>

              <View className="items-center">
                <PaperPlane width={24} height={24} color={APP_COLOR.PRIMARY_COLOR} />
                <Divider height={3} />
                <AppText className="text-xs text-gray-700">1h43m</AppText>
                <Divider height={3} />
                <AppText className="text-xs text-gray-700">One Trip • 3 Seats</AppText>
              </View>

              <View>
                <AppText className="text-PRIMARY_COLOR font-POPPINS_MEDIUM text-3xl">LAX</AppText>

                <Divider height={7} />

                <AppText className="text-xs text-gray-700">10:32 am</AppText>
              </View>
            </View>
          </Pressable>
          <Divider height={15} />

          <Divider height={0.5} bgColor="gray" />
          <Divider height={15} />
          <View className="flex-row items-center justify-between">
            <View className="items-start">
              <AppText placeholder className="text-xs">
                {' '}
                Flight Date
              </AppText>
              <AppText className="text-xl"> May 11, 2023</AppText>
            </View>
            <View className="items-center">
              <AppText placeholder className="text-xs">
                {' '}
                Estimated time
              </AppText>
              <AppText className="text-xl"> 10:24</AppText>
            </View>
            <View className="items-end">
              <AppText placeholder className="text-xs">
                {' '}
                Flight number
              </AppText>
              <AppText className="text-xl"> XJFK43</AppText>
            </View>
          </View>

          <Divider height={15} />

          <Divider height={0.2} bgColor="gray" />
          <Divider height={15} />
          <View className="flex-row justify-between">
            <AppText className="text-lg">Passengers</AppText>
            <AppText className="text-PRIMARY_COLOR">2 Adults</AppText>
          </View>
          <Divider height={15} />

          <View className="flex-row items-start justify-between">
            <View>
              <AppText className="text-lg">Adult 1</AppText>
              <AppText className="text-sm" placeholder>
                Economy class - A3
              </AppText>
            </View>
            <AppText className="text-PRIMARY_COLOR">23A</AppText>
          </View>
          <Divider height={15} />

          <View className="flex-row items-start justify-between">
            <View>
              <AppText className="text-lg">Adult 2</AppText>
              <AppText className="text-sm" placeholder>
                Economy class - A3
              </AppText>
            </View>
            <AppText className="text-PRIMARY_COLOR">23B</AppText>
          </View>
        </View>

        <View>
          <View className="my-7 flex-row items-center justify-between">
            <AppText placeholder className="text-2xl">
              Passenger 2X
            </AppText>
            <AppText className="text-2xl">$200</AppText>
          </View>

          <View className="my-1 flex-row items-center justify-between">
            <AppText placeholder className="text-2xl">
              Discount
            </AppText>
            <AppText className="text-2xl">$0</AppText>
          </View>
          <Divider height={15} />

          <Divider height={1} bgColor="gray" />
          <Divider height={15} />

          <View className="my-1 flex-row items-center justify-between">
            <AppText className="text-2xl">Grand total</AppText>
            <AppText className="text-PRIMARY_COLOR text-2xl">$400</AppText>
          </View>
        </View>

        <Footer>
          <AppButton label="Continue" className="my-6 rounded-3xl" />
        </Footer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightDetails;

const styles = StyleSheet.create({});
