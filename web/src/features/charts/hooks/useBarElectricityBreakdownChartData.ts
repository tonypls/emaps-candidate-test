import useGetZone from 'api/getZone';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { Mode, SpatialAggregate } from 'utils/constants';
import {
  productionConsumptionAtom,
  selectedDatetimeStringAtom,
  spatialAggregateAtom,
} from 'utils/state/atoms';

import {
  getDataBlockPositions,
  getExchangeData,
  getExchangesToDisplay,
  getProductionData,
} from '../bar-breakdown/utils';

const DEFAULT_BAR_PX_HEIGHT = 265;

export default function useBarBreakdownChartData() {
  // TODO: Create hook for using "current" selectedTimeIndex of data instead
  const { data: zoneData, isLoading } = useGetZone();
  const { zoneId } = useParams();
  const viewMode = useAtomValue(spatialAggregateAtom);
  const selectedDatetimeString = useAtomValue(selectedDatetimeStringAtom);
  const mixMode = useAtomValue(productionConsumptionAtom);
  const isCountryView = viewMode === SpatialAggregate.COUNTRY;
  const currentData = zoneData?.zoneStates?.[selectedDatetimeString];
  const isConsumption = mixMode === Mode.CONSUMPTION;
  if (isLoading) {
    return { isLoading };
  }

  if (!zoneId || !zoneData || !selectedDatetimeString || !currentData) {
    return {
      height: DEFAULT_BAR_PX_HEIGHT,
      zoneDetails: undefined,
      currentZoneDetail: undefined,
      exchangeData: [],
      productionData: [],
      isLoading: false,
    };
  }

  const exchangeKeys = getExchangesToDisplay(zoneId, isCountryView, zoneData.zoneStates);

  const productionData = getProductionData(currentData); // TODO: Consider memoing this
  const exchangeData = isConsumption
    ? getExchangeData(currentData, exchangeKeys, mixMode)
    : []; // TODO: Consider memoing this

  const { exchangeY, exchangeHeight } = getDataBlockPositions(
    //TODO this naming could be more descriptive
    productionData.length,
    exchangeData
  );
  const height = isConsumption ? exchangeY + exchangeHeight : exchangeY;

  return {
    height,
    zoneDetails: zoneData, // TODO: Data is returned here just to pass it back to the tooltip
    currentZoneDetail: currentData,
    exchangeData,
    productionData,
    isLoading: false,
  };
}
