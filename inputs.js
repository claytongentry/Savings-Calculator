//TODO: Get electricity prices for each community
// TODO: Host on heroku
// TODO: Chop rebate part from video

/**************************
* SHOP Savings Calculator
*
* inputs.js
*
* by Clayton Gentry, US Solar Network
*
* Handles calculator inputs, stores gas price data, ensures form completion prior to submission
*
**
___________________________________________________________________________________________*/
var gasPrice = 0;
var numberInHouse = 0;

$(document).ready(function() {
    // Init gas price

    // $("#answerDiv").css({
    //     display: 'none' // Hides answerDiv on page load
    // });

    // Gas or Electricity buttons functionality
    two_btn_switch("#gasButton", "#electricityButton");
    two_btn_switch("#electricityButton", "#gasButton");

    // Submit!
    $("#formSubmit").click(function() {

        $("#formDiv").fadeOut(400);

        // Get number of folks in the house
        numberInHouse = parseInt($("#numPeopleInput").val());
        console.log("Number in House is " + numberInHouse);

        // Get user's community
        var selCommunity = document.getElementById("selCommunity");
        var userCommunity = selCommunity.options[selCommunity.selectedIndex].value;
        console.log("User Community is " + userCommunity);

        /**
        * Set gas price based on month, community
        * Gas Price in terms of $/therm
        **/
        // Get system month to determine gas price
        var date = new Date();
        var monthsArr = new Array();
        monthsArr[0] = "January";
        monthsArr[1] = "February";
        monthsArr[2] = "March";
        monthsArr[3] = "April";
        monthsArr[4] = "May";
        monthsArr[5] = "June";
        monthsArr[6] = "July";
        monthsArr[7] = "August";
        monthsArr[8] = "September";
        monthsArr[9] = "October";
        monthsArr[10] = "November";
        monthsArr[11] = "December";
        var month = monthsArr[date.getMonth()];
        console.log("Current month is " + month);

        switch (userCommunity) {

          // Evanston, Wilmette and Skokie all use NICOR gas, prices from 2014.
          case "Evanston":
          case "Wilmette":
          case "Skokie":
            switch (month) {
              case "January":
                gasPrice = 0.46;
                break;
              case "February":
                gasPrice = 0.51;
                break;
              case "March":
              case "April":
              case "May":
              case "June":
              case "July":
              case "August":
                gasPrice = 0.68;
                break;
              case "September":
                gasPrice = 0.49;
                break;
              case "October":
                gasPrice = 0.45;
                break;
              case "November":
                gasPrice = 0.46;
                break;
              case "December":
                gasPrice = 0.40;
                break;
              default:
                break;
            }
            break;

          // Highland Park uses North Shore Gas, prices from 2014.
          case "Highland Park":
            switch (month) {
              case "January":
                gasPrice = 0.52;
                break;
              case "February":
                gasPrice = 0.57;
                break;
              case "March":
                gasPrice = 0.88;
                break;
              case "April":
                gasPrice = 1.22;
                break;
              case "May":
                gasPrice = 0.92;
                break;
              case "June":
                gasPrice = 0.85;
                break;
              case "July":
                gasPrice = 0.83;
                break;
              case "August":
                gasPrice = 0.78;
                break;
              case "September":
                gasPrice = 0.69;
                break;
              case "October":
                gasPrice = 0.56;
                break;
              case "November":
                gasPrice = 0.52;
                break;
              case "December":
                gasPrice = 0.59;
                break;
              default:
                break;
            }
            break;

          // Chicago uses Peoples Gas, prices from 2014
          case "City of Chicago":
            switch (month) {
              case "January":
                gasPrice = 0.48;
                break;
              case "February":
                gasPrice = 0.52;
                break;
              case "March":
                gasPrice = 0.93;
                break;
              case "April":
                gasPrice = 1.19;
                break;
              case "May":
                gasPrice = 0.85;
                break;
              case "June":
                gasPrice = 0.81;
                break;
              case "July":
                gasPrice = 0.86;
                break;
              case "August":
                gasPrice = 0.75;
                break;
              case "September":
                gasPrice = 0.69;
                break;
              case "October":
                gasPrice = 0.49;
                break;
              case "November":
                gasPrice = 0.52;
                break;
              case "December":
                gasPrice = 0.58;
                break;
              default:
                break;
            }
            break;

          default:
            break;
        }

        console.log("gasPrice is " + gasPrice);

        // Gas or Electric?
        var gasBool;
        var power;
        if ($("#gasButton").hasClass('activated')) {
            gasBool = true;
            power = "gas"
        } else if ($("#electricityButton").hasClass('activated')) {
            gasBool = false;
            power = "electricity"
        }

        if (gasBool == true)
          console.log("System uses gas.\n");
        else {
          console.log("System uses electricity.\n");
        }

        // Sanity checks
        if (numberInHouse > 0 && userCommunity != null && (($("#gasButton").hasClass('activated')) || ($("#electricityButton").hasClass('activated'))))
            $("#answerDiv").delay(400).fadeIn(400);

        // Incomplete form
        else {
            alert("Uh oh! We weren't able to process your submission. Try again.\n");
            $("#formDiv").fadeIn();
        }

/*******************************************************************************
* Results
*
* Handles results management
*    Convert monthly savings to daily and yearly
*    Convert cost and energy savings to other equivalents – cars, trees, coal
*
______________________________________________________________________________*/

      /* Implements time button switching
      * First param is button to activate, second & third params buttons to deactivate
      */

      var therms = document.getElementById("thermsReturn");
      var dollars = document.getElementById("dollarsReturn");

      /*var monthlyEnergySavings = monthlyEnergySavings(numberInHouse, gasPrice);
      var weeklyEnergySavings = ((((monthlyEnergySavings(numberInHouse, gasPrice) / 30.5) * 7) * 100) / 100).toFixed(2);
      var yearlyEnergySavings = (((monthlyEnergySavings(numberInHouse, gasPrice) * 12) * 100) / 100).toFixed(2);
*/
      three_btn_switch("#weeklyButton", "#monthlyButton", "#yearlyButton");
      three_btn_switch("#monthlyButton", "#weeklyButton", "#yearlyButton");
      three_btn_switch("#yearlyButton", "#weeklyButton", "#monthlyButton");

      $("#monthlyButton").addClass("activated");

      // Determine values user reqested and returns
      therms.innerHTML = monthlyEnergySavings(numberInHouse, gasPrice) + " th";
      dollars.innerHTML = "$" + monthlyCostSavings(numberInHouse, gasPrice);

      $("#monthlyButton").click(function() {
          therms.innerHTML = (monthlyEnergySavings(numberInHouse, gasPrice) + " th");
          dollars.innerHTML = ("$" + monthlyCostSavings(numberInHouse, gasPrice));
      });

      $("#weeklyButton").click(function() {
          therms.innerHTML = weekly(monthlyEnergySavings(numberInHouse, gasPrice)) + " th";
          dollars.innerHTML = "$" + weekly(monthlyCostSavings(numberInHouse, gasPrice));
      });

      $("#yearlyButton").click(function() {
          therms.innerHTML = yearly(monthlyEnergySavings(numberInHouse, gasPrice)) + " th";
          dollars.innerHTML = "$" + yearly(monthlyCostSavings(numberInHouse, gasPrice));
      });

/*******************************************************************************
* Equivalents
*
* Handles equivalents management
______________________________________________________________________________*/

      var annualTherms = yearly(monthlyEnergySavings(numberInHouse, gasPrice));

      document.getElementById("returnedGasValue").innerHTML = gasCalc(annualTherms) + " gallons of gas";
      document.getElementById("returnedTreesValue").innerHTML = treesCalc(annualTherms) + " trees";
      document.getElementById("returnedCoalValue").innerHTML = coalCalc(annualTherms) + " lbs of coal";

  });

});

