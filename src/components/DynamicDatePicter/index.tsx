import React, { useRef, useState } from 'react';
import { View, Platform, Modal, Pressable, Text } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import ArrowRightIcon from '~/src/assets/svgs/ArrowRightIcon';

import AppInput, { BaseInputProps } from '../AppInput/AppInput';
import DropdownIcon from '~/src/assets/svgs/DropDownIcon';

import AppText from '../AppText/AppText';
import CalenderIcon from '~/src/assets/svgs/CalendarIcon';
import AppButton from '../BaseButton';
import { APP_COLOR } from '~/src/constants/Colors';
import ArrowLeftIcon from '~/src/assets/svgs/ArrowLeftIcon';

export type DatePickerOnChangeParams =
  | { mode: 'single'; date: Date }
  | { mode: 'range'; startDate: Date; endDate: Date }
  | { mode: 'multiple'; dates: Date[] };

export type DatePickerOnChange = (params: DatePickerOnChangeParams) => void;

interface DatePickerProps {
  datePickerProps?: any;
  onChange?: DatePickerOnChange;
  inputProps?: BaseInputProps & { showInitialPlaceholder?: boolean };
}

const convertToDate = (input: string | number | Date | any): Date => {
  if (input instanceof Date) return input;
  if (typeof input === 'string' || typeof input === 'number') return new Date(input);
  if (input?.toDate) return input.toDate();
  return new Date();
};

const CalendarButton = ({ icon }: { icon: React.ReactNode }) => (
  <View className="bg-app-background h-12 w-12 items-center justify-center rounded-full shadow-md">
    <View className="h-full w-full items-center justify-center p-2">{icon}</View>
  </View>
);

export default function FlightDatePicker({
  datePickerProps,
  onChange,
  inputProps,
}: DatePickerProps) {
  const initialDate = datePickerProps?.date ? convertToDate(datePickerProps.date) : null;

  const intialDates = datePickerProps?.dates?.map(convertToDate) || [new Date()];
  const initialRangeDate = {
    startDate: datePickerProps?.startDate ? convertToDate(datePickerProps.startDate) : null,
    endDate: datePickerProps?.endDate ? convertToDate(datePickerProps.endDate) : null,
  };

  const [showInitialPlaceholder, setShowInitialPlaceholder] = useState(
    inputProps?.showInitialPlaceholder || false
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedDates, setSelectedDates] = useState<Date[]>(intialDates);
  const [selectedRangeDate, setSelectedRangeDate] = useState(initialRangeDate);
  const [modalVisible, setModalVisible] = useState(false);
  const minDate = new Date(1960, 0, 1);
  const inputRef = useRef<any>(null);

  const formatDate = () => {
    if (showInitialPlaceholder) return undefined;

    if (datePickerProps?.mode === 'multiple') {
      return selectedDates.length ? selectedDates.map(formatSingleDate).join(', ') : '';
    }

    if (datePickerProps?.mode === 'range') {
      const { startDate, endDate } = selectedRangeDate;
      if (!startDate) return ''; // ⬅️ return empty if no date
      if (startDate && endDate)
        return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
      return `${formatSingleDate(startDate)} - Select end date`;
    }

    return selectedDate ? formatSingleDate(selectedDate) : ''; // ⬅️ handle single mode
  };

  const formatSingleDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
  };

  const handleDateChange = (result: any) => {
    setShowInitialPlaceholder(false);
    inputRef?.current?.blur?.();

    if ('date' in result) {
      const date = new Date(result.date);
      setSelectedDate(date);
      onChange?.({ mode: 'single', date });
      setModalVisible(false);
    } else if ('dates' in result) {
      const multiple = result.dates.map((d: any) => new Date(d));
      setSelectedDates(multiple);
      onChange?.({ mode: 'multiple', dates: multiple });
    } else if (datePickerProps?.mode === 'range') {
      const updated = { ...selectedRangeDate };
      if (result.startDate) {
        updated.startDate = new Date(result.startDate);
        updated.endDate = null;
      }
      if (result.endDate) updated.endDate = new Date(result.endDate);

      setSelectedRangeDate(updated);
      if (updated.startDate && updated.endDate) {
        onChange?.({
          mode: 'range',
          startDate: updated.startDate,
          endDate: updated.endDate,
        });
        setModalVisible(false);
      }
    }
  };

  const handleDone = () => {
    if (
      datePickerProps?.mode === 'range' &&
      (!selectedRangeDate.startDate || !selectedRangeDate.endDate)
    )
      return;
    setModalVisible(false);
  };
  const defaultStyles = useDefaultStyles();
  return (
    <View className="">
      <AppInput
        placeholder="Select Date"
        ref={inputRef}
        editable={false}
        showSoftInputOnFocus={false}
        contextMenuHidden
        caretHidden
        value={formatDate()}
        selectTextOnFocus={false}
        onPress={() => setModalVisible(true)}
        // rightIcon={<CalenderIcon width={24} height={24} />}
        {...inputProps}
        style={{
          borderColor: 'transparent',
          marginVertical: -22,
          paddingLeft: -1,
          // backgroundColor: 'red',
          paddingVertical: -10,
        }}
        placeholderClassName="border"
        labelClassname="font-POPPINS_MEDIUM text-gray-400 text-sm"
      />
      <Text className="font-POPPINS_MEDIUM text-gray-40 text-l"></Text>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          className="font flex-1 items-center justify-center bg-black/20">
          <Pressable
            onPress={() => {}}
            className="border-MAIN_BLUE   w-[95%] rounded-2xl bg-[#D8F1FF] px-3 py-8 shadow-md">
            {datePickerProps?.mode !== 'single' && (
              <View className="flex-row items-center justify-between pb-3">
                <AppText>
                  {datePickerProps?.mode === 'range'
                    ? 'Select Date Range'
                    : 'Select Multiple Dates'}
                </AppText>
                <AppButton
                  onPress={handleDone}
                  label="Done"
                  className="bg-MAIN_BLUE rounded px-4 py-2"
                />
              </View>
            )}

            <DateTimePicker
              onChange={handleDateChange}
              mode={datePickerProps?.mode ?? 'single'}
              showOutsideDays
              styles={{
                header: {
                  backgroundColor: '#D8F1FF',
                },
                button_next: {
                  backgroundColor: '#A6A6A6',
                },
                button_prev: {
                  backgroundColor: '#A6A6A6',
                },
                selected_year: {
                  borderColor: '#065FB2',
                  borderWidth: 1,
                  borderRadius: 15,
                },
                selected_month: {
                  borderColor: '#065FB2',
                  borderWidth: 1,
                  borderRadius: 15,
                },
                selected: {
                  borderColor: '#065FB2',
                  borderWidth: 1,
                  borderRadius: 40,
                },
              }}
              firstDayOfWeek={datePickerProps?.firstDayOfWeek ?? 1}
              displayFullDays={datePickerProps?.displayFullDays ?? true}
              date={selectedDate ?? new Date()} // ✅ Ensure valid Date
              dates={selectedDates}
              startDate={selectedRangeDate.startDate}
              endDate={selectedRangeDate.endDate}
              minDate={datePickerProps?.minDate ?? minDate}
              {...datePickerProps}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
