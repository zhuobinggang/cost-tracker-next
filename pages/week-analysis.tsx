import {getWeeklyAnalysis, dateFormatted, dateToDate, getIsFirstTimeEnterApp} from '../core'
import React,{useEffect, useState} from 'react'
import {Line} from 'react-chartjs'
import {DateCostMapToLineData} from '../types'
import Head from 'next/head'


const dateCostMapToLineData: DateCostMapToLineData = (dateCostMap) => {
  return {
    labels: Object.keys(dateCostMap),
    datasets: [{
      data: Object.keys(dateCostMap).map(date => {
        return dateCostMap[date]
      })
    }]
  }
};

function dateToLastWeekDate(date){
  return dateToDate(date, -7);
}

function dateToNextWeekDate(date){
  return dateToDate(date, 7);
}

function refreshNarrativeMode(setInNarrativeMode){
  getIsFirstTimeEnterApp().then(setInNarrativeMode)
}

function getNarrativeDateCostMap(){
  return Promise.resolve({
    '2222-01-01': 300,
    '2222-01-02': 700,
    '2222-01-03': 200,
    '2222-01-04': 1200,
    '2222-01-05': 500,
    '2222-01-06': 100,
    '2222-01-07': 900,
  })
}


export default () => {
  const [dateCostMap, setDateCostMap] = useState({});
  const [date, setDate] = useState(dateFormatted(new Date()));
  const [inNarrativeMode, setInNarrativeMode] = useState(false);
  useEffect(() => {
    (inNarrativeMode ? getNarrativeDateCostMap() :getWeeklyAnalysis(date)).then(setDateCostMap)
  }, [date, inNarrativeMode]);
  useEffect(() => {
    refreshNarrativeMode(setInNarrativeMode)
  }, []);
  return <div>
    <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
    </Head>
    <div>周支出折线图</div>
    <Line data={dateCostMapToLineData(dateCostMap)} options={{}} width="600" height="250"/>

    <div>
      <button onClick={() => {
        setDate(dateToLastWeekDate(date))
      }}>上一周</button>
      <button onClick={() => {
        setDate(dateToNextWeekDate(date))
      }}>下一周</button>
    </div>
  </div>
}