//import { SPFx, spfi } from '@pnp/sp';
import * as React from 'react'
//import "../LandingPage/Landing.scss"
import {FiSettings } from "react-icons/fi";
const Trainings = (props: any) => {

    
  
  return (
    <div className='inCard bg-gradient-1'>
        <div className='inCard--header'>
        <h2>Trainings</h2>
       </div>
        <div className='row1'>
            {props.data?.map((x:any)=>{
                   return(
                 
                   <ul className='bullents round'>
                    <li><FiSettings/>{x.trainingname}<a href="https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/TrainingCalender/DispForm.aspx?ID='+x.ID+'" target='_blank'><FiSettings/></a></li>
                   </ul>
                   
                   )
            })}
        </div>
    </div>
        // <div className='inCard bg-gradient-1'>
        //     <div className='inCard--header'>
        //         <h2>Announcements</h2>
        //         {console.log(props)}
        //     </div>
        //     {/* <Marquee speed={10} direction='up' className='marquee tag'> */}
        //     <div className='row1'>
        //         {props.data?.map((x: any) => {
        //             return (
        //                 <ul className='bullets round'>
        //                     <li></li>
        //                     <li>{x.trainingname}</li>
                           
        //                 </ul>
        //             )
        //         })}
        //         <button className='footerButton'>Read more</button>
        //     </div>
        //     {/* </Marquee> */}
        // </div>
    )
}
export default Trainings;

















