import {PercentMapToPieData} from '../types'

export function mapEventToState(setState: (x: string) => void){
  return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState(e.target.value);
  }
}

export const mapPercentMapToPieData : PercentMapToPieData = (percentMap) => {
  return Object.keys(percentMap).map(key => {
    return {value: percentMap[key], label: key};
  })
}