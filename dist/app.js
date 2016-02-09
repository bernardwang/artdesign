(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Person = require("./model/Person").Person;

global.app = function () {
    var christoph = new Person("Christoph", "Burgdorf");
    console.log(christoph.fullName);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZXJuYXJkd2FuZy9Eb2N1bWVudHMvY29kZS9naXRodWIvbWFkZWJ5L3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVksQ0FBQzs7QUFFYixJQUZRLE1BQU0sR0FBQSxPQUFBLENBQU8sZ0JBQWdCLENBQUEsQ0FBN0IsTUFBTSxDQUFBOztBQUVkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWTtBQUNyQixRQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDbkMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQZXJzb259IGZyb20gJy4vbW9kZWwvUGVyc29uJztcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hyaXN0b3BoID0gbmV3IFBlcnNvbignQ2hyaXN0b3BoJywgJ0J1cmdkb3JmJyk7XG4gICAgY29uc29sZS5sb2coY2hyaXN0b3BoLmZ1bGxOYW1lKTtcbn07XG4iXX0=
},{"./model/Person":2}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var key in props) {
            var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
        }Object.defineProperties(target, props);
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _classCallCheck = function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

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
            get: function get() {
                return "" + this.firstName + " " + this.lastName;
            }
        }
    });

    return Person;
})();

exports.Person = Person;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwiL1VzZXJzL2Jlcm5hcmR3YW5nL0RvY3VtZW50cy9jb2RlL2dpdGh1Yi9tYWRlYnkvc3JjL21vZGVsL1BlcnNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsYUFBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFBRSxnQkFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUFFLE1BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FBRSxPQUFRLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxZQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUssV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFRLFdBQVcsQ0FBQztLQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFaGMsSUFBSSxlQUFlLEdBQUcsU0FBQSxlQUFBLENBQVUsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEVBQUc7QUFBRSxjQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FBRTtDQUFFLENBQUM7O0FBRWpLLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN6QyxTQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQzs7QUFFSCxJQVZNLE1BQU0sR0FBQSxDQUFBLFlBQUE7QUFDRyxhQURULE1BQU0sQ0FDSSxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBVzdCLHVCQUFlLENBQUMsSUFBSSxFQVp0QixNQUFNLENBQUEsQ0FBQTs7QUFFSixZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixZQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUM1Qjs7QUFjRCxnQkFBWSxDQWxCVixNQUFNLEVBQUE7QUFNSixnQkFBUSxFQUFBO0FBY0osZUFBRyxFQWRDLFNBQUEsR0FBQSxHQUFHO0FBQ1gsdUJBQUEsRUFBQSxHQUFVLElBQUksQ0FBQyxTQUFTLEdBQUEsR0FBQSxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUc7YUFDL0M7U0FlSTtLQUNKLENBQUMsQ0FBQzs7QUFFSCxXQTFCRSxNQUFNLENBQUE7Q0EyQlgsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQW5CQyxNQUFNLEdBQU4sTUFBTSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgUGVyc29uID0gcmVxdWlyZShcIi4vbW9kZWwvUGVyc29uXCIpLlBlcnNvbjtcblxuZ2xvYmFsLmFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2hyaXN0b3BoID0gbmV3IFBlcnNvbihcIkNocmlzdG9waFwiLCBcIkJ1cmdkb3JmXCIpO1xuICAgIGNvbnNvbGUubG9nKGNocmlzdG9waC5mdWxsTmFtZSk7XG59O1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5aVpYSnVZWEprZDJGdVp5OUViMk4xYldWdWRITXZZMjlrWlM5bmFYUm9kV0l2YldGa1pXSjVMM055WXk5aGNIQXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQkxGbEJRVmtzUTBGQlF6czdRVUZGWWl4SlFVWlJMRTFCUVUwc1IwRkJRU3hQUVVGQkxFTkJRVThzWjBKQlFXZENMRU5CUVVFc1EwRkJOMElzVFVGQlRTeERRVUZCT3p0QlFVVmtMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzV1VGQldUdEJRVU55UWl4UlFVRkpMRk5CUVZNc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQlF5eFhRVUZYTEVWQlFVVXNWVUZCVlN4RFFVRkRMRU5CUVVNN1FVRkRjRVFzVjBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03UTBGRGJrTXNRMEZCUXlJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElIdFFaWEp6YjI1OUlHWnliMjBnSnk0dmJXOWtaV3d2VUdWeWMyOXVKenRjYmx4dVoyeHZZbUZzTG1Gd2NDQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0IyWVhJZ1kyaHlhWE4wYjNCb0lEMGdibVYzSUZCbGNuTnZiaWduUTJoeWFYTjBiM0JvSnl3Z0owSjFjbWRrYjNKbUp5azdYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29ZMmh5YVhOMGIzQm9MbVoxYkd4T1lXMWxLVHRjYm4wN1hHNGlYWDA9IiwiY2xhc3MgUGVyc29uIHtcbiAgICBjb25zdHJ1Y3RvcihmaXJzdE5hbWUsIGxhc3ROYW1lKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGxOYW1lKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gO1xuICAgIH1cbn1cbmV4cG9ydCB7UGVyc29ufVxuIl19
