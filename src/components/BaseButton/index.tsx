import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  PressableProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { APP_COLOR } from '~/src/constants/Colors';

interface AppButtonProps extends PressableProps {
  loading?: boolean;
  leftIcon?: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement;
  label: string;
  rightIcon?: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
  isTextBlack?: boolean;
  variant?: 'primary' | 'secondary';
}

const AppButton: React.FC<AppButtonProps> = ({
  loading,
  leftIcon,
  label,
  rightIcon,
  style,
  textStyle,
  className = '',
  isTextBlack = false,
  variant = 'primary',
  ...pressableProps
}) => {
  const isSecondary = variant === 'secondary';

  const renderIcon = (
    icon: React.ComponentProps<typeof FontAwesome5>['name'] | React.ReactElement,
    extraClass: string
  ) => {
    if (React.isValidElement(icon)) {
      return <View className={extraClass}>{icon}</View>;
    } else if (typeof icon === 'string') {
      return (
        <View className={extraClass}>
          <FontAwesome5
            name={icon}
            size={20}
            color={textStyle?.color || (isSecondary ? APP_COLOR.APP_TEXT : '#fff')}
          />
        </View>
      );
    }
    return null;
  };

  const content = loading ? (
    <View className="h-6 justify-center">
      <ActivityIndicator
        size="small"
        color={textStyle?.color || (isSecondary ? APP_COLOR.APP_TEXT : '#fff')}
        animating={true}
      />
    </View>
  ) : (
    <>
      {leftIcon && renderIcon(leftIcon, 'absolute left-5')}
      <Text
        className={`${
          isSecondary ? 'text-APP_TEXT' : isTextBlack ? 'text-[#0C0C0C]' : 'text-[#FCFCFC]'
        } font-POPPINS_REGULAR text-center text-base`}
        style={[textStyle]}>
        {label}
      </Text>
      {rightIcon && renderIcon(rightIcon, 'absolute right-5')}
    </>
  );

  const defaultClassname = `flex-row justify-center items-center px-5 py-3 rounded-lg ${
    pressableProps.disabled
      ? 'bg-[#7C8488]'
      : isSecondary
        ? 'bg-white border border-PRIMARY_COLOR'
        : 'bg-PRIMARY_COLOR'
  }`;

  return (
    <Pressable className={`${defaultClassname} ${className}`} style={style} {...pressableProps}>
      {content}
    </Pressable>
  );
};

export default AppButton;
