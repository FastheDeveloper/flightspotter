import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PaperPlane = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color || '#000'}
      d="M20.25 3.532a1 1 0 0 1 1.183 1.329l-6 15.5a1 1 0 0 1-1.624.362l-3.382-3.235-1.203 1.202c-.636.636-1.724.186-1.724-.714v-3.288L2.309 9.723a1 1 0 0 1 .442-1.691l17.499-4.5Zm-2.114 4.305-7.998 6.607 3.97 3.798 4.028-10.405Zm-1.578-1.29L4.991 9.52l3.692 3.53 7.875-6.505v.002Z"
    />
  </Svg>
);
export default PaperPlane;
