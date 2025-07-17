import { Stack } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import AppInput from '~/src/components/AppInput/AppInput';
import AppText from '~/src/components/AppText/AppText';
import AppButton from '~/src/components/BaseButton';
import CheckboxWithLabel from '~/src/components/CheckBox/CheckBox';

import { ScreenContent } from '~/src/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        {/* <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" /> */}
        <AppButton label={'FSD'} leftIcon={'check'} />
        <AppText>dfd</AppText>
        <AppInput label="Fas" placeholder="place" />
        <AppInput label="Fas" placeholder="place" errorMessage={'FAS'} />
        <CheckboxWithLabel label="da" isChecked={true} onToggle={() => console.log('fas')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
