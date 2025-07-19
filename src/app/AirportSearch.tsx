import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from '../assets/svgs/Closeicon';
import AppText from '../components/AppText/AppText';
import AirplaneIcon from '../assets/svgs/Airplane';
import BigPlane from '../assets/svgs/BigPlane';
import PaperPlane from '../assets/svgs/PaperPlane';
import { APP_COLOR } from '../constants/Colors';
import AppInput from '../components/AppInput/AppInput';
import SearchIcon from '../assets/svgs/Searchicon';
import { Divider } from '../components/Divider/Divider';

const AirportSearch = () => {
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('ABV');
  const [originText, setOriginText] = useState('');
  return (
    <SafeAreaView className=" flex-1 bg-white py-6">
      <View className="flex-row items-center justify-between ">
        <View className="flex-1 flex-row items-center justify-evenly  ">
          <View className="rounded-3xl border border-gray-300 bg-white p-4">
            <CloseIcon width={16} height={13} />
          </View>
          <View>
            <AppText header className={origin ? `text-sm text-gray-400` : `text-lg`}>
              Flying From
            </AppText>
            {origin && <AppText className="text-PRIMARY_COLOR">{origin}</AppText>}
          </View>
          <View className="bg-SECONDARY_COLOR rounded-3xl border border-gray-300 p-2">
            <PaperPlane width={24} height={24} color={APP_COLOR.PRIMARY_COLOR} />
          </View>

          <View>
            <AppText header className="text-lg">
              Flying To
            </AppText>
            {destination && <AppText>{destination}</AppText>}
          </View>
        </View>
      </View>
      <Divider height={35} />
      <View className=" px-6">
        <AppInput
          placeholder="Search Departure Airport/City"
          leftIcon={<SearchIcon width={16} height={16} color={APP_COLOR.PLACEHOLDER_TEXT} />}
          value={originText}
          onChangeText={setOriginText}
        />
        <Divider height={15} />
        <AppText className="font-POPPINS_SEMIBOLD">Nearest airport</AppText>

        <View className="bg-APP_BACKGROUND rounded-2xl border border-gray-300 px-4 py-6">
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="font-POPPINS_SEMIBOLD text-xl">Orlando, USA</AppText>
              <AppText placeholder className="  text-sm">
                Orlando, Airport
              </AppText>
            </View>

            <AppText placeholder className="  text-PRIMARY_COLOR text-xl">
              JFK
            </AppText>
          </View>
        </View>

        <Divider height={15} />
        <AppText className="font-POPPINS_SEMIBOLD">Past Searches</AppText>

        <View className="bg-APP_BACKGROUND rounded-2xl border border-gray-300 px-4 py-6">
          <View className="flex-row items-center justify-between">
            <View>
              <AppText className="font-POPPINS_SEMIBOLD text-xl">Orlando, USA</AppText>
              <AppText placeholder className="  text-sm">
                Orlando, Airport
              </AppText>
            </View>

            <AppText placeholder className="  text-PRIMARY_COLOR text-xl">
              JFK
            </AppText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AirportSearch;

const styles = StyleSheet.create({});
