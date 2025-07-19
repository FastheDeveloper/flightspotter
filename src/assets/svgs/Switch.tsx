import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Switch = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    {/* <Path fill="#fff" d="M.507.04h24v24h-24z" /> */}
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.007 10.04 2-2m0 0 2 2m-2-2v4.5m3 1.5 2 2m0 0 2-2m-2 2v-5"
    />
  </Svg>
);
export default Switch;
