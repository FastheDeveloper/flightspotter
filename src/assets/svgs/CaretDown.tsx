import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CaretDown = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path fill={props.color || '#000'} d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4l-6 6Z" />
  </Svg>
);
export default CaretDown;
