import { useAtom } from 'jotai';
import { TimeAverages } from 'utils/constants';
import { formatCo2 } from 'utils/formatting';
import { displayByEmissionsAtom, productionConsumptionAtom } from 'utils/state/atoms';

import { ChartTitle } from './ChartTitle';
import AreaGraph from './elements/AreaGraph';
import { noop } from './graphUtils';
import { useNetExchangeChartData } from './hooks/useNetExchangeChartData';
import { RoundedCard } from './RoundedCard';
import NetExchangeChartTooltip from './tooltips/NetExchangeChartTooltip';

interface NetExchangeChartProps {
  datetimes: Date[];
  timeAverage: TimeAverages;
}

function NetExchangeChart({ datetimes, timeAverage }: NetExchangeChartProps) {
  const { data, isLoading, isError } = useNetExchangeChartData();
  const [productionConsumption] = useAtom(productionConsumptionAtom);
  const [displayByEmissions] = useAtom(displayByEmissionsAtom);
  if (productionConsumption === 'production') {
    return null;
  }

  if (isLoading || isError || !data) {
    return null;
  }
  const { chartData } = data;
  const { layerFill, layerKeys, layerStroke, valueAxisLabel, markerFill } = data;

  // find the absolute max value to format the axis
  const maxEmissions = Math.max(
    ...chartData.map((o) => Math.abs(o.layerData.netExchange))
  );
  const formatAxisTick = (t: number) =>
    displayByEmissions ? formatCo2(t, maxEmissions) : t.toString();

  if (!chartData[0]?.layerData?.netExchange) {
    return null;
  }

  return (
    <RoundedCard className="pb-2">
      <ChartTitle translationKey="country-history.netExchange" unit={valueAxisLabel} />
      <div className="relative">
        <AreaGraph
          testId="history-exchange-graph"
          data={chartData}
          layerKeys={layerKeys}
          layerStroke={layerStroke}
          layerFill={layerFill}
          markerFill={markerFill}
          markerUpdateHandler={noop}
          markerHideHandler={noop}
          isMobile={false}
          height="10em"
          datetimes={datetimes}
          selectedTimeAggregate={timeAverage}
          tooltip={NetExchangeChartTooltip}
          formatTick={formatAxisTick}
        />
      </div>
    </RoundedCard>
  );
}

export default NetExchangeChart;
