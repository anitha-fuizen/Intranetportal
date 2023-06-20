var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp";
import { getSP } from "../pnpConfig";
import News from "../News/News";
import { Birthday } from "../Birthdays";
import { SharePointService } from "../Birthdays/Utils/SharepointService";
import Announcements from "../Announcements/Announcements";
var LandingPageRow1 = function (props) {
    var _a = React.useState(), announcementsdata = _a[0], setAnnouncementsData = _a[1];
    var _b = React.useState(), newsdata = _b[0], setNewsData = _b[1];
    var _c = React.useState(), birthdaydata = _c[0], setBirthdayData = _c[1];
    var caml = {
        ViewXml: "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>5</RowLimit></View>",
    };
    var getAnnouncementsData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, list, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    return [4 /*yield*/, _sp.web.lists.getByTitle("Announcements")];
                case 1:
                    list = _a.sent();
                    return [4 /*yield*/, list.getItemsByCAMLQuery(caml)];
                case 2:
                    r = _a.sent();
                    setAnnouncementsData(r);
                    return [2 /*return*/];
            }
        });
    }); };
    var getNewsData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, list1, r2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    return [4 /*yield*/, _sp.web.lists.getByTitle("News")];
                case 1:
                    list1 = _a.sent();
                    return [4 /*yield*/, list1.getItemsByCAMLQuery(caml)];
                case 2:
                    r2 = _a.sent();
                    setNewsData(r2);
                    return [2 /*return*/];
            }
        });
    }); };
    var getBirthdayData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, sharePointService, birthdays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    sharePointService = new SharePointService(_sp);
                    return [4 /*yield*/, sharePointService.GetBirthdays()];
                case 1:
                    birthdays = _a.sent();
                    setBirthdayData(birthdays);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        var execute = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAnnouncementsData()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getNewsData()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, getBirthdayData()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        execute();
    }, []);
    return (React.createElement("div", { className: "mainContainer" },
        React.createElement("div", { className: "Containers" },
            React.createElement("div", { className: "announcments" },
                React.createElement(Announcements, { data: announcementsdata })),
            React.createElement("div", null,
                React.createElement(Birthday, { data: birthdaydata })),
            React.createElement("div", { className: "news" },
                React.createElement(News, { data: newsdata })))));
};
export default LandingPageRow1;
//# sourceMappingURL=LandingPageRow1.js.map