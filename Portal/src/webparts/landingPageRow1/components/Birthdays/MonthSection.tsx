import * as React from "react";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { BirthdaysMonth } from "./models/BirthdayMonths";
import Carousel from "react-bootstrap/Carousel";
import '../LandingPage/Landing.scss'

interface IMonthSectionProps {
  data: BirthdaysMonth;
  index: number;
}

const MonthSection = (props: IMonthSectionProps): JSX.Element => {
  return (
    <>
      <div className="inCard bg-gradient-2">
        <div className="inCard--header">
          <h2>Birthdays</h2>
        </div>
        <div className={props.data.users.length===0?"row4NoBday":"row4"}>
          
        <Carousel slide={false}>
          {props.data.users.length === 0 && (
            <div className="birthday">
              <Persona
                primaryText="Next birthday will"
                secondaryText="be celebrated soon!"
                size={PersonaSize.size56}
                styles={{
                  primaryText: {
                    color: "black",
                  },
                  secondaryText: {
                    color: "black",
                  },
                }}
              />
            </div>
          )}
          {props.data.users.map((user) => {
            return (
              <Carousel.Item key={user.id}>
                <Carousel.Caption>
                  <div style={{ alignItems: "center" }}>
                    <br />
                    <br />
                  </div>
                </Carousel.Caption>
                <div className="birthday">
                  <Persona
                    primaryText="Happy birthday!"
                    secondaryText={user.name}
                    imageUrl={`/_layouts/15/userphoto.aspx?UserName=${user.email}`}
                    imageAlt={user.name}
                    size={PersonaSize.size56}
                    styles={{
                      primaryText: {
                        color: "white",
                      },
                      secondaryText: {
                        color: "white",
                      },
                      
                    }}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <button className='footerButton'>View All</button>
      </div>
      </div>
    </>
  );
};

export default MonthSection;
