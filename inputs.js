

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
          comed_price = 0.0415; // ~4 cents per kWh - 2014 average monthly value across 12 months
        }

        if (gasBool == true) {

            console.log("System uses gas.\n");

            switch (userCommunity) {

              // All prices calculated from 2014 monthly averages over all 12 months

              // Evanston, Wilmette and Skokie all use NICOR gas, prices from 2014.
              case "Evanston":
              case "Wilmette":
              case "Skokie":
                price = 0.578333 // ~58 cents per therm 
                break;

              // Highland Park uses North Shore Gas, prices from 2014.
              case "Highland Park":
                price = 0.74325 // ~74 cents per therm
                break;

              // Chicago uses Peoples Gas, prices from 2014
              case "City of Chicago":
                price = 0.7220333 // ~72 cents per therm
                break;

              default:
                break;
            }
        }

        else {

          console.log("System uses electricity");

          // Price = ComEd cents per kWh (7.42) times kWh per therm times 100 to convert to dollars
          price = comed_price * 29.3001111

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
