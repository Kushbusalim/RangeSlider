/**
 * Author:  Fulup Ar Foll
 * Date:    March 2015
 * Licence: Anything until you do not complain and fix bugs by yourself
 *
 * BzmRangeSlider module only depend on Foundation RangeSlider CSS
 * https://github.com/zurb/foundation/blob/master/scss/foundation/components/_range-slider.scss
 *
 * Demo Dependencies:
 *  - mm.foundation Angular directive for Foundation http://pineconellc.github.io/angular-foundation/
 *  - ui-notification https://github.com/alexcrack/angular-ui-notification
 */

'use strict';

var opa = angular.module('BzmRangeSliderDemo', ['mm.foundation', 'ui-notification','bzm-range-slider']);

opa.controller('DemoController', ['$log','$scope', '$timeout', 'Notification', DemoController]);
function DemoController ($log, scope, $timeout, Notification) {
    scope.count=0;  // development counter to prevent from infinite loop


    // this CB is call when slide is ready attr=inithook
    scope.appSlideCtrlCB = function (sliderHandle) {

       // use slide handle to set value
       sliderHandle.setValue (parseInt(Math.random()*100) - 50);

       // animate slide for ever
       $timeout (function() {scope.appSlideCtrlCB (sliderHandle)}, 5000);
    };

    // Initialisation of slider in one shot
    scope.initFromApp = {
            id     : 'dynamic-slide-sample',
            byStep :  1,
            notLess: -50,
            notMore: 50,
            value  : 15
    };

    // set min/max price default
    scope.Price = {
        mini: 0,
        maxi: 100
    };
    scope.SetPriceRange = function (value, slider) {
      var handle =   slider.getCbHandle();
      var slideid=   slider.getId();
      console.log ("setPriceCB sliderid=%s", slider.getId());

      if (slideid == "mini")  handle.mini= value;
      if (slideid == "maxi")  handle.maxi= value;
    };

    // demo helper to compute offset time in between two values
    scope.FormatTimeDiff = function (checkin, checkout) {
        var value;

        if (!checkin || !checkout) return;
        // if we have only one ng-model them it should be a dual handles slider
        if (checkout) value = checkout.getValue() - checkin.getValue();
        else value = checkin.getValue(1) - checkin.getValue(0);

        var hours  = parseInt (value);
        var minutes= parseInt((value%1)*60);
        if (minutes < 10) minutes= "0" + minutes;
        return hours + "h" +minutes;
    };


    // Call when external representation of a slider needs to be updated
    scope.SliderPriceCB = function (value, id) {
        return value + "&euro;";
    };

    // Call when external representation of a slider needs to be updated
    scope.SliderFormatCB = function (value, id) {
        var hours  = parseInt (value);
        var minutes= parseInt((value%1)*60);
        if (minutes < 10) minutes= "0" + minutes;
        //console.log ("formatter id:%s value:%d hours:%d mn:%d", id, value, hours, minutes)
        return hours + "h" +minutes;
    };


    // Callback for standard slider call when mouse quit the slider
    scope.SliderSelectionCB = function (value, slider) {
        if (scope.count++ > 1000) return; // for dev only if more than 1000 mean we have a bug :)
        Notification.success ({message: scope.count+":"+slider.getId()+" ==> value=" +slider.getValue() +" view=" +slider.getView(), width: 100, delay: 10000});
    };

    // This callback handles low/height value of dual sliders
    scope.SliderDualSelectionCB = function (value, slider) {
        if (scope.count++ > 1000) return; // for dev only if more than 1000 mean we have a bug :)
        Notification.success ({message: scope.count+":"+slider.getId()+" ==> Low=" +slider.getValue(0) +" Height=" + slider.getValue(1) +" view=" +slider.getView(0) + "/" + slider.getView(1), width: 100, delay: 10000});
    };


};

//console.log ("range-slider-Demo-App Loaded");