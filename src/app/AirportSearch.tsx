import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from '../assets/svgs/Closeicon';
import AppText from '../components/AppText/AppText';
import PaperPlane from '../assets/svgs/PaperPlane';
import { APP_COLOR } from '../constants/Colors';
import AppInput from '../components/AppInput/AppInput';
import SearchIcon from '../assets/svgs/Searchicon';
import { Divider } from '../components/Divider/Divider';
import { router } from 'expo-router';
import { searchAirports } from '~/src/services/airportServices';
import { useFlightStore } from '../store/useFlightStore';
import { Skeleton } from '@rneui/themed';

type AirportResult = {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    subtitle: string;
  };
};

const AirportSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AirportResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'from' | 'to'>('from');

  const { from, to, setFrom, setTo } = useFlightStore();

  useEffect(() => {
    if (!query) return;

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchAirports(query);
        setResults(res);
      } catch (e) {
        console.error('Error fetching airports:', e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (airport: AirportResult) => {
    const formatted = {
      title: airport.presentation.title,
      subtitle: airport.presentation.subtitle,
      skyId: airport.skyId,
      entityId: airport.entityId,
    };
    setResults([]);
    if (step === 'from') {
      setFrom(formatted);
      setQuery('');
      setStep('to');
    } else {
      setTo(formatted);
      router.back();
    }
  };

  const renderAirportItem = ({ item }: { item: AirportResult }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      className="bg-APP_BACKGROUND mb-3 rounded-2xl border border-gray-300 px-4 py-6">
      <View className="flex-row items-center justify-between">
        <View>
          <AppText className="font-POPPINS_SEMIBOLD text-xl">{item.presentation.title}</AppText>
          <AppText placeholder className="text-sm">
            {item.presentation.subtitle}
          </AppText>
        </View>
        <AppText className="text-PRIMARY_COLOR text-xl">{item.skyId}</AppText>
      </View>
    </TouchableOpacity>
  );

  const renderSkeletonItem = (_: any, index: number) => (
    <View
      key={index}
      className="bg-APP_BACKGROUND mb-3 rounded-2xl border border-gray-300 px-4 py-6">
      <View className="flex-row items-center justify-between">
        <View>
          <Skeleton width={180} height={20} style={{ marginBottom: 6 }} />
          <Skeleton width={140} height={14} />
        </View>
        <Skeleton width={50} height={20} />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white py-6">
      <View className="flex-row items-center justify-between px-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-3xl border border-gray-300 bg-white p-4">
          <CloseIcon width={16} height={13} />
        </TouchableOpacity>
        <View>
          <AppText header className="text-lg ">
            {step === 'from' ? 'Departure' : 'Destination'}
          </AppText>
          {/* <AppText className="text-PRIMARY_COLOR font-POPPINS_SEMIBOLD text-lg">
            {step === 'from' ? from?.skyId || '' : to?.skyId || ''}
          </AppText> */}
        </View>
        <View className="bg-SECONDARY_COLOR rounded-3xl border border-gray-300 p-2">
          <PaperPlane width={24} height={24} color={APP_COLOR.PRIMARY_COLOR} />
        </View>
      </View>

      <Divider height={35} />

      <View className="px-6">
        <AppInput
          placeholder={`Search ${step === 'from' ? 'Departure' : 'Destination'} Airport/City`}
          leftIcon={<SearchIcon width={16} height={16} color={APP_COLOR.PLACEHOLDER_TEXT} />}
          value={query}
          onChangeText={setQuery}
        />

        <Divider height={15} />
        {loading ? (
          <View>{[1, 2, 3, 4].map(renderSkeletonItem)}</View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.skyId}
            renderItem={renderAirportItem}
            ListEmptyComponent={
              <AppText className="mt-4 text-gray-500">No airports found.</AppText>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AirportSearch;

const styles = StyleSheet.create({});
