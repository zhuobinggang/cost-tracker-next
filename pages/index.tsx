import Link from 'next/link'

export default () => {
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