(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let ampm;
            if (hours >= 12) {
                ampm = 'pm';
            }
            else {
                ampm = 'am';
            }
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            seconds = seconds < 10 ? '0'+seconds : seconds;
            c.innerHTML = hours + ":" + minutes + ":" + seconds + " " + ampm;
            
        };
        
    });
    
    // forms
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        
        let eesnimi = document.getElementById("fname").value;
        let perenimi = document.getElementById("lname").value;
        
        let radio_1 = document.getElementById("r1").checked;
        let radio_2 = document.getElementById("r2").checked;
        let radio_3 = document.getElementById("r3").checked;
        let radio_4 = document.getElementById("r4").checked;

        function tekstiväljad() {
            if (eesnimi.length > 0 && perenimi.length > 0) {
                if (/^[- A-Za-zÄ-žä-ž]+$/.test(eesnimi) || /^[- A-Za-zÄ-žä-ž]+$/.test(perenimi)) {
                    if (radio_1 || radio_2 || radio_3 || radio_4) {
                        e.innerHTML = lõphind + " &euro;";
                    }
                    else {
                        alert("Üks tarneviisidest peab olema valitud");
                    }
                }
                else {
                    alert("Eesnimi ja perenimi ei tohi sisalda numbreid ja sümboleid");
                }
            }
            else {
                alert('Tekstiväljad ei tohi olla tühjad');
            }
        }
        

        let linn = document.getElementById("linn");
        let checkbox_1 = document.getElementById("v1").checked;
        let checkbox_2 = document.getElementById("v2").checked;
        let lõphind = 0;

        if (checkbox_1) {
            lõphind += 5;
        }
        if (checkbox_2) {
            lõphind += 1;
        }

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            linn.focus();
            
        } else if (linn.value === "tln") {
            lõphind += 0;
            tekstiväljad();
            
        } else if (linn.value === "trt") {
            lõphind += 2.50;
            tekstiväljad();
        } else if (linn.value === "nrv") {
            lõphind += 2.50;
            tekstiväljad();
        } else if (linn.value === "prn") {
            lõphind += 3;
            tekstiväljad();
        }
        
        else {
            
            e.innerHTML = "x,xx &euro;";
            
        }
    
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let tü = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let ük = new Microsoft.Maps.Location(
        59.42233561327668,
        24.79384432729135
    );
    let centerPoint = new Microsoft.Maps.Location(
        58.85988143306467,
        25.724297533038676
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(tü, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let pushpin_tallinn = new Microsoft.Maps.Pushpin(ük, {
        title: 'Ülemiste keskus',
            //subTitle: 'Hea koht',
            //text: 'UT'
    });

    map.entities.push(pushpin);
    map.entities.push(pushpin_tallinn);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

