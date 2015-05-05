<?php require('templates/header.php'); ?>

        <div id = "dialogoverlay"></div>
        <div id = "dialogbox">
            <div id = "dialogboxhead"></div>
            <div id = "dialogboxbody">
                <p>The SHOP Savings Calculator uses three inputs – 1. People in the
                home, 2. Community and 3. Whether your water heater uses
                electricity or gas – to determine a savings estimate personal to
                you.</p><p>
                <strong>Why do we need the number of people in your home?</strong></p><p>
                Our calculator assumes that each person uses between 12 and 20 gallons of water each day
                As the number of people in your residence increases, our calculator assumes you'll be using
                more hot water, which translates to higher savings.</p><p>
                <strong>Why do we need your community?</strong></p><p>
                These five communities listed are serviced by three different gas companies.
                Each of these companies offers different prices from month to
                month, and our calculator accounts for those price differences.</p><p>
                <strong>Why do we need your water heater type?</strong></p><p>
                Electricity savings are calculated in kilowatt-hours (kWh), whereas
                gas savings are calculated in therms (th). These units demand
                slightly different calculations to determine price and equivalent savings.</p><p>
                <strong>A Final Note</strong></p><p>
                US Solar Network does not guarantee that the returns estimated by
                this calculator will match real-world returns.</p>
            </div>
            <div id = "dialogboxfoot">
                <button id = "OkButton" style = "cursor:pointer;">Ok</button>
            </div>
        </div>
        <div id = "title">
            <h1>US Solar Savings Calculator</h1>
        </div>
        <hr/>
        <div id = "formDiv">
            <h4>Answer three quick questions, and we'll estimate how much you'll save with US Solar Network.</h4>
            <form id = "questionForm">
                <div class = "question">
                    <h3>How many people live in your home?</h3>
                    <!--Takes keyboard input in form box-->
                    <input id = "numPeopleInput" type = "number">
                </div>
                <div class = "question">
                    <h3>Pick your community.</h3>
                    <!--Community dropdown goes here-->
                    <label>
                        <select id = "selCommunity">
                                <option value = "Select a Community">Select a Community</option>
                                <option value = "Evanston">Evanston</option>
                                <option value = "Wilmette">Wilmette</option>
                                <option value = "Skokie">Skokie</option>
                                <option value = "Highland Park">Highland Park</option>
                                <option value = "City of Chicago">City of Chicago</option>
                        </select>
                    </label>
                </div>
                <div class = "question">
                  <h3>Does your water heater use gas or electricity?</h3>
                  <!--Button select-->
                    <div class = "bigButton" id = "gasButton"><p>Gas</p></div>
                    <div class = "bigButton" id = "electricityButton"><p>Electricity</p></div>
                </div>
            </form>
            <input class="submitButton" id = "formSubmit" type="submit" value="Submit!">
        </div>
            <!--Div returned on form submission-->
            <div id="answerDiv">
                <p id = "mainTopLine">Your Savings</p>
                <div id = "timeButtons">
                  <div class = "littleButton" class = "timeButton" id = "weeklyButton"><p>Weekly</p></div>
                  <div class = "littleButton" class = "timeButton" id = "monthlyButton"><p>Monthly</p></div>
                  <div class = "littleButton" class = "timeButton" id = "yearlyButton"><p>Yearly</p></div>
                </div>
                <!--Returned value-->
                <div class = "main">
                    <div class = "mainReturn" id = "therms">
                        <p class = "identifier">Energy</p>
                        <div class = "valueReturn" id = "thermsReturn"></div>
                    </div>
                    <span class = "mobile-break"><br/></span>
                    <div class = "mainReturn" id = "dollars">
                        <p class = "identifier" style = "text-align: center;">Money</p>
                        <div class = "valueReturn" id = "dollarsReturn"></div>
                    </div>
                </div>
                <br/>
                <div class = "scrollDown">
                    <i class="fa fa-arrow-circle-o-down fa-4x"></i>
                </div>
                <br/>
                <!--Equivalents-->
                <div id = "equivalents">
                    <div class = "equiv" id = "coal">
                        <i class = "fa fa-cloud fa-5x"></i>
                        <p class = "equivText">You'll save about</p>
                        <p class = "returnedEquivValue" id = "returnedCoalValue"></p>
                        <p class = "equivText">every year.</p>
                    </div>
                    <div class = "equiv" id = "trees">
                        <i class = "fa fa-tree fa-5x"></i>
                        <p class = "equivText">You'll sequester about</p>
                        <p class = "returnedEquivValue" id = "returnedTreesValue"></p>
                        <p class = "equivText">worth of carbon every year.</p>
                    </div>
                    <div class = "equiv" id = "gas">
                        <i class = "fa fa-car fa-5x"></i>
                        <p class = "equivText">Or you'll save about</p>
                        <p class = "returnedEquivValue" id = "returnedGasValue"></p>
                        <p class = "equivText">every year.</p>
                    </div>
                </div>
                <br/>
                <div class = "scrollDown">
                    <i class="fa fa-arrow-circle-o-down fa-4x"></i>
                </div>
                <br/>
                <div id = "gauge">
                    <p id = "gaugeInfo">As of this week, we've put panels on <strong><span id="currentHomes">71</span> homes</strong>. Help us make it <strong><span id="plusUser">91</span></strong> today by joining SHOP with 19 of your neighbors.</p>
                    <div id = "gaugeChartDiv" style = "margin-left: auto; margin-right: auto;"></div>
                    <a href = "http://ussolarnetwork.com/contact/" target = "_blank"><div class = "end_btn" id = "contactUsButton">Contact Us</div></a>
                </div>
                <br/>
                <div class = "end_btn" id = "recalculate" onclick = "location.reload(true)">Recalculate</div>
            </div>
        <!-- <img id = "shopLogo" alt = "Solar H20 Community Program" src="images/ussolarlogo.jpg">
        <img id = "USSolarLogo" alt = "US Solar Network" src="images/ussnLogo.jpg"> -->
        <!-- <div id = "footer">
            <p id = "disclaimer">Note: This calculator provides savings estimates
              based on assumptions that may vary from user to user. US Solar
              Network does not guarantee that real-world returns will match the
              values calculated here.</p>
        </div> -->

<?php require('templates/footer.php'); ?>
