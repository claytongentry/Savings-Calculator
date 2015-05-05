

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

        // Gas or Electric?
        var gasBool;
        var elec_price;
        if ($("#gasButton").hasClass('activated'))
            gasBool = true;
        else if ($("#electricityButton").hasClass('activated')) {
            gasBool = false;
        }

        // If gas, determine annual therms based on people in house
        var annualTherms;
        if (gasBool == true) {
            switch (numberInHouse) {
              case 1:
                console.log("Standard 2-panel system may be oversized. Consult US Solar Network.");
                break;
              case 2:
                annualTherms = 94;
                break;
              case 3:
                annualTherms = 103;
                break;
              case 4:
                annualTherms = 111;
                break;
              case 5:
                annualTherms = 118;
                break;
              case 6:
                annualTherms = 124;
                break;
              case 7:
                annualTherms = 129;
                break;
              case 8:
                annualTherms = 134;
                break;
              default:
                console.log("A larger system may be required. Consult US Solar Network.");
                break;
            }
        }

        // If electricity, determine annual kWh
        else {
          var annualkwh;
          switch (numberInHouse) {
            case 1:
              console.log("Standard 2-panel system may be oversized. Consult US Solar Network.");
              break;
            case 2:
              annualkwh = 2808;
              break;
            case 3:
              annualkwh = 3095;
              break;
            case 4:
              annualkwh = 3324;
              break;
            case 5:
              annualkwh = 3537;
              break;
            case 6:
              annualkwh = 3702;
              break;
            case 7:
              annualkwh = 3870;
              break;
            case 8:
              annualkwh = 4010;
              break;
            default:
              console.log("A larger system may be required. Consult US Solar Network.");
              break;
          }
        }

        // Get user's community
        var selCommunity = document.getElementById("selCommunity");
        var userCommunity = selCommunity.options[selCommunity.selectedIndex].value;
        console.log("User Community is " + userCommunity);

        /**
        * Set gas price based on community
        **/

        // If gas system, set price based on community
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

          // Price = cost per kWh (0.09) times kWh per therm
          price = 0.09;

        }

        console.log("Price per therm is " + price);

        /*
         * Sanity checks
         */
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

      three_btn_switch("#weeklyButton", "#monthlyButton", "#yearlyButton");
      three_btn_switch("#monthlyButton", "#weeklyButton", "#yearlyButton");
      three_btn_switch("#yearlyButton", "#weeklyButton", "#monthlyButton");

      $("#monthlyButton").addClass("activated");

      // Determine values user reqested and returns
      if (gasBool == true) {
        therms.innerHTML = monthly(annualTherms) + " th";
        dollars.innerHTML = "$" + monthlyCostSavings(annualTherms, price);

        $("#monthlyButton").click(function() {
            therms.innerHTML = (monthly(annualTherms) + " th");
            dollars.innerHTML = "$" + monthlyCostSavings(annualTherms, price);
        });

        $("#weeklyButton").click(function() {
            therms.innerHTML = weekly(annualTherms) + " th";
            dollars.innerHTML = "$" + weeklyCostSavings(annualTherms);
        });

        $("#yearlyButton").click(function() {
            therms.innerHTML = annualTherms + " th";
            dollars.innerHTML = "$" + yearlyCostSavings(annualTherms, price);
        });
      }

      else {
        therms.innerHTML = monthly(annualkwh) + " kWh";
        dollars.innerHTML = "$" + monthlyCostSavings(annualkwh, price);

        $("#monthlyButton").click(function() {
            therms.innerHTML = (monthly(annualkwh) + " kWh");
            dollars.innerHTML = "$" + monthlyCostSavings(annualkwh, price);
        });

        $("#weeklyButton").click(function() {
            therms.innerHTML = weekly(annualkwh) + " kWh";
            dollars.innerHTML = "$" + weeklyCostSavings(annualkwh);
        });

        $("#yearlyButton").click(function() {
            therms.innerHTML = annualkwh + " kWh";
            dollars.innerHTML = "$" + yearlyCostSavings(annualkwh, price);
        });
      }


/*******************************************************************************
* Equivalents
*
* Handles equivalents management
______________________________________________________________________________*/

      // Equivalents processed in annual terms, so we need therms per year
      // var annualTherms = yearly(monthlyEnergySavings(numberInHouse, price)); – NOW CALCULATING ANNUAL THERMS FROM NUMBER OF PEOPLE IN HOUSE ^^

      // If it's an electric system, need to convert kWh to therms first just for math's sake
      if (gasBool == false) {
        annualTherms = annualkwh / 29.3001111;
      }

      // Calculate and show equivalent values
      document.getElementById("returnedGasValue").innerHTML = gasCalc(annualTherms) + " gallons of gas";
      document.getElementById("returnedTreesValue").innerHTML = treesCalc(annualTherms) + " trees";
      document.getElementById("returnedCoalValue").innerHTML = coalCalc(annualTherms) + " lbs of coal";

  });

});

/******************************************************************************/

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
function monthly(annualTherms) {
  return (annualTherms / 12.0).toFixed(2);
}

// Returns monthly cost savings
function monthlyCostSavings(annualTherms, price) {
  monthlyTherms = annualTherms / 12.0;
  return (Math.round((monthlyTherms * price) * 100) / 100).toFixed(2);
}

function weekly(annualTherms) {
  return (annualTherms / 52.0 * 100 / 100).toFixed(2);
}

function weeklyCostSavings(annualTherms) {
  weeklyTherms = annualTherms / 52.0;
  return (Math.round((weeklyTherms * price) * 100) / 100).toFixed(2);
}

function yearly(annualVal) {
  return (monthlyVal * 12 * 100 / 100).toFixed(2);
}

function yearlyCostSavings(annualTherms, price) {
  return (Math.round((annualTherms * price) * 100) / 100).toFixed(2);
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
