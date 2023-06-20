import * as React from "react";
import { ICamlQuery } from "@pnp/sp/lists";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";
import { getSP } from "../pnpConfig";
import { ILandingPageRow1Props } from "./ILandingPageRow1Props";
import News from "../News/News";
import { Birthday } from "../Birthdays";
import { SharePointService } from "../Birthdays/Utils/SharepointService";
import { BirthdaysMonth } from "../Birthdays/models/BirthdayMonths";
import Announcements from "../Announcements/Announcements";

const LandingPageRow1 = (props: ILandingPageRow1Props) => {
  const [announcementsdata, setAnnouncementsData] = React.useState<any>();
  const [newsdata, setNewsData] = React.useState<any>();
  const [birthdaydata, setBirthdayData] = React.useState<any>();
  const caml: ICamlQuery = {
    ViewXml:
      "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>5</RowLimit></View>",
  };
  const getAnnouncementsData = async () => {
    let _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("Announcements");
    var r = await list.getItemsByCAMLQuery(caml);
    setAnnouncementsData(r);
  };

  const getNewsData = async () => {
    let _sp: SPFI = getSP(props.context);
    const list1 = await _sp.web.lists.getByTitle("News");
    var r2 = await list1.getItemsByCAMLQuery(caml);
    setNewsData(r2);
  };

  const getBirthdayData = async () => {
    let _sp: SPFI = getSP(props.context);
    const sharePointService = new SharePointService(_sp);
    const birthdays: Array<BirthdaysMonth> =
      await sharePointService.GetBirthdays();
    setBirthdayData(birthdays);
  };

  React.useEffect(() => {
    const execute = async () => {
      await getAnnouncementsData();
      await getNewsData();
      await getBirthdayData();
    };
    execute();
  }, []);
  return (
    <div className="mainContainer">
      <div className="Containers" >
        <div className="announcments">
          <Announcements data={announcementsdata} />
        </div>
        <div>
          <Birthday data={birthdaydata} />
        </div>
          <div className="news">
          
          <News data={newsdata} />
          
        </div>
      </div>
    </div>
  );
};


export default LandingPageRow1;
