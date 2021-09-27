import { useContext } from 'react';
import { DeviceWidthContext, State } from '@providers/DeviceWidthProvider';

export default function useDeviceWidth(): State {
  return useContext(DeviceWidthContext);
}
