/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calender = __webpack_require__(1);

var _calender2 = _interopRequireDefault(_calender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = new _calender2.default('2018-2-28');

// console.log(c.genWeek());
// console.log(c.genWeekByTs());
console.log(c.genMonth());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description 一个日历类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _utils = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*每个月的天数*/
var monthDays = [[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

var Calender = function () {
    function Calender(str) {
        _classCallCheck(this, Calender);

        this.date = new Date(str);
    }

    _createClass(Calender, [{
        key: 'setDate',
        value: function setDate() {}
        /*生成 5 * 7 的数组，对应一个月（包含上个月的最后几天和下个月的开头几天）*/

    }, {
        key: 'genMonth',
        value: function genMonth() {
            var date = this.date;

            var y = date.getFullYear(),
                m = date.getMonth(),
                d = date.getDay(),
                arr = [],
                dateStr = void 0;
            for (var i = 0; i < 5; i++) {
                if (i == 4 && !(0, _utils.isLeapYear)(y) && m == 1) {
                    dateStr = [y, m + 1, 28].join('-');
                } else {
                    dateStr = [y, m + 1, 1 + i * 7].join('-');
                }
                arr.push(this.genWeekByTs(new Date(dateStr)));
            }
            return arr;
        }
    }, {
        key: 'genWeek',
        value: function genWeek(date) {
            date = date ? date : this.date;
            var y = date.getFullYear(),
                m = date.getMonth(),
                d = date.getDate(),
                wd = date.getDay() == 0 ? 7 : date.getDay(),
                // 1 ~ 7 周几
            arr = [],
                mDays = monthDays[(0, _utils.isLeapYear)(y) ? 0 : 1]; /*每个月对应的天数*/
            if (d < wd) {
                /*第一周，有上周的日期*/
                var lastMonthDays = mDays[(m + 11) % 12];
                var _start = lastMonthDays - (wd - d) + 1;
                m == 0 && y--;
                while (_start <= lastMonthDays) {
                    arr.push({
                        date: [y, m == 0 ? 12 : m, _start++],
                        belong: 'last'
                    });
                };
                var i = 1;
                var end = d + 7 - wd;
                while (i <= end) {
                    arr.push({
                        date: [y, m + 1, i++],
                        belong: 'current'
                    });
                }

                return arr;
            }
            var last = (d + (7 - wd)) % mDays[m];
            if (last < d) {
                /*一个月的最后一周，有下周的日期*/
                var start = d - wd + 1;
                while (start <= mDays[m]) {
                    arr.push({
                        date: [y, m + 1, start++],
                        belong: 'current'
                    });
                };
                var i = 1;
                m == 11 && y++;
                while (i <= last) {
                    arr.push({
                        date: [y, m == 11 ? 1 : m + 2, i++],
                        belong: 'next'
                    });
                }

                return arr;
            }
            var s = d - wd + 1,
                e = d + 7 - wd;
            while (s <= e) {
                arr.push({
                    date: [y, m + 1, s++],
                    belong: 'current'
                });
            }

            return arr;
        }
    }, {
        key: 'genWeekByTs',
        value: function genWeekByTs(date) {
            date = date ? date : this.date;
            var wd = date.getDay() == 0 ? 7 : date.getDay(),
                d = date.getDate(),
                cm = date.getMonth();
            var arr = [],
                startTs = date.getTime() - wd * 86400000;
            var i = 0,
                belong = void 0;
            while (i++ < 7) {
                var dd = new Date(startTs + 86400000 * i);
                var m = dd.getMonth();
                if (m < cm || cm == 0 && m == 11) {
                    belong = 'last';
                } else if (m > cm || cm == 11 && m == 0) {
                    belong = 'next';
                } else {
                    belong = 'current';
                }
                arr.push({
                    date: [dd.getFullYear(), m + 1, dd.getDate()],
                    belong: belong
                });
            }

            return arr;
        }
    }, {
        key: 'setDate',
        value: function setDate(str) {
            this.date = new Date(str);
        }
    }]);

    return Calender;
}();

exports.default = Calender;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLeapYear = isLeapYear;
/**
 * @param year
 * @returns Boolean
 */
function isLeapYear(year) {
  return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map