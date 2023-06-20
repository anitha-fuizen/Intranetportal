import * as React from "react";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import Carousel from "react-bootstrap/Carousel";
import '../LandingPage/Landing.scss';
var MonthSection = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "inCard bg-gradient-2" },
            React.createElement("div", { className: "inCard--header" },
                React.createElement("h2", null, "Birthdays")),
            React.createElement("div", { className: props.data.users.length === 0 ? "row4NoBday" : "row4" },
                React.createElement(Carousel, { slide: false },
                    props.data.users.length === 0 && (React.createElement("div", { className: "birthday" },
                        React.createElement(Persona, { primaryText: "Next birthday will", secondaryText: "be celebrated soon!", size: PersonaSize.size56, styles: {
                                primaryText: {
                                    color: "black",
                                },
                                secondaryText: {
                                    color: "black",
                                },
                            } }))),
                    props.data.users.map(function (user) {
                        return (React.createElement(Carousel.Item, { key: user.id },
                            React.createElement(Carousel.Caption, null,
                                React.createElement("div", { style: { alignItems: "center" } },
                                    React.createElement("br", null),
                                    React.createElement("br", null))),
                            React.createElement("div", { className: "birthday" },
                                React.createElement(Persona, { primaryText: "Happy birthday!", secondaryText: user.name, imageUrl: "/_layouts/15/userphoto.aspx?UserName=".concat(user.email), imageAlt: user.name, size: PersonaSize.size56, styles: {
                                        primaryText: {
                                            color: "white",
                                        },
                                        secondaryText: {
                                            color: "white",
                                        },
                                    } }))));
                    })),
                React.createElement("button", { className: 'footerButton' }, "View All")))));
};
export default MonthSection;
//# sourceMappingURL=MonthSection.js.map