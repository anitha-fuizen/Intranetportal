//import { SPFx, spfi } from '@pnp/sp';
import * as React from 'react';
//import "../LandingPage/Landing.scss"
import { FiSettings } from "react-icons/fi";
var Trainings = function (props) {
    var _a;
    return (React.createElement("div", { className: 'inCard bg-gradient-1' },
        React.createElement("div", { className: 'inCard--header' },
            React.createElement("h2", null, "Trainings")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
            return (React.createElement("ul", { className: 'bullents round' },
                React.createElement("li", null,
                    React.createElement(FiSettings, null),
                    x.trainingname,
                    React.createElement("a", { href: "https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/TrainingCalender/DispForm.aspx?ID='+x.ID+'", target: '_blank' },
                        React.createElement(FiSettings, null)))));
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