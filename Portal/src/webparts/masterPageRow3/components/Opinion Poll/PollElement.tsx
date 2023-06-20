import { SPFI } from '@pnp/sp'
import * as React from 'react'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import { getSP } from '../../pnpConfig'
import { IItemAddResult } from '@pnp/sp/items'
import "@pnp/sp/site-users/web";
import './PollElement.scss'

const PollElement = (props: any) => {
  let rowId = props.data.ID;
  const q = props.data.QuestionName
  const c = props.data.Choices;
  let qid = String(props.data.QuestionId);
  
  const choicearr = JSON.parse(c)

  const [isLoading, setLoading] = React.useState(true);
  const [userVoted, setUservoted] = React.useState<boolean>(true)
  let userarrr: string[] = []

  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const customTheme = {
    textColor: 'black',
    mainColor: '#00B87B',
    backgroundColor: 'rgb(255,255,255)',
    alignment: 'left'
  }

  const checkUser = async () => {

    let _sp: SPFI = getSP(props.context);
    let user = await _sp.web.currentUser();
    const list = await _sp.web.lists.getByTitle("pollItems").items.select()();
    list.map((x) => {
      userarrr.push(x.Email, String(x.qid))
    })

    console.log(userarrr.includes(user.Email));
    let cond = (userarrr.includes(user.Email) && userarrr.includes(qid))
    setUservoted(cond)
    setLoading(false)

    return user.Email

  }

  const updateVotes = async (itm: Result, res: Result[]) => {
    let _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("OpinionPole");


    let user = await _sp.web.currentUser()
    let userEmail = user.Email
    const iar: IItemAddResult = await _sp.web.lists.getByTitle("pollItems").items.add({
      Title: "PollItem",
      Item: JSON.stringify(itm),
      Email: userEmail,
      qid: qid
    });

    const i = await list.items.getById(rowId).update({
      Title: "My New Title",
      Choices: JSON.stringify(res)
    });
    console.log(i);
    console.log(iar);
  }


  function vote(item: Result, results: Result[]) {
    updateVotes(item, results)
  }

  React.useEffect(() => {
    checkUser()
  }, [])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
<div className='PoleClass'>
    <LeafPoll
      type='multiple'
      question={q}
      results={choicearr}
      theme={customTheme}
      onVote={vote}
      isVoted={userVoted}
    />
</div>
  )
}

export default PollElement