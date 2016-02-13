(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Person = require("./model/Person").Person;

global.app = function () {
    var christoph = new Person("Christoph", "Burgdorf");
    console.log(christoph.fullName);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZXJuYXJkd2FuZy9Eb2N1bWVudHMvY29kZS9naXRodWIvbWFkZWJ5L3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQVEsTUFBTSxXQUFPLGdCQUFnQixFQUE3QixNQUFNOztBQUVkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWTtBQUNyQixRQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbkMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQZXJzb259IGZyb20gJy4vbW9kZWwvUGVyc29uJztcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hyaXN0b3BoID0gbmV3IFBlcnNvbignQ2hyaXN0b3BoJywgJ0J1cmdkb3JmJyk7XG4gICAgY29uc29sZS5sb2coY2hyaXN0b3BoLmZ1bGxOYW1lKTtcbn07XG4iXX0=
},{"./model/Person":2}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Person = (function () {
    function Person(firstName, lastName) {
        _classCallCheck(this, Person);

        this.firstName = firstName;
        this.lastName = lastName;
    }

    _createClass(Person, {
        fullName: {
            get: function () {
                return "" + this.firstName + " " + this.lastName;
            }
        }
    });

    return Person;
})();

exports.Person = Person;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiL1VzZXJzL2Jlcm5hcmR3YW5nL0RvY3VtZW50cy9jb2RlL2dpdGh1Yi9tYWRlYnkvc3JjL2pzL21vZGVsL1BlcnNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0lDWE0sTUFBTTtBQUNHLGFBRFQsTUFBTSxDQUNJLFNBQVMsRUFBRSxRQUFRLEVBQUU7OEJBRC9CLE1BQU07O0FBRUosWUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDNUI7O2lCQUpDLE1BQU07QUFNSixnQkFBUTtpQkFBQSxZQUFHO0FBQ1gsNEJBQVUsSUFBSSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsUUFBUSxDQUFHO2FBQy9DOzs7O1dBUkMsTUFBTTs7O1FBVUosTUFBTSxHQUFOLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQZXJzb24gPSByZXF1aXJlKFwiLi9tb2RlbC9QZXJzb25cIikuUGVyc29uO1xuXG5nbG9iYWwuYXBwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaHJpc3RvcGggPSBuZXcgUGVyc29uKFwiQ2hyaXN0b3BoXCIsIFwiQnVyZ2RvcmZcIik7XG4gICAgY29uc29sZS5sb2coY2hyaXN0b3BoLmZ1bGxOYW1lKTtcbn07XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTlpWlhKdVlYSmtkMkZ1Wnk5RWIyTjFiV1Z1ZEhNdlkyOWtaUzluYVhSb2RXSXZiV0ZrWldKNUwzTnlZeTlxY3k5aGNIQXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3TzBsQlFWRXNUVUZCVFN4WFFVRlBMR2RDUVVGblFpeEZRVUUzUWl4TlFVRk5PenRCUVVWa0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NXVUZCV1R0QlFVTnlRaXhSUVVGSkxGTkJRVk1zUjBGQlJ5eEpRVUZKTEUxQlFVMHNRMEZCUXl4WFFVRlhMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU03UVVGRGNFUXNWMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhUUVVGVExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdRMEZEYmtNc1EwRkJReUlzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUh0UVpYSnpiMjU5SUdaeWIyMGdKeTR2Ylc5a1pXd3ZVR1Z5YzI5dUp6dGNibHh1WjJ4dlltRnNMbUZ3Y0NBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQjJZWElnWTJoeWFYTjBiM0JvSUQwZ2JtVjNJRkJsY25OdmJpZ25RMmh5YVhOMGIzQm9KeXdnSjBKMWNtZGtiM0ptSnlrN1hHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb1kyaHlhWE4wYjNCb0xtWjFiR3hPWVcxbEtUdGNibjA3WEc0aVhYMD0iLCJjbGFzcyBQZXJzb24ge1xuICAgIGNvbnN0cnVjdG9yKGZpcnN0TmFtZSwgbGFzdE5hbWUpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICB9XG5cbiAgICBnZXQgZnVsbE5hbWUoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWA7XG4gICAgfVxufVxuZXhwb3J0IHtQZXJzb259XG4iXX0=
