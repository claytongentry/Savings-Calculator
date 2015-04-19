$(document).ready(function() {
    function CustomAlert() {
        var dialogoverlay = document.getElementById("dialogoverlay");
        var dialogbox = document.getElementById("dialogbox");
        this.render = function() {
            var winH = window.innerHeight;
            var winW = window.innerWidth;
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = winH + "px";
            dialogbox.style.left = (winW/2) - (550/2) + "px";
            dialogbox.style.top = "100px";
            dialogbox.style.display = "block";
            document.getElementById("dialogboxhead").innerHTML = "How Does This Calculator Work?";
        }
        this.ok = function() {
            dialogbox.style.display = "none";
            dialogoverlay.style.display = "none";
        }
    }
    var Alert = new CustomAlert();
    document.getElementById("infoButton").onclick = function() {
        Alert.render();
    }
    document.getElementById("OkButton").onclick = function() {
        Alert.ok();
    }
});

var equiv_line = $("#equivalents").offset().top - $("#equivalents").parent().offset().top - $("#equivalents").parent().scrollTop() + 43;
var gauge_line = $("#gauge").offset().top - $("#gauge").parent().offset().top - $("#gauge").parent().scrollTop() + 43;
$(document).ready(function() {
    $("#firstScroll").click(function() {
        $("#answerDiv").animate(
        { scrollTop: equiv_line },
            {
                duration: 1500,
                easing: 'easeInOutQuad'
            }
        );
    });
    $("#secondScroll").click(function() {
        $("#answerDiv").animate (
        { scrollTop: gauge_line + 50},
            {
                duration: 1500,
                easing: 'easeInOutQuad'
            }
        )
    });
});
