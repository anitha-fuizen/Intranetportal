import * as React from 'react'
//import "../LandingPage/Landing.scss"
import {FiEye } from "react-icons/fi";

const Tasks = (props: any) => {

    
  
  return (
    <div className='inCard bg-gradient-1'>
        <div className='inCard--header'>
        <h2>Tasks</h2>
       </div>
        <div className='row1'>
            {props.data?.map((x:any)=>{
              const timestamp = x.DueDate;
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
                    <li>{x.Title}{date} {time}<a href={`https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/Tasks/DispForm.aspx?ID=${x.ID}`} target='_blank'><FiEye/></a></li>
                   </ul>
                   
                   )
            })}
        </div>
    </div>
       
    )
}
export default Tasks;