import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const NotiIcons = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={props.color || '#000'}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 18c.458 1.725 2.075 3 4 3 1.925 0 3.541-1.275 4-3m3-4.472V10a7 7 0 0 0-14 0v3.528a2 2 0 0 1-.211.894l-1.065 2.13A1 1 0 0 0 4.618 18h14.764a1 1 0 0 0 .894-1.447l-1.065-2.13a2 2 0 0 1-.211-.895Z"
    />
  </Svg>
);
export default NotiIcons;
