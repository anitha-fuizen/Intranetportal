import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { BirthdaysMonth } from "../models/BirthdayMonths";
import { sortBy } from "@microsoft/sp-lodash-subset";

export class SharePointService {
  private readonly _spfi: SPFI;

  constructor(spfi: SPFI) {
    this._spfi = spfi;
  }

  public async GetBirthdays(): Promise<Array<BirthdaysMonth>> {
    const items: Array<any> = await this._spfi.web.lists
      .getByTitle("Birthdays")
      .items.expand("Employee")
      .select("ID,Month,Date,BirthdayDate,Employee/Title,Employee/UserName")();
    return this.ProcessData(items);
  }
  private GenerateCurrentMonths(): Array<BirthdaysMonth> {
    const months: Array<BirthdaysMonth> = [];
    //for current month
    const today = new Date();
    today.setMonth(today.getMonth());
    const todayDate = today.getDate();
    console.log(todayDate);
    months.push({
      title: today.toLocaleString("en-AU", { month: "long" }),
      users: [],
      date: today.getDate(),

    });

    return months;
  }


  private GetMonthIndex(month: string): number {
    switch (month) {
      case "January":
        return 0;
      case "February":
        return 1;
      case "March":
        return 2;
      case "April":
        return 3;
      case "May":
        return 4;
      case "June":
        return 5;
      case "July":
        return 6;
      case "August":
        return 7;
      case "September":
        return 8;
      case "October":
        return 9;
      case "November":
        return 10;
      case "December":
        return 11;
    }
  }
  // eslint-disable-next-line
  private ProcessData(items: any): Array<BirthdaysMonth> {
    const months = this.GenerateCurrentMonths();
    for (let i = 0; i < months.length; i++) {
      months[i].users = sortBy(
        items   // eslint-disable-next-line
        .filter((item: any) =>
        {  let usrBdayString = item.BirthdayDate.split('T');
          let d:any=new Date(usrBdayString);
          let date = d.getDate()
           return (date === months[i].date)
        })
          .map(
            // eslint-disable-next-line
            (item: any): any => ({
              id: item.ID,
              name: item.Employee.Title,
              email: item.Employee.UserName,
              date: item.BirthdayDate,
              month: item.Month,
              monthIndex: this.GetMonthIndex(item.Month)
            })
          ),
        "Date"
      );
    }
    return months;
  }
}
