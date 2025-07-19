import { Pressable, ScrollView, StyleSheet, Image, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import ArrowLeftIcon from '../assets/svgs/ArrowLeftIcon';
import AppText from '../components/AppText/AppText';
import PaperPlane from '../assets/svgs/PaperPlane';
import { Divider } from '../components/Divider/Divider';
import { APP_COLOR } from '../constants/Colors';
import Footer from '../components/Footer/Footer';
import AppButton from '../components/BaseButton';
import { useFlightStore } from '../store/useFlightStore';

const FlightDetails = () => {
  const { flight } = useLocalSearchParams();
  const { noOfPassengers, reset } = useFlightStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const parsedFlight = flight ? JSON.parse(flight as string) : null;
  const leg = parsedFlight?.legs?.[0];
  const airline = leg?.carriers?.marketing?.[0];
  const segment = leg?.segments?.[0];
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F']; // fallback seats
  const seatRow = 23; // example row
  const passengerCount = Math.max(Number(noOfPassengers) || 1, 1);
  const totalPrice = parsedFlight.price.raw * passengerCount;

  const handleContinue = () => {
    setShowSuccessModal(true);
    reset();
    setTimeout(() => {
      setShowSuccessModal(false);
      router.replace('/(tabs)'); // Or `router.push('/')` depending on your needs
    }, 2000); // delay before navigating
  };

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
                <Image source={{ uri: airline.logoUrl }} width={60} height={60} />
                <View>
                  <AppText>{airline.name}</AppText>
                  <AppText>
                    {segment.operatingCarrier.displayCode}-{segment.flightNumber}
                  </AppText>
                </View>
              </View>

              <AppText className="  text-PRIMARY_COLOR rounded-xl p-2 text-lg">
                ${parsedFlight.price.raw}
              </AppText>
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <AppText className="text-PRIMARY_COLOR font-POPPINS_MEDIUM text-3xl">
                  {leg.origin.displayCode}
                </AppText>
                <AppText className="text-sm text-gray-700">{leg.origin.city}</AppText>
                <Divider height={7} />

                <AppText className="text-xs text-gray-700">
                  {new Date(leg.departure).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </AppText>
              </View>

              <View className="items-center">
                <PaperPlane width={24} height={24} color={APP_COLOR.PRIMARY_COLOR} />
                <Divider height={3} />
                <AppText className="text-xs text-gray-700">{`${Math.floor(leg.durationInMinutes / 60)}h ${leg.durationInMinutes % 60}m`}</AppText>
                <Divider height={3} />
                {/* <AppText className="text-xs text-gray-700">One Trip • 3 Seats</AppText> */}
              </View>

              <View className="items-end">
                <AppText className="text-PRIMARY_COLOR font-POPPINS_MEDIUM text-3xl">
                  {leg.destination.displayCode}
                </AppText>

                <Divider height={7} />

                <AppText className=" text-xs text-gray-700">
                  {new Date(leg.arrival).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </AppText>
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
              <AppText className="text-xl">
                {new Date(leg.departure).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </AppText>
            </View>
            <View className="items-center">
              <AppText placeholder className="text-xs">
                {' '}
                Estimated time
              </AppText>
              <AppText className="text-xl">
                {new Date(leg.departure).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </AppText>
            </View>
            <View className="items-end">
              <AppText placeholder className="text-xs">
                {' '}
                Flight number
              </AppText>
              <AppText className="text-xl">
                {segment.operatingCarrier.displayCode}-{segment.flightNumber}
              </AppText>
            </View>
          </View>

          <Divider height={15} />

          <Divider height={0.2} bgColor="gray" />
          <Divider height={15} />
          <View className="flex-row justify-between">
            <AppText className="text-lg">Passengers</AppText>
            <AppText className="text-PRIMARY_COLOR">
              {noOfPassengers} Adult{Number(noOfPassengers) > 1 ? 's' : ''}
            </AppText>
          </View>
          <Divider height={15} />

          {Array.from({ length: passengerCount }).map((_, index) => (
            <View key={index} className="flex-row items-start justify-between">
              <View>
                <AppText className="text-lg">Adult {index + 1}</AppText>
                <AppText className="text-sm" placeholder>
                  Economy class - A3
                </AppText>
              </View>
              <AppText className="text-PRIMARY_COLOR">
                {seatRow}
                {seatLetters[index % seatLetters.length]}
              </AppText>
            </View>
          ))}
          <Divider height={15} />
        </View>

        <View>
          <View className="my-7 flex-row items-center justify-between">
            <AppText placeholder className="text-2xl">
              Passenger {noOfPassengers}x
            </AppText>
            <AppText className="text-2xl">${parsedFlight.price.raw}</AppText>
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
            <AppText className="text-PRIMARY_COLOR text-2xl">${totalPrice.toFixed(2)}</AppText>
          </View>
        </View>

        <Footer>
          <AppButton label="Continue" className="my-6 rounded-3xl" onPress={handleContinue} />
        </Footer>
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View className="flex-1 items-center justify-center bg-black/30">
            <View className="w-[80%] rounded-xl bg-white p-6 shadow-md">
              <AppText className="font-POPPINS_SEMIBOLD text-PRIMARY_COLOR text-center text-xl">
                Booking Successful!
              </AppText>
              <AppText className="mt-2 text-center text-gray-500">Redirecting to home...</AppText>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightDetails;

const styles = StyleSheet.create({});
