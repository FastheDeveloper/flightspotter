import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CloseIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="m4.267 12.667-.934-.934L7.067 8 3.333 4.267l.934-.934L8 7.067l3.733-3.734.934.934L8.933 8l3.734 3.733-.934.934L8 8.933l-3.733 3.734Z"
    />
  </Svg>
);
export default CloseIcon;
