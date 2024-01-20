$(document).ready(function () {
    //initialize clipboard
    new Clipboard('.shareBtn');
    //initialize page, 
    reroll(false);
    
    //refresh div onClick, ignores the URL params
    $('.reroll').click(function() {
        reroll(true);
    });
   
   //RNG
    function randInc(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
   //reroll fucntion
    function reroll(ignoreURL) {
        //gets the JSON data
        $.getJSON("data/chargen.json", function(data) {
            var invalidParams = false;
            var char = new Array();
            var cats = [ "genders", "races", "weapons", "pants", "shirts", "shoes", "hair", "face", "scar", "personality", "family", "combatPref", "goal", "flaw"];
            var randArr = new Array();
            var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
            
            //checks to see if there are params present
            var rawSearch = window.location.search;
            if (rawSearch.length !== 0 && !ignoreURL) {
                var search = window.location.search.split("=")[1].split(",");
                //if the params are not valid, ignore and reroll
                if (search.length !== cats.length) {
                    reroll(true);
                    invalidParams = true;
                }
                //otherwise, run with the numbers given
                else {
                    for (var i = 0; i < cats.length; i++) {
                        var kvp = new Array();
                        var j = data[cats[i]];
                        var l = j.length - 1;
                        var set = search[i];
                        randArr[i] = set;
                        char[cats[i]] = j[set];
                    }
                }
            }
            //otehrwise generate it
            else {
                for (var i = 0; i < cats.length; i++) {
                    var j = data[cats[i]];
                    var l = j.length - 1;
                    var rand = randInc(0, l);
                    randArr[i] = rand;
                    char[cats[i]] = j[rand];
                }
            }
            //if the params were valid, display
            if (!invalidParams) {
                var s = '...<span class="' + cats[0] + '">' + char[cats[0]] + '</span> <span class="' + cats[1] + '">' + char[cats[1]] + '</span> clad in ' + 
                    '<span class="' + cats[4] + '">' + char[cats[4]] + '</span>, <span class="' + cats[3] + '">' + char[cats[3]] + 
                    '</span>, and <span class="' + cats[5] +  '">' + char[cats[5]] + '</span>. They have a distinct physical characteristic of <span class="' + cats[8] + '">' + 
                    char[cats[8]] + '</span>. Their <span class="' + cats[7] + '">' + char[cats[7]] + '</span> complemented by their <span class="' + cats[6] + '">' +
                    char[cats[6]] + '</span>. They wield <span class="' +
                    cats[2] + '">' + char[cats[2]] + '</span> in combat, but prefer <span class="' + cats[11] + '">' + char[cats[11]] + '</span>. <span class="' +
                    cats[10] + '">' + char[cats[10]] + '</span>. They generally have <span class="' + cats[9] + '">' + char[cats[9]] + '</span>. Their goal in life <span class="' +
                    cats[12] + '">' + char[cats[12]] + '</span>, while their biggest downfall <span class="' +
                    cats[13] + '">' + char[cats[13]] + '</span>.';
                $("#desc").html(s);
                var newURL = url + "?c=" +  randArr.join(",");
                $("#shareLink").val(newURL);
                window.history.pushState(false, false, newURL);
            }
        });
    }    
});