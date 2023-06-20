import * as React from 'react';
import "../LandingPage/Landing.scss";
// import Marquee from "react-fast-marquee";
var News = function (props) {
    var _a;
    return (React.createElement("div", { className: 'inCard bg-gradient-3' },
        React.createElement("div", { className: 'inCard--header' },
            React.createElement("h2", null, "News")),
        React.createElement("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 :
            _a.map(function (x) {
                return (React.createElement("ul", { className: 'bullets round' },
                    React.createElement("li", null, x.Title)));
            }),
            React.createElement("button", { className: 'footerButton' }, "View All"))));
};
export default News;
//# sourceMappingURL=News.js.map