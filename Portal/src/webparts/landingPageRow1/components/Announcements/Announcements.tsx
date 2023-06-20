import * as React from 'react'
import "../LandingPage/Landing.scss"


const Announcements = (props: any) => {
    

    return (
        <div className='inCard bg-gradient-1'>
            <div className='inCard--header'>
                <h2>Announcements</h2>
            </div>
            {/* <Marquee speed={10} direction='up' className='marquee tag'> */}
            <div className='row1'>
                {props.data?.map((x: any) => {
                    return (
                        <ul className='bullets round'>
                            <li>{x.Title}</li>
                        </ul>
                    )
                })}
                <button className='footerButton'>Read more</button>
            </div>
            {/* </Marquee> */}
        </div>
    )
}
export default Announcements;

















