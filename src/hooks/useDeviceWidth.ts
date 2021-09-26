import { useContext } from 'react';
import { DeviceWidthContext, State } from '@components/Providers/DeviceWidthProvider';

export default function useDeviceWidth(): State {
  return useContext(DeviceWidthContext);
}
