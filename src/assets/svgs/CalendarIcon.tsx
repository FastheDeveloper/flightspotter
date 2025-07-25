import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CalenderIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M19.5 4h-3V2.5a.5.5 0 0 0-1 0V4h-7V2.5a.5.5 0 1 0-1 0V4h-3A2.503 2.503 0 0 0 2 6.5v13A2.503 2.503 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 19.5 4ZM21 19.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V11h18v8.5Zm0-9.5H3V6.5C3 5.672 3.67 5 4.5 5h3v1.5a.5.5 0 1 0 1 0V5h7v1.5a.5.5 0 0 0 1 0V5h3A1.5 1.5 0 0 1 21 6.5V10Z"
    />
  </Svg>
);
export default CalenderIcon;
