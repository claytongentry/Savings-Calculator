

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
var price = 0;
var numberInHouse = 0;

$(document).ready(function() {

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

        // Gas or Electric?
        var gasBool;
        if ($("#gasButton").hasClass('activated'))
            gasBool = true;
        else if ($("#electricityButton").hasClass('activated')) {
          gasBool = false;
          comed_price = 7.596; // ComEd price: 7.596 cents per kWh
        }

        if (gasBool == true) {

            console.log("System uses gas.\n");

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
                    price = 0.46;
                    break;
                  case "February":
                    price = 0.51;
                    break;
                  case "March":
                  case "April":
                  case "May":
                  case "June":
                  case "July":
                  case "August":
                    price = 0.68;
                    break;
                  case "September":
                    price = 0.49;
                    break;
                  case "October":
                    price = 0.45;
                    break;
                  case "November":
                    price = 0.46;
                    break;
                  case "December":
                    price = 0.40;
                    break;
                  default:
                    break;
                }
                break;

              // Highland Park uses North Shore Gas, prices from 2014.
              case "Highland Park":
                switch (month) {
                  case "January":
                    price = 0.52;
                    break;
                  case "February":
                    price = 0.57;
                    break;
                  case "March":
                    price = 0.88;
                    break;
                  case "April":
                    price = 1.22;
                    break;
                  case "May":
                    price = 0.92;
                    break;
                  case "June":
                    price = 0.85;
                    break;
                  case "July":
                    price = 0.83;
                    break;
                  case "August":
                    price = 0.78;
                    break;
                  case "September":
                    price = 0.69;
                    break;
                  case "October":
                    price = 0.56;
                    break;
                  case "November":
                    price = 0.52;
                    break;
                  case "December":
                    price = 0.59;
                    break;
                  default:
                    break;
                }
                break;

              // Chicago uses Peoples Gas, prices from 2014
              case "City of Chicago":
                switch (month) {
                  case "January":
                    price = 0.48;
                    break;
                  case "February":
                    price = 0.52;
                    break;
                  case "March":
                    price = 0.93;
                    break;
                  case "April":
                    price = 1.19;
                    break;
                  case "May":
                    price = 0.85;
                    break;
                  case "June":
                    price = 0.81;
                    break;
                  case "July":
                    price = 0.86;
                    break;
                  case "August":
                    price = 0.75;
                    break;
                  case "September":
                    price = 0.69;
                    break;
                  case "October":
                    price = 0.49;
                    break;
                  case "November":
                    price = 0.52;
                    break;
                  case "December":
                    price = 0.58;
                    break;
                  default:
                    break;
                }
                break;

              default:
                break;
            }
        }

        else {

          console.log("System uses electricity");

          // Price = ComEd cents per kWh (7.596) times kWh per therm times 100 to convert to dollars
          price = comed_price * 29.3001111 * 100

        }

        console.log("Price per therm is " + price);

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

      /*var monthlyEnergySavings = monthlyEnergySavings(numberInHouse, price);
      var weeklyEnergySavings = ((((monthlyEnergySavings(numberInHouse, price) / 30.5) * 7) * 100) / 100).toFixed(2);
      var yearlyEnergySavings = (((monthlyEnergySavings(numberInHouse, price) * 12) * 100) / 100).toFixed(2);
*/
      three_btn_switch("#weeklyButton", "#monthlyButton", "#yearlyButton");
      three_btn_switch("#monthlyButton", "#weeklyButton", "#yearlyButton");
      three_btn_switch("#yearlyButton", "#weeklyButton", "#monthlyButton");

      $("#monthlyButton").addClass("activated");

      // Determine values user reqested and returns
      therms.innerHTML = monthlyEnergySavings(numberInHouse, price) + " th";
      dollars.innerHTML = "$" + monthlyCostSavings(numberInHouse, price);

      $("#monthlyButton").click(function() {
          therms.innerHTML = (monthlyEnergySavings(numberInHouse, price) + " th");
          dollars.innerHTML = ("$" + monthlyCostSavings(numberInHouse, price));
      });

      $("#weeklyButton").click(function() {
          therms.innerHTML = weekly(monthlyEnergySavings(numberInHouse, price)) + " th";
          dollars.innerHTML = "$" + weekly(monthlyCostSavings(numberInHouse, price));
      });

      $("#yearlyButton").click(function() {
          therms.innerHTML = yearly(monthlyEnergySavings(numberInHouse, price)) + " th";
          dollars.innerHTML = "$" + yearly(monthlyCostSavings(numberInHouse, price));
      });

/*******************************************************************************
* Equivalents
*
* Handles equivalents management
______________________________________________________________________________*/

      // Equivalents processed in annual terms, so we need therms per year
      var annualTherms = yearly(monthlyEnergySavings(numberInHouse, price));

      // Calculate and show equivalent values
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
function monthlyEnergySavings(numberInHouse, price) {
  return (Math.round((numberInHouse * price) * 100) / 100).toFixed(2);
}

// Returns monthly cost savings
function monthlyCostSavings(numberInHouse, price) {
  return (Math.round((numberInHouse * price) * 100) / 100).toFixed(2);
}

function weekly(monthlyVal) {
  return (monthlyVal / 30.5 * 7 * 100 / 100).toFixed(2);
}

function yearly(monthlyVal) {
  return (monthlyVal * 12).toFixed(2);
}

/**
* Equivalents calculations go in here
**/
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
