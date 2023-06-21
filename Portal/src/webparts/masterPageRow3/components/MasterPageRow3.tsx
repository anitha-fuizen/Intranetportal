import * as React  from 'react'
import './MasterPageRow3.scss'
import Trainings from './Trainings'
//import { SPFI, SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";
//import Tasks from './Tasks'
import { IMasterPageRow3Props } from './IMasterPageRow3Props'
import { getSP } from '../pnpConfig';
import { SPFI } from '@pnp/sp';
import Tasks from './Tasks';
//import { getSP } from '../pnpConfig';
//import OpinionPoll from './Opinion Poll'
//import { Web } from "@pnp/sp/webs";



const MasterPageRow3 = (props:IMasterPageRow3Props) => {
  const [trainingdata,setTrainingdata]=React.useState([])
  const [tasksdata,setTasksdata]=React.useState([])

  const getTrainingsdata = async () => {
    let _sp: SPFI = getSP(props.context);
    
    const items: any[] = await _sp.web.lists.getByTitle("TrainingCalender").items();
    setTrainingdata(items)
    console.log(items)
   
  };

  const getTasksdata = async () => {
    let _sp: SPFI = getSP(props.context);
    
    const items: any[] = await _sp.web.lists.getByTitle("Tasks").items();
    setTasksdata(items)
    console.log(items)
   
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