import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type FooterProps = ViewProps & {
  children: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.spacer} />
      <View style={styles.footerContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    // flex: 1, // takes up the remaining space
  },
  footerContent: {
    padding: 16, // adjust padding as needed
  },
});

export default Footer;
