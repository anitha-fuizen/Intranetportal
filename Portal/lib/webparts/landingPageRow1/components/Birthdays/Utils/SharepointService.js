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
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sortBy } from "@microsoft/sp-lodash-subset";
var SharePointService = /** @class */ (function () {
    function SharePointService(spfi) {
        this._spfi = spfi;
    }
    SharePointService.prototype.GetBirthdays = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._spfi.web.lists
                            .getByTitle("Birthdays")
                            .items.expand("Employee")
                            .select("ID,Month,Date,BirthdayDate,Employee/Title,Employee/UserName")()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, this.ProcessData(items)];
                }
            });
        });
    };
    SharePointService.prototype.GenerateCurrentMonths = function () {
        var months = [];
        //for current month
        var today = new Date();
        today.setMonth(today.getMonth());
        var todayDate = today.getDate();
        console.log(todayDate);
        months.push({
            title: today.toLocaleString("en-AU", { month: "long" }),
            users: [],
            date: today.getDate(),
        });
        return months;
    };
    SharePointService.prototype.GetMonthIndex = function (month) {
        switch (month) {
            case "January":
                return 0;
            case "February":
                return 1;
            case "March":
                return 2;
            case "April":
                return 3;
            case "May":
                return 4;
            case "June":
                return 5;
            case "July":
                return 6;
            case "August":
                return 7;
            case "September":
                return 8;
            case "October":
                return 9;
            case "November":
                return 10;
            case "December":
                return 11;
        }
    };
    // eslint-disable-next-line
    SharePointService.prototype.ProcessData = function (items) {
        var _this = this;
        var months = this.GenerateCurrentMonths();
        var _loop_1 = function (i) {
            months[i].users = sortBy(items // eslint-disable-next-line
                .filter(function (item) {
                var usrBdayString = item.BirthdayDate.split('T');
                var d = new Date(usrBdayString);
                var date = d.getDate();
                return (date === months[i].date);
            })
                .map(
            // eslint-disable-next-line
            function (item) { return ({
                id: item.ID,
                name: item.Employee.Title,
                email: item.Employee.UserName,
                date: item.BirthdayDate,
                month: item.Month,
                monthIndex: _this.GetMonthIndex(item.Month)
            }); }), "Date");
        };
        for (var i = 0; i < months.length; i++) {
            _loop_1(i);
        }
        return months;
    };
    return SharePointService;
}());
export { SharePointService };
//# sourceMappingURL=SharepointService.js.map