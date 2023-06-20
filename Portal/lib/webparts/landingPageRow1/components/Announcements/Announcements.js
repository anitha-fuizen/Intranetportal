import * as React from 'react';
import "../LandingPage/Landing.scss";
var Announcements = function (props) {
    var _a;
    return (React.createElement("div", { className: 'inCard bg-gradient-1' },
        React.createElement("div", { className: 'inCard--header' },
            React.createElement("h2", null, "Announcements")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 :
            _a.map(function (x) {
                return (React.createElement("ul", { className: 'bullets round' },
                    React.createElement("li", null, x.Title)));
            }),
            React.createElement("button", { className: 'footerButton' }, "Read more"))));
};
export default Announcements;
//# sourceMappingURL=Announcements.js.map