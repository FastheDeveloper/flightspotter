import { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import AppText from '../components/AppText/AppText';
import PaperPlane from '../assets/svgs/PaperPlane';
import ArrowLeftIcon from '../assets/svgs/ArrowLeftIcon';
import { APP_COLOR } from '../constants/Colors';
import { useFlightStore } from '../store/useFlightStore';
import { fetchIncompleteSearch } from '../services/fetchIncompleteFlight';
import { Skeleton } from '@rneui/themed';

const FlightSearch = () => {
  const { from, to, sessionId, departureDate, returnDate } = useFlightStore();
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date | null) =>
    date
      ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date.getFullYear()}`
      : '';

  useFocusEffect(
    useCallback(() => {
      const loadFlights = async () => {
        if (!sessionId) return;
        try {
          setLoading(true);
          const data = await fetchIncompleteSearch(sessionId);
          setFlights(data);
        } catch (err) {
          console.error('Error loading flight results:', err);
        } finally {
          setLoading(false);
        }
      };

      loadFlights();
    }, [sessionId])
  );

  return (
    <SafeAreaView className="bg-APP_BACKGROUND flex-1 px-4 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <ArrowLeftIcon width={16} height={16} onPress={() => router.back()} color="black" />
          </View>
          <View className="mx-4 flex-1 items-center">
            <AppText className="font-POPPINS_SEMIBOLD text-2xl">
              {from?.skyId} - {to?.skyId}
            </AppText>
            <AppText className="text-xs" placeholder>
              {formatDate(departureDate)} {returnDate ? `- ${formatDate(returnDate)}` : ''}
            </AppText>
          </View>
          <View className="rounded-3xl border border-gray-300 bg-white p-3">
            <AntDesign name="filter" size={16} color="black" />
          </View>
        </View>

        {/* Flight Results */}
        {loading ? (
          // Render 3 skeleton placeholders
          [1, 2, 3].map((_, index) => (
            <View key={index} className="mb-6 rounded-xl border border-gray-300 bg-white p-4">
              {/* Top Row */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <Skeleton circle width={60} height={60} />
                  <View>
                    <Skeleton width={80} height={20} style={{ marginBottom: 4 }} />
                    <Skeleton width={60} height={16} />
                  </View>
                </View>
                <Skeleton width={50} height={20} />
              </View>

              {/* Flight Details Row */}
              <View className="mt-4 flex-row items-center justify-between">
                <View>
                  <Skeleton width={40} height={30} style={{ marginBottom: 4 }} />
                  <Skeleton width={60} height={16} />
                  <Skeleton width={50} height={16} />
                </View>
                <View className="items-center">
                  <Skeleton width={24} height={24} style={{ borderRadius: 12 }} />
                  <Skeleton width={60} height={16} style={{ marginTop: 4 }} />
                </View>
                <View>
                  <Skeleton width={40} height={30} style={{ marginBottom: 4 }} />
                  <Skeleton width={60} height={16} />
                  <Skeleton width={50} height={16} />
                </View>
              </View>
            </View>
          ))
        ) : (
          <>
            {flights.map((flight) => {
              const leg = flight.legs[0];
              const airline = leg.carriers.marketing[0];
              const segment = leg.segments[0];

              return (
                <Pressable
                  key={flight.id}
                  onPress={() =>
                    router.push({
                      pathname: '/FlightDetails',
                      params: { flight: JSON.stringify(flight) }, // Pass serialized flight
                    })
                  }
                  className="mb-6 rounded-xl border border-gray-300 bg-white p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <Image source={{ uri: airline.logoUrl }} width={60} height={60} />
                      <View>
                        <AppText>{airline.name}</AppText>
                        <AppText>{segment.flightNumber}</AppText>
                      </View>
                    </View>
                    <AppText className="text-PRIMARY_COLOR text-lg">
                      {flight.price.formatted}
                    </AppText>
                  </View>

                  <View className="mt-4 flex-row items-center justify-between">
                    <View>
                      <AppText className="text-PRIMARY_COLOR text-3xl">
                        {leg.origin.displayCode}
                      </AppText>
                      <AppText className="text-xs text-gray-700">{leg.origin.city}</AppText>
                      <AppText className="text-xs text-gray-700">
                        {new Date(leg.departure).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </AppText>
                    </View>

                    <View className="items-center">
                      <PaperPlane width={24} height={24} color={APP_COLOR.PRIMARY_COLOR} />
                      <AppText className="text-xs text-gray-700">
                        {Math.floor(leg.durationInMinutes / 60)}h{leg.durationInMinutes % 60}m
                      </AppText>
                    </View>

                    <View>
                      <AppText className="text-PRIMARY_COLOR text-3xl">
                        {leg.destination.displayCode}
                      </AppText>
                      <AppText className="text-xs text-gray-700">{leg.destination.city}</AppText>
                      <AppText className="text-xs text-gray-700">
                        {new Date(leg.arrival).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </AppText>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightSearch;
