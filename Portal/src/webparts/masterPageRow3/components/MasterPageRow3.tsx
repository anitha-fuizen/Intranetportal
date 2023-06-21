import * as React  from 'react'
import './MasterPageRow3.scss'
import Trainings from './Trainings'
//import { SPFI, SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";
//import Tasks from './Tasks'
import { IMasterPageRow3Props } from './IMasterPageRow3Props'
// import { getSP } from '../pnpConfig';
 import {  SPFx } from '@pnp/sp';
import Tasks from './Tasks';
// import { getSP } from '../pnpConfig';
//import OpinionPoll from './Opinion Poll'
import { Web } from "@pnp/sp/webs";
import { ICamlQuery } from '@pnp/sp/lists';




const MasterPageRow3 = (props:IMasterPageRow3Props) => {
  const [trainingdata,setTrainingdata]=React.useState([])
  const [tasksdata,setTasksdata]=React.useState([])
 
  const getTrainingsdata = async () => {
    const caml: ICamlQuery = {
      ViewXml:
        "<View><ViewFields><FieldRef Name='trainingname' /> <FieldRef Name='EventDate' /></ViewFields><RowLimit>5</RowLimit></View>",
    };
  

   
   try{
  
  const web1 = Web("https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement").using(SPFx(props.context))    
  console.log(web1);
 const items:any= await web1.lists.getByTitle("TrainingCalender")
 console.log(items);
 const trainingList =  await items.getItemsByCAMLQuery(caml);
 console.log(trainingList);
    setTrainingdata(trainingList);
   
   }
   catch(e){
    console.log(e);
   }  
   
  };

  const getTasksdata = async () => {
 
    const caml: ICamlQuery = {
      ViewXml:
        "<View><ViewFields><FieldRef Name='Title'/><FieldRef Name='DueDate' /></ViewFields><RowLimit>5</RowLimit></View>",
    };
   
   try{
  
  const web1 = Web("https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement").using(SPFx(props.context))    
  console.log(web1);
 const items:any= await web1.lists.getByTitle("Tasks")
 const taskList =  await items.getItemsByCAMLQuery(caml);
 setTasksdata(taskList); 
   }
   catch(e){
    console.log(e);
   }
   
  };

  React.useEffect(() => {
    const execute = async () => {
      await getTrainingsdata();
      await getTasksdata();
     
    };
    execute();
  }, []);
  return (
    <div className="Containers3" >
    <div><Trainings data={trainingdata}/></div>
    <div><Tasks data={tasksdata}/></div>
    </div>
  )
}

export default MasterPageRow3
