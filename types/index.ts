export interface TodayCostItem{
  type: string;
  cost: number;
  detail: string;
  time?: string;
}

export interface PercentMap{
  [type: string]: number
}

export interface DateCostMap{
  [date: string]: number
}

// Concerning Chart.js
export interface PiechartData{
  value: number;
  label: string;
}
export interface PercentMapToPieData{
  (percentMap: PercentMap): Array<PiechartData>;
}
export interface LinechartData{
  labels: Array<string>;
  datasets: [{
    data: Array<number>;
  }];
}
export interface DateCostMapToLineData{
  (dateCostMap: DateCostMap): LinechartData
}

export const TYPES = {
  TODAY_COST_ITEMS_GOT: 'TODAY_COST_ITEMS_GOT',
  WEEKLY_ANALYSIS_GOT: 'WEEKLY_ANALYSIS_GOT',
  MONTHLY_ANALYSIS_GOT: 'MONTHLY_ANALYSIS_GOT',
}