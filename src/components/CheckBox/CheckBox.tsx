import React from 'react';
import { View, Pressable } from 'react-native';
import AppText, { type AppTextProps } from '../AppText/AppText';
import CheckIcon from '~/src/assets/svgs/checkIcon';

// adjust the path if needed

interface CheckboxWithLabelProps {
  isChecked: boolean;
  onToggle: () => void;
  label: string;
  error?: boolean;
  className?: string; // for outer wrapper
  labelClassName?: string;
  labelProps?: AppTextProps;
  disabled?: boolean;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  isChecked,
  onToggle,
  label,
  error,
  className = '',
  labelClassName = '',
  labelProps = {},
  disabled = false,
}) => {
  const defaultWrapperStyle = 'flex-row items-center gap-3 mr-2';
  const defaultBoxStyle = 'border-2 rounded-md';
  const borderColor = error ? 'border-ERROR_STATE' : 'border-APP_TEXT';

  return (
    <View className={`${defaultWrapperStyle} ${className}`}>
      {isChecked ? (
        <CheckIcon width={20} height={20} onPress={onToggle} disabled={disabled} />
      ) : (
        <Pressable
          onPress={onToggle}
          className={`${defaultBoxStyle} ${borderColor}`}
          style={{ width: 20, height: 20 }}
          disabled={disabled}
        />
      )}
      <AppText className={labelClassName} {...labelProps}>
        {label}
      </AppText>
    </View>
  );
};

export default CheckboxWithLabel;
