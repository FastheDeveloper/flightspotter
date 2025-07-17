import React from 'react';
import { Text, TextProps as RNTextProps, Dimensions } from 'react-native';

export type AppTextProps = RNTextProps & {
  children: React.ReactNode;
  header?: boolean;
  placeholder?: boolean;
  indicator?: boolean;
  link?: boolean;
  className?: string;
  loading?: boolean;
  regular?: boolean;
  quote?: boolean;
};

const AppText = ({
  children,
  header,
  placeholder,
  indicator,
  link,
  className = '',
  loading,
  regular,
  quote,
  ...rest
}: AppTextProps) => {
  const { height, width } = Dimensions.get('window');
  let defaultStyle = 'text-md text-APP_TEXT font-POPPINS_MEDIUM';

  if (header) {
    defaultStyle = 'text-2xl text-APP_TEXT font-POPPINS_SEMIBOLD';
  } else if (placeholder) {
    defaultStyle = 'text-md text-PLACEHOLDER_TEXT font-POPPINS_MEDIUM';
  } else if (indicator) {
    defaultStyle = `text-md text-PLACEHOLDER_TEXT font-POPPINS_REGULAR`;
  } else if (link) {
    defaultStyle = `text-md ${'text-PRIMARY_COLOR'} font-POPPINS_MEDIUM`;
  } else if (regular) {
    defaultStyle = `text-sm text-PLACEHOLDER_TEXT font-POPPINS_REGULAR`;
  } else if (quote) {
    defaultStyle = `${
      height < 650 ? 'text-xs' : 'text-sm'
    } text-PLACEHOLDER_TEXT font-POPPINS_MEDIUM`;
  }

  return (
    <Text className={`${defaultStyle} ${className} `} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
