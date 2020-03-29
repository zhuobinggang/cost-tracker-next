import React,{useState} from 'react'
import {mapEventToState} from '../utils'
import {save} from '../core/db'
import Head from 'next/head'

function mapCostToDb(type, cost, detail){
  if(cost == '' || isNaN(cost)){
    alert('支出必须为数字');
    return;
  }
  return save({type, cost, detail});
  //TODO: Throw Error when type Error
}

export default () => {
  const [type, setType] = useState('')
  const [cost, setCost] = useState('')
  const [detail, setDetail] = useState('')
  return <div>
    <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
    </Head>
    <div>类型: <input placeholder="食物, 生活用品或者其他" value={type} onChange={mapEventToState(setType)} /> </div>
    <select value={type} onChange={mapEventToState(setType)}>
      <option value="">通过下拉框选择类型</option>
      <option value="Food">食物</option>
      <option value="Life">生活用品</option>
      <option value="Clothe">衣物</option>
    </select>
    <div>支出: <input placeholder="必须为合法数字"  value={cost} onChange={mapEventToState(setCost)} /> </div>
    <div>详情: <input placeholder="可有可无" value={detail} onChange={mapEventToState(setDetail)} /> </div>
    <button onClick={() => {
      //console.log(type, cost, detail);
      mapCostToDb(type, cost, detail).then(() => {
        window.history.back()
      })
    }}>确认新增</button>
  </div>
}