import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import {getCostListInDate, getAnalysis, totalCost, dateFormatted, dateToDate, getIsFirstTimeEnterApp, exitNarrativeMode} from '../core'
import {Doughnut} from 'react-chartjs'
import {mapPercentMapToPieData} from '../utils'
import {TodayCostItem} from '../types'

function mapCostListToHtml(costList: Array<TodayCostItem>){
  return costList.map((cost, index) => {
    return <div key={index}>{cost.type}: {cost.cost} {cost.detail} {cost.time}</div>
  })
}

function dateToString(date: string){
  if(dateFormatted(new Date()) == date){
    return '今日'
  }else{
    return date;
  }
}

function dateToLastDate(date: Date | string): string{
  return dateToDate(date, -1);
}

function dateToNextDate(date: Date | string): string{
  return dateToDate(date, +1);
}

function showExsitButtonIfNarrativeMode(flag, exitNarritiveMode){
  if(flag){
    return <button onClick={exitNarritiveMode}>
      退出展示模式
    </button>
  }else{
    return <div></div>;
  }
}

function refreshNarrativeMode(setInNarrativeMode){
  getIsFirstTimeEnterApp().then(setInNarrativeMode)
}

function getNarrativeCostList(): Promise<Array<TodayCostItem>>{
  return Promise.resolve([{
    type: '食物',
    cost: 99,
    detail: '🍜',
    time: '1997-01-01',
  },{
    type: '宠物',
    cost: 1999,
    detail: '你的🐎',
    time: '1997-01-01',
  },{
    type: '衣服',
    cost: 333,
    detail: '👖',
    time: '1997-01-01',
  }])
}

const Index =  (props) => {
  const [costList, setCostList] = useState([])
  const [date, setDate] = useState(dateFormatted(new Date()))
  const [inNarrativeMode, setInNarrativeMode] = useState(false)
  useEffect(() => {
    console.log("I enter index again");
    (inNarrativeMode ? getNarrativeCostList() :getCostListInDate(date)).then(list => {
      setCostList(list)
    })
  }, [date, inNarrativeMode]);
  useEffect(() => {
    refreshNarrativeMode(setInNarrativeMode)
  }, []);
  return <div>
    {showExsitButtonIfNarrativeMode(inNarrativeMode, () => {
      exitNarrativeMode().then(() => {
        refreshNarrativeMode(setInNarrativeMode)
      })
    })}
    <br/>
    <div>{dateToString(date)}支出饼图:</div>
    <Doughnut data={mapPercentMapToPieData(getAnalysis(costList))} options={{}}/>
    <hr/>
    <div>今日总支出: {totalCost(costList)}</div>
    <hr/>
    <div>今日支出列表: </div>
    {mapCostListToHtml(costList)}
    <hr/>

    <div>
      <button onClick={() => {
        setDate(dateToLastDate(date))
      }}>上一天</button>
      <button onClick={() => {
        setDate(dateToNextDate(date))
      }}>下一天</button>
    </div>

    <Link href="/week-analysis"> 
      <a>周支出折线图</a> 
    </Link>
    <br/>

    <Link href="/new-cost"> 
      <a>新增今日支出</a> 
    </Link>

    <br/>
    

  </div>
}

export default Index;