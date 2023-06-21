//import { SPFx, spfi } from '@pnp/sp';
import * as React from 'react'
//import "../LandingPage/Landing.scss"
import {FiEye } from "react-icons/fi";
import {FcReading } from "react-icons/fc";
const Trainings = (props: any) => {

    
  
  return (
    <div className='inCard bg-gradient-1'>
        <div className='inCard--header'>
        <h2>Trainings</h2>
       </div>
        <div className='row1'>
            {props.data?.map((x:any)=>{
                 const timestamp = x.EventDate;
                 const dateTime = new Date(timestamp);
                 // Extracting the time
                 // Extracting the time in 12-hour format
   
                 const hours = dateTime.getUTCHours();
                 const minutes = dateTime.getUTCMinutes();
   
                   const period = hours >= 12 ? "PM" : "AM";
                   const formattedHours = (hours % 12) || 12;
                  const time = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
               // Extracting the date
                 const year = dateTime.getUTCFullYear();
                 const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0');
                 const day = dateTime.getUTCDate().toString().padStart(2, '0');
                 const date = `${day}-${month}-${year}`;
                   return(
                 
                   <ul className='bullents round'>
                    <li><FcReading size={"45px"} />{x.trainingname}{date} {time}<a href="https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/TrainingCalender/DispForm.aspx?ID='+x.ID+'" target='_blank'><FiEye/></a></li>
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

















