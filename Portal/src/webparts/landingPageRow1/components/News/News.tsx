import * as React from 'react'
import "../LandingPage/Landing.scss"
// import Marquee from "react-fast-marquee";
const News = (props: any) => {
  return (
    <div className='inCard bg-gradient-3'>
      <div className='inCard--header'>
        <h2>News</h2>
      </div>
      {/* <Marquee speed={10} direction='up' className='marqueetag'> */}
      <div className='row1'>
        {props.data?.map((x: any) => {
          return (
            <ul className='bullets round'>
            <li>{x.Title}</li>
            </ul>
          )
        })}
        <button className='footerButton'>View All</button>
      </div>
      {/* </Marquee> */}
    </div>
  )
}
export default News







