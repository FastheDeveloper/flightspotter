import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="m10.667 16-5.334-1.867-4.133 1.6a.803.803 0 0 1-.822-.1A.878.878 0 0 1 0 14.89V2.444c0-.192.056-.363.167-.51.112-.149.263-.26.455-.334L5.333 0l5.334 1.867L14.8.267a.802.802 0 0 1 .822.1.878.878 0 0 1 .378.744v12.445a.83.83 0 0 1-.166.51 1 1 0 0 1-.456.334L10.667 16Zm-.89-2.178v-10.4L6.223 2.178v10.4l3.556 1.244Zm1.779 0 2.666-.889V2.4l-2.666 1.022v10.4ZM1.778 13.6l2.666-1.022v-10.4l-2.666.889V13.6Z"
    />
  </Svg>
);
export default SvgComponent;
