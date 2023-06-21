define("47ba9bfb-6fed-40ca-9e9d-46d6dc87feaa_3.0.4", ["@microsoft/sp-property-pane","MasterPageRow3WebPartStrings","@microsoft/sp-webpart-base","react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE__26ea__, __WEBPACK_EXTERNAL_MODULE_U5jc__, __WEBPACK_EXTERNAL_MODULE_br4S__, __WEBPACK_EXTERNAL_MODULE_cDcd__, __WEBPACK_EXTERNAL_MODULE_faye__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "TRxW");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+y5s":
/*!*************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/cancelable.js ***!
  \*************************************************************/
/*! exports provided: asCancelableScope, cancelableScope, Cancelable, CancelAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asCancelableScope", function() { return asCancelableScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelableScope", function() { return cancelableScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cancelable", function() { return Cancelable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelAction", function() { return CancelAction; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");

/**
 * Cancelable is a fairly complex behavior as there is a lot to consider through multiple timelines. We have
 * two main cases:
 *
 * 1. basic method that is a single call and returns the result of an operation (return spPost(...))
 * 2. complex method that has multiple async calls within
 *
 * 1. For basic calls the cancel info is attached in init as it is only involved within a single request.
 *    This works because there is only one request and the cancel logic doesn't need to persist across
 *    inheriting instances. Also, many of these requests are so fast canceling is likely unnecessary
 *
 * 2. Complex method present a larger challenge because they are comprised of > 1 request and the promise
 *    that is actually returned to the user is not directly from one of our calls. This promise is the
 *    one "created" by the language when you await. For complex methods we have two things that solve these
 *    needs.
 *
 *    The first is the use of either the cancelableScope decorator or the asCancelableScope method
 *    wrapper. These create an upper level cancel info that is then shared across the child requests within
 *    the complex method. Meaning if I do a files.addChunked the same cancel info (and cancel method)
 *    are set on the current "this" which is user object on which the method was called. This info is then
 *    passed down to any child requests using the original "this" as a base using the construct moment.
 *
 *    The CancelAction behavior is used to apply additional actions to a request once it is canceled. For example
 *    in the case of uploading files chunked in sp we cancel the upload by id.
 */
// this is a special moment used to broadcast when a request is canceled
const MomentName = "__CancelMoment__";
// this value is used to track cancel state and the value is represetented by IScopeInfo
const ScopeId = Symbol.for("CancelScopeId");
// module map of all currently tracked cancel scopes
const cancelScopes = new Map();
/**
 * This method is bound to a scope id and used as the cancel method exposed to the user via cancelable promise
 *
 * @param this unused, the current promise
 * @param scopeId Id bound at creation time
 */
async function cancelPrimitive(scopeId) {
    const scope = cancelScopes.get(scopeId);
    scope.controller.abort();
    if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isArray"])(scope === null || scope === void 0 ? void 0 : scope.actions)) {
        scope.actions.map(action => scope.currentSelf.on[MomentName](action));
    }
    try {
        await scope.currentSelf.emit[MomentName]();
    }
    catch (e) {
        scope.currentSelf.log(`Error in cancel: ${e}`, 3);
    }
}
/**
 * Creates a new scope id, sets it on the instance's ScopeId property, and adds the info to the map
 *
 * @returns the new scope id (GUID)
 */
function createScope(instance) {
    const id = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["getGUID"])();
    instance[ScopeId] = id;
    cancelScopes.set(id, {
        cancel: cancelPrimitive.bind({}, id),
        actions: [],
        controller: null,
        currentSelf: instance,
    });
    return id;
}
/**
 * Function wrapper that turns the supplied function into a cancellation scope
 *
 * @param func Func to wrap
 * @returns The same func signature, wrapped with our cancel scoping logic
 */
const asCancelableScope = (func) => {
    return function (...args) {
        // ensure we have setup "this" to cancel
        // 1. for single requests the value is set in the behavior's init observer
        // 2. for complex requests the value is set here
        if (!Reflect.has(this, ScopeId)) {
            createScope(this);
        }
        // execute the original function, but don't await it
        const result = func.apply(this, args).finally(() => {
            // remove any cancel scope values tied to this instance
            cancelScopes.delete(this[ScopeId]);
            delete this[ScopeId];
        });
        // ensure the synthetic promise from a complex method has a cancel method
        result.cancel = cancelScopes.get(this[ScopeId]).cancel;
        return result;
    };
};
/**
 * Decorator used to mark multi-step methods to ensure all subrequests are properly cancelled
 */
function cancelableScope(_target, _propertyKey, descriptor) {
    // wrapping the original method
    descriptor.value = asCancelableScope(descriptor.value);
}
/**
 * Allows requests to be canceled by the caller by adding a cancel method to the Promise returned by the library
 *
 * @returns Timeline pipe to setup canelability
 */
function Cancelable() {
    if (!AbortController) {
        throw Error("The current environment appears to not support AbortController, please include a suitable polyfill.");
    }
    return (instance) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance.on.construct(function (init, path) {
            if (typeof init !== "string") {
                const parent = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isArray"])(init) ? init[0] : init;
                if (Reflect.has(parent, ScopeId)) {
                    // ensure we carry over the scope id to the new instance from the parent
                    this[ScopeId] = parent[ScopeId];
                }
                // define the moment's implementation
                this.moments[MomentName] = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["asyncBroadcast"])();
            }
        });
        // init our queryable to support cancellation
        instance.on.init(function () {
            if (!Reflect.has(this, ScopeId)) {
                // ensure we have setup "this" to cancel
                // 1. for single requests this will set the value
                // 2. for complex requests the value is set in asCancelableScope
                const id = createScope(this);
                // if we are creating the scope here, we have not created it within asCancelableScope
                // meaning the finally handler there will not delete the tracked scope reference
                this.on.dispose(() => {
                    cancelScopes.delete(id);
                });
            }
            this.on[this.InternalPromise]((promise) => {
                // when a new promise is created add a cancel method
                promise.cancel = cancelScopes.get(this[ScopeId]).cancel;
                return [promise];
            });
        });
        instance.on.pre(async function (url, init, result) {
            // grab the current scope, update the controller and currentSelf
            const existingScope = cancelScopes.get(this[ScopeId]);
            // if we are here without a scope we are likely running a CancelAction request so we just ignore canceling
            if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(existingScope)) {
                const controller = new AbortController();
                existingScope.controller = controller;
                existingScope.currentSelf = this;
                if (init.signal) {
                    // we do our best to hook our logic to the existing signal
                    init.signal.addEventListener("abort", () => {
                        existingScope.cancel();
                    });
                }
                else {
                    init.signal = controller.signal;
                }
            }
            return [url, init, result];
        });
        // clean up any cancel info from the object after the request lifecycle is complete
        instance.on.dispose(function () {
            delete this[ScopeId];
            delete this.moments[MomentName];
        });
        return instance;
    };
}
/**
 * Allows you to define an action that is run when a request is cancelled
 *
 * @param action The action to run
 * @returns A timeline pipe used in the request lifecycle
 */
function CancelAction(action) {
    return (instance) => {
        instance.on.pre(async function (...args) {
            const existingScope = cancelScopes.get(this[ScopeId]);
            // if we don't have a scope this request is not using Cancelable so we do nothing
            if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(existingScope)) {
                if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isArray"])(existingScope.actions)) {
                    existingScope.actions = [];
                }
                if (existingScope.actions.indexOf(action) < 0) {
                    existingScope.actions.push(action);
                }
            }
            return args;
        });
        return instance;
    };
}
//# sourceMappingURL=cancelable.js.map

/***/ }),

/***/ "/sQB":
/*!**************************************************!*\
  !*** ./node_modules/@pnp/queryable/invokable.js ***!
  \**************************************************/
/*! exports provided: invokable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invokable", function() { return invokable; });
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operations.js */ "h6Ct");
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/core */ "JC1J");


/**
 * Allows a decorated object to be invoked as a function, optionally providing an implementation for that action
 *
 * @param invokeableAction Optional. The logic to execute upon invoking the object as a function.
 * @returns Decorator which applies the invokable logic to the tagged class
 */
function invokable(invokeableAction) {
    if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["isFunc"])(invokeableAction)) {
        invokeableAction = function (init) {
            return Object(_operations_js__WEBPACK_IMPORTED_MODULE_0__["op"])(this, _operations_js__WEBPACK_IMPORTED_MODULE_0__["get"], init);
        };
    }
    return (target) => {
        return new Proxy(target, {
            construct(clz, args, newTarget) {
                const invokableInstance = Object.assign(function (init) {
                    // the "this" for our invoked object will be set by extendable OR we use invokableInstance directly
                    const localThis = typeof this === "undefined" ? invokableInstance : this;
                    return Reflect.apply(invokeableAction, localThis, [init]);
                }, Reflect.construct(clz, args, newTarget));
                Reflect.setPrototypeOf(invokableInstance, newTarget.prototype);
                return invokableInstance;
            },
        });
    };
}
//# sourceMappingURL=invokable.js.map

/***/ }),

/***/ "0qgB":
/*!*********************************************************!*\
  !*** ./node_modules/@pnp/queryable/request-builders.js ***!
  \*********************************************************/
/*! exports provided: body, headers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "body", function() { return body; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return headers; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");

/**
 * takes the supplied object of type U, JSON.stringify's it, and sets it as the value of a "body" property
 */
function body(o, previous) {
    return Object.assign({ body: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["jsS"])(o) }, previous);
}
/**
 * Adds headers to an new/existing RequestInit
 *
 * @param o Headers to add
 * @param previous Any previous partial RequestInit
 * @returns RequestInit combining previous and specified headers
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function headers(o, previous) {
    return Object.assign({}, previous, { headers: { ...previous === null || previous === void 0 ? void 0 : previous.headers, ...o } });
}
//# sourceMappingURL=request-builders.js.map

/***/ }),

/***/ "1KyJ":
/*!***************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/components/Tasks/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fi */ "Tgqd");

//import "../LandingPage/Landing.scss"

var Tasks = function (props) {
    var _a;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'inCard bg-gradient-1' },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'inCard--header' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Tasks")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
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
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: 'bullents round' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                    x.Title,
                    date,
                    " ",
                    time,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: "https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/Tasks/DispForm.aspx?ID=".concat(x.ID), target: '_blank' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_icons_fi__WEBPACK_IMPORTED_MODULE_1__["FiEye"], null)))));
        }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Tasks);


/***/ }),

/***/ "26ea":
/*!**********************************************!*\
  !*** external "@microsoft/sp-property-pane" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26ea__;

/***/ }),

/***/ "29yR":
/*!**************************************************!*\
  !*** ./node_modules/react-icons/fc/index.esm.js ***!
  \**************************************************/
/*! exports provided: FcAbout, FcAcceptDatabase, FcAddColumn, FcAddDatabase, FcAddImage, FcAddRow, FcAddressBook, FcAdvance, FcAdvertising, FcAlarmClock, FcAlphabeticalSortingAz, FcAlphabeticalSortingZa, FcAndroidOs, FcAnswers, FcApproval, FcApprove, FcAreaChart, FcAssistant, FcAudioFile, FcAutomatic, FcAutomotive, FcBadDecision, FcBarChart, FcBbc, FcBearish, FcBinoculars, FcBiohazard, FcBiomass, FcBiotech, FcBookmark, FcBriefcase, FcBrokenLink, FcBullish, FcBusinessContact, FcBusiness, FcBusinessman, FcBusinesswoman, FcButtingIn, FcCableRelease, FcCalculator, FcCalendar, FcCallTransfer, FcCallback, FcCamcorderPro, FcCamcorder, FcCameraAddon, FcCameraIdentification, FcCamera, FcCancel, FcCandleSticks, FcCapacitor, FcCdLogo, FcCellPhone, FcChargeBattery, FcCheckmark, FcCircuit, FcClapperboard, FcClearFilters, FcClock, FcCloseUpMode, FcCloth, FcCollaboration, FcCollapse, FcCollect, FcComboChart, FcCommandLine, FcComments, FcCompactCamera, FcConferenceCall, FcContacts, FcCopyleft, FcCopyright, FcCrystalOscillator, FcCurrencyExchange, FcCursor, FcCustomerSupport, FcDam, FcDataBackup, FcDataConfiguration, FcDataEncryption, FcDataProtection, FcDataRecovery, FcDataSheet, FcDatabase, FcDebian, FcDebt, FcDecision, FcDeleteColumn, FcDeleteDatabase, FcDeleteRow, FcDepartment, FcDeployment, FcDiploma1, FcDiploma2, FcDisapprove, FcDisclaimer, FcDislike, FcDisplay, FcDoNotInhale, FcDoNotInsert, FcDoNotMix, FcDocument, FcDonate, FcDoughnutChart, FcDownLeft, FcDownRight, FcDown, FcDownload, FcDribbble, FcDvdLogo, FcEditImage, FcElectricalSensor, FcElectricalThreshold, FcElectricity, FcElectroDevices, FcElectronics, FcEmptyBattery, FcEmptyFilter, FcEmptyTrash, FcEndCall, FcEngineering, FcEnteringHeavenAlive, FcExpand, FcExpired, FcExport, FcExternal, FcFactoryBreakdown, FcFactory, FcFaq, FcFeedIn, FcFeedback, FcFile, FcFilingCabinet, FcFilledFilter, FcFilmReel, FcFilm, FcFinePrint, FcFlashAuto, FcFlashOff, FcFlashOn, FcFlowChart, FcFolder, FcFrame, FcFullBattery, FcFullTrash, FcGallery, FcGenealogy, FcGenericSortingAsc, FcGenericSortingDesc, FcGlobe, FcGoodDecision, FcGoogle, FcGraduationCap, FcGrid, FcHeadset, FcHeatMap, FcHighBattery, FcHighPriority, FcHome, FcIcons8Cup, FcIdea, FcImageFile, FcImport, FcInTransit, FcInfo, FcInspection, FcIntegratedWebcam, FcInternal, FcInvite, FcIpad, FcIphone, FcKey, FcKindle, FcLandscape, FcLeave, FcLeftDown, FcLeftDown2, FcLeftUp, FcLeftUp2, FcLeft, FcLibrary, FcLightAtTheEndOfTunnel, FcLikePlaceholder, FcLike, FcLineChart, FcLink, FcLinux, FcList, FcLockLandscape, FcLockPortrait, FcLock, FcLowBattery, FcLowPriority, FcMakeDecision, FcManager, FcMediumPriority, FcMenu, FcMiddleBattery, FcMindMap, FcMinus, FcMissedCall, FcMms, FcMoneyTransfer, FcMultipleCameras, FcMultipleDevices, FcMultipleInputs, FcMultipleSmartphones, FcMusic, FcNegativeDynamic, FcNeutralDecision, FcNeutralTrading, FcNews, FcNext, FcNfcSign, FcNightLandscape, FcNightPortrait, FcNoIdea, FcNoVideo, FcNook, FcNumericalSorting12, FcNumericalSorting21, FcOk, FcOldTimeCamera, FcOnlineSupport, FcOpenedFolder, FcOrgUnit, FcOrganization, FcOvertime, FcPackage, FcPaid, FcPanorama, FcParallelTasks, FcPhoneAndroid, FcPhone, FcPhotoReel, FcPicture, FcPieChart, FcPlanner, FcPlus, FcPodiumWithAudience, FcPodiumWithSpeaker, FcPodiumWithoutSpeaker, FcPortraitMode, FcPositiveDynamic, FcPrevious, FcPrint, FcPrivacy, FcProcess, FcPuzzle, FcQuestions, FcRadarPlot, FcRating, FcRatings, FcReadingEbook, FcReading, FcReddit, FcRedo, FcRefresh, FcRegisteredTrademark, FcRemoveImage, FcReuse, FcRightDown, FcRightDown2, FcRightUp, FcRightUp2, FcRight, FcRotateCamera, FcRotateToLandscape, FcRotateToPortrait, FcRuler, FcRules, FcSafe, FcSalesPerformance, FcScatterPlot, FcSearch, FcSelfServiceKiosk, FcSelfie, FcSerialTasks, FcServiceMark, FcServices, FcSettings, FcShare, FcShipped, FcShop, FcSignature, FcSimCardChip, FcSimCard, FcSlrBackSide, FcSmartphoneTablet, FcSms, FcSoundRecordingCopyright, FcSpeaker, FcSportsMode, FcStackOfPhotos, FcStart, FcStatistics, FcSteam, FcStumbleupon, FcSupport, FcSurvey, FcSwitchCamera, FcSynchronize, FcTabletAndroid, FcTemplate, FcTimeline, FcTodoList, FcTouchscreenSmartphone, FcTrademark, FcTreeStructure, FcTwoSmartphones, FcUndo, FcUnlock, FcUpLeft, FcUpRight, FcUp, FcUpload, FcUsb, FcVideoCall, FcVideoFile, FcVideoProjector, FcViewDetails, FcVip, FcVlc, FcVoicePresentation, FcVoicemail, FcWebcam, FcWiFiLogo, FcWikipedia, FcWorkflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAbout", function() { return FcAbout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAcceptDatabase", function() { return FcAcceptDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAddColumn", function() { return FcAddColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAddDatabase", function() { return FcAddDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAddImage", function() { return FcAddImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAddRow", function() { return FcAddRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAddressBook", function() { return FcAddressBook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAdvance", function() { return FcAdvance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAdvertising", function() { return FcAdvertising; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAlarmClock", function() { return FcAlarmClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAlphabeticalSortingAz", function() { return FcAlphabeticalSortingAz; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAlphabeticalSortingZa", function() { return FcAlphabeticalSortingZa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAndroidOs", function() { return FcAndroidOs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAnswers", function() { return FcAnswers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcApproval", function() { return FcApproval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcApprove", function() { return FcApprove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAreaChart", function() { return FcAreaChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAssistant", function() { return FcAssistant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAudioFile", function() { return FcAudioFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAutomatic", function() { return FcAutomatic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcAutomotive", function() { return FcAutomotive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBadDecision", function() { return FcBadDecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBarChart", function() { return FcBarChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBbc", function() { return FcBbc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBearish", function() { return FcBearish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBinoculars", function() { return FcBinoculars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBiohazard", function() { return FcBiohazard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBiomass", function() { return FcBiomass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBiotech", function() { return FcBiotech; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBookmark", function() { return FcBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBriefcase", function() { return FcBriefcase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBrokenLink", function() { return FcBrokenLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBullish", function() { return FcBullish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBusinessContact", function() { return FcBusinessContact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBusiness", function() { return FcBusiness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBusinessman", function() { return FcBusinessman; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcBusinesswoman", function() { return FcBusinesswoman; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcButtingIn", function() { return FcButtingIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCableRelease", function() { return FcCableRelease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCalculator", function() { return FcCalculator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCalendar", function() { return FcCalendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCallTransfer", function() { return FcCallTransfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCallback", function() { return FcCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCamcorderPro", function() { return FcCamcorderPro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCamcorder", function() { return FcCamcorder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCameraAddon", function() { return FcCameraAddon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCameraIdentification", function() { return FcCameraIdentification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCamera", function() { return FcCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCancel", function() { return FcCancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCandleSticks", function() { return FcCandleSticks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCapacitor", function() { return FcCapacitor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCdLogo", function() { return FcCdLogo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCellPhone", function() { return FcCellPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcChargeBattery", function() { return FcChargeBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCheckmark", function() { return FcCheckmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCircuit", function() { return FcCircuit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcClapperboard", function() { return FcClapperboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcClearFilters", function() { return FcClearFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcClock", function() { return FcClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCloseUpMode", function() { return FcCloseUpMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCloth", function() { return FcCloth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCollaboration", function() { return FcCollaboration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCollapse", function() { return FcCollapse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCollect", function() { return FcCollect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcComboChart", function() { return FcComboChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCommandLine", function() { return FcCommandLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcComments", function() { return FcComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCompactCamera", function() { return FcCompactCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcConferenceCall", function() { return FcConferenceCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcContacts", function() { return FcContacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCopyleft", function() { return FcCopyleft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCopyright", function() { return FcCopyright; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCrystalOscillator", function() { return FcCrystalOscillator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCurrencyExchange", function() { return FcCurrencyExchange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCursor", function() { return FcCursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcCustomerSupport", function() { return FcCustomerSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDam", function() { return FcDam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataBackup", function() { return FcDataBackup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataConfiguration", function() { return FcDataConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataEncryption", function() { return FcDataEncryption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataProtection", function() { return FcDataProtection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataRecovery", function() { return FcDataRecovery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDataSheet", function() { return FcDataSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDatabase", function() { return FcDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDebian", function() { return FcDebian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDebt", function() { return FcDebt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDecision", function() { return FcDecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDeleteColumn", function() { return FcDeleteColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDeleteDatabase", function() { return FcDeleteDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDeleteRow", function() { return FcDeleteRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDepartment", function() { return FcDepartment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDeployment", function() { return FcDeployment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDiploma1", function() { return FcDiploma1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDiploma2", function() { return FcDiploma2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDisapprove", function() { return FcDisapprove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDisclaimer", function() { return FcDisclaimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDislike", function() { return FcDislike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDisplay", function() { return FcDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDoNotInhale", function() { return FcDoNotInhale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDoNotInsert", function() { return FcDoNotInsert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDoNotMix", function() { return FcDoNotMix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDocument", function() { return FcDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDonate", function() { return FcDonate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDoughnutChart", function() { return FcDoughnutChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDownLeft", function() { return FcDownLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDownRight", function() { return FcDownRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDown", function() { return FcDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDownload", function() { return FcDownload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDribbble", function() { return FcDribbble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcDvdLogo", function() { return FcDvdLogo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEditImage", function() { return FcEditImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcElectricalSensor", function() { return FcElectricalSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcElectricalThreshold", function() { return FcElectricalThreshold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcElectricity", function() { return FcElectricity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcElectroDevices", function() { return FcElectroDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcElectronics", function() { return FcElectronics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEmptyBattery", function() { return FcEmptyBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEmptyFilter", function() { return FcEmptyFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEmptyTrash", function() { return FcEmptyTrash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEndCall", function() { return FcEndCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEngineering", function() { return FcEngineering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcEnteringHeavenAlive", function() { return FcEnteringHeavenAlive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcExpand", function() { return FcExpand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcExpired", function() { return FcExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcExport", function() { return FcExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcExternal", function() { return FcExternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFactoryBreakdown", function() { return FcFactoryBreakdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFactory", function() { return FcFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFaq", function() { return FcFaq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFeedIn", function() { return FcFeedIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFeedback", function() { return FcFeedback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFile", function() { return FcFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFilingCabinet", function() { return FcFilingCabinet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFilledFilter", function() { return FcFilledFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFilmReel", function() { return FcFilmReel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFilm", function() { return FcFilm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFinePrint", function() { return FcFinePrint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFlashAuto", function() { return FcFlashAuto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFlashOff", function() { return FcFlashOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFlashOn", function() { return FcFlashOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFlowChart", function() { return FcFlowChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFolder", function() { return FcFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFrame", function() { return FcFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFullBattery", function() { return FcFullBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcFullTrash", function() { return FcFullTrash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGallery", function() { return FcGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGenealogy", function() { return FcGenealogy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGenericSortingAsc", function() { return FcGenericSortingAsc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGenericSortingDesc", function() { return FcGenericSortingDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGlobe", function() { return FcGlobe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGoodDecision", function() { return FcGoodDecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGoogle", function() { return FcGoogle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGraduationCap", function() { return FcGraduationCap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcGrid", function() { return FcGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcHeadset", function() { return FcHeadset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcHeatMap", function() { return FcHeatMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcHighBattery", function() { return FcHighBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcHighPriority", function() { return FcHighPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcHome", function() { return FcHome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcIcons8Cup", function() { return FcIcons8Cup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcIdea", function() { return FcIdea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcImageFile", function() { return FcImageFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcImport", function() { return FcImport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcInTransit", function() { return FcInTransit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcInfo", function() { return FcInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcInspection", function() { return FcInspection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcIntegratedWebcam", function() { return FcIntegratedWebcam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcInternal", function() { return FcInternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcInvite", function() { return FcInvite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcIpad", function() { return FcIpad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcIphone", function() { return FcIphone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcKey", function() { return FcKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcKindle", function() { return FcKindle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLandscape", function() { return FcLandscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeave", function() { return FcLeave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeftDown", function() { return FcLeftDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeftDown2", function() { return FcLeftDown2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeftUp", function() { return FcLeftUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeftUp2", function() { return FcLeftUp2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLeft", function() { return FcLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLibrary", function() { return FcLibrary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLightAtTheEndOfTunnel", function() { return FcLightAtTheEndOfTunnel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLikePlaceholder", function() { return FcLikePlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLike", function() { return FcLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLineChart", function() { return FcLineChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLink", function() { return FcLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLinux", function() { return FcLinux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcList", function() { return FcList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLockLandscape", function() { return FcLockLandscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLockPortrait", function() { return FcLockPortrait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLock", function() { return FcLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLowBattery", function() { return FcLowBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcLowPriority", function() { return FcLowPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMakeDecision", function() { return FcMakeDecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcManager", function() { return FcManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMediumPriority", function() { return FcMediumPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMenu", function() { return FcMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMiddleBattery", function() { return FcMiddleBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMindMap", function() { return FcMindMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMinus", function() { return FcMinus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMissedCall", function() { return FcMissedCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMms", function() { return FcMms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMoneyTransfer", function() { return FcMoneyTransfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMultipleCameras", function() { return FcMultipleCameras; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMultipleDevices", function() { return FcMultipleDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMultipleInputs", function() { return FcMultipleInputs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMultipleSmartphones", function() { return FcMultipleSmartphones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcMusic", function() { return FcMusic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNegativeDynamic", function() { return FcNegativeDynamic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNeutralDecision", function() { return FcNeutralDecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNeutralTrading", function() { return FcNeutralTrading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNews", function() { return FcNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNext", function() { return FcNext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNfcSign", function() { return FcNfcSign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNightLandscape", function() { return FcNightLandscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNightPortrait", function() { return FcNightPortrait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNoIdea", function() { return FcNoIdea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNoVideo", function() { return FcNoVideo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNook", function() { return FcNook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNumericalSorting12", function() { return FcNumericalSorting12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcNumericalSorting21", function() { return FcNumericalSorting21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOk", function() { return FcOk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOldTimeCamera", function() { return FcOldTimeCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOnlineSupport", function() { return FcOnlineSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOpenedFolder", function() { return FcOpenedFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOrgUnit", function() { return FcOrgUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOrganization", function() { return FcOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcOvertime", function() { return FcOvertime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPackage", function() { return FcPackage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPaid", function() { return FcPaid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPanorama", function() { return FcPanorama; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcParallelTasks", function() { return FcParallelTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPhoneAndroid", function() { return FcPhoneAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPhone", function() { return FcPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPhotoReel", function() { return FcPhotoReel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPicture", function() { return FcPicture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPieChart", function() { return FcPieChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPlanner", function() { return FcPlanner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPlus", function() { return FcPlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPodiumWithAudience", function() { return FcPodiumWithAudience; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPodiumWithSpeaker", function() { return FcPodiumWithSpeaker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPodiumWithoutSpeaker", function() { return FcPodiumWithoutSpeaker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPortraitMode", function() { return FcPortraitMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPositiveDynamic", function() { return FcPositiveDynamic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPrevious", function() { return FcPrevious; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPrint", function() { return FcPrint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPrivacy", function() { return FcPrivacy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcProcess", function() { return FcProcess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcPuzzle", function() { return FcPuzzle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcQuestions", function() { return FcQuestions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRadarPlot", function() { return FcRadarPlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRating", function() { return FcRating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRatings", function() { return FcRatings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcReadingEbook", function() { return FcReadingEbook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcReading", function() { return FcReading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcReddit", function() { return FcReddit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRedo", function() { return FcRedo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRefresh", function() { return FcRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRegisteredTrademark", function() { return FcRegisteredTrademark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRemoveImage", function() { return FcRemoveImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcReuse", function() { return FcReuse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRightDown", function() { return FcRightDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRightDown2", function() { return FcRightDown2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRightUp", function() { return FcRightUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRightUp2", function() { return FcRightUp2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRight", function() { return FcRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRotateCamera", function() { return FcRotateCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRotateToLandscape", function() { return FcRotateToLandscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRotateToPortrait", function() { return FcRotateToPortrait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRuler", function() { return FcRuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcRules", function() { return FcRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSafe", function() { return FcSafe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSalesPerformance", function() { return FcSalesPerformance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcScatterPlot", function() { return FcScatterPlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSearch", function() { return FcSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSelfServiceKiosk", function() { return FcSelfServiceKiosk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSelfie", function() { return FcSelfie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSerialTasks", function() { return FcSerialTasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcServiceMark", function() { return FcServiceMark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcServices", function() { return FcServices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSettings", function() { return FcSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcShare", function() { return FcShare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcShipped", function() { return FcShipped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcShop", function() { return FcShop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSignature", function() { return FcSignature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSimCardChip", function() { return FcSimCardChip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSimCard", function() { return FcSimCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSlrBackSide", function() { return FcSlrBackSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSmartphoneTablet", function() { return FcSmartphoneTablet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSms", function() { return FcSms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSoundRecordingCopyright", function() { return FcSoundRecordingCopyright; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSpeaker", function() { return FcSpeaker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSportsMode", function() { return FcSportsMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcStackOfPhotos", function() { return FcStackOfPhotos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcStart", function() { return FcStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcStatistics", function() { return FcStatistics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSteam", function() { return FcSteam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcStumbleupon", function() { return FcStumbleupon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSupport", function() { return FcSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSurvey", function() { return FcSurvey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSwitchCamera", function() { return FcSwitchCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcSynchronize", function() { return FcSynchronize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTabletAndroid", function() { return FcTabletAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTemplate", function() { return FcTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTimeline", function() { return FcTimeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTodoList", function() { return FcTodoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTouchscreenSmartphone", function() { return FcTouchscreenSmartphone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTrademark", function() { return FcTrademark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTreeStructure", function() { return FcTreeStructure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcTwoSmartphones", function() { return FcTwoSmartphones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUndo", function() { return FcUndo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUnlock", function() { return FcUnlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUpLeft", function() { return FcUpLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUpRight", function() { return FcUpRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUp", function() { return FcUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUpload", function() { return FcUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcUsb", function() { return FcUsb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVideoCall", function() { return FcVideoCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVideoFile", function() { return FcVideoFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVideoProjector", function() { return FcVideoProjector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcViewDetails", function() { return FcViewDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVip", function() { return FcVip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVlc", function() { return FcVlc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVoicePresentation", function() { return FcVoicePresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcVoicemail", function() { return FcVoicemail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcWebcam", function() { return FcWebcam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcWiFiLogo", function() { return FcWiFiLogo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcWikipedia", function() { return FcWikipedia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FcWorkflow", function() { return FcWorkflow; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "Lnxd");
// THIS FILE IS AUTO GENERATED

function FcAbout (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M37,40H11l-6,6V12c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,37.3,40.3,40,37,40z"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"22","y":"20","width":"4","height":"11"}},{"tag":"circle","attr":{"cx":"24","cy":"15","r":"2"}}]}]})(props);
};
function FcAcceptDatabase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"circle","attr":{"fill":"#43A047","cx":"38","cy":"38","r":"10"}},{"tag":"polygon","attr":{"fill":"#DCEDC8","points":"42.5,33.3 36.8,39 34.1,36.3 32,38.5 36.8,43.3 44.6,35.5"}}]})(props);
};
function FcAddColumn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M30,5H18c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9C34,6.8,32.2,5,30,5z M18,39V9h12l0,30 H18z"}},{"tag":"circle","attr":{"fill":"#43A047","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36","y":"32","width":"4","height":"12"}},{"tag":"rect","attr":{"x":"32","y":"36","width":"12","height":"4"}}]}]})(props);
};
function FcAddDatabase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"circle","attr":{"fill":"#43A047","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36","y":"32","width":"4","height":"12"}},{"tag":"rect","attr":{"x":"32","y":"36","width":"12","height":"4"}}]}]})(props);
};
function FcAddImage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8CBCD6","d":"M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"}},{"tag":"circle","attr":{"fill":"#B3DDF5","cx":"35","cy":"16","r":"3"}},{"tag":"polygon","attr":{"fill":"#9AC9E3","points":"20,16 9,32 31,32"}},{"tag":"polygon","attr":{"fill":"#B3DDF5","points":"31,22 23,32 39,32"}},{"tag":"circle","attr":{"fill":"#43A047","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36","y":"32","width":"4","height":"12"}},{"tag":"rect","attr":{"x":"32","y":"36","width":"12","height":"4"}}]}]})(props);
};
function FcAddRow (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M43,30V18c0-2.2-1.8-4-4-4H9c-2.2,0-4,1.8-4,4v12c0,2.2,1.8,4,4,4h30C41.2,34,43,32.2,43,30z M9,18h30v12 L9,30V18z"}},{"tag":"circle","attr":{"fill":"#43A047","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"32","y":"36","width":"12","height":"4"}},{"tag":"rect","attr":{"x":"36","y":"32","width":"4","height":"12"}}]}]})(props);
};
function FcAddressBook (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#673AB7","d":"M38,44H12V4h26c2.2,0,4,1.8,4,4v32C42,42.2,40.2,44,38,44z"}},{"tag":"path","attr":{"fill":"#311B92","d":"M10,4h2v40h-2c-2.2,0-4-1.8-4-4V8C6,5.8,7.8,4,10,4z"}},{"tag":"path","attr":{"fill":"#fff","d":"M36,24.2c-0.1,4.8-3.1,6.9-5.3,6.7c-0.6-0.1-2.1-0.1-2.9-1.6c-0.8,1-1.8,1.6-3.1,1.6c-2.6,0-3.3-2.5-3.4-3.1 c-0.1-0.7-0.2-1.4-0.1-2.2c0.1-1,1.1-6.5,5.7-6.5c2.2,0,3.5,1.1,3.7,1.3L30,27.2c0,0.3-0.2,1.6,1.1,1.6c2.1,0,2.4-3.9,2.4-4.6 c0.1-1.2,0.3-8.2-7-8.2c-6.9,0-7.9,7.4-8,9.2c-0.5,8.5,6,8.5,7.2,8.5c1.7,0,3.7-0.7,3.9-0.8l0.4,2c-0.3,0.2-2,1.1-4.4,1.1 c-2.2,0-10.1-0.4-9.8-10.8C16.1,23.1,17.4,14,26.6,14C35.8,14,36,22.1,36,24.2z M24.1,25.5c-0.1,1,0,1.8,0.2,2.3 c0.2,0.5,0.6,0.8,1.2,0.8c0.1,0,0.3,0,0.4-0.1c0.2-0.1,0.3-0.1,0.5-0.3c0.2-0.1,0.3-0.3,0.5-0.6c0.2-0.2,0.3-0.6,0.4-1l0.5-5.4 c-0.2-0.1-0.5-0.1-0.7-0.1c-0.5,0-0.9,0.1-1.2,0.3c-0.3,0.2-0.6,0.5-0.9,0.8c-0.2,0.4-0.4,0.8-0.6,1.3S24.2,24.8,24.1,25.5z"}}]})(props);
};
function FcAdvance (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"polygon","attr":{"points":"46.1,24 33,35 33,13"}},{"tag":"rect","attr":{"x":"10","y":"20","width":"4","height":"8"}},{"tag":"rect","attr":{"x":"4","y":"20","width":"4","height":"8"}},{"tag":"rect","attr":{"x":"16","y":"20","width":"4","height":"8"}},{"tag":"rect","attr":{"x":"22","y":"20","width":"14","height":"8"}}]}]})(props);
};
function FcAdvertising (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#90CAF9"},"child":[{"tag":"path","attr":{"d":"M17.4,33H15v-4h4l0.4,1.5C19.7,31.8,18.7,33,17.4,33z"}},{"tag":"path","attr":{"d":"M37,36c0,0-11.8-7-18-7V15c5.8,0,18-7,18-7V36z"}}]},{"tag":"g","attr":{"fill":"#283593"},"child":[{"tag":"circle","attr":{"cx":"9","cy":"22","r":"5"}},{"tag":"path","attr":{"d":"M40,19h-3v6h3c1.7,0,3-1.3,3-3S41.7,19,40,19z"}},{"tag":"path","attr":{"d":"M18.6,41.2c-0.9,0.6-2.5,1.2-4.6,1.4c-0.6,0.1-1.2-0.3-1.4-1L8.2,27.9c0,0,8.8-6.2,8.8,1.1 c0,5.5,1.5,8.4,2.2,9.5c0.5,0.7,0.5,1.6,0,2.3C19,41,18.8,41.1,18.6,41.2z"}}]},{"tag":"path","attr":{"fill":"#3F51B5","d":"M9,29h10V15H9c-1.1,0-2,0.9-2,2v10C7,28.1,7.9,29,9,29z"}},{"tag":"path","attr":{"fill":"#42A5F5","d":"M38,38L38,38c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v28C40,37.1,39.1,38,38,38z"}}]})(props);
};
function FcAlarmClock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"path","attr":{"d":"M38.5,44.6l-4-4l2.1-2.1l4,4c0.6,0.6,0.6,1.5,0,2.1l0,0C40.1,45.1,39.1,45.1,38.5,44.6z"}},{"tag":"path","attr":{"d":"M9.5,44.6l4-4l-2.1-2.1l-4,4c-0.6,0.6-0.6,1.5,0,2.1l0,0C7.9,45.1,8.9,45.1,9.5,44.6z"}}]},{"tag":"circle","attr":{"fill":"#C62828","cx":"24","cy":"24","r":"20"}},{"tag":"circle","attr":{"fill":"#eee","cx":"24","cy":"24","r":"16"}},{"tag":"rect","attr":{"x":"19","y":"22.1","transform":"matrix(-.707 -.707 .707 -.707 12.904 62.537)","fill":"#E53935","width":".8","height":"13"}},{"tag":"rect","attr":{"x":"23","y":"11","width":"2","height":"13"}},{"tag":"rect","attr":{"x":"26.1","y":"22.7","transform":"matrix(-.707 .707 -.707 -.707 65.787 27.25)","width":"2.3","height":"9.2"}},{"tag":"circle","attr":{"cx":"24","cy":"24","r":"2"}},{"tag":"circle","attr":{"fill":"#C62828","cx":"24","cy":"24","r":"1"}},{"tag":"rect","attr":{"x":"22","y":"1","fill":"#37474F","width":"4","height":"3"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"path","attr":{"d":"M44.4,16.2c2.5-3.5,2.1-8.4-1-11.5c-3.1-3.1-8-3.5-11.5-1L44.4,16.2z"}},{"tag":"path","attr":{"d":"M3.6,16.2c-2.5-3.5-2.1-8.4,1-11.5c3.1-3.1,8-3.5,11.5-1L3.6,16.2z"}}]}]})(props);
};
function FcAlphabeticalSortingAz (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#546E7A","points":"38,33 38,5 34,5 34,33 28,33 36,43 44,33"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"path","attr":{"d":"M16.8,17.2h-5.3l-1.1,3H6.9L12.6,5h2.9l5.7,15.2h-3.2L16.8,17.2z M12.2,14.5H16l-1.9-5.7L12.2,14.5z"}},{"tag":"path","attr":{"d":"M12.4,40.5H20V43H8.4v-1.9L16,30.3H8.4v-2.5h11.4v1.7L12.4,40.5z"}}]}]})(props);
};
function FcAlphabeticalSortingZa (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"path","attr":{"d":"M16.8,40h-5.3l-1.1,3H6.9l5.7-15.2h2.9L21.1,43h-3.2L16.8,40z M12.2,37.3H16l-1.9-5.7L12.2,37.3z"}},{"tag":"path","attr":{"d":"M12.4,17.7H20v2.5H8.4v-1.9L16,7.5H8.4V5h11.4v1.7L12.4,17.7z"}}]},{"tag":"polygon","attr":{"fill":"#546E7A","points":"38,33 38,5 34,5 34,33 28,33 36,43 44,33"}}]})(props);
};
function FcAndroidOs (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#7CB342","d":"M12,29.001c0,1.104-0.896,2-2,2l0,0c-1.104,0-2-0.896-2-2v-9c0-1.104,0.896-2,2-2l0,0c1.104,0,2,0.896,2,2\r\n\t\tV29.001z"}},{"tag":"path","attr":{"fill":"#7CB342","d":"M40,29.001c0,1.104-0.896,2-2,2l0,0c-1.104,0-2-0.896-2-2v-9c0-1.104,0.896-2,2-2l0,0c1.104,0,2,0.896,2,2\r\n\t\tV29.001z"}},{"tag":"path","attr":{"fill":"#7CB342","d":"M22,40c0,1.104-0.896,2-2,2l0,0c-1.104,0-2-0.896-2-2v-9c0-1.104,0.896-2,2-2l0,0c1.104,0,2,0.896,2,2V40z"}},{"tag":"path","attr":{"fill":"#7CB342","d":"M30,40c0,1.104-0.896,2-2,2l0,0c-1.104,0-2-0.896-2-2v-9c0-1.104,0.896-2,2-2l0,0c1.104,0,2,0.896,2,2V40z"}},{"tag":"path","attr":{"fill":"#7CB342","d":"M14,18.001V33c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V18.001H14z"}},{"tag":"path","attr":{"fill":"#7CB342","d":"M24,8c-6,0-9.655,3.645-10,8h20C33.654,11.645,30,8,24,8z M20,13.598c-0.552,0-1-0.448-1-1s0.448-1,1-1\r\n\t\ts1,0.448,1,1S20.552,13.598,20,13.598z M28,13.598c-0.553,0-1-0.448-1-1s0.447-1,1-1s1,0.448,1,1S28.553,13.598,28,13.598z"}},{"tag":"line","attr":{"fill":"none","stroke":"#7CB342","strokeWidth":"2","strokeLinecap":"round","x1":"30","y1":"7","x2":"28.334","y2":"9.499"}},{"tag":"line","attr":{"fill":"none","stroke":"#7CB342","strokeWidth":"2","strokeLinecap":"round","x1":"18","y1":"7","x2":"19.333","y2":"9.082"}}]}]})(props);
};
function FcAnswers (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#42A5F5","points":"36,44 8,44 8,8 28,8 36,16"}},{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,40 12,40 12,4 32,4 40,12"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,13 31,13 31,5.5"}},{"tag":"path","attr":{"fill":"#1976D2","d":"M23.4,29.9c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.5s0.3-0.2,0.5-0.3s0.4-0.1,0.6-0.1s0.5,0,0.7,0.1 s0.4,0.2,0.5,0.3s0.2,0.3,0.3,0.5s0.1,0.4,0.1,0.6s0,0.4-0.1,0.6s-0.2,0.3-0.3,0.5s-0.3,0.2-0.5,0.3s-0.4,0.1-0.7,0.1 s-0.5,0-0.6-0.1s-0.4-0.2-0.5-0.3s-0.2-0.3-0.3-0.5S23.4,30.1,23.4,29.9z M26.1,26.8h-2.3L23.4,17h3L26.1,26.8z"}}]})(props);
};
function FcApproval (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#8BC34A","points":"24,3 28.7,6.6 34.5,5.8 36.7,11.3 42.2,13.5 41.4,19.3 45,24 41.4,28.7 42.2,34.5 36.7,36.7 34.5,42.2 28.7,41.4 24,45 19.3,41.4 13.5,42.2 11.3,36.7 5.8,34.5 6.6,28.7 3,24 6.6,19.3 5.8,13.5 11.3,11.3 13.5,5.8 19.3,6.6"}},{"tag":"polygon","attr":{"fill":"#CCFF90","points":"34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"}}]})(props);
};
function FcApprove (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"polygon","attr":{"fill":"#4CAF50","points":"32.6,18.6 22.3,28.9 17.4,24 14.6,26.8 22.3,34.5 35.4,21.4"}}]})(props);
};
function FcAreaChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"42,37 6,37 6,25 16,10 30,17 42,6"}},{"tag":"polygon","attr":{"fill":"#00BCD4","points":"42,42 6,42 6,32 16,24 30,26 42,17"}}]})(props);
};
function FcAssistant (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}}]},{"tag":"path","attr":{"fill":"#FFB74D","d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M24,3C14.6,3,7,10.6,7,20c0,1.2,0,3.4,0,3.4L9,25v-3l21-9.8l9,9.8v3l2-1.6c0,0,0-2.1,0-3.4 C41,12,35.3,3,24,3z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"31","cy":"26","r":"2"}},{"tag":"circle","attr":{"cx":"17","cy":"26","r":"2"}}]},{"tag":"path","attr":{"fill":"#757575","d":"M43,24c-0.6,0-1,0.4-1,1v-7c0-8.8-7.2-16-16-16h-7c-0.6,0-1,0.4-1,1s0.4,1,1,1h7c7.7,0,14,6.3,14,14v10 c0,0.6,0.4,1,1,1s1-0.4,1-1v2c0,3.9-3.1,7-7,7H24c-0.6,0-1,0.4-1,1s0.4,1,1,1h11c5,0,9-4,9-9v-5C44,24.4,43.6,24,43,24z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"path","attr":{"d":"M43,22h-1c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h1c1.1,0,2-0.9,2-2v-4C45,22.9,44.1,22,43,22z"}},{"tag":"circle","attr":{"cx":"24","cy":"38","r":"2"}}]}]})(props);
};
function FcAudioFile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"204","fill":"none","width":"48","height":"48"}},{"tag":"polygon","attr":{"fill":"#90CAF9","points":"244,45 212,45 212,3 234,3 244,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"242.5,14 233,14 233,4.5"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"circle","attr":{"cx":"227","cy":"30","r":"4"}},{"tag":"polygon","attr":{"points":"234,21 229,19 229,30 231,30 231,22.9 234,24"}}]},{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,45 8,45 8,3 30,3 40,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,14 29,14 29,4.5"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"circle","attr":{"cx":"23","cy":"30","r":"4"}},{"tag":"polygon","attr":{"points":"30,21 25,19 25,30 27,30 27,22.9 30,24"}}]}]})(props);
};
function FcAutomatic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M39,43H9c-2.2,0-4-1.8-4-4V9c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v30C43,41.2,41.2,43,39,43z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M33.6,25.4c0.1-0.4,0.1-0.9,0.1-1.4s0-0.9-0.1-1.4l2.8-2c0.3-0.2,0.4-0.6,0.2-0.9l-2.7-4.6 c-0.2-0.3-0.5-0.4-0.8-0.3L30,16.3c-0.7-0.6-1.5-1-2.4-1.4l-0.3-3.4c0-0.3-0.3-0.6-0.6-0.6h-5.3c-0.3,0-0.6,0.3-0.6,0.6L20.4,15 c-0.9,0.3-1.6,0.8-2.4,1.4l-3.1-1.4c-0.3-0.1-0.7,0-0.8,0.3l-2.7,4.6c-0.2,0.3-0.1,0.7,0.2,0.9l2.8,2c-0.1,0.4-0.1,0.9-0.1,1.4 s0,0.9,0.1,1.4l-2.8,2c-0.3,0.2-0.4,0.6-0.2,0.9l2.7,4.6c0.2,0.3,0.5,0.4,0.8,0.3l3.1-1.4c0.7,0.6,1.5,1,2.4,1.4l0.3,3.4 c0,0.3,0.3,0.6,0.6,0.6h5.3c0.3,0,0.6-0.3,0.6-0.6l0.3-3.4c0.9-0.3,1.6-0.8,2.4-1.4l3.1,1.4c0.3,0.1,0.7,0,0.8-0.3l2.7-4.6 c0.2-0.3,0.1-0.7-0.2-0.9L33.6,25.4z M24,29c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5c2.8,0,5,2.2,5,5C29,26.8,26.8,29,24,29z"}}]})(props);
};
function FcAutomotive (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"none","stroke":"#F44336","strokeWidth":"4","strokeMiterlimit":"10","d":"M7,20v-8c0-2.2,1.8-4,4-4h14c1.2,0,2.4,0.6,3.2,1.6 L35,18"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"35","cy":"37","r":"5"}},{"tag":"circle","attr":{"cx":"13","cy":"37","r":"5"}}]},{"tag":"path","attr":{"fill":"#F44336","d":"M40.2,17L33,14H7c-1.2,0-2,0.8-2,2v10c0,1.2,0.8,2,2,2h1c0-2.8,2.2-5,5-5s5,2.2,5,5h12c0-2.8,2.2-5,5-5 s5,2.2,5,5h1c1.2,0,2-0.8,2-2v-5.2C43,19.2,41.8,17.6,40.2,17z"}},{"tag":"g","attr":{"fill":"#546E7A"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"37","r":"3"}},{"tag":"circle","attr":{"cx":"35","cy":"37","r":"2"}},{"tag":"circle","attr":{"cx":"13","cy":"37","r":"2"}},{"tag":"path","attr":{"d":"M30.4,39c-0.3-0.6-0.4-1.3-0.4-2s0.2-1.4,0.4-2H17.6c0.3,0.6,0.4,1.3,0.4,2s-0.2,1.4-0.4,2H30.4z"}}]}]})(props);
};
function FcBadDecision (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"rect","attr":{"x":"16","y":"24","fill":"#F44336","width":"16","height":"4"}}]})(props);
};
function FcBarChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"rect","attr":{"x":"19","y":"22","width":"10","height":"20"}},{"tag":"rect","attr":{"x":"6","y":"12","width":"10","height":"30"}},{"tag":"rect","attr":{"x":"32","y":"6","width":"10","height":"36"}}]}]})(props);
};
function FcBbc (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M0,17v14h14V17H0z M34,17v14h14V17H34z M17,17v14h14V17H17z"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M8.2,23.7c0,0,1.3-0.5,1.3-2c0,0,0.2-2.4-3-2.7H3v10h4c0,0,3.4,0,3.4-2.8C10.4,26.2,10.5,24.3,8.2,23.7z\r\n\t M4.8,20.6h1.4c1.5,0.1,1.4,1.2,1.4,1.2c0,1.4-1.6,1.4-1.6,1.4H4.8V20.6z M6.7,27.5H4.8v-2.7h1.9c1.9,0,1.9,1.3,1.9,1.3\r\n\tC8.5,27.5,6.7,27.5,6.7,27.5z M25.2,23.7c0,0,1.3-0.5,1.3-2c0,0,0.2-2.4-3-2.7H20v10h4c0,0,3.4,0,3.4-2.8\r\n\tC27.4,26.2,27.5,24.3,25.2,23.7z M21.8,20.6h1.4c1.5,0.1,1.4,1.2,1.4,1.2c0,1.4-1.6,1.4-1.6,1.4h-1.2V20.6z M23.7,27.5h-1.9v-2.7\r\n\th1.9c1.9,0,1.9,1.3,1.9,1.3C25.5,27.5,23.7,27.5,23.7,27.5z M45.3,28.1c0,0-2.9,1.8-6.3,0.4c0,0-2.9-1.1-3-4.5c0,0-0.1-3.5,3.7-4.7\r\n\tc0,0,1-0.4,2.8-0.2c0,0,1.1,0.1,2.7,0.8v1.8c0,0-1.7-1.1-3.7-1.1c0,0-3.6-0.1-3.8,3.5c0,0-0.1,3.3,3.7,3.4c0,0,1.6,0.2,3.8-1.2\r\n\tL45.3,28.1L45.3,28.1z"}}]})(props);
};
function FcBearish (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#F44336"},"child":[{"tag":"rect","attr":{"x":"40","y":"34","width":"4","height":"10"}},{"tag":"rect","attr":{"x":"34","y":"29","width":"4","height":"15"}},{"tag":"rect","attr":{"x":"28","y":"33","width":"4","height":"11"}},{"tag":"rect","attr":{"x":"22","y":"25","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"16","y":"28","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"10","y":"24","width":"4","height":"20"}},{"tag":"rect","attr":{"x":"4","y":"19","width":"4","height":"25"}}]},{"tag":"g","attr":{"fill":"#D32F2F"},"child":[{"tag":"polygon","attr":{"points":"34,13.2 30,17.2 20,7.2 15,12.2 7.4,4.6 4.6,7.4 15,17.8 20,12.8 30,22.8 34,18.8 40.1,24.9 42.9,22.1"}},{"tag":"polygon","attr":{"points":"44,26 35,26 44,17"}}]}]})(props);
};
function FcBinoculars (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"16","r":"6"}},{"tag":"circle","attr":{"cx":"15","cy":"16","r":"6"}},{"tag":"path","attr":{"d":"M46.7,25l-15.3,3H16.7L1.4,25l4.3-7.9c1.1-1.9,3.1-3.1,5.3-3.1h26.2c2.2,0,4.2,1.2,5.3,3.1L46.7,25z"}},{"tag":"circle","attr":{"cx":"38","cy":"30","r":"10"}},{"tag":"circle","attr":{"cx":"10","cy":"30","r":"10"}},{"tag":"circle","attr":{"cx":"24","cy":"28","r":"5"}}]},{"tag":"circle","attr":{"fill":"#546E7A","cx":"24","cy":"28","r":"2"}},{"tag":"g","attr":{"fill":"#a0f"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"30","r":"7"}},{"tag":"circle","attr":{"cx":"10","cy":"30","r":"7"}}]},{"tag":"g","attr":{"fill":"#CE93D8"},"child":[{"tag":"path","attr":{"d":"M41.7,27.7c-1-1.1-2.3-1.7-3.7-1.7s-2.8,0.6-3.7,1.7c-0.4,0.4-0.3,1,0.1,1.4c0.4,0.4,1,0.3,1.4-0.1 c1.2-1.3,3.3-1.3,4.5,0c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3C42.1,28.7,42.1,28.1,41.7,27.7z"}},{"tag":"path","attr":{"d":"M10,26c-1.4,0-2.8,0.6-3.7,1.7c-0.4,0.4-0.3,1,0.1,1.4c0.4,0.4,1,0.3,1.4-0.1c1.2-1.3,3.3-1.3,4.5,0 c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0.1-1.4C12.8,26.6,11.4,26,10,26z"}}]}]})(props);
};
function FcBiohazard (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#00A344","d":"M24,13c-7.2,0-13,5.8-13,13s5.8,13,13,13s13-5.8,13-13S31.2,13,24,13z M24,35c-5,0-9-4-9-9s4-9,9-9s9,4,9,9 S29,35,24,35z"}},{"tag":"path","attr":{"fill":"#00C853","d":"M8.5,25.4c4-2.2,9-1.1,11.5,2.5c0.1,0.1,0.2,0.1,0.3,0.1l1.2-0.7c0.1-0.1,0.2-0.2,0.1-0.3 c0-0.2-0.1-0.4-0.1-0.6c0,0,0,0,0,0c0-0.1,0-0.1,0-0.2c0,0,0,0,0,0c0-0.1,0-0.1,0-0.2c0,0,0,0,0,0c0-0.1,0-0.1,0-0.2l0,0 c0-0.1,0-0.1,0.1-0.2c0,0,0,0,0,0c0-0.1,0-0.1,0.1-0.2c0,0,0,0,0,0c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0.1-0.1 c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0,0,0.1-0.1,0.1-0.1 c0,0,0,0,0,0c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0.1,0c0.2-0.1,0.4-0.2,0.5-0.2c0.1,0,0.2-0.1,0.2-0.3v-1.3c0-0.1-0.1-0.2-0.2-0.2 c-4.5-0.4-8-4.1-8-8.6c0-4.1,3-7.6,6.9-8.4c0.1,0,0.2-0.1,0.2-0.3V4.8c0-0.1-0.1-0.2-0.2-0.2C16.4,5.5,12,10.4,12,16.3 c0,1.3,0.2,2.6,0.6,3.8c-1.2,0.2-2.5,0.7-3.6,1.3c-5.2,3-7.3,9.2-5.2,14.5C3.9,36,4,36,4.1,36l0.3-0.2c0.1-0.1,0.2-0.2,0.1-0.3 C3.3,31.7,4.8,27.4,8.5,25.4L8.5,25.4z M39,21.4c-1.2-0.7-2.4-1.1-3.6-1.3c0.4-1.2,0.6-2.4,0.6-3.8c0-5.9-4.4-10.8-10.2-11.7 c-0.1,0-0.2,0.1-0.2,0.2v0.4c0,0.1,0.1,0.2,0.2,0.3c4,0.8,6.9,4.3,6.9,8.4c0,4.5-3.5,8.2-8,8.6c-0.1,0-0.2,0.1-0.2,0.2v1.3 c0,0.1,0.1,0.2,0.2,0.3c0.2,0.1,0.4,0.1,0.6,0.2c0,0,0,0,0,0c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0c0.1,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0 c0.1,0.1,0.2,0.2,0.3,0.3c0,0,0,0,0,0c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0c0,0,0.1,0.1,0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1 c0,0,0,0.1,0.1,0.1c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0,0,0,0,0,0c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0.1 c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0.2,0,0.4-0.1,0.6c0,0.1,0,0.2,0.1,0.3l1.2,0.7c0.1,0.1,0.2,0,0.3-0.1c2.6-3.6,7.6-4.8,11.5-2.5 c3.6,2.1,5.2,6.3,3.9,10.1c0,0.1,0,0.2,0.1,0.3l0.3,0.2c0.1,0.1,0.2,0,0.3-0.1C46.3,30.5,44.2,24.3,39,21.4L39,21.4z M30.8,40.3 c-4-2.2-5.5-7.1-3.5-11.1c0.1-0.1,0-0.2-0.1-0.3L26,28.2c-0.1-0.1-0.2,0-0.3,0c-0.2,0.1-0.3,0.3-0.5,0.3c0,0,0,0,0,0 c-0.1,0-0.1,0.1-0.2,0.1c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0.1c0,0,0,0,0,0c-0.1,0-0.3,0.1-0.4,0.1c0,0,0,0,0,0c-0.1,0-0.1,0-0.2,0 c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0 c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.1,0-0.1,0-0.2-0.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0,0,0-0.1,0c-0.2-0.1-0.3-0.2-0.5-0.3 c-0.1-0.1-0.2-0.1-0.3,0l-1.2,0.7c-0.1,0.1-0.1,0.2-0.1,0.3c1.9,4,0.4,8.8-3.5,11.1c-3.6,2.1-8.2,1.3-10.9-1.7 c-0.1-0.1-0.2-0.1-0.3-0.1l-0.3,0.2c-0.1,0.1-0.1,0.2-0.1,0.3c3.6,4.5,10.2,5.8,15.4,2.8c1.2-0.7,2.2-1.5,3-2.4 c0.8,0.9,1.8,1.8,3,2.4c5.2,3,11.7,1.6,15.4-2.8c0.1-0.1,0-0.2-0.1-0.3L42,38.5c-0.1-0.1-0.2,0-0.3,0.1C39,41.5,34.4,42.3,30.8,40.3 L30.8,40.3z"}}]})(props);
};
function FcBiomass (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#9CCC65","d":"M32,15V7H16v8L6.2,40c-0.6,1.5,0.5,3,2.1,3h31.5c1.6,0,2.6-1.6,2.1-3L32,15z"}},{"tag":"path","attr":{"fill":"#8BC34A","d":"M32,9H16c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2v0C34,8.1,33.1,9,32,9z"}},{"tag":"path","attr":{"fill":"#2E7D32","d":"M28,30c0,4.4-4,8-4,8s-4-3.6-4-8s4-8,4-8S28,25.6,28,30z"}},{"tag":"path","attr":{"fill":"#388E3C","d":"M31.1,32.6c-2,4-7.1,5.4-7.1,5.4s-2-5,0-8.9s7.1-5.4,7.1-5.4S33.1,28.6,31.1,32.6z"}},{"tag":"path","attr":{"fill":"#43A047","d":"M16.9,32.6c2,4,7.1,5.4,7.1,5.4s2-5,0-8.9s-7.1-5.4-7.1-5.4S14.9,28.6,16.9,32.6z"}}]})(props);
};
function FcBiotech (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#AD1457","d":"M36,4c0,9.3-6,13.2-12.8,17.8C16.1,26.5,8,31.8,8,44h4c0-10.1,6.5-14.4,13.4-18.9C32.2,20.6,40,15.4,40,4 H36z"}},{"tag":"path","attr":{"fill":"#AD1457","d":"M38,41H11c-0.6,0-1-0.4-1-1s0.4-1,1-1h27c0.6,0,1,0.4,1,1S38.6,41,38,41z"}},{"tag":"path","attr":{"fill":"#AD1457","d":"M36,37H12c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S36.6,37,36,37z"}},{"tag":"path","attr":{"fill":"#AD1457","d":"M34,33H14c-0.6,0-1-0.4-1-1s0.4-1,1-1h20c0.6,0,1,0.4,1,1S34.6,33,34,33z"}},{"tag":"path","attr":{"fill":"#AD1457","d":"M29,29H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h10c0.6,0,1,0.4,1,1S29.6,29,29,29z"}},{"tag":"path","attr":{"fill":"#E91E63","d":"M37,9H10C9.4,9,9,8.6,9,8s0.4-1,1-1h27c0.6,0,1,0.4,1,1S37.6,9,37,9z"}},{"tag":"path","attr":{"fill":"#E91E63","d":"M36,13H12c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S36.6,13,36,13z"}},{"tag":"path","attr":{"fill":"#E91E63","d":"M34,17H14c-0.6,0-1-0.4-1-1s0.4-1,1-1h20c0.6,0,1,0.4,1,1S34.6,17,34,17z"}},{"tag":"path","attr":{"fill":"#E91E63","d":"M29,21H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h10c0.6,0,1,0.4,1,1S29.6,21,29,21z"}},{"tag":"path","attr":{"fill":"#E91E63","d":"M40,44h-4c0-10.1-6.5-14.4-13.4-18.9C15.8,20.6,8,15.4,8,4h4c0,9.3,6,13.2,12.8,17.8 C31.9,26.5,40,31.8,40,44z"}}]})(props);
};
function FcBookmark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"}}]})(props);
};
function FcBriefcase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#424242","d":"M27,7h-6c-1.7,0-3,1.3-3,3v3h2v-3c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v3h2v-3C30,8.3,28.7,7,27,7z"}},{"tag":"path","attr":{"fill":"#E65100","d":"M40,43H8c-2.2,0-4-1.8-4-4V15c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,41.2,42.2,43,40,43z"}},{"tag":"path","attr":{"fill":"#FF6E40","d":"M40,28H8c-2.2,0-4-1.8-4-4v-9c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v9C44,26.2,42.2,28,40,28z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M26,26h-4c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v2C27,25.6,26.6,26,26,26z"}}]})(props);
};
function FcBrokenLink (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"path","attr":{"d":"M17.5,27c-1.1,1.2-2.7,2-4.5,2h-3c-3.3,0-6-2.7-6-6s2.7-6,6-6h3c1.8,0,3.4,0.8,4.5,2h4.7 c-1.5-3.5-5.1-6-9.2-6h-3C4.5,13,0,17.5,0,23s4.5,10,10,10h3c4.1,0,7.6-2.5,9.2-6H17.5z"}},{"tag":"path","attr":{"d":"M38,13h-3c-4.1,0-7.6,2.5-9.2,6h4.7c1.1-1.2,2.7-2,4.5-2h3c3.3,0,6,2.7,6,6s-2.7,6-6,6h-3 c-1.8,0-3.4-0.8-4.5-2h-4.7c1.5,3.5,5.1,6,9.2,6h3c5.5,0,10-4.5,10-10S43.5,13,38,13z"}}]},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"polygon","attr":{"points":"19.5,4 16,6 22.1,14.1 23.4,13.3"}},{"tag":"polygon","attr":{"points":"28.5,4 32,6 25.9,14.1 24.6,13.3"}},{"tag":"polygon","attr":{"points":"28.5,44 32,42 25.9,33.9 24.6,34.7"}},{"tag":"polygon","attr":{"points":"19.5,44 16,42 22.1,33.9 23.4,34.7"}}]}]})(props);
};
function FcBullish (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#4CAF50"},"child":[{"tag":"rect","attr":{"x":"40","y":"21","width":"4","height":"23"}},{"tag":"rect","attr":{"x":"34","y":"28","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"28","y":"23","width":"4","height":"21"}},{"tag":"rect","attr":{"x":"22","y":"29","width":"4","height":"15"}},{"tag":"rect","attr":{"x":"16","y":"32","width":"4","height":"12"}},{"tag":"rect","attr":{"x":"10","y":"30","width":"4","height":"14"}},{"tag":"rect","attr":{"x":"4","y":"34","width":"4","height":"10"}}]},{"tag":"g","attr":{"fill":"#388E3C"},"child":[{"tag":"polygon","attr":{"points":"40.1,9.1 34,15.2 30,11.2 20,21.2 15,16.2 4.6,26.6 7.4,29.4 15,21.8 20,26.8 30,16.8 34,20.8 42.9,11.9"}},{"tag":"polygon","attr":{"points":"44,8 35,8 44,17"}}]}]})(props);
};
function FcBusinessContact (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#673AB7","d":"M40,7H8c-2.2,0-4,1.8-4,4v26c0,2.2,1.8,4,4,4h5v-1.3c-0.6-0.3-1-1-1-1.7c0-1.1,0.9-2,2-2s2,0.9,2,2 c0,0.7-0.4,1.4-1,1.7V41h18v-1.3c-0.6-0.3-1-1-1-1.7c0-1.1,0.9-2,2-2s2,0.9,2,2c0,0.7-0.4,1.4-1,1.7V41h5c2.2,0,4-1.8,4-4V11 C44,8.8,42.2,7,40,7z"}},{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"18","r":"4"}},{"tag":"path","attr":{"d":"M31,28c0,0-1.9-4-7-4c-5.1,0-7,4-7,4v2h14V28z"}}]}]})(props);
};
function FcBusiness (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#263238"},"child":[{"tag":"path","attr":{"d":"M11,44H9c-0.6,0-1-0.4-1-1v-2h4v2C12,43.6,11.6,44,11,44z"}},{"tag":"path","attr":{"d":"M39,44h-2c-0.6,0-1-0.4-1-1v-2h4v2C40,43.6,39.6,44,39,44z"}}]},{"tag":"path","attr":{"fill":"#37474F","d":"M27,7h-6c-1.7,0-3,1.3-3,3v3h2v-3c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v3h2v-3C30,8.3,28.7,7,27,7z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M40,43H8c-2.2,0-4-1.8-4-4V15c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,41.2,42.2,43,40,43z"}}]})(props);
};
function FcBusinessman (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FF9800","points":"24,37 19,31 19,25 29,25 29,31"}},{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"19","r":"2"}},{"tag":"circle","attr":{"cx":"15","cy":"19","r":"2"}}]},{"tag":"path","attr":{"fill":"#FFB74D","d":"M33,13c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,5,4,9,9,9s9-4,9-9C33,18.9,33,14.1,33,13z"}},{"tag":"path","attr":{"fill":"#424242","d":"M24,4c-6.1,0-10,4.9-10,11c0,0.8,0,2.3,0,2.3l2,1.7v-5l12-4l4,4v5l2-1.7c0,0,0-1.5,0-2.3c0-4-1-8-6-9l-1-2 H24z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"28","cy":"19","r":"1"}},{"tag":"circle","attr":{"cx":"20","cy":"19","r":"1"}}]},{"tag":"polygon","attr":{"fill":"#fff","points":"24,43 19,31 24,32 29,31"}},{"tag":"polygon","attr":{"fill":"#D32F2F","points":"23,35 22.3,39.5 24,43.5 25.7,39.5 25,35 26,34 24,32 22,34"}},{"tag":"path","attr":{"fill":"#546E7A","d":"M29,31L29,31l-5,12l-5-12c0,0-11,2-11,13h32C40,33,29,31,29,31z"}}]})(props);
};
function FcBusinesswoman (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"16","y":"15","fill":"#BF360C","width":"16","height":"18"}},{"tag":"path","attr":{"fill":"#78909C","d":"M40,44H8c0-11,11-13,11-13h10C29,31,40,33,40,44z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M24,37c-2.2,0-5-6-5-6v-6h10v6C29,31,26.2,37,24,37z"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M33,14c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,5,4,9,9,9s9-4,9-9C33,19.9,33,15.1,33,14z"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M24,4C17.9,4,9,7.4,9,27.3l7,4.7V19l12-7l4,5v15l7-6c0-4-0.7-20-11-20l-1-2H24z"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M24,38c-4.4,0-5-7-5-7s2.5,4,5,4s5-4,5-4S28.4,38,24,38z"}},{"tag":"circle","attr":{"fill":"#784719","cx":"28","cy":"21","r":"1"}},{"tag":"circle","attr":{"fill":"#784719","cx":"20","cy":"21","r":"1"}}]})(props);
};
function FcButtingIn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M24,3C12.4,3,3,12.4,3,24c0,11.6,9.4,21,21,21c0.3,0,0.7,0,1-0.1V3.1C24.7,3,24.3,3,24,3z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M25,3.1v41.9c4.1-0.2,7.9-1.5,11-3.7V6.8C32.9,4.6,29.1,3.2,25,3.1z"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M20.5,13C14.1,13.3,8.9,18.7,9,25.1c0,2.8,1,5.4,2.7,7.5c1.4,1.7,2.3,3.9,2.3,6.1v3.8c3,1.6,6.4,2.5,10,2.5 c0.3,0,0.7,0,1-0.1c0.7,0,1.3-0.1,2-0.2v-9.4c3.6-2.1,6-5.9,6-10.4C33,18.2,27.4,12.7,20.5,13z"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M29,38.6L25,38v-9h8l-0.7,7C32.1,37.6,30.7,38.8,29,38.6z"}},{"tag":"polygon","attr":{"fill":"#FFB74D","points":"39,29 32,31 31,26 32,22"}},{"tag":"circle","attr":{"fill":"#784719","cx":"29.5","cy":"25.5","r":"1.5"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M21,12c-7.2,0-13,5.8-13,13c0,7.6,5.1,9,6,13l4-3v-8l5-2l1-4c3.2,0,6-3.9,6-6.1C27.9,13,24.4,12,21,12z"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"19","cy":"27","r":"3"}},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M45,24c0-7.1-3.6-13.4-9-17.2v34.4C41.4,37.4,45,31.1,45,24z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M20,44.6c1.3,0.2,2.6,0.4,4,0.4c0.3,0,0.7,0,1-0.1c0.7,0,1.3-0.1,2-0.2v-6.5l-7-1V44.6z"}}]})(props);
};
function FcCableRelease (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M34.9,29.1c-2.7-2.7-7.1-2.7-9.8,0l-4,4c-1.7,1.7-4.5,1.7-6.2,0c-1.7-1.7-1.7-4.5,0-6.2l4.5-4.5l-2.8-2.8 l-4.5,4.5c-3.3,3.3-3.3,8.6,0,11.8c3.3,3.3,8.6,3.3,11.8,0l4-4c1.2-1.1,3-1.1,4.2,0c1.1,1.2,1.1,3,0,4.2L27,41.2l2.8,2.8l5.1-5.1 C37.6,36.2,37.6,31.8,34.9,29.1z"}},{"tag":"path","attr":{"fill":"#0277BD","d":"M16.1,22.9L16.1,22.9c-2.8-2.8-2.8-7.3,0-10l6.8-6.8c2.8-2.8,7.3-2.8,10,0l0,0c2.8,2.8,2.8,7.3,0,10 l-6.8,6.8C23.3,25.7,18.9,25.7,16.1,22.9z"}},{"tag":"circle","attr":{"fill":"#B3E5FC","cx":"28","cy":"11","r":"4"}}]})(props);
};
function FcCalculator (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#616161","d":"M40,16H8v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V16z"}},{"tag":"path","attr":{"fill":"#424242","d":"M36,4H12C9.8,4,8,5.8,8,8v9h32V8C40,5.8,38.2,4,36,4z"}},{"tag":"path","attr":{"fill":"#9CCC65","d":"M36,14H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v5C37,13.6,36.6,14,36,14z"}},{"tag":"g","attr":{"fill":"#33691E"},"child":[{"tag":"rect","attr":{"x":"33","y":"10","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"29","y":"10","width":"2","height":"2"}}]},{"tag":"path","attr":{"fill":"#FF5252","d":"M36,23h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C37,22.6,36.6,23,36,23z"}},{"tag":"g","attr":{"fill":"#E0E0E0"},"child":[{"tag":"path","attr":{"d":"M15,23h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C16,22.6,15.6,23,15,23z"}},{"tag":"path","attr":{"d":"M22,23h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C23,22.6,22.6,23,22,23z"}},{"tag":"path","attr":{"d":"M29,23h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C30,22.6,29.6,23,29,23z"}},{"tag":"path","attr":{"d":"M15,29h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C16,28.6,15.6,29,15,29z"}},{"tag":"path","attr":{"d":"M22,29h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C23,28.6,22.6,29,22,29z"}},{"tag":"path","attr":{"d":"M29,29h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C30,28.6,29.6,29,29,29z"}},{"tag":"path","attr":{"d":"M15,35h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C16,34.6,15.6,35,15,35z"}},{"tag":"path","attr":{"d":"M22,35h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C23,34.6,22.6,35,22,35z"}},{"tag":"path","attr":{"d":"M29,35h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C30,34.6,29.6,35,29,35z"}},{"tag":"path","attr":{"d":"M15,41h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C16,40.6,15.6,41,15,41z"}},{"tag":"path","attr":{"d":"M22,41h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C23,40.6,22.6,41,22,41z"}},{"tag":"path","attr":{"d":"M29,41h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C30,40.6,29.6,41,29,41z"}}]},{"tag":"g","attr":{"fill":"#BDBDBD"},"child":[{"tag":"path","attr":{"d":"M36,29h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C37,28.6,36.6,29,36,29z"}},{"tag":"path","attr":{"d":"M36,35h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C37,34.6,36.6,35,36,35z"}},{"tag":"path","attr":{"d":"M36,41h-3c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v2C37,40.6,36.6,41,36,41z"}}]}]})(props);
};
function FcCalendar (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M5,38V14h38v24c0,2.2-1.8,4-4,4H9C6.8,42,5,40.2,5,38z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M43,10v6H5v-6c0-2.2,1.8-4,4-4h30C41.2,6,43,7.8,43,10z"}},{"tag":"g","attr":{"fill":"#B71C1C"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"10","r":"3"}},{"tag":"circle","attr":{"cx":"15","cy":"10","r":"3"}}]},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"path","attr":{"d":"M33,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C35,3.9,34.1,3,33,3z"}},{"tag":"path","attr":{"d":"M15,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C17,3.9,16.1,3,15,3z"}}]},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"rect","attr":{"x":"13","y":"20","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"19","y":"20","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"20","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"31","y":"20","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"13","y":"26","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"19","y":"26","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"26","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"31","y":"26","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"13","y":"32","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"19","y":"32","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"32","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"31","y":"32","width":"4","height":"4"}}]}]})(props);
};
function FcCallTransfer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#009688","d":"M39.2,8.4l-1.8,1.8c-6.3,6.5-5.4,22,0,27.6l1.8,1.8c0.5,0.5,1.3,0.5,1.8,0l3.6-3.7c0.5-0.5,0.5-1.3,0-1.8 l-3.4-3.4h-4.8c-1.3-1.3-1.3-12.1,0-13.4h4.8l3.3-3.4c0.5-0.5,0.5-1.3,0-1.8L41,8.4C40.5,7.9,39.7,7.9,39.2,8.4z"}},{"tag":"path","attr":{"fill":"#009688","d":"M11.2,8.4l-1.8,1.8c-6.3,6.5-5.4,22,0,27.6l1.8,1.8c0.5,0.5,1.3,0.5,1.8,0l3.6-3.7c0.5-0.5,0.5-1.3,0-1.8 l-3.4-3.4H8.5c-1.3-1.3-1.3-12.1,0-13.4h4.8l3.3-3.4c0.5-0.5,0.5-1.3,0-1.8L13,8.4C12.5,7.9,11.7,7.9,11.2,8.4z"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"polygon","attr":{"points":"25.3,18.6 30.7,24 25.3,29.4"}},{"tag":"rect","attr":{"x":"16","y":"22","width":"11","height":"4"}}]}]})(props);
};
function FcCallback (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M26.4,33.9c0,0,4-2.6,4.8-3c0.8-0.4,1.7-0.6,2.2-0.2c0.8,0.5,7.5,4.9,8.1,5.3c0.6,0.4,0.8,1.5,0.1,2.6 c-0.8,1.1-4.3,5.5-5.8,5.4c-1.5,0-8.4,0.4-20.3-11.4C3.6,20.7,4,13.8,4,12.3c0-1.5,4.3-5.1,5.4-5.8c1.1-0.8,2.2-0.5,2.6,0.1 c0.4,0.6,4.8,7.3,5.3,8.1c0.3,0.5,0.2,1.4-0.2,2.2c-0.4,0.8-3,4.8-3,4.8s0.7,2.8,5,7.2C23.5,33.2,26.4,33.9,26.4,33.9z"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"path","attr":{"d":"M35,9H25v4h10c1.1,0,2,0.9,2,2v10h4V15C41,11.7,38.3,9,35,9z"}},{"tag":"polygon","attr":{"points":"28,16 21.3,11 28,6"}}]}]})(props);
};
function FcCamcorderPro (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"27","y":"8","fill":"#37474F","width":"10","height":"4"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M27,8h-9.7c-1.5,0-2.8,0.8-3.5,2.1l-3.3,6L14,18l3.3-6H27v7.2h4V12C31,9.8,29.2,8,27,8z"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M30,40H6c-2.2,0-4-1.8-4-4V20c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v16C34,38.2,32.2,40,30,40z"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M38,35l5,5h3V18h-3l-5,5V35z"}},{"tag":"path","attr":{"fill":"#546E7A","d":"M22,35H8c-1.1,0-2-0.9-2-2V23c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v10C24,34.1,23.1,35,22,35z"}},{"tag":"rect","attr":{"x":"34","y":"23","fill":"#455A64","width":"4","height":"12"}},{"tag":"path","attr":{"fill":"#263238","d":"M41,13h-4c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h4c1.7,0,3,1.3,3,3v0C44,11.7,42.7,13,41,13z"}},{"tag":"rect","attr":{"x":"8","y":"23","fill":"#03A9F4","width":"14","height":"10"}},{"tag":"polygon","attr":{"fill":"#4FC3F7","points":"13.5,25.5 9,32 18,32"}},{"tag":"g","attr":{"fill":"#B3E5FC"},"child":[{"tag":"circle","attr":{"cx":"19.5","cy":"25.5","r":"1.5"}},{"tag":"polygon","attr":{"points":"17.5,27.6 14,32 21,32"}}]}]})(props);
};
function FcCamcorder (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#607D8B","d":"M20,42H10c-2.2,0-4-1.8-4-4V15c0-5,4-9,9-9h0c5,0,9,4,9,9v23C24,40.2,22.2,42,20,42z"}},{"tag":"circle","attr":{"fill":"#455A64","cx":"15","cy":"15","r":"7"}},{"tag":"circle","attr":{"fill":"#42A5F5","cx":"15","cy":"15","r":"5.2"}},{"tag":"path","attr":{"fill":"#90CAF9","d":"M18.3,13c-0.8-0.9-2-1.5-3.3-1.5S12.6,12,11.7,13c-0.3,0.4-0.3,0.9,0.1,1.2c0.4,0.3,0.9,0.3,1.2-0.1 c1-1.2,2.9-1.2,3.9,0c0.2,0.2,0.4,0.3,0.7,0.3c0.2,0,0.4-0.1,0.6-0.2C18.6,13.9,18.6,13.3,18.3,13z"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M40,31H28c-1.1,0-2-0.9-2-2V19c0-1.1,0.9-2,2-2h12c1.1,0,2,0.9,2,2v10C42,30.1,41.1,31,40,31z"}},{"tag":"rect","attr":{"x":"24","y":"19","fill":"#455A64","width":"2","height":"10"}},{"tag":"rect","attr":{"x":"28","y":"19","fill":"#03A9F4","width":"12","height":"10"}},{"tag":"polygon","attr":{"fill":"#4FC3F7","points":"33,22.2 29,28 37,28"}},{"tag":"g","attr":{"fill":"#B3E5FC"},"child":[{"tag":"circle","attr":{"cx":"37.5","cy":"21.5","r":"1"}},{"tag":"polygon","attr":{"points":"36,24.2 33,28 39,28"}}]},{"tag":"circle","attr":{"fill":"#455A64","cx":"15","cy":"35","r":"3"}},{"tag":"circle","attr":{"fill":"#F44336","cx":"15","cy":"35","r":"2"}}]})(props);
};
function FcCameraAddon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#512DA8","d":"M33.9,12.1H14.2L17.6,7c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,12.1z"}},{"tag":"path","attr":{"fill":"#8667C4","d":"M14,11H8V9.2C8,8.5,8.5,8,9.2,8h3.6C13.5,8,14,8.5,14,9.2V11z"}},{"tag":"path","attr":{"fill":"#5E35B1","d":"M40,42H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,40.2,42.2,42,40,42z"}},{"tag":"circle","attr":{"fill":"#512DA8","cx":"24","cy":"26","r":"12"}},{"tag":"circle","attr":{"fill":"#B388FF","cx":"24","cy":"26","r":"9"}},{"tag":"path","attr":{"fill":"#C7A7FF","d":"M28.8,23c-1.2-1.4-3-2.2-4.8-2.2s-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.2,24.4,29.3,23.5,28.8,23z"}},{"tag":"ellipse","attr":{"fill":"#8667C4","cx":"11","cy":"13.5","rx":"2","ry":"1.5"}},{"tag":"path","attr":{"fill":"#8BC34A","d":"M48,33.8c0-1.3-1.1-2.4-2.4-2.4H42c-0.4,0-0.7-0.5-0.4-0.8c0.4-0.6,0.5-1.3,0.4-2.1 c-0.2-1.2-1.1-2.1-2.3-2.4C37.7,25.7,36,27.1,36,29c0,0.6,0.2,1.1,0.4,1.6c0.2,0.4,0,0.8-0.5,0.8h-3.6c-1.3,0-2.4,1.1-2.4,2.4V37 c0,0.4,0.5,0.7,0.8,0.4c0.6-0.4,1.3-0.5,2.1-0.4c1.2,0.2,2.1,1.1,2.4,2.3c0.4,1.9-1.1,3.6-2.9,3.6c-0.6,0-1.1-0.2-1.6-0.4 c-0.4-0.2-0.8,0-0.8,0.5v2.6c0,1.3,1.1,2.4,2.4,2.4h13.2c1.3,0,2.4-1.1,2.4-2.4V33.8z"}}]})(props);
};
function FcCameraIdentification (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#512DA8","d":"M33.9,12.1H14.2L17.6,7c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,12.1z"}},{"tag":"path","attr":{"fill":"#8667C4","d":"M14,11H8V9.2C8,8.5,8.5,8,9.2,8h3.6C13.5,8,14,8.5,14,9.2V11z"}},{"tag":"path","attr":{"fill":"#5E35B1","d":"M40,42H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,40.2,42.2,42,40,42z"}},{"tag":"circle","attr":{"fill":"#512DA8","cx":"24","cy":"26","r":"12"}},{"tag":"circle","attr":{"fill":"#B388FF","cx":"24","cy":"26","r":"9"}},{"tag":"g","attr":{"fill":"#616161"},"child":[{"tag":"rect","attr":{"x":"42.2","y":"38.3","transform":"matrix(.707 -.707 .707 .707 -18.002 43.46)","width":"2.4","height":"10.4"}},{"tag":"circle","attr":{"cx":"35","cy":"35","r":"10"}}]},{"tag":"rect","attr":{"x":"43.9","y":"42.4","transform":"matrix(.707 -.707 .707 .707 -18.709 45.167)","fill":"#37474F","width":"2.4","height":"5.6"}},{"tag":"circle","attr":{"fill":"#64B5F6","cx":"35","cy":"35","r":"8"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M39.3,31.4c-1.1-1.3-2.6-2-4.2-2s-3.2,0.7-4.2,2c-0.2,0.3-0.2,0.6,0.1,0.9c0.3,0.2,0.6,0.2,0.9-0.1 c0.8-1,2-1.5,3.3-1.5s2.5,0.6,3.3,1.5c0.1,0.1,0.3,0.2,0.5,0.2c0.1,0,0.3,0,0.4-0.1C39.5,32.1,39.5,31.7,39.3,31.4z"}},{"tag":"path","attr":{"fill":"#C7A7FF","d":"M29,23c-1.2-1.4-3-2.2-4.8-2.2c-1.8,0-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.4,24.4,29.5,23.5,29,23z"}},{"tag":"ellipse","attr":{"fill":"#8667C4","cx":"11","cy":"13.5","rx":"2","ry":"1.5"}}]})(props);
};
function FcCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#512DA8","d":"M33.9,12.1H14.2L17.6,7c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,12.1z"}},{"tag":"path","attr":{"fill":"#8667C4","d":"M14,11H8V9.2C8,8.5,8.5,8,9.2,8h3.6C13.5,8,14,8.5,14,9.2V11z"}},{"tag":"path","attr":{"fill":"#5E35B1","d":"M40,42H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,40.2,42.2,42,40,42z"}},{"tag":"circle","attr":{"fill":"#512DA8","cx":"24","cy":"26","r":"12"}},{"tag":"circle","attr":{"fill":"#B388FF","cx":"24","cy":"26","r":"9"}},{"tag":"path","attr":{"fill":"#C7A7FF","d":"M29,23c-1.2-1.4-3-2.2-4.8-2.2c-1.8,0-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.4,24.4,29.5,23.5,29,23z"}},{"tag":"ellipse","attr":{"fill":"#8667C4","cx":"11","cy":"13.5","rx":"2","ry":"1.5"}}]})(props);
};
function FcCancel (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#D50000","d":"M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,10c3.1,0,6,1.1,8.4,2.8L12.8,32.4 C11.1,30,10,27.1,10,24C10,16.3,16.3,10,24,10z M24,38c-3.1,0-6-1.1-8.4-2.8l19.6-19.6C36.9,18,38,20.9,38,24C38,31.7,31.7,38,24,38 z"}}]})(props);
};
function FcCandleSticks (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#546E7A"},"child":[{"tag":"rect","attr":{"x":"38","y":"4","width":"2","height":"20"}},{"tag":"rect","attr":{"x":"15","y":"7","width":"2","height":"17"}},{"tag":"rect","attr":{"x":"8","y":"27","width":"2","height":"17"}},{"tag":"rect","attr":{"x":"28","y":"19","width":"2","height":"22"}}]},{"tag":"path","attr":{"fill":"#4CAF50","d":"M36,7h6c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2h-6c-1.1,0-2-0.9-2-2V9C34,7.9,34.9,7,36,7z"}},{"tag":"path","attr":{"fill":"#4CAF50","d":"M13,10h6c1.1,0,2,0.9,2,2v7c0,1.1-0.9,2-2,2h-6c-1.1,0-2-0.9-2-2v-7C11,10.9,11.9,10,13,10z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M6,30h6c1.1,0,2,0.9,2,2v7c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2v-7C4,30.9,4.9,30,6,30z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M26,22h6c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2h-6c-1.1,0-2-0.9-2-2V24C24,22.9,24.9,22,26,22z"}}]})(props);
};
function FcCapacitor (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"rect","attr":{"y":"27","width":"25","height":"4"}},{"tag":"rect","attr":{"y":"17","width":"25","height":"4"}}]},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"path","attr":{"d":"M46,35c1.1,0,2-0.9,2-2V15c0-1.1-0.9-2-2-2H27v22H46z"}},{"tag":"path","attr":{"d":"M21,13c-1.1,0-2,0.9-2,2v18c0,1.1,0.9,2,2,2h2V13H21z"}}]},{"tag":"path","attr":{"fill":"#303F9F","d":"M25,33c1.1,0,2,0.9,2,2V13c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2v22C23,33.9,23.9,33,25,33z"}}]})(props);
};
function FcCdLogo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M17.814,18H20.2c0.5,0,0.8,0.4,0.8,0.8v16.4c0,0.399-0.4,0.8-0.8,0.8h-2.384c-0.4,0-0.8-0.4-0.8-0.8V18.8\r\n\t\tC16.916,18.3,17.314,18,17.814,18z"}},{"tag":"path","attr":{"fill":"#2196F3","d":"M14.2,11h-3.3c-0.5,0-0.9,0.403-0.9,0.807V17H2.2C1.6,17,1,17.605,1,18.21v16.58C1,35.396,1.6,36,2.2,36h12\r\n\t\tc0.4,0,0.8-0.305,0.8-0.809V11.807C15,11.403,14.7,11,14.2,11z M10,31.283c0,0.398-0.4,0.8-0.8,0.8H6.8c-0.4,0-0.8-0.399-0.8-0.8\r\n\t\tV21.8C6,21.4,6.3,21,6.8,21h2.4c0.5,0,0.8,0.4,0.8,0.8V31.283z"}},{"tag":"path","attr":{"fill":"#2196F3","d":"M33.2,25c0.5,0,0.8,0.6,0.8,0.8v9.4c0,0.399-0.422,0.8-0.8,0.8h-9.4c-0.425,0-0.8-0.4-0.8-0.8v-2.386\r\n\t\tc0-0.5,0.4-0.799,0.8-0.799L30,32v-3h-6.2c-0.331,0-0.8-0.4-0.8-0.801V18.8c0-0.5,0.4-0.8,0.8-0.8h9.4c0.399,0,0.8,0.4,0.8,0.8v2.4\r\n\t\tc0,0.3-0.266,0.8-0.8,0.8H27v3H33.2z"}},{"tag":"path","attr":{"fill":"#2196F3","d":"M48,28v7.2c0,0.399-0.4,0.8-0.801,0.8H36.8c-0.2,0-0.8-0.4-0.8-0.8V18.8c0-0.5,0.432-0.8,0.831-0.8H47.2\r\n\t\tc0,0,0.8,0,0.8,0.8V25h-4v-2.2c0,0,0.1-0.8-0.8-0.8h-2.4c-0.5,0-0.8,0.4-0.8,0.8v8.4c0,0.399,0.5,0.8,0.8,0.8h2.4\r\n\t\tc0.399,0,0.8-0.4,0.8-0.8V28H48z"}}]},{"tag":"g","attr":{},"child":[{"tag":"polygon","attr":{"fill":"#0D47A1","points":"45.799,15.98 46.9,15.98 46.9,12.881 48,12.881 48,11.98 44.799,11.98 44.799,12.881 \r\n\t\t45.799,12.881 \t"}},{"tag":"path","attr":{"fill":"#0D47A1","d":"M44.014,14.476h-1.143v0.095c0,0.382-0.096,0.573-0.572,0.573c-0.475,0-0.57-0.191-0.57-0.762v-0.668\r\n\t\tc0-0.572,0-0.762,0.57-0.762c0.381,0,0.572,0.095,0.572,0.477v0.095h1.047v-0.095c0-1.047-0.381-1.429-1.523-1.429h-0.287\r\n\t\tc-1.141,0-1.523,0.382-1.523,1.618v0.764c0,1.142,0.381,1.618,1.523,1.618h0.383c1.047,0,1.428-0.477,1.428-1.43v-0.095H44.014z"}},{"tag":"polygon","attr":{"fill":"#0D47A1","points":"29.516,12 28.717,14.9 27.816,12 26.217,12 26.217,16 27.316,16 27.316,13 28.115,16 29.217,16 \r\n\t\t30.115,13.1 30.115,16 31.115,16 31.115,12 \t"}},{"tag":"path","attr":{"fill":"#0D47A1","d":"M38.713,12h-0.9h-0.898l-1.199,4h1.199l0.199-0.7h0.602h0.799l0.199,0.7h1.199L38.713,12z M37.914,14.5\r\n\t\th-0.4l0.4-1.7l0,0l0,0l0.398,1.7H37.914z"}},{"tag":"path","attr":{"fill":"#0D47A1","d":"M33.92,12h-0.199H32.02v4h1.102v-1.1h0.6h0.199c1.102,0,1.5-0.4,1.5-1.4v-0.3C35.42,12.3,35.02,12,33.92,12\r\n\t\tz M34.32,13.6c0,0.4-0.1,0.5-0.4,0.5h-0.199h-0.6v-1.2h0.6h0.1c0.4,0,0.5,0.1,0.5,0.4V13.6z"}},{"tag":"path","attr":{"fill":"#0D47A1","d":"M23.594,12h-0.286h-0.286c-1.143,0-1.523,0.382-1.523,1.618v0.762c0,1.144,0.381,1.62,1.523,1.62h0.286\r\n\t\th0.286c1.143,0,1.523-0.477,1.523-1.62v-0.762C25.117,12.382,24.737,12,23.594,12z M23.975,14.19c0,0.571,0,0.763-0.571,0.763\r\n\t\th-0.095h-0.095c-0.571,0-0.571-0.191-0.571-0.763v-0.572c0-0.57,0-0.762,0.571-0.762h0.095h0.095c0.571,0,0.571,0.191,0.571,0.762\r\n\t\tV14.19z"}},{"tag":"path","attr":{"fill":"#0D47A1","d":"M20.422,14.477h-1.144v0.095c0,0.382-0.095,0.571-0.571,0.571c-0.476,0-0.571-0.189-0.571-0.762v-0.666\r\n\t\tc0-0.573,0-0.762,0.571-0.762c0.381,0,0.571,0.095,0.571,0.475v0.096h1.048v-0.096c0-1.047-0.381-1.428-1.523-1.428h-0.286\r\n\t\tc-1.143,0-1.524,0.381-1.524,1.618v0.763c0,1.143,0.381,1.619,1.524,1.619h0.381c1.048,0,1.429-0.477,1.429-1.429v-0.095H20.422z"}}]}]})(props);
};
function FcCellPhone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#546E7A","d":"M12,40V10h20c2.2,0,4,1.8,4,4v26c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"}},{"tag":"path","attr":{"fill":"#4FC3F7","d":"M32,13H16c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1v-8C33,13.4,32.6,13,32,13z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M19,30h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C20,29.6,19.6,30,19,30z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M25,30h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C26,29.6,25.6,30,25,30z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M31,30h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C32,29.6,31.6,30,31,30z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M19,35h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C20,34.6,19.6,35,19,35z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M25,35h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C26,34.6,25.6,35,25,35z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M31,35h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C32,34.6,31.6,35,31,35z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M19,40h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C20,39.6,19.6,40,19,40z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M25,40h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C26,39.6,25.6,40,25,40z"}},{"tag":"path","attr":{"fill":"#B3E5FC","d":"M31,40h-2c-0.6,0-1-0.4-1-1v-1c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1C32,39.6,31.6,40,31,40z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M16,10h-4V4c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2V10z"}}]})(props);
};
function FcChargeBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#8BC34A"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]},{"tag":"polygon","attr":{"fill":"#FFEB3B","points":"30,24 24.5,24 26.7,13 18,26 23.5,26 21.3,37"}}]})(props);
};
function FcCheckmark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#43A047","points":"40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"}}]})(props);
};
function FcCircuit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M6,10v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4V10c0-2.2-1.8-4-4-4H10C7.8,6,6,7.8,6,10z"}},{"tag":"g","attr":{"fill":"#FFC107"},"child":[{"tag":"path","attr":{"d":"M6.6,8l6,6c-0.4,0.6-0.6,1.3-0.6,2c0,2.2,1.8,4,4,4s4-1.8,4-4s-1.8-4-4-4c-0.7,0-1.4,0.2-2,0.6l-6-6 C7.4,6.9,6.9,7.4,6.6,8z M16,14.5c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5S15.2,14.5,16,14.5z"}},{"tag":"path","attr":{"d":"M41.4,40l-6-6c0.4-0.6,0.6-1.3,0.6-2c0-2.2-1.8-4-4-4s-4,1.8-4,4s1.8,4,4,4c0.7,0,1.4-0.2,2-0.6l6,6 C40.6,41.1,41.1,40.6,41.4,40z M32,33.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S32.8,33.5,32,33.5z"}},{"tag":"path","attr":{"d":"M16,36c2.2,0,4-1.8,4-4c0-0.7-0.2-1.4-0.6-2L30,19.4c0.6,0.4,1.3,0.6,2,0.6c2.2,0,4-1.8,4-4s-1.8-4-4-4 s-4,1.8-4,4c0,0.7,0.2,1.4,0.6,2L18,28.6c-0.6-0.4-1.3-0.6-2-0.6c-2.2,0-4,1.8-4,4S13.8,36,16,36z M32,14.5c0.8,0,1.5,0.7,1.5,1.5 s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5S31.2,14.5,32,14.5z M16,30.5c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5 S15.2,30.5,16,30.5z"}}]}]})(props);
};
function FcClapperboard (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M43.4,8.3L4,15l-0.3-2c-0.4-2.2,1.1-4.2,3.3-4.6l31.6-5.3c2.2-0.4,4.2,1.1,4.6,3.3L43.4,8.3z"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M40,41H8c-2.2,0-4-1.8-4-4V15h40v22C44,39.2,42.2,41,40,41z"}},{"tag":"g","attr":{"fill":"#9FA8DA"},"child":[{"tag":"polygon","attr":{"points":"18.8,6.4 23.7,11.7 27.7,11 22.7,5.7"}},{"tag":"polygon","attr":{"points":"10.9,7.7 15.8,13 19.8,12.3 14.8,7.1"}},{"tag":"polygon","attr":{"points":"26.7,5.1 31.6,10.3 35.5,9.7 30.6,4.4"}},{"tag":"polygon","attr":{"points":"34.5,3.8 39.5,9 43.4,8.3 38.5,3.1"}}]},{"tag":"circle","attr":{"fill":"#9FA8DA","cx":"7.5","cy":"11.5","r":"1.5"}},{"tag":"g","attr":{"fill":"#9FA8DA"},"child":[{"tag":"polygon","attr":{"points":"40,15 36,21 40,21 44,15"}},{"tag":"polygon","attr":{"points":"32,15 28,21 32,21 36,15"}},{"tag":"polygon","attr":{"points":"24,15 20,21 24,21 28,15"}},{"tag":"polygon","attr":{"points":"16,15 12,21 16,21 20,15"}},{"tag":"polygon","attr":{"points":"8,15 4,21 8,21 12,15"}}]}]})(props);
};
function FcClearFilters (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#F57C00","points":"29,23 19,23 7,9 41,9"}},{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"polygon","attr":{"points":"29,38 19,44 19,23 29,23"}},{"tag":"path","attr":{"d":"M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"}}]},{"tag":"circle","attr":{"fill":"#F44336","cx":"38","cy":"38","r":"10"}},{"tag":"rect","attr":{"x":"32","y":"36","fill":"#fff","width":"12","height":"4"}}]})(props);
};
function FcClock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#00ACC1","cx":"24","cy":"24","r":"20"}},{"tag":"circle","attr":{"fill":"#eee","cx":"24","cy":"24","r":"16"}},{"tag":"rect","attr":{"x":"23","y":"11","width":"2","height":"13"}},{"tag":"rect","attr":{"x":"26.1","y":"22.7","transform":"matrix(-.707 .707 -.707 -.707 65.787 27.25)","width":"2.3","height":"9.2"}},{"tag":"circle","attr":{"cx":"24","cy":"24","r":"2"}},{"tag":"circle","attr":{"fill":"#00ACC1","cx":"24","cy":"24","r":"1"}}]})(props);
};
function FcCloseUpMode (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2E7D32","d":"M5,24c0,18.9,14.8,19,17,19s4,0,4,0S24.1,26.5,5,24z"}},{"tag":"rect","attr":{"x":"22","y":"26","fill":"#388E3C","width":"4","height":"17"}},{"tag":"path","attr":{"fill":"#C62828","d":"M34,16c0,5.1-5.2,8.2-8,8.2s-2-3.1-2-8.2s5-9.2,5-9.2S34,10.9,34,16z"}},{"tag":"path","attr":{"fill":"#C62828","d":"M14,16c0,5.1,5.2,8.2,8,8.2s2-3.1,2-8.2s-5-9.2-5-9.2S14,10.9,14,16z"}},{"tag":"path","attr":{"fill":"#E53935","d":"M24,27c-2.2-1.6-1.9-4.5,2.4-8.8C30.8,13.8,32,7,32,7s5,3.4,5,9C37,21.9,31.3,27,24,27z"}},{"tag":"path","attr":{"fill":"#E53935","d":"M24,27c2.2-1.6,1.9-4.5-2.4-8.8C17.2,13.8,16,7,16,7s-5,3.4-5,9C11,21.9,16.7,27,24,27z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M30,16c0,6.1-2.7,11-6,11s-6-4.9-6-11s6-11,6-11S30,9.9,30,16z"}},{"tag":"path","attr":{"fill":"#4CAF50","d":"M22,43c0,0,1.8,0,4,0s17-0.1,17-19C23.9,26.5,22,43,22,43z"}}]})(props);
};
function FcCloth (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF5722","d":"M6,10v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4V10c0-2.2-1.8-4-4-4H10C7.8,6,6,7.8,6,10z"}},{"tag":"g","attr":{"fill":"#BF360C"},"child":[{"tag":"rect","attr":{"x":"6","y":"35","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"6","y":"31","width":"36","height":"2"}},{"tag":"path","attr":{"d":"M6.1,39c0.2,0.8,0.6,1.5,1.2,2h33.2c0.6-0.5,1-1.2,1.2-2H6.1z"}},{"tag":"path","attr":{"d":"M6.1,9h35.7c-0.2-0.8-0.6-1.5-1.2-2H7.4C6.8,7.5,6.3,8.2,6.1,9z"}},{"tag":"rect","attr":{"x":"6","y":"23","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"6","y":"27","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"6","y":"15","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"6","y":"11","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"6","y":"19","width":"36","height":"2"}}]},{"tag":"g","attr":{"fill":"#FF8A65"},"child":[{"tag":"rect","attr":{"x":"27","y":"6","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"27","y":"13","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"27","y":"29","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"31","y":"6","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"19","y":"29","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"31","y":"9","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"23","y":"6","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"23","y":"25","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"23","y":"9","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"19","y":"21","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"23","y":"17","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"23","y":"33","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"27","y":"21","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"39","y":"33","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"39","y":"17","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"39","y":"25","width":"2","height":"6"}},{"tag":"path","attr":{"d":"M39,6.1V7h1.6C40.2,6.6,39.6,6.3,39,6.1z"}},{"tag":"rect","attr":{"x":"31","y":"17","width":"2","height":"6"}},{"tag":"path","attr":{"d":"M40.6,41H39v0.9C39.6,41.7,40.2,41.4,40.6,41z"}},{"tag":"rect","attr":{"x":"35","y":"13","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"31","y":"33","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"35","y":"29","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"39","y":"9","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"35","y":"21","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"31","y":"25","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"35","y":"37","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"35","y":"6","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"41","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"23","y":"41","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"27","y":"37","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"19","y":"37","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"7","y":"17","width":"2","height":"6"}},{"tag":"path","attr":{"d":"M9,41H7.4c0.5,0.4,1,0.7,1.6,0.9V41z"}},{"tag":"path","attr":{"d":"M7.4,7H9V6.1C8.4,6.3,7.8,6.6,7.4,7z"}},{"tag":"rect","attr":{"x":"7","y":"33","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"7","y":"25","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"7","y":"9","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"11","y":"29","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"15","y":"17","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"15","y":"33","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"15","y":"9","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"15","y":"6","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"19","y":"6","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"15","y":"25","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"15","y":"41","width":"2","height":"1"}},{"tag":"rect","attr":{"x":"11","y":"21","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"11","y":"6","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"37","width":"2","height":"5"}},{"tag":"rect","attr":{"x":"19","y":"13","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"11","y":"13","width":"2","height":"6"}}]}]})(props);
};
function FcCollaboration (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#1565C0","d":"M25,22h13l6,6V11c0-2.2-1.8-4-4-4H25c-2.2,0-4,1.8-4,4v7C21,20.2,22.8,22,25,22z"}},{"tag":"path","attr":{"fill":"#2196F3","d":"M23,19H10l-6,6V8c0-2.2,1.8-4,4-4h15c2.2,0,4,1.8,4,4v7C27,17.2,25.2,19,23,19z"}},{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"31","r":"5"}},{"tag":"circle","attr":{"cx":"36","cy":"31","r":"5"}}]},{"tag":"g","attr":{"fill":"#607D8B"},"child":[{"tag":"path","attr":{"d":"M20,42c0,0-2.2-4-8-4s-8,4-8,4v2h16V42z"}},{"tag":"path","attr":{"d":"M44,42c0,0-2.2-4-8-4s-8,4-8,4v2h16V42z"}}]}]})(props);
};
function FcCollapse (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#2196F3","points":"5,30.9 8.1,34 24,18.1 39.9,34 43,30.9 24,12"}}]})(props);
};
function FcCollect (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"rect","attr":{"x":"22","y":"35","width":"4","height":"11"}},{"tag":"polygon","attr":{"points":"24,29.6 31,38 17,38"}}]},{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"rect","attr":{"x":"22","y":"2","width":"4","height":"11"}},{"tag":"polygon","attr":{"points":"24,18.4 17,10 31,10"}}]},{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"rect","attr":{"x":"2","y":"22","width":"11","height":"4"}},{"tag":"polygon","attr":{"points":"18.4,24 10,31 10,17"}}]},{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"rect","attr":{"x":"35","y":"22","width":"11","height":"4"}},{"tag":"polygon","attr":{"points":"29.6,24 38,17 38,31"}}]},{"tag":"circle","attr":{"fill":"#F44336","cx":"24","cy":"24","r":"3"}}]})(props);
};
function FcComboChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"rect","attr":{"x":"37","y":"18","width":"6","height":"24"}},{"tag":"rect","attr":{"x":"29","y":"26","width":"6","height":"16"}},{"tag":"rect","attr":{"x":"21","y":"22","width":"6","height":"20"}},{"tag":"rect","attr":{"x":"13","y":"32","width":"6","height":"10"}},{"tag":"rect","attr":{"x":"5","y":"28","width":"6","height":"14"}}]},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"circle","attr":{"cx":"8","cy":"16","r":"3"}},{"tag":"circle","attr":{"cx":"16","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"24","cy":"11","r":"3"}},{"tag":"circle","attr":{"cx":"32","cy":"13","r":"3"}},{"tag":"circle","attr":{"cx":"40","cy":"9","r":"3"}},{"tag":"polygon","attr":{"points":"39.1,7.2 31.8,10.9 23.5,8.8 15.5,15.8 8.5,14.1 7.5,17.9 16.5,20.2 24.5,13.2 32.2,15.1 40.9,10.8"}}]}]})(props);
};
function FcCommandLine (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M41,6H7C6.4,6,6,6.4,6,7v35h36V7C42,6.4,41.6,6,41,6z"}}]},{"tag":"rect","attr":{"x":"8","y":"13","fill":"#263238","width":"32","height":"27"}},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#76FF03","d":"M22,27.6c-0.1,1.1-0.4,1.9-1,2.5c-0.6,0.6-1.4,0.9-2.5,0.9c-1.1,0-2-0.4-2.6-1.1c-0.6-0.7-0.9-1.8-0.9-3.1\r\n\t\tv-1.6c0-1.3,0.3-2.4,0.9-3.1c0.6-0.7,1.5-1.1,2.6-1.1c1.1,0,1.9,0.3,2.5,0.9c0.6,0.6,0.9,1.4,1,2.6h-2c0-0.7-0.1-1.2-0.3-1.4\r\n\t\tc-0.2-0.3-0.6-0.4-1.1-0.4c-0.5,0-0.9,0.2-1.2,0.6c-0.2,0.4-0.3,1-0.4,1.8v1.8c0,1,0.1,1.6,0.3,2c0.2,0.4,0.6,0.5,1.1,0.5\r\n\t\tc0.5,0,0.9-0.1,1.1-0.4c0.2-0.3,0.3-0.7,0.3-1.4H22z"}},{"tag":"path","attr":{"fill":"#76FF03","d":"M24,24c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7\r\n\t\tc0,0.3-0.1,0.5-0.3,0.7S25.3,25,25,25c-0.3,0-0.5-0.1-0.7-0.3S24,24.3,24,24z"}},{"tag":"path","attr":{"fill":"#76FF03","d":"M24,30c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7\r\n\t\tc0,0.3-0.1,0.5-0.3,0.7S25.3,31,25,31c-0.3,0-0.5-0.1-0.7-0.3S24,30.3,24,30z"}},{"tag":"path","attr":{"fill":"#76FF03","d":"M28,21h2l3,10h-2L28,21z"}}]},{"tag":"g","attr":{},"child":[{"tag":"circle","attr":{"fill":"#90A4AE","cx":"13.5","cy":"9.5","r":"1.5"}},{"tag":"circle","attr":{"fill":"#90A4AE","cx":"9.5","cy":"9.5","r":"1.5"}}]}]})(props);
};
function FcComments (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8BC34A","d":"M37,39H11l-6,6V11c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,36.3,40.3,39,37,39z"}}]})(props);
};
function FcCompactCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#607D8B","d":"M40,39H8c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v22C44,37.2,42.2,39,40,39z"}},{"tag":"circle","attr":{"fill":"#455A64","cx":"29","cy":"24","r":"12"}},{"tag":"circle","attr":{"fill":"#42A5F5","cx":"29","cy":"24","r":"9"}},{"tag":"path","attr":{"fill":"#90CAF9","d":"M33.8,21c-1.2-1.4-3-2.2-4.8-2.2s-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C34.2,22.4,34.3,21.5,33.8,21z"}},{"tag":"rect","attr":{"x":"8","y":"13","fill":"#ADD8FB","width":"6","height":"3"}}]})(props);
};
function FcConferenceCall (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#FFA726","cx":"12","cy":"21","r":"5"}},{"tag":"g","attr":{"fill":"#455A64"},"child":[{"tag":"path","attr":{"d":"M2,34.7c0,0,2.8-6.3,10-6.3s10,6.3,10,6.3V38H2V34.7z"}},{"tag":"path","attr":{"d":"M46,34.7c0,0-2.8-6.3-10-6.3s-10,6.3-10,6.3V38h20V34.7z"}}]},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"24","cy":"17","r":"6"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M36,34.1c0,0-3.3-7.5-12-7.5s-12,7.5-12,7.5V38h24V34.1z"}},{"tag":"circle","attr":{"fill":"#FFA726","cx":"36","cy":"21","r":"5"}},{"tag":"circle","attr":{"fill":"#FFA726","cx":"12","cy":"21","r":"5"}},{"tag":"circle","attr":{"fill":"#FFA726","cx":"36","cy":"21","r":"5"}}]})(props);
};
function FcContacts (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF7043","d":"M38,44H12V4h26c2.2,0,4,1.8,4,4v32C42,42.2,40.2,44,38,44z"}},{"tag":"path","attr":{"fill":"#BF360C","d":"M10,4h2v40h-2c-2.2,0-4-1.8-4-4V8C6,5.8,7.8,4,10,4z"}},{"tag":"g","attr":{"fill":"#AB300B"},"child":[{"tag":"circle","attr":{"cx":"26","cy":"20","r":"4"}},{"tag":"path","attr":{"d":"M33,30c0,0-1.9-4-7-4c-5.1,0-7,4-7,4v2h14V30z"}}]}]})(props);
};
function FcCopyleft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"path","attr":{"fill":"#E1BEE7","d":"M19.3,28.1c0.3,1.3,0.2,4.1,4.6,4.1c0.9,0,4.8,0.2,4.7-7.2v-1.6c0-6.7-3.2-7.2-4.8-7.2 c-2.3,0-4.2,0.6-4.5,4.3h-4.8c0.1-1.2,0.8-8.2,9.3-8.2c4.2,0,9.7,2.5,9.7,11.2V25c0,9.6-6.5,11.2-9.6,11.2c-3.7,0-8.7-1.6-9.3-8.1 H19.3z"}}]})(props);
};
function FcCopyright (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"path","attr":{"fill":"#E1BEE7","d":"M33.5,28.1c-0.6,6.4-5.6,8.1-9.3,8.1c-3.1,0-9.6-1.6-9.6-11.2v-1.5c0-8.7,5.5-11.2,9.7-11.2 c8.5,0,9.2,7,9.3,8.2h-4.8c-0.3-3.6-2.2-4.3-4.5-4.3c-1.6,0-4.8,0.5-4.8,7.2V25c-0.1,7.5,3.8,7.2,4.7,7.2c4.3,0,4.3-2.9,4.6-4.1 H33.5z"}}]})(props);
};
function FcCrystalOscillator (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"rect","attr":{"x":"3","y":"28","width":"26","height":"4"}},{"tag":"rect","attr":{"x":"3","y":"16","width":"26","height":"4"}}]},{"tag":"path","attr":{"fill":"#2196F3","d":"M43,11H20v26h23c1.1,0,2-0.9,2-2V13C45,11.9,44.1,11,43,11z"}},{"tag":"path","attr":{"fill":"#64B5F6","d":"M20,9h-2v30h2c1.1,0,2-0.9,2-2V11C22,9.9,21.1,9,20,9z"}}]})(props);
};
function FcCurrencyExchange (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#3F51B5","cx":"18","cy":"18","r":"15"}},{"tag":"path","attr":{"fill":"#FFF59D","d":"M20.3,16v1.7h-3.8v1.4h3.8v1.7h-3.8c0,0.6,0.1,1.2,0.3,1.6c0.2,0.4,0.4,0.8,0.7,1c0.3,0.3,0.7,0.4,1.1,0.6 c0.4,0.1,0.9,0.2,1.4,0.2c0.4,0,0.7,0,1.1-0.1c0.4-0.1,0.7-0.1,1-0.3l0.4,2.7c-0.4,0.1-0.9,0.2-1.4,0.2c-0.5,0.1-1,0.1-1.5,0.1 c-0.9,0-1.8-0.1-2.6-0.4c-0.8-0.2-1.5-0.6-2-1.1c-0.6-0.5-1-1.1-1.4-1.9c-0.3-0.7-0.5-1.6-0.5-2.6h-1.9v-1.7h1.9v-1.4h-1.9V16h1.9 c0.1-1,0.3-1.8,0.6-2.6c0.4-0.7,0.8-1.4,1.4-1.9c0.6-0.5,1.3-0.9,2.1-1.1c0.8-0.3,1.7-0.4,2.6-0.4c0.4,0,0.9,0,1.3,0.1 c0.4,0.1,0.9,0.1,1.3,0.3l-0.4,2.7c-0.3-0.1-0.6-0.2-1-0.3c-0.4-0.1-0.7-0.1-1.1-0.1c-0.5,0-1,0.1-1.4,0.2c-0.4,0.1-0.8,0.3-1,0.6 c-0.3,0.3-0.5,0.6-0.7,1s-0.3,0.9-0.3,1.5H20.3z"}},{"tag":"circle","attr":{"fill":"#4CAF50","cx":"30","cy":"30","r":"15"}},{"tag":"path","attr":{"fill":"#fff","d":"M28.4,27c0.1,0.2,0.2,0.4,0.4,0.6c0.2,0.2,0.4,0.4,0.7,0.5c0.3,0.2,0.7,0.3,1.1,0.5c0.7,0.3,1.4,0.6,2,0.9 c0.6,0.3,1.1,0.7,1.5,1.1c0.4,0.4,0.8,0.9,1,1.4c0.2,0.5,0.4,1.2,0.4,1.9c0,0.7-0.1,1.3-0.3,1.8c-0.2,0.5-0.5,1-0.9,1.4 s-0.9,0.7-1.4,0.9c-0.6,0.2-1.2,0.4-1.8,0.5v2.2h-1.8v-2.2c-0.6-0.1-1.2-0.2-1.8-0.4s-1.1-0.5-1.5-1c-0.5-0.4-0.8-1-1.1-1.6 c-0.3-0.6-0.4-1.4-0.4-2.3h3.3c0,0.5,0.1,1,0.2,1.3c0.1,0.4,0.3,0.6,0.6,0.9c0.2,0.2,0.5,0.4,0.8,0.5c0.3,0.1,0.6,0.1,0.9,0.1 c0.4,0,0.7,0,0.9-0.1c0.3-0.1,0.5-0.2,0.7-0.4c0.2-0.2,0.3-0.4,0.4-0.6c0.1-0.2,0.1-0.5,0.1-0.8c0-0.3,0-0.6-0.1-0.8 c-0.1-0.2-0.2-0.5-0.4-0.7s-0.4-0.4-0.7-0.5c-0.3-0.2-0.7-0.3-1.1-0.5c-0.7-0.3-1.4-0.6-2-0.9c-0.6-0.3-1.1-0.7-1.5-1.1 c-0.4-0.4-0.8-0.9-1-1.4c-0.2-0.5-0.4-1.2-0.4-1.9c0-0.6,0.1-1.2,0.3-1.7c0.2-0.5,0.5-1,0.9-1.4c0.4-0.4,0.9-0.7,1.4-1 c0.5-0.2,1.2-0.4,1.8-0.5v-2.4h1.8v2.4c0.6,0.1,1.2,0.3,1.8,0.6c0.5,0.3,1,0.6,1.3,1.1c0.4,0.4,0.7,1,0.9,1.6c0.2,0.6,0.3,1.3,0.3,2 h-3.3c0-0.9-0.2-1.6-0.6-2c-0.4-0.4-0.9-0.7-1.5-0.7c-0.3,0-0.6,0.1-0.9,0.2c-0.2,0.1-0.4,0.2-0.6,0.4c-0.2,0.2-0.3,0.4-0.3,0.6 c-0.1,0.2-0.1,0.5-0.1,0.8C28.3,26.5,28.4,26.8,28.4,27z"}}]})(props);
};
function FcCursor (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E0E0E0","d":"M27.8,39.7c-0.1,0-0.2,0-0.4-0.1c-0.2-0.1-0.4-0.3-0.6-0.5l-3.7-8.6l-4.5,4.2C18.5,34.9,18.3,35,18,35 c-0.1,0-0.3,0-0.4-0.1C17.3,34.8,17,34.4,17,34l0-22c0-0.4,0.2-0.8,0.6-0.9C17.7,11,17.9,11,18,11c0.2,0,0.5,0.1,0.7,0.3l16,15 c0.3,0.3,0.4,0.7,0.3,1.1c-0.1,0.4-0.5,0.6-0.9,0.7l-6.3,0.6l3.9,8.5c0.1,0.2,0.1,0.5,0,0.8c-0.1,0.2-0.3,0.5-0.5,0.6l-2.9,1.3 C28.1,39.7,27.9,39.7,27.8,39.7z"}},{"tag":"path","attr":{"fill":"#212121","d":"M18,12l16,15l-7.7,0.7l4.5,9.8l-2.9,1.3l-4.3-9.9L18,34L18,12 M18,10c-0.3,0-0.5,0.1-0.8,0.2 c-0.7,0.3-1.2,1-1.2,1.8l0,22c0,0.8,0.5,1.5,1.2,1.8C17.5,36,17.8,36,18,36c0.5,0,1-0.2,1.4-0.5l3.4-3.2l3.1,7.3 c0.2,0.5,0.6,0.9,1.1,1.1c0.2,0.1,0.5,0.1,0.7,0.1c0.3,0,0.5-0.1,0.8-0.2l2.9-1.3c0.5-0.2,0.9-0.6,1.1-1.1c0.2-0.5,0.2-1.1,0-1.5 l-3.3-7.2l4.9-0.4c0.8-0.1,1.5-0.6,1.7-1.3c0.3-0.7,0.1-1.6-0.5-2.1l-16-15C19,10.2,18.5,10,18,10L18,10z"}}]})(props);
};
function FcCustomerSupport (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFB74D","d":"M29,43v-4.6l2.6,0.5c2.9,0.6,5.6-1.5,5.8-4.4L38,28l2.9-1.2c1-0.4,1.4-1.6,0.8-2.6L38,18 c-0.6-7.6-4.9-15-16-15C10.6,3,5,11.4,5,20c0,3.7,1.3,6.9,3.3,9.6c1.8,2.5,2.7,5.5,2.7,8.5l0,4.8H29z"}},{"tag":"polygon","attr":{"fill":"#FF9800","points":"29,43 29,38.4 22,37 22,43"}},{"tag":"circle","attr":{"fill":"#784719","cx":"33.5","cy":"21.5","r":"1.5"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M21.4,3C12.3,3,5,10.3,5,19.4c0,11.1,6,11.4,6,18.6l2.6-0.9c2.1-0.7,3.9-2.3,4.7-4.4l2.8-6.8L27,23v-6 c0,0,7-3.8,7-10.3C31,4.2,25.7,3,21.4,3z"}},{"tag":"g","attr":{"fill":"#546E7A"},"child":[{"tag":"path","attr":{"d":"M21,2.1c-0.6,0-1,0.4-1,1v13.9c0,0.6,0.4,1,1,1s1-0.4,1-1V3.1C22,2.5,21.6,2.1,21,2.1z"}},{"tag":"path","attr":{"d":"M36.9,31.9c-7.9,0-10.3-4.9-10.4-5.1c-0.2-0.5-0.8-0.7-1.3-0.5c-0.5,0.2-0.7,0.8-0.5,1.3 c0.1,0.3,3,6.3,12.2,6.3c0.6,0,1-0.4,1-1S37.4,31.9,36.9,31.9z"}}]},{"tag":"circle","attr":{"fill":"#37474F","cx":"37","cy":"33","r":"2"}},{"tag":"circle","attr":{"fill":"#37474F","cx":"21","cy":"23","r":"7"}},{"tag":"circle","attr":{"fill":"#546E7A","cx":"21","cy":"23","r":"4"}}]})(props);
};
function FcDam (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#81D4FA"},"child":[{"tag":"rect","attr":{"x":"24","y":"28","width":"18","height":"14"}},{"tag":"rect","attr":{"x":"6","y":"10","width":"12","height":"32"}}]},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"path","attr":{"d":"M16,8h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,10,16,9.1,16,8z"}},{"tag":"path","attr":{"d":"M16,14h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,16,16,15.1,16,14z"}},{"tag":"path","attr":{"d":"M16,20h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,22,16,21.1,16,20z"}},{"tag":"path","attr":{"d":"M16,26h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,28,16,27.1,16,26z"}},{"tag":"path","attr":{"d":"M16,32h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,34,16,33.1,16,32z"}},{"tag":"path","attr":{"d":"M16,38h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2H8c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C16.9,40,16,39.1,16,38z"}},{"tag":"path","attr":{"d":"M40,32h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2h-2c0,1.1-0.9,2-2,2v2 c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2 C40.9,34,40,33.1,40,32z"}},{"tag":"path","attr":{"d":"M40,26h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2h-2c0,1.1-0.9,2-2,2v2 c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2 C40.9,28,40,27.1,40,26z"}},{"tag":"path","attr":{"d":"M40,38h-2c0,1.1-0.9,2-2,2s-2-0.9-2-2h-2c0,1.1-0.9,2-2,2v2c1.2,0,2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4 s2.3-0.5,3-1.4c0.7,0.8,1.8,1.4,3,1.4v-2C40.9,40,40,39.1,40,38z"}}]},{"tag":"path","attr":{"fill":"#455A64","d":"M25.1,9.2L31.5,42H18V6h3.2C23.1,6,24.8,7.4,25.1,9.2z"}}]})(props);
};
function FcDataBackup (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"polygon","attr":{"points":"31,30 38,35.6 38,24.4"}},{"tag":"path","attr":{"d":"M38,28c-0.3,0-0.7,0-1,0.1v4c0.3-0.1,0.7-0.1,1-0.1c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6 c0-0.3,0-0.6,0.1-0.9l-3.4-2.7C28.3,35.5,28,36.7,28,38c0,5.5,4.5,10,10,10s10-4.5,10-10S43.5,28,38,28z"}}]}]})(props);
};
function FcDataConfiguration (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"path","attr":{"fill":"#607D8B","d":"M45.2,38.1c0.1-0.4,0.1-0.8,0.1-1.1s0-0.8-0.1-1.1l2.3-1.7c0.2-0.2,0.3-0.5,0.2-0.7l-2.3-3.9 c-0.1-0.2-0.4-0.3-0.7-0.2l-2.6,1.2c-0.6-0.5-1.3-0.9-2-1.2l-0.3-2.9c0-0.3-0.3-0.5-0.5-0.5h-4.5c-0.3,0-0.5,0.2-0.5,0.5l-0.3,2.9 c-0.7,0.3-1.4,0.7-2,1.2l-2.6-1.2c-0.3-0.1-0.6,0-0.7,0.2l-2.3,3.9c-0.1,0.2-0.1,0.6,0.2,0.7l2.3,1.7c-0.1,0.4-0.1,0.8-0.1,1.1 s0,0.8,0.1,1.1l-2.3,1.7c-0.2,0.2-0.3,0.5-0.2,0.7l2.3,3.9c0.1,0.2,0.4,0.3,0.7,0.2l2.6-1.2c0.6,0.5,1.3,0.9,2,1.2l0.3,2.9 c0,0.3,0.3,0.5,0.5,0.5h4.5c0.3,0,0.5-0.2,0.5-0.5l0.3-2.9c0.7-0.3,1.4-0.7,2-1.2l2.6,1.2c0.3,0.1,0.6,0,0.7-0.2l2.3-3.9 c0.1-0.2,0.1-0.6-0.2-0.7L45.2,38.1z M37,42.2c-2.9,0-5.2-2.3-5.2-5.2c0-2.9,2.3-5.2,5.2-5.2c2.9,0,5.2,2.3,5.2,5.2 C42.2,39.9,39.9,42.2,37,42.2z"}},{"tag":"path","attr":{"fill":"#455A64","d":"M37,31c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6s6-2.7,6-6C43,33.7,40.3,31,37,31z M37,40c-1.7,0-3-1.3-3-3 c0-1.7,1.3-3,3-3s3,1.3,3,3C40,38.7,38.7,40,37,40z"}}]})(props);
};
function FcDataEncryption (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h25.1c1.3-1.3,4.9-0.9,4.9-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M34.4,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-2.4C40,33.5,37.5,31,34.4,31z"}}]},{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"polygon","attr":{"points":"43,46 41,48 39,48 37,46 37,35.4 43,35.4 43,40 42,41 43,42 43,43 42,44 43,45"}},{"tag":"path","attr":{"d":"M47.5,28.5c-0.3-0.9-1-1.6-2-1.8C44.2,26.4,42.2,26,40,26s-4.2,0.4-5.5,0.6c-1,0.2-1.7,0.9-2,1.8 C32.3,29.4,32,30.6,32,32c0,1.4,0.3,2.6,0.5,3.5c0.3,0.9,1,1.6,2,1.8c1.3,0.3,3.2,0.6,5.5,0.6s4.2-0.4,5.5-0.6c1-0.2,1.7-0.9,2-1.8 c0.3-0.9,0.5-2.1,0.5-3.5C48,30.6,47.7,29.4,47.5,28.5z M42.9,31h-5.7c-0.6,0-1.1-0.5-1.1-1.1v-1.4c0-0.3,1.8-0.6,4-0.6 s4,0.3,4,0.6v1.4C44,30.5,43.5,31,42.9,31z"}}]},{"tag":"rect","attr":{"x":"39","y":"37.1","fill":"#D68600","width":"1","height":"10.9"}}]})(props);
};
function FcDataProtection (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h25.1c1.3-1.3,4.9-0.9,4.9-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M34.4,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-2.4C40,33.5,37.5,31,34.4,31z"}}]},{"tag":"path","attr":{"fill":"#009688","d":"M46,25H32c-1.1,0-2,0.9-2,2v11.8c0,1.3,0.6,2.4,1.6,3.2l7.4,5.5l7.4-5.5c1-0.8,1.6-1.9,1.6-3.2V27 C48,25.9,47.1,25,46,25z"}}]})(props);
};
function FcDataRecovery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"g","attr":{"fill":"#F44336"},"child":[{"tag":"rect","attr":{"x":"35","y":"28","width":"6","height":"20"}},{"tag":"rect","attr":{"x":"28","y":"35","width":"20","height":"6"}}]}]})(props);
};
function FcDataSheet (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M39,16v7h-6v-7h-2v7h-6v-7h-2v7h-7v2h7v6h-7v2h7v6h-7v2h25V16H39z M39,25v6h-6v-6H39z M25,25h6v6h-6V25z M25,33h6v6h-6V33z M33,39v-6h6v6H33z"}},{"tag":"polygon","attr":{"fill":"#00BCD4","points":"40,8 8,8 8,40 16,40 16,16 40,16"}},{"tag":"path","attr":{"fill":"#0097A7","d":"M7,7v34h10V17h24V7H7z M9,23v-6h6v6H9z M15,25v6H9v-6H15z M17,9h6v6h-6V9z M25,9h6v6h-6V9z M15,9v6H9V9H15z M9,39v-6h6v6H9z M39,15h-6V9h6V15z"}}]})(props);
};
function FcDatabase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]}]})(props);
};
function FcDebian (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E91E63","d":"M26.763,24.548c-0.614,0.01,0.117,0.317,0.918,0.44c0.22-0.172,0.419-0.348,0.6-0.515\r\n\tC27.781,24.592,27.274,24.594,26.763,24.548 M30.054,23.727c0.364-0.5,0.631-1.055,0.723-1.624c-0.082,0.405-0.303,0.755-0.51,1.128\r\n\tc-1.146,0.721-0.108-0.43,0-0.865C29.035,23.913,30.098,23.293,30.054,23.727 M31.269,20.568c0.073-1.105-0.219-0.756-0.317-0.336\r\n\tC31.068,20.294,31.156,21.013,31.269,20.568 M24.439,5.478c0.327,0.058,0.706,0.104,0.653,0.183\r\n\tC25.449,5.582,25.531,5.51,24.439,5.478 M25.093,5.66l-0.232,0.047l0.215-0.017L25.093,5.66 M35.294,20.986\r\n\tc0.038,0.991-0.29,1.472-0.585,2.322l-0.529,0.266c-0.435,0.841,0.041,0.535-0.268,1.202c-0.679,0.603-2.055,1.883-2.496,2.004\r\n\tc-0.321-0.009,0.218-0.382,0.289-0.526c-0.906,0.62-0.728,0.934-2.113,1.313l-0.041-0.09c-3.419,1.607-8.166-1.576-8.103-5.928\r\n\tc-0.037,0.275-0.104,0.209-0.18,0.32c-0.175-2.237,1.033-4.486,3.073-5.403c1.995-0.987,4.335-0.58,5.763,0.75\r\n\tc-0.785-1.028-2.348-2.119-4.199-2.017c-1.814,0.029-3.51,1.182-4.077,2.434c-0.929,0.585-1.038,2.256-1.441,2.563\r\n\tc-0.545,4.003,1.024,5.733,3.68,7.768c0.417,0.282,0.118,0.326,0.175,0.541c-0.883-0.412-1.69-1.037-2.354-1.801\r\n\tc0.353,0.517,0.733,1.017,1.223,1.41c-0.831-0.279-1.942-2.013-2.267-2.084c1.435,2.567,5.818,4.502,8.113,3.541\r\n\tc-1.062,0.04-2.412,0.021-3.604-0.42c-0.501-0.257-1.183-0.791-1.062-0.893c3.133,1.171,6.369,0.887,9.078-1.286\r\n\tc0.689-0.537,1.443-1.449,1.662-1.464c-0.327,0.493,0.057,0.239-0.197,0.674c0.688-1.109-0.299-0.449,0.711-1.913l0.373,0.512\r\n\tc-0.139-0.917,1.143-2.033,1.012-3.489c0.291-0.445,0.326,0.478,0.015,1.502c0.434-1.136,0.113-1.317,0.224-2.254\r\n\tc0.121,0.315,0.279,0.648,0.359,0.981c-0.281-1.097,0.289-1.848,0.433-2.485c-0.142-0.063-0.435,0.485-0.503-0.812\r\n\tc0.01-0.562,0.156-0.295,0.214-0.435c-0.111-0.064-0.4-0.496-0.577-1.323c0.127-0.193,0.342,0.506,0.516,0.533\r\n\tc-0.112-0.655-0.304-1.159-0.313-1.665c-0.51-1.061-0.181,0.143-0.592-0.458c-0.543-1.687,0.449-0.39,0.514-1.156\r\n\tc0.82,1.188,1.289,3.029,1.504,3.792c-0.164-0.93-0.428-1.832-0.752-2.704c0.249,0.108-0.401-1.911,0.324-0.575\r\n\tc-0.772-2.848-3.314-5.511-5.65-6.76c0.286,0.262,0.646,0.591,0.517,0.642c-1.163-0.69-0.959-0.745-1.124-1.041\r\n\tc-0.946-0.383-1.01,0.034-1.636,0c-1.786-0.943-2.129-0.845-3.772-1.437l0.078,0.349c-1.184-0.394-1.379,0.146-2.657,0.002\r\n\tc-0.078-0.062,0.41-0.219,0.811-0.278c-1.143,0.15-1.09-0.228-2.208,0.042c0.277-0.197,0.566-0.322,0.861-0.486\r\n\tc-0.932,0.059-2.226,0.542-1.825,0.103c-1.521,0.676-4.22,1.63-5.735,3.051l-0.047-0.322c-0.694,0.835-3.028,2.492-3.215,3.57\r\n\tl-0.185,0.043c-0.361,0.613-0.595,1.305-0.881,1.935c-0.474,0.806-0.692,0.311-0.626,0.436c-0.929,1.883-1.39,3.467-1.79,4.768\r\n\tc0.284,0.424,0.007,2.558,0.113,4.264c-0.467,8.429,5.916,16.609,12.891,18.5c1.023,0.365,2.542,0.354,3.836,0.39\r\n\tc-1.525-0.438-1.722-0.232-3.209-0.749c-1.074-0.506-1.308-1.082-2.066-1.74l0.3,0.53c-1.49-0.526-0.867-0.652-2.078-1.034\r\n\tl0.321-0.424c-0.482-0.032-1.279-0.811-1.497-1.241l-0.528,0.021c-0.634-0.783-0.972-1.348-0.948-1.785l-0.17,0.305\r\n\tc-0.194-0.332-2.335-2.937-1.224-2.33c-0.207-0.188-0.481-0.307-0.779-0.85l0.227-0.258c-0.535-0.686-0.983-1.568-0.949-1.86\r\n\tc0.284,0.384,0.482,0.454,0.679,0.522c-1.351-3.349-1.426-0.187-2.448-3.409l0.216-0.019c-0.166-0.246-0.265-0.521-0.399-0.785\r\n\tl0.094-0.938c-0.972-1.125-0.272-4.781-0.132-6.783c0.097-0.816,0.811-1.684,1.354-3.045l-0.332-0.055\r\n\tc0.632-1.104,3.612-4.433,4.99-4.26c0.669-0.841-0.132-0.002-0.263-0.215c1.469-1.52,1.93-1.073,2.92-1.349\r\n\tc1.068-0.633-0.917,0.251-0.41-0.239c1.848-0.473,1.31-1.073,3.718-1.311c0.254,0.145-0.59,0.223-0.8,0.41\r\n\tc1.538-0.753,4.87-0.584,7.034,0.417c2.511,1.173,5.33,4.642,5.443,7.904l0.126,0.035c-0.063,1.298,0.198,2.798-0.257,4.175\r\n\tL35.294,20.986 M20.072,25.389l-0.086,0.431c0.403,0.547,0.724,1.142,1.237,1.567C20.853,26.664,20.577,26.364,20.072,25.389\r\n\t M21.023,25.353c-0.213-0.237-0.34-0.518-0.48-0.802c0.135,0.495,0.411,0.922,0.669,1.357L21.023,25.353 M37.877,21.688\r\n\tl-0.088,0.226c-0.166,1.174-0.523,2.332-1.068,3.412C37.324,24.189,37.714,22.947,37.877,21.688 M24.56,5.185\r\n\tC24.974,5.031,25.579,5.101,26.019,5c-0.573,0.048-1.144,0.079-1.706,0.151L24.56,5.185 M10.007,12.923\r\n\tc0.095,0.882-0.667,1.229,0.167,0.644C10.623,12.562,10,13.286,10.007,12.923 M9.028,17.016c0.191-0.592,0.226-0.943,0.3-1.285\r\n\tC8.797,16.41,9.084,16.553,9.028,17.016"}}]})(props);
};
function FcDebt (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFB74D","d":"M10,12c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,12,10,12z"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M2,22v8l3,2l1,14h8l1-14l3-2v-8c0-4.4-3.6-8-8-8h0C5.6,14,2,17.6,2,22z"}},{"tag":"g","attr":{"fill":"#263238"},"child":[{"tag":"path","attr":{"d":"M22.4,40.4c-0.6,2.5-1,3.6-2.4,3.6c-0.6,0-1.2-0.5-1.9-1.1c-1-0.8-2.2-1.9-4.1-1.9v2c1.1,0,1.9,0.7,2.8,1.4 c0.9,0.7,1.9,1.6,3.2,1.6c3.1,0,3.8-2.9,4.4-5.2C25,38.2,25.4,37,27,37v-2C23.7,35,22.9,38.1,22.4,40.4z"}},{"tag":"polygon","attr":{"points":"14.4,40 10,40 10,44 14.1,44"}}]},{"tag":"circle","attr":{"fill":"#4CAF50","cx":"36","cy":"36","r":"10"}},{"tag":"path","attr":{"fill":"#fff","d":"M35,34c0.1,0.2,0.1,0.3,0.3,0.4c0.1,0.1,0.3,0.2,0.5,0.4c0.2,0.1,0.5,0.2,0.8,0.3c0.5,0.2,0.9,0.4,1.3,0.6 c0.4,0.2,0.7,0.4,1,0.7c0.3,0.3,0.5,0.6,0.7,0.9c0.2,0.4,0.2,0.8,0.2,1.3c0,0.4-0.1,0.8-0.2,1.2c-0.1,0.4-0.3,0.7-0.6,0.9 c-0.3,0.3-0.6,0.5-0.9,0.6c-0.4,0.2-0.8,0.3-1.2,0.3v1.5h-1.2v-1.5c-0.4,0-0.8-0.1-1.2-0.3c-0.4-0.2-0.7-0.4-1-0.6 c-0.3-0.3-0.5-0.6-0.7-1.1c-0.2-0.4-0.3-0.9-0.3-1.5h2.2c0,0.4,0,0.7,0.1,0.9c0.1,0.2,0.2,0.4,0.4,0.6c0.2,0.1,0.3,0.2,0.5,0.3 c0.2,0.1,0.4,0.1,0.6,0.1c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.2-0.3,0.3-0.4c0.1-0.2,0.1-0.3,0.1-0.5 c0-0.2,0-0.4-0.1-0.6c-0.1-0.2-0.1-0.3-0.3-0.4c-0.1-0.1-0.3-0.3-0.5-0.4c-0.2-0.1-0.4-0.2-0.7-0.3c-0.5-0.2-0.9-0.4-1.3-0.6 c-0.4-0.2-0.7-0.4-1-0.7c-0.3-0.3-0.5-0.6-0.7-0.9c-0.2-0.4-0.2-0.8-0.2-1.3c0-0.4,0.1-0.8,0.2-1.2c0.1-0.3,0.3-0.7,0.6-0.9 c0.3-0.3,0.6-0.5,0.9-0.6c0.4-0.2,0.8-0.3,1.2-0.3v-1.6h1.2v1.6c0.4,0.1,0.8,0.2,1.2,0.4c0.4,0.2,0.6,0.4,0.9,0.7 c0.2,0.3,0.4,0.6,0.6,1c0.1,0.4,0.2,0.9,0.2,1.4h-2.2c0-0.6-0.1-1-0.4-1.3c-0.2-0.3-0.6-0.4-1-0.4c-0.2,0-0.4,0-0.6,0.1 c-0.2,0.1-0.3,0.2-0.4,0.3C35.1,32.7,35,32.8,35,33s-0.1,0.3-0.1,0.5C34.9,33.7,34.9,33.9,35,34z"}}]})(props);
};
function FcDecision (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"path","attr":{"fill":"#0277BD","d":"M21.8,29.6c0-6.6,5.1-6.2,5.1-10.2c0-1-0.3-3-2.9-3c-2.8,0-3,2.3-3,2.8h-3.8c0-1,0.4-6,6.8-6 c6.5,0,6.7,5.1,6.7,6c0,4.9-5.4,5.6-5.4,10.3H21.8z M21.5,34.5c0-0.3,0.1-2.1,2.1-2.1c2,0,2.2,1.8,2.2,2.1c0,0.6-0.3,2-2.2,2 C21.8,36.5,21.5,35.1,21.5,34.5z"}}]})(props);
};
function FcDeleteColumn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M30,5H18c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9C34,6.8,32.2,5,30,5z M18,39V9h12l0,30 H18z"}},{"tag":"circle","attr":{"fill":"#F44336","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 .707 -.707 -.707 91.74 38)","width":"3","height":"12"}},{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 -.707 .707 -.707 38 91.74)","width":"3","height":"12"}}]}]})(props);
};
function FcDeleteDatabase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#D1C4E9"},"child":[{"tag":"path","attr":{"d":"M38,7H10C8.9,7,8,7.9,8,9v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2V9C40,7.9,39.1,7,38,7z"}},{"tag":"path","attr":{"d":"M38,19H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,19.9,39.1,19,38,19z"}},{"tag":"path","attr":{"d":"M38,31H10c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h28c1.1,0,2-0.9,2-2v-6C40,31.9,39.1,31,38,31z"}}]},{"tag":"circle","attr":{"fill":"#F44336","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 .707 -.707 -.707 91.74 38)","width":"3","height":"12"}},{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 -.707 .707 -.707 38 91.74)","width":"3","height":"12"}}]}]})(props);
};
function FcDeleteRow (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M43,30V18c0-2.2-1.8-4-4-4H9c-2.2,0-4,1.8-4,4v12c0,2.2,1.8,4,4,4h30C41.2,34,43,32.2,43,30z M9,18h30v12 L9,30V18z"}},{"tag":"circle","attr":{"fill":"#F44336","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 .707 -.707 -.707 91.74 38)","width":"3","height":"12"}},{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 -.707 .707 -.707 38 91.74)","width":"3","height":"12"}}]}]})(props);
};
function FcDepartment (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#C5CAE9","points":"42,42 6,42 6,9 24,2 42,9"}},{"tag":"rect","attr":{"x":"6","y":"42","fill":"#9FA8DA","width":"36","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"35","fill":"#BF360C","width":"8","height":"9"}},{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"rect","attr":{"x":"31","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"35","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"35","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"11","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"11","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"11","width":"6","height":"5"}}]}]})(props);
};
function FcDeployment (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#B0BEC5","d":"M37,42H5V32h32c2.8,0,5,2.2,5,5v0C42,39.8,39.8,42,37,42z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M10,34c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S11.7,34,10,34z M10,38c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1 s1,0.4,1,1C11,37.6,10.6,38,10,38z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M19,34c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S20.7,34,19,34z M19,38c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1 s1,0.4,1,1C20,37.6,19.6,38,19,38z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M37,34c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S38.7,34,37,34z M37,38c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1 s1,0.4,1,1C38,37.6,37.6,38,37,38z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M28,34c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S29.7,34,28,34z M28,38c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1 s1,0.4,1,1C29,37.6,28.6,38,28,38z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M35,31H11c-1.1,0-2-0.9-2-2V7c0-1.1,0.9-2,2-2h24c1.1,0,2,0.9,2,2v22C37,30.1,36.1,31,35,31z"}},{"tag":"path","attr":{"fill":"#8A5100","d":"M26.5,13h-7c-0.8,0-1.5-0.7-1.5-1.5v0c0-0.8,0.7-1.5,1.5-1.5h7c0.8,0,1.5,0.7,1.5,1.5v0 C28,12.3,27.3,13,26.5,13z"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M37,31H5v2h32c2.2,0,4,1.8,4,4s-1.8,4-4,4H5v2h32c3.3,0,6-2.7,6-6S40.3,31,37,31z"}}]})(props);
};
function FcDiploma1 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"4","y":"9","fill":"#E8EAF6","width":"40","height":"30"}},{"tag":"g","attr":{"fill":"#5C6BC0"},"child":[{"tag":"polygon","attr":{"points":"30,34 32.8,34 27.8,29 25,31.8 30,36.8"}},{"tag":"polygon","attr":{"points":"18,34 15.2,34 20.2,29 23,31.8 18,36.8"}}]},{"tag":"rect","attr":{"x":"11","y":"15","fill":"#9FA8DA","width":"26","height":"4"}},{"tag":"path","attr":{"fill":"#9FA8DA","d":"M24,23c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S26.8,23,24,23z M24,31c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3 S25.7,31,24,31z"}},{"tag":"path","attr":{"fill":"#9FA8DA","d":"M3,8v32h42V8H3z M43,35c-1.7,0-3,1.3-3,3H8c0-1.7-1.3-3-3-3V13c1.7,0,3-1.3,3-3h32c0,1.7,1.3,3,3,3V35z"}}]})(props);
};
function FcDiploma2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"9","y":"4","fill":"#FBE9E7","width":"30","height":"40"}},{"tag":"g","attr":{"fill":"#F4511E"},"child":[{"tag":"polygon","attr":{"points":"30,37 32.8,37 27.8,32 25,34.8 30,39.8"}},{"tag":"polygon","attr":{"points":"18,37 15.2,37 20.2,32 23,34.8 18,39.8"}}]},{"tag":"rect","attr":{"x":"15","y":"13","fill":"#FF8A65","width":"18","height":"4"}},{"tag":"rect","attr":{"x":"15","y":"20","fill":"#FF8A65","width":"18","height":"2"}},{"tag":"path","attr":{"fill":"#FF8A65","d":"M24,26c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S26.8,26,24,26z M24,34c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3 S25.7,34,24,34z"}},{"tag":"path","attr":{"fill":"#FF8A65","d":"M8,3v42h32V3H8z M38,40c-1.7,0-3,1.3-3,3H13c0-1.7-1.3-3-3-3V8c1.7,0,3-1.3,3-3h22c0,1.7,1.3,3,3,3V40z"}}]})(props);
};
function FcDisapprove (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"g","attr":{"fill":"#F44336"},"child":[{"tag":"rect","attr":{"x":"22","y":"16.8","transform":"matrix(.707 -.707 .707 .707 -11.355 24.586)","width":"4","height":"18.5"}},{"tag":"rect","attr":{"x":"22","y":"16.8","transform":"matrix(.707 .707 -.707 .707 25.414 -9.355)","width":"4","height":"18.5"}}]}]})(props);
};
function FcDisclaimer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"path","attr":{"d":"M13,22H8v-8.5c0-1.4,1.1-2.5,2.5-2.5h0c1.4,0,2.5,1.1,2.5,2.5V22z"}},{"tag":"path","attr":{"d":"M20,22h-5V7.5C15,6.1,16.1,5,17.5,5h0C18.9,5,20,6.1,20,7.5V22z"}},{"tag":"path","attr":{"d":"M27,22h-5V5.5C22,4.1,23.1,3,24.5,3h0C25.9,3,27,4.1,27,5.5V22z"}},{"tag":"path","attr":{"d":"M34,22h-5V8.5C29,7.1,30.1,6,31.5,6h0C32.9,6,34,7.1,34,8.5V22z"}},{"tag":"path","attr":{"d":"M32.1,43L27.1,38l10-10c1.4-1.4,3.6-1.4,4.9,0l0,0c1.4,1.4,1.4,3.6,0,4.9L32.1,43z"}},{"tag":"path","attr":{"d":"M29,21c0,0.6-0.4,1-1,1s-1-0.4-1-1h-5c0,0.6-0.4,1-1,1s-1-0.4-1-1h-5c0,0.6-0.4,1-1,1s-1-0.4-1-1H8v16 c0,4.4,3.6,8,8,8h11.2c3.7,0,6.8-3,6.8-6.8V21H29z"}}]},{"tag":"g","attr":{"fill":"#F44336"},"child":[{"tag":"rect","attr":{"x":"20.2","y":"25.5","transform":"matrix(.707 -.707 .707 .707 -16.897 25.224)","width":"3.5","height":"15"}},{"tag":"rect","attr":{"x":"20.2","y":"25.6","transform":"matrix(.707 .707 -.707 .707 29.811 -5.877)","width":"3.5","height":"15"}}]}]})(props);
};
function FcDislike (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"}},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}}]})(props);
};
function FcDisplay (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#80DEEA","d":"M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"}},{"tag":"g","attr":{"fill":"#2962FF"},"child":[{"tag":"polygon","attr":{"points":"36,17 31,17 29,15 31,13 36,13 38,15"}},{"tag":"polygon","attr":{"points":"36,35 31,35 29,33 31,31 36,31 38,33"}},{"tag":"polygon","attr":{"points":"37,30 37,18 39,16 41,18 41,30 39,32"}},{"tag":"polygon","attr":{"points":"26,30 26,18 28,16 30,18 30,30 28,32"}},{"tag":"polygon","attr":{"points":"17,17 12,17 10,15 12,13 17,13 19,15"}},{"tag":"polygon","attr":{"points":"17,35 12,35 10,33 12,31 17,31 19,33"}},{"tag":"polygon","attr":{"points":"18,30 18,18 20,16 22,18 22,30 20,32"}},{"tag":"polygon","attr":{"points":"7,30 7,18 9,16 11,18 11,30 9,32"}}]}]})(props);
};
function FcDoNotInhale (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFA726","d":"M33.5,20C31.2,17.7,30,13.9,30,9c0-3.2,0-3,0-3H18c0,0,0-0.2,0,3c0,4.9-1.2,8.7-3.5,11 C12.1,20.2,9,22,9,25.4c0,4.5,5.1,4.6,6,4.6c1.2,0,6.1,4,8,4c0,0,0.7,0,1,0s1,0,1,0c1.9,0,6.8-4,8-4c0.9,0,6-0.1,6-4.6 C39,22,35.9,20.2,33.5,20z"}},{"tag":"path","attr":{"fill":"#FFA726","d":"M33.5,20C31.2,17.7,30,13.9,30,9c0-3.2,0-3,0-3H18c0,0,0-0.2,0,3c0,4.9-1.2,8.7-3.5,11 C12.1,20.2,9,22,9,25.4c0,4.5,5.1,4.6,6,4.6c1.2,0,6.1,4,8,4c0,0,0.7,0,1,0s1,0,1,0c1.9,0,6.8-4,8-4c0.9,0,6-0.1,6-4.6 C39,22,35.9,20.2,33.5,20z"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M26,9c0-3.2,0-3,0-3h-4c0,0,0-0.2,0,3c0,4.9-3,19-3,19s1.6,2,5,2s5-2,5-2S26,13.9,26,9z"}},{"tag":"path","attr":{"fill":"#CC861E","d":"M23,34c-3.3,0-6.4-3.1-8-4c0,0,0.7,0,1.8,0C19.9,30,21.3,34,23,34z"}},{"tag":"path","attr":{"fill":"#CC861E","d":"M25,34c3.3,0,6.4-3.1,8-4c0,0-0.7,0-1.8,0C28.1,30,26.7,34,25,34z"}},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}},{"tag":"g","attr":{"fill":"#FF5722"},"child":[{"tag":"polygon","attr":{"points":"18,35 22,39 14,39"}},{"tag":"rect","attr":{"x":"17","y":"38","width":"2","height":"4"}},{"tag":"polygon","attr":{"points":"30,35 34,39 26,39"}},{"tag":"rect","attr":{"x":"29","y":"38","width":"2","height":"4"}}]}]})(props);
};
function FcDoNotInsert (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#7CB342"},"child":[{"tag":"polygon","attr":{"points":"31,29 24,36 17,29"}},{"tag":"rect","attr":{"x":"22","y":"7","width":"4","height":"25"}},{"tag":"path","attr":{"d":"M42,18c-3.3,0-6,2.7-6,6v12c0,1.1-0.9,2-2,2H14c-1.1,0-2-0.9-2-2V24c0-3.3-2.7-6-6-6H4v4h2c1.1,0,2,0.9,2,2 v12c0,3.3,2.7,6,6,6h20c3.3,0,6-2.7,6-6V24c0-1.1,0.9-2,2-2h2v-4H42z"}}]},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}}]})(props);
};
function FcDoNotMix (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#00BCD4","points":"26.9,42 17,42 17,32.1"}},{"tag":"polygon","attr":{"fill":"#00BCD4","points":"30,6 30,26.2 19.8,36.4 22.6,39.2 34,27.8 34,6"}},{"tag":"polygon","attr":{"fill":"#2196F3","points":"15.9,31 6,31 6,21.1"}},{"tag":"polygon","attr":{"fill":"#2196F3","points":"20.2,14 8.8,25.4 11.6,28.2 21.8,18 41,18 41,14"}},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}}]})(props);
};
function FcDocument (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,45 8,45 8,3 30,3 40,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,14 29,14 29,4.5"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"rect","attr":{"x":"16","y":"21","width":"17","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"25","width":"13","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"29","width":"17","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"33","width":"13","height":"2"}}]}]})(props);
};
function FcDonate (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#E69329","points":"11.7,21.6 16.8,31.5 26.3,27.6 30.7,14.9 15.9,15.7"}},{"tag":"circle","attr":{"fill":"#546E7A","cx":"15","cy":"36","r":"7.8"}},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"path","attr":{"d":"M15,27c-5,0-9,4-9,9c0,5,4,9,9,9s9-4,9-9C24,31,20,27,15,27z M15,43c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7 s7,3.1,7,7C22,39.9,18.9,43,15,43z"}},{"tag":"rect","attr":{"x":"14","y":"33","width":"2","height":"8"}}]},{"tag":"g","attr":{"fill":"#FFB74D"},"child":[{"tag":"path","attr":{"d":"M12.9,36L12.9,36c1,1.9,3.2,2.7,5.1,1.7l16.5-8.5c1-0.5,1.7-1.2,2.2-1.9c1.7-3.2,5.6-10.7,8.2-17.2 l-18.2,8.7L21.9,26l-6.8,3.6C12.5,30.9,11.7,33.8,12.9,36z"}},{"tag":"path","attr":{"d":"M30.2,3L13.7,9.3c-0.7,0.2-1.5,1-2.2,1.7l-5.6,7.5c-1,1.5-1.2,3.4-0.5,5.1c0.4,1,1.7,3.4,3.1,6.1 c1.6-1.7,3.9-2.7,6.5-2.7c0.4,0,0.9,0,1.3,0.1l-2.1-4.2l4.6-4.1h8c0,0,15.5-2.2,18.2-8.7L30.2,3z"}}]},{"tag":"path","attr":{"fill":"#FFCDD2","d":"M18.2,36c-1.3,0.6-2.8,0-3.3-1.3c-0.6-1.3,0-2.8,1.3-3.3C17.4,30.8,19.4,35.4,18.2,36z"}}]})(props);
};
function FcDoughnutChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#00BCD4","d":"M24,30c-3.3,0-6-2.7-6-6s2.7-6,6-6V5C13.5,5,5,13.5,5,24s8.5,19,19,19c4.4,0,8.5-1.5,11.8-4.1l-8-10.2 C26.7,29.5,25.4,30,24,30z"}},{"tag":"path","attr":{"fill":"#448AFF","d":"M30,24h13c0-10.5-8.5-19-19-19v13C27.3,18,30,20.7,30,24z"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M43,24H30c0,1.9-0.9,3.6-2.3,4.7l8,10.2C40.2,35.4,43,30,43,24z"}}]})(props);
};
function FcDownLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"4,29 18,17.3 18,40.7"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M42,21V8h-8v13c0,2.2-1.8,4-4,4H13v8h17C36.6,33,42,27.6,42,21z"}}]})(props);
};
function FcDownRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"44,29 30,17.3 30,40.7"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M6,21V8h8v13c0,2.2,1.8,4,4,4h17v8H18C11.4,33,6,27.6,6,21z"}}]})(props);
};
function FcDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"24,44 12.3,30 35.7,30"}},{"tag":"rect","attr":{"x":"20","y":"6","width":"8","height":"27"}}]}]})(props);
};
function FcDownload (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"polygon","attr":{"points":"24,37.1 13,24 35,24"}},{"tag":"rect","attr":{"x":"20","y":"4","width":"8","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"10","width":"8","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"16","width":"8","height":"11"}},{"tag":"rect","attr":{"x":"6","y":"40","width":"36","height":"4"}}]}]})(props);
};
function FcDribbble (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF4081","d":"M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M33.061,26.273c-0.703-0.221-1.464,0.175-1.686,0.895c-0.824,2.658-2.316,5.419-2.993,5.57\r\n\tc-0.507,0-1.236-0.43-1.958-1.44c1.674-3.594,2.551-8.106,2.551-11.118c0-8.413-2.124-10.18-3.908-10.18\r\n\tc-3.757,0-3.8,9.912-3.8,10.012c0,1.166,0.042,2.248,0.121,3.256c-0.518-0.189-1.113-0.319-1.77-0.319\r\n\tc-3.86,0-5.618,3.809-5.618,7.347C14,33.63,15.871,37,20.046,37c1.972,0,3.634-1.291,4.975-3.221\r\n\tc1.188,1.235,2.432,1.696,3.36,1.696c2.923,0,4.858-5.233,5.556-7.486C34.16,27.27,33.767,26.502,33.061,26.273z M20.048,34.264\r\n\tc-3.031,0-3.36-2.775-3.36-3.969c0-0.188,0.034-4.611,2.932-4.611c1.144,0,2.022,0.885,2.022,0.885\r\n\tc0.065,0.07,0.137,0.131,0.212,0.184c0.375,1.904,0.904,3.426,1.516,4.632C22.366,33.123,21.203,34.264,20.048,34.264z\r\n\t M24.901,27.926c-0.559-1.93-0.946-4.521-0.946-7.914c0-3.126,0.666-6.068,1.219-7.073c0.424,0.644,1.115,2.65,1.115,7.241\r\n\tC26.289,22.616,25.75,25.446,24.901,27.926z"}}]})(props);
};
function FcDvdLogo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#42A5F5","d":"M24.002,27c-12.154,0-22,1.343-22,3.006c0,1.653,9.845,2.994,22,2.994c12.156,0,22-1.341,22-2.994\r\n\tC46.002,28.343,36.158,27,24.002,27z M24.002,30.972c-2.863,0-5.191-0.494-5.191-1.104c0-0.609,2.329-1.104,5.191-1.104\r\n\tc2.862,0,5.193,0.495,5.193,1.104C29.195,30.478,26.864,30.972,24.002,30.972z"}},{"tag":"path","attr":{"fill":"#1565C0","d":"M21.29,15l2.371,6.43L29.25,15h9.486c4.647,0,7.906,2.148,7.158,4.904c-0.745,2.756-5.178,4.904-9.803,4.904\r\n\th-6.295c0,0,0.141-0.043,0.172-0.126c0.246-0.944,1.707-6.264,1.725-6.347c0.02-0.102-0.105-0.133-0.105-0.133h4.572\r\n\tc0,0-0.088-0.006-0.125,0.133c-0.023,0.078-0.947,3.429-1.145,4.176c-0.023,0.094-0.162,0.139-0.162,0.139h1.094\r\n\tc2.594,0,5.047-0.828,5.563-2.748c0.473-1.752-1.244-2.746-4.039-2.746h-1.014l-4.375,0.004l-10.043,9.932l-3.845-9.754\r\n\tc0,0-0.036-0.066-0.065-0.147c-0.014-0.026-0.108-0.106-0.206-0.063c-0.065,0.036-0.074,0.117-0.066,0.146\r\n\tc0.036,0.066,0.042,0.08,0.048,0.111c0.569,0.93,0.467,2.009,0.33,2.52c-0.774,2.75-5.186,4.904-9.812,4.904H2.002\r\n\tc0,0,0.149-0.043,0.172-0.126c0.254-0.946,1.717-6.294,1.726-6.347c0.018-0.09-0.099-0.133-0.099-0.133h4.604\r\n\tc0,0-0.132,0.037-0.158,0.131c-0.024,0.078-0.954,3.432-1.151,4.178c-0.023,0.094-0.178,0.139-0.178,0.139h1.118\r\n\tc2.597,0,5.032-0.828,5.547-2.748c0.472-1.752-1.23-2.746-4.021-2.746H8.539h-4.45c0,0,0.125-0.059,0.147-0.139\r\n\tc0.123-0.443,0.497-1.834,0.515-1.899C4.771,15.047,4.646,15,4.646,15H21.29L21.29,15z"}}]})(props);
};
function FcEditImage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8CBCD6","d":"M31,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v17C44,35.2,38.2,41,31,41z"}},{"tag":"circle","attr":{"fill":"#B3DDF5","cx":"35","cy":"16","r":"3"}},{"tag":"polygon","attr":{"fill":"#9AC9E3","points":"20,16 9,32 31,32"}},{"tag":"polygon","attr":{"fill":"#B3DDF5","points":"31,22 23,32 39,32"}},{"tag":"path","attr":{"fill":"#E57373","d":"M47.7,29.1l-2.8-2.8c-0.4-0.4-1.1-0.4-1.6,0L42,27.6l4.4,4.4l1.3-1.3C48.1,30.3,48.1,29.6,47.7,29.1z"}},{"tag":"rect","attr":{"x":"27.1","y":"35.1","transform":"matrix(.707 -.707 .707 .707 -16.508 36.511)","fill":"#FF9800","width":"17.4","height":"6.2"}},{"tag":"rect","attr":{"x":"41.5","y":"27.8","transform":"matrix(-.707 .707 -.707 -.707 95.395 22.352)","fill":"#B0BEC5","width":"3.1","height":"6.2"}},{"tag":"polygon","attr":{"fill":"#FFC107","points":"27.5,42.2 26,48 31.8,46.5"}},{"tag":"polygon","attr":{"fill":"#37474F","points":"26.7,45 26,48 29,47.3"}}]})(props);
};
function FcElectricalSensor (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#B2EBF2","cx":"32","cy":"24","r":"9"}},{"tag":"path","attr":{"fill":"#4DD0E1","d":"M32,12c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12s12-5.4,12-12C44,17.4,38.6,12,32,12z M32,32 c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S36.4,32,32,32z"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"25.4,22 19.8,5.1 13.6,27.7 11.4,22 4,22 4,26 8.6,26 14.4,40.3 20.2,18.9 22.6,26 30,26 30,22"}},{"tag":"circle","attr":{"cx":"32","cy":"24","r":"4"}}]}]})(props);
};
function FcElectricalThreshold (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"3","y":"12","fill":"#80DEEA","width":"42","height":"24"}},{"tag":"rect","attr":{"x":"3","y":"23","fill":"#03A9F4","width":"42","height":"2"}},{"tag":"path","attr":{"fill":"none","stroke":"#3F51B5","strokeWidth":"4","strokeMiterlimit":"10","d":"M4,18l4.5-1.5c0.9-0.3,1.9,0.1,2.3,0.9l8.7,14.3 c0.7,1.2,2.4,1.3,3.2,0.2l2.3-2.8c0.5-0.6,1.4-0.9,2.2-0.6l3,1c1,0.3,2.1-0.2,2.5-1.1l4.3-10.1c0.5-1.1,1.9-1.6,2.9-0.9l4,2.7"}}]})(props);
};
function FcElectricity (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#00BCD4","d":"M33.7,5L22,17l15,5L21.3,36.7l5.1,2.8L12,43l2.7-14.8l2.9,5.1L27,24l-15-5L25,5H33.7z"}}]})(props);
};
function FcElectroDevices (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M39,43H9c-2.2,0-4-1.8-4-4V9c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v30C43,41.2,41.2,43,39,43z"}},{"tag":"path","attr":{"fill":"#80DEEA","d":"M33.2,5l-9.8,10.1L36,19.3L22.8,31.7l4.3,2.4L15,37l2.3-12.5l2.4,4.3l8-7.8L15,16.8L25.9,5H33.2z"}}]})(props);
};
function FcElectronics (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF9800","d":"M44,18v-4H34V4h-4v10h-4V4h-4v10h-4V4h-4v10H4v4h10v4H4v4h10v4H4v4h10v10h4V34h4v10h4V34h4v10h4V34h10v-4H34 v-4h10v-4H34v-4H44z"}},{"tag":"path","attr":{"fill":"#4CAF50","d":"M8,12v24c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V12c0-2.2-1.8-4-4-4H12C9.8,8,8,9.8,8,12z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M31,31H17c-1.1,0-2-0.9-2-2V19c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v10C33,30.1,32.1,31,31,31z"}}]})(props);
};
function FcEmptyBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#CFD8DC"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]}]})(props);
};
function FcEmptyFilter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"polygon","attr":{"points":"29,23 19,23 7,9 41,9"}},{"tag":"polygon","attr":{"points":"29,38 19,44 19,23 29,23"}},{"tag":"path","attr":{"d":"M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"}}]}]})(props);
};
function FcEmptyTrash (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#B39DDB","d":"M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"}},{"tag":"path","attr":{"fill":"#7E57C2","d":"M38,13H10c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v0C40,12.1,39.1,13,38,13z"}}]})(props);
};
function FcEndCall (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M43.5,16.8l-2.3-2.3c-8.1-7.9-27.5-6.8-34.5,0l-2.3,2.3c-0.6,0.6-0.6,1.6,0,2.3l4.6,4.5 c0.6,0.6,1.7,0.6,2.3,0l5.1-4.9L16,13.4c1.6-1.6,14.4-1.6,16,0l-0.3,5.5l4.9,4.7c0.6,0.6,1.7,0.6,2.3,0l4.6-4.5 C44.2,18.4,44.2,17.4,43.5,16.8z"}},{"tag":"g","attr":{"fill":"#B71C1C"},"child":[{"tag":"polygon","attr":{"points":"24,40.5 16,31 32,31"}},{"tag":"rect","attr":{"x":"21","y":"24","width":"6","height":"7.5"}}]}]})(props);
};
function FcEngineering (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#EF6C00","d":"M37.4,24.6l-11.6-2.2l-3.9-11.2l-3.8,1.3L22,23.6l-7.8,9l3,2.6l7.8-9l11.6,2.2L37.4,24.6z"}},{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"path","attr":{"d":"M24,19c-2.8,0-5,2.2-5,5c0,2.8,2.2,5,5,5s5-2.2,5-5C29,21.2,26.8,19,24,19z M24,26c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2s2,0.9,2,2C26,25.1,25.1,26,24,26z"}},{"tag":"path","attr":{"d":"M40.7,27c0.2-1,0.3-2,0.3-3c0-1-0.1-2-0.3-3l3.3-2.4c0.4-0.3,0.6-0.9,0.3-1.4L40,9.8 c-0.3-0.5-0.8-0.7-1.3-0.4L35,11c-1.5-1.3-3.3-2.3-5.2-3l-0.4-4.1c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9L18.2,8 c-1.9,0.7-3.7,1.7-5.2,3L9.3,9.3C8.8,9.1,8.2,9.3,8,9.8l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4L7.3,21C7.1,22,7,23,7,24 c0,1,0.1,2,0.3,3L4,29.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,38.2c0.3,0.5,0.8,0.7,1.3,0.4L13,37c1.5,1.3,3.3,2.3,5.2,3l0.4,4.1 c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.4-4.1c1.9-0.7,3.7-1.7,5.2-3l3.7,1.7c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4 c0.3-0.5,0.1-1.1-0.3-1.4L40.7,27z M24,35c-6.1,0-11-4.9-11-11c0-6.1,4.9-11,11-11s11,4.9,11,11C35,30.1,30.1,35,24,35z"}}]}]})(props);
};
function FcEnteringHeavenAlive (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"17","y":"29","fill":"#039BE5","width":"14","height":"2"}},{"tag":"rect","attr":{"x":"13","y":"33","fill":"#039BE5","width":"22","height":"2"}},{"tag":"rect","attr":{"x":"9","y":"37","fill":"#039BE5","width":"30","height":"2"}},{"tag":"rect","attr":{"x":"5","y":"41","fill":"#039BE5","width":"38","height":"2"}},{"tag":"path","attr":{"fill":"#81D4FA","d":"M35,13c-0.4,0-0.8,0-1.2,0.1C32.9,8.5,28.9,5,24,5c-4.1,0-7.6,2.5-9.2,6c-0.3,0-0.5,0-0.8,0 c-4.4,0-8,3.6-8,8s3.6,8,8,8c2.4,0,18.5,0,21,0c3.9,0,7-3.1,7-7C42,16.1,38.9,13,35,13z"}},{"tag":"path","attr":{"fill":"#039BE5","d":"M28,21c0-2.2-1.8-4-4-4s-4,1.8-4,4c0,0.5,0,6,0,6h8C28,27,28,21.5,28,21z"}}]})(props);
};
function FcExpand (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#2196F3","points":"43,17.1 39.9,14 24,29.9 8.1,14 5,17.1 24,36"}}]})(props);
};
function FcExpired (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#00ACC1","cx":"17","cy":"17","r":"14"}},{"tag":"circle","attr":{"fill":"#eee","cx":"17","cy":"17","r":"11"}},{"tag":"rect","attr":{"x":"16","y":"8","width":"2","height":"9"}},{"tag":"rect","attr":{"x":"18.2","y":"16","transform":"matrix(-.707 .707 -.707 -.707 46.834 19.399)","width":"2.4","height":"6.8"}},{"tag":"circle","attr":{"cx":"17","cy":"17","r":"2"}},{"tag":"circle","attr":{"fill":"#00ACC1","cx":"17","cy":"17","r":"1"}},{"tag":"path","attr":{"fill":"#FFC107","d":"M11.9,42l14.4-24.1c0.8-1.3,2.7-1.3,3.4,0L44.1,42c0.8,1.3-0.2,3-1.7,3H13.6C12.1,45,11.1,43.3,11.9,42z"}},{"tag":"path","attr":{"fill":"#263238","d":"M26.4,39.9c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.5s0.3-0.2,0.5-0.3s0.4-0.1,0.6-0.1s0.5,0,0.7,0.1 s0.4,0.2,0.5,0.3s0.2,0.3,0.3,0.5s0.1,0.4,0.1,0.6s0,0.4-0.1,0.6s-0.2,0.3-0.3,0.5s-0.3,0.2-0.5,0.3s-0.4,0.1-0.7,0.1 s-0.5,0-0.6-0.1s-0.4-0.2-0.5-0.3s-0.2-0.3-0.3-0.5S26.4,40.1,26.4,39.9z M29.2,36.8h-2.3L26.5,27h3L29.2,36.8z"}}]})(props);
};
function FcExport (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFCCBC","d":"M7,40V8c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H11C8.8,44,7,42.2,7,40z"}},{"tag":"g","attr":{"fill":"#FF5722"},"child":[{"tag":"polygon","attr":{"points":"42.7,24 32,33 32,15"}},{"tag":"rect","attr":{"x":"14","y":"21","width":"23","height":"6"}}]}]})(props);
};
function FcExternal (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#B2DFDB","cx":"24","cy":"31","r":"14"}},{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"polygon","attr":{"points":"24,3.3 33,14 15,14"}},{"tag":"rect","attr":{"x":"21","y":"11","width":"6","height":"23"}}]}]})(props);
};
function FcFactoryBreakdown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#E64A19","points":"29,23 29,17 21,21 21,23 17,23 17,27 13,27 13,23 5,23 5,43 33,43 33,23"}},{"tag":"rect","attr":{"x":"25","y":"27","fill":"#992B0A","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"9","y":"35","fill":"#992B0A","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"35","fill":"#992B0A","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"17","y":"35","fill":"#992B0A","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"17","y":"27","fill":"#992B0A","width":"4","height":"4"}},{"tag":"polygon","attr":{"fill":"#BF360C","points":"41.2,5 38,5 38,7 36,7 36,9 33.7,9 32,43 43,43"}}]})(props);
};
function FcFactory (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#BF360C","d":"M41.2,5h-7.3L32,43h11L41.2,5z"}},{"tag":"path","attr":{"fill":"#E64A19","d":"M33,23h-4v-6l-12,6v-6L5,23v20h28V23z"}},{"tag":"rect","attr":{"x":"9","y":"27","fill":"#FFC107","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"17","y":"27","fill":"#FFC107","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"27","fill":"#FFC107","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"9","y":"35","fill":"#FFC107","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"17","y":"35","fill":"#FFC107","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"25","y":"35","fill":"#FFC107","width":"4","height":"4"}}]})(props);
};
function FcFaq (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#558B2F","d":"M15,40h23l6,6V25c0-2.2-1.8-4-4-4H15c-2.2,0-4,1.8-4,4v11C11,38.2,12.8,40,15,40z"}},{"tag":"path","attr":{"fill":"#1B5E20","d":"M28.8,32.8h-3.6l-0.7,2.1h-2.2l3.7-10h1.9l3.7,10h-2.2L28.8,32.8z M25.7,31.2h2.5L27,27.4L25.7,31.2z"}},{"tag":"path","attr":{"fill":"#8BC34A","d":"M33,25H10l-6,6V8c0-2.2,1.8-4,4-4h25c2.2,0,4,1.8,4,4v13C37,23.2,35.2,25,33,25z"}},{"tag":"path","attr":{"fill":"#fff","d":"M25.4,14.2c0,1-0.2,1.8-0.5,2.5c-0.3,0.7-0.7,1.3-1.3,1.7l1.7,1.3L24,20.9l-2.2-1.7c-0.2,0-0.5,0.1-0.8,0.1 c-0.6,0-1.2-0.1-1.8-0.3c-0.5-0.2-1-0.6-1.4-1c-0.4-0.4-0.7-1-0.9-1.6c-0.2-0.6-0.3-1.3-0.3-2.1v-0.4c0-0.8,0.1-1.5,0.3-2.1 c0.2-0.6,0.5-1.2,0.9-1.6c0.4-0.4,0.8-0.8,1.4-1c0.5-0.2,1.1-0.3,1.8-0.3c0.6,0,1.2,0.1,1.8,0.3c0.5,0.2,1,0.6,1.4,1 c0.4,0.4,0.7,1,0.9,1.6c0.2,0.6,0.3,1.3,0.3,2.1V14.2z M23.2,13.7c0-1.1-0.2-1.9-0.6-2.4c-0.4-0.6-0.9-0.8-1.6-0.8 c-0.7,0-1.3,0.3-1.6,0.8c-0.4,0.6-0.6,1.4-0.6,2.4v0.5c0,0.5,0.1,1,0.2,1.4c0.1,0.4,0.2,0.8,0.4,1c0.2,0.3,0.4,0.5,0.7,0.6 c0.3,0.1,0.6,0.2,0.9,0.2c0.7,0,1.3-0.3,1.6-0.8c0.4-0.6,0.6-1.4,0.6-2.5V13.7z"}}]})(props);
};
function FcFeedIn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M38,24v12c0,1.1-0.9,2-2,2H12c-1.1,0-2-0.9-2-2V24c0-3.3-2.7-6-6-6h0v4h0c1.1,0,2,0.9,2,2v12 c0,3.3,2.7,6,6,6h24c3.3,0,6-2.7,6-6V24c0-1.1,0.9-2,2-2h0v-4h0C40.7,18,38,20.7,38,24z"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"38.6,5.6 29,15.2 29,28 33,28 33,16.8 41.4,8.4"}},{"tag":"polygon","attr":{"points":"6.6,8.4 15,16.8 15,28 19,28 19,15.2 9.4,5.6"}},{"tag":"polygon","attr":{"points":"37,27 31,33 25,27"}},{"tag":"polygon","attr":{"points":"23,27 17,33 11,27"}}]}]})(props);
};
function FcFeedback (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#78909C","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20.9c0-1.3,0.6-2.5,1.7-3.3L24,0l18.3,12.8c1.1,0.7,1.7,2,1.7,3.3V37 C44,39.2,42.2,41,40,41z"}},{"tag":"rect","attr":{"x":"12","y":"11","fill":"#fff","width":"24","height":"22"}},{"tag":"polygon","attr":{"fill":"#9C27B0","points":"24,13.6 18,21.4 30,21.4"}},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20l20,13l20-13v20C44,39.2,42.2,41,40,41z"}},{"tag":"polygon","attr":{"fill":"#9C27B0","points":"24,28 26,26.7 26,20 22,20 22,26.7"}}]})(props);
};
function FcFile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,45 8,45 8,3 30,3 40,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,14 29,14 29,4.5"}}]})(props);
};
function FcFilingCabinet (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"12","y":"44","fill":"#263238","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"32","y":"44","fill":"#263238","width":"4","height":"2"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M8,41V7c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H12C9.8,45,8,43.2,8,41z"}},{"tag":"path","attr":{"fill":"#B0BEC5","d":"M12,17V8c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1v9H12z"}},{"tag":"rect","attr":{"x":"12","y":"19","fill":"#B0BEC5","width":"24","height":"10"}},{"tag":"path","attr":{"fill":"#B0BEC5","d":"M12,40v-9h24v9c0,0.6-0.4,1-1,1H13C12.4,41,12,40.6,12,40z"}},{"tag":"rect","attr":{"x":"20","y":"11","fill":"#546E7A","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"23","fill":"#546E7A","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"35","fill":"#546E7A","width":"8","height":"2"}}]})(props);
};
function FcFilledFilter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#F57C00","points":"29,23 19,23 7,9 41,9"}},{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"polygon","attr":{"points":"29,38 19,44 19,23 29,23"}},{"tag":"path","attr":{"d":"M41.5,9h-35C5.7,9,5,8.3,5,7.5v0C5,6.7,5.7,6,6.5,6h35C42.3,6,43,6.7,43,7.5v0C43,8.3,42.3,9,41.5,9z"}}]}]})(props);
};
function FcFilmReel (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M43,39V24h-4v15c0,5,4,9,9,9v-4C45.2,44,43,41.8,43,39z"}},{"tag":"circle","attr":{"fill":"#90A4AE","cx":"24","cy":"24","r":"19"}},{"tag":"circle","attr":{"fill":"#37474F","cx":"24","cy":"24","r":"2"}},{"tag":"g","attr":{"fill":"#253278"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"14","r":"5"}},{"tag":"circle","attr":{"cx":"24","cy":"34","r":"5"}},{"tag":"circle","attr":{"cx":"34","cy":"24","r":"5"}},{"tag":"circle","attr":{"cx":"14","cy":"24","r":"5"}}]}]})(props);
};
function FcFilm (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M45,9H3v30h42V9z M22,37v-4h4v4H22z M30,37v-4h4v4H30z M38,37v-4h4v4H38z M14,37v-4h4v4H14z M6,37v-4h4v4H6 z M22,15v-4h4v4H22z M30,15v-4h4v4H30z M38,15v-4h4v4H38z M14,15v-4h4v4H14z M6,15v-4h4v4H6z"}}]})(props);
};
function FcFinePrint (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"33,42 5,42 5,4 24,4 33,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"31.5,14 23,14 23,5.5"}},{"tag":"rect","attr":{"x":"38.3","y":"34.8","transform":"matrix(.707 -.707 .707 .707 -17.177 40.055)","fill":"#616161","width":"2.8","height":"12"}},{"tag":"circle","attr":{"fill":"#616161","cx":"28","cy":"29","r":"11"}},{"tag":"circle","attr":{"fill":"#90CAF9","cx":"28","cy":"29","r":"9"}},{"tag":"rect","attr":{"x":"39.5","y":"37.6","transform":"matrix(.707 -.707 .707 .707 -17.661 41.223)","fill":"#37474F","width":"2.8","height":"8.7"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"path","attr":{"d":"M30,31h-9.7c0.4,1.6,1.3,3,2.5,4H30V31z"}},{"tag":"path","attr":{"d":"M20.3,27H30v-4h-7.3C21.5,24,20.7,25.4,20.3,27z"}},{"tag":"path","attr":{"d":"M20.1,20H11v2h7.3C18.8,21.3,19.4,20.6,20.1,20z"}},{"tag":"path","attr":{"d":"M17.1,24H11v2h5.4C16.6,25.3,16.8,24.6,17.1,24z"}},{"tag":"path","attr":{"d":"M16,29c0-0.3,0-0.7,0.1-1H11v2h5.1C16,29.7,16,29.3,16,29z"}},{"tag":"path","attr":{"d":"M16.4,32H11v2h6.1C16.8,33.4,16.6,32.7,16.4,32z"}}]}]})(props);
};
function FcFlashAuto (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FFC107","points":"33,22 23.6,22 30,5 19,5 13,26 21.6,26 17,45"}},{"tag":"path","attr":{"fill":"#F44336","d":"M40.8,14.5h-4.3L35.6,17H33l4.5-12h2.3l4.5,12h-2.6L40.8,14.5z M37.1,12.5h3L38.6,8L37.1,12.5z"}}]})(props);
};
function FcFlashOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FFC107","points":"33,22 23.6,22 30,5 19,5 13,26 21.6,26 17,45"}},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}}]})(props);
};
function FcFlashOn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FFC107","points":"33,22 23.6,22 30,5 19,5 13,26 21.6,26 17,45"}}]})(props);
};
function FcFlowChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#CFD8DC","points":"35,36 39,36 39,22 26,22 26,13 22,13 22,22 9,22 9,36 13,36 13,26 22,26 22,36 26,36 26,26 35,26"}},{"tag":"rect","attr":{"x":"17","y":"6","fill":"#3F51B5","width":"14","height":"10"}},{"tag":"rect","attr":{"x":"32","y":"32","fill":"#00BCD4","width":"10","height":"10"}},{"tag":"rect","attr":{"x":"6","y":"32","fill":"#00BCD4","width":"10","height":"10"}},{"tag":"rect","attr":{"x":"19","y":"32","fill":"#00BCD4","width":"10","height":"10"}}]})(props);
};
function FcFolder (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFA000","d":"M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"}},{"tag":"path","attr":{"fill":"#FFCA28","d":"M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"}}]})(props);
};
function FcFrame (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3949AB","d":"M40.6,40.1h-1.4c-0.2,0-0.3,0-0.5,0l-3.1-0.4c-2.4-0.3-4.9-0.2-7.3,0.4l-3.6,0.9c-0.5,0.1-1.1,0.1-1.6,0 L19.6,40c-2.4-0.6-4.8-0.7-7.3-0.4l-3.1,0.4c-0.2,0-0.3,0-0.5,0H7.4c-1.9,0-3.4-1.5-3.4-3.4v0c0-0.4,0.1-0.9,0.2-1.3l0.2-0.6 c1-2.5,1.1-5.3,0.4-7.9l-0.6-2c-0.2-0.7-0.2-1.3,0-2l0.3-0.8c0.9-2.7,0.8-5.7-0.2-8.4l-0.1-0.3C4.1,13.1,4,12.7,4,12.3v-1 c0-1.9,1.5-3.4,3.4-3.4l1.4,0c0.2,0,0.3,0,0.5,0l3.1,0.4c2.4,0.3,4.9,0.2,7.3-0.4l3.6-0.9c0.5-0.1,1.1-0.1,1.6,0L28.4,8 c2.4,0.6,4.8,0.7,7.3,0.4l3.1-0.4c0.2,0,0.3,0,0.5,0l1.4,0c1.9,0,3.4,1.5,3.4,3.4v1c0,0.4-0.1,0.9-0.2,1.3l-0.1,0.3 c-1.1,2.7-1.2,5.6-0.2,8.4l0.3,0.8c0.2,0.6,0.2,1.3,0,2l-0.6,2c-0.7,2.6-0.6,5.4,0.4,7.9l0.2,0.6c0.2,0.4,0.2,0.8,0.2,1.3v0 C44,38.6,42.5,40.1,40.6,40.1z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M38,36H10c-0.6,0-1-0.4-1-1V13c0-0.6,0.4-1,1-1h28c0.6,0,1,0.4,1,1v22C39,35.6,38.6,36,38,36z"}}]})(props);
};
function FcFullBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#8BC34A"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]}]})(props);
};
function FcFullTrash (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FF8A65","points":"24,21.3 12.7,10 26,1.7 38.3,10"}},{"tag":"polygon","attr":{"fill":"#FFAB91","points":"24,21.3 12.7,10 17,4.7 38.3,10"}},{"tag":"path","attr":{"fill":"#B39DDB","d":"M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"}},{"tag":"path","attr":{"fill":"#7E57C2","d":"M38,13H10c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v0C40,12.1,39.1,13,38,13z"}}]})(props);
};
function FcGallery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E65100","d":"M41,42H13c-2.2,0-4-1.8-4-4V18c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v20C45,40.2,43.2,42,41,42z"}},{"tag":"path","attr":{"fill":"#F57C00","d":"M35,36H7c-2.2,0-4-1.8-4-4V12c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v20C39,34.2,37.2,36,35,36z"}},{"tag":"circle","attr":{"fill":"#FFF9C4","cx":"30","cy":"16","r":"3"}},{"tag":"polygon","attr":{"fill":"#942A09","points":"17,17.9 8,31 26,31"}},{"tag":"polygon","attr":{"fill":"#BF360C","points":"28,23.5 22,31 34,31"}}]})(props);
};
function FcGenealogy (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#CFD8DC","points":"40,9 40,7 31,7 31,12 24,12 15,12 15,23 8,23 8,25 15,25 15,36 24,36 31,36 31,41 40,41 40,39 33,39 33,31 40,31 40,29 31,29 31,34 24,34 17,34 17,14 24,14 31,14 31,19 40,19 40,17 33,17 33,9"}},{"tag":"rect","attr":{"x":"4","y":"20","fill":"#00BCD4","width":"8","height":"8"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"rect","attr":{"x":"36","y":"14","width":"8","height":"8"}},{"tag":"rect","attr":{"x":"36","y":"4","width":"8","height":"8"}},{"tag":"rect","attr":{"x":"20","y":"9","width":"8","height":"8"}},{"tag":"rect","attr":{"x":"20","y":"31","width":"8","height":"8"}},{"tag":"rect","attr":{"x":"36","y":"36","width":"8","height":"8"}},{"tag":"rect","attr":{"x":"36","y":"26","width":"8","height":"8"}}]}]})(props);
};
function FcGenericSortingAsc (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"6","y":"6","fill":"#2196F3","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"14","fill":"#2196F3","width":"12","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"22","fill":"#2196F3","width":"20","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"30","fill":"#2196F3","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"38","fill":"#2196F3","width":"36","height":"4"}}]})(props);
};
function FcGenericSortingDesc (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"6","y":"38","fill":"#2196F3","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"30","fill":"#2196F3","width":"12","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"22","fill":"#2196F3","width":"20","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"14","fill":"#2196F3","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"6","fill":"#2196F3","width":"36","height":"4"}}]})(props);
};
function FcGlobe (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#7CB342","d":"M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"}},{"tag":"path","attr":{"fill":"#0277BD","d":"M45,24c0,11.7-9.5,21-21,21S3,35.7,3,24S12.3,3,24,3S45,12.3,45,24z M23.8,33.7c0-0.4-0.2-0.6-0.6-0.8 c-1.3-0.4-2.5-0.4-3.6-1.5c-0.2-0.4-0.2-0.8-0.4-1.3c-0.4-0.4-1.5-0.6-2.1-0.8c-0.8,0-1.7,0-2.7,0c-0.4,0-1.1,0-1.5,0 c-0.6-0.2-1.1-1.1-1.5-1.7c0-0.2,0-0.6-0.4-0.6c-0.4-0.2-0.8,0.2-1.3,0c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.6,0.4-1.3,0.8-1.7 c0.6-0.4,1.3,0.2,1.9,0.2c0.2,0,0.2,0,0.4,0.2c0.6,0.2,0.8,1,0.8,1.7c0,0.2,0,0.4,0,0.4c0,0.2,0.2,0.2,0.4,0.2 c0.2-1.1,0.2-2.1,0.4-3.2c0-1.3,1.3-2.5,2.3-2.9c0.4-0.2,0.6,0.2,1.1,0c1.3-0.4,4.4-1.7,3.8-3.4c-0.4-1.5-1.7-2.9-3.4-2.7 c-0.4,0.2-0.6,0.4-1,0.6c-0.6,0.4-1.9,1.7-2.5,1.7c-1.1-0.2-1.1-1.7-0.8-2.3c0.2-0.8,2.1-3.6,3.4-3.1c0.2,0.2,0.6,0.6,0.8,0.8 c0.4,0.2,1.1,0.2,1.7,0.2c0.2,0,0.4,0,0.6-0.2c0.2-0.2,0.2-0.2,0.2-0.4c0-0.6-0.6-1.3-1-1.7c-0.4-0.4-1.1-0.8-1.7-1.1 c-2.1-0.6-5.5,0.2-7.1,1.7s-2.9,4-3.8,6.1c-0.4,1.3-0.8,2.9-1,4.4c-0.2,1-0.4,1.9,0.2,2.9c0.6,1.3,1.9,2.5,3.2,3.4 c0.8,0.6,2.5,0.6,3.4,1.7c0.6,0.8,0.4,1.9,0.4,2.9c0,1.3,0.8,2.3,1.3,3.4c0.2,0.6,0.4,1.5,0.6,2.1c0,0.2,0.2,1.5,0.2,1.7 c1.3,0.6,2.3,1.3,3.8,1.7c0.2,0,1-1.3,1-1.5c0.6-0.6,1.1-1.5,1.7-1.9c0.4-0.2,0.8-0.4,1.3-0.8c0.4-0.4,0.6-1.3,0.8-1.9 C23.8,35.1,24,34.3,23.8,33.7z M24.2,14.3c0.2,0,0.4-0.2,0.8-0.4c0.6-0.4,1.3-1.1,1.9-1.5c0.6-0.4,1.3-1.1,1.7-1.5 c0.6-0.4,1.1-1.3,1.3-1.9c0.2-0.4,0.8-1.3,0.6-1.9c-0.2-0.4-1.3-0.6-1.7-0.8c-1.7-0.4-3.1-0.6-4.8-0.6c-0.6,0-1.5,0.2-1.7,0.8 c-0.2,1.1,0.6,0.8,1.5,1.1c0,0,0.2,1.7,0.2,1.9c0.2,1-0.4,1.7-0.4,2.7c0,0.6,0,1.7,0.4,2.1L24.2,14.3z M41.8,29 c0.2-0.4,0.2-1.1,0.4-1.5c0.2-1,0.2-2.1,0.2-3.1c0-2.1-0.2-4.2-0.8-6.1c-0.4-0.6-0.6-1.3-0.8-1.9c-0.4-1.1-1-2.1-1.9-2.9 c-0.8-1.1-1.9-4-3.8-3.1c-0.6,0.2-1,1-1.5,1.5c-0.4,0.6-0.8,1.3-1.3,1.9c-0.2,0.2-0.4,0.6-0.2,0.8c0,0.2,0.2,0.2,0.4,0.2 c0.4,0.2,0.6,0.2,1,0.4c0.2,0,0.4,0.2,0.2,0.4c0,0,0,0.2-0.2,0.2c-1,1.1-2.1,1.9-3.1,2.9c-0.2,0.2-0.4,0.6-0.4,0.8 c0,0.2,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.4,0.4c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.4,0,1.1-0.2,1.5c-0.2,1.1-0.8,1.9-1.3,2.9 c-0.4,0.6-0.6,1.3-1,1.9c0,0.8-0.2,1.5,0.2,2.1c1,1.5,2.9,0.6,4.4,1.3c0.4,0.2,0.8,0.2,1.1,0.6c0.6,0.6,0.6,1.7,0.8,2.3 c0.2,0.8,0.4,1.7,0.8,2.5c0.2,1,0.6,2.1,0.8,2.9c1.9-1.5,3.6-3.1,4.8-5.2C40.6,32.4,41.2,30.7,41.8,29z"}}]})(props);
};
function FcGoodDecision (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"g","attr":{"fill":"#4CAF50"},"child":[{"tag":"rect","attr":{"x":"22","y":"16","width":"4","height":"18"}},{"tag":"rect","attr":{"x":"15","y":"23","width":"18","height":"4"}}]}]})(props);
};
function FcGoogle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFC107","d":"M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12\r\n\tc0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24\r\n\tc0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"}},{"tag":"path","attr":{"fill":"#FF3D00","d":"M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657\r\n\tC34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"}},{"tag":"path","attr":{"fill":"#4CAF50","d":"M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36\r\n\tc-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"}},{"tag":"path","attr":{"fill":"#1976D2","d":"M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571\r\n\tc0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"}}]})(props);
};
function FcGraduationCap (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"rect","attr":{"x":"9","y":"20","width":"30","height":"13"}},{"tag":"ellipse","attr":{"cx":"24","cy":"33","rx":"15","ry":"6"}}]},{"tag":"path","attr":{"fill":"#78909C","d":"M23.1,8.2L0.6,18.1c-0.8,0.4-0.8,1.5,0,1.9l22.5,9.9c0.6,0.2,1.2,0.2,1.8,0l22.5-9.9c0.8-0.4,0.8-1.5,0-1.9 L24.9,8.2C24.3,7.9,23.7,7.9,23.1,8.2z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"path","attr":{"d":"M43.2,20.4l-20-3.4c-0.5-0.1-1.1,0.3-1.2,0.8c-0.1,0.5,0.3,1.1,0.8,1.2L42,22.2V37c0,0.6,0.4,1,1,1 s1-0.4,1-1V21.4C44,20.9,43.6,20.5,43.2,20.4z"}},{"tag":"circle","attr":{"cx":"43","cy":"37","r":"2"}},{"tag":"path","attr":{"d":"M46,40c0,1.7-3,6-3,6s-3-4.3-3-6s1.3-3,3-3S46,38.3,46,40z"}}]}]})(props);
};
function FcGrid (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M7,7v34h34V7H7z M39,15h-6V9h6V15z M25,15V9h6v6H25z M31,17v6h-6v-6H31z M23,15h-6V9h6V15z M23,17v6h-6v-6 H23z M15,23H9v-6h6V23z M15,25v6H9v-6H15z M17,25h6v6h-6V25z M23,33v6h-6v-6H23z M25,33h6v6h-6V33z M25,31v-6h6v6H25z M33,25h6v6h-6 V25z M33,23v-6h6v6H33z M15,9v6H9V9H15z M9,33h6v6H9V33z M33,39v-6h6v6H33z"}}]})(props);
};
function FcHeadset (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#0097A7","d":"M24,5C14.1,5,6,13.1,6,23v15h4V23c0-7.7,6.3-14,14-14s14,6.3,14,14v15h4V23C42,13.1,33.9,5,24,5z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M38,43h-4V31h4c2.2,0,4,1.8,4,4v4C42,41.2,40.2,43,38,43z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M10,43h4V31h-4c-2.2,0-4,1.8-4,4v4C6,41.2,7.8,43,10,43z"}}]})(props);
};
function FcHeatMap (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#CFD8DC","points":"9,39 9,6 7,6 7,41 42,41 42,39"}},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"circle","attr":{"cx":"14","cy":"11","r":"2"}},{"tag":"circle","attr":{"cx":"32","cy":"11","r":"2"}},{"tag":"circle","attr":{"cx":"39","cy":"11","r":"2"}},{"tag":"circle","attr":{"cx":"23","cy":"11","r":"4"}},{"tag":"circle","attr":{"cx":"14","cy":"33","r":"2"}},{"tag":"circle","attr":{"cx":"30","cy":"33","r":"2"}},{"tag":"circle","attr":{"cx":"22","cy":"33","r":"3"}},{"tag":"circle","attr":{"cx":"38","cy":"33","r":"4"}},{"tag":"circle","attr":{"cx":"14","cy":"22","r":"2"}},{"tag":"circle","attr":{"cx":"39","cy":"22","r":"2"}},{"tag":"circle","attr":{"cx":"32","cy":"22","r":"3"}}]}]})(props);
};
function FcHighBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#CFD8DC"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]},{"tag":"path","attr":{"fill":"#8BC34A","d":"M34,44H14c-1.1,0-2-0.9-2-2V13h24v29C36,43.1,35.1,44,34,44z"}}]})(props);
};
function FcHighPriority (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18 C25.3,46.4,22.7,46.4,21.2,44.8z"}},{"tag":"path","attr":{"fill":"#fff","d":"M21.6,32.7c0-0.3,0.1-0.6,0.2-0.9c0.1-0.3,0.3-0.5,0.5-0.7c0.2-0.2,0.5-0.4,0.8-0.5s0.6-0.2,1-0.2 s0.7,0.1,1,0.2c0.3,0.1,0.6,0.3,0.8,0.5c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.6,0.2,0.9s-0.1,0.6-0.2,0.9s-0.3,0.5-0.5,0.7 c-0.2,0.2-0.5,0.4-0.8,0.5c-0.3,0.1-0.6,0.2-1,0.2s-0.7-0.1-1-0.2s-0.5-0.3-0.8-0.5c-0.2-0.2-0.4-0.4-0.5-0.7S21.6,33.1,21.6,32.7z M25.8,28.1h-3.6L21.7,13h4.6L25.8,28.1z"}}]})(props);
};
function FcHome (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#E8EAF6","points":"42,39 6,39 6,23 24,6 42,23"}},{"tag":"g","attr":{"fill":"#C5CAE9"},"child":[{"tag":"polygon","attr":{"points":"39,21 34,16 34,9 39,9"}},{"tag":"rect","attr":{"x":"6","y":"39","width":"36","height":"5"}}]},{"tag":"polygon","attr":{"fill":"#B71C1C","points":"24,4.3 4,22.9 6,25.1 24,8.4 42,25.1 44,22.9"}},{"tag":"rect","attr":{"x":"18","y":"28","fill":"#D84315","width":"12","height":"16"}},{"tag":"rect","attr":{"x":"21","y":"17","fill":"#01579B","width":"6","height":"6"}},{"tag":"path","attr":{"fill":"#FF8A65","d":"M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"}}]})(props);
};
function FcIcons8Cup (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M40,14H8l3.8,28.3c0.1,1,1,1.7,2,1.7h20.5c1,0,1.8-0.7,2-1.7L40,14z"}},{"tag":"g","attr":{"fill":"#81C784"},"child":[{"tag":"path","attr":{"d":"M42,14H6v-3c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4V14z"}},{"tag":"path","attr":{"d":"M37.2,10H10.8l1.7-4.7c0.3-0.8,1-1.3,1.9-1.3h19.2c0.8,0,1.6,0.5,1.9,1.3L37.2,10z"}}]},{"tag":"path","attr":{"fill":"#E8F5E9","d":"M28,28.5c1.2-1.1,2-2.7,2-4.5c0-3.3-2.7-6-6-6c-3.3,0-6,2.7-6,6c0,1.8,0.8,3.4,2,4.5c-1.2,1.1-2,2.7-2,4.5 c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6C30,31.2,29.2,29.6,28,28.5z M24,36c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3 C27,34.7,25.7,36,24,36z M24,27c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3C27,25.7,25.7,27,24,27z"}}]})(props);
};
function FcIdea (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#FFF59D","cx":"24","cy":"22","r":"20"}},{"tag":"path","attr":{"fill":"#FBC02D","d":"M37,22c0-7.7-6.6-13.8-14.5-12.9c-6,0.7-10.8,5.5-11.4,11.5c-0.5,4.6,1.4,8.7,4.6,11.3 c1.4,1.2,2.3,2.9,2.3,4.8V37h12v-0.1c0-1.8,0.8-3.6,2.2-4.8C35.1,29.7,37,26.1,37,22z"}},{"tag":"path","attr":{"fill":"#FFF59D","d":"M30.6,20.2l-3-2c-0.3-0.2-0.8-0.2-1.1,0L24,19.8l-2.4-1.6c-0.3-0.2-0.8-0.2-1.1,0l-3,2 c-0.2,0.2-0.4,0.4-0.4,0.7s0,0.6,0.2,0.8l3.8,4.7V37h2V26c0-0.2-0.1-0.4-0.2-0.6l-3.3-4.1l1.5-1l2.4,1.6c0.3,0.2,0.8,0.2,1.1,0 l2.4-1.6l1.5,1l-3.3,4.1C25.1,25.6,25,25.8,25,26v11h2V26.4l3.8-4.7c0.2-0.2,0.3-0.5,0.2-0.8S30.8,20.3,30.6,20.2z"}},{"tag":"circle","attr":{"fill":"#5C6BC0","cx":"24","cy":"44","r":"3"}},{"tag":"path","attr":{"fill":"#9FA8DA","d":"M26,45h-4c-2.2,0-4-1.8-4-4v-5h12v5C30,43.2,28.2,45,26,45z"}},{"tag":"g","attr":{"fill":"#5C6BC0"},"child":[{"tag":"path","attr":{"d":"M30,41l-11.6,1.6c0.3,0.7,0.9,1.4,1.6,1.8l9.4-1.3C29.8,42.5,30,41.8,30,41z"}},{"tag":"polygon","attr":{"points":"18,38.7 18,40.7 30,39 30,37"}}]}]})(props);
};
function FcImageFile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,45 8,45 8,3 30,3 40,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,14 29,14 29,4.5"}},{"tag":"polygon","attr":{"fill":"#1565C0","points":"21,23 14,33 28,33"}},{"tag":"polygon","attr":{"fill":"#1976D2","points":"28,26.4 23,33 33,33"}},{"tag":"circle","attr":{"fill":"#1976D2","cx":"31.5","cy":"24.5","r":"1.5"}}]})(props);
};
function FcImport (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F8BBD0","d":"M7,40V8c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H11C8.8,44,7,42.2,7,40z"}},{"tag":"g","attr":{"fill":"#E91E63"},"child":[{"tag":"polygon","attr":{"points":"13.3,24 24,15 24,33"}},{"tag":"rect","attr":{"x":"19","y":"21","width":"23","height":"6"}}]}]})(props);
};
function FcInTransit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFC107","d":"M44,36H30V16c0-1.1,0.9-2,2-2h8c0.6,0,1.2,0.3,1.6,0.8l6,7.7c0.3,0.4,0.4,0.8,0.4,1.2V32 C48,34.2,46.2,36,44,36z"}},{"tag":"g","attr":{"fill":"#9575CD"},"child":[{"tag":"path","attr":{"d":"M8,36h22V13c0-2.2-1.8-4-4-4H4v23C4,34.2,5.8,36,8,36z"}},{"tag":"rect","attr":{"y":"9","width":"10","height":"2"}},{"tag":"rect","attr":{"y":"14","width":"10","height":"2"}},{"tag":"rect","attr":{"y":"19","width":"10","height":"2"}},{"tag":"rect","attr":{"y":"24","width":"10","height":"2"}}]},{"tag":"g","attr":{"fill":"#7E57C2"},"child":[{"tag":"rect","attr":{"x":"4","y":"11","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"4","y":"16","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"4","y":"21","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"4","y":"26","width":"4","height":"2"}}]},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"39","cy":"36","r":"5"}},{"tag":"circle","attr":{"cx":"16","cy":"36","r":"5"}}]},{"tag":"g","attr":{"fill":"#78909C"},"child":[{"tag":"circle","attr":{"cx":"39","cy":"36","r":"2.5"}},{"tag":"circle","attr":{"cx":"16","cy":"36","r":"2.5"}}]},{"tag":"path","attr":{"fill":"#455A64","d":"M44,26h-3.6c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.2-0.2-0.4-0.3-0.7-0.3H34c-0.6,0-1-0.4-1-1v-6 c0-0.6,0.4-1,1-1h5.5c0.3,0,0.6,0.1,0.8,0.4l4.5,5.4c0.1,0.2,0.2,0.4,0.2,0.6V25C45,25.6,44.6,26,44,26z"}}]})(props);
};
function FcInfo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#2196F3","cx":"24","cy":"24","r":"21"}},{"tag":"rect","attr":{"x":"22","y":"22","fill":"#fff","width":"4","height":"11"}},{"tag":"circle","attr":{"fill":"#fff","cx":"24","cy":"16.5","r":"2.5"}}]})(props);
};
function FcInspection (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"}},{"tag":"path","attr":{"fill":"#fff","d":"M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"}},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"path","attr":{"d":"M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z"}},{"tag":"path","attr":{"d":"M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z"}}]},{"tag":"polygon","attr":{"fill":"#4CAF50","points":"30.6,18.6 21.6,27.6 17.4,23.3 14.9,25.8 21.7,32.5 33.1,21.1"}}]})(props);
};
function FcIntegratedWebcam (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#607D8B","d":"M38,42H10c-2.2,0-4-1.8-4-4V10c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v28C42,40.2,40.2,42,38,42z"}},{"tag":"circle","attr":{"fill":"#455A64","cx":"24","cy":"24","r":"12"}},{"tag":"circle","attr":{"fill":"#42A5F5","cx":"24","cy":"24","r":"9"}},{"tag":"path","attr":{"fill":"#90CAF9","d":"M28.8,21c-1.2-1.4-3-2.2-4.8-2.2s-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.2,22.4,29.3,21.5,28.8,21z"}}]})(props);
};
function FcInternal (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#B3E5FC","cx":"24","cy":"30","r":"15"}},{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"polygon","attr":{"points":"24,38.7 15,28 33,28"}},{"tag":"rect","attr":{"x":"21","y":"5","width":"6","height":"26"}}]}]})(props);
};
function FcInvite (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#78909C","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20.9c0-1.3,0.6-2.5,1.7-3.3L24,0l18.3,12.8c1.1,0.7,1.7,2,1.7,3.3V37 C44,39.2,42.2,41,40,41z"}},{"tag":"rect","attr":{"x":"12","y":"11","fill":"#fff","width":"24","height":"22"}},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20l20,13l20-13v20C44,39.2,42.2,41,40,41z"}},{"tag":"g","attr":{"fill":"#4CAF50"},"child":[{"tag":"rect","attr":{"x":"22","y":"14","width":"4","height":"12"}},{"tag":"rect","attr":{"x":"18","y":"18","width":"12","height":"4"}}]}]})(props);
};
function FcIpad (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E38939","d":"M8,41V7c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H12C9.8,45,8,43.2,8,41z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M36,6H12c-0.6,0-1,0.4-1,1v31c0,0.6,0.4,1,1,1h24c0.6,0,1-0.4,1-1V7C37,6.4,36.6,6,36,6z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"24","cy":"42","r":"1.5"}}]})(props);
};
function FcIphone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E38939","d":"M12,40V8c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M32,7H16c-0.6,0-1,0.4-1,1v29c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1V8C33,7.4,32.6,7,32,7z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"24","cy":"41","r":"1.5"}}]})(props);
};
function FcKey (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"polygon","attr":{"points":"30,41 26,45 22,45 18,41 18,21 30,21 30,29 28,31 30,33 30,35 28,37 30,39"}},{"tag":"path","attr":{"d":"M38,7.8C37.5,6,36,4.7,34.3,4.2C31.9,3.7,28.2,3,24,3s-7.9,0.7-10.3,1.2C12,4.7,10.5,6,10,7.8 c-0.5,1.7-1,4.1-1,6.7c0,2.6,0.5,5,1,6.7c0.5,1.8,1.9,3.1,3.7,3.5C16.1,25.3,19.8,26,24,26s7.9-0.7,10.3-1.2 c1.8-0.4,3.2-1.8,3.7-3.5c0.5-1.7,1-4.1,1-6.7C39,11.9,38.5,9.5,38,7.8z M29,13H19c-1.1,0-2-0.9-2-2V9c0-0.6,3.1-1,7-1s7,0.4,7,1v2 C31,12.1,30.1,13,29,13z"}}]},{"tag":"rect","attr":{"x":"23","y":"26","fill":"#D68600","width":"2","height":"19"}}]})(props);
};
function FcKindle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M8,41V7c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H12C9.8,45,8,43.2,8,41z"}},{"tag":"path","attr":{"fill":"#eee","d":"M35,6H13c-0.6,0-1,0.4-1,1v29c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V7C36,6.4,35.6,6,35,6z"}},{"tag":"rect","attr":{"x":"20","y":"40","fill":"#546E7A","width":"8","height":"2"}},{"tag":"g","attr":{"fill":"#A1A1A1"},"child":[{"tag":"rect","attr":{"x":"16","y":"11","width":"16","height":"3"}},{"tag":"rect","attr":{"x":"16","y":"18","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"22","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"26","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"30","width":"12","height":"2"}}]}]})(props);
};
function FcLandscape (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"rect","attr":{"x":"36.1","y":"8.1","transform":"matrix(.707 .707 -.707 .707 21.201 -25.184)","width":"9.9","height":"9.9"}},{"tag":"rect","attr":{"x":"36","y":"8","width":"10","height":"10"}}]},{"tag":"circle","attr":{"fill":"#FFEB3B","cx":"41","cy":"13","r":"3"}},{"tag":"polygon","attr":{"fill":"#2E7D32","points":"16.5,18 0,42 33,42"}},{"tag":"polygon","attr":{"fill":"#4CAF50","points":"33.6,24 19.2,42 48,42"}}]})(props);
};
function FcLeave (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFCDD2","d":"M5,38V14h38v24c0,2.2-1.8,4-4,4H9C6.8,42,5,40.2,5,38z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M43,10v6H5v-6c0-2.2,1.8-4,4-4h30C41.2,6,43,7.8,43,10z"}},{"tag":"g","attr":{"fill":"#B71C1C"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"10","r":"3"}},{"tag":"circle","attr":{"cx":"15","cy":"10","r":"3"}}]},{"tag":"g","attr":{"fill":"#BDBDBD"},"child":[{"tag":"path","attr":{"d":"M33,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C35,3.9,34.1,3,33,3z"}},{"tag":"path","attr":{"d":"M15,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C17,3.9,16.1,3,15,3z"}}]},{"tag":"path","attr":{"fill":"#F44336","d":"M22.2,35.3c0-0.2,0-0.5,0.1-0.7c0.1-0.2,0.2-0.4,0.4-0.5s0.3-0.3,0.5-0.3c0.2-0.1,0.5-0.1,0.7-0.1 s0.5,0,0.7,0.1c0.2,0.1,0.4,0.2,0.6,0.3s0.3,0.3,0.4,0.5c0.1,0.2,0.1,0.4,0.1,0.7c0,0.2,0,0.5-0.1,0.7c-0.1,0.2-0.2,0.4-0.4,0.5 c-0.2,0.1-0.3,0.3-0.6,0.3S24.3,37,24,37s-0.5,0-0.7-0.1c-0.2-0.1-0.4-0.2-0.5-0.3c-0.2-0.1-0.3-0.3-0.4-0.5 C22.3,35.8,22.2,35.6,22.2,35.3z M25.3,31h-2.6l-0.4-11h3.3L25.3,31z"}}]})(props);
};
function FcLeftDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"7,41 7,23 25,41"}},{"tag":"rect","attr":{"x":"22.6","y":"5","transform":"matrix(.707 .707 -.707 .707 22.912 -12.567)","fill":"#3F51B5","width":"8","height":"32.7"}}]})(props);
};
function FcLeftDown2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"19,44 30.7,30 7.3,30"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M27,6h13v8H27c-2.2,0-4,1.8-4,4v17h-8V18C15,11.4,20.4,6,27,6z"}}]})(props);
};
function FcLeftUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"7,7 25,7 7,25"}},{"tag":"rect","attr":{"x":"22.6","y":"10.3","transform":"matrix(-.707 .707 -.707 -.707 64.28 26.626)","fill":"#3F51B5","width":"8","height":"32.7"}}]})(props);
};
function FcLeftUp2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"19,4 30.7,18 7.3,18"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M27,42h13v-8H27c-2.2,0-4-1.8-4-4V13h-8v17C15,36.6,20.4,42,27,42z"}}]})(props);
};
function FcLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"4,24 18,12.3 18,35.7"}},{"tag":"rect","attr":{"x":"15","y":"20","width":"27","height":"8"}}]}]})(props);
};
function FcLibrary (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"rect","attr":{"x":"1","y":"38","width":"46","height":"2"}},{"tag":"rect","attr":{"x":"25","y":"18","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"31","y":"18","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"37","y":"18","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"19","y":"18","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"13","y":"18","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"7","y":"18","width":"4","height":"16"}},{"tag":"polygon","attr":{"points":"43,16 5,16 5,13 24,4 43,13"}},{"tag":"rect","attr":{"x":"5","y":"34","width":"38","height":"2"}}]},{"tag":"g","attr":{"fill":"#EF6C00"},"child":[{"tag":"rect","attr":{"x":"25","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"31","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"37","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"19","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"13","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"7","y":"16","width":"4","height":"2"}},{"tag":"rect","attr":{"x":"3","y":"36","width":"42","height":"2"}},{"tag":"circle","attr":{"cx":"24","cy":"11","r":"2"}}]}]})(props);
};
function FcLightAtTheEndOfTunnel (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M6,10v28c0,2.2,1.8,4,4,4h28c2.2,0,4-1.8,4-4V10c0-2.2-1.8-4-4-4H10C7.8,6,6,7.8,6,10z"}},{"tag":"path","attr":{"fill":"#CCF2F6","d":"M27.9,28.9h-5.8l-8.4,7.2l6-7.2v-2.4l-3,0.8l3-1.9v-1.5c0-0.8,0.1-1.7,0.6-2.4l-7.5-8.3l8.7,7.2 c0.7-0.7,1.5-1.1,2.5-1.2l0.6-7.3l1.1,7.3c0.3,0,0.6,0.1,0.8,0.1l1.2-1.2l-0.3,1.7c0.3,0.1,0.4,0.3,0.7,0.6l4.4-2.8l-3.6,3.9 c0.3,0.4,0.6,1,0.7,1.7l2.2,0.1l-2.2,0.8c0,0.3,0,1.5,0,1.5l2.6,1.4l-2.6-0.3c0,0,0,1.8,0,2.2l6.2,7.1L27.9,28.9z"}}]})(props);
};
function FcLikePlaceholder (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFCDD2","d":"M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"}}]})(props);
};
function FcLike (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"}}]})(props);
};
function FcLineChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"circle","attr":{"cx":"8","cy":"38","r":"3"}},{"tag":"circle","attr":{"cx":"16","cy":"40","r":"3"}},{"tag":"circle","attr":{"cx":"24","cy":"33","r":"3"}},{"tag":"circle","attr":{"cx":"32","cy":"35","r":"3"}},{"tag":"circle","attr":{"cx":"40","cy":"31","r":"3"}},{"tag":"polygon","attr":{"points":"39.1,29.2 31.8,32.9 23.5,30.8 15.5,37.8 8.5,36.1 7.5,39.9 16.5,42.2 24.5,35.2 32.2,37.1 40.9,32.8"}}]},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"circle","attr":{"cx":"8","cy":"20","r":"3"}},{"tag":"circle","attr":{"cx":"16","cy":"22","r":"3"}},{"tag":"circle","attr":{"cx":"24","cy":"15","r":"3"}},{"tag":"circle","attr":{"cx":"32","cy":"20","r":"3"}},{"tag":"circle","attr":{"cx":"40","cy":"8","r":"3"}},{"tag":"path","attr":{"d":"M38.3,6.9c-2.1,3.2-5.3,8-6.9,10.4c-1.2-0.7-3.1-2-6.4-4l-1.3-0.8l-8.3,7.3l-7-1.7l-1,3.9l9,2.3l7.7-6.7 c2.6,1.6,5.8,3.6,6.5,4.1l0.5,0.5l0.9-0.1c1.1-0.1,1.1-0.1,9.5-12.9L38.3,6.9z"}}]}]})(props);
};
function FcLink (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"path","attr":{"d":"M38,13h-3c-5.5,0-10,4.5-10,10s4.5,10,10,10h3c5.5,0,10-4.5,10-10S43.5,13,38,13z M38,29h-3 c-3.3,0-6-2.7-6-6s2.7-6,6-6h3c3.3,0,6,2.7,6,6S41.3,29,38,29z"}},{"tag":"path","attr":{"d":"M13,13h-3C4.5,13,0,17.5,0,23s4.5,10,10,10h3c5.5,0,10-4.5,10-10S18.5,13,13,13z M13,29h-3 c-3.3,0-6-2.7-6-6s2.7-6,6-6h3c3.3,0,6,2.7,6,6S16.3,29,13,29z"}}]},{"tag":"path","attr":{"fill":"#42A5F5","d":"M33,21H15c-1.1,0-2,0.9-2,2s0.9,2,2,2h18c1.1,0,2-0.9,2-2S34.1,21,33,21z"}}]})(props);
};
function FcLinux (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 2 48 48","enableBackground":"new 0 2 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#ECEFF1","points":"20.1,18.2 20.2,20.5 18.6,23.5 16.1,28.4 15.6,32.5 17.4,38.3 21.5,40.6 27.7,40.6 33.5,36.2 \r\n\t36.1,29.3 30.1,22 28.4,17.9 "}},{"tag":"path","attr":{"fill":"#263238","d":"M34.3,23.9c-1.6-2.3-2.9-3.7-3.6-6.6c-0.7-2.9,0.2-2.1-0.4-4.6c-0.3-1.3-0.8-2.2-1.3-2.9\r\n\tc-0.6-0.7-1.3-1.1-1.7-1.2c-0.9-0.5-3-1.3-5.6,0.1c-2.7,1.4-2.4,4.4-1.9,10.5c0,0.4-0.1,0.9-0.3,1.3c-0.4,0.9-1.1,1.7-1.7,2.4\r\n\tc-0.7,1-1.4,2-1.9,3.1c-1.2,2.3-2.3,5.2-2,6.3c0.5-0.1,6.8,9.5,6.8,9.7c0.4-0.1,2.1-0.1,3.6-0.1c2.1-0.1,3.3-0.2,5,0.2\r\n\tc0-0.3-0.1-0.6-0.1-0.9c0-0.6,0.1-1.1,0.2-1.8c0.1-0.5,0.2-1,0.3-1.6c-1,0.9-2.8,1.9-4.5,2.2c-1.5,0.3-4-0.2-5.2-1.7\r\n\tc0.1,0,0.3,0,0.4-0.1c0.3-0.1,0.6-0.2,0.7-0.4c0.3-0.5,0.1-1-0.1-1.3c-0.2-0.3-1.7-1.4-2.4-2c-0.7-0.6-1.1-0.9-1.5-1.3\r\n\tc0,0-0.6-0.6-0.8-0.8c-0.2-0.2-0.3-0.4-0.4-0.5c-0.2-0.5-0.3-1.1-0.2-1.9c0.1-1.1,0.5-2,1-3c0.2-0.4,0.7-1.2,0.7-1.2\r\n\ts-1.7,4.2-0.8,5.5c0,0,0.1-1.3,0.5-2.6c0.3-0.9,0.8-2.2,1.4-2.9s2.1-3.3,2.2-4.9c0-0.7,0.1-1.4,0.1-1.9c-0.4-0.4,6.6-1.4,7-0.3\r\n\tc0.1,0.4,1.5,4,2.3,5.9c0.4,0.9,0.9,1.7,1.2,2.7c0.3,1.1,0.5,2.6,0.5,4.1c0,0.3,0,0.8-0.1,1.3c0.2,0,4.1-4.2-0.5-7.7\r\n\tc0,0,2.8,1.3,2.9,3.9c0.1,2.1-0.8,3.8-1,4.1c0.1,0,2.1,0.9,2.2,0.9c0.4,0,1.2-0.3,1.2-0.3c0.1-0.3,0.4-1.1,0.4-1.4\r\n\tC37.6,29.9,35.9,26.2,34.3,23.9z"}},{"tag":"g","attr":{},"child":[{"tag":"ellipse","attr":{"fill":"#ECEFF1","cx":"21.6","cy":"15.3","rx":"1.3","ry":"2"}},{"tag":"ellipse","attr":{"fill":"#ECEFF1","cx":"26.1","cy":"15.2","rx":"1.7","ry":"2.3"}}]},{"tag":"g","attr":{},"child":[{"tag":"ellipse","attr":{"transform":"matrix(-0.1254 -0.9921 0.9921 -0.1254 8.9754 38.9969)","fill":"#212121","cx":"21.7","cy":"15.5","rx":"1.2","ry":"0.7"}},{"tag":"ellipse","attr":{"fill":"#212121","cx":"26","cy":"15.6","rx":"1","ry":"1.3"}}]},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#FFC107","d":"M39.3,37.6c-0.4-0.2-1.1-0.5-1.7-1.4c-0.3-0.5-0.2-1.9-0.7-2.5c-0.3-0.4-0.7-0.2-0.8-0.2\r\n\t\tc-0.9,0.2-3,1.6-4.4,0c-0.2-0.2-0.5-0.5-1-0.5c-0.5,0-0.7,0.2-0.9,0.6s-0.2,0.7-0.2,1.7c0,0.8,0,1.7-0.1,2.4\r\n\t\tc-0.2,1.7-0.5,2.7-0.5,3.7c0,1.1,0.3,1.8,0.7,2.1c0.3,0.3,0.8,0.5,1.9,0.5c1.1,0,1.8-0.4,2.5-1.1c0.5-0.5,0.9-0.7,2.3-1.7\r\n\t\tc1.1-0.7,2.8-1.6,3.1-1.9c0.2-0.2,0.5-0.3,0.5-0.9C40,37.9,39.6,37.7,39.3,37.6z"}},{"tag":"path","attr":{"fill":"#FFC107","d":"M19.2,37.9c-1-1.6-1.1-1.9-1.8-2.9c-0.6-1-1.9-2.9-2.7-2.9c-0.6,0-0.9,0.3-1.3,0.7\r\n\t\tc-0.4,0.4-0.8,1.3-1.5,1.8c-0.6,0.5-2.3,0.4-2.7,1c-0.4,0.6,0.4,1.5,0.4,3c0,0.6-0.5,1-0.6,1.4c-0.1,0.5-0.2,0.8,0,1.2\r\n\t\tc0.4,0.6,0.9,0.8,4.3,1.5c1.8,0.4,3.5,1.4,4.6,1.5c1.1,0.1,3,0,3-2.7C21,39.9,20.1,39.5,19.2,37.9z"}},{"tag":"path","attr":{"fill":"#FFC107","d":"M21.1,19.8C20.5,19.4,20,19,20,18.4c0-0.6,0.4-0.8,1-1.3c0.1-0.1,1.2-1.1,2.3-1.1s2.4,0.7,2.9,0.9\r\n\t\tc0.9,0.2,1.8,0.4,1.7,1.1c-0.1,1-0.2,1.2-1.2,1.7c-0.7,0.2-2,1.3-2.9,1.3c-0.4,0-1,0-1.4-0.1C22.1,20.8,21.6,20.3,21.1,19.8z"}}]},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#634703","d":"M20.9,19c0.2,0.2,0.5,0.4,0.8,0.5c0.2,0.1,0.5,0.2,0.5,0.2c0.4,0,0.7,0,0.9,0c0.5,0,1.2-0.2,1.9-0.6\r\n\t\tc0.7-0.3,0.8-0.5,1.3-0.7c0.5-0.3,1-0.6,0.8-0.7c-0.2-0.1-0.4,0-1.1,0.4c-0.6,0.4-1.1,0.6-1.7,0.9c-0.3,0.1-0.7,0.3-1,0.3\r\n\t\tc-0.3,0-0.6,0-0.9,0c-0.3,0-0.5-0.1-0.8-0.2c-0.2-0.1-0.3-0.2-0.4-0.2c-0.2-0.1-0.6-0.5-0.8-0.6c0,0-0.2,0-0.1,0.1\r\n\t\tC20.6,18.7,20.7,18.8,20.9,19z"}},{"tag":"path","attr":{"fill":"#634703","d":"M23.9,16.8c0.1,0.2,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.1,0.2,0.1c0.1-0.1,0-0.3-0.1-0.3\r\n\t\tC24.4,16.7,23.9,16.7,23.9,16.8z"}},{"tag":"path","attr":{"fill":"#634703","d":"M22.3,17c0,0.1,0.2,0.2,0.2,0.1c0.1-0.1,0.2-0.2,0.3-0.2c0.2-0.1,0.1-0.2-0.2-0.2\r\n\t\tC22.4,16.8,22.4,16.9,22.3,17z"}}]},{"tag":"path","attr":{"fill":"#455A64","d":"M32,34.7c0,0.1,0,0.2,0,0.3c0.2,0.4,0.7,0.5,1.1,0.5c0.6,0,1.2-0.4,1.5-0.8c0-0.1,0.1-0.2,0.2-0.3\r\n\tc0.2-0.3,0.3-0.5,0.4-0.6c0,0-0.1-0.1-0.1-0.2c-0.1-0.2-0.4-0.4-0.8-0.5c-0.3-0.1-0.8-0.2-1-0.2c-0.9-0.1-1.4,0.2-1.7,0.5\r\n\tc0,0,0.1,0,0.1,0.1c0.2,0.2,0.3,0.4,0.3,0.7C32.1,34.4,32,34.5,32,34.7z"}}]})(props);
};
function FcList (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"6","y":"22","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"14","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"30","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"6","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"38","width":"4","height":"4"}}]},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"14","y":"22","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"14","y":"14","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"14","y":"30","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"14","y":"6","width":"28","height":"4"}},{"tag":"rect","attr":{"x":"14","y":"38","width":"28","height":"4"}}]}]})(props);
};
function FcLockLandscape (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M7,10h34c2.2,0,4,1.8,4,4v20c0,2.2-1.8,4-4,4H7c-2.2,0-4-1.8-4-4V14C3,11.8,4.8,10,7,10z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M42,34V14c0-0.6-0.4-1-1-1H7c-0.6,0-1,0.4-1,1v20c0,0.6,0.4,1,1,1h34C41.6,35,42,34.6,42,34z"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"path","attr":{"d":"M29,31H19c-0.6,0-1-0.4-1-1v-6c0-0.6,0.4-1,1-1h10c0.6,0,1,0.4,1,1v6C30,30.6,29.6,31,29,31z"}},{"tag":"path","attr":{"d":"M24,17c-2.2,0-4,1.8-4,4v3h2v-3c0-1.1,0.9-2,2-2s2,0.9,2,2v3h2v-3C28,18.8,26.2,17,24,17z"}}]}]})(props);
};
function FcLockPortrait (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M10,41V7c0-2.2,1.8-4,4-4h20c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H14C11.8,45,10,43.2,10,41z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M34,6H14c-0.6,0-1,0.4-1,1v34c0,0.6,0.4,1,1,1h20c0.6,0,1-0.4,1-1V7C35,6.4,34.6,6,34,6z"}},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"path","attr":{"d":"M29,30H19c-0.6,0-1-0.4-1-1v-6c0-0.6,0.4-1,1-1h10c0.6,0,1,0.4,1,1v6C30,29.6,29.6,30,29,30z"}},{"tag":"path","attr":{"d":"M24,16c-2.2,0-4,1.8-4,4v3h2v-3c0-1.1,0.9-2,2-2s2,0.9,2,2v3h2v-3C28,17.8,26.2,16,24,16z"}}]}]})(props);
};
function FcLock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#424242","d":"M24,4c-5.5,0-10,4.5-10,10v4h4v-4c0-3.3,2.7-6,6-6s6,2.7,6,6v4h4v-4C34,8.5,29.5,4,24,4z"}},{"tag":"path","attr":{"fill":"#FB8C00","d":"M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"}},{"tag":"circle","attr":{"fill":"#C76E00","cx":"24","cy":"31","r":"3"}}]})(props);
};
function FcLowBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#CFD8DC"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]},{"tag":"path","attr":{"fill":"#8BC34A","d":"M34,44H14c-1.1,0-2-0.9-2-2v-9h24v9C36,43.1,35.1,44,34,44z"}}]})(props);
};
function FcLowPriority (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18 C25.3,46.4,22.7,46.4,21.2,44.8z"}},{"tag":"g","attr":{"fill":"#FFEB3B"},"child":[{"tag":"polygon","attr":{"points":"24,33.4 17,25 31,25"}},{"tag":"rect","attr":{"x":"22","y":"14.8","width":"4","height":"12.3"}}]}]})(props);
};
function FcMakeDecision (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"polygon","attr":{"fill":"#FF5722","points":"24,23.5 24,12.5 30.6,18"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M28.9,24.4c0,0.2,0.1,0.4,0.1,0.6c0,2.8-2.2,5-5,5s-5-2.2-5-5s2.2-5,5-5c0.7,0,1.4,0.2,2,0.4v-4.2 c-0.6-0.1-1.3-0.2-2-0.2c-5,0-9,4-9,9s4,9,9,9s9-4,9-9c0-1.2-0.2-2.4-0.7-3.4L28.9,24.4z"}}]})(props);
};
function FcManager (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#FF9800","points":"24,37 19,31 19,25 29,25 29,31"}},{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"19","r":"2"}},{"tag":"circle","attr":{"cx":"15","cy":"19","r":"2"}}]},{"tag":"path","attr":{"fill":"#FFB74D","d":"M33,13c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,5,4,9,9,9s9-4,9-9C33,18.9,33,14.1,33,13z"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M24,4c-6.1,0-10,4.9-10,11c0,0.8,0,2.3,0,2.3l2,1.7v-5l12-4l4,4v5l2-1.7c0,0,0-1.5,0-2.3c0-4-1-8-6-9l-1-2 H24z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"28","cy":"19","r":"1"}},{"tag":"circle","attr":{"cx":"20","cy":"19","r":"1"}}]},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M29,31L29,31l-5,1l-5-1c0,0-11,2-11,13h32C40,33,29,31,29,31z"}},{"tag":"polygon","attr":{"fill":"#3F51B5","points":"23,35 22,44 26,44 25,35 26,34 24,32 22,34"}}]})(props);
};
function FcMediumPriority (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFC107","d":"M21.2,44.8l-18-18c-1.6-1.6-1.6-4.1,0-5.7l18-18c1.6-1.6,4.1-1.6,5.7,0l18,18c1.6,1.6,1.6,4.1,0,5.7l-18,18 C25.3,46.4,22.7,46.4,21.2,44.8z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"24","r":"2"}},{"tag":"circle","attr":{"cx":"32","cy":"24","r":"2"}},{"tag":"circle","attr":{"cx":"16","cy":"24","r":"2"}}]}]})(props);
};
function FcMenu (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#607D8B"},"child":[{"tag":"rect","attr":{"x":"6","y":"22","width":"36","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"10","width":"36","height":"4"}},{"tag":"rect","attr":{"x":"6","y":"34","width":"36","height":"4"}}]}]})(props);
};
function FcMiddleBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#CFD8DC"},"child":[{"tag":"path","attr":{"d":"M34,44H14c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v34C36,43.1,35.1,44,34,44z"}},{"tag":"path","attr":{"d":"M28,13h-8c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v7C29,12.6,28.6,13,28,13z"}}]},{"tag":"path","attr":{"fill":"#8BC34A","d":"M34,44H14c-1.1,0-2-0.9-2-2V23h24v19C36,43.1,35.1,44,34,44z"}}]})(props);
};
function FcMindMap (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#CFD8DC","points":"39.4,23 38.6,19 26,21.6 26,8 22,8 22,20.3 8.1,11.3 5.9,14.7 21.1,24.5 9.4,39.8 12.6,42.2 23.9,27.4 32.3,40.1 35.7,37.9 27.3,25.4"}},{"tag":"circle","attr":{"fill":"#3F51B5","cx":"24","cy":"24","r":"7"}},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"8","r":"5"}},{"tag":"circle","attr":{"cx":"39","cy":"21","r":"5"}},{"tag":"circle","attr":{"cx":"7","cy":"13","r":"5"}},{"tag":"circle","attr":{"cx":"11","cy":"41","r":"5"}},{"tag":"circle","attr":{"cx":"34","cy":"39","r":"5"}}]}]})(props);
};
function FcMinus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"8","y":"21","fill":"#5C6BC0","width":"32","height":"6"}}]})(props);
};
function FcMissedCall (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#F44336"},"child":[{"tag":"polygon","attr":{"points":"30.3,12.9 24,19.2 15.7,10.9 12.9,13.7 24,24.8 33.1,15.7"}},{"tag":"polygon","attr":{"points":"36,19 27,10 36,10"}}]},{"tag":"path","attr":{"fill":"#009688","d":"M44.5,30.8l-2.4-2.4c-8.5-8.3-28.9-7.1-36.2,0l-2.4,2.4c-0.7,0.7-0.7,1.7,0,2.4l4.8,4.7 c0.7,0.7,1.7,0.7,2.4,0l5.3-5.1l-0.4-5.6c1.7-1.7,15.1-1.7,16.8,0L32.1,33l5.1,4.9c0.7,0.7,1.7,0.7,2.4,0l4.8-4.7 C45.2,32.5,45.2,31.4,44.5,30.8z"}}]})(props);
};
function FcMms (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E91E63","d":"M37,39H11l-6,6V11c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,36.3,40.3,39,37,39z"}},{"tag":"polygon","attr":{"fill":"#F48FB1","points":"20,16.5 10,31 30,31"}},{"tag":"g","attr":{"fill":"#F8BBD0"},"child":[{"tag":"circle","attr":{"cx":"34","cy":"15","r":"3"}},{"tag":"polygon","attr":{"points":"30,21 22,31 38,31"}}]}]})(props);
};
function FcMoneyTransfer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#78909C","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20.9c0-1.3,0.6-2.5,1.7-3.3L24,0l18.3,12.8c1.1,0.7,1.7,2,1.7,3.3V37 C44,39.2,42.2,41,40,41z"}},{"tag":"rect","attr":{"x":"14","y":"1","fill":"#AED581","width":"20","height":"31"}},{"tag":"g","attr":{"fill":"#558B2F"},"child":[{"tag":"path","attr":{"d":"M13,0v33h22V0H13z M33,31H15V2h18V31z"}},{"tag":"path","attr":{"d":"M34,3c0,1.7-0.3,3-2,3c-1.7,0-3-1.3-3-3s1.3-2,3-2C33.7,1,34,1.3,34,3z"}},{"tag":"path","attr":{"d":"M16,1c1.7,0,3,0.3,3,2s-1.3,3-3,3s-2-1.3-2-3S14.3,1,16,1z"}},{"tag":"circle","attr":{"cx":"24","cy":"8","r":"2"}},{"tag":"circle","attr":{"cx":"24","cy":"20","r":"6"}}]},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M40,41H8c-2.2,0-4-1.8-4-4l0-20l20,13l20-13v20C44,39.2,42.2,41,40,41z"}}]})(props);
};
function FcMultipleCameras (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M42,41H12c-2.2,0-4-1.8-4-4V17c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v20C46,39.2,44.2,41,42,41z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M36,36H6c-2.2,0-4-1.8-4-4V12c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v20C40,34.2,38.2,36,36,36z"}},{"tag":"circle","attr":{"fill":"#455A64","cx":"26","cy":"22","r":"10"}},{"tag":"circle","attr":{"fill":"#42A5F5","cx":"26","cy":"22","r":"7"}},{"tag":"path","attr":{"fill":"#90CAF9","d":"M29.7,19.7c-1-1.1-2.3-1.7-3.7-1.7s-2.8,0.6-3.7,1.7c-0.4,0.4-0.3,1,0.1,1.4c0.4,0.4,1,0.3,1.4-0.1 c1.2-1.3,3.3-1.3,4.5,0c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3C30.1,20.7,30.1,20.1,29.7,19.7z"}},{"tag":"rect","attr":{"x":"6","y":"12","fill":"#ADD8FB","width":"6","height":"3"}}]})(props);
};
function FcMultipleDevices (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#546E7A","d":"M4,28V8c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v20c0,2.2-1.8,4-4,4H8C5.8,32,4,30.2,4,28z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M36,7H8C7.4,7,7,7.4,7,8v20c0,0.6,0.4,1,1,1h28c0.6,0,1-0.4,1-1V8C37,7.4,36.6,7,36,7z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M38,33H6c-2.2,0-4-1.8-4-4v0h40v0C42,31.2,40.2,33,38,33z"}},{"tag":"path","attr":{"fill":"#E38939","d":"M24,40V16c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v24c0,2.2-1.8,4-4,4H28C25.8,44,24,42.2,24,40z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M40,15H28c-0.6,0-1,0.4-1,1v22c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V16C41,15.4,40.6,15,40,15z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"34","cy":"41.5","r":"1.5"}}]})(props);
};
function FcMultipleInputs (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90A4AE","d":"M40,35v5H8v-5H4v5c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4v-5H40z"}},{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"polygon","attr":{"points":"24,23.4 17,15 31,15"}},{"tag":"rect","attr":{"x":"22","y":"4","width":"4","height":"14"}},{"tag":"path","attr":{"d":"M31.5,26.9L30.8,28l3.5,1.9l0.6-1.2c1.6-3,2.6-4.7,3.5-5.2C39.3,23,41,23,44,23v-4 C36.3,19,35.6,19.4,31.5,26.9z"}},{"tag":"polygon","attr":{"points":"38.4,31 29.4,35 28,25"}},{"tag":"path","attr":{"d":"M16.5,26.9l0.6,1.2L13.6,30L13,28.8c-1.6-3-2.6-4.7-3.5-5.2C8.7,23,7,23,4,23v-4 C11.7,19,12.4,19.4,16.5,26.9z"}},{"tag":"polygon","attr":{"points":"20,25 18.6,35 9.6,31"}}]}]})(props);
};
function FcMultipleSmartphones (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M4,31V8c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v23c0,2.2-1.8,4-4,4H8C5.8,35,4,33.2,4,31z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M20,7H8C7.4,7,7,7.4,7,8v21c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V8C21,7.4,20.6,7,20,7z"}},{"tag":"circle","attr":{"fill":"#37474F","cx":"14","cy":"32.5","r":"1.5"}},{"tag":"path","attr":{"fill":"#546E7A","d":"M14,36V13c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v23c0,2.2-1.8,4-4,4H18C15.8,40,14,38.2,14,36z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M30,12H18c-0.6,0-1,0.4-1,1v21c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V13C31,12.4,30.6,12,30,12z"}},{"tag":"circle","attr":{"fill":"#37474F","cx":"24","cy":"37.5","r":"1.5"}},{"tag":"path","attr":{"fill":"#E38939","d":"M24,40V18c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v22c0,2.2-1.8,4-4,4H28C25.8,44,24,42.2,24,40z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M40,17H28c-0.6,0-1,0.4-1,1v20c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V18C41,17.4,40.6,17,40,17z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"34","cy":"41.5","r":"1.5"}}]})(props);
};
function FcMusic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#E91E63"},"child":[{"tag":"circle","attr":{"cx":"19","cy":"33","r":"9"}},{"tag":"polygon","attr":{"points":"24,6 24,33 28,33 28,14 39,17 39,10"}}]}]})(props);
};
function FcNegativeDynamic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"rect","attr":{"x":"19","y":"22","width":"10","height":"20"}},{"tag":"rect","attr":{"x":"6","y":"8","width":"10","height":"34"}},{"tag":"rect","attr":{"x":"32","y":"30","width":"10","height":"12"}}]},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"42,12 32,22 42,22"}},{"tag":"rect","attr":{"x":"32","y":"6.9","transform":"matrix(.707 -.707 .707 .707 .059 28.142)","width":"4","height":"14.1"}}]}]})(props);
};
function FcNeutralDecision (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFCC80"},"child":[{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"path","attr":{"d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"path","attr":{"d":"M24,4C15.2,4,8,11.2,8,20c0,1.2,0,3.5,0,3.5l2.1,0.6V19l19.5-6.3l8.2,6.3v5.1l2.1-0.6c0,0,0-2.3,0-3.5 C40,12.5,34.6,4,24,4z"}}]},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"25","r":"2"}},{"tag":"circle","attr":{"cx":"32","cy":"25","r":"2"}},{"tag":"circle","attr":{"cx":"16","cy":"25","r":"2"}}]}]})(props);
};
function FcNeutralTrading (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"polygon","attr":{"points":"43.4,13 35,20 35,6"}},{"tag":"rect","attr":{"x":"4","y":"11","width":"34","height":"4"}}]},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"40","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"34","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"28","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"22","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"16","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"10","y":"23","width":"4","height":"19"}},{"tag":"rect","attr":{"x":"4","y":"23","width":"4","height":"19"}}]}]})(props);
};
function FcNews (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF5722","d":"M32,15v28H10c-2.2,0-4-1.8-4-4V15H32z"}},{"tag":"path","attr":{"fill":"#FFCCBC","d":"M14,5v34c0,2.2-1.8,4-4,4h29c2.2,0,4-1.8,4-4V5H14z"}},{"tag":"g","attr":{"fill":"#FF5722"},"child":[{"tag":"rect","attr":{"x":"20","y":"10","width":"18","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"17","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"17","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"21","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"21","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"25","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"25","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"29","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"29","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"33","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"33","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"20","y":"37","width":"8","height":"2"}},{"tag":"rect","attr":{"x":"30","y":"37","width":"8","height":"2"}}]}]})(props);
};
function FcNext (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#2196F3","points":"17.1,5 14,8.1 29.9,24 14,39.9 17.1,43 36,24"}}]})(props);
};
function FcNfcSign (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M37,42c-0.3,0-0.7-0.1-1-0.3c-1-0.5-1.3-1.8-0.8-2.7c0-0.1,3.7-6.8,3.7-15S35.3,9,35.3,9\r\n\tc-0.5-1-0.2-2.2,0.8-2.7c1-0.5,2.2-0.2,2.7,0.8c0.2,0.3,4.3,7.6,4.3,17s-4.1,16.7-4.3,17C38.4,41.6,37.7,42,37,42z M32.8,35.8\r\n\tc0.1-0.2,2.2-5,2.2-11.8c0-6.8-2.1-11.6-2.2-11.8c-0.4-1-1.6-1.5-2.6-1c-1,0.4-1.5,1.6-1,2.6c0,0,1.8,4.3,1.8,10.2\r\n\tc0,5.9-1.8,10.2-1.8,10.2c-0.4,1,0,2.2,1,2.6c0.3,0.1,0.5,0.2,0.8,0.2C31.8,37,32.5,36.6,32.8,35.8z M23.3,33c0.6-0.1,1.1-0.5,1.4-1\r\n\tc0.1-0.2,2.3-3.9,2.3-8c0-4.1-2.2-7.9-2.3-8c-0.6-1-1.8-1.3-2.7-0.7c-1,0.6-1.3,1.8-0.7,2.7c0,0,1.7,3,1.7,6c0,1.3-0.3,2.7-0.7,3.7\r\n\tl-13-11.2c-0.5-0.4-1.2-0.6-1.8-0.4c-0.6,0.2-1.2,0.6-1.4,1.3C6.1,17.5,5,20.5,5,24c0,3.5,1.1,6.5,1.1,6.7c0.4,1,1.5,1.6,2.6,1.2\r\n\tc1-0.4,1.6-1.5,1.2-2.6c0,0-0.9-2.6-0.9-5.3c0-0.8,0.1-1.6,0.2-2.3l12.5,10.8c0.4,0.3,0.8,0.5,1.3,0.5C23.1,33,23.2,33,23.3,33z"}}]})(props);
};
function FcNightLandscape (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#673AB7","points":"16.5,18 0,42 33,42"}},{"tag":"polygon","attr":{"fill":"#9575CD","points":"33.6,24 19.2,42 48,42"}},{"tag":"path","attr":{"fill":"#40C4FF","d":"M42.9,6.3C43.6,7.4,44,8.6,44,10c0,3.9-3.1,7-7,7c-0.7,0-1.3-0.1-1.9-0.3c1.2,2,3.4,3.3,5.9,3.3 c3.9,0,7-3.1,7-7C48,9.8,45.9,7.1,42.9,6.3z"}}]})(props);
};
function FcNightPortrait (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#40C4FF","d":"M42.9,6.3C43.6,7.4,44,8.6,44,10c0,3.9-3.1,7-7,7c-0.7,0-1.3-0.1-1.9-0.3c1.2,2,3.4,3.3,5.9,3.3 c3.9,0,7-3.1,7-7C48,9.8,45.9,7.1,42.9,6.3z"}},{"tag":"g","attr":{"fill":"#B39DDB"},"child":[{"tag":"circle","attr":{"cx":"31","cy":"19","r":"2"}},{"tag":"circle","attr":{"cx":"13","cy":"19","r":"2"}},{"tag":"polygon","attr":{"points":"22,37 17,31 17,25 27,25 27,31"}}]},{"tag":"path","attr":{"fill":"#D1C4E9","d":"M31,13c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,5,4,9,9,9s9-4,9-9C31,18.9,31,14.1,31,13z"}},{"tag":"g","attr":{"fill":"#673AB7"},"child":[{"tag":"circle","attr":{"cx":"26","cy":"19","r":"1"}},{"tag":"circle","attr":{"cx":"18","cy":"19","r":"1"}},{"tag":"path","attr":{"d":"M22,4c-6.1,0-10,4.9-10,11c0,0.8,0,2.3,0,2.3l2,1.7v-5l12-4l4,4v5l2-1.7c0,0,0-1.5,0-2.3c0-4-1-8-6-9l-1-2 H22z"}},{"tag":"path","attr":{"d":"M27,31L27,31c0,0-2,1-5,1s-5-1-5-1S6,33,6,44h32C38,33,27,31,27,31z"}}]}]})(props);
};
function FcNoIdea (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FBC02D","d":"M37,22c0-7.7-6.6-13.8-14.5-12.9c-6,0.7-10.8,5.5-11.4,11.5c-0.5,4.6,1.4,8.7,4.6,11.3 c1.4,1.2,2.3,2.9,2.3,4.8V37h12v-0.1c0-1.8,0.8-3.6,2.2-4.8C35.1,29.7,37,26.1,37,22z"}},{"tag":"path","attr":{"fill":"#FFF59D","d":"M30.6,20.2l-3-2c-0.3-0.2-0.8-0.2-1.1,0L24,19.8l-2.4-1.6c-0.3-0.2-0.8-0.2-1.1,0l-3,2 c-0.2,0.2-0.4,0.4-0.4,0.7s0,0.6,0.2,0.8l3.8,4.7V37h2V26c0-0.2-0.1-0.4-0.2-0.6l-3.3-4.1l1.5-1l2.4,1.6c0.3,0.2,0.8,0.2,1.1,0 l2.4-1.6l1.5,1l-3.3,4.1C25.1,25.6,25,25.8,25,26v11h2V26.4l3.8-4.7c0.2-0.2,0.3-0.5,0.2-0.8S30.8,20.3,30.6,20.2z"}},{"tag":"circle","attr":{"fill":"#5C6BC0","cx":"24","cy":"44","r":"3"}},{"tag":"path","attr":{"fill":"#9FA8DA","d":"M26,45h-4c-2.2,0-4-1.8-4-4v-5h12v5C30,43.2,28.2,45,26,45z"}},{"tag":"g","attr":{"fill":"#5C6BC0"},"child":[{"tag":"path","attr":{"d":"M30,41l-11.6,1.6c0.3,0.7,0.9,1.4,1.6,1.8l9.4-1.3C29.8,42.5,30,41.8,30,41z"}},{"tag":"polygon","attr":{"points":"18,38.7 18,40.7 30,39 30,37"}}]},{"tag":"rect","attr":{"x":"22","y":"-2.9","transform":"matrix(.707 -.707 .707 .707 -9.941 24)","fill":"#37474F","width":"4","height":"53.7"}}]})(props);
};
function FcNoVideo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"}},{"tag":"polygon","attr":{"fill":"#388E3C","points":"44,35 34,29 34,19 44,13"}},{"tag":"line","attr":{"fill":"none","stroke":"#212121","strokeWidth":"4","strokeLinejoin":"round","strokeMiterlimit":"10","x1":"5","y1":"5","x2":"43","y2":"43"}}]})(props);
};
function FcNook (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90A4AE","d":"M8,39V9c0-3.3,2.7-6,6-6h20c3.3,0,6,2.7,6,6v30c0,3.3-2.7,6-6,6H14C10.7,45,8,42.3,8,39z"}},{"tag":"path","attr":{"fill":"#ECEFF1","d":"M34,7H14c-1.1,0-2,0.9-2,2v26c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V9C36,7.9,35.1,7,34,7z"}},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"rect","attr":{"x":"16","y":"12","width":"16","height":"3"}},{"tag":"rect","attr":{"x":"16","y":"19","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"23","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"27","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"31","width":"12","height":"2"}}]},{"tag":"path","attr":{"fill":"none","stroke":"#eee","strokeWidth":"2","strokeMiterlimit":"10","d":"M22,43v-1c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v1"}}]})(props);
};
function FcNumericalSorting12 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#546E7A","points":"38,33 38,5 34,5 34,33 28,33 36,43 44,33"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"path","attr":{"d":"M16.4,20h-3V8.6L9.9,9.7V7.3L16,5.1h0.3V20z"}},{"tag":"path","attr":{"d":"M19.4,43H9.2v-2l4.8-5.1c0.4-0.4,0.7-0.8,0.9-1.1c0.2-0.3,0.5-0.6,0.6-0.9c0.2-0.3,0.3-0.5,0.3-0.8 c0.1-0.2,0.1-0.5,0.1-0.7c0-0.7-0.2-1.2-0.5-1.6c-0.3-0.4-0.8-0.6-1.4-0.6c-0.3,0-0.7,0.1-0.9,0.2c-0.3,0.1-0.5,0.3-0.7,0.5 c-0.2,0.2-0.3,0.5-0.4,0.8s-0.1,0.6-0.1,1h-3c0-0.7,0.1-1.3,0.4-1.9c0.2-0.6,0.6-1.1,1-1.6c0.5-0.4,1-0.8,1.6-1.1 c0.6-0.3,1.4-0.4,2.2-0.4c0.8,0,1.5,0.1,2.1,0.3c0.6,0.2,1.1,0.5,1.5,0.8s0.7,0.8,0.9,1.3s0.3,1.1,0.3,1.8c0,0.5-0.1,1-0.2,1.4 S18.3,34.5,18,35s-0.6,0.9-1,1.4c-0.4,0.5-0.9,1-1.4,1.5L13,40.6h6.4V43z"}}]}]})(props);
};
function FcNumericalSorting21 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#546E7A","points":"38,33 38,5 34,5 34,33 28,33 36,43 44,33"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"path","attr":{"d":"M19.2,20H9v-2l4.8-5.1c0.4-0.4,0.7-0.8,0.9-1.1c0.2-0.3,0.5-0.6,0.6-0.9c0.2-0.3,0.3-0.5,0.3-0.8 c0.1-0.2,0.1-0.5,0.1-0.7c0-0.7-0.2-1.2-0.5-1.6c-0.3-0.4-0.8-0.6-1.4-0.6c-0.3,0-0.7,0.1-0.9,0.2c-0.3,0.1-0.5,0.3-0.7,0.5 c-0.2,0.2-0.3,0.5-0.4,0.8s-0.1,0.6-0.1,1h-3c0-0.7,0.1-1.3,0.4-1.9c0.2-0.6,0.6-1.1,1-1.6c0.5-0.4,1-0.8,1.6-1.1 c0.6-0.3,1.4-0.4,2.2-0.4c0.8,0,1.5,0.1,2.1,0.3c0.6,0.2,1.1,0.5,1.5,0.8s0.7,0.8,0.9,1.3c0.2,0.5,0.3,1.1,0.3,1.8 c0,0.5-0.1,1-0.2,1.4s-0.4,0.9-0.7,1.4s-0.6,0.9-1,1.4c-0.4,0.5-0.9,1-1.4,1.5l-2.6,2.8h6.4V20z"}},{"tag":"path","attr":{"d":"M16.2,43h-3V31.6l-3.5,1.1v-2.4l6.2-2.2h0.3V43z"}}]}]})(props);
};
function FcOk (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#4CAF50","cx":"24","cy":"24","r":"21"}},{"tag":"polygon","attr":{"fill":"#CCFF90","points":"34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"}}]})(props);
};
function FcOldTimeCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#546E7A","d":"M14,13H8v-1.8C8,10.5,8.5,10,9.2,10h3.6c0.7,0,1.2,0.5,1.2,1.2V13z"}},{"tag":"path","attr":{"fill":"#5E35B1","d":"M40,40H8c-2.2,0-4-1.8-4-4V22h40v14C44,38.2,42.2,40,40,40z"}},{"tag":"path","attr":{"fill":"#42257A","d":"M12.7,22c-0.4,1.3-0.7,2.6-0.7,4c0,6.6,5.4,12,12,12s12-5.4,12-12c0-1.4-0.3-2.7-0.7-4H12.7z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M8,12h32c2.2,0,4,1.8,4,4v6H4v-6C4,13.8,5.8,12,8,12z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M33.9,13.1H14.2L17.6,8c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,13.1z"}},{"tag":"path","attr":{"fill":"#455A64","d":"M35.3,22c-1.6-4.7-6.1-8-11.3-8s-9.7,3.3-11.3,8H35.3z"}},{"tag":"circle","attr":{"fill":"#B388FF","cx":"24","cy":"26","r":"9"}},{"tag":"path","attr":{"fill":"#C7A7FF","d":"M29,23c-1.2-1.4-3-2.2-4.8-2.2c-1.8,0-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.4,24.4,29.5,23.5,29,23z"}},{"tag":"rect","attr":{"x":"36","y":"15","fill":"#DBE2E5","width":"5","height":"4"}}]})(props);
};
function FcOnlineSupport (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"13","y":"30","fill":"#BF360C","width":"22","height":"12"}},{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"10","cy":"26","r":"4"}},{"tag":"circle","attr":{"cx":"38","cy":"26","r":"4"}}]},{"tag":"path","attr":{"fill":"#FFB74D","d":"M39,19c0-12.7-30-8.3-30,0c0,1.8,0,8.2,0,10c0,8.3,6.7,15,15,15s15-6.7,15-15C39,27.2,39,20.8,39,19z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"30","cy":"26","r":"2"}},{"tag":"circle","attr":{"cx":"18","cy":"26","r":"2"}}]},{"tag":"path","attr":{"fill":"#FF5722","d":"M24,2C15.5,2,3,7.8,3,35.6L13,42V24l16.8-9.8L35,21v21l10-8.2c0-5.6-0.9-29-15.4-29L28.2,2H24z"}},{"tag":"path","attr":{"fill":"#757575","d":"M45,24c-0.6,0-1,0.4-1,1v-7c0-8.8-7.2-16-16-16h-9c-0.6,0-1,0.4-1,1s0.4,1,1,1h9c7.7,0,14,6.3,14,14v10 c0,0.6,0.4,1,1,1s1-0.4,1-1v2c0,3.9-3.1,7-7,7H24c-0.6,0-1,0.4-1,1s0.4,1,1,1h13c5,0,9-4,9-9v-5C46,24.4,45.6,24,45,24z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"path","attr":{"d":"M45,22h-1c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h1c1.1,0,2-0.9,2-2v-4C47,22.9,46.1,22,45,22z"}},{"tag":"circle","attr":{"cx":"24","cy":"38","r":"2"}}]}]})(props);
};
function FcOpenedFolder (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFA000","d":"M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"}},{"tag":"path","attr":{"fill":"#FFCA28","d":"M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"}}]})(props);
};
function FcOrgUnit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M10,10v28h28V10H10z M34,34H14V14h20V34z"}},{"tag":"rect","attr":{"x":"6","y":"6","fill":"#D81B60","width":"12","height":"12"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"30","y":"6","width":"12","height":"12"}},{"tag":"rect","attr":{"x":"6","y":"30","width":"12","height":"12"}},{"tag":"rect","attr":{"x":"30","y":"30","width":"12","height":"12"}}]}]})(props);
};
function FcOrganization (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M42,42H6V10c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4V42z"}},{"tag":"rect","attr":{"x":"6","y":"42","fill":"#64B5F6","width":"36","height":"2"}},{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"rect","attr":{"x":"31","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"27","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"35","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"35","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"19","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"31","y":"11","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"11","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"11","y":"11","width":"6","height":"5"}},{"tag":"rect","attr":{"x":"21","y":"35","width":"6","height":"9"}}]}]})(props);
};
function FcOvertime (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M12,40V20h32v20c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M44,16v6H12v-6c0-2.2,1.8-4,4-4h24C42.2,12,44,13.8,44,16z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"37","cy":"16","r":"3"}},{"tag":"circle","attr":{"cx":"20","cy":"16","r":"3"}}]},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"path","attr":{"d":"M37,10c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2s2-0.9,2-2v-4C39,10.9,38.1,10,37,10z"}},{"tag":"path","attr":{"d":"M20,10c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2s2-0.9,2-2v-4C22,10.9,21.1,10,20,10z"}}]},{"tag":"rect","attr":{"x":"32","y":"34","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"26","y":"34","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"34","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"32","y":"28","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"26","y":"28","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"28","fill":"#90A4AE","width":"4","height":"4"}},{"tag":"circle","attr":{"fill":"#F44336","cx":"16","cy":"15","r":"12"}},{"tag":"circle","attr":{"fill":"#eee","cx":"16","cy":"15","r":"9"}},{"tag":"rect","attr":{"x":"15","y":"8","width":"2","height":"7"}},{"tag":"rect","attr":{"x":"16.9","y":"14.2","transform":"matrix(-.707 .707 -.707 -.707 42.506 16.192)","width":"1.9","height":"5.4"}},{"tag":"circle","attr":{"cx":"16","cy":"15","r":"1.5"}}]})(props);
};
function FcPackage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF9800","d":"M38,42H10c-2.2,0-4-1.8-4-4V10c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v28C42,40.2,40.2,42,38,42z"}},{"tag":"path","attr":{"fill":"#8A5100","d":"M29.5,16h-11c-0.8,0-1.5-0.7-1.5-1.5v0c0-0.8,0.7-1.5,1.5-1.5h11c0.8,0,1.5,0.7,1.5,1.5v0 C31,15.3,30.3,16,29.5,16z"}}]})(props);
};
function FcPaid (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2E7D32","d":"M25.4,5.6c-0.8-0.8-2-0.8-2.8,0l-12,12c-0.8,0.8-0.8,2,0,2.8C11,20.8,11.5,21,12,21s1-0.2,1.4-0.6l12-12 C26.2,7.6,26.2,6.4,25.4,5.6z"}},{"tag":"path","attr":{"fill":"#1B5E20","d":"M37.4,17.6l-12-12c-0.8-0.8-2-0.8-2.8,0c-0.8,0.8-0.8,2,0,2.8l12,12C35,20.8,35.5,21,36,21s1-0.2,1.4-0.6 C38.2,19.6,38.2,18.4,37.4,17.6z"}},{"tag":"path","attr":{"fill":"#388E3C","d":"M37.4,41H10.6c-1,0-1.8-0.7-2-1.6L5,21h38l-3.7,18.4C39.1,40.3,38.3,41,37.4,41z"}},{"tag":"path","attr":{"fill":"#4CAF50","d":"M43,23H5c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v2C45,22.1,44.1,23,43,23z"}},{"tag":"polygon","attr":{"fill":"#DCEDC8","points":"30.8,24.8 22.9,32.7 19.2,28.9 17,31.1 22.9,37 33,26.9"}}]})(props);
};
function FcPanorama (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F57C00","d":"M4,9v32c0,0,8.4-3,20-3s20,3,20,3V9c0,0-6.7,3-20,3S4,9,4,9z"}},{"tag":"path","attr":{"fill":"#942A09","d":"M24,34c0.1,0,0.3,0,0.4,0L15,19L6.9,36.2C10.3,35.3,16.5,34,24,34z"}},{"tag":"path","attr":{"fill":"#BF360C","d":"M24,34c3.3,0,6.3,0.2,9,0.6l-8-11.8l-7.8,11.5C19.3,34.1,21.6,34,24,34z"}},{"tag":"path","attr":{"fill":"#E65100","d":"M40.7,36L35,26.5l-5,7.8C34.5,34.7,38.2,35.4,40.7,36z"}},{"tag":"ellipse","attr":{"fill":"#FFF9C4","cx":"36","cy":"19.5","rx":"2","ry":"2.5"}}]})(props);
};
function FcParallelTasks (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"36,13 36,9 22,9 22,22 13,22 13,26 22,26 22,39 36,39 36,35 26,35 26,26 36,26 36,22 26,22 26,13"}},{"tag":"rect","attr":{"x":"6","y":"17","fill":"#D81B60","width":"10","height":"14"}},{"tag":"rect","attr":{"x":"32","y":"6","fill":"#2196F3","width":"10","height":"10"}},{"tag":"rect","attr":{"x":"32","y":"32","fill":"#2196F3","width":"10","height":"10"}},{"tag":"rect","attr":{"x":"32","y":"19","fill":"#2196F3","width":"10","height":"10"}}]})(props);
};
function FcPhoneAndroid (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M12,40V8c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M32,7H16c-0.6,0-1,0.4-1,1v29c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1V8C33,7.4,32.6,7,32,7z"}},{"tag":"rect","attr":{"x":"21","y":"40","fill":"#78909C","width":"6","height":"2"}}]})(props);
};
function FcPhone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#009688","d":"M39.1,7l-3.7,0C22.2,7.2,7.1,24.1,7,35.4l0,3.7c0,1,0.8,1.9,1.9,1.9l7.5-0.1c1,0,1.9-0.9,1.9-1.9l0.2-8.2 l-4.7-4c0-2.6,10.5-13.1,13.2-13.2l4.3,4.7l7.9-0.2c1,0,1.9-0.9,1.9-1.9L41,8.9C41,7.8,40.2,7,39.1,7z"}}]})(props);
};
function FcPhotoReel (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#673AB7","d":"M10,9c-2.2,0-4,1.8-4,4v26c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V13c0-2.2-1.8-4-4-4"}},{"tag":"g","attr":{"fill":"#311B92"},"child":[{"tag":"rect","attr":{"x":"14","y":"13","width":"2","height":"26"}},{"tag":"path","attr":{"d":"M24,9V7c0-1.2-0.8-2-2-2h-8c-1.2,0-2,0.8-2,2v2H24z"}}]},{"tag":"path","attr":{"fill":"#D84315","d":"M30,13H16v26h14V13z M21,37h-3v-4h3V37z M21,19h-3v-4h3V19z M27,37h-3v-4h3V37z M24,19v-4h3v4H24z"}},{"tag":"path","attr":{"fill":"#FF5722","d":"M30,13v2h3v4h-3v14h3v4h-3v2h12V13H30z M39,37h-3v-4h3V37z M39,19h-3v-4h3V19z"}}]})(props);
};
function FcPicture (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F57C00","d":"M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"}},{"tag":"circle","attr":{"fill":"#FFF9C4","cx":"35","cy":"16","r":"3"}},{"tag":"polygon","attr":{"fill":"#942A09","points":"20,16 9,32 31,32"}},{"tag":"polygon","attr":{"fill":"#BF360C","points":"31,22 23,32 39,32"}}]})(props);
};
function FcPieChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#00BCD4","d":"M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18c5.2,0,9.9-2.2,13.1-5.7L24,24V6z"}},{"tag":"path","attr":{"fill":"#448AFF","d":"M42,24c0-9.9-8.1-18-18-18v18H42z"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M24,24l13.1,12.3c3-3.2,4.9-7.5,4.9-12.3H24z"}}]})(props);
};
function FcPlanner (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M5,38V14h38v24c0,2.2-1.8,4-4,4H9C6.8,42,5,40.2,5,38z"}},{"tag":"path","attr":{"fill":"#F44336","d":"M43,10v6H5v-6c0-2.2,1.8-4,4-4h30C41.2,6,43,7.8,43,10z"}},{"tag":"g","attr":{"fill":"#B71C1C"},"child":[{"tag":"circle","attr":{"cx":"33","cy":"10","r":"3"}},{"tag":"circle","attr":{"cx":"15","cy":"10","r":"3"}}]},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"path","attr":{"d":"M33,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C35,3.9,34.1,3,33,3z"}},{"tag":"path","attr":{"d":"M15,3c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2s2-0.9,2-2V5C17,3.9,16.1,3,15,3z"}}]},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"rect","attr":{"x":"13","y":"21","width":"6","height":"6"}},{"tag":"rect","attr":{"x":"21","y":"21","width":"6","height":"6"}},{"tag":"rect","attr":{"x":"29","y":"21","width":"6","height":"6"}},{"tag":"rect","attr":{"x":"13","y":"29","width":"6","height":"6"}},{"tag":"rect","attr":{"x":"21","y":"29","width":"6","height":"6"}}]},{"tag":"rect","attr":{"x":"29","y":"29","fill":"#F44336","width":"6","height":"6"}}]})(props);
};
function FcPlus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#4CAF50","cx":"24","cy":"24","r":"21"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"21","y":"14","width":"6","height":"20"}},{"tag":"rect","attr":{"x":"14","y":"21","width":"20","height":"6"}}]}]})(props);
};
function FcPodiumWithAudience (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#B0BEC5","points":"41,12 7,12 6,16 11,19 9,16 39,16 37,19 42,16"}},{"tag":"polygon","attr":{"fill":"#78909C","points":"9,16 39,16 35,28 13,28"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"24","cy":"28","r":"4"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"36","cy":"28","r":"4"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"12","cy":"28","r":"4"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"18","cy":"37","r":"5"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"30","cy":"37","r":"5"}}]})(props);
};
function FcPodiumWithSpeaker (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#FFB74D","cx":"24","cy":"11","r":"6"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M36,26.1c0,0-3.3-7.1-12-7.1s-12,7.1-12,7.1V30h24V26.1z"}},{"tag":"polygon","attr":{"fill":"#B0BEC5","points":"41,25 7,25 6,29 11,32 9,29 39,29 37,32 42,29"}},{"tag":"polygon","attr":{"fill":"#78909C","points":"9,29 39,29 35,41 13,41"}}]})(props);
};
function FcPodiumWithoutSpeaker (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#B0BEC5","points":"43,16 5,16 4,20 9,23 7,20 41,20 39,23 44,20"}},{"tag":"polygon","attr":{"fill":"#78909C","points":"7,20 41,20 37,36 11,36"}}]})(props);
};
function FcPortraitMode (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF9800","d":"M22,38c-4.8,0-5-7-5-7v-6h10v6C27,31,26.8,38,22,38z"}},{"tag":"g","attr":{"fill":"#FFA726"},"child":[{"tag":"circle","attr":{"cx":"31","cy":"19","r":"2"}},{"tag":"circle","attr":{"cx":"13","cy":"19","r":"2"}}]},{"tag":"path","attr":{"fill":"#FFB74D","d":"M31,13c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,5,4,9,9,9s9-4,9-9C31,18.9,31,14.1,31,13z"}},{"tag":"path","attr":{"fill":"#424242","d":"M22,4c-6.1,0-10,4.9-10,11c0,0.8,0,2.3,0,2.3l2,1.7v-5l12-4l4,4v5l2-1.7c0,0,0-1.5,0-2.3c0-4-1-8-6-9l-1-2 H22z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"26","cy":"19","r":"1"}},{"tag":"circle","attr":{"cx":"18","cy":"19","r":"1"}}]},{"tag":"path","attr":{"fill":"#009688","d":"M27,31L27,31c0,0-1.8,2-5,2s-5-2-5-2S6,33,6,44h32C38,33,27,31,27,31z"}},{"tag":"g","attr":{"fill":"#FF9800"},"child":[{"tag":"rect","attr":{"x":"36.1","y":"6.1","transform":"matrix(.707 .707 -.707 .707 19.787 -25.77)","width":"9.9","height":"9.9"}},{"tag":"rect","attr":{"x":"36","y":"6","width":"10","height":"10"}}]},{"tag":"circle","attr":{"fill":"#FFEB3B","cx":"41","cy":"11","r":"3"}}]})(props);
};
function FcPositiveDynamic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"rect","attr":{"x":"19","y":"22","width":"10","height":"20"}},{"tag":"rect","attr":{"x":"32","y":"8","width":"10","height":"34"}},{"tag":"rect","attr":{"x":"6","y":"30","width":"10","height":"12"}}]},{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"11,8 21,18 21,8"}},{"tag":"rect","attr":{"x":"11","y":"8.9","transform":"matrix(-.707 -.707 .707 -.707 10.879 36.506)","width":"4","height":"14.1"}}]}]})(props);
};
function FcPrevious (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#2196F3","points":"30.9,43 34,39.9 18.1,24 34,8.1 30.9,5 12,24"}}]})(props);
};
function FcPrint (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"9","y":"11","fill":"#424242","width":"30","height":"3"}},{"tag":"path","attr":{"fill":"#616161","d":"M4,25h40v-7c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4V25z"}},{"tag":"path","attr":{"fill":"#424242","d":"M8,36h32c2.2,0,4-1.8,4-4v-8H4v8C4,34.2,5.8,36,8,36z"}},{"tag":"circle","attr":{"fill":"#00E676","cx":"40","cy":"18","r":"1"}},{"tag":"rect","attr":{"x":"11","y":"4","fill":"#90CAF9","width":"26","height":"10"}},{"tag":"path","attr":{"fill":"#242424","d":"M37.5,31h-27C9.7,31,9,30.3,9,29.5v0c0-0.8,0.7-1.5,1.5-1.5h27c0.8,0,1.5,0.7,1.5,1.5v0 C39,30.3,38.3,31,37.5,31z"}},{"tag":"rect","attr":{"x":"11","y":"31","fill":"#90CAF9","width":"26","height":"11"}},{"tag":"rect","attr":{"x":"11","y":"29","fill":"#42A5F5","width":"26","height":"2"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"rect","attr":{"x":"16","y":"33","width":"17","height":"2"}},{"tag":"rect","attr":{"x":"16","y":"37","width":"13","height":"2"}}]}]})(props);
};
function FcPrivacy (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#424242","d":"M24,4c-5.5,0-10,4.5-10,10v4h4v-4c0-3.3,2.7-6,6-6s6,2.7,6,6v4h4v-4C34,8.5,29.5,4,24,4z"}},{"tag":"path","attr":{"fill":"#FB8C00","d":"M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"}},{"tag":"circle","attr":{"fill":"#EFEBE9","cx":"24","cy":"31","r":"6"}},{"tag":"circle","attr":{"fill":"#1E88E5","cx":"24","cy":"31","r":"3"}},{"tag":"circle","attr":{"fill":"#fff","cx":"26","cy":"29","r":"1"}}]})(props);
};
function FcProcess (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#9C27B0"},"child":[{"tag":"polygon","attr":{"points":"31,8 42.9,9.6 33.1,19.4"}},{"tag":"polygon","attr":{"points":"17,40 5.1,38.4 14.9,28.6"}},{"tag":"polygon","attr":{"points":"8,17 9.6,5.1 19.4,14.9"}},{"tag":"path","attr":{"d":"M9.3,21.2L5.1,22C5,22.7,5,23.3,5,24c0,4.6,1.6,9,4.6,12.4l3-2.6C10.3,31.1,9,27.6,9,24 C9,23.1,9.1,22.1,9.3,21.2z"}},{"tag":"path","attr":{"d":"M24,5c-5.4,0-10.2,2.3-13.7,5.9l2.8,2.8C15.9,10.8,19.7,9,24,9c0.9,0,1.9,0.1,2.8,0.3l0.7-3.9 C26.4,5.1,25.2,5,24,5z"}},{"tag":"path","attr":{"d":"M38.7,26.8l4.2-0.8c0.1-0.7,0.1-1.3,0.1-2c0-4.4-1.5-8.7-4.3-12.1l-3.1,2.5c2.2,2.7,3.4,6.1,3.4,9.5 C39,24.9,38.9,25.9,38.7,26.8z"}},{"tag":"path","attr":{"d":"M34.9,34.3C32.1,37.2,28.3,39,24,39c-0.9,0-1.9-0.1-2.8-0.3l-0.7,3.9c1.2,0.2,2.4,0.3,3.5,0.3 c5.4,0,10.2-2.3,13.7-5.9L34.9,34.3z"}},{"tag":"polygon","attr":{"points":"40,31 38.4,42.9 28.6,33.1"}}]}]})(props);
};
function FcPuzzle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8BC34A","d":"M39,15c0-2.2-1.8-4-4-4h-6c-0.7,0-1.1-0.8-0.7-1.4c0.6-1,0.9-2.2,0.6-3.5c-0.4-2-1.9-3.6-3.8-4 C21.8,1.4,19,3.9,19,7c0,1,0.3,1.8,0.7,2.6c0.4,0.6,0,1.4-0.8,1.4h-6c-2.2,0-4,1.8-4,4v7c0,0.7,0.8,1.1,1.4,0.7 c1-0.6,2.2-0.9,3.5-0.6c2,0.4,3.6,1.9,4,3.8c0.7,3.2-1.8,6.1-4.9,6.1c-1,0-1.8-0.3-2.6-0.7C9.8,30.9,9,31.3,9,32v6c0,2.2,1.8,4,4,4 h22c2.2,0,4-1.8,4-4V15z"}}]})(props);
};
function FcQuestions (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#42A5F5","points":"36,44 8,44 8,8 28,8 36,16"}},{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,40 12,40 12,4 32,4 40,12"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,13 31,13 31,5.5"}},{"tag":"path","attr":{"fill":"#1976D2","d":"M24.5,28.3c0-4.7,3.6-4.4,3.6-7.2c0-0.7-0.2-2.1-2-2.1c-2,0-2.1,1.6-2.1,2h-2.7c0-0.7,0.3-4.2,4.8-4.2 c4.6,0,4.7,3.6,4.7,4.3c0,3.5-3.8,4-3.8,7.3H24.5z M24.3,31.8c0-0.2,0-1.5,1.5-1.5c1.4,0,1.5,1.3,1.5,1.5c0,0.4-0.2,1.4-1.5,1.4 C24.5,33.2,24.3,32.2,24.3,31.8z"}}]})(props);
};
function FcRadarPlot (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M38.4,13L24.1,6.4L4.6,12.1l8.8,13.2l-2.2,15.1h22.7l6.6-13.3L38.4,13z M32.1,37.5H14.7l1.8-12.9L9.4,13.9 l14.5-4.3L35.6,15l1.8,11.7L32.1,37.5z"}},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"8","r":"4"}},{"tag":"circle","attr":{"cx":"37","cy":"14","r":"4"}},{"tag":"circle","attr":{"cx":"39","cy":"27","r":"4"}},{"tag":"circle","attr":{"cx":"7","cy":"13","r":"4"}},{"tag":"circle","attr":{"cx":"13","cy":"39","r":"4"}},{"tag":"circle","attr":{"cx":"15","cy":"25","r":"4"}},{"tag":"circle","attr":{"cx":"33","cy":"39","r":"4"}}]}]})(props);
};
function FcRating (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#F44336","cx":"24","cy":"24","r":"21"}},{"tag":"polygon","attr":{"fill":"#FFCA28","points":"24,11 27.9,18.9 36.6,20.2 30.3,26.3 31.8,35 24,30.9 16.2,35 17.7,26.3 11.4,20.2 20.1,18.9"}}]})(props);
};
function FcRatings (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#42A5F5","points":"36,44 8,44 8,8 28,8 36,16"}},{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,40 12,40 12,4 32,4 40,12"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,13 31,13 31,5.5"}},{"tag":"polygon","attr":{"fill":"#1976D2","points":"34,20 27,20 29.4,22.4 27,24.9 23,20.9 16.9,26.9 19.1,29.1 23,25.1 27,29.1 31.6,24.6 34,27"}}]})(props);
};
function FcReadingEbook (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M33.5,27c-2.2-3-5.2-5-9.5-5s-7.3,2-9.5,5H33.5z"}},{"tag":"path","attr":{"fill":"#546E7A","d":"M34.1,43H13.9c-1.1,0-1.9-0.8-2-1.9l-0.8-13C11.1,27,12,26,13.1,26h21.8c1.2,0,2.1,1,2,2.1l-0.8,13 C36,42.2,35.2,43,34.1,43z"}},{"tag":"circle","attr":{"fill":"#B0BEC5","cx":"34","cy":"29","r":"1"}},{"tag":"g","attr":{"fill":"#FFB74D"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"12","r":"8"}},{"tag":"path","attr":{"d":"M16.1,42.4L15,43.5c-0.6,0.6-1.6,0.6-2.2,0l-3.3-3.3c-0.6-0.6-0.6-1.6,0-2.2l1.1-1.1c1.3-1.3,3.1-1.3,4.4,0 l1.1,1.1C17.3,39.3,17.3,41.2,16.1,42.4z"}},{"tag":"path","attr":{"d":"M31.9,38l1.1-1.1c1.3-1.3,3.1-1.3,4.4,0l1.1,1.1c0.6,0.6,0.6,1.6,0,2.2l-3.3,3.3c-0.6,0.6-1.6,0.6-2.2,0 l-1.1-1.1C30.7,41.2,30.7,39.3,31.9,38z"}}]}]})(props);
};
function FcReading (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#5C6BC0","d":"M40,40c-6.9,0-16,4-16,4V22c0,0,9-4,18-4L40,40z"}},{"tag":"path","attr":{"fill":"#7986CB","d":"M8,40c6.9,0,16,4,16,4V22c0,0-9-4-18-4L8,40z"}},{"tag":"g","attr":{"fill":"#FFB74D"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"12","r":"8"}},{"tag":"path","attr":{"d":"M41,32h1c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-1c-1.7,0-3,1.3-3,3v0C38,30.7,39.3,32,41,32z"}},{"tag":"path","attr":{"d":"M7,26H6c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h1c1.7,0,3-1.3,3-3v0C10,27.3,8.7,26,7,26z"}}]}]})(props);
};
function FcReddit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#FFFFFF","d":"M12.193,19.555c-1.94-1.741-4.79-1.727-6.365,0.029c-1.576,1.756-1.301,5.023,0.926,6.632L12.193,19.555z"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M35.807,19.555c1.939-1.741,4.789-1.727,6.365,0.029c1.575,1.756,1.302,5.023-0.927,6.632L35.807,19.555z"}},{"tag":"g","attr":{},"child":[{"tag":"circle","attr":{"fill":"#FFFFFF","cx":"38.32","cy":"10.475","r":"3.5"}}]},{"tag":"g","attr":{},"child":[{"tag":"ellipse","attr":{"fill":"#FFFFFF","cx":"24.085","cy":"28.611","rx":"18.085","ry":"12.946"}}]}]},{"tag":"g","attr":{},"child":[{"tag":"circle","attr":{"fill":"#D84315","cx":"30.365","cy":"26.39","r":"2.884"}},{"tag":"circle","attr":{"fill":"#D84315","cx":"17.635","cy":"26.39","r":"2.884"}}]},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M24.002,34.902c-3.252,0-6.14-0.745-8.002-1.902c1.024,2.044,4.196,4,8.002,4c3.802,0,6.976-1.956,7.998-4\r\n\t\tC30.143,34.157,27.254,34.902,24.002,34.902z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M41.83,27.026l-1.17-1.621c0.831-0.6,1.373-1.556,1.488-2.623c0.105-0.98-0.157-1.903-0.721-2.531\r\n\t\tc-0.571-0.637-1.391-0.99-2.307-0.994c-0.927,0.013-1.894,0.365-2.646,1.041l-1.336-1.488c1.123-1.008,2.545-1.523,3.991-1.553\r\n\t\tc1.488,0.007,2.833,0.596,3.786,1.658c0.942,1.05,1.387,2.537,1.221,4.081C43.961,24.626,43.121,26.096,41.83,27.026z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M6.169,27.026c-1.29-0.932-2.131-2.401-2.306-4.031c-0.166-1.543,0.279-3.03,1.221-4.079\r\n\t\tc0.953-1.062,2.297-1.651,3.785-1.658c0.009,0,0.018,0,0.027,0c1.441,0,2.849,0.551,3.965,1.553l-1.336,1.488\r\n\t\tc-0.753-0.676-1.689-1.005-2.646-1.041c-0.916,0.004-1.735,0.357-2.306,0.994c-0.563,0.628-0.826,1.55-0.721,2.53\r\n\t\tc0.115,1.067,0.657,2.023,1.488,2.624L6.169,27.026z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M25,16.84h-2c0-2.885,0-10.548,4.979-10.548c2.154,0,3.193,1.211,3.952,2.096\r\n\t\tc0.629,0.734,0.961,1.086,1.616,1.086h1.37v2h-1.37c-1.604,0-2.453-0.99-3.135-1.785c-0.67-0.781-1.198-1.398-2.434-1.398\r\n\t\tC25.975,8.292,25,11.088,25,16.84z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M24.085,16.95c9.421,0,17.085,5.231,17.085,11.661c0,6.431-7.664,11.662-17.085,11.662S7,35.042,7,28.611\r\n\t\tC7,22.181,14.664,16.95,24.085,16.95 M24.085,14.95C13.544,14.95,5,21.066,5,28.611c0,7.546,8.545,13.662,19.085,13.662\r\n\t\tc10.54,0,19.085-6.116,19.085-13.662C43.17,21.066,34.625,14.95,24.085,14.95L24.085,14.95z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M38.32,7.975c1.379,0,2.5,1.122,2.5,2.5s-1.121,2.5-2.5,2.5s-2.5-1.122-2.5-2.5S36.941,7.975,38.32,7.975\r\n\t\t M38.32,5.975c-2.484,0-4.5,2.015-4.5,4.5s2.016,4.5,4.5,4.5c2.486,0,4.5-2.015,4.5-4.5S40.807,5.975,38.32,5.975L38.32,5.975z"}}]}]})(props);
};
function FcRedo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"polygon","attr":{"points":"43,18 29,6.3 29,29.7"}},{"tag":"path","attr":{"d":"M20,14h12v8H20c-2.8,0-5,2.2-5,5s2.2,5,5,5h3v8h-3c-7.2,0-13-5.8-13-13S12.8,14,20,14z"}}]}]})(props);
};
function FcRefresh (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"path","attr":{"d":"M13,13c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6h4c0-5.5-4.5-10-10-10H19C13.5,3,9,7.5,9,13v11.2h4V13z"}},{"tag":"polygon","attr":{"points":"4.6,22 11,30.4 17.4,22"}}]},{"tag":"g","attr":{"fill":"#1565C0"},"child":[{"tag":"path","attr":{"d":"M35,35c0,3.3-2.7,6-6,6H19c-3.3,0-6-2.7-6-6H9c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V23h-4V35z"}},{"tag":"polygon","attr":{"points":"30.6,26 37,17.6 43.4,26"}}]}]})(props);
};
function FcRegisteredTrademark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"path","attr":{"fill":"#E1BEE7","d":"M25,26.8h-4.5v9h-4V12.5h8.2c1.3,0,2.5,0.2,3.6,0.5c1,0.3,1.9,0.8,2.6,1.3c0.7,0.6,1.3,1.3,1.6,2.2 s0.6,1.9,0.6,3c0,1.6-0.4,2.9-1.1,3.9c-0.8,1-1.8,1.9-3.1,2.4l5.2,9.7v0.2h-4.3L25,26.8z M20.5,23.6h4.2c0.7,0,1.4-0.1,1.9-0.3 c0.5-0.2,1-0.5,1.4-0.8c0.4-0.3,0.6-0.7,0.8-1.2c0.2-0.5,0.3-1,0.3-1.6c0-0.6-0.1-1.1-0.3-1.6c-0.2-0.5-0.4-0.9-0.8-1.2 c-0.4-0.3-0.8-0.6-1.4-0.8c-0.5-0.2-1.2-0.3-2-0.3h-4.1V23.6z"}}]})(props);
};
function FcRemoveImage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8CBCD6","d":"M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"}},{"tag":"circle","attr":{"fill":"#B3DDF5","cx":"35","cy":"16","r":"3"}},{"tag":"polygon","attr":{"fill":"#9AC9E3","points":"20,16 9,32 31,32"}},{"tag":"polygon","attr":{"fill":"#B3DDF5","points":"31,22 23,32 39,32"}},{"tag":"circle","attr":{"fill":"#F44336","cx":"38","cy":"38","r":"10"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 .707 -.707 -.707 91.74 38)","width":"3","height":"12"}},{"tag":"rect","attr":{"x":"36.5","y":"32","transform":"matrix(-.707 -.707 .707 -.707 38 91.74)","width":"3","height":"12"}}]}]})(props);
};
function FcReuse (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#455A64","points":"12.1,42 17.2,42 16.5,18.2 10.9,20.2"}},{"tag":"circle","attr":{"fill":"#FFB74D","cx":"36.5","cy":"10","r":"5"}},{"tag":"polygon","attr":{"fill":"#607D8B","points":"11,42 6,42 7.8,18.6 14.2,20.9"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M31.7,15.9c-0.6-2-1.3-4-2.5-5.8c-1.3-1.6-3.2-3.1-6.1-2c-3.1,1.3-9.2,3.6-11.2,4.5 c-2.3,1.1-4.1,2.7-4.1,5.9c0,3.4,4.3,5.3,4.3,5.3l14.7-6.1l1.7,4.5l5.3,0.1C33.8,22.4,32.3,17.9,31.7,15.9z"}},{"tag":"path","attr":{"fill":"#B39DDB","d":"M37.9,42h-7.9c-1,0-1.8-0.7-2-1.7l-2.6-17.1h17l-2.6,17.1C39.8,41.3,38.9,42,37.9,42z"}},{"tag":"path","attr":{"fill":"#7E57C2","d":"M42,24H26c-0.6,0-1-0.4-1-1v0c0-0.6,0.4-1,1-1h16c0.6,0,1,0.4,1,1v0C43,23.6,42.6,24,42,24z"}}]})(props);
};
function FcRightDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"41,41 23,41 41,23"}},{"tag":"rect","attr":{"x":"17.4","y":"5","transform":"matrix(.707 -.707 .707 .707 -8.854 21.374)","fill":"#3F51B5","width":"8","height":"32.7"}}]})(props);
};
function FcRightDown2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"29,44 17.3,30 40.7,30"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M21,6H8v8h13c2.2,0,4,1.8,4,4v17h8V18C33,11.4,27.6,6,21,6z"}}]})(props);
};
function FcRightUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"41,7 41,25 23,7"}},{"tag":"rect","attr":{"x":"17.4","y":"10.3","transform":"matrix(-.707 -.707 .707 -.707 17.661 60.567)","fill":"#3F51B5","width":"8","height":"32.7"}}]})(props);
};
function FcRightUp2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"29,4 17.3,18 40.7,18"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M21,42H8v-8h13c2.2,0,4-1.8,4-4V13h8v17C33,36.6,27.6,42,21,42z"}}]})(props);
};
function FcRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"44,24 30,35.7 30,12.3"}},{"tag":"rect","attr":{"x":"6","y":"20","width":"27","height":"8"}}]}]})(props);
};
function FcRotateCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#5E35B1"},"child":[{"tag":"path","attr":{"d":"M33.9,12.1H14.2L17.6,7c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,12.1z"}},{"tag":"path","attr":{"d":"M14,11H8V9.2C8,8.5,8.5,8,9.2,8h3.6C13.5,8,14,8.5,14,9.2V11z"}},{"tag":"path","attr":{"d":"M40,42H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,40.2,42.2,42,40,42z"}}]},{"tag":"path","attr":{"fill":"#E8EAF6","d":"M34,25c0-5.5-4.5-10-10-10s-10,4.5-10,10s4.5,10,10,10v-2c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8h-3.5 l4.5,5.6l4.5-5.6H34z"}}]})(props);
};
function FcRotateToLandscape (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M10,41V7c0-2.2,1.8-4,4-4h20c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H14C11.8,45,10,43.2,10,41z"}},{"tag":"path","attr":{"fill":"#F3E5F5","d":"M34,6H14c-0.6,0-1,0.4-1,1v34c0,0.6,0.4,1,1,1h20c0.6,0,1-0.4,1-1V7C35,6.4,34.6,6,34,6z"}},{"tag":"polygon","attr":{"fill":"#9C27B0","points":"22,34 27.9,27 16.1,27"}},{"tag":"path","attr":{"fill":"#9C27B0","d":"M26,16c-3.3,0-6,2.7-6,6v6h4v-6c0-1.1,0.9-2,2-2s2,0.9,2,2v2h4v-2C32,18.7,29.3,16,26,16z"}}]})(props);
};
function FcRotateToPortrait (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M41,38H7c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h34c2.2,0,4,1.8,4,4v20C45,36.2,43.2,38,41,38z"}},{"tag":"path","attr":{"fill":"#F3E5F5","d":"M6,14v20c0,0.6,0.4,1,1,1h34c0.6,0,1-0.4,1-1V14c0-0.6-0.4-1-1-1H7C6.4,13,6,13.4,6,14z"}},{"tag":"polygon","attr":{"fill":"#9C27B0","points":"26,15 20.1,22 31.9,22"}},{"tag":"path","attr":{"fill":"#9C27B0","d":"M24,21v6c0,1.1-0.9,2-2,2s-2-0.9-2-2v-2h-4v2c0,3.3,2.7,6,6,6s6-2.7,6-6v-6H24z"}}]})(props);
};
function FcRuler (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"16.7","y":"1.6","transform":"matrix(-.707 -.707 .707 -.707 24 57.941)","fill":"#FFA000","width":"14.6","height":"44.8"}},{"tag":"g","attr":{"fill":"#9E6400"},"child":[{"tag":"rect","attr":{"x":"17.9","y":"20.2","transform":"matrix(-.707 -.707 .707 -.707 21.177 51.125)","width":"6.6","height":"2"}},{"tag":"rect","attr":{"x":"22.3","y":"15.2","transform":"matrix(-.707 -.707 .707 -.707 29.833 44.71)","width":"3.7","height":"2"}},{"tag":"rect","attr":{"x":"25.9","y":"12.2","transform":"matrix(-.707 -.707 .707 -.707 40.49 43.125)","width":"6.6","height":"2"}},{"tag":"rect","attr":{"x":"31.2","y":"6.3","transform":"matrix(.707 -.707 .707 .707 3.643 25.147)","width":"2","height":"3.7"}},{"tag":"rect","attr":{"x":"6.3","y":"31.2","transform":"matrix(-.707 -.707 .707 -.707 -8.794 60.71)","width":"3.7","height":"2"}},{"tag":"rect","attr":{"x":"9.9","y":"28.2","transform":"matrix(-.707 -.707 .707 -.707 1.863 59.125)","width":"6.6","height":"2"}},{"tag":"rect","attr":{"x":"14.3","y":"23.2","transform":"matrix(-.707 -.707 .707 -.707 10.52 52.71)","width":"3.7","height":"2"}}]}]})(props);
};
function FcRules (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#42A5F5","d":"M39,45H9c0,0-3-0.1-3-8h36C42,44.9,39,45,39,45z"}},{"tag":"rect","attr":{"x":"8","y":"3","fill":"#90CAF9","width":"32","height":"34"}},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"rect","attr":{"x":"18","y":"15","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"18","y":"19","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"18","y":"23","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"18","y":"27","width":"16","height":"2"}},{"tag":"rect","attr":{"x":"18","y":"31","width":"16","height":"2"}}]},{"tag":"g","attr":{"fill":"#1976D2"},"child":[{"tag":"rect","attr":{"x":"14","y":"15","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"14","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"14","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"14","y":"27","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"14","y":"31","width":"2","height":"2"}}]}]})(props);
};
function FcSafe (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"8","y":"39","fill":"#455A64","width":"6","height":"3"}},{"tag":"rect","attr":{"x":"34","y":"39","fill":"#455A64","width":"6","height":"3"}},{"tag":"path","attr":{"fill":"#78909C","d":"M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"}},{"tag":"path","attr":{"fill":"#90A4AE","d":"M40,38H8c-0.6,0-1-0.4-1-1V11c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1v26C41,37.6,40.6,38,40,38z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M29,14c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C39,18.5,34.5,14,29,14z M29,31 c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7s7,3.1,7,7C36,27.9,32.9,31,29,31z"}},{"tag":"g","attr":{"fill":"#B0BEC5"},"child":[{"tag":"path","attr":{"d":"M35.3,19.1l0.4-0.4c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-0.4,0.4C34.4,18.1,34.9,18.6,35.3,19.1z"}},{"tag":"path","attr":{"d":"M22.7,19.1c0.4-0.5,0.9-1,1.4-1.4l-0.4-0.4c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L22.7,19.1z"}},{"tag":"path","attr":{"d":"M21,24c0-0.3,0-0.7,0.1-1h-0.6c-0.6,0-1,0.4-1,1s0.4,1,1,1h0.6C21,24.7,21,24.3,21,24z"}},{"tag":"path","attr":{"d":"M29,16c0.3,0,0.7,0,1,0.1v-0.6c0-0.6-0.4-1-1-1s-1,0.4-1,1v0.6C28.3,16,28.7,16,29,16z"}},{"tag":"path","attr":{"d":"M35.3,28.9c-0.4,0.5-0.9,1-1.4,1.4l0.4,0.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4 L35.3,28.9z"}},{"tag":"path","attr":{"d":"M22.7,28.9l-0.4,0.4c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l0.4-0.4 C23.6,29.9,23.1,29.4,22.7,28.9z"}},{"tag":"path","attr":{"d":"M37.5,23h-0.6c0,0.3,0.1,0.7,0.1,1s0,0.7-0.1,1h0.6c0.6,0,1-0.4,1-1S38.1,23,37.5,23z"}},{"tag":"path","attr":{"d":"M29,32c-0.3,0-0.7,0-1-0.1v0.6c0,0.6,0.4,1,1,1s1-0.4,1-1v-0.6C29.7,32,29.3,32,29,32z"}}]},{"tag":"path","attr":{"fill":"#455A64","d":"M12,20c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2s2-0.9,2-2v-8C14,20.9,13.1,20,12,20z"}},{"tag":"path","attr":{"fill":"#CFD8DC","d":"M12,18c-1.1,0-2,0.9-2,2v8c0,1.1,0.9,2,2,2s2-0.9,2-2v-8C14,18.9,13.1,18,12,18z"}}]})(props);
};
function FcSalesPerformance (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"path","attr":{"d":"M38,13c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,12.1,41.3,13,38,13 z"}},{"tag":"path","attr":{"d":"M38,10c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,9.1,41.3,10,38,10z"}},{"tag":"path","attr":{"d":"M38,16c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,15.1,41.3,16,38,16 z"}},{"tag":"path","attr":{"d":"M38,19c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,18.1,41.3,19,38,19 z"}},{"tag":"path","attr":{"d":"M38,22c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,21.1,41.3,22,38,22 z"}},{"tag":"path","attr":{"d":"M38,25c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,24.1,41.3,25,38,25 z"}},{"tag":"path","attr":{"d":"M38,28c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,27.1,41.3,28,38,28 z"}},{"tag":"path","attr":{"d":"M38,31c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,30.1,41.3,31,38,31 z"}},{"tag":"path","attr":{"d":"M38,34c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,33.1,41.3,34,38,34 z"}},{"tag":"path","attr":{"d":"M38,37c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,36.1,41.3,37,38,37 z"}},{"tag":"path","attr":{"d":"M38,40c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C44,39.1,41.3,40,38,40 z"}}]},{"tag":"g","attr":{"fill":"#FFC107"},"child":[{"tag":"ellipse","attr":{"cx":"38","cy":"8","rx":"6","ry":"2"}},{"tag":"path","attr":{"d":"M38,12c-2.8,0-5.1-0.6-5.8-1.5C32.1,10.7,32,10.8,32,11c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,11.4,40.8,12,38,12z"}},{"tag":"path","attr":{"d":"M38,15c-2.8,0-5.1-0.6-5.8-1.5C32.1,13.7,32,13.8,32,14c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,14.4,40.8,15,38,15z"}},{"tag":"path","attr":{"d":"M38,18c-2.8,0-5.1-0.6-5.8-1.5C32.1,16.7,32,16.8,32,17c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,17.4,40.8,18,38,18z"}},{"tag":"path","attr":{"d":"M38,21c-2.8,0-5.1-0.6-5.8-1.5C32.1,19.7,32,19.8,32,20c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,20.4,40.8,21,38,21z"}},{"tag":"path","attr":{"d":"M38,24c-2.8,0-5.1-0.6-5.8-1.5C32.1,22.7,32,22.8,32,23c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,23.4,40.8,24,38,24z"}},{"tag":"path","attr":{"d":"M38,27c-2.8,0-5.1-0.6-5.8-1.5C32.1,25.7,32,25.8,32,26c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,26.4,40.8,27,38,27z"}},{"tag":"path","attr":{"d":"M38,30c-2.8,0-5.1-0.6-5.8-1.5C32.1,28.7,32,28.8,32,29c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,29.4,40.8,30,38,30z"}},{"tag":"path","attr":{"d":"M38,33c-2.8,0-5.1-0.6-5.8-1.5C32.1,31.7,32,31.8,32,32c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,32.4,40.8,33,38,33z"}},{"tag":"path","attr":{"d":"M38,36c-2.8,0-5.1-0.6-5.8-1.5C32.1,34.7,32,34.8,32,35c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,35.4,40.8,36,38,36z"}},{"tag":"path","attr":{"d":"M38,39c-2.8,0-5.1-0.6-5.8-1.5C32.1,37.7,32,37.8,32,38c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C43.1,38.4,40.8,39,38,39z"}}]},{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"path","attr":{"d":"M10,19c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,18.1,13.3,19,10,19 z"}},{"tag":"path","attr":{"d":"M10,16c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,15.1,13.3,16,10,16 z"}},{"tag":"path","attr":{"d":"M10,22c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,21.1,13.3,22,10,22 z"}},{"tag":"path","attr":{"d":"M10,25c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,24.1,13.3,25,10,25 z"}},{"tag":"path","attr":{"d":"M10,28c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,27.1,13.3,28,10,28 z"}},{"tag":"path","attr":{"d":"M10,31c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,30.1,13.3,31,10,31 z"}},{"tag":"path","attr":{"d":"M10,34c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,33.1,13.3,34,10,34 z"}},{"tag":"path","attr":{"d":"M10,37c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,36.1,13.3,37,10,37 z"}},{"tag":"path","attr":{"d":"M10,40c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C16,39.1,13.3,40,10,40 z"}}]},{"tag":"g","attr":{"fill":"#FFC107"},"child":[{"tag":"ellipse","attr":{"cx":"10","cy":"14","rx":"6","ry":"2"}},{"tag":"path","attr":{"d":"M10,18c-2.8,0-5.1-0.6-5.8-1.5C4.1,16.7,4,16.8,4,17c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,17.4,12.8,18,10,18z"}},{"tag":"path","attr":{"d":"M10,21c-2.8,0-5.1-0.6-5.8-1.5C4.1,19.7,4,19.8,4,20c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,20.4,12.8,21,10,21z"}},{"tag":"path","attr":{"d":"M10,24c-2.8,0-5.1-0.6-5.8-1.5C4.1,22.7,4,22.8,4,23c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,23.4,12.8,24,10,24z"}},{"tag":"path","attr":{"d":"M10,27c-2.8,0-5.1-0.6-5.8-1.5C4.1,25.7,4,25.8,4,26c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,26.4,12.8,27,10,27z"}},{"tag":"path","attr":{"d":"M10,30c-2.8,0-5.1-0.6-5.8-1.5C4.1,28.7,4,28.8,4,29c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,29.4,12.8,30,10,30z"}},{"tag":"path","attr":{"d":"M10,33c-2.8,0-5.1-0.6-5.8-1.5C4.1,31.7,4,31.8,4,32c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,32.4,12.8,33,10,33z"}},{"tag":"path","attr":{"d":"M10,36c-2.8,0-5.1-0.6-5.8-1.5C4.1,34.7,4,34.8,4,35c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,35.4,12.8,36,10,36z"}},{"tag":"path","attr":{"d":"M10,39c-2.8,0-5.1-0.6-5.8-1.5C4.1,37.7,4,37.8,4,38c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C15.1,38.4,12.8,39,10,39z"}}]},{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"path","attr":{"d":"M24,28c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,27.1,27.3,28,24,28 z"}},{"tag":"path","attr":{"d":"M24,25c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,24.1,27.3,25,24,25 z"}},{"tag":"path","attr":{"d":"M24,31c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,30.1,27.3,31,24,31 z"}},{"tag":"path","attr":{"d":"M24,34c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,33.1,27.3,34,24,34 z"}},{"tag":"path","attr":{"d":"M24,37c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,36.1,27.3,37,24,37 z"}},{"tag":"path","attr":{"d":"M24,40c-3.3,0-6-0.9-6-2c0,0.4,0,1.6,0,2c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.4,0-1.6,0-2C30,39.1,27.3,40,24,40 z"}}]},{"tag":"g","attr":{"fill":"#FFC107"},"child":[{"tag":"ellipse","attr":{"cx":"24","cy":"23","rx":"6","ry":"2"}},{"tag":"path","attr":{"d":"M24,27c-2.8,0-5.1-0.6-5.8-1.5C18.1,25.7,18,25.8,18,26c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C29.1,26.4,26.8,27,24,27z"}},{"tag":"path","attr":{"d":"M24,30c-2.8,0-5.1-0.6-5.8-1.5C18.1,28.7,18,28.8,18,29c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C29.1,29.4,26.8,30,24,30z"}},{"tag":"path","attr":{"d":"M24,33c-2.8,0-5.1-0.6-5.8-1.5C18.1,31.7,18,31.8,18,32c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C29.1,32.4,26.8,33,24,33z"}},{"tag":"path","attr":{"d":"M24,36c-2.8,0-5.1-0.6-5.8-1.5C18.1,34.7,18,34.8,18,35c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C29.1,35.4,26.8,36,24,36z"}},{"tag":"path","attr":{"d":"M24,39c-2.8,0-5.1-0.6-5.8-1.5C18.1,37.7,18,37.8,18,38c0,1.1,2.7,2,6,2s6-0.9,6-2c0-0.2-0.1-0.3-0.2-0.5 C29.1,38.4,26.8,39,24,39z"}}]}]})(props);
};
function FcScatterPlot (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#CFD8DC","points":"9,39 9,6 7,6 7,41 42,41 42,39"}},{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"circle","attr":{"cx":"39","cy":"11","r":"3"}},{"tag":"circle","attr":{"cx":"31","cy":"13","r":"3"}},{"tag":"circle","attr":{"cx":"37","cy":"19","r":"3"}},{"tag":"circle","attr":{"cx":"34","cy":"26","r":"3"}},{"tag":"circle","attr":{"cx":"28","cy":"20","r":"3"}},{"tag":"circle","attr":{"cx":"26","cy":"28","r":"3"}},{"tag":"circle","attr":{"cx":"20","cy":"23","r":"3"}},{"tag":"circle","attr":{"cx":"21","cy":"33","r":"3"}},{"tag":"circle","attr":{"cx":"14","cy":"30","r":"3"}}]}]})(props);
};
function FcSearch (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#616161"},"child":[{"tag":"rect","attr":{"x":"34.6","y":"28.1","transform":"matrix(.707 -.707 .707 .707 -15.154 36.586)","width":"4","height":"17"}},{"tag":"circle","attr":{"cx":"20","cy":"20","r":"16"}}]},{"tag":"rect","attr":{"x":"36.2","y":"32.1","transform":"matrix(.707 -.707 .707 .707 -15.839 38.239)","fill":"#37474F","width":"4","height":"12.3"}},{"tag":"circle","attr":{"fill":"#64B5F6","cx":"20","cy":"20","r":"13"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"}}]})(props);
};
function FcSelfServiceKiosk (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#546E7A","d":"M44,30H4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4V30z"}},{"tag":"path","attr":{"fill":"#64B5F6","d":"M40,27H8c-0.6,0-1-0.4-1-1V11c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1v15C41,26.6,40.6,27,40,27z"}},{"tag":"path","attr":{"fill":"#78909C","d":"M40,41H8c-2.2,0-4-1.8-4-4v-7h40v7C44,39.2,42.2,41,40,41z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"rect","attr":{"x":"27","y":"34","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"9","y":"34","width":"12","height":"2"}},{"tag":"path","attr":{"d":"M18,35c0,1.1-1.3,2-3,2s-3-0.9-3-2H18z"}}]}]})(props);
};
function FcSelfie (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFB74D","d":"M32.9,22c0-0.3,0.1-0.7,0.1-1c0-1.1,0-5.9,0-7c0-7.6-18-5-18,0c0,1.1,0,5.9,0,7c0,0.3,0,0.7,0.1,1H32.9z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M40,44H8c-2.2,0-4-1.8-4-4V26c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v14C44,42.2,42.2,44,40,44z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M7,26v14c0,0.6,0.4,1,1,1h29c0.6,0,1-0.4,1-1V26c0-0.6-0.4-1-1-1H8C7.4,25,7,25.4,7,26z"}},{"tag":"rect","attr":{"x":"40","y":"30","fill":"#78909C","width":"2","height":"6"}},{"tag":"rect","attr":{"x":"19","y":"32","fill":"#BF360C","width":"8","height":"9"}},{"tag":"rect","attr":{"x":"20.5","y":"37.5","fill":"#FF9800","width":"5","height":"3.5"}},{"tag":"path","attr":{"fill":"#FFB74D","d":"M27.5,32c0-3.8-9-2.5-9,0c0,0.5,0,3,0,3.5c0,2.5,2,4.5,4.5,4.5s4.5-2,4.5-4.5C27.5,35,27.5,32.5,27.5,32z"}},{"tag":"g","attr":{"fill":"#784719"},"child":[{"tag":"circle","attr":{"cx":"28","cy":"21","r":"1"}},{"tag":"circle","attr":{"cx":"20","cy":"21","r":"1"}},{"tag":"circle","attr":{"cx":"25","cy":"35.5","r":".5"}},{"tag":"circle","attr":{"cx":"21","cy":"35.5","r":".5"}}]},{"tag":"g","attr":{"fill":"#FF5722"},"child":[{"tag":"path","attr":{"d":"M23,27c-3,0-8,1.3-8,11l4,3v-6.5l6-3.5l2,2.5V41l4-3c0-2-0.8-10-6-10l-0.5-1H23z"}},{"tag":"path","attr":{"d":"M16,22v-3l12-7l4,5v5h6.8C38.3,15.8,36.1,6,28,6l-1-2h-3C18.5,4,10.7,6.8,9.2,22H16z"}}]}]})(props);
};
function FcSerialTasks (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#90CAF9","d":"M33,9H11v4h22c1.1,0,2,0.9,2,2v20H23v4h16V15C39,11.7,36.3,9,33,9z"}},{"tag":"rect","attr":{"x":"6","y":"6","fill":"#D81B60","width":"10","height":"10"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"32","y":"17","width":"10","height":"10"}},{"tag":"rect","attr":{"x":"16","y":"32","width":"10","height":"10"}},{"tag":"circle","attr":{"cx":"26","cy":"11","r":"5"}},{"tag":"circle","attr":{"cx":"37","cy":"37","r":"5"}}]}]})(props);
};
function FcServiceMark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"g","attr":{"fill":"#E1BEE7"},"child":[{"tag":"path","attr":{"d":"M16.7,28.2c0-3.8-7.3-2.2-7.3-8.1c0-0.7,0.4-4.8,5.5-4.8c5.1,0,5.4,4.5,5.4,5.3h-3.5c0-0.4,0-2.5-2-2.5 c-1.8,0-1.9,1.7-1.9,2c0,3,7.4,2,7.4,8.1c0,2-1.1,4.8-5.3,4.8C10.3,33,9,29.6,9,27.3h3.5c0,0.5-0.2,2.8,2.5,2.8 C16.8,30.2,16.7,28.5,16.7,28.2z"}},{"tag":"path","attr":{"d":"M27.1,15.6L30.3,28l3.2-12.4h4.5v17.2h-3.5v-4.6l0.3-7.2l-3.4,11.8h-2.4l-3.4-11.8l0.3,7.2v4.6h-3.5V15.6 H27.1z"}}]}]})(props);
};
function FcServices (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E65100","d":"M25.6,34.4c0.1-0.4,0.1-0.9,0.1-1.4s0-0.9-0.1-1.4l2.8-2c0.3-0.2,0.4-0.6,0.2-0.9l-2.7-4.6 c-0.2-0.3-0.5-0.4-0.8-0.3L22,25.3c-0.7-0.6-1.5-1-2.4-1.4l-0.3-3.4c0-0.3-0.3-0.6-0.6-0.6h-5.3c-0.3,0-0.6,0.3-0.6,0.6L12.4,24 c-0.9,0.3-1.6,0.8-2.4,1.4l-3.1-1.4c-0.3-0.1-0.7,0-0.8,0.3l-2.7,4.6c-0.2,0.3-0.1,0.7,0.2,0.9l2.8,2c-0.1,0.4-0.1,0.9-0.1,1.4 s0,0.9,0.1,1.4l-2.8,2c-0.3,0.2-0.4,0.6-0.2,0.9l2.7,4.6c0.2,0.3,0.5,0.4,0.8,0.3l3.1-1.4c0.7,0.6,1.5,1,2.4,1.4l0.3,3.4 c0,0.3,0.3,0.6,0.6,0.6h5.3c0.3,0,0.6-0.3,0.6-0.6l0.3-3.4c0.9-0.3,1.6-0.8,2.4-1.4l3.1,1.4c0.3,0.1,0.7,0,0.8-0.3l2.7-4.6 c0.2-0.3,0.1-0.7-0.2-0.9L25.6,34.4z M16,38c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5c2.8,0,5,2.2,5,5C21,35.8,18.8,38,16,38z"}},{"tag":"path","attr":{"fill":"#FFA000","d":"M41.9,15.3C42,14.8,42,14.4,42,14s0-0.8-0.1-1.3l2.5-1.8c0.3-0.2,0.3-0.5,0.2-0.8l-2.5-4.3 c-0.2-0.3-0.5-0.4-0.8-0.2l-2.9,1.3c-0.7-0.5-1.4-0.9-2.2-1.3l-0.3-3.1C36,2.2,35.8,2,35.5,2h-4.9c-0.3,0-0.6,0.2-0.6,0.5l-0.3,3.1 c-0.8,0.3-1.5,0.7-2.2,1.3l-2.9-1.3c-0.3-0.1-0.6,0-0.8,0.2l-2.5,4.3c-0.2,0.3-0.1,0.6,0.2,0.8l2.5,1.8C24,13.2,24,13.6,24,14 s0,0.8,0.1,1.3l-2.5,1.8c-0.3,0.2-0.3,0.5-0.2,0.8l2.5,4.3c0.2,0.3,0.5,0.4,0.8,0.2l2.9-1.3c0.7,0.5,1.4,0.9,2.2,1.3l0.3,3.1 c0,0.3,0.3,0.5,0.6,0.5h4.9c0.3,0,0.6-0.2,0.6-0.5l0.3-3.1c0.8-0.3,1.5-0.7,2.2-1.3l2.9,1.3c0.3,0.1,0.6,0,0.8-0.2l2.5-4.3 c0.2-0.3,0.1-0.6-0.2-0.8L41.9,15.3z M33,19c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5c2.8,0,5,2.2,5,5C38,16.8,35.8,19,33,19z"}}]})(props);
};
function FcSettings (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#607D8B","d":"M39.6,27.2c0.1-0.7,0.2-1.4,0.2-2.2s-0.1-1.5-0.2-2.2l4.5-3.2c0.4-0.3,0.6-0.9,0.3-1.4L40,10.8 c-0.3-0.5-0.8-0.7-1.3-0.4l-5,2.3c-1.2-0.9-2.4-1.6-3.8-2.2l-0.5-5.5c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9l-0.5,5.5 c-1.4,0.6-2.7,1.3-3.8,2.2l-5-2.3c-0.5-0.2-1.1,0-1.3,0.4l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4l4.5,3.2c-0.1,0.7-0.2,1.4-0.2,2.2 s0.1,1.5,0.2,2.2L4,30.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,39.2c0.3,0.5,0.8,0.7,1.3,0.4l5-2.3c1.2,0.9,2.4,1.6,3.8,2.2l0.5,5.5 c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.5-5.5c1.4-0.6,2.7-1.3,3.8-2.2l5,2.3c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4 c0.3-0.5,0.1-1.1-0.3-1.4L39.6,27.2z M24,35c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10C34,30.5,29.5,35,24,35z"}},{"tag":"path","attr":{"fill":"#455A64","d":"M24,13c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12s12-5.4,12-12C36,18.4,30.6,13,24,13z M24,30 c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5s5,2.2,5,5C29,27.8,26.8,30,24,30z"}}]})(props);
};
function FcShare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#1976D2","d":"M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24 s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"}},{"tag":"g","attr":{"fill":"#1E88E5"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"24","r":"7"}},{"tag":"circle","attr":{"cx":"37","cy":"14","r":"7"}},{"tag":"circle","attr":{"cx":"37","cy":"34","r":"7"}}]}]})(props);
};
function FcShipped (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#8BC34A","d":"M43,36H29V14h10.6c0.9,0,1.6,0.6,1.9,1.4L45,26v8C45,35.1,44.1,36,43,36z"}},{"tag":"path","attr":{"fill":"#388E3C","d":"M29,36H5c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2V36z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"circle","attr":{"cx":"37","cy":"36","r":"5"}},{"tag":"circle","attr":{"cx":"13","cy":"36","r":"5"}}]},{"tag":"g","attr":{"fill":"#78909C"},"child":[{"tag":"circle","attr":{"cx":"37","cy":"36","r":"2"}},{"tag":"circle","attr":{"cx":"13","cy":"36","r":"2"}}]},{"tag":"path","attr":{"fill":"#37474F","d":"M41,25h-7c-0.6,0-1-0.4-1-1v-7c0-0.6,0.4-1,1-1h5.3c0.4,0,0.8,0.3,0.9,0.7l1.7,5.2c0,0.1,0.1,0.2,0.1,0.3V24 C42,24.6,41.6,25,41,25z"}},{"tag":"polygon","attr":{"fill":"#DCEDC8","points":"21.8,13.8 13.9,21.7 10.2,17.9 8,20.1 13.9,26 24,15.9"}}]})(props);
};
function FcShop (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"5","y":"19","fill":"#CFD8DC","width":"38","height":"19"}},{"tag":"rect","attr":{"x":"5","y":"38","fill":"#B0BEC5","width":"38","height":"4"}},{"tag":"rect","attr":{"x":"27","y":"24","fill":"#455A64","width":"12","height":"18"}},{"tag":"rect","attr":{"x":"9","y":"24","fill":"#E3F2FD","width":"14","height":"11"}},{"tag":"rect","attr":{"x":"10","y":"25","fill":"#1E88E5","width":"12","height":"9"}},{"tag":"path","attr":{"fill":"#90A4AE","d":"M36.5,33.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S37,36.3,37,36v-2C37,33.7,36.8,33.5,36.5,33.5z"}},{"tag":"g","attr":{"fill":"#558B2F"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"19","r":"3"}},{"tag":"circle","attr":{"cx":"36","cy":"19","r":"3"}},{"tag":"circle","attr":{"cx":"12","cy":"19","r":"3"}}]},{"tag":"path","attr":{"fill":"#7CB342","d":"M40,6H8C6.9,6,6,6.9,6,8v3h36V8C42,6.9,41.1,6,40,6z"}},{"tag":"rect","attr":{"x":"21","y":"11","fill":"#7CB342","width":"6","height":"8"}},{"tag":"polygon","attr":{"fill":"#7CB342","points":"37,11 32,11 33,19 39,19"}},{"tag":"polygon","attr":{"fill":"#7CB342","points":"11,11 16,11 15,19 9,19"}},{"tag":"g","attr":{"fill":"#FFA000"},"child":[{"tag":"circle","attr":{"cx":"30","cy":"19","r":"3"}},{"tag":"path","attr":{"d":"M45,19c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3L45,19z"}},{"tag":"circle","attr":{"cx":"18","cy":"19","r":"3"}},{"tag":"path","attr":{"d":"M3,19c0,1.7,1.3,3,3,3s3-1.3,3-3s-1.3-3-3-3L3,19z"}}]},{"tag":"g","attr":{"fill":"#FFC107"},"child":[{"tag":"polygon","attr":{"points":"32,11 27,11 27,19 33,19"}},{"tag":"polygon","attr":{"points":"42,11 37,11 39,19 45,19"}},{"tag":"polygon","attr":{"points":"16,11 21,11 21,19 15,19"}},{"tag":"polygon","attr":{"points":"6,11 11,11 9,19 3,19"}}]}]})(props);
};
function FcSignature (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#1565C0","d":"M38.8,28.2C41.5,24.8,45,20.1,45,12c0-0.6-0.4-1-1-1s-1,0.4-1,1c0,6.7-2.5,10.7-5,13.9c-0.6-1.9-1-4.2-1-6.9 c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c-0.1,1.7-0.6,3.6-1,3.8c-0.4,0-0.9-1.4-1-2.8c0-0.5-0.5-0.9-1-0.9c-0.5,0-1,0.3-1,0.9 c-0.3,1.7-1.1,4.1-2,4.1c-0.4,0-0.6-0.1-0.7-0.3c-0.3-0.3-0.4-1-0.4-1.6c0-0.4,0.1-0.8,0.1-1.2c0-0.5-0.4-1-0.9-1 c-0.5,0-1,0.3-1.1,0.8c0,0.1-0.1,0.5-0.1,1.1C25.7,23.6,25.1,27,23,27c-0.7,0-1.1-0.2-1.4-0.7c-0.5-0.8-0.5-2.1,0-3.3c0,0,0,0,0-0.1 c0.1-0.1,0.1-0.3,0.2-0.4c0,0,0,0,0,0c0.8-1.6,1.7-2.5,3.2-2.5c0.6,0,1-0.4,1-1s-0.4-1-1-1c-4.2,0-5.4,4.1-6.6,8 c-1.4,4.8-2.7,8-6.4,8c-5.1,0-7-6.6-7-11c0-8.6,4.7-14,9-14c2.9,0,4,2.3,4.1,2.4c0.2,0.5,0.8,0.7,1.3,0.5c0.5-0.2,0.7-0.8,0.5-1.3 C19.8,10.4,18.2,7,14,7C8.6,7,3,13,3,23c0,10.3,5.9,13,9,13c5.1,0,6.8-4.5,8.1-8.5c0.7,0.9,1.7,1.5,2.9,1.5c2.2,0,3.5-1.6,4.2-3.6 c0.5,0.4,1.1,0.6,1.8,0.6c1.4,0,2.4-1.2,3-2.4c0.4,0.7,1.1,1.2,2,1.2c0.6,0,1.1-0.3,1.5-0.7c0.3,1.4,0.7,2.7,1,3.8 C35.1,29.7,34,31.2,34,33c0,1.7,1.3,3,3,3c1.8,0,3-1.6,3-3c0-1.3-0.5-2.7-1.1-4.3C38.9,28.5,38.8,28.4,38.8,28.2z M37,34 c-0.7,0-1-0.5-1-1c0-0.9,0.5-1.8,1.3-2.9c0.4,1.2,0.7,2.1,0.7,2.9C38,33.3,37.7,34,37,34z"}},{"tag":"rect","attr":{"x":"3","y":"40","fill":"#90A4AE","width":"42","height":"2"}}]})(props);
};
function FcSimCardChip (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF9800","d":"M5,35V13c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v22c0,2.2-1.8,4-4,4H9C6.8,39,5,37.2,5,35z"}},{"tag":"g","attr":{"fill":"#FFD54F"},"child":[{"tag":"path","attr":{"d":"M43,21v-2H31c-1.1,0-2-0.9-2-2s0.9-2,2-2h1v-2h-1c-2.2,0-4,1.8-4,4s1.8,4,4,4h3v6h-3c-2.8,0-5,2.2-5,5 s2.2,5,5,5h2v-2h-2c-1.7,0-3-1.3-3-3s1.3-3,3-3h12v-2h-7v-6H43z"}},{"tag":"path","attr":{"d":"M17,27h-3v-6h3c2.2,0,4-1.8,4-4s-1.8-4-4-4h-3v2h3c1.1,0,2,0.9,2,2s-0.9,2-2,2H5v2h7v6H5v2h12 c1.7,0,3,1.3,3,3s-1.3,3-3,3h-2v2h2c2.8,0,5-2.2,5-5S19.8,27,17,27z"}}]}]})(props);
};
function FcSimCard (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#009688","d":"M36,45H12c-2.2,0-4-1.8-4-4V7c0-2.2,1.8-4,4-4h16.3c1.1,0,2.1,0.4,2.8,1.2l7.7,7.7c0.8,0.8,1.2,1.8,1.2,2.8 V41C40,43.2,38.2,45,36,45z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M32,38H16c-1.1,0-2-0.9-2-2V24c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2v12C34,37.1,33.1,38,32,38z"}},{"tag":"path","attr":{"fill":"#FFD54F","d":"M29,30v3h5v2h-5v3h-2V22h2v6h5v2H29z M14,29v2h5v2h-5v2h5v3h2v-9H14z"}}]})(props);
};
function FcSlrBackSide (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#5E35B1","d":"M40,10h-7.6l-2-3c-0.4-0.6-1-0.9-1.7-0.9h-9.6c-0.7,0-1.3,0.3-1.7,0.9l-2,3H8c-2.2,0-4,1.8-4,4v24 c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V14C44,11.8,42.2,10,40,10z"}},{"tag":"path","attr":{"fill":"#F57C00","d":"M11,16h20c0.6,0,1,0.4,1,1v16c0,0.6-0.4,1-1,1H11c-0.6,0-1-0.4-1-1V17C10,16.4,10.4,16,11,16z"}},{"tag":"polygon","attr":{"fill":"#942A09","points":"18.9,22 12,32 25.8,32"}},{"tag":"circle","attr":{"fill":"#FFF9C4","cx":"27","cy":"21","r":"2"}},{"tag":"polygon","attr":{"fill":"#BF360C","points":"25.2,26 20.4,32 30,32"}},{"tag":"g","attr":{"fill":"#8667C4"},"child":[{"tag":"path","attr":{"d":"M34,10h6V9.2C40,8.5,39.5,8,38.8,8h-3.6C34.5,8,34,8.5,34,9.2V10z"}},{"tag":"circle","attr":{"cx":"38","cy":"18","r":"2"}},{"tag":"circle","attr":{"cx":"38","cy":"24","r":"2"}},{"tag":"circle","attr":{"cx":"38","cy":"30","r":"2"}}]}]})(props);
};
function FcSmartphoneTablet (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M4,39V7c0-2.2,1.8-4,4-4h22c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H8C5.8,43,4,41.2,4,39z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M30,6H8C7.4,6,7,6.4,7,7v29c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V7C31,6.4,30.6,6,30,6z"}},{"tag":"rect","attr":{"x":"15","y":"39","fill":"#78909C","width":"6","height":"2"}},{"tag":"path","attr":{"fill":"#E38939","d":"M24,41V17c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4v24c0,2.2-1.8,4-4,4H28C25.8,45,24,43.2,24,41z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M40,16H28c-0.6,0-1,0.4-1,1v22c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V17C41,16.4,40.6,16,40,16z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"34","cy":"42.5","r":"1.5"}}]})(props);
};
function FcSms (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#009688","d":"M37,39H11l-6,6V11c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,36.3,40.3,39,37,39z"}},{"tag":"g","attr":{"fill":"#fff"},"child":[{"tag":"circle","attr":{"cx":"24","cy":"22","r":"3"}},{"tag":"circle","attr":{"cx":"34","cy":"22","r":"3"}},{"tag":"circle","attr":{"cx":"14","cy":"22","r":"3"}}]}]})(props);
};
function FcSoundRecordingCopyright (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"path","attr":{"fill":"#E1BEE7","d":"M20.7,27.2v8.4h-3.9V12.9h8.7c1.3,0,2.5,0.2,3.5,0.5c1,0.4,1.9,0.9,2.6,1.5c0.7,0.6,1.2,1.4,1.6,2.3 c0.4,0.9,0.6,1.8,0.6,2.9c0,1.1-0.2,2.1-0.6,3c-0.4,0.9-0.9,1.6-1.6,2.2c-0.7,0.6-1.6,1.1-2.6,1.4c-1,0.3-2.2,0.5-3.5,0.5H20.7z M20.7,24h4.7c0.8,0,1.4-0.1,2-0.3c0.5-0.2,1-0.5,1.4-0.8c0.4-0.3,0.6-0.8,0.8-1.2c0.2-0.5,0.2-1,0.2-1.6c0-0.5-0.1-1-0.2-1.5 c-0.2-0.5-0.4-0.9-0.8-1.3c-0.4-0.4-0.8-0.7-1.4-0.9c-0.5-0.2-1.2-0.3-2-0.3h-4.7V24z"}}]})(props);
};
function FcSpeaker (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#81D4FA","d":"M28,7.1v2c7.3,1,13,7.3,13,14.9s-5.7,13.9-13,14.9v2c8.4-1,15-8.2,15-16.9S36.4,8.1,28,7.1z"}},{"tag":"path","attr":{"fill":"#546E7A","d":"M14,32H7c-1.1,0-2-0.9-2-2V18c0-1.1,0.9-2,2-2h7V32z"}},{"tag":"polygon","attr":{"fill":"#78909C","points":"26,42 14,32 14,16 26,6"}},{"tag":"path","attr":{"fill":"#03A9F4","d":"M28,17.3v2.1c1.8,0.8,3,2.5,3,4.6s-1.2,3.8-3,4.6v2.1c2.9-0.9,5-3.5,5-6.7S30.9,18.2,28,17.3z"}},{"tag":"path","attr":{"fill":"#4FC3F7","d":"M28,12.2v2c4.6,0.9,8,5,8,9.8s-3.4,8.9-8,9.8v2c5.7-1,10-5.9,10-11.8S33.7,13.1,28,12.2z"}}]})(props);
};
function FcSportsMode (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#FF9800","cx":"28","cy":"9","r":"5"}},{"tag":"path","attr":{"fill":"#00796B","d":"M29,27.3l-9.2-4.1c-1-0.5-1.5,1-2,2c-0.5,1-4.1,7.2-3.8,8.3c0.3,0.9,1.1,1.4,1.9,1.4c0.2,0,0.4,0,0.6-0.1 L28.8,31c0.8-0.2,1.4-1,1.4-1.8C30.2,28.4,29.7,27.6,29,27.3z"}},{"tag":"path","attr":{"fill":"#009688","d":"M26.8,15.2l-2.2-1c-1.3-0.6-2.9,0-3.5,1.3L9.2,41.1c-0.5,1,0,2.2,1,2.7c0.3,0.1,0.6,0.2,0.9,0.2 c0.8,0,1.5-0.4,1.8-1.1c0,0,9.6-13.3,10.4-14.9s4.9-9.3,4.9-9.3C28.7,17.4,28.2,15.8,26.8,15.2z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M40.5,15.7c-0.7-0.8-2-1-2.8-0.3l-5,4.2l-6.4-3.5c-1.1-0.6-2.6-0.4-3.3,0.9c-0.8,1.3-0.4,2.9,0.8,3.4 l8.3,3.4c0.3,0.1,0.6,0.2,0.9,0.2c0.5,0,0.9-0.2,1.3-0.5l6-5C41.1,17.8,41.2,16.6,40.5,15.7z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M11.7,23.1l3.4-5.1l4.6,0.6l1.5-3.1c0.4-0.9,1.2-1.4,2.1-1.5c-0.1,0-0.2,0-0.2,0h-9c-0.7,0-1.3,0.3-1.7,0.9 l-4,6c-0.6,0.9-0.4,2.2,0.6,2.8C9.2,23.9,9.6,24,10,24C10.6,24,11.3,23.7,11.7,23.1z"}}]})(props);
};
function FcStackOfPhotos (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"12.3","y":"12.3","transform":"matrix(.948 .318 -.318 .948 9.725 -6.994)","fill":"#64B5F6","width":"28","height":"28"}},{"tag":"rect","attr":{"x":"15.6","y":"15.4","transform":"matrix(.951 .31 -.31 .951 9.176 -6.977)","fill":"#1E88E5","width":"22","height":"20"}},{"tag":"rect","attr":{"x":"8.1","y":"8.1","transform":"matrix(.983 .181 -.181 .983 4.385 -3.65)","fill":"#90CAF9","width":"28","height":"28"}},{"tag":"rect","attr":{"x":"11.3","y":"11.2","transform":"matrix(.985 .175 -.175 .985 4.048 -3.566)","fill":"#42A5F5","width":"22","height":"20"}},{"tag":"rect","attr":{"x":"4","y":"4","fill":"#BBDEFB","width":"28","height":"28"}},{"tag":"rect","attr":{"x":"7","y":"7","fill":"#4CAF50","width":"22","height":"20"}},{"tag":"path","attr":{"fill":"#fff","d":"M16,13c0-1.1,0.9-2,2-2s2,0.9,2,2s-2,4-2,4S16,14.1,16,13z"}},{"tag":"path","attr":{"fill":"#fff","d":"M20,21c0,1.1-0.9,2-2,2s-2-0.9-2-2s2-4,2-4S20,19.9,20,21z"}},{"tag":"path","attr":{"fill":"#fff","d":"M13.5,16.7c-1-0.6-1.3-1.8-0.7-2.7c0.6-1,1.8-1.3,2.7-0.7c1,0.6,2.5,3.7,2.5,3.7S14.5,17.3,13.5,16.7z"}},{"tag":"path","attr":{"fill":"#fff","d":"M22.5,17.3c1,0.6,1.3,1.8,0.7,2.7c-0.6,1-1.8,1.3-2.7,0.7C19.5,20.2,18,17,18,17S21.5,16.7,22.5,17.3z"}},{"tag":"path","attr":{"fill":"#fff","d":"M22.5,16.7c1-0.6,1.3-1.8,0.7-2.7c-0.6-1-1.8-1.3-2.7-0.7C19.5,13.8,18,17,18,17S21.5,17.3,22.5,16.7z"}},{"tag":"path","attr":{"fill":"#fff","d":"M13.5,17.3c-1,0.6-1.3,1.8-0.7,2.7c0.6,1,1.8,1.3,2.7,0.7c1-0.6,2.5-3.7,2.5-3.7S14.5,16.7,13.5,17.3z"}},{"tag":"circle","attr":{"fill":"#FFC107","cx":"18","cy":"17","r":"2"}}]})(props);
};
function FcStart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F44336","d":"M38,42H10c-2.2,0-4-1.8-4-4V10c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v28C42,40.2,40.2,42,38,42z"}},{"tag":"polygon","attr":{"fill":"#fff","points":"31,24 20,16 20,32"}}]})(props);
};
function FcStatistics (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"rect","attr":{"x":"23","y":"5","width":"2","height":"36"}},{"tag":"rect","attr":{"x":"20.5","y":"31.4","transform":"matrix(.707 .707 -.707 .707 33.523 -3.921)","width":"2","height":"14.2"}},{"tag":"rect","attr":{"x":"25.5","y":"31.4","transform":"matrix(-.707 .707 -.707 -.707 72.487 46.995)","width":"2","height":"14.2"}}]},{"tag":"rect","attr":{"x":"4","y":"8","fill":"#CFD8DC","width":"40","height":"28"}},{"tag":"g","attr":{"fill":"#607D8B"},"child":[{"tag":"rect","attr":{"x":"3","y":"7","width":"42","height":"4"}},{"tag":"rect","attr":{"x":"3","y":"35","width":"42","height":"2"}},{"tag":"circle","attr":{"cx":"31.5","cy":"43.5","r":"1.5"}},{"tag":"circle","attr":{"cx":"16.5","cy":"43.5","r":"1.5"}}]},{"tag":"g","attr":{"fill":"#C51162"},"child":[{"tag":"polygon","attr":{"points":"31.9,18.9 26,24.9 20,18.9 11.9,26.9 14.1,29.1 20,23.1 26,29.1 34.1,21.1"}},{"tag":"polygon","attr":{"points":"36,24 29,17 36,17"}}]}]})(props);
};
function FcSteam (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FFFFFF","d":"M42,38c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4V38z"}},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M18.459,33.645c-0.288,0-0.56-0.057-0.822-0.141l-0.005,0.02l-3.67-1.062\r\n\t\tc0.644,1.878,2.406,3.237,4.5,3.237c2.641,0,4.776-2.136,4.776-4.776s-2.135-4.777-4.776-4.777c-1.141,0-2.175,0.418-2.998,1.087\r\n\t\tL19,28.255c0.029,0.007,0.055,0.018,0.084,0.024l0.049,0.016v0.002c1.177,0.301,2.049,1.359,2.049,2.626\r\n\t\tC21.184,32.424,19.964,33.645,18.459,33.645z"}},{"tag":"path","attr":{"fill":"#455A64","d":"M30.923,24.299c3.222,0,5.837-2.615,5.837-5.838c0-3.222-2.615-5.837-5.837-5.837\r\n\t\tc-3.221,0-5.837,2.615-5.837,5.837C25.086,21.684,27.702,24.299,30.923,24.299z M30.92,14.409c2.24,0,4.056,1.813,4.056,4.052\r\n\t\tc0,2.241-1.815,4.053-4.056,4.053c-2.236,0-4.049-1.812-4.049-4.053C26.871,16.223,28.684,14.409,30.92,14.409z"}},{"tag":"path","attr":{"fill":"#455A64","d":"M38,6h-2.75h-22.5H10c-2.209,0-4,1.791-4,4v2.75v4.236v7.509l7.027,2.033\r\n\t\tc1.287-1.59,3.229-2.626,5.434-2.626c0.07,0,0.135,0.02,0.204,0.021l3.876-5.355c0-0.035-0.005-0.072-0.005-0.105\r\n\t\tc0-4.63,3.755-8.388,8.387-8.388c4.633,0,8.386,3.757,8.386,8.386c0,4.633-3.753,8.387-8.386,8.387\r\n\t\tc-0.044,0-0.087-0.006-0.132-0.007l-5.33,3.871c0.002,0.07,0.021,0.14,0.021,0.211c0,3.878-3.142,7.021-7.021,7.021\r\n\t\tc-3.593,0-6.52-2.707-6.937-6.188L6,30.158v2.583v2.509V38c0,2.209,1.791,4,4,4h2.75h22.5H38c2.209,0,4-1.791,4-4v-2.75v-22.5V10\r\n\t\tC42,7.791,40.209,6,38,6z"}}]}]})(props);
};
function FcStumbleupon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E64A19","d":"M24.001,5c-10.494,0-19,8.506-19,19c0,10.493,8.506,19,19,19c10.493,0,19-8.507,19-19\r\n\tC43.001,13.506,34.494,5,24.001,5z"}},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#FFFFFF","d":"M24.001,19C23.998,19,24.004,19,24.001,19c-0.062-0.004-1,0-1,1v7.876C22.916,29.888,21.504,33,17.959,33\r\n\t\tc-3.607,0-4.958-3.065-4.958-4.958V24h4v4c0.038,0.709,0.629,1,1,1c0.665,0,0.972-0.361,1-1v-8.124c0-2.01,1.332-5,5-5\r\n\t\tc0.045,0,0.086,0.006,0.131,0.007c0,0,4.869-0.009,4.869,5.117c0,1.104-0.896,1.876-2,1.876s-2-0.771-2-1.876\r\n\t\tC25.001,19.124,24.041,19.003,24.001,19z M35.001,27.876c0,2.01-1.331,5.124-5,5.124s-5-3.114-5-5.124v-3.439\r\n\t\tc0.614,0.272,1.285,0.439,2,0.439c0.712,0,1.386-0.154,2-0.424V28c0.038,1,0.663,1,1,1c0.247,0,1,0,1-1v-4h4V27.876z"}}]}]})(props);
};
function FcSupport (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#607D8B","d":"M44.7,11L36,19.6c0,0-2.6,0-5.2-2.6s-2.6-5.2-2.6-5.2l8.7-8.7c-4.9-1.2-10.8,0.4-14.4,4 c-5.4,5.4-0.6,12.3-2,13.7C12.9,28.7,5.1,34.7,4.9,35c-2.3,2.3-2.4,6-0.2,8.2c2.2,2.2,5.9,2.1,8.2-0.2c0.3-0.3,6.7-8.4,14.2-15.9 c1.4-1.4,8,3.7,13.6-1.8C44.2,21.7,45.9,15.9,44.7,11z M9.4,41.1c-1.4,0-2.5-1.1-2.5-2.5C6.9,37.1,8,36,9.4,36 c1.4,0,2.5,1.1,2.5,2.5C11.9,39.9,10.8,41.1,9.4,41.1z"}}]})(props);
};
function FcSurvey (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M36,4H26c0,1.1-0.9,2-2,2s-2-0.9-2-2H12C9.8,4,8,5.8,8,8v32c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V8 C40,5.8,38.2,4,36,4z"}},{"tag":"path","attr":{"fill":"#fff","d":"M36,41H12c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1v32C37,40.6,36.6,41,36,41z"}},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"path","attr":{"d":"M26,4c0,1.1-0.9,2-2,2s-2-0.9-2-2h-7v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4H26z"}},{"tag":"path","attr":{"d":"M24,0c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,0,24,0z M24,6c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2 S25.1,6,24,6z"}}]},{"tag":"g","attr":{"fill":"#CFD8DC"},"child":[{"tag":"rect","attr":{"x":"21","y":"20","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"15","y":"19","width":"4","height":"4"}}]},{"tag":"g","attr":{"fill":"#03A9F4"},"child":[{"tag":"rect","attr":{"x":"21","y":"29","width":"12","height":"2"}},{"tag":"rect","attr":{"x":"15","y":"28","width":"4","height":"4"}}]}]})(props);
};
function FcSwitchCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#5E35B1"},"child":[{"tag":"path","attr":{"d":"M33.9,12.1H14.2L17.6,7c0.4-0.6,1-0.9,1.7-0.9h9.6c0.7,0,1.3,0.3,1.7,0.9L33.9,12.1z"}},{"tag":"path","attr":{"d":"M14,11H8V9.2C8,8.5,8.5,8,9.2,8h3.6C13.5,8,14,8.5,14,9.2V11z"}},{"tag":"path","attr":{"d":"M40,42H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v24C44,40.2,42.2,42,40,42z"}}]},{"tag":"path","attr":{"fill":"#E8EAF6","d":"M34,25c0-5.5-4.5-10-10-10c-2.4,0-4.6,0.8-6.3,2.2l1.2,1.6c1.4-1.1,3.1-1.8,5.1-1.8c4.4,0,8,3.6,8,8h-3.5 l4.5,5.6l4.5-5.6H34z"}},{"tag":"path","attr":{"fill":"#E8EAF6","d":"M29.1,31.2C27.7,32.3,25.9,33,24,33c-4.4,0-8-3.6-8-8h3.5L15,19.4L10.5,25H14c0,5.5,4.5,10,10,10 c2.4,0,4.6-0.8,6.3-2.2L29.1,31.2z"}}]})(props);
};
function FcSynchronize (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#FF6F00","d":"M38.7,11.9l-3.1,2.5c2.2,2.7,3.4,6.1,3.4,9.5c0,8.3-6.7,15-15,15c-0.9,0-1.9-0.1-2.8-0.3l-0.7,3.9 c1.2,0.2,2.4,0.3,3.5,0.3c10.5,0,19-8.5,19-19C43,19.6,41.5,15.3,38.7,11.9z"}},{"tag":"polygon","attr":{"fill":"#FF6F02","points":"31,8 42.9,9.6 33.1,19.4"}},{"tag":"path","attr":{"fill":"#FF6F00","d":"M24,5C13.5,5,5,13.5,5,24c0,4.6,1.6,9,4.6,12.4l3-2.6C10.3,31.1,9,27.6,9,24c0-8.3,6.7-15,15-15 c0.9,0,1.9,0.1,2.8,0.3l0.7-3.9C26.4,5.1,25.2,5,24,5z"}},{"tag":"polygon","attr":{"fill":"#FF6F02","points":"17,40 5.1,38.4 14.9,28.6"}}]})(props);
};
function FcTabletAndroid (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M8,41V7c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H12C9.8,45,8,43.2,8,41z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M36,6H12c-0.6,0-1,0.4-1,1v31c0,0.6,0.4,1,1,1h24c0.6,0,1-0.4,1-1V7C37,6.4,36.6,6,36,6z"}},{"tag":"rect","attr":{"x":"21","y":"41","fill":"#78909C","width":"6","height":"2"}}]})(props);
};
function FcTemplate (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"4","y":"7","fill":"#BBDEFB","width":"40","height":"34"}},{"tag":"rect","attr":{"x":"9","y":"12","fill":"#3F51B5","width":"30","height":"5"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"9","y":"21","width":"13","height":"16"}},{"tag":"rect","attr":{"x":"26","y":"21","width":"13","height":"16"}}]}]})(props);
};
function FcTimeline (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M42,29H20.8c-0.5,0-1-0.2-1.4-0.6l-3.7-3.7c-0.4-0.4-0.4-1,0-1.4l3.7-3.7c0.4-0.4,0.9-0.6,1.4-0.6H42 c0.6,0,1,0.4,1,1v8C43,28.6,42.6,29,42,29z"}},{"tag":"rect","attr":{"x":"9","y":"6","fill":"#CFD8DC","width":"2","height":"36"}},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"circle","attr":{"cx":"10","cy":"10","r":"3"}},{"tag":"circle","attr":{"cx":"10","cy":"24","r":"3"}},{"tag":"circle","attr":{"cx":"10","cy":"38","r":"3"}}]},{"tag":"path","attr":{"fill":"#448AFF","d":"M34,43H20.8c-0.5,0-1-0.2-1.4-0.6l-3.7-3.7c-0.4-0.4-0.4-1,0-1.4l3.7-3.7c0.4-0.4,0.9-0.6,1.4-0.6H34 c0.6,0,1,0.4,1,1v8C35,42.6,34.6,43,34,43z"}},{"tag":"path","attr":{"fill":"#00BCD4","d":"M35,15H20.8c-0.5,0-1-0.2-1.4-0.6l-3.7-3.7c-0.4-0.4-0.4-1,0-1.4l3.7-3.7C19.8,5.2,20.3,5,20.8,5H35 c0.6,0,1,0.4,1,1v8C36,14.6,35.6,15,35,15z"}}]})(props);
};
function FcTodoList (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"17.8,18.1 10.4,25.4 6.2,21.3 4,23.5 10.4,29.9 20,20.3"}},{"tag":"polygon","attr":{"points":"17.8,5.1 10.4,12.4 6.2,8.3 4,10.5 10.4,16.9 20,7.3"}},{"tag":"polygon","attr":{"points":"17.8,31.1 10.4,38.4 6.2,34.3 4,36.5 10.4,42.9 20,33.3"}}]},{"tag":"g","attr":{"fill":"#90CAF9"},"child":[{"tag":"rect","attr":{"x":"24","y":"22","width":"20","height":"4"}},{"tag":"rect","attr":{"x":"24","y":"9","width":"20","height":"4"}},{"tag":"rect","attr":{"x":"24","y":"35","width":"20","height":"4"}}]}]})(props);
};
function FcTouchscreenSmartphone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#E38939","d":"M12,40V8c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M32,7H16c-0.6,0-1,0.4-1,1v29c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1V8C33,7.4,32.6,7,32,7z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"24","cy":"41","r":"1.5"}},{"tag":"circle","attr":{"fill":"#E91E63","cx":"24","cy":"23","r":"2"}},{"tag":"circle","attr":{"fill":"none","stroke":"#F48FB1","strokeWidth":"2","strokeMiterlimit":"10","cx":"24","cy":"23","r":"4"}},{"tag":"circle","attr":{"fill":"none","stroke":"#F8BBD0","strokeMiterlimit":"10","cx":"24","cy":"23","r":"6.5"}}]})(props);
};
function FcTrademark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"circle","attr":{"fill":"#9C27B0","cx":"24","cy":"24","r":"21"}},{"tag":"g","attr":{"fill":"#E1BEE7"},"child":[{"tag":"path","attr":{"d":"M20.6,18.5h-4.2v14.2h-3.5V18.5H8.7v-2.9h11.9V18.5z"}},{"tag":"path","attr":{"d":"M27.1,15.6L30.3,28l3.2-12.4h4.5v17.1h-3.5v-4.6l0.3-7.1l-3.4,11.8h-2.4L25.7,21l0.3,7.1v4.6h-3.5V15.6 H27.1z"}}]}]})(props);
};
function FcTreeStructure (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"36.9,13.8 35.1,10.2 7.5,24 35.1,37.8 36.9,34.2 16.5,24"}},{"tag":"rect","attr":{"x":"6","y":"18","fill":"#D81B60","width":"12","height":"12"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"30","y":"6","width":"12","height":"12"}},{"tag":"rect","attr":{"x":"30","y":"30","width":"12","height":"12"}}]}]})(props);
};
function FcTwoSmartphones (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#37474F","d":"M6,36V8c0-2.2,1.8-4,4-4h14c2.2,0,4,1.8,4,4v28c0,2.2-1.8,4-4,4H10C7.8,40,6,38.2,6,36z"}},{"tag":"path","attr":{"fill":"#BBDEFB","d":"M24,7H10C9.4,7,9,7.4,9,8v25c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1V8C25,7.4,24.6,7,24,7z"}},{"tag":"rect","attr":{"x":"14","y":"36","fill":"#78909C","width":"6","height":"2"}},{"tag":"path","attr":{"fill":"#E38939","d":"M20,40V12c0-2.2,1.8-4,4-4h14c2.2,0,4,1.8,4,4v28c0,2.2-1.8,4-4,4H24C21.8,44,20,42.2,20,40z"}},{"tag":"path","attr":{"fill":"#FFF3E0","d":"M38,11H24c-0.6,0-1,0.4-1,1v25c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1V12C39,11.4,38.6,11,38,11z"}},{"tag":"circle","attr":{"fill":"#A6642A","cx":"31","cy":"41","r":"1.5"}}]})(props);
};
function FcUndo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#00BCD4"},"child":[{"tag":"polygon","attr":{"points":"5,18 19,6.3 19,29.7"}},{"tag":"path","attr":{"d":"M28,14H16v8h12c2.8,0,5,2.2,5,5s-2.2,5-5,5h-3v8h3c7.2,0,13-5.8,13-13S35.2,14,28,14z"}}]}]})(props);
};
function FcUnlock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#424242","d":"M24,4c-5.5,0-10,4.5-10,10v4h4v-4c0-3.3,2.7-6,6-6s6,2.7,6,6h4C34,8.5,29.5,4,24,4z"}},{"tag":"path","attr":{"fill":"#FB8C00","d":"M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"}},{"tag":"circle","attr":{"fill":"#C76E00","cx":"24","cy":"31","r":"3"}}]})(props);
};
function FcUpLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"4,19 18,30.7 18,7.3"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M42,27v13h-8V27c0-2.2-1.8-4-4-4H13v-8h17C36.6,15,42,20.4,42,27z"}}]})(props);
};
function FcUpRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#3F51B5","points":"44,19 30,30.7 30,7.3"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M6,27v13h8V27c0-2.2,1.8-4,4-4h17v-8H18C11.4,15,6,20.4,6,27z"}},{"tag":"polygon","attr":{"fill":"#3F51B5","points":"44,19 30,30.7 30,7.3"}},{"tag":"path","attr":{"fill":"#3F51B5","d":"M6,27v13h8V27c0-2.2,1.8-4,4-4h17v-8H18C11.4,15,6,20.4,6,27z"}}]})(props);
};
function FcUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#3F51B5"},"child":[{"tag":"polygon","attr":{"points":"24,4 35.7,18 12.3,18"}},{"tag":"rect","attr":{"x":"20","y":"15","width":"8","height":"27"}}]}]})(props);
};
function FcUpload (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#009688"},"child":[{"tag":"polygon","attr":{"points":"24,10.9 35,24 13,24"}},{"tag":"rect","attr":{"x":"20","y":"40","width":"8","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"34","width":"8","height":"4"}},{"tag":"rect","attr":{"x":"20","y":"21","width":"8","height":"11"}},{"tag":"rect","attr":{"x":"6","y":"4","width":"36","height":"4"}}]}]})(props);
};
function FcUsb (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#1565C0","d":"M38.701,24.355h-2.189l-0.467,2.265c0,0,2.277,0,2.51,0c0.233,0,1.545-0.167,1.545-1.267\r\n\tC40.1,24.266,38.701,24.355,38.701,24.355z M39.521,20.339h-2.15l-0.374,1.796c0,0,2.161,0,2.337,0c0.188,0,1.113-0.146,1.113-1.006\r\n\tC40.447,20.271,39.521,20.339,39.521,20.339z M44.064,23.109c0,0,1.436-0.743,1.436-3.093c0-3.715-4.377-3.516-4.377-3.516h-2.865\r\n\tl0.674-3c0,0-12.4,0-20.971,0c-9.344,0-12.158,6.774-12.158,6.774L5.736,20.5H2.547l-1.047,6h3.37l0.001,0.143\r\n\tc0,0-0.285,6.857,10.463,6.857c10.747,0,19.042,0,19.042,0l0.679-3c0.84,0,2.2,0,4.389,0c4.729,0,5.591-3.354,5.591-4.9\r\n\tC45.032,23.838,44.064,23.109,44.064,23.109z"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M38.701,24.355h-2.189l-0.467,2.265c0,0,2.277,0,2.51,0c0.233,0,1.545-0.167,1.545-1.267\r\n\tC40.1,24.266,38.701,24.355,38.701,24.355z M39.521,20.339h-2.15l-0.374,1.796c0,0,2.161,0,2.337,0c0.188,0,1.113-0.146,1.113-1.006\r\n\tC40.447,20.271,39.521,20.339,39.521,20.339z M14.022,29.5c-5.306,0-5.306-3.624-5.238-3.986c0.069-0.363,1.789-8.014,1.789-8.014\r\n\th3.84l-1.358,6.354c0,0-0.971,2.728,1.251,2.728c2.081,0,2.336-2.535,2.336-2.535l1.465-6.543h3.839l-1.582,6.979\r\n\tC20.365,24.48,20.258,29.5,14.022,29.5z M26.098,29.521c-2.674,0-4.958-1.262-4.856-4.14h3.438c0,0.576,0.086,1.627,1.633,1.627\r\n\tc0.627,0,1.688-0.266,1.688-1.133c0-1.631-5.597-0.785-5.597-4.57c0-2.063,1.899-3.785,4.989-3.785c4.976,0,4.613,3.749,4.613,3.749\r\n\th-3.369c0-1.044-0.664-1.204-1.463-1.204c-0.8,0-1.372,0.343-1.372,0.944c0,1.471,5.634,0.456,5.634,4.531\r\n\tC31.436,27.305,30.012,29.521,26.098,29.521z M39.366,29.5c-0.419,0-7.515,0-7.515,0l2.601-12c0,0,5.444,0,6.556,0\r\n\tc1.113,0,3.43,0.234,3.43,2.542c0,2.602-2.227,3.013-2.227,3.013s1.764,0.407,1.764,2.473C43.975,29.457,39.775,29.5,39.366,29.5z"}}]})(props);
};
function FcVideoCall (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"}},{"tag":"polygon","attr":{"fill":"#388E3C","points":"44,35 34,29 34,19 44,13"}}]})(props);
};
function FcVideoFile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"polygon","attr":{"fill":"#90CAF9","points":"40,45 8,45 8,3 30,3 40,13"}},{"tag":"polygon","attr":{"fill":"#E1F5FE","points":"38.5,14 29,14 29,4.5"}},{"tag":"polygon","attr":{"fill":"#1976D2","points":"30,28 20,22 20,34"}}]})(props);
};
function FcVideoProjector (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{"fill":"#546E7A"},"child":[{"tag":"rect","attr":{"x":"5","y":"34","width":"6","height":"3"}},{"tag":"rect","attr":{"x":"37","y":"34","width":"6","height":"3"}}]},{"tag":"path","attr":{"fill":"#78909C","d":"M44,35H4c-2.2,0-4-1.8-4-4V17c0-2.2,1.8-4,4-4h40c2.2,0,4,1.8,4,4v14C48,33.2,46.2,35,44,35z"}},{"tag":"g","attr":{"fill":"#37474F"},"child":[{"tag":"rect","attr":{"x":"5","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"5","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"5","y":"27","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"9","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"9","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"9","y":"27","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"13","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"13","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"13","y":"27","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"17","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"17","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"17","y":"27","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"21","y":"19","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"21","y":"23","width":"2","height":"2"}},{"tag":"rect","attr":{"x":"21","y":"27","width":"2","height":"2"}}]},{"tag":"circle","attr":{"fill":"#37474F","cx":"37","cy":"24","r":"8"}},{"tag":"circle","attr":{"fill":"#a0f","cx":"37","cy":"24","r":"6"}},{"tag":"path","attr":{"fill":"#EA80FC","d":"M40.7,21.7c-1-1.1-2.3-1.7-3.7-1.7s-2.8,0.6-3.7,1.7c-0.4,0.4-0.3,1,0.1,1.4c0.4,0.4,1,0.3,1.4-0.1 c1.2-1.3,3.3-1.3,4.5,0c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3C41.1,22.7,41.1,22.1,40.7,21.7z"}}]})(props);
};
function FcViewDetails (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"7","y":"4","fill":"#BBDEFB","width":"34","height":"40"}},{"tag":"g","attr":{"fill":"#2196F3"},"child":[{"tag":"rect","attr":{"x":"13","y":"26","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"13","y":"18","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"13","y":"34","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"13","y":"10","width":"4","height":"4"}},{"tag":"rect","attr":{"x":"21","y":"26","width":"14","height":"4"}},{"tag":"rect","attr":{"x":"21","y":"18","width":"14","height":"4"}},{"tag":"rect","attr":{"x":"21","y":"34","width":"14","height":"4"}},{"tag":"rect","attr":{"x":"21","y":"10","width":"14","height":"4"}}]}]})(props);
};
function FcVip (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#880E4F","d":"M38,43H10c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v28C42,41.2,40.2,43,38,43z"}},{"tag":"g","attr":{"fill":"#FFD54F"},"child":[{"tag":"path","attr":{"d":"M15.9,28l2.1-9.1h2.8l-3.6,12.6h-2.6L11,18.9h2.8L15.9,28z"}},{"tag":"path","attr":{"d":"M25.6,31.5h-2.5V18.9h2.5V31.5z"}},{"tag":"path","attr":{"d":"M31.2,27.1v4.4h-2.5V18.9h4.3c3.7,0,4.1,3.4,4.1,4.2c0,1.2-0.5,4-4.1,4H31.2z M31.2,24.9h1.7 c1.3,0,1.5-1.1,1.5-1.9c0-1.6-0.9-2.1-1.5-2.1h-1.7V24.9z"}}]}]})(props);
};
function FcVlc (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#F57C00","d":"M36.258,28.837c0,0-0.11-0.837-1.257-0.837c-0.216,0-2.392,0-3.719,0c0.798,2.671,1.497,5.135,1.497,5.279\r\n\tc0,2.387-3.401,3.393-8.917,3.393c-5.515,0-8.651-0.94-8.651-3.326c0-0.167,0.998-2.692,1.791-5.346c-1.591,0-3.863,0-4.063,0\r\n\tc-0.806,0-0.937,0.749-0.937,0.749L8.159,40.986L8.815,42h30.652l0.376-1.014L36.258,28.837z"}},{"tag":"path","attr":{"fill":"#E0E0E0","d":"M24.001,6c-1.029,0-1.864,0.179-1.864,0.398c-0.492,1.483-8.122,26.143-8.122,26.774\r\n\tc0,2.388,4.471,3.827,9.985,3.827s9.986-1.439,9.986-3.827c0-0.549-7.614-25.268-8.122-26.774C25.865,6.179,25.031,6,24.001,6\r\n\tL24.001,6z"}},{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#FF9800","d":"M33.196,30.447C32.032,32.232,28.341,34,24.046,34c-4.34,0-8.156-1.696-9.281-3.51\r\n\t\tc-0.499,1.483-0.892,2.647-0.892,3.28c0,2.386,4.533,4.229,10.128,4.229c5.595,0,10.131-1.844,10.131-4.229\r\n\t\tC34.132,33.222,33.713,31.955,33.196,30.447z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M31.387,24.314l-2.074-6.794c0,0-1.857,1.479-5.311,1.479c-3.453,0-5.316-1.479-5.316-1.479l-2.081,6.806\r\n\t\tc0,0,2.068,2.674,7.397,2.674C29.375,27,31.387,24.314,31.387,24.314z"}},{"tag":"path","attr":{"fill":"#FF9800","d":"M27.241,10.809l-1.376-4.41c0,0-0.083-0.398-1.864-0.398c-1.844,0-1.864,0.398-1.864,0.398l-1.376,4.407\r\n\t\tc0,0,0.885,1.194,3.239,1.194C26.355,12,27.241,10.809,27.241,10.809z"}}]}]})(props);
};
function FcVoicePresentation (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#2196F3","d":"M40,22h-8l-4,4V12c0-2.2,1.8-4,4-4h8c2.2,0,4,1.8,4,4v6C44,20.2,42.2,22,40,22z"}},{"tag":"circle","attr":{"fill":"#FFA726","cx":"17","cy":"19","r":"8"}},{"tag":"path","attr":{"fill":"#607D8B","d":"M30,36.7c0,0-3.6-6.7-13-6.7S4,36.7,4,36.7V40h26V36.7z"}}]})(props);
};
function FcVoicemail (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#4CAF50","d":"M48,24c0-6.1-4.9-11-11-11s-11,4.9-11,11c0,2.7,0.9,5.1,2.5,7h-9c1.6-1.9,2.5-4.3,2.5-7c0-6.1-4.9-11-11-11 S0,17.9,0,24s4.9,11,11,11h27v-0.1C43.6,34.4,48,29.7,48,24z M4,24c0-3.9,3.1-7,7-7s7,3.1,7,7s-3.1,7-7,7S4,27.9,4,24z M37,31 c-3.9,0-7-3.1-7-7s3.1-7,7-7c3.9,0,7,3.1,7,7S40.9,31,37,31z"}}]})(props);
};
function FcWebcam (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#455A64","d":"M36.5,44H11.5c-1.1,0-1.8-1.2-1.3-2.2L13,37h22l2.7,4.8C38.3,42.8,37.6,44,36.5,44z"}},{"tag":"circle","attr":{"fill":"#78909C","cx":"24","cy":"23","r":"18"}},{"tag":"path","attr":{"fill":"#455A64","d":"M24,35c-6.6,0-12-5.4-12-12c0-6.6,5.4-12,12-12s12,5.4,12,12C36,29.6,30.6,35,24,35z"}},{"tag":"circle","attr":{"fill":"#42A5F5","cx":"24","cy":"23","r":"9"}},{"tag":"path","attr":{"fill":"#90CAF9","d":"M28.8,20c-1.2-1.4-3-2.2-4.8-2.2s-3.6,0.8-4.8,2.2c-0.5,0.5-0.4,1.3,0.1,1.8c0.5,0.5,1.3,0.4,1.8-0.1 c1.5-1.7,4.3-1.7,5.8,0c0.3,0.3,0.6,0.4,1,0.4c0.3,0,0.6-0.1,0.9-0.3C29.2,21.4,29.3,20.5,28.8,20z"}}]})(props);
};
function FcWiFiLogo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"#3F51B5","d":"M46,26.48c0,4.527-3.268,7.52-7.3,7.52H9.299C5.269,34,2,30.634,2,26.48V21.52C2,17.366,5.269,14,9.299,14\r\n\t\tH38.7c4.032,0,7.3,3.366,7.3,7.52V26.48z"}},{"tag":"ellipse","attr":{"fill":"#3F51B5","cx":"24","cy":"24","rx":"14.902","ry":"15"}}]},{"tag":"g","attr":{},"child":[{"tag":"polygon","attr":{"fill":"#FFFFFF","points":"17,19 14.264,19 13.427,24.859 12.388,19.028 9.93,19.028 8.864,24.859 8.054,19.028 5.266,19.028 \r\n\t\t7.597,29 10.056,29 11.12,22.854 12.209,29 14.693,29 \t"}},{"tag":"rect","attr":{"x":"19","y":"22","fill":"#FFFFFF","width":"2.508","height":"7"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M21.5,19.747C21.5,20.44,20.94,21,20.25,21S19,20.44,19,19.747c0-0.696,0.56-1.258,1.25-1.258\r\n\t\tS21.5,19.051,21.5,19.747z"}},{"tag":"path","attr":{"fill":"#FFFFFF","d":"M38.561,16c-4.818,0-7.979,0-7.979,0S25,16.193,25,21.914v4.336c0,0,0.101,2.941-3,5.75h16.785\r\n\t\tc0,0,5.215,0,5.215-5.553c0-4.879,0-4.879,0-4.879S43.772,16,38.561,16z M37.339,21.369h-5.651v2.236h5.094v2.344h-5.094V29H29V19\r\n\t\th8.339V21.369z M40.25,18.489c0.689,0,1.25,0.562,1.25,1.258C41.5,20.44,40.939,21,40.25,21S39,20.44,39,19.747\r\n\t\tC39,19.051,39.561,18.489,40.25,18.489z M41.508,29H39v-7h2.508V29z"}}]}]})(props);
};
function FcWikipedia (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1.1","x":"0px","y":"0px","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"path","attr":{"fill":"#CFD8DC","d":"M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10z"}},{"tag":"path","attr":{"fill":"#37474F","d":"M39,17.271c0,0.191-0.148,0.349-0.334,0.349h-1.799l-8.164,18.179c-0.052,0.12-0.17,0.2-0.297,0.202h-0.004\r\n\tc-0.127,0-0.242-0.074-0.298-0.193l-3.874-8.039l-4.18,8.049c-0.06,0.116-0.167,0.181-0.303,0.184\r\n\tc-0.125-0.004-0.239-0.082-0.292-0.199l-8.252-18.182h-1.87C9.149,17.619,9,17.462,9,17.271V16.35C9,16.155,9.149,16,9.333,16h6.657\r\n\tc0.184,0,0.333,0.155,0.333,0.35v0.921c0,0.191-0.149,0.349-0.333,0.349h-1.433l5.696,13.748l2.964-5.793l-3.757-7.953h-0.904\r\n\tc-0.184,0-0.333-0.157-0.333-0.35V16.35c0-0.191,0.149-0.348,0.333-0.348h4.924c0.184,0,0.333,0.156,0.333,0.348v0.922\r\n\tc0,0.192-0.149,0.35-0.333,0.35h-0.867l2.162,4.948l2.572-4.948H25.77c-0.187,0-0.334-0.157-0.334-0.35V16.35\r\n\tc0-0.191,0.147-0.348,0.334-0.348h4.784c0.187,0,0.333,0.156,0.333,0.348v0.922c0,0.192-0.146,0.35-0.333,0.35h-1.05l-3.757,7.141\r\n\tl3.063,6.584l5.905-13.725h-1.872c-0.184,0-0.334-0.157-0.334-0.35V16.35c0-0.191,0.15-0.348,0.334-0.348h5.822\r\n\tc0.186,0,0.334,0.156,0.334,0.348V17.271z"}}]})(props);
};
function FcWorkflow (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"version":"1","viewBox":"0 0 48 48","enableBackground":"new 0 0 48 48"},"child":[{"tag":"rect","attr":{"x":"7","y":"31","fill":"#00BCD4","width":"10","height":"10"}},{"tag":"path","attr":{"fill":"#00BCD4","d":"M35.3,19.3l-5.6-5.6c-0.4-0.4-0.4-1,0-1.4l5.6-5.6c0.4-0.4,1-0.4,1.4,0l5.6,5.6c0.4,0.4,0.4,1,0,1.4 l-5.6,5.6C36.3,19.7,35.7,19.7,35.3,19.3z"}},{"tag":"circle","attr":{"fill":"#3F51B5","cx":"12","cy":"13","r":"6"}},{"tag":"circle","attr":{"fill":"#448AFF","cx":"36","cy":"36","r":"6"}},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"rect","attr":{"x":"11","y":"24","width":"2","height":"5"}},{"tag":"polygon","attr":{"points":"12,21 9,25 15,25"}}]},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"rect","attr":{"x":"20","y":"12","width":"5","height":"2"}},{"tag":"polygon","attr":{"points":"28,13 24,10 24,16"}}]},{"tag":"g","attr":{"fill":"#90A4AE"},"child":[{"tag":"rect","attr":{"x":"35","y":"21","width":"2","height":"5"}},{"tag":"polygon","attr":{"points":"36,29 39,25 33,25"}}]}]})(props);
};


/***/ }),

/***/ "359w":
/*!**********************************************************!*\
  !*** ./node_modules/@pnp/queryable/queryable-factory.js ***!
  \**********************************************************/
/*! exports provided: queryableFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryableFactory", function() { return queryableFactory; });
function queryableFactory(constructor) {
    return (init, path) => {
        // construct the concrete instance
        const instance = new constructor(init, path);
        // we emit the construct event from the factory because we need all of the decorators and constructors
        // to have fully finished before we emit, which is now true. We type the instance to any to get around
        // the protected nature of emit
        instance.emit.construct(init, path);
        return instance;
    };
}
//# sourceMappingURL=queryable-factory.js.map

/***/ }),

/***/ "3quK":
/*!*********************************************************!*\
  !*** ./node_modules/react-icons/lib/esm/iconContext.js ***!
  \*********************************************************/
/*! exports provided: DefaultContext, IconContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultContext", function() { return DefaultContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconContext", function() { return IconContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext && react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(DefaultContext);

/***/ }),

/***/ "4kGv":
/*!********************************************!*\
  !*** ./node_modules/@pnp/core/timeline.js ***!
  \********************************************/
/*! exports provided: noInherit, once, Timeline, cloneObserverCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noInherit", function() { return noInherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return Timeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObserverCollection", function() { return cloneObserverCollection; });
/* harmony import */ var _moments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moments.js */ "DZog");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "NuLX");


/**
 * Field name to hold any flags on observer functions used to modify their behavior
 */
const flags = Symbol.for("ObserverLifecycleFlags");
/**
 * Bitwise flags to indicate modified behavior
 */
var ObserverLifecycleFlags;
(function (ObserverLifecycleFlags) {
    // eslint-disable-next-line no-bitwise
    ObserverLifecycleFlags[ObserverLifecycleFlags["noInherit"] = 1] = "noInherit";
    // eslint-disable-next-line no-bitwise
    ObserverLifecycleFlags[ObserverLifecycleFlags["once"] = 2] = "once";
})(ObserverLifecycleFlags || (ObserverLifecycleFlags = {}));
/**
 * Creates a filter function for use in Array.filter that will filter OUT any observers with the specified [flag]
 *
 * @param flag The flag used to exclude observers
 * @returns An Array.filter function
 */
// eslint-disable-next-line no-bitwise
const byFlag = (flag) => ((observer) => !((observer[flags] || 0) & flag));
/**
 * Creates an observer lifecycle modification flag application function
 * @param flag The flag to the bound function should add
 * @returns A function that can be used to apply [flag] to any valid observer
 */
const addFlag = (flag) => ((observer) => {
    // eslint-disable-next-line no-bitwise
    observer[flags] = (observer[flags] || 0) | flag;
    return observer;
});
/**
 * Observer lifecycle modifier that indicates this observer should NOT be inherited by any child
 * timelines.
 */
const noInherit = addFlag(1 /* noInherit */);
/**
 * Observer lifecycle modifier that indicates this observer should only fire once per instance, it is then removed.
 *
 * Note: If you have a parent and child timeline "once" will affect both and the observer will fire once for a parent lifecycle
 * and once for a child lifecycle
 */
const once = addFlag(2 /* once */);
/**
 * Timeline represents a set of operations executed in order of definition,
 * with each moment's behavior controlled by the implementing function
 */
class Timeline {
    /**
     * Creates a new instance of Timeline with the supplied moments and optionally any observers to include
     *
     * @param moments The moment object defining this timeline
     * @param observers Any observers to include (optional)
     */
    constructor(moments, observers = {}) {
        this.moments = moments;
        this.observers = observers;
        this._onProxy = null;
        this._emitProxy = null;
        this._inheritingObservers = true;
    }
    /**
     * Apply the supplied behavior(s) to this timeline
     *
     * @param behaviors One or more behaviors
     * @returns `this` Timeline
     */
    using(...behaviors) {
        for (let i = 0; i < behaviors.length; i++) {
            behaviors[i](this);
        }
        return this;
    }
    /**
     * Property allowing access to manage observers on moments within this timeline
     */
    get on() {
        if (this._onProxy === null) {
            this._onProxy = new Proxy(this, {
                get: (target, p) => Object.assign((handler) => {
                    target.cloneObserversOnChange();
                    addObserver(target.observers, p, handler, "add");
                    return target;
                }, {
                    toArray: () => {
                        return Reflect.has(target.observers, p) ? [...Reflect.get(target.observers, p)] : [];
                    },
                    replace: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, "replace");
                        return target;
                    },
                    prepend: (handler) => {
                        target.cloneObserversOnChange();
                        addObserver(target.observers, p, handler, "prepend");
                        return target;
                    },
                    clear: () => {
                        if (Reflect.has(target.observers, p)) {
                            target.cloneObserversOnChange();
                            // we trust ourselves that this will be an array
                            target.observers[p].length = 0;
                            return true;
                        }
                        return false;
                    },
                }),
            });
        }
        return this._onProxy;
    }
    /**
     * Shorthand method to emit a logging event tied to this timeline
     *
     * @param message The message to log
     * @param level The level at which the message applies
     */
    log(message, level = 0) {
        this.emit.log(message, level);
    }
    /**
     * Shorthand method to emit an error event tied to this timeline
     *
     * @param e Optional. Any error object to emit. If none is provided no emit occurs
     */
    error(e) {
        if (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(e)) {
            this.emit.error(e);
        }
    }
    /**
     * Property allowing access to invoke a moment from within this timeline
     */
    get emit() {
        if (this._emitProxy === null) {
            this._emitProxy = new Proxy(this, {
                get: (target, p) => (...args) => {
                    // handle the case where no observers registered for the target moment
                    const observers = Reflect.has(target.observers, p) ? Reflect.get(target.observers, p) : [];
                    if ((!Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isArray"])(observers) || observers.length < 1) && p === "error") {
                        // if we are emitting an error, and no error observers are defined, we throw
                        throw Error(`Unhandled Exception: ${args[0]}`);
                    }
                    try {
                        // default to broadcasting any events without specific impl (will apply to log and error)
                        const moment = Reflect.has(target.moments, p) ? Reflect.get(target.moments, p) : p === "init" || p === "dispose" ? Object(_moments_js__WEBPACK_IMPORTED_MODULE_0__["lifecycle"])() : Object(_moments_js__WEBPACK_IMPORTED_MODULE_0__["broadcast"])();
                        // pass control to the individual moment's implementation
                        return Reflect.apply(moment, target, [observers, ...args]);
                    }
                    catch (e) {
                        if (p !== "error") {
                            this.error(e);
                        }
                        else {
                            // if all else fails, re-throw as we are getting errors from error observers meaning something is sideways
                            throw e;
                        }
                    }
                    finally {
                        // here we need to remove any "once" observers
                        Reflect.set(target.observers, p, observers.filter(byFlag(2 /* once */)));
                    }
                },
            });
        }
        return this._emitProxy;
    }
    /**
     * Starts a timeline
     *
     * @description This method first emits "init" to allow for any needed initial conditions then calls execute with any supplied init
     *
     * @param init A value passed into the execute logic from the initiator of the timeline
     * @returns The result of this.execute
     */
    start(init) {
        // initialize our timeline
        this.emit.init();
        // get a ref to the promise returned by execute
        const p = this.execute(init);
        // attach our dispose logic
        p.finally(() => {
            try {
                // provide an opportunity for cleanup of the timeline
                this.emit.dispose();
            }
            catch (e) {
                // shouldn't happen, but possible dispose throws - which may be missed as the usercode await will have resolved.
                const e2 = Object.assign(Error("Error in dispose."), {
                    innerException: e,
                });
                this.error(e2);
            }
        }).catch(() => void (0));
        // give the promise back to the caller
        return p;
    }
    /**
     * By default a timeline references the same observer collection as a parent timeline,
     * if any changes are made to the observers this method first clones them ensuring we
     * maintain a local copy and de-ref the parent
     */
    cloneObserversOnChange() {
        if (this._inheritingObservers) {
            this._inheritingObservers = false;
            this.observers = cloneObserverCollection(this.observers);
        }
    }
}
/**
 * Adds an observer to a given target
 *
 * @param target The object to which events are registered
 * @param moment The name of the moment to which the observer is registered
 * @param addBehavior Determines how the observer is added to the collection
 *
 */
function addObserver(target, moment, observer, addBehavior) {
    if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["isFunc"])(observer)) {
        throw Error("Observers must be functions.");
    }
    if (!Reflect.has(target, moment)) {
        // if we don't have a registration for this moment, then we just add a new prop
        target[moment] = [observer];
    }
    else {
        // if we have an existing property then we follow the specified behavior
        switch (addBehavior) {
            case "add":
                target[moment].push(observer);
                break;
            case "prepend":
                target[moment].unshift(observer);
                break;
            case "replace":
                target[moment].length = 0;
                target[moment].push(observer);
                break;
        }
    }
    return target[moment];
}
function cloneObserverCollection(source) {
    return Reflect.ownKeys(source).reduce((clone, key) => {
        // eslint-disable-next-line no-bitwise
        clone[key] = [...source[key].filter(byFlag(1 /* noInherit */))];
        return clone;
    }, {});
}
//# sourceMappingURL=timeline.js.map

/***/ }),

/***/ "4mSG":
/*!*******************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/components/Trainings/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fi */ "Tgqd");
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fc */ "29yR");
//import { SPFx, spfi } from '@pnp/sp';

//import "../LandingPage/Landing.scss"


var Trainings = function (props) {
    var _a;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'inCard bg-gradient-1' },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'inCard--header' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Trainings")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'row1' }, (_a = props.data) === null || _a === void 0 ? void 0 : _a.map(function (x) {
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
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: 'bullents round' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_icons_fc__WEBPACK_IMPORTED_MODULE_2__["FcReading"], { size: "45px" }),
                    x.trainingname,
                    date,
                    " ",
                    time,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: "https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement/Lists/TrainingCalender/DispForm.aspx?ID='+x.ID+'", target: '_blank' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_icons_fi__WEBPACK_IMPORTED_MODULE_1__["FiEye"], null)))));
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
/* harmony default export */ __webpack_exports__["default"] = (Trainings);


/***/ }),

/***/ "6k7F":
/*!********************************************!*\
  !*** ./node_modules/@pnp/sp/webs/index.js ***!
  \********************************************/
/*! exports provided: Web, Webs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "dVsc");
/* harmony import */ var _fi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fi.js */ "v6VW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Web", function() { return _types_js__WEBPACK_IMPORTED_MODULE_0__["Web"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Webs", function() { return _types_js__WEBPACK_IMPORTED_MODULE_0__["Webs"]; });




Reflect.defineProperty(_fi_js__WEBPACK_IMPORTED_MODULE_1__["SPFI"].prototype, "web", {
    configurable: true,
    enumerable: true,
    get: function () {
        return this.create(_types_js__WEBPACK_IMPORTED_MODULE_0__["Web"]);
    },
});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Bwa7":
/*!*******************************************!*\
  !*** ./node_modules/@pnp/sp/lists/web.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _webs_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../webs/types.js */ "dVsc");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "hy0S");
/* harmony import */ var _utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/odata-url-from.js */ "hTrG");
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../spqueryable.js */ "F4qD");
/* harmony import */ var _utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/encode-path-str.js */ "vbtm");






Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["addProp"])(_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"], "lists", _types_js__WEBPACK_IMPORTED_MODULE_2__["Lists"]);
Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["addProp"])(_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"], "siteUserInfoList", _types_js__WEBPACK_IMPORTED_MODULE_2__["List"]);
Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["addProp"])(_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"], "defaultDocumentLibrary", _types_js__WEBPACK_IMPORTED_MODULE_2__["List"]);
Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["addProp"])(_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"], "customListTemplates", _spqueryable_js__WEBPACK_IMPORTED_MODULE_4__["SPCollection"], "getcustomlisttemplates");
_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"].prototype.getList = function (listRelativeUrl) {
    return Object(_types_js__WEBPACK_IMPORTED_MODULE_2__["List"])(this, `getList('${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_5__["encodePath"])(listRelativeUrl)}')`);
};
_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["_Web"].prototype.getCatalog = async function (type) {
    const data = await Object(_webs_types_js__WEBPACK_IMPORTED_MODULE_1__["Web"])(this, `getcatalog(${type})`).select("Id")();
    return Object(_types_js__WEBPACK_IMPORTED_MODULE_2__["List"])([this, Object(_utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_3__["odataUrlFrom"])(data)]);
};
//# sourceMappingURL=web.js.map

/***/ }),

/***/ "DZog":
/*!*******************************************!*\
  !*** ./node_modules/@pnp/core/moments.js ***!
  \*******************************************/
/*! exports provided: broadcast, asyncBroadcast, reduce, asyncReduce, request, lifecycle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return broadcast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncBroadcast", function() { return asyncBroadcast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncReduce", function() { return asyncReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lifecycle", function() { return lifecycle; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "NuLX");

/**
 * Emits to all registered observers the supplied arguments. Any values returned by the observers are ignored
 *
 * @returns void
 */
function broadcast() {
    return function (observers, ...args) {
        const obs = [...observers];
        for (let i = 0; i < obs.length; i++) {
            Reflect.apply(obs[i], this, args);
        }
    };
}
/**
 * Defines a moment that executes each observer asynchronously in parallel awaiting all promises to resolve or reject before continuing
 *
 * @returns The final set of arguments
 */
function asyncBroadcast() {
    return async function (observers, ...args) {
        // get our initial values
        const r = args;
        const obs = [...observers];
        const promises = [];
        for (let i = 0; i < obs.length; i++) {
            promises.push(Reflect.apply(obs[i], this, r));
        }
        return Promise.all(promises);
    };
}
/**
 * Defines a moment that executes each observer synchronously, passing the returned arguments as the arguments to the next observer.
 * This is very much like the redux pattern taking the arguments as the state which each observer may modify then returning a new state
 *
 * @returns The final set of arguments
 */
function reduce() {
    return function (observers, ...args) {
        const obs = [...observers];
        return obs.reduce((params, func) => Reflect.apply(func, this, params), args);
    };
}
/**
 * Defines a moment that executes each observer asynchronously, awaiting the result and passes the returned arguments as the arguments to the next observer.
 * This is very much like the redux pattern taking the arguments as the state which each observer may modify then returning a new state
 *
 * @returns The final set of arguments
 */
function asyncReduce() {
    return async function (observers, ...args) {
        const obs = [...observers];
        return obs.reduce((prom, func) => prom.then((params) => Reflect.apply(func, this, params)), Promise.resolve(args));
    };
}
/**
 * Defines a moment where the first registered observer is used to asynchronously execute a request, returning a single result
 * If no result is returned (undefined) no further action is taken and the result will be undefined (i.e. additional observers are not used)
 *
 * @returns The result returned by the first registered observer
 */
function request() {
    return async function (observers, ...args) {
        if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isArray"])(observers) || observers.length < 1) {
            return undefined;
        }
        const handler = observers[0];
        return Reflect.apply(handler, this, args);
    };
}
/**
 * Defines a special moment used to configure the timeline itself before starting. Each observer is executed in order,
 * possibly modifying the "this" instance, with the final product returned
 *
 */
function lifecycle() {
    return function (observers, ...args) {
        const obs = [...observers];
        // process each handler which updates our instance in order
        // very similar to asyncReduce but the state is the object itself
        for (let i = 0; i < obs.length; i++) {
            Reflect.apply(obs[i], this, args);
        }
        return this;
    };
}
//# sourceMappingURL=moments.js.map

/***/ }),

/***/ "F4qD":
/*!*********************************************!*\
  !*** ./node_modules/@pnp/sp/spqueryable.js ***!
  \*********************************************/
/*! exports provided: spInvokableFactory, _SPQueryable, SPQueryable, _SPCollection, SPCollection, _SPInstance, SPInstance, deleteable, deleteableWithETag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spInvokableFactory", function() { return spInvokableFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SPQueryable", function() { return _SPQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPQueryable", function() { return SPQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SPCollection", function() { return _SPCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPCollection", function() { return SPCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SPInstance", function() { return _SPInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPInstance", function() { return SPInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteable", function() { return deleteable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteableWithETag", function() { return deleteableWithETag; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operations.js */ "UK2s");



const spInvokableFactory = (f) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["queryableFactory"])(f);
};
/**
 * SharePointQueryable Base Class
 *
 */
class _SPQueryable extends _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["Queryable"] {
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param base A string or SharePointQueryable that should form the base part of the url
     *
     */
    constructor(base, path) {
        if (typeof base === "string") {
            let url = "";
            let parentUrl = "";
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(base) || base.lastIndexOf("/") < 0) {
                parentUrl = base;
                url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(base, path);
            }
            else if (base.lastIndexOf("/") > base.lastIndexOf("(")) {
                // .../items(19)/fields
                const index = base.lastIndexOf("/");
                parentUrl = base.slice(0, index);
                path = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(base.slice(index), path);
                url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(parentUrl, path);
            }
            else {
                // .../items(19)
                const index = base.lastIndexOf("(");
                parentUrl = base.slice(0, index);
                url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(base, path);
            }
            // init base with corrected string value
            super(url);
            this.parentUrl = parentUrl;
        }
        else {
            super(base, path);
            const q = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isArray"])(base) ? base[0] : base;
            this.parentUrl = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isArray"])(base) ? base[1] : q.toUrl();
            const target = q.query.get("@target");
            if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(target)) {
                this.query.set("@target", target);
            }
        }
    }
    /**
     * Gets the full url with query information
     */
    toRequestUrl() {
        const aliasedParams = new URLSearchParams(this.query);
        // this regex is designed to locate aliased parameters within url paths. These may have the form:
        // /something(!@p1::value)
        // /something(!@p1::value, param=value)
        // /something(param=value,!@p1::value)
        // /something(param=value,!@p1::value,param=value)
        // /something(param=!@p1::value)
        // there could be spaces or not around the boundaries
        let url = this.toUrl().replace(/([( *| *, *| *= *])'!(@.*?)::(.*?)'([ *)| *, *])/ig, (match, frontBoundary, labelName, value, endBoundary) => {
            this.log(`Rewriting aliased parameter from match ${match} to label: ${labelName} value: ${value}`, 0);
            aliasedParams.set(labelName, `'${value}'`);
            return `${frontBoundary}${labelName}${endBoundary}`;
        });
        const query = aliasedParams.toString();
        if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["stringIsNullOrEmpty"])(query)) {
            url += `${url.indexOf("?") > -1 ? "&" : "?"}${query}`;
        }
        return url;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects) {
        if (selects.length > 0) {
            this.query.set("$select", selects.join(","));
        }
        return this;
    }
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands) {
        if (expands.length > 0) {
            this.query.set("$expand", expands.join(","));
        }
        return this;
    }
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    getParent(factory, path, base = this.parentUrl) {
        const parent = factory([this, base], path);
        const t = "@target";
        if (this.query.has(t)) {
            parent.query.set(t, this.query.get(t));
        }
        return parent;
    }
}
const SPQueryable = spInvokableFactory(_SPQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
class _SPCollection extends _SPQueryable {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    filter(filter) {
        this.query.set("$filter", filter);
        return this;
    }
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy, ascending = true) {
        const o = "$orderby";
        const query = this.query.has(o) ? this.query.get(o).split(",") : [];
        query.push(`${orderBy} ${ascending ? "asc" : "desc"}`);
        this.query.set(o, query.join(","));
        return this;
    }
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip) {
        this.query.set("$skip", skip.toString());
        return this;
    }
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top) {
        this.query.set("$top", top.toString());
        return this;
    }
}
const SPCollection = spInvokableFactory(_SPCollection);
/**
 * Represents an instance that can be selected
 *
 */
class _SPInstance extends _SPQueryable {
}
const SPInstance = spInvokableFactory(_SPInstance);
/**
 * Adds the a delete method to the tagged class taking no parameters and calling spPostDelete
 */
function deleteable() {
    return function () {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_2__["spPostDelete"])(this);
    };
}
function deleteableWithETag() {
    return function (eTag = "*") {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_2__["spPostDeleteETag"])(this, {}, eTag);
    };
}
//# sourceMappingURL=spqueryable.js.map

/***/ }),

/***/ "G6u6":
/*!********************************************************!*\
  !*** ./node_modules/@pnp/sp/utils/to-resource-path.js ***!
  \********************************************************/
/*! exports provided: toResourcePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toResourcePath", function() { return toResourcePath; });
function toResourcePath(url) {
    return {
        DecodedUrl: url,
    };
}
//# sourceMappingURL=to-resource-path.js.map

/***/ }),

/***/ "GfGO":
/*!**********************************************************!*\
  !*** ./node_modules/@pnp/sp/behaviors/request-digest.js ***!
  \**********************************************************/
/*! exports provided: RequestDigest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestDigest", function() { return RequestDigest; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _utils_extract_web_url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/extract-web-url.js */ "OXUt");
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../spqueryable.js */ "F4qD");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../operations.js */ "UK2s");





function clearExpired(digest) {
    const now = new Date();
    return !Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(digest) || (now > digest.expiration) ? null : digest;
}
// allows for the caching of digests across all calls which each have their own IDigestInfo wrapper.
const digests = new Map();
function RequestDigest(hook) {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            // add the request to the auth moment of the timeline
            this.on.auth(async (url, init) => {
                // eslint-disable-next-line max-len
                if (/get/i.test(init.method) || (init.headers && (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(init.headers, "X-RequestDigest") || Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(init.headers, "Authorization") || Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(init.headers, "X-PnPjs-NoDigest")))) {
                    return [url, init];
                }
                const urlAsString = url.toString();
                const webUrl = Object(_utils_extract_web_url_js__WEBPACK_IMPORTED_MODULE_2__["extractWebUrl"])(urlAsString);
                // do we have one in the cache that is still valid
                // from #2186 we need to always ensure the digest we get isn't expired
                let digest = clearExpired(digests.get(webUrl));
                if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(digest) && Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isFunc"])(hook)) {
                    digest = clearExpired(hook(urlAsString, init));
                }
                if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(digest)) {
                    digest = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_4__["spPost"])(Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["SPQueryable"])([this, Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(webUrl, "_api/contextinfo")]).using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["JSONParse"])()), {
                        headers: {
                            "X-PnPjs-NoDigest": "1",
                        },
                    }).then(p => ({
                        expiration: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(new Date(), "second", p.FormDigestTimeoutSeconds),
                        value: p.FormDigestValue,
                    }));
                }
                if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(digest)) {
                    // if we got a digest, set it in the headers
                    init.headers = {
                        "X-RequestDigest": digest.value,
                        ...init.headers,
                    };
                    // and cache it for future requests
                    digests.set(webUrl, digest);
                }
                return [url, init];
            });
            return [url, init, result];
        });
        return instance;
    };
}
//# sourceMappingURL=request-digest.js.map

/***/ }),

/***/ "IRrQ":
/*!***********************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/components/MasterPageRow3.scss.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./MasterPageRow3.css */ "a8uk");
var styles = {};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "ISfK":
/*!**********************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/timeout.js ***!
  \**********************************************************/
/*! exports provided: Timeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeout", function() { return Timeout; });
/**
 * Behavior that will cause a timeout in the request after the specified milliseconds
 *
 * @param timeout Number of milliseconds to set the timeout
 */
function Timeout(timeout) {
    return (instance) => {
        instance.on.pre(async (url, init, result) => {
            const controller = new AbortController();
            init.signal = controller.signal;
            setTimeout(() => controller.abort(), timeout);
            return [url, init, result];
        });
        return instance;
    };
}
//# sourceMappingURL=timeout.js.map

/***/ }),

/***/ "IwJs":
/*!*********************************************************************!*\
  !*** ./node_modules/@pnp/queryable/node_modules/tslib/tslib.es6.js ***!
  \*********************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldIn", function() { return __classPrivateFieldIn; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "J7sA":
/*!*********************************************!*\
  !*** ./node_modules/@pnp/sp/lists/index.js ***!
  \*********************************************/
/*! exports provided: List, Lists, ControlMode, RenderListDataOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web.js */ "Bwa7");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types.js */ "hy0S");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["List"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lists", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["Lists"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlMode", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["ControlMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderListDataOptions", function() { return _types_js__WEBPACK_IMPORTED_MODULE_1__["RenderListDataOptions"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "JC1J":
/*!*****************************************!*\
  !*** ./node_modules/@pnp/core/index.js ***!
  \*****************************************/
/*! exports provided: PnPClientStorageWrapper, PnPClientStorage, dateAdd, combine, getRandomString, getGUID, isFunc, isArray, isUrlAbsolute, stringIsNullOrEmpty, objectDefinedNotNull, jsS, hOP, getHashCode, delay, broadcast, asyncBroadcast, reduce, asyncReduce, request, lifecycle, noInherit, once, Timeline, cloneObserverCollection, extendable, extend, extendFactory, disableExtensions, enableExtensions, AssignFrom, CopyFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "L2F+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorageWrapper", function() { return _storage_js__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorageWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorage", function() { return _storage_js__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorage"]; });

/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "NuLX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateAdd", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["dateAdd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["combine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomString", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["getRandomString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGUID", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["getGUID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunc", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["isFunc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["isArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUrlAbsolute", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["isUrlAbsolute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringIsNullOrEmpty", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["stringIsNullOrEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectDefinedNotNull", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jsS", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["jsS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hOP", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["hOP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["getHashCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return _util_js__WEBPACK_IMPORTED_MODULE_1__["delay"]; });

/* harmony import */ var _moments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moments.js */ "DZog");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["broadcast"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncBroadcast", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["asyncBroadcast"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["reduce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncReduce", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["asyncReduce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "request", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["request"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lifecycle", function() { return _moments_js__WEBPACK_IMPORTED_MODULE_2__["lifecycle"]; });

/* harmony import */ var _timeline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline.js */ "4kGv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noInherit", function() { return _timeline_js__WEBPACK_IMPORTED_MODULE_3__["noInherit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "once", function() { return _timeline_js__WEBPACK_IMPORTED_MODULE_3__["once"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return _timeline_js__WEBPACK_IMPORTED_MODULE_3__["Timeline"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cloneObserverCollection", function() { return _timeline_js__WEBPACK_IMPORTED_MODULE_3__["cloneObserverCollection"]; });

/* harmony import */ var _extendable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extendable.js */ "t9SU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extendable", function() { return _extendable_js__WEBPACK_IMPORTED_MODULE_4__["extendable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _extendable_js__WEBPACK_IMPORTED_MODULE_4__["extend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extendFactory", function() { return _extendable_js__WEBPACK_IMPORTED_MODULE_4__["extendFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "disableExtensions", function() { return _extendable_js__WEBPACK_IMPORTED_MODULE_4__["disableExtensions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enableExtensions", function() { return _extendable_js__WEBPACK_IMPORTED_MODULE_4__["enableExtensions"]; });

/* harmony import */ var _behaviors_assign_from_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./behaviors/assign-from.js */ "zhiF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AssignFrom", function() { return _behaviors_assign_from_js__WEBPACK_IMPORTED_MODULE_5__["AssignFrom"]; });

/* harmony import */ var _behaviors_copy_from_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./behaviors/copy-from.js */ "qNel");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CopyFrom", function() { return _behaviors_copy_from_js__WEBPACK_IMPORTED_MODULE_6__["CopyFrom"]; });






/**
 * Behavior exports
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Js8M":
/*!***********************************************************!*\
  !*** ./node_modules/react-icons/lib/esm/iconsManifest.js ***!
  \***********************************************************/
/*! exports provided: IconsManifest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconsManifest", function() { return IconsManifest; });
var IconsManifest = [
  {
    "id": "ci",
    "name": "Circum Icons",
    "projectUrl": "https://circumicons.com/",
    "license": "MPL-2.0 license",
    "licenseUrl": "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE"
  },
  {
    "id": "fa",
    "name": "Font Awesome 5",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "io",
    "name": "Ionicons 4",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "io5",
    "name": "Ionicons 5",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "md",
    "name": "Material Design icons",
    "projectUrl": "http://google.github.io/material-design-icons/",
    "license": "Apache License Version 2.0",
    "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
  },
  {
    "id": "ti",
    "name": "Typicons",
    "projectUrl": "http://s-ings.com/typicons/",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "id": "go",
    "name": "Github Octicons icons",
    "projectUrl": "https://octicons.github.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
  },
  {
    "id": "fi",
    "name": "Feather",
    "projectUrl": "https://feathericons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
  },
  {
    "id": "lu",
    "name": "Lucide",
    "projectUrl": "https://lucide.dev/",
    "license": "ISC",
    "licenseUrl": "https://github.com/lucide-icons/lucide/blob/main/LICENSE"
  },
  {
    "id": "gi",
    "name": "Game Icons",
    "projectUrl": "https://game-icons.net/",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    "id": "wi",
    "name": "Weather Icons",
    "projectUrl": "https://erikflowers.github.io/weather-icons/",
    "license": "SIL OFL 1.1",
    "licenseUrl": "http://scripts.sil.org/OFL"
  },
  {
    "id": "di",
    "name": "Devicons",
    "projectUrl": "https://vorillaz.github.io/devicons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ai",
    "name": "Ant Design Icons",
    "projectUrl": "https://github.com/ant-design/ant-design-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "bs",
    "name": "Bootstrap Icons",
    "projectUrl": "https://github.com/twbs/icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ri",
    "name": "Remix Icon",
    "projectUrl": "https://github.com/Remix-Design/RemixIcon",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "fc",
    "name": "Flat Color Icons",
    "projectUrl": "https://github.com/icons8/flat-color-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "gr",
    "name": "Grommet-Icons",
    "projectUrl": "https://github.com/grommet/grommet-icons",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "hi",
    "name": "Heroicons",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "hi2",
    "name": "Heroicons 2",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "si",
    "name": "Simple Icons",
    "projectUrl": "https://simpleicons.org/",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    "id": "sl",
    "name": "Simple Line Icons",
    "projectUrl": "https://thesabbir.github.io/simple-line-icons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "im",
    "name": "IcoMoon Free",
    "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt"
  },
  {
    "id": "bi",
    "name": "BoxIcons",
    "projectUrl": "https://github.com/atisawd/boxicons",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/atisawd/boxicons/blob/master/LICENSE"
  },
  {
    "id": "cg",
    "name": "css.gg",
    "projectUrl": "https://github.com/astrit/css.gg",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "vsc",
    "name": "VS Code Icons",
    "projectUrl": "https://github.com/microsoft/vscode-codicons",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "tb",
    "name": "Tabler Icons",
    "projectUrl": "https://github.com/tabler/tabler-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "tfi",
    "name": "Themify Icons",
    "projectUrl": "https://github.com/lykmapipo/themify-icons",
    "license": "MIT",
    "licenseUrl": "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE"
  },
  {
    "id": "rx",
    "name": "Radix Icons",
    "projectUrl": "https://icons.radix-ui.com",
    "license": "MIT",
    "licenseUrl": "https://github.com/radix-ui/icons/blob/master/LICENSE"
  }
]

/***/ }),

/***/ "L2F+":
/*!*******************************************!*\
  !*** ./node_modules/@pnp/core/storage.js ***!
  \*******************************************/
/*! exports provided: PnPClientStorageWrapper, PnPClientStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorageWrapper", function() { return PnPClientStorageWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorage", function() { return PnPClientStorage; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "NuLX");

let storageShim;
function getStorageShim() {
    if (typeof storageShim === "undefined") {
        storageShim = new MemoryStorage();
    }
    return storageShim;
}
/**
 * A wrapper class to provide a consistent interface to browser based storage
 *
 */
class PnPClientStorageWrapper {
    /**
     * Creates a new instance of the PnPClientStorageWrapper class
     *
     * @constructor
     */
    constructor(store) {
        this.store = store;
        this.enabled = this.test();
    }
    /**
     * Get a value from storage, or null if that value does not exist
     *
     * @param key The key whose value we want to retrieve
     */
    get(key) {
        if (!this.enabled) {
            return null;
        }
        const o = this.store.getItem(key);
        if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(o)) {
            return null;
        }
        const persistable = JSON.parse(o);
        if (new Date(persistable.expiration) <= new Date()) {
            this.delete(key);
            return null;
        }
        else {
            return persistable.value;
        }
    }
    /**
     * Adds a value to the underlying storage
     *
     * @param key The key to use when storing the provided value
     * @param o The value to store
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    put(key, o, expire) {
        if (this.enabled) {
            this.store.setItem(key, this.createPersistable(o, expire));
        }
    }
    /**
     * Deletes a value from the underlying storage
     *
     * @param key The key of the pair we want to remove from storage
     */
    delete(key) {
        if (this.enabled) {
            this.store.removeItem(key);
        }
    }
    /**
     * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
     *
     * @param key The key to use when storing the provided value
     * @param getter A function which will upon execution provide the desired value
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    async getOrPut(key, getter, expire) {
        if (!this.enabled) {
            return getter();
        }
        let o = this.get(key);
        if (o === null) {
            o = await getter();
            this.put(key, o, expire);
        }
        return o;
    }
    /**
     * Deletes any expired items placed in the store by the pnp library, leaves other items untouched
     */
    async deleteExpired() {
        if (!this.enabled) {
            return;
        }
        for (let i = 0; i < this.store.length; i++) {
            const key = this.store.key(i);
            if (key !== null) {
                // test the stored item to see if we stored it
                if (/["|']?pnp["|']? ?: ?1/i.test(this.store.getItem(key))) {
                    // get those items as get will delete from cache if they are expired
                    await this.get(key);
                }
            }
        }
    }
    /**
     * Used to determine if the wrapped storage is available currently
     */
    test() {
        const str = "t";
        try {
            this.store.setItem(str, str);
            this.store.removeItem(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Creates the persistable to store
     */
    createPersistable(o, expire) {
        if (expire === undefined) {
            expire = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(new Date(), "minute", 5);
        }
        return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["jsS"])({ pnp: 1, expiration: expire, value: o });
    }
}
/**
 * A thin implementation of in-memory storage for use in nodejs
 */
class MemoryStorage {
    constructor(_store = new Map()) {
        this._store = _store;
    }
    get length() {
        return this._store.size;
    }
    clear() {
        this._store.clear();
    }
    getItem(key) {
        return this._store.get(key);
    }
    key(index) {
        return Array.from(this._store)[index][0];
    }
    removeItem(key) {
        this._store.delete(key);
    }
    setItem(key, data) {
        this._store.set(key, data);
    }
}
/**
 * A class that will establish wrappers for both local and session storage, substituting basic memory storage for nodejs
 */
class PnPClientStorage {
    /**
     * Creates a new instance of the PnPClientStorage class
     *
     * @constructor
     */
    constructor(_local = null, _session = null) {
        this._local = _local;
        this._session = _session;
    }
    /**
     * Provides access to the local storage of the browser
     */
    get local() {
        if (this._local === null) {
            this._local = new PnPClientStorageWrapper(typeof localStorage === "undefined" ? getStorageShim() : localStorage);
        }
        return this._local;
    }
    /**
     * Provides access to the session storage of the browser
     */
    get session() {
        if (this._session === null) {
            this._session = new PnPClientStorageWrapper(typeof sessionStorage === "undefined" ? getStorageShim() : sessionStorage);
        }
        return this._session;
    }
}
//# sourceMappingURL=storage.js.map

/***/ }),

/***/ "LVfT":
/*!**************************************************************!*\
  !*** ./node_modules/@pnp/sp/node_modules/tslib/tslib.es6.js ***!
  \**************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldIn", function() { return __classPrivateFieldIn; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "Lnxd":
/*!***************************************************!*\
  !*** ./node_modules/react-icons/lib/esm/index.js ***!
  \***************************************************/
/*! exports provided: IconsManifest, GenIcon, IconBase, DefaultContext, IconContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _iconsManifest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iconsManifest */ "Js8M");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconsManifest", function() { return _iconsManifest__WEBPACK_IMPORTED_MODULE_0__["IconsManifest"]; });

/* harmony import */ var _iconBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iconBase */ "aCOx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GenIcon", function() { return _iconBase__WEBPACK_IMPORTED_MODULE_1__["GenIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return _iconBase__WEBPACK_IMPORTED_MODULE_1__["IconBase"]; });

/* harmony import */ var _iconContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./iconContext */ "3quK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultContext", function() { return _iconContext__WEBPACK_IMPORTED_MODULE_2__["DefaultContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconContext", function() { return _iconContext__WEBPACK_IMPORTED_MODULE_2__["IconContext"]; });





/***/ }),

/***/ "NuLX":
/*!****************************************!*\
  !*** ./node_modules/@pnp/core/util.js ***!
  \****************************************/
/*! exports provided: dateAdd, combine, getRandomString, getGUID, isFunc, isArray, isUrlAbsolute, stringIsNullOrEmpty, objectDefinedNotNull, jsS, hOP, getHashCode, delay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateAdd", function() { return dateAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return combine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomString", function() { return getRandomString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGUID", function() { return getGUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunc", function() { return isFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUrlAbsolute", function() { return isUrlAbsolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringIsNullOrEmpty", function() { return stringIsNullOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectDefinedNotNull", function() { return objectDefinedNotNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsS", function() { return jsS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hOP", function() { return hOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return getHashCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
function dateAdd(date, interval, units) {
    let ret = new Date(date.toString()); // don't change original date
    switch (interval.toLowerCase()) {
        case "year":
            ret.setFullYear(ret.getFullYear() + units);
            break;
        case "quarter":
            ret.setMonth(ret.getMonth() + 3 * units);
            break;
        case "month":
            ret.setMonth(ret.getMonth() + units);
            break;
        case "week":
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case "day":
            ret.setDate(ret.getDate() + units);
            break;
        case "hour":
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case "minute":
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case "second":
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default:
            ret = undefined;
            break;
    }
    return ret;
}
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
function combine(...paths) {
    return paths
        .filter(path => !stringIsNullOrEmpty(path))
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(path => path.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
        .join("/")
        .replace(/\\/g, "/");
}
/**
 * Gets a random string of chars length
 *
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @param chars The length of the random string to generate
 */
function getRandomString(chars) {
    const text = new Array(chars);
    for (let i = 0; i < chars; i++) {
        text[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
    }
    return text.join("");
}
/**
 * Gets a random GUID value
 *
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
/* eslint-disable no-bitwise */
function getGUID() {
    let d = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
/* eslint-enable no-bitwise */
/**
 * Determines if a given value is a function
 *
 * @param f The thing to test for functionness
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunc(f) {
    return typeof f === "function";
}
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/
function isArray(array) {
    return Array.isArray(array);
}
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */
function isUrlAbsolute(url) {
    return /^https?:\/\/|^\/\//i.test(url);
}
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */
function stringIsNullOrEmpty(s) {
    return typeof s === "undefined" || s === null || s.length < 1;
}
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
function objectDefinedNotNull(obj) {
    return typeof obj !== "undefined" && obj !== null;
}
/**
 * Shorthand for JSON.stringify
 *
 * @param o Any type of object
 */
function jsS(o) {
    return JSON.stringify(o);
}
/**
 * Shorthand for Object.hasOwnProperty
 *
 * @param o Object to check for
 * @param p Name of the property
 */
function hOP(o, p) {
    return Object.hasOwnProperty.call(o, p);
}
/**
 * Generates a ~unique hash code
 *
 * From: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
/* eslint-disable no-bitwise */
function getHashCode(s) {
    let hash = 0;
    if (s.length === 0) {
        return hash;
    }
    for (let i = 0; i < s.length; i++) {
        const chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
/* eslint-enable no-bitwise */
/**
 * Waits a specified number of milliseconds before resolving
 *
 * @param ms Number of ms to wait
 */
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "OWTB":
/*!************************************************!*\
  !*** ./node_modules/@pnp/sp/behaviors/spfx.js ***!
  \************************************************/
/*! exports provided: SPFxToken, SPFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPFxToken", function() { return SPFxToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPFx", function() { return SPFx; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults.js */ "qZw7");
/* harmony import */ var _request_digest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-digest.js */ "GfGO");




function SPFxToken(context) {
    return (instance) => {
        instance.on.auth.replace(async function (url, init) {
            const provider = await context.aadTokenProviderFactory.getTokenProvider();
            const token = await provider.getToken(`${url.protocol}//${url.hostname}`);
            // eslint-disable-next-line @typescript-eslint/dot-notation
            init.headers["Authorization"] = `Bearer ${token}`;
            return [url, init];
        });
        return instance;
    };
}
function SPFx(context) {
    return (instance) => {
        instance.using(Object(_defaults_js__WEBPACK_IMPORTED_MODULE_2__["DefaultHeaders"])(), Object(_defaults_js__WEBPACK_IMPORTED_MODULE_2__["DefaultInit"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["BrowserFetchWithRetry"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["DefaultParse"])(), 
        // remove SPFx Token in default due to issues #2570, #2571
        // SPFxToken(context),
        Object(_request_digest_js__WEBPACK_IMPORTED_MODULE_3__["RequestDigest"])((url) => {
            var _a, _b, _c;
            const sameWeb = (new RegExp(`^${Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(context.pageContext.web.absoluteUrl, "/_api")}`, "i")).test(url);
            if (sameWeb && ((_b = (_a = context === null || context === void 0 ? void 0 : context.pageContext) === null || _a === void 0 ? void 0 : _a.legacyPageContext) === null || _b === void 0 ? void 0 : _b.formDigestValue)) {
                const creationDateFromDigest = new Date(context.pageContext.legacyPageContext.formDigestValue.split(",")[1]);
                // account for page lifetime in timeout #2304 & others
                // account for tab sleep #2550
                return {
                    value: context.pageContext.legacyPageContext.formDigestValue,
                    expiration: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(creationDateFromDigest, "second", ((_c = context.pageContext.legacyPageContext) === null || _c === void 0 ? void 0 : _c.formDigestTimeoutSeconds) - 15 || 1585),
                };
            }
        }));
        // we want to fix up the url first
        instance.on.pre.prepend(async (url, init, result) => {
            if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(url)) {
                url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(context.pageContext.web.absoluteUrl, url);
            }
            return [url, init, result];
        });
        return instance;
    };
}
//# sourceMappingURL=spfx.js.map

/***/ }),

/***/ "OXUt":
/*!*******************************************************!*\
  !*** ./node_modules/@pnp/sp/utils/extract-web-url.js ***!
  \*******************************************************/
/*! exports provided: extractWebUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractWebUrl", function() { return extractWebUrl; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");

function extractWebUrl(candidateUrl) {
    if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["stringIsNullOrEmpty"])(candidateUrl)) {
        return "";
    }
    let index = candidateUrl.indexOf("_api/");
    if (index < 0) {
        index = candidateUrl.indexOf("_vti_bin/");
    }
    if (index > -1) {
        return candidateUrl.substring(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}
//# sourceMappingURL=extract-web-url.js.map

/***/ }),

/***/ "Sgpy":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/masterPageRow3/components/MasterPageRow3.css ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js */ "Z+AG")(false);
// Module
exports.push([module.i, "*{margin:0;padding:0;box-sizing:border-box}.Containers3{min-width:100%!important;padding:2px 10px;height:265px;color:#000;font-size:12px;-ms-flex-pack:center;justify-content:center;display:grid;grid-auto-columns:1fr;grid-auto-flow:column;text-align:center}.rowMain3{box-shadow:9px 10px 8px rgba(0,0,0,.2);transition:.3s;width:95%;height:250px;overflow:hidden;background-color:#f0f8ff;margin:4px;border:1px solid #f0f8ff;border-radius:20px}.row32{height:77%;width:89%;-ms-flex-pack:center;justify-content:center;text-align:center;color:#000;overflow-y:scroll;padding:4px 36px;box-sizing:content-box}.row31{background-color:#345978;position:relative;z-index:9999;height:29px;top:0;color:#fff}table.training_table{text-align:center;padding:15px 145px}.row1{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}ul.bullets{list-style-type:none}ul.bullets.round{background:hsla(0,0%,100%,.23137254901960785) 0 0 no-repeat padding-box;border-radius:16px;padding:14px;color:#fff;margin:4px;text-align:left;font-size:16px}.marquee tag{width:400px;height:333px;padding:25px;margin:-12px -2px}.inCard{width:360px;height:460px;border-radius:16px;padding:20px;overflow:hidden}.inCard.bg-gradient-1{background:linear-gradient(180deg,#08c4ee 0,#09c3ee 3%,#9341fd)}.inCard.bg-gradient-2{background:linear-gradient(180deg,#ff16a2 0,#be3bce)}.inCard.bg-gradient-3{background:linear-gradient(180deg,#7117c9 0,#8a29ef)}.inCard--header{text-align:left;color:#fff;padding-bottom:8px}.inCard--header h2{font-size:24px}.footerButton{width:150px;height:46px;background-color:#fff;border-radius:8px;margin-left:85px;border:none;color:#8a29ef}", ""]);


/***/ }),

/***/ "TRxW":
/*!**************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/MasterPageRow3WebPart.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "faye");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-property-pane */ "26ea");
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! MasterPageRow3WebPartStrings */ "U5jc");
/* harmony import */ var MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_MasterPageRow3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/MasterPageRow3 */ "zw/I");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// import { Version } from '@microsoft/sp-core-library';




var MasterPageRow3WebPart = /** @class */ (function (_super) {
    __extends(MasterPageRow3WebPart, _super);
    function MasterPageRow3WebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        return _this;
    }
    MasterPageRow3WebPart.prototype.render = function () {
        var element = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_MasterPageRow3__WEBPACK_IMPORTED_MODULE_5__["default"], {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            context: this.context,
            ListName: this.properties.ListName,
        });
        react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](element, this.domElement);
    };
    MasterPageRow3WebPart.prototype.onInit = function () {
        var _this = this;
        return this._getEnvironmentMessage().then(function (message) {
            _this._environmentMessage = message;
        });
    };
    MasterPageRow3WebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
                .then(function (context) {
                var environmentMessage = '';
                switch (context.app.host.name) {
                    case 'Office': // running in Office
                        environmentMessage = _this.context.isServedFromLocalhost ? MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppLocalEnvironmentOffice"] : MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppOfficeEnvironment"];
                        break;
                    case 'Outlook': // running in Outlook
                        environmentMessage = _this.context.isServedFromLocalhost ? MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppLocalEnvironmentOutlook"] : MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppOutlookEnvironment"];
                        break;
                    case 'Teams': // running in Teams
                        environmentMessage = _this.context.isServedFromLocalhost ? MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppLocalEnvironmentTeams"] : MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppTeamsTabEnvironment"];
                        break;
                    default:
                        throw new Error('Unknown host');
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost ? MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppLocalEnvironmentSharePoint"] : MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["AppSharePointEnvironment"]);
    };
    MasterPageRow3WebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    MasterPageRow3WebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_1__["unmountComponentAtNode"](this.domElement);
    };
    // protected get dataVersion(): Version {
    //   return Version.parse('1.0');
    // }
    MasterPageRow3WebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["PropertyPaneDescription"]
                    },
                    groups: [
                        {
                            groupName: MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["BasicGroupName"],
                            groupFields: [
                                Object(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_2__["PropertyPaneTextField"])('description', {
                                    label: MasterPageRow3WebPartStrings__WEBPACK_IMPORTED_MODULE_4__["DescriptionFieldLabel"]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MasterPageRow3WebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_3__["BaseClientSideWebPart"]));
/* harmony default export */ __webpack_exports__["default"] = (MasterPageRow3WebPart);


/***/ }),

/***/ "Tgqd":
/*!**************************************************!*\
  !*** ./node_modules/react-icons/fi/index.esm.js ***!
  \**************************************************/
/*! exports provided: FiActivity, FiAirplay, FiAlertCircle, FiAlertOctagon, FiAlertTriangle, FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight, FiAnchor, FiAperture, FiArchive, FiArrowDownCircle, FiArrowDownLeft, FiArrowDownRight, FiArrowDown, FiArrowLeftCircle, FiArrowLeft, FiArrowRightCircle, FiArrowRight, FiArrowUpCircle, FiArrowUpLeft, FiArrowUpRight, FiArrowUp, FiAtSign, FiAward, FiBarChart2, FiBarChart, FiBatteryCharging, FiBattery, FiBellOff, FiBell, FiBluetooth, FiBold, FiBookOpen, FiBook, FiBookmark, FiBox, FiBriefcase, FiCalendar, FiCameraOff, FiCamera, FiCast, FiCheckCircle, FiCheckSquare, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronsDown, FiChevronsLeft, FiChevronsRight, FiChevronsUp, FiChrome, FiCircle, FiClipboard, FiClock, FiCloudDrizzle, FiCloudLightning, FiCloudOff, FiCloudRain, FiCloudSnow, FiCloud, FiCode, FiCodepen, FiCodesandbox, FiCoffee, FiColumns, FiCommand, FiCompass, FiCopy, FiCornerDownLeft, FiCornerDownRight, FiCornerLeftDown, FiCornerLeftUp, FiCornerRightDown, FiCornerRightUp, FiCornerUpLeft, FiCornerUpRight, FiCpu, FiCreditCard, FiCrop, FiCrosshair, FiDatabase, FiDelete, FiDisc, FiDivideCircle, FiDivideSquare, FiDivide, FiDollarSign, FiDownloadCloud, FiDownload, FiDribbble, FiDroplet, FiEdit2, FiEdit3, FiEdit, FiExternalLink, FiEyeOff, FiEye, FiFacebook, FiFastForward, FiFeather, FiFigma, FiFileMinus, FiFilePlus, FiFileText, FiFile, FiFilm, FiFilter, FiFlag, FiFolderMinus, FiFolderPlus, FiFolder, FiFramer, FiFrown, FiGift, FiGitBranch, FiGitCommit, FiGitMerge, FiGitPullRequest, FiGithub, FiGitlab, FiGlobe, FiGrid, FiHardDrive, FiHash, FiHeadphones, FiHeart, FiHelpCircle, FiHexagon, FiHome, FiImage, FiInbox, FiInfo, FiInstagram, FiItalic, FiKey, FiLayers, FiLayout, FiLifeBuoy, FiLink2, FiLink, FiLinkedin, FiList, FiLoader, FiLock, FiLogIn, FiLogOut, FiMail, FiMapPin, FiMap, FiMaximize2, FiMaximize, FiMeh, FiMenu, FiMessageCircle, FiMessageSquare, FiMicOff, FiMic, FiMinimize2, FiMinimize, FiMinusCircle, FiMinusSquare, FiMinus, FiMonitor, FiMoon, FiMoreHorizontal, FiMoreVertical, FiMousePointer, FiMove, FiMusic, FiNavigation2, FiNavigation, FiOctagon, FiPackage, FiPaperclip, FiPauseCircle, FiPause, FiPenTool, FiPercent, FiPhoneCall, FiPhoneForwarded, FiPhoneIncoming, FiPhoneMissed, FiPhoneOff, FiPhoneOutgoing, FiPhone, FiPieChart, FiPlayCircle, FiPlay, FiPlusCircle, FiPlusSquare, FiPlus, FiPocket, FiPower, FiPrinter, FiRadio, FiRefreshCcw, FiRefreshCw, FiRepeat, FiRewind, FiRotateCcw, FiRotateCw, FiRss, FiSave, FiScissors, FiSearch, FiSend, FiServer, FiSettings, FiShare2, FiShare, FiShieldOff, FiShield, FiShoppingBag, FiShoppingCart, FiShuffle, FiSidebar, FiSkipBack, FiSkipForward, FiSlack, FiSlash, FiSliders, FiSmartphone, FiSmile, FiSpeaker, FiSquare, FiStar, FiStopCircle, FiSun, FiSunrise, FiSunset, FiTablet, FiTag, FiTarget, FiTerminal, FiThermometer, FiThumbsDown, FiThumbsUp, FiToggleLeft, FiToggleRight, FiTool, FiTrash2, FiTrash, FiTrello, FiTrendingDown, FiTrendingUp, FiTriangle, FiTruck, FiTv, FiTwitch, FiTwitter, FiType, FiUmbrella, FiUnderline, FiUnlock, FiUploadCloud, FiUpload, FiUserCheck, FiUserMinus, FiUserPlus, FiUserX, FiUser, FiUsers, FiVideoOff, FiVideo, FiVoicemail, FiVolume1, FiVolume2, FiVolumeX, FiVolume, FiWatch, FiWifiOff, FiWifi, FiWind, FiXCircle, FiXOctagon, FiXSquare, FiX, FiYoutube, FiZapOff, FiZap, FiZoomIn, FiZoomOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiActivity", function() { return FiActivity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAirplay", function() { return FiAirplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlertCircle", function() { return FiAlertCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlertOctagon", function() { return FiAlertOctagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlertTriangle", function() { return FiAlertTriangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlignCenter", function() { return FiAlignCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlignJustify", function() { return FiAlignJustify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlignLeft", function() { return FiAlignLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAlignRight", function() { return FiAlignRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAnchor", function() { return FiAnchor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAperture", function() { return FiAperture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArchive", function() { return FiArchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowDownCircle", function() { return FiArrowDownCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowDownLeft", function() { return FiArrowDownLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowDownRight", function() { return FiArrowDownRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowDown", function() { return FiArrowDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowLeftCircle", function() { return FiArrowLeftCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowLeft", function() { return FiArrowLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowRightCircle", function() { return FiArrowRightCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowRight", function() { return FiArrowRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowUpCircle", function() { return FiArrowUpCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowUpLeft", function() { return FiArrowUpLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowUpRight", function() { return FiArrowUpRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiArrowUp", function() { return FiArrowUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAtSign", function() { return FiAtSign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiAward", function() { return FiAward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBarChart2", function() { return FiBarChart2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBarChart", function() { return FiBarChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBatteryCharging", function() { return FiBatteryCharging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBattery", function() { return FiBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBellOff", function() { return FiBellOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBell", function() { return FiBell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBluetooth", function() { return FiBluetooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBold", function() { return FiBold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBookOpen", function() { return FiBookOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBook", function() { return FiBook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBookmark", function() { return FiBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBox", function() { return FiBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiBriefcase", function() { return FiBriefcase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCalendar", function() { return FiCalendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCameraOff", function() { return FiCameraOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCamera", function() { return FiCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCast", function() { return FiCast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCheckCircle", function() { return FiCheckCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCheckSquare", function() { return FiCheckSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCheck", function() { return FiCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronDown", function() { return FiChevronDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronLeft", function() { return FiChevronLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronRight", function() { return FiChevronRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronUp", function() { return FiChevronUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronsDown", function() { return FiChevronsDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronsLeft", function() { return FiChevronsLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronsRight", function() { return FiChevronsRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChevronsUp", function() { return FiChevronsUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiChrome", function() { return FiChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCircle", function() { return FiCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiClipboard", function() { return FiClipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiClock", function() { return FiClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloudDrizzle", function() { return FiCloudDrizzle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloudLightning", function() { return FiCloudLightning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloudOff", function() { return FiCloudOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloudRain", function() { return FiCloudRain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloudSnow", function() { return FiCloudSnow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCloud", function() { return FiCloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCode", function() { return FiCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCodepen", function() { return FiCodepen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCodesandbox", function() { return FiCodesandbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCoffee", function() { return FiCoffee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiColumns", function() { return FiColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCommand", function() { return FiCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCompass", function() { return FiCompass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCopy", function() { return FiCopy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerDownLeft", function() { return FiCornerDownLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerDownRight", function() { return FiCornerDownRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerLeftDown", function() { return FiCornerLeftDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerLeftUp", function() { return FiCornerLeftUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerRightDown", function() { return FiCornerRightDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerRightUp", function() { return FiCornerRightUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerUpLeft", function() { return FiCornerUpLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCornerUpRight", function() { return FiCornerUpRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCpu", function() { return FiCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCreditCard", function() { return FiCreditCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCrop", function() { return FiCrop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiCrosshair", function() { return FiCrosshair; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDatabase", function() { return FiDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDelete", function() { return FiDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDisc", function() { return FiDisc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDivideCircle", function() { return FiDivideCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDivideSquare", function() { return FiDivideSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDivide", function() { return FiDivide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDollarSign", function() { return FiDollarSign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDownloadCloud", function() { return FiDownloadCloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDownload", function() { return FiDownload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDribbble", function() { return FiDribbble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiDroplet", function() { return FiDroplet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiEdit2", function() { return FiEdit2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiEdit3", function() { return FiEdit3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiEdit", function() { return FiEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiExternalLink", function() { return FiExternalLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiEyeOff", function() { return FiEyeOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiEye", function() { return FiEye; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFacebook", function() { return FiFacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFastForward", function() { return FiFastForward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFeather", function() { return FiFeather; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFigma", function() { return FiFigma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFileMinus", function() { return FiFileMinus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFilePlus", function() { return FiFilePlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFileText", function() { return FiFileText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFile", function() { return FiFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFilm", function() { return FiFilm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFilter", function() { return FiFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFlag", function() { return FiFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFolderMinus", function() { return FiFolderMinus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFolderPlus", function() { return FiFolderPlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFolder", function() { return FiFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFramer", function() { return FiFramer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiFrown", function() { return FiFrown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGift", function() { return FiGift; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGitBranch", function() { return FiGitBranch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGitCommit", function() { return FiGitCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGitMerge", function() { return FiGitMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGitPullRequest", function() { return FiGitPullRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGithub", function() { return FiGithub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGitlab", function() { return FiGitlab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGlobe", function() { return FiGlobe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiGrid", function() { return FiGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHardDrive", function() { return FiHardDrive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHash", function() { return FiHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHeadphones", function() { return FiHeadphones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHeart", function() { return FiHeart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHelpCircle", function() { return FiHelpCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHexagon", function() { return FiHexagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiHome", function() { return FiHome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiImage", function() { return FiImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiInbox", function() { return FiInbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiInfo", function() { return FiInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiInstagram", function() { return FiInstagram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiItalic", function() { return FiItalic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiKey", function() { return FiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLayers", function() { return FiLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLayout", function() { return FiLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLifeBuoy", function() { return FiLifeBuoy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLink2", function() { return FiLink2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLink", function() { return FiLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLinkedin", function() { return FiLinkedin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiList", function() { return FiList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLoader", function() { return FiLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLock", function() { return FiLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLogIn", function() { return FiLogIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiLogOut", function() { return FiLogOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMail", function() { return FiMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMapPin", function() { return FiMapPin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMap", function() { return FiMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMaximize2", function() { return FiMaximize2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMaximize", function() { return FiMaximize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMeh", function() { return FiMeh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMenu", function() { return FiMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMessageCircle", function() { return FiMessageCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMessageSquare", function() { return FiMessageSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMicOff", function() { return FiMicOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMic", function() { return FiMic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMinimize2", function() { return FiMinimize2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMinimize", function() { return FiMinimize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMinusCircle", function() { return FiMinusCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMinusSquare", function() { return FiMinusSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMinus", function() { return FiMinus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMonitor", function() { return FiMonitor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMoon", function() { return FiMoon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMoreHorizontal", function() { return FiMoreHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMoreVertical", function() { return FiMoreVertical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMousePointer", function() { return FiMousePointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMove", function() { return FiMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiMusic", function() { return FiMusic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiNavigation2", function() { return FiNavigation2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiNavigation", function() { return FiNavigation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiOctagon", function() { return FiOctagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPackage", function() { return FiPackage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPaperclip", function() { return FiPaperclip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPauseCircle", function() { return FiPauseCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPause", function() { return FiPause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPenTool", function() { return FiPenTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPercent", function() { return FiPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneCall", function() { return FiPhoneCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneForwarded", function() { return FiPhoneForwarded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneIncoming", function() { return FiPhoneIncoming; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneMissed", function() { return FiPhoneMissed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneOff", function() { return FiPhoneOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhoneOutgoing", function() { return FiPhoneOutgoing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPhone", function() { return FiPhone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPieChart", function() { return FiPieChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPlayCircle", function() { return FiPlayCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPlay", function() { return FiPlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPlusCircle", function() { return FiPlusCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPlusSquare", function() { return FiPlusSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPlus", function() { return FiPlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPocket", function() { return FiPocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPower", function() { return FiPower; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiPrinter", function() { return FiPrinter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRadio", function() { return FiRadio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRefreshCcw", function() { return FiRefreshCcw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRefreshCw", function() { return FiRefreshCw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRepeat", function() { return FiRepeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRewind", function() { return FiRewind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRotateCcw", function() { return FiRotateCcw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRotateCw", function() { return FiRotateCw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiRss", function() { return FiRss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSave", function() { return FiSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiScissors", function() { return FiScissors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSearch", function() { return FiSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSend", function() { return FiSend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiServer", function() { return FiServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSettings", function() { return FiSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShare2", function() { return FiShare2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShare", function() { return FiShare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShieldOff", function() { return FiShieldOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShield", function() { return FiShield; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShoppingBag", function() { return FiShoppingBag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShoppingCart", function() { return FiShoppingCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiShuffle", function() { return FiShuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSidebar", function() { return FiSidebar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSkipBack", function() { return FiSkipBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSkipForward", function() { return FiSkipForward; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSlack", function() { return FiSlack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSlash", function() { return FiSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSliders", function() { return FiSliders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSmartphone", function() { return FiSmartphone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSmile", function() { return FiSmile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSpeaker", function() { return FiSpeaker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSquare", function() { return FiSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiStar", function() { return FiStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiStopCircle", function() { return FiStopCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSun", function() { return FiSun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSunrise", function() { return FiSunrise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiSunset", function() { return FiSunset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTablet", function() { return FiTablet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTag", function() { return FiTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTarget", function() { return FiTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTerminal", function() { return FiTerminal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiThermometer", function() { return FiThermometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiThumbsDown", function() { return FiThumbsDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiThumbsUp", function() { return FiThumbsUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiToggleLeft", function() { return FiToggleLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiToggleRight", function() { return FiToggleRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTool", function() { return FiTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTrash2", function() { return FiTrash2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTrash", function() { return FiTrash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTrello", function() { return FiTrello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTrendingDown", function() { return FiTrendingDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTrendingUp", function() { return FiTrendingUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTriangle", function() { return FiTriangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTruck", function() { return FiTruck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTv", function() { return FiTv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTwitch", function() { return FiTwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiTwitter", function() { return FiTwitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiType", function() { return FiType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUmbrella", function() { return FiUmbrella; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUnderline", function() { return FiUnderline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUnlock", function() { return FiUnlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUploadCloud", function() { return FiUploadCloud; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUpload", function() { return FiUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUserCheck", function() { return FiUserCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUserMinus", function() { return FiUserMinus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUserPlus", function() { return FiUserPlus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUserX", function() { return FiUserX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUser", function() { return FiUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiUsers", function() { return FiUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVideoOff", function() { return FiVideoOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVideo", function() { return FiVideo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVoicemail", function() { return FiVoicemail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVolume1", function() { return FiVolume1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVolume2", function() { return FiVolume2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVolumeX", function() { return FiVolumeX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiVolume", function() { return FiVolume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiWatch", function() { return FiWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiWifiOff", function() { return FiWifiOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiWifi", function() { return FiWifi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiWind", function() { return FiWind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiXCircle", function() { return FiXCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiXOctagon", function() { return FiXOctagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiXSquare", function() { return FiXSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiX", function() { return FiX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiYoutube", function() { return FiYoutube; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiZapOff", function() { return FiZapOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiZap", function() { return FiZap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiZoomIn", function() { return FiZoomIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiZoomOut", function() { return FiZoomOut; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "Lnxd");
// THIS FILE IS AUTO GENERATED

function FiActivity (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"22 12 18 12 15 21 9 3 6 12 2 12"}}]})(props);
};
function FiAirplay (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}},{"tag":"polygon","attr":{"points":"12 15 17 21 7 21 12 15"}}]})(props);
};
function FiAlertCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12.01","y2":"16"}}]})(props);
};
function FiAlertOctagon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12.01","y2":"16"}}]})(props);
};
function FiAlertTriangle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"12","y2":"13"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12.01","y2":"17"}}]})(props);
};
function FiAlignCenter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"10","x2":"6","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"18","y1":"18","x2":"6","y2":"18"}}]})(props);
};
function FiAlignJustify (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"21","y1":"10","x2":"3","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"3","y2":"18"}}]})(props);
};
function FiAlignLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"10","x2":"3","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"17","y1":"18","x2":"3","y2":"18"}}]})(props);
};
function FiAlignRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"21","y1":"10","x2":"7","y2":"10"}},{"tag":"line","attr":{"x1":"21","y1":"6","x2":"3","y2":"6"}},{"tag":"line","attr":{"x1":"21","y1":"14","x2":"3","y2":"14"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"7","y2":"18"}}]})(props);
};
function FiAnchor (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"5","r":"3"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"8"}},{"tag":"path","attr":{"d":"M5 12H2a10 10 0 0 0 20 0h-3"}}]})(props);
};
function FiAperture (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"14.31","y1":"8","x2":"20.05","y2":"17.94"}},{"tag":"line","attr":{"x1":"9.69","y1":"8","x2":"21.17","y2":"8"}},{"tag":"line","attr":{"x1":"7.38","y1":"12","x2":"13.12","y2":"2.06"}},{"tag":"line","attr":{"x1":"9.69","y1":"16","x2":"3.95","y2":"6.06"}},{"tag":"line","attr":{"x1":"14.31","y1":"16","x2":"2.83","y2":"16"}},{"tag":"line","attr":{"x1":"16.62","y1":"12","x2":"10.88","y2":"21.94"}}]})(props);
};
function FiArchive (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"21 8 21 21 3 21 3 8"}},{"tag":"rect","attr":{"x":"1","y":"3","width":"22","height":"5"}},{"tag":"line","attr":{"x1":"10","y1":"12","x2":"14","y2":"12"}}]})(props);
};
function FiArrowDownCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"8 12 12 16 16 12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}}]})(props);
};
function FiArrowDownLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"7","x2":"7","y2":"17"}},{"tag":"polyline","attr":{"points":"17 17 7 17 7 7"}}]})(props);
};
function FiArrowDownRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"7","y1":"7","x2":"17","y2":"17"}},{"tag":"polyline","attr":{"points":"17 7 17 17 7 17"}}]})(props);
};
function FiArrowDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"5","x2":"12","y2":"19"}},{"tag":"polyline","attr":{"points":"19 12 12 19 5 12"}}]})(props);
};
function FiArrowLeftCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 8 8 12 12 16"}},{"tag":"line","attr":{"x1":"16","y1":"12","x2":"8","y2":"12"}}]})(props);
};
function FiArrowLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"12","x2":"5","y2":"12"}},{"tag":"polyline","attr":{"points":"12 19 5 12 12 5"}}]})(props);
};
function FiArrowRightCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 16 16 12 12 8"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiArrowRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}},{"tag":"polyline","attr":{"points":"12 5 19 12 12 19"}}]})(props);
};
function FiArrowUpCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"16 12 12 8 8 12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"8"}}]})(props);
};
function FiArrowUpLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"17","y1":"17","x2":"7","y2":"7"}},{"tag":"polyline","attr":{"points":"7 17 7 7 17 7"}}]})(props);
};
function FiArrowUpRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"7","y1":"17","x2":"17","y2":"7"}},{"tag":"polyline","attr":{"points":"7 7 17 7 17 17"}}]})(props);
};
function FiArrowUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"5"}},{"tag":"polyline","attr":{"points":"5 12 12 5 19 12"}}]})(props);
};
function FiAtSign (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"path","attr":{"d":"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"}}]})(props);
};
function FiAward (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"8","r":"7"}},{"tag":"polyline","attr":{"points":"8.21 13.89 7 23 12 20 17 23 15.79 13.88"}}]})(props);
};
function FiBarChart2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"20","x2":"18","y2":"10"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12","y2":"4"}},{"tag":"line","attr":{"x1":"6","y1":"20","x2":"6","y2":"14"}}]})(props);
};
function FiBarChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12","y2":"10"}},{"tag":"line","attr":{"x1":"18","y1":"20","x2":"18","y2":"4"}},{"tag":"line","attr":{"x1":"6","y1":"20","x2":"6","y2":"16"}}]})(props);
};
function FiBatteryCharging (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"}},{"tag":"line","attr":{"x1":"23","y1":"13","x2":"23","y2":"11"}},{"tag":"polyline","attr":{"points":"11 6 7 12 13 12 9 18"}}]})(props);
};
function FiBattery (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"6","width":"18","height":"12","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"23","y1":"13","x2":"23","y2":"11"}}]})(props);
};
function FiBellOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M13.73 21a2 2 0 0 1-3.46 0"}},{"tag":"path","attr":{"d":"M18.63 13A17.89 17.89 0 0 1 18 8"}},{"tag":"path","attr":{"d":"M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"}},{"tag":"path","attr":{"d":"M18 8a6 6 0 0 0-9.33-5"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiBell (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}},{"tag":"path","attr":{"d":"M13.73 21a2 2 0 0 1-3.46 0"}}]})(props);
};
function FiBluetooth (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"}}]})(props);
};
function FiBold (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}},{"tag":"path","attr":{"d":"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}}]})(props);
};
function FiBookOpen (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}},{"tag":"path","attr":{"d":"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}}]})(props);
};
function FiBook (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}},{"tag":"path","attr":{"d":"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"}}]})(props);
};
function FiBookmark (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}}]})(props);
};
function FiBox (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiBriefcase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"14","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}}]})(props);
};
function FiCalendar (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"4","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"16","y1":"2","x2":"16","y2":"6"}},{"tag":"line","attr":{"x1":"8","y1":"2","x2":"8","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"10","x2":"21","y2":"10"}}]})(props);
};
function FiCameraOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"}}]})(props);
};
function FiCamera (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}},{"tag":"circle","attr":{"cx":"12","cy":"13","r":"4"}}]})(props);
};
function FiCast (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}},{"tag":"line","attr":{"x1":"2","y1":"20","x2":"2.01","y2":"20"}}]})(props);
};
function FiCheckCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 11.08V12a10 10 0 1 1-5.93-9.14"}},{"tag":"polyline","attr":{"points":"22 4 12 14.01 9 11.01"}}]})(props);
};
function FiCheckSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 11 12 14 22 4"}},{"tag":"path","attr":{"d":"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}}]})(props);
};
function FiCheck (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"20 6 9 17 4 12"}}]})(props);
};
function FiChevronDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6 9 12 15 18 9"}}]})(props);
};
function FiChevronLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 18 9 12 15 6"}}]})(props);
};
function FiChevronRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 18 15 12 9 6"}}]})(props);
};
function FiChevronUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"18 15 12 9 6 15"}}]})(props);
};
function FiChevronsDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"7 13 12 18 17 13"}},{"tag":"polyline","attr":{"points":"7 6 12 11 17 6"}}]})(props);
};
function FiChevronsLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"11 17 6 12 11 7"}},{"tag":"polyline","attr":{"points":"18 17 13 12 18 7"}}]})(props);
};
function FiChevronsRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"13 17 18 12 13 7"}},{"tag":"polyline","attr":{"points":"6 17 11 12 6 7"}}]})(props);
};
function FiChevronsUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"17 11 12 6 7 11"}},{"tag":"polyline","attr":{"points":"17 18 12 13 7 18"}}]})(props);
};
function FiChrome (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"21.17","y1":"8","x2":"12","y2":"8"}},{"tag":"line","attr":{"x1":"3.95","y1":"6.06","x2":"8.54","y2":"14"}},{"tag":"line","attr":{"x1":"10.88","y1":"21.94","x2":"15.46","y2":"14"}}]})(props);
};
function FiCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}}]})(props);
};
function FiClipboard (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}},{"tag":"rect","attr":{"x":"8","y":"2","width":"8","height":"4","rx":"1","ry":"1"}}]})(props);
};
function FiClock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polyline","attr":{"points":"12 6 12 12 16 14"}}]})(props);
};
function FiCloudDrizzle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"19","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"8","y1":"13","x2":"8","y2":"15"}},{"tag":"line","attr":{"x1":"16","y1":"19","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"16","y1":"13","x2":"16","y2":"15"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"17"}},{"tag":"path","attr":{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}}]})(props);
};
function FiCloudLightning (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"}},{"tag":"polyline","attr":{"points":"13 11 9 17 15 17 11 23"}}]})(props);
};
function FiCloudOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiCloudRain (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"16","y1":"13","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"8","y1":"13","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"23"}},{"tag":"path","attr":{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}}]})(props);
};
function FiCloudSnow (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"}},{"tag":"line","attr":{"x1":"8","y1":"16","x2":"8.01","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"20","x2":"8.01","y2":"20"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12.01","y2":"22"}},{"tag":"line","attr":{"x1":"16","y1":"16","x2":"16.01","y2":"16"}},{"tag":"line","attr":{"x1":"16","y1":"20","x2":"16.01","y2":"20"}}]})(props);
};
function FiCloud (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"}}]})(props);
};
function FiCode (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 18 22 12 16 6"}},{"tag":"polyline","attr":{"points":"8 6 2 12 8 18"}}]})(props);
};
function FiCodepen (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"15.5"}},{"tag":"polyline","attr":{"points":"22 8.5 12 15.5 2 8.5"}},{"tag":"polyline","attr":{"points":"2 15.5 12 8.5 22 15.5"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"8.5"}}]})(props);
};
function FiCodesandbox (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"7.5 4.21 12 6.81 16.5 4.21"}},{"tag":"polyline","attr":{"points":"7.5 19.79 7.5 14.6 3 12"}},{"tag":"polyline","attr":{"points":"21 12 16.5 14.6 16.5 19.79"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiCoffee (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 8h1a4 4 0 0 1 0 8h-1"}},{"tag":"path","attr":{"d":"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"}},{"tag":"line","attr":{"x1":"6","y1":"1","x2":"6","y2":"4"}},{"tag":"line","attr":{"x1":"10","y1":"1","x2":"10","y2":"4"}},{"tag":"line","attr":{"x1":"14","y1":"1","x2":"14","y2":"4"}}]})(props);
};
function FiColumns (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"}}]})(props);
};
function FiCommand (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"}}]})(props);
};
function FiCompass (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polygon","attr":{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}}]})(props);
};
function FiCopy (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"9","y":"9","width":"13","height":"13","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}}]})(props);
};
function FiCornerDownLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 10 4 15 9 20"}},{"tag":"path","attr":{"d":"M20 4v7a4 4 0 0 1-4 4H4"}}]})(props);
};
function FiCornerDownRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 10 20 15 15 20"}},{"tag":"path","attr":{"d":"M4 4v7a4 4 0 0 0 4 4h12"}}]})(props);
};
function FiCornerLeftDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"14 15 9 20 4 15"}},{"tag":"path","attr":{"d":"M20 4h-7a4 4 0 0 0-4 4v12"}}]})(props);
};
function FiCornerLeftUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"14 9 9 4 4 9"}},{"tag":"path","attr":{"d":"M20 20h-7a4 4 0 0 1-4-4V4"}}]})(props);
};
function FiCornerRightDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"10 15 15 20 20 15"}},{"tag":"path","attr":{"d":"M4 4h7a4 4 0 0 1 4 4v12"}}]})(props);
};
function FiCornerRightUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"10 9 15 4 20 9"}},{"tag":"path","attr":{"d":"M4 20h7a4 4 0 0 0 4-4V4"}}]})(props);
};
function FiCornerUpLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"9 14 4 9 9 4"}},{"tag":"path","attr":{"d":"M20 20v-7a4 4 0 0 0-4-4H4"}}]})(props);
};
function FiCornerUpRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 14 20 9 15 4"}},{"tag":"path","attr":{"d":"M4 20v-7a4 4 0 0 1 4-4h12"}}]})(props);
};
function FiCpu (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"4","width":"16","height":"16","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"9","y":"9","width":"6","height":"6"}},{"tag":"line","attr":{"x1":"9","y1":"1","x2":"9","y2":"4"}},{"tag":"line","attr":{"x1":"15","y1":"1","x2":"15","y2":"4"}},{"tag":"line","attr":{"x1":"9","y1":"20","x2":"9","y2":"23"}},{"tag":"line","attr":{"x1":"15","y1":"20","x2":"15","y2":"23"}},{"tag":"line","attr":{"x1":"20","y1":"9","x2":"23","y2":"9"}},{"tag":"line","attr":{"x1":"20","y1":"14","x2":"23","y2":"14"}},{"tag":"line","attr":{"x1":"1","y1":"9","x2":"4","y2":"9"}},{"tag":"line","attr":{"x1":"1","y1":"14","x2":"4","y2":"14"}}]})(props);
};
function FiCreditCard (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"4","width":"22","height":"16","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"1","y1":"10","x2":"23","y2":"10"}}]})(props);
};
function FiCrop (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6.13 1L6 16a2 2 0 0 0 2 2h15"}},{"tag":"path","attr":{"d":"M1 6.13L16 6a2 2 0 0 1 2 2v15"}}]})(props);
};
function FiCrosshair (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"22","y1":"12","x2":"18","y2":"12"}},{"tag":"line","attr":{"x1":"6","y1":"12","x2":"2","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"6","x2":"12","y2":"2"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"18"}}]})(props);
};
function FiDatabase (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"ellipse","attr":{"cx":"12","cy":"5","rx":"9","ry":"3"}},{"tag":"path","attr":{"d":"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}},{"tag":"path","attr":{"d":"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}}]})(props);
};
function FiDelete (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"}},{"tag":"line","attr":{"x1":"18","y1":"9","x2":"12","y2":"15"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"18","y2":"15"}}]})(props);
};
function FiDisc (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}}]})(props);
};
function FiDivideCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"8"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}}]})(props);
};
function FiDivideSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"8"}}]})(props);
};
function FiDivide (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"6","r":"2"}},{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}},{"tag":"circle","attr":{"cx":"12","cy":"18","r":"2"}}]})(props);
};
function FiDollarSign (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"1","x2":"12","y2":"23"}},{"tag":"path","attr":{"d":"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}}]})(props);
};
function FiDownloadCloud (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"8 17 12 21 16 17"}},{"tag":"line","attr":{"x1":"12","y1":"12","x2":"12","y2":"21"}},{"tag":"path","attr":{"d":"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"}}]})(props);
};
function FiDownload (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}},{"tag":"polyline","attr":{"points":"7 10 12 15 17 10"}},{"tag":"line","attr":{"x1":"12","y1":"15","x2":"12","y2":"3"}}]})(props);
};
function FiDribbble (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"}}]})(props);
};
function FiDroplet (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"}}]})(props);
};
function FiEdit2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"}}]})(props);
};
function FiEdit3 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 20h9"}},{"tag":"path","attr":{"d":"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"}}]})(props);
};
function FiEdit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}},{"tag":"path","attr":{"d":"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"}}]})(props);
};
function FiExternalLink (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}},{"tag":"polyline","attr":{"points":"15 3 21 3 21 9"}},{"tag":"line","attr":{"x1":"10","y1":"14","x2":"21","y2":"3"}}]})(props);
};
function FiEyeOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiEye (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}}]})(props);
};
function FiFacebook (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}}]})(props);
};
function FiFastForward (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"13 19 22 12 13 5 13 19"}},{"tag":"polygon","attr":{"points":"2 19 11 12 2 5 2 19"}}]})(props);
};
function FiFeather (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"}},{"tag":"line","attr":{"x1":"16","y1":"8","x2":"2","y2":"22"}},{"tag":"line","attr":{"x1":"17.5","y1":"15","x2":"9","y2":"15"}}]})(props);
};
function FiFigma (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"}},{"tag":"path","attr":{"d":"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"}},{"tag":"path","attr":{"d":"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"}},{"tag":"path","attr":{"d":"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"}},{"tag":"path","attr":{"d":"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"}}]})(props);
};
function FiFileMinus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"9","y1":"15","x2":"15","y2":"15"}}]})(props);
};
function FiFilePlus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"9","y1":"15","x2":"15","y2":"15"}}]})(props);
};
function FiFileText (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}},{"tag":"polyline","attr":{"points":"14 2 14 8 20 8"}},{"tag":"line","attr":{"x1":"16","y1":"13","x2":"8","y2":"13"}},{"tag":"line","attr":{"x1":"16","y1":"17","x2":"8","y2":"17"}},{"tag":"polyline","attr":{"points":"10 9 9 9 8 9"}}]})(props);
};
function FiFile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}},{"tag":"polyline","attr":{"points":"13 2 13 9 20 9"}}]})(props);
};
function FiFilm (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"20","rx":"2.18","ry":"2.18"}},{"tag":"line","attr":{"x1":"7","y1":"2","x2":"7","y2":"22"}},{"tag":"line","attr":{"x1":"17","y1":"2","x2":"17","y2":"22"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"2","y1":"7","x2":"7","y2":"7"}},{"tag":"line","attr":{"x1":"2","y1":"17","x2":"7","y2":"17"}},{"tag":"line","attr":{"x1":"17","y1":"17","x2":"22","y2":"17"}},{"tag":"line","attr":{"x1":"17","y1":"7","x2":"22","y2":"7"}}]})(props);
};
function FiFilter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}}]})(props);
};
function FiFlag (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}},{"tag":"line","attr":{"x1":"4","y1":"22","x2":"4","y2":"15"}}]})(props);
};
function FiFolderMinus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}},{"tag":"line","attr":{"x1":"9","y1":"14","x2":"15","y2":"14"}}]})(props);
};
function FiFolderPlus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}},{"tag":"line","attr":{"x1":"12","y1":"11","x2":"12","y2":"17"}},{"tag":"line","attr":{"x1":"9","y1":"14","x2":"15","y2":"14"}}]})(props);
};
function FiFolder (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}]})(props);
};
function FiFramer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"}}]})(props);
};
function FiFrown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M16 16s-1.5-2-4-2-4 2-4 2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiGift (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"20 12 20 22 4 22 4 12"}},{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"5"}},{"tag":"line","attr":{"x1":"12","y1":"22","x2":"12","y2":"7"}},{"tag":"path","attr":{"d":"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}},{"tag":"path","attr":{"d":"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"}}]})(props);
};
function FiGitBranch (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"6","y1":"3","x2":"6","y2":"15"}},{"tag":"circle","attr":{"cx":"18","cy":"6","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"path","attr":{"d":"M18 9a9 9 0 0 1-9 9"}}]})(props);
};
function FiGitCommit (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"1.05","y1":"12","x2":"7","y2":"12"}},{"tag":"line","attr":{"x1":"17.01","y1":"12","x2":"22.96","y2":"12"}}]})(props);
};
function FiGitMerge (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"path","attr":{"d":"M6 21V9a9 9 0 0 0 9 9"}}]})(props);
};
function FiGitPullRequest (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"path","attr":{"d":"M13 6h3a2 2 0 0 1 2 2v7"}},{"tag":"line","attr":{"x1":"6","y1":"9","x2":"6","y2":"21"}}]})(props);
};
function FiGithub (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(props);
};
function FiGitlab (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"}}]})(props);
};
function FiGlobe (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"path","attr":{"d":"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}}]})(props);
};
function FiGrid (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"14","y":"3","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"14","y":"14","width":"7","height":"7"}},{"tag":"rect","attr":{"x":"3","y":"14","width":"7","height":"7"}}]})(props);
};
function FiHardDrive (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"22","y1":"12","x2":"2","y2":"12"}},{"tag":"path","attr":{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}},{"tag":"line","attr":{"x1":"6","y1":"16","x2":"6.01","y2":"16"}},{"tag":"line","attr":{"x1":"10","y1":"16","x2":"10.01","y2":"16"}}]})(props);
};
function FiHash (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"4","y1":"9","x2":"20","y2":"9"}},{"tag":"line","attr":{"x1":"4","y1":"15","x2":"20","y2":"15"}},{"tag":"line","attr":{"x1":"10","y1":"3","x2":"8","y2":"21"}},{"tag":"line","attr":{"x1":"16","y1":"3","x2":"14","y2":"21"}}]})(props);
};
function FiHeadphones (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 18v-6a9 9 0 0 1 18 0v6"}},{"tag":"path","attr":{"d":"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"}}]})(props);
};
function FiHeart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"}}]})(props);
};
function FiHelpCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12.01","y2":"17"}}]})(props);
};
function FiHexagon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}}]})(props);
};
function FiHome (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}},{"tag":"polyline","attr":{"points":"9 22 9 12 15 12 15 22"}}]})(props);
};
function FiImage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"8.5","r":"1.5"}},{"tag":"polyline","attr":{"points":"21 15 16 10 5 21"}}]})(props);
};
function FiInbox (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"22 12 16 12 14 15 10 15 8 12 2 12"}},{"tag":"path","attr":{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}}]})(props);
};
function FiInfo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"16","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12.01","y2":"8"}}]})(props);
};
function FiInstagram (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"20","rx":"5","ry":"5"}},{"tag":"path","attr":{"d":"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}},{"tag":"line","attr":{"x1":"17.5","y1":"6.5","x2":"17.51","y2":"6.5"}}]})(props);
};
function FiItalic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"4","x2":"10","y2":"4"}},{"tag":"line","attr":{"x1":"14","y1":"20","x2":"5","y2":"20"}},{"tag":"line","attr":{"x1":"15","y1":"4","x2":"9","y2":"20"}}]})(props);
};
function FiKey (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"}}]})(props);
};
function FiLayers (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 2 7 12 12 22 7 12 2"}},{"tag":"polyline","attr":{"points":"2 17 12 22 22 17"}},{"tag":"polyline","attr":{"points":"2 12 12 17 22 12"}}]})(props);
};
function FiLayout (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"3","y1":"9","x2":"21","y2":"9"}},{"tag":"line","attr":{"x1":"9","y1":"21","x2":"9","y2":"9"}}]})(props);
};
function FiLifeBuoy (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"4"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"9.17","y2":"9.17"}},{"tag":"line","attr":{"x1":"14.83","y1":"14.83","x2":"19.07","y2":"19.07"}},{"tag":"line","attr":{"x1":"14.83","y1":"9.17","x2":"19.07","y2":"4.93"}},{"tag":"line","attr":{"x1":"14.83","y1":"9.17","x2":"18.36","y2":"5.64"}},{"tag":"line","attr":{"x1":"4.93","y1":"19.07","x2":"9.17","y2":"14.83"}}]})(props);
};
function FiLink2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiLink (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}},{"tag":"path","attr":{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}}]})(props);
};
function FiLinkedin (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{"tag":"rect","attr":{"x":"2","y":"9","width":"4","height":"12"}},{"tag":"circle","attr":{"cx":"4","cy":"4","r":"2"}}]})(props);
};
function FiList (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"8","y1":"6","x2":"21","y2":"6"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"21","y2":"12"}},{"tag":"line","attr":{"x1":"8","y1":"18","x2":"21","y2":"18"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"3.01","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"12","x2":"3.01","y2":"12"}},{"tag":"line","attr":{"x1":"3","y1":"18","x2":"3.01","y2":"18"}}]})(props);
};
function FiLoader (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"6"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12","y2":"22"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"7.76","y2":"7.76"}},{"tag":"line","attr":{"x1":"16.24","y1":"16.24","x2":"19.07","y2":"19.07"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"6","y2":"12"}},{"tag":"line","attr":{"x1":"18","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"4.93","y1":"19.07","x2":"7.76","y2":"16.24"}},{"tag":"line","attr":{"x1":"16.24","y1":"7.76","x2":"19.07","y2":"4.93"}}]})(props);
};
function FiLock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M7 11V7a5 5 0 0 1 10 0v4"}}]})(props);
};
function FiLogIn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}},{"tag":"polyline","attr":{"points":"10 17 15 12 10 7"}},{"tag":"line","attr":{"x1":"15","y1":"12","x2":"3","y2":"12"}}]})(props);
};
function FiLogOut (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}},{"tag":"polyline","attr":{"points":"16 17 21 12 16 7"}},{"tag":"line","attr":{"x1":"21","y1":"12","x2":"9","y2":"12"}}]})(props);
};
function FiMail (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}},{"tag":"polyline","attr":{"points":"22,6 12,13 2,6"}}]})(props);
};
function FiMapPin (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}},{"tag":"circle","attr":{"cx":"12","cy":"10","r":"3"}}]})(props);
};
function FiMap (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}},{"tag":"line","attr":{"x1":"8","y1":"2","x2":"8","y2":"18"}},{"tag":"line","attr":{"x1":"16","y1":"6","x2":"16","y2":"22"}}]})(props);
};
function FiMaximize2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 3 21 3 21 9"}},{"tag":"polyline","attr":{"points":"9 21 3 21 3 15"}},{"tag":"line","attr":{"x1":"21","y1":"3","x2":"14","y2":"10"}},{"tag":"line","attr":{"x1":"3","y1":"21","x2":"10","y2":"14"}}]})(props);
};
function FiMaximize (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"}}]})(props);
};
function FiMeh (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"8","y1":"15","x2":"16","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiMenu (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"3","y1":"12","x2":"21","y2":"12"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"21","y2":"6"}},{"tag":"line","attr":{"x1":"3","y1":"18","x2":"21","y2":"18"}}]})(props);
};
function FiMessageCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"}}]})(props);
};
function FiMessageSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}}]})(props);
};
function FiMicOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"}},{"tag":"path","attr":{"d":"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"8","y1":"23","x2":"16","y2":"23"}}]})(props);
};
function FiMic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}},{"tag":"path","attr":{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"8","y1":"23","x2":"16","y2":"23"}}]})(props);
};
function FiMinimize2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 14 10 14 10 20"}},{"tag":"polyline","attr":{"points":"20 10 14 10 14 4"}},{"tag":"line","attr":{"x1":"14","y1":"10","x2":"21","y2":"3"}},{"tag":"line","attr":{"x1":"3","y1":"21","x2":"10","y2":"14"}}]})(props);
};
function FiMinimize (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"}}]})(props);
};
function FiMinusCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiMinusSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiMinus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}}]})(props);
};
function FiMonitor (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"3","width":"20","height":"14","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"8","y1":"21","x2":"16","y2":"21"}},{"tag":"line","attr":{"x1":"12","y1":"17","x2":"12","y2":"21"}}]})(props);
};
function FiMoon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}}]})(props);
};
function FiMoreHorizontal (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"19","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"5","cy":"12","r":"1"}}]})(props);
};
function FiMoreVertical (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"1"}},{"tag":"circle","attr":{"cx":"12","cy":"5","r":"1"}},{"tag":"circle","attr":{"cx":"12","cy":"19","r":"1"}}]})(props);
};
function FiMousePointer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"}},{"tag":"path","attr":{"d":"M13 13l6 6"}}]})(props);
};
function FiMove (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"5 9 2 12 5 15"}},{"tag":"polyline","attr":{"points":"9 5 12 2 15 5"}},{"tag":"polyline","attr":{"points":"15 19 12 22 9 19"}},{"tag":"polyline","attr":{"points":"19 9 22 12 19 15"}},{"tag":"line","attr":{"x1":"2","y1":"12","x2":"22","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"22"}}]})(props);
};
function FiMusic (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9 18V5l12-2v13"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"circle","attr":{"cx":"18","cy":"16","r":"3"}}]})(props);
};
function FiNavigation2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 19 21 12 17 5 21 12 2"}}]})(props);
};
function FiNavigation (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"3 11 22 2 13 21 11 13 3 11"}}]})(props);
};
function FiOctagon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}}]})(props);
};
function FiPackage (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"16.5","y1":"9.4","x2":"7.5","y2":"4.21"}},{"tag":"path","attr":{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}},{"tag":"polyline","attr":{"points":"3.27 6.96 12 12.01 20.73 6.96"}},{"tag":"line","attr":{"x1":"12","y1":"22.08","x2":"12","y2":"12"}}]})(props);
};
function FiPaperclip (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"}}]})(props);
};
function FiPauseCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"10","y1":"15","x2":"10","y2":"9"}},{"tag":"line","attr":{"x1":"14","y1":"15","x2":"14","y2":"9"}}]})(props);
};
function FiPause (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"6","y":"4","width":"4","height":"16"}},{"tag":"rect","attr":{"x":"14","y":"4","width":"4","height":"16"}}]})(props);
};
function FiPenTool (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 19l7-7 3 3-7 7-3-3z"}},{"tag":"path","attr":{"d":"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"}},{"tag":"path","attr":{"d":"M2 2l7.586 7.586"}},{"tag":"circle","attr":{"cx":"11","cy":"11","r":"2"}}]})(props);
};
function FiPercent (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"19","y1":"5","x2":"5","y2":"19"}},{"tag":"circle","attr":{"cx":"6.5","cy":"6.5","r":"2.5"}},{"tag":"circle","attr":{"cx":"17.5","cy":"17.5","r":"2.5"}}]})(props);
};
function FiPhoneCall (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneForwarded (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"19 1 23 5 19 9"}},{"tag":"line","attr":{"x1":"15","y1":"5","x2":"23","y2":"5"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneIncoming (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 2 16 8 22 8"}},{"tag":"line","attr":{"x1":"23","y1":"1","x2":"16","y2":"8"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneMissed (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"23","y1":"1","x2":"17","y2":"7"}},{"tag":"line","attr":{"x1":"17","y1":"1","x2":"23","y2":"7"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhoneOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}},{"tag":"line","attr":{"x1":"23","y1":"1","x2":"1","y2":"23"}}]})(props);
};
function FiPhoneOutgoing (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 7 23 1 17 1"}},{"tag":"line","attr":{"x1":"16","y1":"8","x2":"23","y2":"1"}},{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPhone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}}]})(props);
};
function FiPieChart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21.21 15.89A10 10 0 1 1 8 2.83"}},{"tag":"path","attr":{"d":"M22 12A10 10 0 0 0 12 2v10z"}}]})(props);
};
function FiPlayCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"polygon","attr":{"points":"10 8 16 12 10 16 10 8"}}]})(props);
};
function FiPlay (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"5 3 19 12 5 21 5 3"}}]})(props);
};
function FiPlusCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiPlusSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"16"}},{"tag":"line","attr":{"x1":"8","y1":"12","x2":"16","y2":"12"}}]})(props);
};
function FiPlus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"12","y1":"5","x2":"12","y2":"19"}},{"tag":"line","attr":{"x1":"5","y1":"12","x2":"19","y2":"12"}}]})(props);
};
function FiPocket (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}},{"tag":"polyline","attr":{"points":"8 10 12 14 16 10"}}]})(props);
};
function FiPower (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18.36 6.64a9 9 0 1 1-12.73 0"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"12"}}]})(props);
};
function FiPrinter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"6 9 6 2 18 2 18 9"}},{"tag":"path","attr":{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}},{"tag":"rect","attr":{"x":"6","y":"14","width":"12","height":"8"}}]})(props);
};
function FiRadio (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"2"}},{"tag":"path","attr":{"d":"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"}}]})(props);
};
function FiRefreshCcw (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"1 4 1 10 7 10"}},{"tag":"polyline","attr":{"points":"23 20 23 14 17 14"}},{"tag":"path","attr":{"d":"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"}}]})(props);
};
function FiRefreshCw (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 4 23 10 17 10"}},{"tag":"polyline","attr":{"points":"1 20 1 14 7 14"}},{"tag":"path","attr":{"d":"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"}}]})(props);
};
function FiRepeat (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"17 1 21 5 17 9"}},{"tag":"path","attr":{"d":"M3 11V9a4 4 0 0 1 4-4h14"}},{"tag":"polyline","attr":{"points":"7 23 3 19 7 15"}},{"tag":"path","attr":{"d":"M21 13v2a4 4 0 0 1-4 4H3"}}]})(props);
};
function FiRewind (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 19 2 12 11 5 11 19"}},{"tag":"polygon","attr":{"points":"22 19 13 12 22 5 22 19"}}]})(props);
};
function FiRotateCcw (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"1 4 1 10 7 10"}},{"tag":"path","attr":{"d":"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}}]})(props);
};
function FiRotateCw (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 4 23 10 17 10"}},{"tag":"path","attr":{"d":"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}}]})(props);
};
function FiRss (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 11a9 9 0 0 1 9 9"}},{"tag":"path","attr":{"d":"M4 4a16 16 0 0 1 16 16"}},{"tag":"circle","attr":{"cx":"5","cy":"19","r":"1"}}]})(props);
};
function FiSave (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}},{"tag":"polyline","attr":{"points":"17 21 17 13 7 13 7 21"}},{"tag":"polyline","attr":{"points":"7 3 7 8 15 8"}}]})(props);
};
function FiScissors (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"6","cy":"6","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"18","r":"3"}},{"tag":"line","attr":{"x1":"20","y1":"4","x2":"8.12","y2":"15.88"}},{"tag":"line","attr":{"x1":"14.47","y1":"14.48","x2":"20","y2":"20"}},{"tag":"line","attr":{"x1":"8.12","y1":"8.12","x2":"12","y2":"12"}}]})(props);
};
function FiSearch (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}]})(props);
};
function FiSend (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"22","y1":"2","x2":"11","y2":"13"}},{"tag":"polygon","attr":{"points":"22 2 15 22 11 13 2 9 22 2"}}]})(props);
};
function FiServer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"2","width":"20","height":"8","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"2","y":"14","width":"20","height":"8","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"6","y1":"6","x2":"6.01","y2":"6"}},{"tag":"line","attr":{"x1":"6","y1":"18","x2":"6.01","y2":"18"}}]})(props);
};
function FiSettings (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"3"}},{"tag":"path","attr":{"d":"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"}}]})(props);
};
function FiShare2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"18","cy":"5","r":"3"}},{"tag":"circle","attr":{"cx":"6","cy":"12","r":"3"}},{"tag":"circle","attr":{"cx":"18","cy":"19","r":"3"}},{"tag":"line","attr":{"x1":"8.59","y1":"13.51","x2":"15.42","y2":"17.49"}},{"tag":"line","attr":{"x1":"15.41","y1":"6.51","x2":"8.59","y2":"10.49"}}]})(props);
};
function FiShare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}},{"tag":"polyline","attr":{"points":"16 6 12 2 8 6"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"15"}}]})(props);
};
function FiShieldOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"}},{"tag":"path","attr":{"d":"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiShield (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}}]})(props);
};
function FiShoppingBag (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}},{"tag":"line","attr":{"x1":"3","y1":"6","x2":"21","y2":"6"}},{"tag":"path","attr":{"d":"M16 10a4 4 0 0 1-8 0"}}]})(props);
};
function FiShoppingCart (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"9","cy":"21","r":"1"}},{"tag":"circle","attr":{"cx":"20","cy":"21","r":"1"}},{"tag":"path","attr":{"d":"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"}}]})(props);
};
function FiShuffle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 3 21 3 21 8"}},{"tag":"line","attr":{"x1":"4","y1":"20","x2":"21","y2":"3"}},{"tag":"polyline","attr":{"points":"21 16 21 21 16 21"}},{"tag":"line","attr":{"x1":"15","y1":"15","x2":"21","y2":"21"}},{"tag":"line","attr":{"x1":"4","y1":"4","x2":"9","y2":"9"}}]})(props);
};
function FiSidebar (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"9","y1":"3","x2":"9","y2":"21"}}]})(props);
};
function FiSkipBack (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"19 20 9 12 19 4 19 20"}},{"tag":"line","attr":{"x1":"5","y1":"19","x2":"5","y2":"5"}}]})(props);
};
function FiSkipForward (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"5 4 15 12 5 20 5 4"}},{"tag":"line","attr":{"x1":"19","y1":"5","x2":"19","y2":"19"}}]})(props);
};
function FiSlack (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"}},{"tag":"path","attr":{"d":"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"}},{"tag":"path","attr":{"d":"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"}},{"tag":"path","attr":{"d":"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"}},{"tag":"path","attr":{"d":"M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"}},{"tag":"path","attr":{"d":"M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"}},{"tag":"path","attr":{"d":"M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"}},{"tag":"path","attr":{"d":"M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"}}]})(props);
};
function FiSlash (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"4.93","y1":"4.93","x2":"19.07","y2":"19.07"}}]})(props);
};
function FiSliders (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"4","y1":"21","x2":"4","y2":"14"}},{"tag":"line","attr":{"x1":"4","y1":"10","x2":"4","y2":"3"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"12"}},{"tag":"line","attr":{"x1":"12","y1":"8","x2":"12","y2":"3"}},{"tag":"line","attr":{"x1":"20","y1":"21","x2":"20","y2":"16"}},{"tag":"line","attr":{"x1":"20","y1":"12","x2":"20","y2":"3"}},{"tag":"line","attr":{"x1":"1","y1":"14","x2":"7","y2":"14"}},{"tag":"line","attr":{"x1":"9","y1":"8","x2":"15","y2":"8"}},{"tag":"line","attr":{"x1":"17","y1":"16","x2":"23","y2":"16"}}]})(props);
};
function FiSmartphone (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"5","y":"2","width":"14","height":"20","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}}]})(props);
};
function FiSmile (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"path","attr":{"d":"M8 14s1.5 2 4 2 4-2 4-2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"9.01","y2":"9"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"15.01","y2":"9"}}]})(props);
};
function FiSpeaker (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}},{"tag":"circle","attr":{"cx":"12","cy":"14","r":"4"}},{"tag":"line","attr":{"x1":"12","y1":"6","x2":"12.01","y2":"6"}}]})(props);
};
function FiSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}]})(props);
};
function FiStar (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}}]})(props);
};
function FiStopCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"rect","attr":{"x":"9","y":"9","width":"6","height":"6"}}]})(props);
};
function FiSun (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"5"}},{"tag":"line","attr":{"x1":"12","y1":"1","x2":"12","y2":"3"}},{"tag":"line","attr":{"x1":"12","y1":"21","x2":"12","y2":"23"}},{"tag":"line","attr":{"x1":"4.22","y1":"4.22","x2":"5.64","y2":"5.64"}},{"tag":"line","attr":{"x1":"18.36","y1":"18.36","x2":"19.78","y2":"19.78"}},{"tag":"line","attr":{"x1":"1","y1":"12","x2":"3","y2":"12"}},{"tag":"line","attr":{"x1":"21","y1":"12","x2":"23","y2":"12"}},{"tag":"line","attr":{"x1":"4.22","y1":"19.78","x2":"5.64","y2":"18.36"}},{"tag":"line","attr":{"x1":"18.36","y1":"5.64","x2":"19.78","y2":"4.22"}}]})(props);
};
function FiSunrise (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 18a5 5 0 0 0-10 0"}},{"tag":"line","attr":{"x1":"12","y1":"2","x2":"12","y2":"9"}},{"tag":"line","attr":{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}},{"tag":"line","attr":{"x1":"1","y1":"18","x2":"3","y2":"18"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"23","y2":"18"}},{"tag":"line","attr":{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}},{"tag":"line","attr":{"x1":"23","y1":"22","x2":"1","y2":"22"}},{"tag":"polyline","attr":{"points":"8 6 12 2 16 6"}}]})(props);
};
function FiSunset (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 18a5 5 0 0 0-10 0"}},{"tag":"line","attr":{"x1":"12","y1":"9","x2":"12","y2":"2"}},{"tag":"line","attr":{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}},{"tag":"line","attr":{"x1":"1","y1":"18","x2":"3","y2":"18"}},{"tag":"line","attr":{"x1":"21","y1":"18","x2":"23","y2":"18"}},{"tag":"line","attr":{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}},{"tag":"line","attr":{"x1":"23","y1":"22","x2":"1","y2":"22"}},{"tag":"polyline","attr":{"points":"16 5 12 9 8 5"}}]})(props);
};
function FiTablet (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"12","y1":"18","x2":"12.01","y2":"18"}}]})(props);
};
function FiTag (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}},{"tag":"line","attr":{"x1":"7","y1":"7","x2":"7.01","y2":"7"}}]})(props);
};
function FiTarget (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"6"}},{"tag":"circle","attr":{"cx":"12","cy":"12","r":"2"}}]})(props);
};
function FiTerminal (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 17 10 11 4 5"}},{"tag":"line","attr":{"x1":"12","y1":"19","x2":"20","y2":"19"}}]})(props);
};
function FiThermometer (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"}}]})(props);
};
function FiThumbsDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"}}]})(props);
};
function FiThumbsUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"}}]})(props);
};
function FiToggleLeft (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}},{"tag":"circle","attr":{"cx":"8","cy":"12","r":"3"}}]})(props);
};
function FiToggleRight (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}},{"tag":"circle","attr":{"cx":"16","cy":"12","r":"3"}}]})(props);
};
function FiTool (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}}]})(props);
};
function FiTrash2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"3 6 5 6 21 6"}},{"tag":"path","attr":{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}},{"tag":"line","attr":{"x1":"10","y1":"11","x2":"10","y2":"17"}},{"tag":"line","attr":{"x1":"14","y1":"11","x2":"14","y2":"17"}}]})(props);
};
function FiTrash (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"3 6 5 6 21 6"}},{"tag":"path","attr":{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}}]})(props);
};
function FiTrello (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"rect","attr":{"x":"7","y":"7","width":"3","height":"9"}},{"tag":"rect","attr":{"x":"14","y":"7","width":"3","height":"5"}}]})(props);
};
function FiTrendingDown (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 18 13.5 8.5 8.5 13.5 1 6"}},{"tag":"polyline","attr":{"points":"17 18 23 18 23 12"}}]})(props);
};
function FiTrendingUp (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"23 6 13.5 15.5 8.5 10.5 1 18"}},{"tag":"polyline","attr":{"points":"17 6 23 6 23 12"}}]})(props);
};
function FiTriangle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}}]})(props);
};
function FiTruck (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"1","y":"3","width":"15","height":"13"}},{"tag":"polygon","attr":{"points":"16 8 20 8 23 11 23 16 16 16 16 8"}},{"tag":"circle","attr":{"cx":"5.5","cy":"18.5","r":"2.5"}},{"tag":"circle","attr":{"cx":"18.5","cy":"18.5","r":"2.5"}}]})(props);
};
function FiTv (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"2","y":"7","width":"20","height":"15","rx":"2","ry":"2"}},{"tag":"polyline","attr":{"points":"17 2 12 7 7 2"}}]})(props);
};
function FiTwitch (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"}}]})(props);
};
function FiTwitter (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}}]})(props);
};
function FiType (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"4 7 4 4 20 4 20 7"}},{"tag":"line","attr":{"x1":"9","y1":"20","x2":"15","y2":"20"}},{"tag":"line","attr":{"x1":"12","y1":"4","x2":"12","y2":"20"}}]})(props);
};
function FiUmbrella (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"}}]})(props);
};
function FiUnderline (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"}},{"tag":"line","attr":{"x1":"4","y1":"21","x2":"20","y2":"21"}}]})(props);
};
function FiUnlock (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}},{"tag":"path","attr":{"d":"M7 11V7a5 5 0 0 1 9.9-1"}}]})(props);
};
function FiUploadCloud (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"16 16 12 12 8 16"}},{"tag":"line","attr":{"x1":"12","y1":"12","x2":"12","y2":"21"}},{"tag":"path","attr":{"d":"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}},{"tag":"polyline","attr":{"points":"16 16 12 12 8 16"}}]})(props);
};
function FiUpload (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}},{"tag":"polyline","attr":{"points":"17 8 12 3 7 8"}},{"tag":"line","attr":{"x1":"12","y1":"3","x2":"12","y2":"15"}}]})(props);
};
function FiUserCheck (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"polyline","attr":{"points":"17 11 19 13 23 9"}}]})(props);
};
function FiUserMinus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"23","y1":"11","x2":"17","y2":"11"}}]})(props);
};
function FiUserPlus (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"20","y1":"8","x2":"20","y2":"14"}},{"tag":"line","attr":{"x1":"23","y1":"11","x2":"17","y2":"11"}}]})(props);
};
function FiUserX (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"8.5","cy":"7","r":"4"}},{"tag":"line","attr":{"x1":"18","y1":"8","x2":"23","y2":"13"}},{"tag":"line","attr":{"x1":"23","y1":"8","x2":"18","y2":"13"}}]})(props);
};
function FiUser (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"12","cy":"7","r":"4"}}]})(props);
};
function FiUsers (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}},{"tag":"circle","attr":{"cx":"9","cy":"7","r":"4"}},{"tag":"path","attr":{"d":"M23 21v-2a4 4 0 0 0-3-3.87"}},{"tag":"path","attr":{"d":"M16 3.13a4 4 0 0 1 0 7.75"}}]})(props);
};
function FiVideoOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiVideo (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"23 7 16 12 23 17 23 7"}},{"tag":"rect","attr":{"x":"1","y":"5","width":"15","height":"14","rx":"2","ry":"2"}}]})(props);
};
function FiVoicemail (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"5.5","cy":"11.5","r":"4.5"}},{"tag":"circle","attr":{"cx":"18.5","cy":"11.5","r":"4.5"}},{"tag":"line","attr":{"x1":"5.5","y1":"16","x2":"18.5","y2":"16"}}]})(props);
};
function FiVolume1 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"path","attr":{"d":"M15.54 8.46a5 5 0 0 1 0 7.07"}}]})(props);
};
function FiVolume2 (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"path","attr":{"d":"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"}}]})(props);
};
function FiVolumeX (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"line","attr":{"x1":"23","y1":"9","x2":"17","y2":"15"}},{"tag":"line","attr":{"x1":"17","y1":"9","x2":"23","y2":"15"}}]})(props);
};
function FiVolume (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}]})(props);
};
function FiWatch (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"7"}},{"tag":"polyline","attr":{"points":"12 9 12 12 13.5 13.5"}},{"tag":"path","attr":{"d":"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"}}]})(props);
};
function FiWifiOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}},{"tag":"path","attr":{"d":"M16.72 11.06A10.94 10.94 0 0 1 19 12.55"}},{"tag":"path","attr":{"d":"M5 12.55a10.94 10.94 0 0 1 5.17-2.39"}},{"tag":"path","attr":{"d":"M10.71 5.05A16 16 0 0 1 22.58 9"}},{"tag":"path","attr":{"d":"M1.42 9a15.91 15.91 0 0 1 4.7-2.88"}},{"tag":"path","attr":{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12.01","y2":"20"}}]})(props);
};
function FiWifi (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M5 12.55a11 11 0 0 1 14.08 0"}},{"tag":"path","attr":{"d":"M1.42 9a16 16 0 0 1 21.16 0"}},{"tag":"path","attr":{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}},{"tag":"line","attr":{"x1":"12","y1":"20","x2":"12.01","y2":"20"}}]})(props);
};
function FiWind (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"}}]})(props);
};
function FiXCircle (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"12","cy":"12","r":"10"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}}]})(props);
};
function FiXOctagon (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}}]})(props);
};
function FiXSquare (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"rect","attr":{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}},{"tag":"line","attr":{"x1":"9","y1":"9","x2":"15","y2":"15"}},{"tag":"line","attr":{"x1":"15","y1":"9","x2":"9","y2":"15"}}]})(props);
};
function FiX (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"line","attr":{"x1":"18","y1":"6","x2":"6","y2":"18"}},{"tag":"line","attr":{"x1":"6","y1":"6","x2":"18","y2":"18"}}]})(props);
};
function FiYoutube (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"}},{"tag":"polygon","attr":{"points":"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"}}]})(props);
};
function FiZapOff (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"12.41 6.75 13 2 10.57 4.92"}},{"tag":"polyline","attr":{"points":"18.57 12.91 21 10 15.66 10"}},{"tag":"polyline","attr":{"points":"8 8 3 14 12 14 11 22 16 16"}},{"tag":"line","attr":{"x1":"1","y1":"1","x2":"23","y2":"23"}}]})(props);
};
function FiZap (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"13 2 3 14 12 14 11 22 21 10 12 10 13 2"}}]})(props);
};
function FiZoomIn (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}},{"tag":"line","attr":{"x1":"11","y1":"8","x2":"11","y2":"14"}},{"tag":"line","attr":{"x1":"8","y1":"11","x2":"14","y2":"11"}}]})(props);
};
function FiZoomOut (props) {
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["GenIcon"])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}},{"tag":"line","attr":{"x1":"8","y1":"11","x2":"14","y2":"11"}}]})(props);
};


/***/ }),

/***/ "U5jc":
/*!***********************************************!*\
  !*** external "MasterPageRow3WebPartStrings" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_U5jc__;

/***/ }),

/***/ "UK2s":
/*!********************************************!*\
  !*** ./node_modules/@pnp/sp/operations.js ***!
  \********************************************/
/*! exports provided: spGet, spPost, spPostMerge, spPostDelete, spPostDeleteETag, spDelete, spPatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spGet", function() { return spGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spPost", function() { return spPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spPostMerge", function() { return spPostMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spPostDelete", function() { return spPostDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spPostDeleteETag", function() { return spPostDeleteETag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spDelete", function() { return spDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spPatch", function() { return spPatch; });
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");

const spGet = (o, init) => {
    return Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["op"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["get"], init);
};
const spPost = (o, init) => Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["op"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["post"], init);
const spPostMerge = (o, init) => {
    init = init || {};
    init.headers = { ...init.headers, "X-HTTP-Method": "MERGE" };
    return spPost(o, init);
};
const spPostDelete = (o, init) => {
    init = init || {};
    init.headers = { ...init.headers || {}, "X-HTTP-Method": "DELETE" };
    return spPost(o, init);
};
const spPostDeleteETag = (o, init, eTag = "*") => {
    init = init || {};
    init.headers = { ...init.headers || {}, "IF-Match": eTag };
    return spPostDelete(o, init);
};
const spDelete = (o, init) => Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["op"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["del"], init);
const spPatch = (o, init) => Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["op"])(o, _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["patch"], init);
//# sourceMappingURL=operations.js.map

/***/ }),

/***/ "UKGb":
/*!***************************************!*\
  !*** ./node_modules/@pnp/sp/index.js ***!
  \***************************************/
/*! exports provided: spInvokableFactory, _SPQueryable, SPQueryable, _SPCollection, SPCollection, _SPInstance, SPInstance, deleteable, deleteableWithETag, defaultPath, spGet, spPost, spPostMerge, spPostDelete, spPostDeleteETag, spDelete, spPatch, SPFI, spfi, emptyGuid, PrincipalType, PrincipalSource, PageType, extractWebUrl, containsInvalidFileFolderChars, stripInvalidFileFolderChars, odataUrlFrom, toResourcePath, encodePath, DefaultInit, DefaultHeaders, Telemetry, RequestDigest, SPBrowser, SPFxToken, SPFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spqueryable.js */ "F4qD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spInvokableFactory", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["spInvokableFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPQueryable", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["_SPQueryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPQueryable", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["SPQueryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPCollection", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["_SPCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPCollection", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["SPCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_SPInstance", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["_SPInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPInstance", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["SPInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteable", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["deleteable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteableWithETag", function() { return _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["deleteableWithETag"]; });

/* harmony import */ var _decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators.js */ "hMpi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultPath", function() { return _decorators_js__WEBPACK_IMPORTED_MODULE_1__["defaultPath"]; });

/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operations.js */ "UK2s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spGet", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spPost", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spPost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spPostMerge", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spPostMerge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spPostDelete", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spPostDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spPostDeleteETag", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spPostDeleteETag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spDelete", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spPatch", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["spPatch"]; });

/* harmony import */ var _fi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fi.js */ "v6VW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFI", function() { return _fi_js__WEBPACK_IMPORTED_MODULE_3__["SPFI"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spfi", function() { return _fi_js__WEBPACK_IMPORTED_MODULE_3__["spfi"]; });

/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types.js */ "tCQJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyGuid", function() { return _types_js__WEBPACK_IMPORTED_MODULE_4__["emptyGuid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrincipalType", function() { return _types_js__WEBPACK_IMPORTED_MODULE_4__["PrincipalType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrincipalSource", function() { return _types_js__WEBPACK_IMPORTED_MODULE_4__["PrincipalSource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return _types_js__WEBPACK_IMPORTED_MODULE_4__["PageType"]; });

/* harmony import */ var _utils_extract_web_url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/extract-web-url.js */ "OXUt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractWebUrl", function() { return _utils_extract_web_url_js__WEBPACK_IMPORTED_MODULE_5__["extractWebUrl"]; });

/* harmony import */ var _utils_file_names_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/file-names.js */ "YFzv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "containsInvalidFileFolderChars", function() { return _utils_file_names_js__WEBPACK_IMPORTED_MODULE_6__["containsInvalidFileFolderChars"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripInvalidFileFolderChars", function() { return _utils_file_names_js__WEBPACK_IMPORTED_MODULE_6__["stripInvalidFileFolderChars"]; });

/* harmony import */ var _utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/odata-url-from.js */ "hTrG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "odataUrlFrom", function() { return _utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_7__["odataUrlFrom"]; });

/* harmony import */ var _utils_to_resource_path_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/to-resource-path.js */ "G6u6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toResourcePath", function() { return _utils_to_resource_path_js__WEBPACK_IMPORTED_MODULE_8__["toResourcePath"]; });

/* harmony import */ var _utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/encode-path-str.js */ "vbtm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodePath", function() { return _utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_9__["encodePath"]; });

/* harmony import */ var _behaviors_defaults_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./behaviors/defaults.js */ "qZw7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultInit", function() { return _behaviors_defaults_js__WEBPACK_IMPORTED_MODULE_10__["DefaultInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultHeaders", function() { return _behaviors_defaults_js__WEBPACK_IMPORTED_MODULE_10__["DefaultHeaders"]; });

/* harmony import */ var _behaviors_telemetry_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./behaviors/telemetry.js */ "nikm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Telemetry", function() { return _behaviors_telemetry_js__WEBPACK_IMPORTED_MODULE_11__["Telemetry"]; });

/* harmony import */ var _behaviors_request_digest_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./behaviors/request-digest.js */ "GfGO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RequestDigest", function() { return _behaviors_request_digest_js__WEBPACK_IMPORTED_MODULE_12__["RequestDigest"]; });

/* harmony import */ var _behaviors_spbrowser_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./behaviors/spbrowser.js */ "Wjh3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPBrowser", function() { return _behaviors_spbrowser_js__WEBPACK_IMPORTED_MODULE_13__["SPBrowser"]; });

/* harmony import */ var _behaviors_spfx_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./behaviors/spfx.js */ "OWTB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFxToken", function() { return _behaviors_spfx_js__WEBPACK_IMPORTED_MODULE_14__["SPFxToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFx", function() { return _behaviors_spfx_js__WEBPACK_IMPORTED_MODULE_14__["SPFx"]; });
















//# sourceMappingURL=index.js.map

/***/ }),

/***/ "V4GX":
/*!*************************************************!*\
  !*** ./node_modules/@pnp/queryable/add-prop.js ***!
  \*************************************************/
/*! exports provided: addProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addProp", function() { return addProp; });
/**
 * Adds a property to a target instance
 *
 * @param target The object to whose prototype we will add a property
 * @param name Property name
 * @param factory Factory method used to produce the property value
 * @param path Any additional path required to produce the value
 */
function addProp(target, name, factory, path) {
    Reflect.defineProperty(target.prototype, name, {
        configurable: true,
        enumerable: true,
        get: function () {
            return factory(this, path || name);
        },
    });
}
//# sourceMappingURL=add-prop.js.map

/***/ }),

/***/ "VxMn":
/*!**********************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/caching.js ***!
  \**********************************************************/
/*! exports provided: CacheAlways, CacheNever, CacheKey, Caching, bindCachingCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheAlways", function() { return CacheAlways; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheNever", function() { return CacheNever; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheKey", function() { return CacheKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Caching", function() { return Caching; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindCachingCore", function() { return bindCachingCore; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");

/**
 * Behavior that forces caching for the request regardless of "method"
 *
 * @returns TimelinePipe
 */
function CacheAlways() {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheAlways": "1" };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Behavior that blocks caching for the request regardless of "method"
 *
 * Note: If both Caching and CacheAlways are present AND CacheNever is present the request will not be cached
 * as we give priority to the CacheNever case
 *
 * @returns TimelinePipe
 */
function CacheNever() {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheNever": "1" };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Behavior that allows you to specify a cache key for a request
 *
 * @param key The key to use for caching
  */
function CacheKey(key) {
    return (instance) => {
        instance.on.pre.prepend(async function (url, init, result) {
            init.headers = { ...init.headers, "X-PnP-CacheKey": key };
            return [url, init, result];
        });
        return instance;
    };
}
/**
 * Adds caching to the requests based on the supplied props
 *
 * @param props Optional props that configure how caching will work
 * @returns TimelinePipe used to configure requests
 */
function Caching(props) {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            const [shouldCache, getCachedValue, setCachedValue] = bindCachingCore(url, init, props);
            // only cache get requested data or where the CacheAlways header is present (allows caching of POST requests)
            if (shouldCache) {
                const cached = getCachedValue();
                // we need to ensure that result stays "undefined" unless we mean to set null as the result
                if (cached === null) {
                    // if we don't have a cached result we need to get it after the request is sent and parsed
                    this.on.post(Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["noInherit"])(async function (url, result) {
                        setCachedValue(result);
                        return [url, result];
                    }));
                }
                else {
                    result = cached;
                }
            }
            return [url, init, result];
        });
        return instance;
    };
}
const storage = new _pnp_core__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorage"]();
/**
 * Based on the supplied properties, creates bound logic encapsulating common caching configuration
 * sharable across implementations to more easily provide consistent behavior across behaviors
 *
 * @param props Any caching props used to initialize the core functions
 */
function bindCachingCore(url, init, props) {
    var _a, _b;
    const { store, keyFactory, expireFunc } = {
        store: "local",
        keyFactory: (url) => Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["getHashCode"])(url.toLowerCase()).toString(),
        expireFunc: () => Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(new Date(), "minute", 5),
        ...props,
    };
    const s = store === "session" ? storage.session : storage.local;
    const key = (init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheKey"]) ? init.headers["X-PnP-CacheKey"] : keyFactory(url);
    return [
        // calculated value indicating if we should cache this request
        (/get/i.test(init.method) || ((_a = init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheAlways"]) !== null && _a !== void 0 ? _a : false)) && !((_b = init === null || init === void 0 ? void 0 : init.headers["X-PnP-CacheNever"]) !== null && _b !== void 0 ? _b : false),
        // gets the cached value
        () => s.get(key),
        // sets the cached value
        (value) => s.put(key, value, expireFunc(url)),
    ];
}
//# sourceMappingURL=caching.js.map

/***/ }),

/***/ "WE4i":
/*!***************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/bearer-token.js ***!
  \***************************************************************/
/*! exports provided: BearerToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BearerToken", function() { return BearerToken; });
/* harmony import */ var _inject_headers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inject-headers.js */ "XOGp");

function BearerToken(token) {
    return (instance) => {
        instance.using(Object(_inject_headers_js__WEBPACK_IMPORTED_MODULE_0__["InjectHeaders"])({
            "Authorization": `Bearer ${token}`,
        }));
        return instance;
    };
}
//# sourceMappingURL=bearer-token.js.map

/***/ }),

/***/ "Wjh3":
/*!*****************************************************!*\
  !*** ./node_modules/@pnp/sp/behaviors/spbrowser.js ***!
  \*****************************************************/
/*! exports provided: SPBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPBrowser", function() { return SPBrowser; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults.js */ "qZw7");
/* harmony import */ var _request_digest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./request-digest.js */ "GfGO");




function SPBrowser(props) {
    if ((props === null || props === void 0 ? void 0 : props.baseUrl) && !Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(props.baseUrl)) {
        throw Error("SPBrowser props.baseUrl must be absolute when supplied.");
    }
    return (instance) => {
        instance.using(Object(_defaults_js__WEBPACK_IMPORTED_MODULE_2__["DefaultHeaders"])(), Object(_defaults_js__WEBPACK_IMPORTED_MODULE_2__["DefaultInit"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["BrowserFetchWithRetry"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["DefaultParse"])(), Object(_request_digest_js__WEBPACK_IMPORTED_MODULE_3__["RequestDigest"])());
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(props === null || props === void 0 ? void 0 : props.baseUrl)) {
            // we want to fix up the url first
            instance.on.pre.prepend(async (url, init, result) => {
                if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(url)) {
                    url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(props.baseUrl, url);
                }
                return [url, init, result];
            });
        }
        return instance;
    };
}
//# sourceMappingURL=spbrowser.js.map

/***/ }),

/***/ "Ww49":
/*!**************************************************!*\
  !*** ./node_modules/@pnp/queryable/queryable.js ***!
  \**************************************************/
/*! exports provided: Queryable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return Queryable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "IwJs");
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _invokable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invokable.js */ "/sQB");



const DefaultMoments = {
    construct: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["lifecycle"])(),
    pre: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["asyncReduce"])(),
    auth: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["asyncReduce"])(),
    send: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["request"])(),
    parse: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["asyncReduce"])(),
    post: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["asyncReduce"])(),
    data: Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["broadcast"])(),
};
let Queryable = class Queryable extends _pnp_core__WEBPACK_IMPORTED_MODULE_1__["Timeline"] {
    constructor(init, path) {
        super(DefaultMoments);
        // these keys represent internal events for Queryable, users are not expected to
        // subscribe directly to these, rather they enable functionality within Queryable
        // they are Symbols such that there are NOT cloned between queryables as we only grab string keys (by design)
        this.InternalResolve = Symbol.for("Queryable_Resolve");
        this.InternalReject = Symbol.for("Queryable_Reject");
        this.InternalPromise = Symbol.for("Queryable_Promise");
        this._query = new URLSearchParams();
        // add an intneral moment with specific implementaion for promise creation
        this.moments[this.InternalPromise] = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["reduce"])();
        let parent;
        if (typeof init === "string") {
            this._url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["combine"])(init, path);
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["isArray"])(init)) {
            if (init.length !== 2) {
                throw Error("When using the tuple param exactly two arguments are expected.");
            }
            if (typeof init[1] !== "string") {
                throw Error("Expected second tuple param to be a string.");
            }
            parent = init[0];
            this._url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["combine"])(init[1], path);
        }
        else {
            parent = init;
            this._url = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["combine"])(parent._url, path);
        }
        if (typeof parent !== "undefined") {
            this.observers = parent.observers;
            this._inheritingObservers = true;
        }
    }
    /**
     * Directly concatenates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatenate to the url
     */
    concat(pathPart) {
        this._url += pathPart;
        return this;
    }
    /**
     * Gets the full url with query information
     *
     */
    toRequestUrl() {
        let url = this.toUrl();
        const query = this.query.toString();
        if (!Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["stringIsNullOrEmpty"])(query)) {
            url += `${url.indexOf("?") > -1 ? "&" : "?"}${query}`;
        }
        return url;
    }
    /**
     * Querystring key, value pairs which will be included in the request
     */
    get query() {
        return this._query;
    }
    /**
     * Gets the current url
     *
     */
    toUrl() {
        return this._url;
    }
    execute(userInit) {
        // if there are NO observers registered this is likely either a bug in the library or a user error, direct to docs
        if (Reflect.ownKeys(this.observers).length < 1) {
            throw Error("No observers registered for this request. (https://pnp.github.io/pnpjs/queryable/queryable#no-observers-registered-for-this-request)");
        }
        // schedule the execution after we return the promise below in the next event loop
        setTimeout(async () => {
            const requestId = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["getGUID"])();
            let requestUrl;
            const log = (msg, level) => {
                // this allows us to easily and consistently format our messages
                this.log(`[${requestId}] ${msg}`, level);
            };
            try {
                log("Beginning request", 0);
                // include the request id in the headers to assist with debugging against logs
                const initSeed = {
                    ...userInit,
                    headers: { ...userInit.headers, "X-PnPjs-RequestId": requestId },
                };
                // eslint-disable-next-line prefer-const
                let [url, init, result] = await this.emit.pre(this.toRequestUrl(), initSeed, undefined);
                log(`Url: ${url}`, 1);
                if (typeof result !== "undefined") {
                    log("Result returned from pre, Emitting data");
                    this.emit.data(result);
                    log("Emitted data");
                    return;
                }
                log("Emitting auth");
                [requestUrl, init] = await this.emit.auth(new URL(url), init);
                log("Emitted auth");
                // we always resepect user supplied init over observer modified init
                init = { ...init, ...userInit, headers: { ...init.headers, ...userInit.headers } };
                log("Emitting send");
                let response = await this.emit.send(requestUrl, init);
                log("Emitted send");
                log("Emitting parse");
                [requestUrl, response, result] = await this.emit.parse(requestUrl, response, result);
                log("Emitted parse");
                log("Emitting post");
                [requestUrl, result] = await this.emit.post(requestUrl, result);
                log("Emitted post");
                log("Emitting data");
                this.emit.data(result);
                log("Emitted data");
            }
            catch (e) {
                log(`Emitting error: "${e.message || e}"`, 3);
                // anything that throws we emit and continue
                this.error(e);
                log("Emitted error", 3);
            }
            finally {
                log("Finished request", 0);
            }
        }, 0);
        // this is the promise that the calling code will recieve and await
        let promise = new Promise((resolve, reject) => {
            // we overwrite any pre-existing internal events as a
            // given queryable only processes a single request at a time
            this.on[this.InternalResolve].replace(resolve);
            this.on[this.InternalReject].replace(reject);
        });
        // this allows us to internally hook the promise creation and modify it. This was introduced to allow for
        // cancelable to work as envisioned, but may have other users. Meant for internal use in the library accessed via behaviors.
        [promise] = this.emit[this.InternalPromise](promise);
        return promise;
    }
};
Queryable = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["extendable"])(),
    Object(_invokable_js__WEBPACK_IMPORTED_MODULE_2__["invokable"])()
], Queryable);

//# sourceMappingURL=queryable.js.map

/***/ }),

/***/ "XOGp":
/*!*****************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/inject-headers.js ***!
  \*****************************************************************/
/*! exports provided: InjectHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectHeaders", function() { return InjectHeaders; });
function InjectHeaders(headers, prepend = false) {
    return (instance) => {
        const f = async function (url, init, result) {
            init.headers = { ...init.headers, ...headers };
            return [url, init, result];
        };
        if (prepend) {
            instance.on.pre.prepend(f);
        }
        else {
            instance.on.pre(f);
        }
        return instance;
    };
}
//# sourceMappingURL=inject-headers.js.map

/***/ }),

/***/ "YFzv":
/*!**************************************************!*\
  !*** ./node_modules/@pnp/sp/utils/file-names.js ***!
  \**************************************************/
/*! exports provided: containsInvalidFileFolderChars, stripInvalidFileFolderChars */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsInvalidFileFolderChars", function() { return containsInvalidFileFolderChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripInvalidFileFolderChars", function() { return stripInvalidFileFolderChars; });
// eslint-disable-next-line no-control-regex
const InvalidFileFolderNameCharsOnlineRegex = /["*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
// eslint-disable-next-line no-control-regex
const InvalidFileFolderNameCharsOnPremiseRegex = /["#%*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
/**
 * Checks if file or folder name contains invalid characters
 *
 * @param input File or folder name to check
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns True if contains invalid chars, false otherwise
 */
function containsInvalidFileFolderChars(input, onPremise = false) {
    if (onPremise) {
        return InvalidFileFolderNameCharsOnPremiseRegex.test(input);
    }
    else {
        return InvalidFileFolderNameCharsOnlineRegex.test(input);
    }
}
/**
 * Removes invalid characters from file or folder name
 *
 * @param input File or folder name
 * @param replacer Value that will replace invalid characters
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns File or folder name with replaced invalid characters
 */
function stripInvalidFileFolderChars(input, replacer = "", onPremise = false) {
    if (onPremise) {
        return input.replace(InvalidFileFolderNameCharsOnPremiseRegex, replacer);
    }
    else {
        return input.replace(InvalidFileFolderNameCharsOnlineRegex, replacer);
    }
}
//# sourceMappingURL=file-names.js.map

/***/ }),

/***/ "Ymo3":
/*!**********************************************!*\
  !*** ./node_modules/@pnp/queryable/index.js ***!
  \**********************************************/
/*! exports provided: addProp, invokable, get, post, put, patch, del, op, Queryable, queryableFactory, body, headers, BearerToken, BrowserFetch, BrowserFetchWithRetry, CacheAlways, CacheNever, CacheKey, Caching, bindCachingCore, CachingPessimisticRefresh, asCancelableScope, cancelableScope, Cancelable, CancelAction, InjectHeaders, DefaultParse, TextParse, BlobParse, JSONParse, BufferParse, HeaderParse, JSONHeaderParse, errorCheck, parseODataJSON, parseBinderWithErrorCheck, HttpRequestError, Timeout, ResolveOnData, RejectOnError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_prop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-prop.js */ "V4GX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addProp", function() { return _add_prop_js__WEBPACK_IMPORTED_MODULE_0__["addProp"]; });

/* harmony import */ var _invokable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invokable.js */ "/sQB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invokable", function() { return _invokable_js__WEBPACK_IMPORTED_MODULE_1__["invokable"]; });

/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operations.js */ "h6Ct");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["get"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "post", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["post"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "put", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["put"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["patch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "del", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["del"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "op", function() { return _operations_js__WEBPACK_IMPORTED_MODULE_2__["op"]; });

/* harmony import */ var _queryable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryable.js */ "Ww49");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return _queryable_js__WEBPACK_IMPORTED_MODULE_3__["Queryable"]; });

/* harmony import */ var _queryable_factory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./queryable-factory.js */ "359w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryableFactory", function() { return _queryable_factory_js__WEBPACK_IMPORTED_MODULE_4__["queryableFactory"]; });

/* harmony import */ var _request_builders_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./request-builders.js */ "0qgB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "body", function() { return _request_builders_js__WEBPACK_IMPORTED_MODULE_5__["body"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return _request_builders_js__WEBPACK_IMPORTED_MODULE_5__["headers"]; });

/* harmony import */ var _behaviors_bearer_token_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./behaviors/bearer-token.js */ "WE4i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BearerToken", function() { return _behaviors_bearer_token_js__WEBPACK_IMPORTED_MODULE_6__["BearerToken"]; });

/* harmony import */ var _behaviors_browser_fetch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./behaviors/browser-fetch.js */ "do2w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserFetch", function() { return _behaviors_browser_fetch_js__WEBPACK_IMPORTED_MODULE_7__["BrowserFetch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrowserFetchWithRetry", function() { return _behaviors_browser_fetch_js__WEBPACK_IMPORTED_MODULE_7__["BrowserFetchWithRetry"]; });

/* harmony import */ var _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./behaviors/caching.js */ "VxMn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheAlways", function() { return _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__["CacheAlways"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheNever", function() { return _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__["CacheNever"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CacheKey", function() { return _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__["CacheKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Caching", function() { return _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__["Caching"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bindCachingCore", function() { return _behaviors_caching_js__WEBPACK_IMPORTED_MODULE_8__["bindCachingCore"]; });

/* harmony import */ var _behaviors_caching_pessimistic_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./behaviors/caching-pessimistic.js */ "qL0N");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CachingPessimisticRefresh", function() { return _behaviors_caching_pessimistic_js__WEBPACK_IMPORTED_MODULE_9__["CachingPessimisticRefresh"]; });

/* harmony import */ var _behaviors_cancelable_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./behaviors/cancelable.js */ "+y5s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asCancelableScope", function() { return _behaviors_cancelable_js__WEBPACK_IMPORTED_MODULE_10__["asCancelableScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelableScope", function() { return _behaviors_cancelable_js__WEBPACK_IMPORTED_MODULE_10__["cancelableScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cancelable", function() { return _behaviors_cancelable_js__WEBPACK_IMPORTED_MODULE_10__["Cancelable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CancelAction", function() { return _behaviors_cancelable_js__WEBPACK_IMPORTED_MODULE_10__["CancelAction"]; });

/* harmony import */ var _behaviors_inject_headers_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./behaviors/inject-headers.js */ "XOGp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InjectHeaders", function() { return _behaviors_inject_headers_js__WEBPACK_IMPORTED_MODULE_11__["InjectHeaders"]; });

/* harmony import */ var _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./behaviors/parsers.js */ "udT0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["DefaultParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["TextParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlobParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["BlobParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSONParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["JSONParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["BufferParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["HeaderParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSONHeaderParse", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["JSONHeaderParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errorCheck", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["errorCheck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseODataJSON", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["parseODataJSON"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBinderWithErrorCheck", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["parseBinderWithErrorCheck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return _behaviors_parsers_js__WEBPACK_IMPORTED_MODULE_12__["HttpRequestError"]; });

/* harmony import */ var _behaviors_timeout_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./behaviors/timeout.js */ "ISfK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeout", function() { return _behaviors_timeout_js__WEBPACK_IMPORTED_MODULE_13__["Timeout"]; });

/* harmony import */ var _behaviors_resolvers_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./behaviors/resolvers.js */ "tGZ3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResolveOnData", function() { return _behaviors_resolvers_js__WEBPACK_IMPORTED_MODULE_14__["ResolveOnData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RejectOnError", function() { return _behaviors_resolvers_js__WEBPACK_IMPORTED_MODULE_14__["RejectOnError"]; });







/**
 * Behavior exports
 */









//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Z+AG":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "a8uk":
/*!*******************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/components/MasterPageRow3.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/@microsoft/spfx-heft-plugins/node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src??postcss!./MasterPageRow3.css */ "Sgpy");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "aCOx":
/*!******************************************************!*\
  !*** ./node_modules/react-icons/lib/esm/iconBase.js ***!
  \******************************************************/
/*! exports provided: GenIcon, IconBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenIcon", function() { return GenIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return IconBase; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _iconContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iconContext */ "3quK");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, title), props.children);
  };
  return _iconContext__WEBPACK_IMPORTED_MODULE_1__["IconContext"] !== undefined ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_iconContext__WEBPACK_IMPORTED_MODULE_1__["IconContext"].Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(_iconContext__WEBPACK_IMPORTED_MODULE_1__["DefaultContext"]);
}

/***/ }),

/***/ "br4S":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_br4S__;

/***/ }),

/***/ "cDcd":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cDcd__;

/***/ }),

/***/ "dVsc":
/*!********************************************!*\
  !*** ./node_modules/@pnp/sp/webs/types.js ***!
  \********************************************/
/*! exports provided: _Webs, Webs, _Web, Web */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Webs", function() { return _Webs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Webs", function() { return Webs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Web", function() { return _Web; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Web", function() { return Web; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "LVfT");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spqueryable.js */ "F4qD");
/* harmony import */ var _decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorators.js */ "hMpi");
/* harmony import */ var _utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/odata-url-from.js */ "hTrG");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../operations.js */ "UK2s");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../index.js */ "UKGb");
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/encode-path-str.js */ "vbtm");









let _Webs = class _Webs extends _spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["_SPCollection"] {
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The new web's description
     * @param template The new web's template internal name (default = STS)
     * @param language The locale id that specifies the new web's language (default = 1033 [English, US])
     * @param inheritPermissions When true, permissions will be inherited from the new web's parent (default = true)
     */
    async add(Title, Url, Description = "", WebTemplate = "STS", Language = 1033, UseSamePermissionsAsParentSite = true) {
        const postBody = Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["body"])({
            "parameters": {
                Description,
                Language,
                Title,
                Url,
                UseSamePermissionsAsParentSite,
                WebTemplate,
            },
        });
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Webs(this, "add"), postBody);
        return {
            data,
            web: Web([this, Object(_utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_4__["odataUrlFrom"])(data).replace(/_api\/web\/?/i, "")]),
        };
    }
};
_Webs = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("webs")
], _Webs);

const Webs = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["spInvokableFactory"])(_Webs);
/**
 * Ensures the url passed to the constructor is correctly rebased to a web url
 *
 * @param candidate The candidate web url
 * @param path The caller supplied path, which may contain _api, meaning we don't append _api/web
 */
function rebaseWebUrl(candidate, path) {
    let replace = "_api/web";
    // this allows us to both:
    // - test if `candidate` already has an api path
    // - ensure that we append the correct one as sometimes a web is not defined
    //   by _api/web, in the case of _api/site/rootweb for example
    const matches = /(_api[/|\\](site|web))/i.exec(candidate);
    if ((matches === null || matches === void 0 ? void 0 : matches.length) > 0) {
        // we want just the base url part (before the _api)
        candidate = Object(_index_js__WEBPACK_IMPORTED_MODULE_6__["extractWebUrl"])(candidate);
        // we want to ensure we put back the correct string
        replace = matches[1];
    }
    // we only need to append the _api part IF `path` doesn't already include it.
    if ((path === null || path === void 0 ? void 0 : path.indexOf("_api")) < 0) {
        candidate = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_7__["combine"])(candidate, replace);
    }
    return candidate;
}
/**
 * Describes a web
 *
 */
let _Web = class _Web extends _spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["_SPInstance"] {
    constructor(base, path) {
        if (typeof base === "string") {
            base = rebaseWebUrl(base, path);
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_7__["isArray"])(base)) {
            base = [base[0], rebaseWebUrl(base[1], path)];
        }
        else {
            base = [base, rebaseWebUrl(base.toUrl(), path)];
        }
        super(base, path);
        this.delete = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["deleteable"])();
    }
    /**
     * Gets this web's subwebs
     *
     */
    get webs() {
        return Webs(this);
    }
    /**
     * Allows access to the web's all properties collection
     */
    get allProperties() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["SPInstance"])(this, "allproperties");
    }
    /**
     * Gets a collection of WebInfos for this web's subwebs
     *
     */
    get webinfos() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["SPCollection"])(this, "webinfos");
    }
    /**
     * Gets this web's parent web and data
     *
     */
    async getParentWeb() {
        const { Url, ParentWeb } = await this.select("Url", "ParentWeb/ServerRelativeUrl").expand("ParentWeb")();
        if (ParentWeb === null || ParentWeb === void 0 ? void 0 : ParentWeb.ServerRelativeUrl) {
            return Web([this, Object(_pnp_core__WEBPACK_IMPORTED_MODULE_7__["combine"])((new URL(Url)).origin, ParentWeb.ServerRelativeUrl)]);
        }
        return null;
    }
    /**
     * Updates this web instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    async update(properties) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPostMerge"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["body"])(properties));
    }
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site
     *
     * @param colorPaletteUrl The server-relative URL of the color palette file
     * @param fontSchemeUrl The server-relative URL of the font scheme
     * @param backgroundImageUrl The server-relative URL of the background image
     * @param shareGenerated When true, the generated theme files are stored in the root site. When false, they are stored in this web
     */
    applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
        const postBody = Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["body"])({
            backgroundImageUrl,
            colorPaletteUrl,
            fontSchemeUrl,
            shareGenerated,
        });
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Web(this, "applytheme"), postBody);
    }
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it
     *
     * @param template Name of the site definition or the name of the site template
     */
    applyWebTemplate(template) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Web(this, `applywebtemplate(webTemplate='${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(template)}')`));
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Web(this, "getchanges"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["body"])({ query }));
    }
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1 (default = 0)
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    mapToIcon(filename, size = 0, progId = "") {
        return Web(this, `maptoicon(filename='${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(filename)}',progid='${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(progId)}',size=${size})`)();
    }
    /**
     * Returns the tenant property corresponding to the specified key in the app catalog site
     *
     * @param key Id of storage entity to be set
     */
    getStorageEntity(key) {
        return Web(this, `getStorageEntity('${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(key)}')`)();
    }
    /**
     * This will set the storage entity identified by the given key (MUST be called in the context of the app catalog)
     *
     * @param key Id of storage entity to be set
     * @param value Value of storage entity to be set
     * @param description Description of storage entity to be set
     * @param comments Comments of storage entity to be set
     */
    setStorageEntity(key, value, description = "", comments = "") {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Web(this, "setStorageEntity"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_1__["body"])({
            comments,
            description,
            key,
            value,
        }));
    }
    /**
     * This will remove the storage entity identified by the given key
     *
     * @param key Id of storage entity to be removed
     */
    removeStorageEntity(key) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_5__["spPost"])(Web(this, `removeStorageEntity('${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(key)}')`));
    }
    /**
    * Returns a collection of objects that contain metadata about subsites of the current site in which the current user is a member.
    *
    * @param nWebTemplateFilter Specifies the site definition (default = -1)
    * @param nConfigurationFilter A 16-bit integer that specifies the identifier of a configuration (default = -1)
    */
    getSubwebsFilteredForCurrentUser(nWebTemplateFilter = -1, nConfigurationFilter = -1) {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["SPCollection"])(this, `getSubwebsFilteredForCurrentUser(nWebTemplateFilter=${nWebTemplateFilter},nConfigurationFilter=${nConfigurationFilter})`);
    }
    /**
     * Returns a collection of site templates available for the site
     *
     * @param language The locale id of the site templates to retrieve (default = 1033 [English, US])
     * @param includeCrossLanguage When true, includes language-neutral site templates; otherwise false (default = true)
     */
    availableWebTemplates(language = 1033, includeCrossLanugage = true) {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["SPCollection"])(this, `getavailablewebtemplates(lcid=${language},doincludecrosslanguage=${includeCrossLanugage})`);
    }
};
_Web = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("_api/web")
], _Web);

const Web = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_2__["spInvokableFactory"])(_Web);
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "do2w":
/*!****************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/browser-fetch.js ***!
  \****************************************************************/
/*! exports provided: BrowserFetch, BrowserFetchWithRetry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserFetch", function() { return BrowserFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserFetchWithRetry", function() { return BrowserFetchWithRetry; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _parsers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsers.js */ "udT0");


function BrowserFetch(props) {
    const { replace } = {
        replace: true,
        ...props,
    };
    return (instance) => {
        if (replace) {
            instance.on.send.clear();
        }
        instance.on.send(function (url, init) {
            this.log(`Fetch: ${init.method} ${url.toString()}`, 0);
            return fetch(url.toString(), init);
        });
        return instance;
    };
}
function BrowserFetchWithRetry(props) {
    const { interval, replace, retries } = {
        replace: true,
        interval: 200,
        retries: 3,
        ...props,
    };
    return (instance) => {
        if (replace) {
            instance.on.send.clear();
        }
        instance.on.send(function (url, init) {
            let response;
            let wait = interval;
            let count = 0;
            let lastErr;
            const retry = async () => {
                // if we've tried too many times, throw
                if (count >= retries) {
                    throw lastErr || new _parsers_js__WEBPACK_IMPORTED_MODULE_1__["HttpRequestError"](`Retry count exceeded (${retries}) for this request. ${response.status}: ${response.statusText};`, response);
                }
                count++;
                if (typeof response === "undefined" || (response === null || response === void 0 ? void 0 : response.status) === 429 || (response === null || response === void 0 ? void 0 : response.status) === 503 || (response === null || response === void 0 ? void 0 : response.status) === 504) {
                    // this is our first try and response isn't defined yet
                    // we have been throttled OR http status code 503 or 504, we can retry this
                    if (typeof response !== "undefined") {
                        // this isn't our first try so we need to calculate delay
                        if (response.headers.has("Retry-After")) {
                            // if we have gotten a header, use that value as the delay value in seconds
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            wait = parseInt(response.headers.get("Retry-After"), 10) * 1000;
                        }
                        else {
                            // Increment our counters.
                            wait *= 2;
                        }
                        this.log(`Attempt #${count} to retry request which failed with ${response.status}: ${response.statusText}`, 0);
                        await Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["delay"])(wait);
                    }
                    try {
                        const u = url.toString();
                        this.log(`Fetch: ${init.method} ${u}`, 0);
                        response = await fetch(u, init);
                        // if we got a good response, return it, otherwise see if we can retry
                        return response.ok ? response : retry();
                    }
                    catch (err) {
                        if (/AbortError/.test(err.name)) {
                            // don't retry aborted requests
                            throw err;
                        }
                        // if there is no network the response is undefined and err is all we have
                        // so we grab the err and save it to throw if we exceed the number of retries
                        // #2226 first reported this
                        lastErr = err;
                        return retry();
                    }
                }
                else {
                    return response;
                }
            };
            // this the the first call to retry that starts the cycle
            // response is undefined and the other values have their defaults
            return retry();
        });
        return instance;
    };
}
//# sourceMappingURL=browser-fetch.js.map

/***/ }),

/***/ "faye":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_faye__;

/***/ }),

/***/ "h6Ct":
/*!***************************************************!*\
  !*** ./node_modules/@pnp/queryable/operations.js ***!
  \***************************************************/
/*! exports provided: get, post, put, patch, del, op */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return put; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "op", function() { return op; });
function ensureInit(method, init = { headers: {} }) {
    return { method, ...init, headers: { ...init.headers } };
}
function get(init) {
    return this.start(ensureInit("GET", init));
}
function post(init) {
    return this.start(ensureInit("POST", init));
}
function put(init) {
    return this.start(ensureInit("PUT", init));
}
function patch(init) {
    return this.start(ensureInit("PATCH", init));
}
function del(init) {
    return this.start(ensureInit("DELETE", init));
}
function op(q, operation, init) {
    return Reflect.apply(operation, q, [init]);
}
//# sourceMappingURL=operations.js.map

/***/ }),

/***/ "hMpi":
/*!********************************************!*\
  !*** ./node_modules/@pnp/sp/decorators.js ***!
  \********************************************/
/*! exports provided: defaultPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPath", function() { return defaultPath; });
/**
 * Decorator used to specify the default path for SPQueryable objects
 *
 * @param path
 */
function defaultPath(path) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(args[0], args.length > 1 && args[1] !== undefined ? args[1] : path);
            }
        };
    };
}
//# sourceMappingURL=decorators.js.map

/***/ }),

/***/ "hTrG":
/*!******************************************************!*\
  !*** ./node_modules/@pnp/sp/utils/odata-url-from.js ***!
  \******************************************************/
/*! exports provided: odataUrlFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "odataUrlFrom", function() { return odataUrlFrom; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _extract_web_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extract-web-url.js */ "OXUt");


function odataUrlFrom(candidate) {
    const parts = [];
    const s = ["odata.type", "odata.editLink", "__metadata", "odata.metadata", "odata.id"];
    if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[0]) && candidate[s[0]] === "SP.Web") {
        // webs return an absolute url in the id
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[4])) {
            parts.push(candidate[s[4]]);
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    else {
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[3]) && Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[1])) {
            // we are dealign with minimal metadata (default)
            // some entities return an abosolute url in the editlink while for others it is relative
            // without the _api. This code is meant to handle both situations
            const editLink = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"])(candidate[s[1]]) ? candidate[s[1]].split("_api")[1] : candidate[s[1]];
            parts.push(Object(_extract_web_url_js__WEBPACK_IMPORTED_MODULE_1__["extractWebUrl"])(candidate[s[3]]), "_api", editLink);
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[1])) {
            parts.push("_api", candidate[s[1]]);
        }
        else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(candidate, s[2])) {
            // we are dealing with verbose, which has an absolute uri
            parts.push(candidate.__metadata.uri);
        }
    }
    if (parts.length < 1) {
        return "";
    }
    return Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["combine"])(...parts);
}
//# sourceMappingURL=odata-url-from.js.map

/***/ }),

/***/ "hy0S":
/*!*********************************************!*\
  !*** ./node_modules/@pnp/sp/lists/types.js ***!
  \*********************************************/
/*! exports provided: _Lists, Lists, _List, List, RenderListDataOptions, ControlMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Lists", function() { return _Lists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lists", function() { return Lists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_List", function() { return _List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderListDataOptions", function() { return RenderListDataOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlMode", function() { return ControlMode; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "LVfT");
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../spqueryable.js */ "F4qD");
/* harmony import */ var _utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/odata-url-from.js */ "hTrG");
/* harmony import */ var _decorators_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../decorators.js */ "hMpi");
/* harmony import */ var _operations_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../operations.js */ "UK2s");
/* harmony import */ var _utils_to_resource_path_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/to-resource-path.js */ "G6u6");
/* harmony import */ var _utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/encode-path-str.js */ "vbtm");









let _Lists = class _Lists extends _spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["_SPCollection"] {
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the list (GUID)
     */
    getById(id) {
        return List(this).concat(`('${id}')`);
    }
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    getByTitle(title) {
        return List(this, `getByTitle('${Object(_utils_encode_path_str_js__WEBPACK_IMPORTED_MODULE_8__["encodePath"])(title)}')`);
    }
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    async add(title, desc = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        const addSettings = {
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": desc,
            "Title": title,
            ...additionalSettings,
        };
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])(addSettings));
        return { data, list: this.getByTitle(addSettings.Title) };
    }
    /**
     * Ensures that the specified list exists in the collection (note: this method not supported for batching)
     *
     * @param title The new list's title
     * @param desc The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
     */
    async ensure(title, desc = "", template = 100, enableContentTypes = false, additionalSettings = {}) {
        const addOrUpdateSettings = { Title: title, Description: desc, ContentTypesEnabled: enableContentTypes, ...additionalSettings };
        const list = this.getByTitle(addOrUpdateSettings.Title);
        try {
            await list.select("Title")();
            const data = await list.update(addOrUpdateSettings).then(r => r.data);
            return { created: false, data, list: this.getByTitle(addOrUpdateSettings.Title) };
        }
        catch (e) {
            const data = await this.add(title, desc, template, enableContentTypes, addOrUpdateSettings).then(r => r.data);
            return { created: true, data, list: this.getByTitle(addOrUpdateSettings.Title) };
        }
    }
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    async ensureSiteAssetsLibrary() {
        const json = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(Lists(this, "ensuresiteassetslibrary"));
        return List([this, Object(_utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_4__["odataUrlFrom"])(json)]);
    }
    /**
     * Gets a list that is the default location for wiki pages.
     */
    async ensureSitePagesLibrary() {
        const json = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(Lists(this, "ensuresitepageslibrary"));
        return List([this, Object(_utils_odata_url_from_js__WEBPACK_IMPORTED_MODULE_4__["odataUrlFrom"])(json)]);
    }
};
_Lists = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_decorators_js__WEBPACK_IMPORTED_MODULE_5__["defaultPath"])("lists")
], _Lists);

const Lists = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["spInvokableFactory"])(_Lists);
class _List extends _spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["_SPInstance"] {
    constructor() {
        super(...arguments);
        this.delete = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["deleteableWithETag"])();
    }
    /**
     * Gets the effective base permissions of this list
     *
     */
    get effectiveBasePermissions() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["SPQueryable"])(this, "EffectiveBasePermissions");
    }
    /**
     * Gets the event receivers attached to this list
     *
     */
    get eventReceivers() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["SPCollection"])(this, "EventReceivers");
    }
    /**
     * Gets the related fields of this list
     *
     */
    get relatedFields() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["SPQueryable"])(this, "getRelatedFields");
    }
    /**
     * Gets the IRM settings for this list
     *
     */
    get informationRightsManagementSettings() {
        return Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["SPQueryable"])(this, "InformationRightsManagementSettings");
    }
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    async update(properties, eTag = "*") {
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPostMerge"])(this, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])(properties, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["headers"])({ "IF-Match": eTag })));
        const list = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["hOP"])(properties, "Title") ? this.getParent(List, `getByTitle('${properties.Title}')`) : List(this);
        return {
            data,
            list,
        };
    }
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     * @param query A query that is performed against the change log.
     */
    getChanges(query) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "getchanges"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])({ query }));
    }
    /**
     * Returns the collection of items in the list based on the provided CamlQuery
     * @param query A query that is performed against the list
     * @param expands An expanded array of n items that contains fields to expand in the CamlQuery
     */
    getItemsByCAMLQuery(query, ...expands) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "getitems").expand(...expands), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])({ query }));
    }
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     * @param query An object that defines the change log item query
     */
    getListItemChangesSinceToken(query) {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "getlistitemchangessincetoken").using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["TextParse"])()), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])({ query }));
    }
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    async recycle() {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "recycle"));
    }
    /**
     * Renders list data based on the view xml provided
     * @param viewXml A string object representing a view xml
     */
    async renderListData(viewXml) {
        const q = List(this, "renderlistdata(@viewXml)");
        q.query.set("@viewXml", `'${viewXml}'`);
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(q);
        return JSON.parse(data);
    }
    /**
     * Returns the data for the specified query view
     *
     * @param parameters The parameters to be used to render list data as JSON string.
     * @param overrideParams The parameters that are used to override and extend the regular SPRenderListDataParameters.
     * @param query Allows setting of query parameters
     */
    // eslint-disable-next-line max-len
    renderListDataAsStream(parameters, overrideParameters = null, query = new Map()) {
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["hOP"])(parameters, "RenderOptions") && Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["isArray"])(parameters.RenderOptions)) {
            parameters.RenderOptions = parameters.RenderOptions.reduce((v, c) => v + c);
        }
        const clone = List(this, "RenderListDataAsStream");
        if (query && query.size > 0) {
            query.forEach((v, k) => clone.query.set(k, v));
        }
        const params = Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(overrideParameters) ? { parameters, overrideParameters } : { parameters };
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(clone, Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])(params));
    }
    /**
     * Gets the field values and field schema attributes for a list item.
     * @param itemId Item id of the item to render form data for
     * @param formId The id of the form
     * @param mode Enum representing the control mode of the form (Display, Edit, New)
     */
    async renderListFormData(itemId, formId, mode) {
        const data = await Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, `renderlistformdata(itemid=${itemId}, formid='${formId}', mode='${mode}')`));
        // data will be a string, so we parse it again
        return JSON.parse(data);
    }
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    async reserveListItemId() {
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "reservelistitemid"));
    }
    /**
     * Creates an item using path (in a folder), validates and sets its field values.
     *
     * @param formValues The fields to change and their new values.
     * @param decodedUrl Path decoded url; folder's server relative path.
     * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     * @param checkInComment Optional check in comment.
     * @param additionalProps Optional set of additional properties LeafName new document file name,
     */
    async addValidateUpdateItemUsingPath(formValues, decodedUrl, bNewDocumentUpdate = false, checkInComment, additionalProps) {
        const addProps = {
            FolderPath: Object(_utils_to_resource_path_js__WEBPACK_IMPORTED_MODULE_7__["toResourcePath"])(decodedUrl),
        };
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(additionalProps)) {
            if (additionalProps.leafName) {
                addProps.LeafName = Object(_utils_to_resource_path_js__WEBPACK_IMPORTED_MODULE_7__["toResourcePath"])(additionalProps.leafName);
            }
            if (additionalProps.objectType) {
                addProps.UnderlyingObjectType = additionalProps.objectType;
            }
        }
        return Object(_operations_js__WEBPACK_IMPORTED_MODULE_6__["spPost"])(List(this, "AddValidateUpdateItemUsingPath()"), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_2__["body"])({
            bNewDocumentUpdate,
            checkInComment,
            formValues,
            listItemCreateInfo: addProps,
        }));
    }
    /**
     * Gets the parent information for this item's list and web
     */
    async getParentInfos() {
        const urlInfo = await this.select("Id", "RootFolder/UniqueId", "RootFolder/ServerRelativeUrl", "RootFolder/ServerRelativePath", "ParentWeb/Id", "ParentWeb/Url", "ParentWeb/ServerRelativeUrl", "ParentWeb/ServerRelativePath").expand("RootFolder", "ParentWeb")();
        return {
            List: {
                Id: urlInfo.Id,
                RootFolderServerRelativePath: urlInfo.RootFolder.ServerRelativePath,
                RootFolderServerRelativeUrl: urlInfo.RootFolder.ServerRelativeUrl,
                RootFolderUniqueId: urlInfo.RootFolder.UniqueId,
            },
            ParentWeb: {
                Id: urlInfo.ParentWeb.Id,
                ServerRelativePath: urlInfo.ParentWeb.ServerRelativePath,
                ServerRelativeUrl: urlInfo.ParentWeb.ServerRelativeUrl,
                Url: urlInfo.ParentWeb.Url,
            },
        };
    }
}
const List = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_3__["spInvokableFactory"])(_List);
/**
 * Enum representing the options of the RenderOptions property on IRenderListDataParameters interface
 */
var RenderListDataOptions;
(function (RenderListDataOptions) {
    RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
    RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
    RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
    RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
    RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
    RenderListDataOptions[RenderListDataOptions["ListContentType"] = 16] = "ListContentType";
    /**
     * The returned list will have a FileSystemItemId field on each item if possible.
     */
    RenderListDataOptions[RenderListDataOptions["FileSystemItemId"] = 32] = "FileSystemItemId";
    /**
     * Returns the client form schema to add and edit items.
     */
    RenderListDataOptions[RenderListDataOptions["ClientFormSchema"] = 64] = "ClientFormSchema";
    /**
     * Returns QuickLaunch navigation nodes.
     */
    RenderListDataOptions[RenderListDataOptions["QuickLaunch"] = 128] = "QuickLaunch";
    /**
     * Returns Spotlight rendering information.
     */
    RenderListDataOptions[RenderListDataOptions["Spotlight"] = 256] = "Spotlight";
    /**
     * Returns Visualization rendering information.
     */
    RenderListDataOptions[RenderListDataOptions["Visualization"] = 512] = "Visualization";
    /**
     * Returns view XML and other information about the current view.
     */
    RenderListDataOptions[RenderListDataOptions["ViewMetadata"] = 1024] = "ViewMetadata";
    /**
     * Prevents AutoHyperlink from being run on text fields in this query.
     */
    RenderListDataOptions[RenderListDataOptions["DisableAutoHyperlink"] = 2048] = "DisableAutoHyperlink";
    /**
     * Enables urls pointing to Media TA service, such as .thumbnailUrl, .videoManifestUrl, .pdfConversionUrls.
     */
    RenderListDataOptions[RenderListDataOptions["EnableMediaTAUrls"] = 4096] = "EnableMediaTAUrls";
    /**
     * Return Parant folder information.
     */
    RenderListDataOptions[RenderListDataOptions["ParentInfo"] = 8192] = "ParentInfo";
    /**
     * Return Page context info for the current list being rendered.
     */
    RenderListDataOptions[RenderListDataOptions["PageContextInfo"] = 16384] = "PageContextInfo";
    /**
     * Return client-side component manifest information associated with the list.
     */
    RenderListDataOptions[RenderListDataOptions["ClientSideComponentManifest"] = 32768] = "ClientSideComponentManifest";
    /**
     * Return all content-types available on the list.
     */
    RenderListDataOptions[RenderListDataOptions["ListAvailableContentTypes"] = 65536] = "ListAvailableContentTypes";
    /**
      * Return the order of items in the new-item menu.
      */
    RenderListDataOptions[RenderListDataOptions["FolderContentTypeOrder"] = 131072] = "FolderContentTypeOrder";
    /**
     * Return information to initialize Grid for quick edit.
     */
    RenderListDataOptions[RenderListDataOptions["GridInitInfo"] = 262144] = "GridInitInfo";
    /**
     * Indicator if the vroom API of the SPItemUrl returned in MediaTAUrlGenerator should use site url as host.
     */
    RenderListDataOptions[RenderListDataOptions["SiteUrlAsMediaTASPItemHost"] = 524288] = "SiteUrlAsMediaTASPItemHost";
    /**
     * Return the files representing mount points in the list.
     */
    RenderListDataOptions[RenderListDataOptions["AddToOneDrive"] = 1048576] = "AddToOneDrive";
    /**
     * Return SPFX CustomAction.
     */
    RenderListDataOptions[RenderListDataOptions["SPFXCustomActions"] = 2097152] = "SPFXCustomActions";
    /**
     * Do not return non-SPFX CustomAction.
     */
    RenderListDataOptions[RenderListDataOptions["CustomActions"] = 4194304] = "CustomActions";
})(RenderListDataOptions || (RenderListDataOptions = {}));
/**
 * Determines the display mode of the given control or view
 */
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Display"] = 1] = "Display";
    ControlMode[ControlMode["Edit"] = 2] = "Edit";
    ControlMode[ControlMode["New"] = 3] = "New";
})(ControlMode || (ControlMode = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "nikm":
/*!*****************************************************!*\
  !*** ./node_modules/@pnp/sp/behaviors/telemetry.js ***!
  \*****************************************************/
/*! exports provided: Telemetry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Telemetry", function() { return Telemetry; });
function Telemetry() {
    return (instance) => {
        instance.on.pre(async function (url, init, result) {
            let clientTag = "PnPCoreJS:3.13.0:";
            // make our best guess based on url to the method called
            const { pathname } = new URL(url);
            // remove anything before the _api as that is potentially PII and we don't care, just want to get the called path to the REST API
            // and we want to modify any (*) calls at the end such as items(3) and items(344) so we just track "items()"
            clientTag += pathname
                .substring(pathname.indexOf("_api/") + 5)
                .split("/")
                .map((value, index, arr) => index === arr.length - 1 ? value.replace(/\(.*?$/i, "()") : value[0]).join(".");
            if (clientTag.length > 32) {
                clientTag = clientTag.substring(0, 32);
            }
            this.log(`Request Tag: ${clientTag}`, 0);
            init.headers = { ...init.headers, ["X-ClientService-ClientTag"]: clientTag };
            return [url, init, result];
        });
        return instance;
    };
}
//# sourceMappingURL=telemetry.js.map

/***/ }),

/***/ "qL0N":
/*!**********************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/caching-pessimistic.js ***!
  \**********************************************************************/
/*! exports provided: CachingPessimisticRefresh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachingPessimisticRefresh", function() { return CachingPessimisticRefresh; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");
/* harmony import */ var _queryable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../queryable.js */ "Ww49");
/* harmony import */ var _caching_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./caching.js */ "VxMn");



/**
 * Pessimistic Caching Behavior
 * Always returns the cached value if one exists but asynchronously executes the call and updates the cache.
 * If a expireFunc is included then the cache update only happens if the cache has expired.
 *
 * @param store Use local or session storage
 * @param keyFactory: a function that returns the key for the cache value, if not provided a default hash of the url will be used
 * @param expireFunc: a function that returns a date of expiration for the cache value, if not provided the cache never expires but is always updated.
 */
function CachingPessimisticRefresh(props) {
    return (instance) => {
        const pre = async function (url, init, result) {
            const [shouldCache, getCachedValue, setCachedValue] = Object(_caching_js__WEBPACK_IMPORTED_MODULE_2__["bindCachingCore"])(url, init, props);
            if (!shouldCache) {
                return [url, init, result];
            }
            const cached = getCachedValue();
            if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(cached)) {
                // set our result
                result = cached;
                setTimeout(async () => {
                    const q = new _queryable_js__WEBPACK_IMPORTED_MODULE_1__["Queryable"](this);
                    const a = q.on.pre.toArray();
                    q.on.pre.clear();
                    // filter out this pre handler from the original queryable as we don't want to re-run it
                    a.filter(v => v !== pre).map(v => q.on.pre(v));
                    // in this case the init should contain the correct "method"
                    const value = await q(init);
                    setCachedValue(value);
                }, 0);
            }
            else {
                // register the post handler to cache the value as there is not one already in the cache
                // and we need to run this request as normal
                this.on.post(Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["noInherit"])(async function (url, result) {
                    setCachedValue(result);
                    return [url, result];
                }));
            }
            return [url, init, result];
        };
        instance.on.pre(pre);
        return instance;
    };
}
//# sourceMappingURL=caching-pessimistic.js.map

/***/ }),

/***/ "qNel":
/*!*******************************************************!*\
  !*** ./node_modules/@pnp/core/behaviors/copy-from.js ***!
  \*******************************************************/
/*! exports provided: CopyFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyFrom", function() { return CopyFrom; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "NuLX");
/* harmony import */ var _timeline_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../timeline.js */ "4kGv");


/**
 * Behavior that will copy all the observers in the source timeline and apply it to the incoming instance
 *
 * @param source The source instance from which we will copy the observers
 * @param behavior replace = observers are cleared before adding, append preserves any observers already present
 * @param filter If provided filters the moments from which the observers are copied. It should return true for each moment to include.
 * @returns The mutated this
 */
function CopyFrom(source, behavior = "append", filter) {
    return (instance) => {
        return Reflect.apply(copyObservers, instance, [source, behavior, filter]);
    };
}
/**
 * Function with implied this allows us to access protected members
 *
 * @param this The timeline whose observers we will copy
 * @param source The source instance from which we will copy the observers
 * @param behavior replace = observers are cleared before adding, append preserves any observers already present
 * @returns The mutated this
 */
function copyObservers(source, behavior, filter) {
    if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(source) || !Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(source.observers)) {
        return this;
    }
    if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isFunc"])(filter)) {
        filter = () => true;
    }
    const clonedSource = Object(_timeline_js__WEBPACK_IMPORTED_MODULE_1__["cloneObserverCollection"])(source.observers);
    const keys = Object.keys(clonedSource).filter(filter);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const on = this.on[key];
        if (behavior === "replace") {
            on.clear();
        }
        const momentObservers = clonedSource[key];
        momentObservers.forEach(v => on(v));
    }
    return this;
}
//# sourceMappingURL=copy-from.js.map

/***/ }),

/***/ "qZw7":
/*!****************************************************!*\
  !*** ./node_modules/@pnp/sp/behaviors/defaults.js ***!
  \****************************************************/
/*! exports provided: DefaultInit, DefaultHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultInit", function() { return DefaultInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultHeaders", function() { return DefaultHeaders; });
/* harmony import */ var _pnp_queryable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/queryable */ "Ymo3");
/* harmony import */ var _telemetry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./telemetry.js */ "nikm");


function DefaultInit() {
    return (instance) => {
        instance.on.pre(async (url, init, result) => {
            init.cache = "no-cache";
            init.credentials = "same-origin";
            return [url, init, result];
        });
        instance.using(Object(_telemetry_js__WEBPACK_IMPORTED_MODULE_1__["Telemetry"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["RejectOnError"])(), Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["ResolveOnData"])());
        return instance;
    };
}
function DefaultHeaders() {
    return (instance) => {
        instance
            .using(Object(_pnp_queryable__WEBPACK_IMPORTED_MODULE_0__["InjectHeaders"])({
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
        }));
        return instance;
    };
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ "ruv1":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitStyles = exports.detokenize = exports.clearStyles = exports.loadTheme = exports.flush = exports.configureRunMode = exports.configureLoadStyles = exports.loadStyles = void 0;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = typeof window === 'undefined' ? global : window; // eslint-disable-line @typescript-eslint/no-explicit-any
// Nonce string to inject into script tag if one provided. This is used in CSP (Content Security Policy).
var _styleNonce = _root && _root.CSPSettings && _root.CSPSettings.nonce;
var _themeState = initializeThemeState();
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
var now = function () {
    return typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now();
};
function measure(func) {
    var start = now();
    func();
    var end = now();
    _themeState.perf.duration += end - start;
}
/**
 * initialize global state object
 */
function initializeThemeState() {
    var state = _root.__themeState__ || {
        theme: undefined,
        lastStyleElement: undefined,
        registeredStyles: []
    };
    if (!state.runState) {
        state = __assign(__assign({}, state), { perf: {
                count: 0,
                duration: 0
            }, runState: {
                flushTimer: 0,
                mode: 0 /* Mode.sync */,
                buffer: []
            } });
    }
    if (!state.registeredThemableStyles) {
        state = __assign(__assign({}, state), { registeredThemableStyles: [] });
    }
    _root.__themeState__ = state;
    return state;
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 * @param {boolean} loadAsync When true, always load styles in async mode, irrespective of current sync mode.
 */
function loadStyles(styles, loadAsync) {
    if (loadAsync === void 0) { loadAsync = false; }
    measure(function () {
        var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
        var _a = _themeState.runState, mode = _a.mode, buffer = _a.buffer, flushTimer = _a.flushTimer;
        if (loadAsync || mode === 1 /* Mode.async */) {
            buffer.push(styleParts);
            if (!flushTimer) {
                _themeState.runState.flushTimer = asyncLoadStyles();
            }
        }
        else {
            applyThemableStyles(styleParts);
        }
    });
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
exports.configureRunMode = configureRunMode;
/**
 * external code can call flush to synchronously force processing of currently buffered styles
 */
function flush() {
    measure(function () {
        var styleArrays = _themeState.runState.buffer.slice();
        _themeState.runState.buffer = [];
        var mergedStyleArray = [].concat.apply([], styleArrays);
        if (mergedStyleArray.length > 0) {
            applyThemableStyles(mergedStyleArray);
        }
    });
}
exports.flush = flush;
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    return setTimeout(function () {
        _themeState.runState.flushTimer = 0;
        flush();
    }, 0);
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
    }
    else {
        registerStyles(stylesArray);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 * @param option - specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = 3 /* ClearStyleOptions.all */; }
    if (option === 3 /* ClearStyleOptions.all */ || option === 2 /* ClearStyleOptions.onlyNonThemable */) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === 3 /* ClearStyleOptions.all */ || option === 1 /* ClearStyleOptions.onlyThemable */) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
exports.clearStyles = clearStyles;
function clearStylesInternal(records) {
    records.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
}
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        var themableStyles = [];
        for (var _i = 0, _a = _themeState.registeredThemableStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            themableStyles.push(styleRecord.themableStyle);
        }
        if (themableStyles.length > 0) {
            clearStyles(1 /* ClearStyleOptions.onlyThemable */);
            applyThemableStyles([].concat.apply([], themableStyles));
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles)).styleString;
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var themable = false;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            themable = true;
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, but only if "DEBUG" is true.
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme &&
                !themedValue &&
                console &&
                !(themeSlot in theme) &&
                "boolean" !== 'undefined' &&
                true) {
                console.warn("Theming value not provided for \"".concat(themeSlot, "\". Falling back to \"").concat(defaultValue, "\"."));
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return {
        styleString: resolvedArray.join(''),
        themable: themable
    };
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0;
        while ((tokenMatch = _themeTokenRegex.exec(styles))) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray) {
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    var _a = resolveThemableArray(styleArray), styleString = _a.styleString, themable = _a.themable;
    styleElement.setAttribute('data-load-themed-styles', 'true');
    if (_styleNonce) {
        styleElement.setAttribute('nonce', _styleNonce);
    }
    styleElement.appendChild(document.createTextNode(styleString));
    _themeState.perf.count++;
    head.appendChild(styleElement);
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('styleinsert', true /* bubbleEvent */, false /* cancelable */);
    ev.args = {
        newStyle: styleElement
    };
    document.dispatchEvent(ev);
    var record = {
        styleElement: styleElement,
        themableStyle: styleArray
    };
    if (themable) {
        _themeState.registeredThemableStyles.push(record);
    }
    else {
        _themeState.registeredStyles.push(record);
    }
}
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../sp-build-web/node_modules/webpack/buildin/global.js */ "vicT")))

/***/ }),

/***/ "t9SU":
/*!**********************************************!*\
  !*** ./node_modules/@pnp/core/extendable.js ***!
  \**********************************************/
/*! exports provided: extendable, extend, extendFactory, disableExtensions, enableExtensions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendable", function() { return extendable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendFactory", function() { return extendFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableExtensions", function() { return disableExtensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableExtensions", function() { return enableExtensions; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "NuLX");

let _enableExtensions = false;
const ObjExtensionsSym = Symbol.for("PnPExt");
const factoryExtensions = new Map();
/**
 * Decorator factory wrapping any tagged class in the extension proxy, enabling the use of object extensions
 *
 * @description MUST be applied last (i.e. be the first decorator in the list top to bottom applied to a class)
 *
 * @returns Decorator implementation
 */
function extendable() {
    return (target) => {
        return new Proxy(target, {
            construct(clz, args, newTarget) {
                let r = Reflect.construct(clz, args, newTarget);
                // this block handles the factory function extensions by picking
                // them off the factory and applying them to the created object
                const proto = Reflect.getPrototypeOf(target);
                if (Reflect.has(proto, ObjExtensionsSym)) {
                    const extensions = factoryExtensions.get(Reflect.get(proto, ObjExtensionsSym));
                    if (extensions) {
                        r = extend(r, extensions);
                    }
                }
                const proxied = new Proxy(r, {
                    apply: (target, _thisArg, argArray) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("apply", (...a) => Reflect.apply(...a), target, proxied, argArray);
                    },
                    get: (target, p, receiver) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("get", (...a) => Reflect.get(...a), target, p, receiver);
                    },
                    has: (target, p) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("has", (...a) => Reflect.has(...a), target, p);
                    },
                    set: (target, p, value, receiver) => {
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        return extensionOrDefault("set", (...a) => Reflect.set(...a), target, p, value, receiver);
                    },
                });
                return proxied;
            },
        });
    };
}
/**
 * Applies the supplied extensions to a single instance
 *
 * @param target Object to which extensions are applied
 * @param extensions Extensions to apply
 */
function extend(target, extensions) {
    _enableExtensions = true;
    if (!Reflect.has(target, ObjExtensionsSym)) {
        Reflect.defineProperty(target, ObjExtensionsSym, {
            writable: true,
            value: [],
        });
    }
    extendCol(Reflect.get(target, ObjExtensionsSym), extensions);
    return target;
}
/**
 * Allows applying extensions to all instances created from the supplied factory
 *
 * @param factory The Invokable Factory method to extend
 * @param extensions Extensions to apply
 */
function extendFactory(factory, extensions) {
    _enableExtensions = true;
    // factoryExtensions
    const proto = Reflect.getPrototypeOf(factory);
    if (proto) {
        if (!Reflect.has(proto, ObjExtensionsSym)) {
            Reflect.defineProperty(proto, ObjExtensionsSym, {
                value: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getGUID"])(),
            });
        }
        const key = proto[ObjExtensionsSym];
        if (!factoryExtensions.has(key)) {
            factoryExtensions.set(key, []);
        }
        extendCol(factoryExtensions.get(key), extensions);
    }
}
function extendCol(a, e) {
    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isArray"])(e)) {
        a.push(...e);
    }
    else {
        a.push(e);
    }
}
/**
 * Disables all extensions
 */
const disableExtensions = () => {
    _enableExtensions = false;
};
/**
 * Enables all extensions
 */
const enableExtensions = () => {
    _enableExtensions = true;
};
/**
 * Executes the extended functionality if present, or the default action
 *
 * @param op Current operation type
 * @param or The default non-extended functionality
 * @param target The current "this" to which the current call applies
 * @param rest Any arguments required for the called method
 * @returns Whatever the underlying extension or method returns
 */
function extensionOrDefault(op, or, target, ...rest) {
    if (_enableExtensions && Reflect.has(target, ObjExtensionsSym)) {
        const extensions = [...Reflect.get(target, ObjExtensionsSym)];
        let result = undefined;
        for (let i = 0; i < extensions.length; i++) {
            const extension = extensions[i];
            if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isFunc"])(extension)) {
                // this extension is a function which we call
                result = extension(op, target, ...rest);
            }
            else if (op === "get" && Reflect.has(extension, rest[0])) {
                // this extension is a named extension meaning we are adding/overriding a specific method/property
                result = Reflect.get(extension, rest[0], target);
            }
            else if (Reflect.has(extension, op)) {
                // this extension is a ProxyHandler that has a handler defined for {op} so we pass control and see if we get a result
                result = Reflect.get(extension, op)(target, ...rest);
            }
            if (typeof result !== "undefined") {
                // if a extension returned a result, we return that
                // this means that this extension overrides any other extensions and no more are executed
                // first extension in the list to return "wins"
                return result;
            }
        }
    }
    return or(target, ...rest);
}
//# sourceMappingURL=extendable.js.map

/***/ }),

/***/ "tCQJ":
/*!***************************************!*\
  !*** ./node_modules/@pnp/sp/types.js ***!
  \***************************************/
/*! exports provided: emptyGuid, PrincipalType, PrincipalSource, PageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyGuid", function() { return emptyGuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalType", function() { return PrincipalType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalSource", function() { return PrincipalSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return PageType; });
// reference: https://msdn.microsoft.com/en-us/library/office/dn600183.aspx
const emptyGuid = "00000000-0000-0000-0000-000000000000";
/**
 * Specifies the type of a principal.
 */
var PrincipalType;
(function (PrincipalType) {
    /**
     * Enumeration whose value specifies no principal type.
     */
    PrincipalType[PrincipalType["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies a user as the principal type.
     */
    PrincipalType[PrincipalType["User"] = 1] = "User";
    /**
     * Enumeration whose value specifies a distribution list as the principal type.
     */
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    /**
     * Enumeration whose value specifies a security group as the principal type.
     */
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    /**
     * Enumeration whose value specifies a group as the principal type.
     */
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    /**
     * Enumeration whose value specifies all principal types.
     */
    // eslint-disable-next-line no-bitwise
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType || (PrincipalType = {}));
/**
 * Specifies the source of a principal.
 */
var PrincipalSource;
(function (PrincipalSource) {
    /**
     * Enumeration whose value specifies no principal source.
     */
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies user information list as the principal source.
     */
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    /**
     * Enumeration whose value specifies Active Directory as the principal source.
     */
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    /**
     * Enumeration whose value specifies the current membership provider as the principal source.
     */
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    /**
     * Enumeration whose value specifies the current role provider as the principal source.
     */
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    /**
     * Enumeration whose value specifies all principal sources.
     */
    // eslint-disable-next-line no-bitwise
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (PrincipalSource = {}));
var PageType;
(function (PageType) {
    PageType[PageType["Invalid"] = -1] = "Invalid";
    PageType[PageType["DefaultView"] = 0] = "DefaultView";
    PageType[PageType["NormalView"] = 1] = "NormalView";
    PageType[PageType["DialogView"] = 2] = "DialogView";
    PageType[PageType["View"] = 3] = "View";
    PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
    PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
    PageType[PageType["EditForm"] = 6] = "EditForm";
    PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
    PageType[PageType["NewForm"] = 8] = "NewForm";
    PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
    PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
    PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
})(PageType || (PageType = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "tGZ3":
/*!************************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/resolvers.js ***!
  \************************************************************/
/*! exports provided: ResolveOnData, RejectOnError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolveOnData", function() { return ResolveOnData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RejectOnError", function() { return RejectOnError; });
function ResolveOnData() {
    return (instance) => {
        instance.on.data(function (data) {
            this.emit[this.InternalResolve](data);
        });
        return instance;
    };
}
function RejectOnError() {
    return (instance) => {
        instance.on.error(function (err) {
            this.emit[this.InternalReject](err);
        });
        return instance;
    };
}
//# sourceMappingURL=resolvers.js.map

/***/ }),

/***/ "udT0":
/*!**********************************************************!*\
  !*** ./node_modules/@pnp/queryable/behaviors/parsers.js ***!
  \**********************************************************/
/*! exports provided: DefaultParse, TextParse, BlobParse, JSONParse, BufferParse, HeaderParse, JSONHeaderParse, errorCheck, parseODataJSON, parseBinderWithErrorCheck, HttpRequestError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultParse", function() { return DefaultParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextParse", function() { return TextParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlobParse", function() { return BlobParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONParse", function() { return JSONParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferParse", function() { return BufferParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderParse", function() { return HeaderParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONHeaderParse", function() { return JSONHeaderParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorCheck", function() { return errorCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseODataJSON", function() { return parseODataJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBinderWithErrorCheck", function() { return parseBinderWithErrorCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return HttpRequestError; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");


function DefaultParse() {
    return parseBinderWithErrorCheck(async (response) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0) || response.status === 204) {
            return {};
        }
        // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
        const txt = await response.text();
        const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
        return parseODataJSON(json);
    });
}
function TextParse() {
    return parseBinderWithErrorCheck(r => r.text());
}
function BlobParse() {
    return parseBinderWithErrorCheck(r => r.blob());
}
function JSONParse() {
    return parseBinderWithErrorCheck(r => r.json());
}
function BufferParse() {
    return parseBinderWithErrorCheck(r => Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["isFunc"])(r.arrayBuffer) ? r.arrayBuffer() : r.buffer());
}
function HeaderParse() {
    return parseBinderWithErrorCheck(async (r) => r.headers);
}
function JSONHeaderParse() {
    return parseBinderWithErrorCheck(async (response) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0) || response.status === 204) {
            return {};
        }
        // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
        const txt = await response.text();
        const json = txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
        const all = { data: { ...parseODataJSON(json) }, headers: { ...response.headers } };
        return all;
    });
}
async function errorCheck(url, response, result) {
    if (!response.ok) {
        throw await HttpRequestError.init(response);
    }
    return [url, response, result];
}
function parseODataJSON(json) {
    let result = json;
    if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(json, "d")) {
        if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(json.d, "results")) {
            result = json.d.results;
        }
        else {
            result = json.d;
        }
    }
    else if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["hOP"])(json, "value")) {
        result = json.value;
    }
    return result;
}
/**
 * Provides a clean way to create new parse bindings without having to duplicate a lot of boilerplate
 * Includes errorCheck ahead of the supplied impl
 *
 * @param impl Method used to parse the response
 * @returns Queryable behavior binding function
 */
function parseBinderWithErrorCheck(impl) {
    return (instance) => {
        // we clear anything else registered for parse
        // add error check
        // add the impl function we are supplied
        instance.on.parse.replace(errorCheck);
        instance.on.parse(async (url, response, result) => {
            if (response.ok && typeof result === "undefined") {
                result = await impl(response);
            }
            return [url, response, result];
        });
        return instance;
    };
}
class HttpRequestError extends Error {
    constructor(message, response, status = response.status, statusText = response.statusText) {
        super(message);
        this.response = response;
        this.status = status;
        this.statusText = statusText;
        this.isHttpRequestError = true;
    }
    static async init(r) {
        const t = await r.clone().text();
        return new HttpRequestError(`Error making HttpClient request in queryable [${r.status}] ${r.statusText} ::> ${t}`, r);
    }
}
//# sourceMappingURL=parsers.js.map

/***/ }),

/***/ "v6VW":
/*!************************************!*\
  !*** ./node_modules/@pnp/sp/fi.js ***!
  \************************************/
/*! exports provided: SPFI, spfi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPFI", function() { return SPFI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spfi", function() { return spfi; });
/* harmony import */ var _spqueryable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spqueryable.js */ "F4qD");

class SPFI {
    /**
     * Creates a new instance of the SPFI class
     *
     * @param root Establishes a root url/configuration
     */
    constructor(root = "") {
        this._root = Object(_spqueryable_js__WEBPACK_IMPORTED_MODULE_0__["SPQueryable"])(root);
    }
    /**
     * Applies one or more behaviors which will be inherited by all instances chained from this root
     *
     */
    using(...behaviors) {
        this._root.using(...behaviors);
        return this;
    }
    /**
     * Used by extending classes to create new objects directly from the root
     *
     * @param factory The factory for the type of object to create
     * @returns A configured instance of that object
     */
    create(factory, path) {
        return factory(this._root, path);
    }
}
function spfi(root = "") {
    if (typeof root === "object" && !Reflect.has(root, "length")) {
        root = root._root;
    }
    return new SPFI(root);
}
//# sourceMappingURL=fi.js.map

/***/ }),

/***/ "vbtm":
/*!*******************************************************!*\
  !*** ./node_modules/@pnp/sp/utils/encode-path-str.js ***!
  \*******************************************************/
/*! exports provided: encodePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodePath", function() { return encodePath; });
/* harmony import */ var _pnp_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/core */ "JC1J");

/**
 * Encodes path portions of SharePoint urls such as decodedUrl=`encodePath(pathStr)`
 *
 * @param value The string path to encode
 * @returns A path encoded for use in SP urls
 */
function encodePath(value) {
    if (Object(_pnp_core__WEBPACK_IMPORTED_MODULE_0__["stringIsNullOrEmpty"])(value)) {
        return "";
    }
    // replace all instance of ' with ''
    if (/!(@.*?)::(.*?)/ig.test(value)) {
        return value.replace(/!(@.*?)::(.*)$/ig, (match, labelName, v) => {
            // we do not need to encodeURIComponent v as it will be encoded automatically when it is added as a query string param
            // we do need to double any ' chars
            return `!${labelName}::${v.replace(/'/ig, "''")}`;
        });
    }
    else {
        // because this is a literal path value we encodeURIComponent after doubling any ' chars
        return encodeURIComponent(value.replace(/'/ig, "''"));
    }
}
//# sourceMappingURL=encode-path-str.js.map

/***/ }),

/***/ "vicT":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "zhiF":
/*!*********************************************************!*\
  !*** ./node_modules/@pnp/core/behaviors/assign-from.js ***!
  \*********************************************************/
/*! exports provided: AssignFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignFrom", function() { return AssignFrom; });
/**
 * Behavior that will assign a ref to the source's observers and reset the instance's inheriting flag
 *
 * @param source The source instance from which we will assign the observers
 */
function AssignFrom(source) {
    return (instance) => {
        instance.observers = source.observers;
        instance._inheritingObservers = true;
        return instance;
    };
}
//# sourceMappingURL=assign-from.js.map

/***/ }),

/***/ "zw/I":
/*!******************************************************************!*\
  !*** ./lib/webparts/masterPageRow3/components/MasterPageRow3.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MasterPageRow3_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MasterPageRow3.scss */ "IRrQ");
/* harmony import */ var _Trainings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trainings */ "4mSG");
/* harmony import */ var _pnp_sp_webs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pnp/sp/webs */ "6k7F");
/* harmony import */ var _pnp_sp_lists__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pnp/sp/lists */ "J7sA");
/* harmony import */ var _pnp_sp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pnp/sp */ "UKGb");
/* harmony import */ var _Tasks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Tasks */ "1KyJ");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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



//import { SPFI, SPFx, spfi } from "@pnp/sp";



// import { getSP } from '../pnpConfig';


// import { getSP } from '../pnpConfig';
//import OpinionPoll from './Opinion Poll'

var MasterPageRow3 = function (props) {
    var _a = react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), trainingdata = _a[0], setTrainingdata = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), tasksdata = _b[0], setTasksdata = _b[1];
    var getTrainingsdata = function () { return __awaiter(void 0, void 0, void 0, function () {
        var caml, web1, items, trainingList, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    caml = {
                        ViewXml: "<View><ViewFields><FieldRef Name='trainingname' /> <FieldRef Name='EventDate' /></ViewFields><RowLimit>5</RowLimit></View>",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    web1 = Object(_pnp_sp_webs__WEBPACK_IMPORTED_MODULE_3__["Web"])("https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement").using(Object(_pnp_sp__WEBPACK_IMPORTED_MODULE_5__["SPFx"])(props.context));
                    console.log(web1);
                    return [4 /*yield*/, web1.lists.getByTitle("TrainingCalender")];
                case 2:
                    items = _a.sent();
                    console.log(items);
                    return [4 /*yield*/, items.getItemsByCAMLQuery(caml)];
                case 3:
                    trainingList = _a.sent();
                    console.log(trainingList);
                    setTrainingdata(trainingList);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getTasksdata = function () { return __awaiter(void 0, void 0, void 0, function () {
        var caml, web1, items, taskList, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    caml = {
                        ViewXml: "<View><ViewFields><FieldRef Name='Title'/><FieldRef Name='DueDate' /></ViewFields><RowLimit>5</RowLimit></View>",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    web1 = Object(_pnp_sp_webs__WEBPACK_IMPORTED_MODULE_3__["Web"])("https://zelarsoft1.sharepoint.com/sites/Zelardemo/learningmanagement").using(Object(_pnp_sp__WEBPACK_IMPORTED_MODULE_5__["SPFx"])(props.context));
                    console.log(web1);
                    return [4 /*yield*/, web1.lists.getByTitle("Tasks")];
                case 2:
                    items = _a.sent();
                    return [4 /*yield*/, items.getItemsByCAMLQuery(caml)];
                case 3:
                    taskList = _a.sent();
                    setTasksdata(taskList);
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var execute = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getTrainingsdata()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getTasksdata()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        execute();
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "Containers3" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Trainings__WEBPACK_IMPORTED_MODULE_2__["default"], { data: trainingdata })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Tasks__WEBPACK_IMPORTED_MODULE_6__["default"], { data: tasksdata }))));
};
/* harmony default export */ __webpack_exports__["default"] = (MasterPageRow3);


/***/ })

/******/ })});;
//# sourceMappingURL=master-page-row-3-web-part.js.map