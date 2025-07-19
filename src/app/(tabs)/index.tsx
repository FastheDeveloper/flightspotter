import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import AppText from '~/src/components/AppText/AppText';
import AppButton from '~/src/components/BaseButton';
import AppInput from '~/src/components/AppInput/AppInput';
import FlightDatePicker from '~/src/components/DynamicDatePicter';
import { useCurrentLocation } from '~/src/hooks/useCurrentLocation';
import { useReverseGeocoding } from '~/src/hooks/useReverseGeocoding';
import { useAuth } from '~/src/contexts/AuthContext';

import NotiIcons from '~/src/assets/svgs/Notification';
import CalenderIcon from '~/src/assets/svgs/CalendarIcon';
import ArrowRightIcon from '~/src/assets/svgs/ArrowRightIcon';
import RoundTrip from '~/src/assets/svgs/Cycle';
import OriginIcon from '~/src/assets/svgs/Origin';
import Marker from '~/src/assets/svgs/Marker';
import Switch from '~/src/assets/svgs/Switch';
import SmallCalendar from '~/src/assets/svgs/SmallCalendar';
import Avataricon from '~/src/assets/svgs/Avatar';
import BigPlane from '~/src/assets/svgs/BigPlane';
import PaperPlane from '~/src/assets/svgs/PaperPlane';
import Footer from '~/src/components/Footer/Footer';
import CaretDown from '~/src/assets/svgs/CaretDown';
import { Divider } from '~/src/components/Divider/Divider';
import { APP_COLOR } from '~/src/constants/Colors';

