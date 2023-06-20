import * as React from 'react'
import './Feedback.scss'
import { IoMdSend } from "react-icons/io";
import { getSP } from '../pnpConfig';
import { SPFI } from '@pnp/sp';
import "@pnp/sp/sputilities";
import { SlCheck } from "react-icons/sl";
import { IItemAddResult } from "@pnp/sp/items";

const Feedback = (props: any) => {

  const [fb, setFb] = React.useState<any>("")
  const [msg, setMsg] = React.useState<any>(false)
  const postFeedback = async () => {
    let _sp: SPFI = getSP(props.context);
    const list: IItemAddResult = await _sp.web.lists.getByTitle("Feedback List").items.add({
      Complients_x002f_Comments: fb,
      DepartmentNameId: props.depID
    });
    console.log(list)

    _sp.utility.sendEmail({
      To: [props.repman],
      Subject: "Recived Feedback ",
      Body: "You got feedback",
      AdditionalHeaders: {
        "content-type": "text/html"
      }
    })
  }


  return (
    <div className='rowMains'>
      <div className="feedbackTitle">
      </div>
      <div className='formDiv'>
        <div className="field"><textarea value={fb} placeholder='Enter your Feedback here' onChange={(e) => setFb(e.target.value)}></textarea></div>
        <div className='submitBtn'><div className={msg ? 'msgopen' : 'msgclose'}> <SlCheck size={15} color={"green"} />   <div className="successm">      Successfully submitted</div></div><div className={fb == "" ? "btnDivHide" : "btnDivShow"}><button onClick={() => {
          postFeedback(); setFb(""); setMsg(true); setTimeout(() => {
            setMsg(false)
          }, 2000)
        }}><IoMdSend /></button></div></div>
      </div>
    </div>
  )
}

export default Feedback
