import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import ArrowLeftIcon from '../assets/svgs/ArrowLeftIcon';
import { AntDesign } from '@expo/vector-icons';
import AppText from '../components/AppText/AppText';
import { Divider } from '../components/Divider/Divider';
import PaperPlane from '../assets/svgs/PaperPlane';
import { APP_COLOR } from '../constants/Colors';

const FlightSearch = () => {
  return (
    <SafeAreaView className="bg-APP_BACKGROUND flex-1 px-4 py-6">
      <ScrollView contentContainerClassName="flex-grow " showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          {/* Back Button */}
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <ArrowLeftIcon width={16} height={16} onPress={() => router.back()} color="black" />
          </View>

          {/* Flight Info */}
          <View className="mx-4 flex-1 items-center">
            <AppText className="font-POPPINS_SEMIBOLD text-2xl">JFK - LOS</AppText>
            <AppText className="text-xs  " placeholder>
              May 11, 2023 - May 23, 2023
            </AppText>
          </View>

          {/* Filter Icon */}
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <AntDesign name="filter" size={16} color="black" />
          </View>
        </View>

        <View className="rounded-xl border border-gray-300 bg-white p-4">
          <View className="flex-row justify-between">
            <AppText className="bg-SECONDARY_COLOR text-PRIMARY_COLOR rounded-xl p-2 text-lg">
              Economy
            </AppText>
            <AppText className="  text-PRIMARY_COLOR rounded-xl p-2 text-lg">$160 - $200</AppText>
          </View>
          <Divider height={15} />
          <Divider height={0.5} bgColor="gray" />
          <Divider height={15} />
          <Pressable onPress={() => router.navigate('/FlightDetails')}>
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
          <View>
            <View className=" flex-row items-center justify-between ">
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: 'https://logos.skyscnr.com/images/airlines/favicon/%7ED.png' }}
                  width={60}
                  height={60}
                />
                <View>
                  <AppText>CitiLink</AppText>
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
          </View>
        </View>
        <Divider height={30} />
        <View className="rounded-xl border border-gray-300 bg-white p-4">
          <View className="flex-row justify-between">
            <AppText className="bg-PRIMARY_COLOR text-SECONDARY_COLOR rounded-xl p-2 text-lg">
              Business Class
            </AppText>
            <AppText className="  text-PRIMARY_COLOR rounded-xl p-2 text-lg">$160 - $200</AppText>
          </View>
          <Divider height={15} />
          <Divider height={0.5} bgColor="gray" />
          <Divider height={15} />
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
          <Divider height={15} />

          <Divider height={0.5} bgColor="gray" />
          <Divider height={15} />
          <View>
            <View className=" flex-row items-center justify-between ">
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: 'https://logos.skyscnr.com/images/airlines/favicon/%7ED.png' }}
                  width={60}
                  height={60}
                />
                <View>
                  <AppText>CitiLink</AppText>
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
          </View>
        </View>
        <Divider height={30} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightSearch;

const styles = StyleSheet.create({});
