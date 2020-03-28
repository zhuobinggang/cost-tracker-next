import React,{useState} from 'react'
import {mapEventToState} from '../utils'
import {save} from '../core/db'

function mapCostToDb(type, cost, detail){
  save({type, cost, detail});
  //TODO: Throw Error when type Error
}

export default () => {
  const [type, setType] = useState('')
  const [cost, setCost] = useState('')
  const [detail, setDetail] = useState('')
  return <div>
    <div>type: <input value={type} onChange={mapEventToState(setType)} /> </div>
    <div>cost: <input value={cost} onChange={mapEventToState(setCost)} /> </div>
    <div>detail: <input value={detail} onChange={mapEventToState(setDetail)} /> </div>
    <button onClick={() => {
      //console.log(type, cost, detail);
      mapCostToDb(type, cost, detail)
    }}>确认新增</button>
  </div>
}