// Type button switching
function two_btn_switch(btnOn, btnOff) {
  $(btnOn).click(function() {
    $(btnOn).addClass("activated");
    $(btnOff).removeClass("activated");
  });
}

// Time button switching
function three_btn_switch(btnOn, btnOff1, btnOff2) {
  $(btnOn).click(function() {
    $(btnOn).addClass("activated");
    $(btnOff1).removeClass("activated");
    $(btnOff2).removeClass("activated");
  });
}
/********************************************
* Savings Math!
*
* Source of wisdom – 
* Jonathan Nieuwsma
*
* */

// Returns monthly energy savings
function monthlyEnergySavings(numberInHouse, gasPrice) {
  return (Math.round((numberInHouse * gasPrice) * 100) / 100).toFixed(2);
}

// Returns monthly cost savings
function monthlyCostSavings(numberInHouse, gasPrice) {
  return (Math.round((numberInHouse * gasPrice) * 100) / 100).toFixed(2);
}

function weekly(monthlyVal) {
  return (monthlyVal / 30.5 * 7 * 100 / 100).toFixed(2);
}

function yearly(monthlyVal) {
  return (monthlyVal * 12).toFixed(2);
}

// Equivalents calculations go in here
function gasCalc(th) {
  // Gallons of gas
  return (th * 0.597).toFixed(2);
}

function treesCalc(th) {
  // Number of tree seedlings grown for 10 years
  return (th * 0.136).toFixed(2);
}

function coalCalc(th) {
  // Pounds of coal
  return (th * 5.70).toFixed(2);
}

/*****************
* Tell them the assumptions
* With this average gas price, assuming there is a certain percentage for heating hot water (BTUs)
*
*We already have the price of natural gas
*
* Inputs:
*  1. Number of people in the household (to determine average of number of gallons used per day); more people = more beneficial
*  2. Pick your location - Evanston, Skokie, Wilmette, Highland Park, City of Chicago
*      -- Determine electric and gas price constants for each of these communities
*      -- Identify which gas company serves that community, then go to gas company's website
*      -- (use US Energy Information Administration, call Citizens Utilities Board)
*  3. Electric or Gas
*      Will change CO2 footprint
* Outputs:
*  1. Energy Outputs (Therms for gas or kWh for electricity)
*  2. Cost Savings
*  3. CO2 Savings (in metric tons, cars, trees)
*      -- Individual
*      -- Group
*
*
* Gas hot water: Therms
* Electric hot water: Kilowatt hours
*     Comm ed price for electric hot water
*
* Return result and link to "Contact Us" button
*
* Convert result into cars off the road or trees planted or something else
*
* Desired outcome: Have us come out and take a look, help us put together a group.
*    "Here's your impact on your town in a group of 20."
*
* Your individual impact versus a community impact
*    Additional group impact + impact already made through SHOP
*
* URL for other conversions: http://www.epa.gov/cleanenergy/energy-resources/refs.html
*
* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
