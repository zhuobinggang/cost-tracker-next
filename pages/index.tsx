import Link from 'next/link'
import React,{useEffect} from 'react'

export default () => {
  useEffect(() => {
    console.log("I enter index again")

  }, []);
  return <div>
    <div>今日支出饼图:</div>
    <div>今日总支出:</div>
    <hr/>
    <div>今日支出列表: </div>
    <hr/>

    <Link href="/new-cost">
      <a>新增今日支出</a>
    </Link>
  </div>
}