import * as React from 'react';
//import "../LandingPage/Landing.scss"
import { FiEye } from "react-icons/fi";
var Tasks = function (props) {
    var _a;
    return (React.createElement("div", { className: 'inCard bg-gradient-1' },
        React.createElement("div", { className: 'inCard--header' },
            React.createElement("h2", null, "Tasks")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
            var timestamp = x.DueDate;
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
                    x.Title,
                    date,
                    " ",
                    time,
                    React.createElement("a", { href: "https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/Tasks/DispForm.aspx?ID=".concat(x.ID), target: '_blank' },
                        React.createElement(FiEye, null)))));
        }))));
};
export default Tasks;
//# sourceMappingURL=index.js.map