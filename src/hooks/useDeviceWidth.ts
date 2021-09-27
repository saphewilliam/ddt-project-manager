import { useContext } from 'react';
import { DeviceWidthContext, State } from '@components/provider/DeviceWidthProvider';

export default function useDeviceWidth(): State {
  return useContext(DeviceWidthContext);
}
