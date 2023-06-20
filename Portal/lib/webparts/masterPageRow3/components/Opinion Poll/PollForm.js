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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { getSP } from '../../pnpConfig';
import './pollForm.scss';
var PollForm = function (props) {
    var idnext;
    var _a = React.useState(), question = _a[0], setQuestion = _a[1];
    var _b = React.useState([]), choice = _b[0], setChoices = _b[1];
    var _c = React.useState([]), choiceobj = _c[0], setchoiceobj = _c[1];
    var _d = React.useState(), Nextid = _d[0], setNextId = _d[1];
    var createobj = function (ch) {
        setchoiceobj(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ id: 0, text: ch, votes: 0, percentage: 0 }], false); });
    };
    var deleteChoice = function (itm) {
        if (choiceobj.includes(itm)) {
            setchoiceobj(choiceobj.filter(function (x) { return x !== itm; }));
        }
    };
    var renderChoice = function () {
        return (choiceobj.map(function (x) {
            return (React.createElement("div", { className: "choicelabel" },
                React.createElement("p", null, x.text),
                React.createElement(AiFillDelete, { className: 'addbtn', onClick: function () { deleteChoice(x); } })));
        }));
    };
    var getLatestID = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    return [4 /*yield*/, _sp.web.lists.getByTitle("OpinionPole").items.select("QuestionId").top(1).orderBy("Modified", false)()];
                case 1:
                    list = _a.sent();
                    console.log(list);
                    list.map(function (x) {
                        idnext = parseInt(x.QuestionId) + 1;
                        setNextId(idnext);
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var submitObj = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, iar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    return [4 /*yield*/, _sp.web.lists.getByTitle("OpinionPole").items.add({
                            Title: "PollItem",
                            QuestionName: question,
                            Choices: JSON.stringify(choiceobj),
                            QuestionId: Nextid
                        })];
                case 1:
                    iar = _a.sent();
                    console.log(iar);
                    return [2 /*return*/];
            }
        });
    }); };
    React.useEffect(function () {
        renderChoice();
        getLatestID();
    }, [choiceobj]);
    React.useEffect(function () {
        getLatestID();
    }, []);
    return (React.createElement("div", { className: 'formcontainer' },
        React.createElement("div", { className: "formtitle" },
            React.createElement("h3", null, "New Poll")),
        React.createElement("form", { className: 'newPollForm' },
            React.createElement("label", null, "Enter your Question: "),
            React.createElement("input", { type: 'text', onChange: function (e) { setQuestion(e.target.value); } }),
            React.createElement("label", null, "Add Choices"),
            React.createElement("div", null,
                React.createElement("input", { type: 'text', onChange: function (e) { setChoices(e.target.value); } }),
                React.createElement(AiFillPlusCircle, { className: 'addbtn', size: 20, onClick: function () { return choice.length == 0 ? window.alert("enter choice") : createobj(choice); } }))),
        choiceobj.length > 0 ? React.createElement("div", { className: "formfield" }, renderChoice()) : React.createElement("div", { className: "formfieldempty" }, "Enter Choices"),
        React.createElement("button", { className: 'createBtn', onClick: submitObj }, "Create Poll")));
};
export default PollForm;
//# sourceMappingURL=PollForm.js.map