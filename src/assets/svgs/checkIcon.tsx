import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#59252A"
      d="M2.857 0A2.857 2.857 0 0 0 0 2.857v14.286A2.857 2.857 0 0 0 2.857 20h14.286A2.857 2.857 0 0 0 20 17.143V2.857A2.857 2.857 0 0 0 17.143 0H2.857Zm5.714 14.877L4.704 11.01l2.02-2.02 1.847 1.847L13.99 5.42l2.02 2.02-7.439 7.438Z"
    />
  </Svg>
);
export default CheckIcon;
