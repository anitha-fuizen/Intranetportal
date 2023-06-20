import * as React from "react";
import "../LandingPage/LandingPageRow1.module.scss";
import MonthSection from "./MonthSection";
import { BirthdaysMonth } from "./models/BirthdayMonths";


interface IBirthdaysPerMonthProps {
  data: Array<BirthdaysMonth>;
}

const Birthday = (props: IBirthdaysPerMonthProps) => {
  props.data && props.data?.map((month: any, index: number) => {
    console.log(month.title, month)
  })

  return (

    <section>
      {props.data && props.data?.map((month: any, index: number) => (
        <MonthSection key={month.title} data={month} index={index} />
      ))}
    </section>
  )
}

export { IBirthdaysPerMonthProps, Birthday };
