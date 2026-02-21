import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.33594 8.7475L3.66467 7.25269L12.0003 14.6621L20.3359 7.25269L21.6647 8.7475L12.0003 17.3381L2.33594 8.7475Z"
      fill="currentColor"
    />
  </Icon>
);

export default ArrowDownIcon;
