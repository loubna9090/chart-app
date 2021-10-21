import React from 'react'
import './chart.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { AiOutlineAreaChart } from 'react-icons/ai'

const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&per_page=20'

export default function Chart() {
  // fetch data
  const [dataCharts, setDataCharts] = React.useState([])
  const fetchData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setDataCharts(data)
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  // get input
  const [base, setBase] = React.useState()
  const [quote, setQuote] = React.useState()
  const handSub = (e) => {
    e.preventDefault()
    // setQuote(quote)
    // setBase(base)
    console.log(base, quote)
  }
  return (
    <>
      <div className="container">
        <div className="bgBlue">
          <form onSubmit={handSub}>
            <div className="inputForm">
              <input
                className=" form-control w-25 mx-5"
                type="text"
                placeholder="Base asset "
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
              <input
                className="form-control w-25"
                type="text"
                placeholder="Quote asset "
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
              <button className="btn btn-AddChart">Add Chart</button>
            </div>
          </form>
        </div>

        <div className="bgWhite ">
          <h3 className="titleChart">
            <AiOutlineAreaChart /> Chart analytics
          </h3>
          <div className="chart">
            <AreaChart width={1000} height={400} data={dataCharts}>
              <CartesianGrid strokeDasharray="3 9" />
              <XAxis dataKey={base} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={quote}
                stroke="#0066ff"
                fill="#86b7fe"
              />
            </AreaChart>
          </div>
        </div>

        <div className="bgWhite ">
          <h3 className="titleChart">
            <AiOutlineAreaChart /> The list of currencies
          </h3>
          <div className="chart">
            <AreaChart width={1000} height={400} data={dataCharts}>
              <CartesianGrid strokeDasharray="3 9" />
              <XAxis dataKey={'name'} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="current_price"
                stroke="#0066ff"
                fill="#86b7fe"
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </>
  )
}