export default function HomeScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isFromPressed, setIsFromPressed] = useState(false);
  const [isOneWay, setIsOneWay] = useState(true);
  const [serchingFlights, setSearchingFlight] = useState(false);
  const { location, errorMsg } = useCurrentLocation();
  const { place } = useReverseGeocoding(location?.lat ?? null, location?.lng ?? null);

  const handleFlightSearch = () => {
    setSearchingFlight(true);
    // if (!from || !to || !departureDate) {
    //   Alert.alert('Missing Fields', 'Please fill in all required fields.');
    //   return;
    // }
    setTimeout(() => {
      setSearchingFlight(false);
      router.navigate('/FlightSearch');
    }, 3000);
    console.log('Searching flights with:', { from, to, departureDate, returnDate });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView contentContainerClassName="flex-grow pt-14" showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@src/assets/images/bgWing.png')}
          resizeMode="cover"
          className="p-5">
          <View className="flex-row items-center justify-between">
            <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="h-8 w-8 rounded-lg" />
            <View className="flex-row items-center gap-4">
              <View className="border-PRIMARY_COLOR rounded-lg border bg-white p-1">
                <NotiIcons width={24} height={24} />
              </View>
              <View className="bg-PRIMARY_COLOR rounded-lg border p-1">
                <CalenderIcon width={24} height={24} color="white" />
              </View>
            </View>
          </View>

          <AppText className="font-POPPINS_SEMIBOLD mt-4 text-2xl">Where are you</AppText>
          <AppText className="font-POPPINS_SEMIBOLD mb-4 text-2xl">taking a flight to?</AppText>

          <Pressable onPress={() => router.navigate('/AirportSearch')}>
            <AppInput
              placeholder="City or Airport"
              value={from}
              onChangeText={setFrom}
              onFocus={() => setIsFromPressed(true)}
              onBlur={() => setIsFromPressed(false)}
              style={{
                backgroundColor: isFromPressed ? '#ffffff' : '#ffffff80',
                borderColor: APP_COLOR.PRIMARY_COLOR,
              }}
              placeholderTextColor={APP_COLOR.PRIMARY_COLOR}
              disabled
            />
          </Pressable>
          <View className="mt-4 flex-row justify-between">
            <AppButton
              label="One Way"
              leftIcon={<ArrowRightIcon color={isOneWay ? 'white' : APP_COLOR.PRIMARY_COLOR} />}
              className="w-[45%] rounded-3xl"
              variant={isOneWay ? 'primary' : 'secondary'}
              onPress={() => setIsOneWay(true)}
            />
            <AppButton
              label="Round Trip"
              leftIcon={
                <View className="rounded-full bg-[#FBD0A0] p-1">
                  <RoundTrip color={APP_COLOR.PRIMARY_COLOR} width={16} height={16} />
                </View>
              }
              className="w-[45%] rounded-3xl"
              variant={!isOneWay ? 'primary' : 'secondary'}
              onPress={() => setIsOneWay(false)}
            />
          </View>
        </ImageBackground>

        <View className="p-6">
          {/* FROM/TO Summary */}
          <View className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white py-2 pl-6">
            <View className="gap-4">
              <View className="flex-row items-center gap-4">
                <View className="bg-PRIMARY_COLOR rounded-xl p-3">
                  <OriginIcon width={16} height={16} color="white" />
                </View>
                <View>
                  <AppText placeholder className="mb-[-4]">
                    From
                  </AppText>
                  <AppText>Orlando Bloom</AppText>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="items-center rounded-xl bg-[#FBD0A0] p-3">
                  <Marker width={14} height={16} color={APP_COLOR.PRIMARY_COLOR} />
                </View>
                <View>
                  <AppText placeholder className="mb-[-4]">
                    To
                  </AppText>
                  <AppText>Los Angeles</AppText>
                </View>
              </View>
            </View>

            <View className="mr-4 rounded-full bg-gray-400">
              <Switch width={24} height={24} />
            </View>
          </View>

          {/* Date + Passenger */}
          <View className="mt-4 flex-row items-center justify-between">
            <View className="h-16 flex-row items-center gap-4 rounded-lg border border-gray-300 bg-white px-4">
              <View className="bg-SECONDARY_COLOR my-2 rounded-lg p-2">
                <SmallCalendar color={APP_COLOR.PRIMARY_COLOR} width={16} height={16} />
              </View>
              <View className="mt-6">
                <FlightDatePicker
                  datePickerProps={{ mode: 'single' }}
                  onChange={(selected) => {
                    if (selected.mode === 'single') setDepartureDate(selected.date);
                  }}
                  inputProps={{ label: 'Date' }}
                />
              </View>
            </View>

            <View className="h-16 flex-row items-center gap-4 rounded-lg border border-gray-300 bg-white px-4">
              <View className="bg-SECONDARY_COLOR my-2 rounded-lg p-2">
                <Avataricon color={APP_COLOR.PRIMARY_COLOR} width={13} height={16} />
              </View>
              <View className="mt-2">
                <AppInput
                  label="No of Passengers"
                  placeholder="0"
                  value={from}
                  onChangeText={setFrom}
                  keyboardType="numeric"
                  labelClassname="font-POPPINS_MEDIUM text-gray-400 text-sm"
                  style={{
                    borderColor: 'transparent',
                    paddingVertical: -6,
                    paddingLeft: -1,
                    marginVertical: -21,
                  }}
                />
              </View>
            </View>
          </View>
          {!isOneWay && (
            <>
              <Divider height={15} />
              <View className="h-16 flex-row items-center gap-4 rounded-lg border border-gray-300 bg-white px-4">
                <View className="bg-SECONDARY_COLOR my-2 rounded-lg p-2">
                  <SmallCalendar color={APP_COLOR.PRIMARY_COLOR} width={16} height={16} />
                </View>
                <View className="mt-6">
                  <FlightDatePicker
                    datePickerProps={{ mode: 'single' }}
                    onChange={(selected) => {
                      if (selected.mode === 'single') setReturnDate(selected.date);
                    }}
                    inputProps={{ label: 'Return Date' }}
                  />
                </View>
              </View>
            </>
          )}

          <AppButton
            label="Find A Flight"
            rightIcon={<BigPlane color="white" width={24} height={24} />}
            className="my-6 rounded-3xl"
            onPress={handleFlightSearch}
            loading={serchingFlights}
          />
        </View>

        {/* Footer Flight Card */}
        <Footer className="bg-PRIMARY_COLOR rounded-t-xl px-2 py-4">
          <View className="flex-row items-center justify-between">
            <AppText className="text-xl text-white">Upcoming flights</AppText>
            <View className="flex-row items-center">
              <AppText className="font-POPPINS_REGULAR text-sm text-gray-200">Newest</AppText>
              <CaretDown width={24} height={24} color="white" />
            </View>
          </View>

          <Divider height={15} />

          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">MCO</AppText>
              <AppText className="text-sm text-gray-100">Orlando</AppText>
              <Divider height={7} />
              <AppText className="text-xs text-gray-100">Date:</AppText>
              <AppText className="text-xs text-gray-100">May 11, 5:34pm</AppText>
            </View>

            <View className="items-center">
              <PaperPlane width={24} height={24} color={APP_COLOR.SECONDARY_COLOR} />
              <Divider height={3} />
              <AppText className="text-xs text-gray-100">1h43m</AppText>
              <Divider height={3} />
              <AppText className="text-xs text-gray-100">One Trip • 3 Seats</AppText>
            </View>

            <View>
              <AppText className="text-SECONDARY_COLOR font-POPPINS_MEDIUM text-3xl">LAX</AppText>
              <AppText className="text-sm text-gray-100">Los Angeles</AppText>
              <Divider height={7} />
              <AppText className="text-xs text-gray-100">Passenger:</AppText>
              <AppText className="text-xs text-gray-100">2 Seats</AppText>
            </View>
          </View>

          <Divider height={15} />
          <Divider height={0.8} bgColor="#FBD0A040" />
        </Footer>
      </ScrollView>
    </SafeAreaView>
  );
}
