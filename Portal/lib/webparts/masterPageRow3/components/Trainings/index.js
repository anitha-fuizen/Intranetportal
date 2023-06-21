//import { SPFx, spfi } from '@pnp/sp';
import * as React from 'react';
//import "../LandingPage/Landing.scss"
import { FiEye } from "react-icons/fi";
import { FcReading } from "react-icons/fc";
var Trainings = function (props) {
    var _a;
    return (React.createElement("div", { className: 'inCard bg-gradient-1' },
        React.createElement("div", { className: 'inCard--header' },
            React.createElement("h2", null, "Trainings")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
            var timestamp = x.EventDate;
            var dateTime = new Date(timestamp);
            // Extracting the time
            // Extracting the time in 12-hour format
            var hours = dateTime.getUTCHours();
            var minutes = dateTime.getUTCMinutes();
            var period = hours >= 12 ? "PM" : "AM";
            var formattedHours = (hours % 12) || 12;
            var time = "".concat(formattedHours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), " ").concat(period);
            // Extracting the date
            var year = dateTime.getUTCFullYear();
            var month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0');
            var day = dateTime.getUTCDate().toString().padStart(2, '0');
            var date = "".concat(day, "-").concat(month, "-").concat(year);
            return (React.createElement("ul", { className: 'bullents round' },
                React.createElement("li", null,
                    React.createElement(FcReading, { size: "45px" }),
                    x.trainingname,
                    date,
                    " ",
                    time,
                    React.createElement("a", { href: "https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/TrainingCalender/DispForm.aspx?ID='+x.ID+'", target: '_blank' },
                        React.createElement(FiEye, null)))));
        })))
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
    );
};
export default Trainings;
//# sourceMappingURL=index.js.map