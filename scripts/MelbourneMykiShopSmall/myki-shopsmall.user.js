// ==UserScript==
// @name         Amex Shop Small - MyKi Marker
// @namespace    http://ducn.co/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://maps.americanexpress.com/au*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var MAX_WAIT = 5;
    var EXCLUDES_SHOP = ['7-Eleven', 'Tram stop'];

    function waitFor(obj, func, waitCount) {
        if (typeof waitCount === 'undefined') {
            waitCount = 0;
        }
        var shouldWait = false;
        if (obj.indexOf('#') === 0) {
            shouldWait = document.getElementById(obj.slice(1)) === null;
        } else {
            shouldWait = typeof window[obj] === 'undefined';
        }
        if (shouldWait) {
            console.log("'" + obj + "' not found - wait " + waitCount);
            if (waitCount < MAX_WAIT) {
                setTimeout(waitFor.bind(this, obj, func, waitCount + 1), 1000);
            }
            return;
        }
        func();
    }

    if (window.top != window.self)  //don't run on frames or iframes
    {
        //Optional: GM_log ('In frame');
        return;
    }

    console.log("triggering grease script");
    waitFor("angularScope", 
        waitFor.bind(this, "#google-map", 
            function () { 
                // hack into the scope to get the map!!!
                execute(angularScope.map);
            }
        )
    );
    window.triggeredGreaseScript = true;

    function execute(map) {
        var regex = new RegExp('(?:^|)(' + EXCLUDES_SHOP.join('|') + ')(?:(?=[\\s,\\.]|\\n)|$)', 'ig');
        $.getScript("https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js").done(function() {
            mykiTopupLocation.sort(function(a, b) {
                return a.postcode - b.postcode;
            });

            var mykiMarkers = [];

            for (var i = 0; i < mykiTopupLocation.length; i++) {
                if (regex.test(mykiTopupLocation[i].name)) {
                    continue;
                }

                mykiTopupLocation[i].title = 
                    mykiTopupLocation[i].name + ", " +
                    mykiTopupLocation[i].address1 + ", " +
                    mykiTopupLocation[i].postcode + " " +
                    mykiTopupLocation[i].suburb;
                mykiMarkers.push(new google.maps.Marker(mykiTopupLocation[i]));
            }

            //mykiMarkers.splice(5, mykiMarkers.length - 5);
            var markerCluster = new MarkerClusterer(map, mykiMarkers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        });
    }
})();

var mykiTopupLocation = [
    {
        "id": "19933",
        "name": "Ivanhoe Station",
        "address1": "Young Street Norman Street",
        "address2": "",
        "postcode": 3079,
        "suburb": "Ivanhoe",
        "position": { "lat": -37.7689000, "lng": 145.0454300 }
    },
    {
        "id": "20344",
        "name": "South Geelong Station",
        "address1": "Yarra Street South ",
        "address2": "",
        "postcode": 3220,
        "suburb": "South Geelong",
        "position": { "lat": -38.1585000, "lng": 144.3590000 }
    },
    {
        "id": "19837",
        "name": "Darling Station",
        "address1": "Wynyeh Street 29 Clynden Avenue",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8689600, "lng": 145.0629500 }
    },
    {
        "id": "19841",
        "name": "Flagstaff Station",
        "address1": "William Street La Trobe Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8119800, "lng": 144.9556500 }
    },
    {
        "id": "19928",
        "name": "Westgarth Station",
        "address1": "Westgarth Street South Crescent",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7806200, "lng": 144.9992300 }
    },
    {
        "id": "19979",
        "name": "Jolimont Station",
        "address1": "Wellington Parade Powlett Street",
        "address2": "",
        "postcode": 3002,
        "suburb": "East Melbourne",
        "position": { "lat": -37.8165300, "lng": 144.9841000 }
    },
    {
        "id": "19979",
        "name": "Jolimont Station",
        "address1": "Wellington Crescent ",
        "address2": "",
        "postcode": 3002,
        "suburb": "East Melbourne",
        "position": { "lat": -37.8165300, "lng": 144.9841000 }
    },
    {
        "id": "19884",
        "name": "Narre Warren Station",
        "address1": "Webb Street ",
        "address2": "",
        "postcode": 3805,
        "suburb": "Narre Warren",
        "position": { "lat": -38.0266700, "lng": 145.3018900 }
    },
    {
        "id": "19917",
        "name": "Oakleigh Station",
        "address1": "Warrigal Road Haughton Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Oakleigh",
        "position": { "lat": -37.9003700, "lng": 145.0883100 }
    },
    {
        "id": "19839",
        "name": "Holmesglen Station",
        "address1": "Warrigal Road ",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8744000, "lng": 145.0906600 }
    },
    {
        "id": "19902",
        "name": "Ringwood Station",
        "address1": "Wantirna Road Station Street",
        "address2": "",
        "postcode": 3134,
        "suburb": "Ringwood",
        "position": { "lat": -37.8158900, "lng": 145.2289700 }
    },
    {
        "id": "19852",
        "name": "Riversdale Station",
        "address1": "Wandin Road ",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8315000, "lng": 145.0696500 }
    },
    {
        "id": "19948",
        "name": "Sandringham Station",
        "address1": "Waltham Street Station Street",
        "address2": "",
        "postcode": 3191,
        "suburb": "Sandringham",
        "position": { "lat": -37.9503300, "lng": 145.0045700 }
    },
    {
        "id": "19965",
        "name": "Coburg Station",
        "address1": "Victoria Street Waterfield Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7423400, "lng": 144.9633400 }
    },
    {
        "id": "20024",
        "name": "Middle Footscray Station",
        "address1": "Victoria Street Buckley Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8025000, "lng": 144.8914700 }
    },
    {
        "id": "19977",
        "name": "North Richmond Station",
        "address1": "Victoria Street 12 Regent Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8104000, "lng": 144.9925000 }
    },
    {
        "id": "31030",
        "name": "Tram stop",
        "address1": "Victoria Pde and Brunswick St, Vincents Plaza ",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8082200, "lng": 144.9763400 }
    },
    {
        "id": "31031",
        "name": "Tram stop",
        "address1": "Victoria Pde and Brunswick St, Vincents Plaza ",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8081500, "lng": 144.9763500 }
    },
    {
        "id": "31032",
        "name": "Tram stop",
        "address1": "Victoria Pde and Brunswick St, Vincents Plaza ",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8083300, "lng": 144.9763500 }
    },
    {
        "id": "47493",
        "name": "Tram Stop",
        "address1": "Victoria Harbour Docklands Collins and Bourke Streets",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8207500, "lng": 144.9418300 }
    },
    {
        "id": "19968",
        "name": "Brunswick Station",
        "address1": "Victoria Grove Prentice Street",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7677200, "lng": 144.9595900 }
    },
    {
        "id": "19969",
        "name": "Jewell Station",
        "address1": "Union Street Watson Street",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7749800, "lng": 144.9587200 }
    },
    {
        "id": "19895",
        "name": "Surrey Hills Station",
        "address1": "Union Road Bedford Avenue",
        "address2": "",
        "postcode": 3127,
        "suburb": "Surrey Hills",
        "position": { "lat": -37.8241400, "lng": 145.0987800 }
    },
    {
        "id": "19850",
        "name": "Hartwell Station",
        "address1": "Tyrone Street Georgina Pde",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8439800, "lng": 145.0755600 }
    },
    {
        "id": "20016",
        "name": "Northcote Station",
        "address1": "Turnbull Grove Herbert Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7698700, "lng": 144.9952800 }
    },
    {
        "id": "19872",
        "name": "Highett Station",
        "address1": "Train Street Railway Pde",
        "address2": "",
        "postcode": 3190,
        "suburb": "Highett",
        "position": { "lat": -37.9484300, "lng": 145.0418700 }
    },
    {
        "id": "19911",
        "name": "Tooronga Station",
        "address1": "Tooronga Road Milton Pde",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8493700, "lng": 145.0417300 }
    },
    {
        "id": "6049",
        "name": "Tooronga Rail Kiosk",
        "address1": "Tooronga Railway Station, Milton Parade ",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8494400, "lng": 145.0416900 }
    },
    {
        "id": "19959",
        "name": "South Yarra Station",
        "address1": "Toorak Road 1 Yarra Street",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8384500, "lng": 144.9923400 }
    },
    {
        "id": "19878",
        "name": "Croydon Station",
        "address1": "Toorak Avenue Wicklow Avenue",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon",
        "position": { "lat": -37.7954400, "lng": 145.2805900 }
    },
    {
        "id": "19887",
        "name": "Merinda Park Station",
        "address1": "Thompsons Road ",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne North",
        "position": { "lat": -38.0790000, "lng": 145.2635100 }
    },
    {
        "id": "19860",
        "name": "Chelsea Station",
        "address1": "The Strand Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Chelsea",
        "position": { "lat": -38.0519600, "lng": 145.1160400 }
    },
    {
        "id": "0373",
        "name": "Melbourne Airport",
        "address1": "Terminals 2, 3 and 4 Centre Road",
        "address2": "",
        "postcode": 3043,
        "suburb": "Tullamarine",
        "position": { "lat": -37.6685500, "lng": 144.8409800 }
    },
    {
        "id": "1214",
        "name": "7-Eleven Chevron",
        "address1": "Tenancy 12, Building 1, 519-539 St Kilda Road",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8452700, "lng": 144.9793500 }
    },
    {
        "id": "19962",
        "name": "Fawkner Station",
        "address1": "Sydney Road ",
        "address2": "",
        "postcode": 3060,
        "suburb": "Fawkner",
        "position": { "lat": -37.7146200, "lng": 144.9605500 }
    },
    {
        "id": "20000",
        "name": "Watergardens Station",
        "address1": "Sydenham Road ",
        "address2": "",
        "postcode": 3037,
        "suburb": "Sydenham",
        "position": { "lat": -37.7011300, "lng": 144.7741900 }
    },
    {
        "id": "19854",
        "name": "Flinders Street Station",
        "address1": "Swanston Street Flinders Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8183100, "lng": 144.9669700 }
    },
    {
        "id": "31023",
        "name": "Tram stop",
        "address1": "Swanston Street and Melbourne University ",
        "address2": "",
        "postcode": 3010,
        "suburb": "University Of Melbourne",
        "position": { "lat": -37.7990300, "lng": 144.9642100 }
    },
    {
        "id": "31028",
        "name": "Tram stop",
        "address1": "Swanston St, Federation Square ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8182700, "lng": 144.9678900 }
    },
    {
        "id": "19492",
        "name": "Tram Stop",
        "address1": "Swanston and Queensberry Streets ",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8056300, "lng": 144.9631100 }
    },
    {
        "id": "19693",
        "name": "Tram Stop",
        "address1": "Swanston and Queensberry Streets ",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8051400, "lng": 144.9631100 }
    },
    {
        "id": "6476",
        "name": "MU Convenience Store",
        "address1": "Suite G36, Building 10 Ground Floor Campus Centre, Monash University",
        "address2": "",
        "postcode": 3800,
        "suburb": "Clayton",
        "position": { "lat": -37.9115000, "lng": 145.1330700 }
    },
    {
        "id": "47641",
        "name": "Waurn Ponds Station",
        "address1": "Sugargum Drive Near Oakwood Crescent",
        "address2": "",
        "postcode": 3216,
        "suburb": "Waurn Ponds",
        "position": { "lat": -38.2158500, "lng": 144.3060800 }
    },
    {
        "id": "19935",
        "name": "Heidelberg Station",
        "address1": "Studley Road ",
        "address2": "",
        "postcode": 3084,
        "suburb": "Heidelberg",
        "position": { "lat": -37.7570800, "lng": 145.0606900 }
    },
    {
        "id": "19890",
        "name": "Noble Park Station",
        "address1": "Stuart Street Douglas Street",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9672400, "lng": 145.1769400 }
    },
    {
        "id": "19827",
        "name": "Stony Point Station",
        "address1": "Stony Point Road ",
        "address2": "",
        "postcode": 3919,
        "suburb": "Crib Point",
        "position": { "lat": -38.3742400, "lng": 145.2218400 }
    },
    {
        "id": "6640",
        "name": "Nextra Wendouree Village Newsagency and Post Office",
        "address1": "Stockland Shopping Centre Shop T75 Gillies Street",
        "address2": "",
        "postcode": 3355,
        "suburb": "Wendouree",
        "position": { "lat": -37.5343400, "lng": 143.8246400 }
    },
    {
        "id": "19864",
        "name": "Parkdale Station",
        "address1": "Stewart Avenue Como Pde",
        "address2": "",
        "postcode": 3194,
        "suburb": "Parkdale",
        "position": { "lat": -37.9930800, "lng": 145.0763300 }
    },
    {
        "id": "19875",
        "name": "Mount Waverley Station",
        "address1": "Stephensons Road Miller Cres",
        "address2": "",
        "postcode": 3149,
        "suburb": "Mount Waverley",
        "position": { "lat": -37.8752900, "lng": 145.1267100 }
    },
    {
        "id": "19980",
        "name": "Melton Station",
        "address1": "Staughton Street ",
        "address2": "",
        "postcode": 3338,
        "suburb": "Melton",
        "position": { "lat": -37.7031800, "lng": 144.5720100 }
    },
    {
        "id": "20317",
        "name": "Kangaroo Flat Station",
        "address1": "Station Street Short Street",
        "address2": "",
        "postcode": 3555,
        "suburb": "Kangaroo Flat",
        "position": { "lat": -36.7953500, "lng": 144.2488000 }
    },
    {
        "id": "19898",
        "name": "Blackburn Station",
        "address1": "Station Street Railway Road",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn",
        "position": { "lat": -37.8200700, "lng": 145.1500100 }
    },
    {
        "id": "19857",
        "name": "Seaford Station",
        "address1": "Station Street Railway Pde",
        "address2": "",
        "postcode": 3198,
        "suburb": "Seaford",
        "position": { "lat": -38.1040200, "lng": 145.1282300 }
    },
    {
        "id": "20333",
        "name": "Nar Nar Goon Station",
        "address1": "Station Street Off Main Street, Nar Nar Good Road",
        "address2": "",
        "postcode": 3812,
        "suburb": "Nar Nar Goon",
        "position": { "lat": -38.0814700, "lng": 145.5712700 }
    },
    {
        "id": "19943",
        "name": "Caulfield Station",
        "address1": "Station Street Normanby Avenue",
        "address2": "",
        "postcode": 3145,
        "suburb": "Caulfield East",
        "position": { "lat": -37.8774600, "lng": 145.0425200 }
    },
    {
        "id": "20335",
        "name": "North Shore Station",
        "address1": "Station Street near North Shore Road",
        "address2": "",
        "postcode": 3214,
        "suburb": "North Shore",
        "position": { "lat": -38.0973700, "lng": 144.3656300 }
    },
    {
        "id": "47642",
        "name": "Epsom Station",
        "address1": "Station Street Howard Street",
        "address2": "",
        "postcode": 3551,
        "suburb": "Epsom",
        "position": { "lat": -36.7062900, "lng": 144.3210000 }
    },
    {
        "id": "20042",
        "name": "Box Hill Station",
        "address1": "Station Street Bank Street",
        "address2": "",
        "postcode": 3128,
        "suburb": "Box Hill",
        "position": { "lat": -37.8192200, "lng": 145.1214300 }
    },
    {
        "id": "19881",
        "name": "Officer Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3809,
        "suburb": "Officer",
        "position": { "lat": -38.0664400, "lng": 145.4120100 }
    },
    {
        "id": "19886",
        "name": "Cranbourne Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne",
        "position": { "lat": -38.0995400, "lng": 145.2806000 }
    },
    {
        "id": "22224",
        "name": "Seaholme Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3018,
        "suburb": "Seaholme",
        "position": { "lat": -37.8678100, "lng": 144.8412800 }
    },
    {
        "id": "19988",
        "name": "Diamond Creek Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3089,
        "suburb": "Diamond Creek",
        "position": { "lat": -37.6732900, "lng": 145.1585100 }
    },
    {
        "id": "20290",
        "name": "Bacchus Marsh Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3340,
        "suburb": "Bacchus Marsh",
        "position": { "lat": -37.6874700, "lng": 144.4359000 }
    },
    {
        "id": "20303",
        "name": "Clarkefield Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3430,
        "suburb": "Clarkefield",
        "position": { "lat": -37.4835300, "lng": 144.7457200 }
    },
    {
        "id": "20354",
        "name": "Wallan Station",
        "address1": "Station Street ",
        "address2": "",
        "postcode": 3756,
        "suburb": "Wallan",
        "position": { "lat": -37.4165400, "lng": 145.0065900 }
    },
    {
        "id": "19982",
        "name": "Deer Park Station",
        "address1": "Station Road Railway Pde",
        "address2": "",
        "postcode": 3023,
        "suburb": "Deer Park",
        "position": { "lat": -37.7777600, "lng": 144.7723100 }
    },
    {
        "id": "19986",
        "name": "Montmorency Station",
        "address1": "Station Road ",
        "address2": "",
        "postcode": 3094,
        "suburb": "Montmorency",
        "position": { "lat": -37.7153000, "lng": 145.1215100 }
    },
    {
        "id": "40537",
        "name": "Gisborne Station",
        "address1": "Station Road ",
        "address2": "",
        "postcode": 3437,
        "suburb": "Gisborne",
        "position": { "lat": -37.4591200, "lng": 144.5993600 }
    },
    {
        "id": "19879",
        "name": "Ringwood East Station",
        "address1": "Stanley Avenue Railway Avenue",
        "address2": "",
        "postcode": 3135,
        "suburb": "Ringwood East",
        "position": { "lat": -37.8119700, "lng": 145.2501900 }
    },
    {
        "id": "6744",
        "name": "The South Melbourne Market Grocer",
        "address1": "Stall 43 and 44, 322-326 Coventry Street",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8327000, "lng": 144.9568800 }
    },
    {
        "id": "6624",
        "name": "Mill Park Newsagency",
        "address1": "Stables Shopping Centre, Shop 1-4 Childs Road",
        "address2": "",
        "postcode": 3082,
        "suburb": "Mill Park",
        "position": { "lat": -37.6671300, "lng": 145.0610300 }
    },
    {
        "id": "19563",
        "name": "Tram Stop",
        "address1": "St Kilda Road and High Street ",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8498700, "lng": 144.9805600 }
    },
    {
        "id": "19561",
        "name": "Tram Stop",
        "address1": "St Kilda and Commercial Roads ",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8450300, "lng": 144.9787200 }
    },
    {
        "id": "19573",
        "name": "Tram Stop",
        "address1": "St Kilda and Commercial Roads ",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8445200, "lng": 144.9786300 }
    },
    {
        "id": "20004",
        "name": "Albion Station",
        "address1": "St Albans Road ",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine North",
        "position": { "lat": -37.7776600, "lng": 144.8247100 }
    },
    {
        "id": "20003",
        "name": "Ginifer Station",
        "address1": "St Albans Road ",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine North",
        "position": { "lat": -37.7575100, "lng": 144.8095700 }
    },
    {
        "id": "19899",
        "name": "Nunawading Station",
        "address1": "Springvale Road Oval Way",
        "address2": "",
        "postcode": 3131,
        "suburb": "Nunawading",
        "position": { "lat": -37.8203000, "lng": 145.1770800 }
    },
    {
        "id": "19913",
        "name": "Springvale Station",
        "address1": "Springvale Road Lightwood Road",
        "address2": "",
        "postcode": 3171,
        "suburb": "Springvale",
        "position": { "lat": -37.9495100, "lng": 145.1534500 }
    },
    {
        "id": "19843",
        "name": "Parliament Station",
        "address1": "Spring Street ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8110600, "lng": 144.9729100 }
    },
    {
        "id": "6777",
        "name": "RMIT Campus Store, RMIT Bundoora West",
        "address1": "Sport Centre, Building 203 Plenty Road",
        "address2": "",
        "postcode": 3083,
        "suburb": "Bundoora",
        "position": { "lat": -37.6800100, "lng": 145.0617800 }
    },
    {
        "id": "31026",
        "name": "Tram stop",
        "address1": "Spencer and Collins Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8184400, "lng": 144.9539100 }
    },
    {
        "id": "31027",
        "name": "Tram stop",
        "address1": "Spencer and Collins Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8184900, "lng": 144.9538000 }
    },
    {
        "id": "31024",
        "name": "Tram stop",
        "address1": "Spencer and Bourke Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8168100, "lng": 144.9540600 }
    },
    {
        "id": "31025",
        "name": "Tram stop",
        "address1": "Spencer and Bourke Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8169400, "lng": 144.9539600 }
    },
    {
        "id": "20351",
        "name": "Traralgon Station",
        "address1": "Southside Entrance Princes Highway",
        "address2": "",
        "postcode": 3844,
        "suburb": "Traralgon",
        "position": { "lat": -38.1982100, "lng": 146.5397200 }
    },
    {
        "id": "6007",
        "name": "Southgate News and Lotto",
        "address1": "Southgate Avenue ",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8202100, "lng": 144.9649700 }
    },
    {
        "id": "30000",
        "name": "PTV Hub",
        "address1": "Southern Cross Station ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8183700, "lng": 144.9532300 }
    },
    {
        "id": "19937",
        "name": "Moorabbin Station",
        "address1": "South Road Station Street",
        "address2": "",
        "postcode": 3189,
        "suburb": "Moorabbin",
        "position": { "lat": -37.9343500, "lng": 145.0367400 }
    },
    {
        "id": "19882",
        "name": "Beaconsfield Station",
        "address1": "Soldiers Road Kenilworth Avenue",
        "address2": "",
        "postcode": 3807,
        "suburb": "Beaconsfield",
        "position": { "lat": -38.0508300, "lng": 145.3660700 }
    },
    {
        "id": "20033",
        "name": "Oak Park Station",
        "address1": "Snell Grove 138 Waterloo Road",
        "address2": "",
        "postcode": 3046,
        "suburb": "Oak Park",
        "position": { "lat": -37.7179500, "lng": 144.9215200 }
    },
    {
        "id": "20325",
        "name": "Macedon Station",
        "address1": "Smith Street near Victoria Street",
        "address2": "",
        "postcode": 3440,
        "suburb": "Macedon",
        "position": { "lat": -37.4225400, "lng": 144.5609800 }
    },
    {
        "id": "19861",
        "name": "Edithvale Station",
        "address1": "Sinclair Avenue 261 Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Edithvale",
        "position": { "lat": -38.0380500, "lng": 145.1085400 }
    },
    {
        "id": "19934",
        "name": "Eaglemont Station",
        "address1": "Silverdale Road ",
        "address2": "",
        "postcode": 3084,
        "suburb": "Eaglemont",
        "position": { "lat": -37.7635900, "lng": 145.0539500 }
    },
    {
        "id": "6099",
        "name": "Brimbank Central Newsagency",
        "address1": "Shop T85 Brimbank Central Shoppng Centre, 2 Neale Road",
        "address2": "",
        "postcode": 3023,
        "suburb": "Deer Park",
        "position": { "lat": -37.7509100, "lng": 144.7754400 }
    },
    {
        "id": "6757",
        "name": "Moonee Ponds Central Lotto and News",
        "address1": "Shop T16, 20 Homer Street",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7651000, "lng": 144.9223000 }
    },
    {
        "id": "6168",
        "name": "Sunshine Plaza News and Lotto",
        "address1": "Shop T11, Sunshine Plaza, 324-328 Hampshire Road",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine",
        "position": { "lat": -37.7822000, "lng": 144.8328700 }
    },
    {
        "id": "6352",
        "name": "Bourke Place News",
        "address1": "Shop LG 13, 600 Bourke Place",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8158700, "lng": 144.9560100 }
    },
    {
        "id": "6340",
        "name": "Eastland Newsagency",
        "address1": "Shop L12-13 Eastland Shopping Centre, 171 Maroondah Highway",
        "address2": "",
        "postcode": 3134,
        "suburb": "Ringwood",
        "position": { "lat": -37.8136800, "lng": 145.2289000 }
    },
    {
        "id": "6406",
        "name": "Northland Lotto",
        "address1": "Shop KK21 Northland Shopping Centre, 2-50 Murray Road",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7387200, "lng": 145.0296300 }
    },
    {
        "id": "6778",
        "name": "Broadmeadows Lucky Lotto",
        "address1": "Shop K16, Broadmeadows Shopping Centre 1099-1069 Pascoe Vale Road",
        "address2": "",
        "postcode": 3047,
        "suburb": "Broadmeadows",
        "position": { "lat": -37.6790000, "lng": 144.9208500 }
    },
    {
        "id": "6106",
        "name": "Fountain Gate Newsagency",
        "address1": "Shop K103A, Level 1 Westfield Shoppingtown, Magid Drive",
        "address2": "",
        "postcode": 3805,
        "suburb": "Fountain Gate",
        "position": { "lat": -38.0194600, "lng": 145.3045800 }
    },
    {
        "id": "6693",
        "name": "Doncaster Newspower and TSG",
        "address1": "Shop G210, Westfield Doncaster 619 Doncaster Road",
        "address2": "",
        "postcode": 3108,
        "suburb": "Doncaster",
        "position": { "lat": -37.7852900, "lng": 145.1262900 }
    },
    {
        "id": "6344",
        "name": "Lee Pharmacy",
        "address1": "Shop G13A, 46-58 Buckingham Avenue",
        "address2": "",
        "postcode": 3171,
        "suburb": "Springvale",
        "position": { "lat": -37.9509000, "lng": 145.1510600 }
    },
    {
        "id": "6152",
        "name": "Greenvale Village Pharmacy",
        "address1": "Shop G11 Greenvale Village Shopping Centre, 1-11 Mickleham Road",
        "address2": "",
        "postcode": 3059,
        "suburb": "Greenvale",
        "position": { "lat": -37.6393100, "lng": 144.8823100 }
    },
    {
        "id": "1204",
        "name": "7-Eleven Eureka Tower",
        "address1": "Shop G1 Eureka Tower, 70 City Road",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8222400, "lng": 144.9647100 }
    },
    {
        "id": "6445",
        "name": "Burwood One Lotto and Tobacco Station",
        "address1": "Shop G 37A, Burwood One Burwood Highway",
        "address2": "",
        "postcode": 3151,
        "suburb": "Burwood East",
        "position": { "lat": -37.8536100, "lng": 145.1497400 }
    },
    {
        "id": "6039",
        "name": "Northland Newsagency and Tattslotto",
        "address1": "Shop C13 Northland Shopping Centre, Murray Road",
        "address2": "",
        "postcode": 3082,
        "suburb": "Preston East",
        "position": { "lat": -37.7403800, "lng": 145.0300800 }
    },
    {
        "id": "1211",
        "name": "7-Eleven Southern Cross Station",
        "address1": "Shop B2, Tenancy 4B, 99 Spencer Street",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8166200, "lng": 144.9526800 }
    },
    {
        "id": "6388",
        "name": "Lotto Off Collins",
        "address1": "Shop A and B, 120 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8140300, "lng": 144.9688300 }
    },
    {
        "id": "6444",
        "name": "Mountain Gate Newsagency",
        "address1": "Shop 9B Mountain Gate Shopping Centre, Ferntree Gully Road",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.8838100, "lng": 145.2770500 }
    },
    {
        "id": "6606",
        "name": "City West Newsagency",
        "address1": "Shop 9, 600 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8186100, "lng": 144.9549900 }
    },
    {
        "id": "6417",
        "name": "Target Lotto",
        "address1": "Shop 9, 50 Old Geelong Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8809000, "lng": 144.7036800 }
    },
    {
        "id": "6663",
        "name": "Thrift Park Lotteries",
        "address1": "Shop 9, 171 Nepean Highway",
        "address2": "",
        "postcode": 3194,
        "suburb": "Mentone",
        "position": { "lat": -37.9835700, "lng": 145.0772200 }
    },
    {
        "id": "6780",
        "name": "Hogans Corner Pharmacy",
        "address1": "Shop 9 and 10, Hogans Corner S/C Corner Hogans and Derrimut Roads",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8616200, "lng": 144.6871600 }
    },
    {
        "id": "6372",
        "name": "Flinders Station Gifts",
        "address1": "Shop 8A Campbell Arcade, Degraves Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8178500, "lng": 144.9661400 }
    },
    {
        "id": "6729",
        "name": "Zouki RMRWH Convenience Store",
        "address1": "Shop 8 c/o Royal Melbourne Hospital 300 Grattan Street",
        "address2": "",
        "postcode": 3050,
        "suburb": "Parkville",
        "position": { "lat": -37.7994400, "lng": 144.9554900 }
    },
    {
        "id": "6376",
        "name": "Uptown Newsagent Collins Street",
        "address1": "Shop 7B, 161 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8151400, "lng": 144.9684200 }
    },
    {
        "id": "6665",
        "name": "The Lucky Charm Airport West News",
        "address1": "Shop 73/74, Westfield SC 29-35 Louis Street",
        "address2": "",
        "postcode": 3042,
        "suburb": "Airport West",
        "position": { "lat": -37.7142600, "lng": 144.8874500 }
    },
    {
        "id": "6583",
        "name": "Newsline Newsagency",
        "address1": "Shop 70, Centro Box Hill South 1 Main Street",
        "address2": "",
        "postcode": 3128,
        "suburb": "Box Hill",
        "position": { "lat": -37.8191200, "lng": 145.1218800 }
    },
    {
        "id": "6016",
        "name": "Huntingdale News and Tatts",
        "address1": "Shop 7 and 8, 292 Huntingdale Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Huntingdale",
        "position": { "lat": -37.9098700, "lng": 145.1040000 }
    },
    {
        "id": "823",
        "name": "7-Eleven La Trobe Street",
        "address1": "Shop 67, 211 La Trobe Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8103900, "lng": 144.9615900 }
    },
    {
        "id": "6620",
        "name": "Chirnside Lotto",
        "address1": "Shop 643, 239 Chirnside Park Shopping Centre Maroondah Highway",
        "address2": "",
        "postcode": 3116,
        "suburb": "Chirnside Park",
        "position": { "lat": -37.7575100, "lng": 145.3128300 }
    },
    {
        "id": "6359",
        "name": "Collins Place News and Lotto",
        "address1": "Shop 64 Collins Place, 45 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8142300, "lng": 144.9724100 }
    },
    {
        "id": "6441",
        "name": "Doncaster Pharmacy",
        "address1": "Shop 6, 958-978 Doncaster Road",
        "address2": "",
        "postcode": 3109,
        "suburb": "Doncaster East",
        "position": { "lat": -37.7892400, "lng": 145.1585900 }
    },
    {
        "id": "6381",
        "name": "IGA Victoria Harbour",
        "address1": "Shop 6, 800 Bourke Street",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8193600, "lng": 144.9447200 }
    },
    {
        "id": "1353",
        "name": "7Eleven Chapel Street",
        "address1": "Shop 6, 450-460 Chapel Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "South Yarra",
        "position": { "lat": -37.8437900, "lng": 144.9951900 }
    },
    {
        "id": "6069",
        "name": "Domain Authorised Newsagency",
        "address1": "Shop 6, 401 St Kilda Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8357800, "lng": 144.9757600 }
    },
    {
        "id": "6739",
        "name": "Wandong Pharmacy",
        "address1": "Shop 6, 3272 Epping Kilmore Road",
        "address2": "",
        "postcode": 3758,
        "suburb": "Wandong",
        "position": { "lat": -37.3587500, "lng": 145.0265600 }
    },
    {
        "id": "6110",
        "name": "West Heidelberg Lotto",
        "address1": "Shop 6 The Mall, Bell Street",
        "address2": "",
        "postcode": 3081,
        "suburb": "Heidelberg West",
        "position": { "lat": -37.7492300, "lng": 145.0426000 }
    },
    {
        "id": "6025",
        "name": "Newsplaza Newsagency",
        "address1": "Shop 6 Northcote Plaza Shopping Centre, 1 Separation Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7691700, "lng": 145.0002000 }
    },
    {
        "id": "6520",
        "name": "Tobacco Station Northcote",
        "address1": "Shop 6 Northcote Central, Corner High and Separation Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7691900, "lng": 144.9993700 }
    },
    {
        "id": "6184",
        "name": "Bayswater Newsagency",
        "address1": "Shop 6 Mountain High Shopping Centre, 3-11 High Street",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater",
        "position": { "lat": -37.8428600, "lng": 145.2668300 }
    },
    {
        "id": "6690",
        "name": "Corio Newsagency",
        "address1": "Shop 57, Corio Shopping Centre ",
        "address2": "",
        "postcode": 3214,
        "suburb": "Corio",
        "position": { "lat": -38.0750600, "lng": 144.3566500 }
    },
    {
        "id": "6774",
        "name": "CTC LZ Oakleigh",
        "address1": "Shop 54, Oakleigh Shopping Centre 39 Hanover Street",
        "address2": "",
        "postcode": 3166,
        "suburb": "Oakleigh",
        "position": { "lat": -37.9008900, "lng": 145.0904100 }
    },
    {
        "id": "6628",
        "name": "The Pines Post Office",
        "address1": "Shop 54, 181 Reynolds Road, The Pines Shopping Centre",
        "address2": "",
        "postcode": 3109,
        "suburb": "Doncaster East",
        "position": { "lat": -37.7617500, "lng": 145.1686900 }
    },
    {
        "id": "6273",
        "name": "Endeavour Hills Lotto and News",
        "address1": "Shop 53-54 Endeavour Hills Shopping Centre",
        "address2": "",
        "postcode": 3802,
        "suburb": "Endeavour Hills",
        "position": { "lat": -37.9767300, "lng": 145.2590900 }
    },
    {
        "id": "6616",
        "name": "Diamond Village Lotto and Cards",
        "address1": "Shop 5, 78 Nepean Street",
        "address2": "",
        "postcode": 3087,
        "suburb": "Watsonia",
        "position": { "lat": -37.7117900, "lng": 145.0933100 }
    },
    {
        "id": "6362",
        "name": "Flinders Lane Lotto",
        "address1": "Shop 5, 280 Flinders Lane",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8169100, "lng": 144.9646800 }
    },
    {
        "id": "6128",
        "name": "Sandringham Authorised Newsagency",
        "address1": "Shop 5, 18-34 Station Street",
        "address2": "",
        "postcode": 3191,
        "suburb": "Sandringham",
        "position": { "lat": -37.9493800, "lng": 145.0043000 }
    },
    {
        "id": "6260",
        "name": "La Trobe University Post Office",
        "address1": "Shop 5 The Agora, La Trobe University, Kingsbury Drive",
        "address2": "",
        "postcode": 3083,
        "suburb": "Bundoora",
        "position": { "lat": -37.7209800, "lng": 145.0489200 }
    },
    {
        "id": "1133",
        "name": "7-Eleven South Yarra",
        "address1": "Shop 5 South Yarra Railway Station, Toorak Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8389900, "lng": 144.9923400 }
    },
    {
        "id": "6554",
        "name": "Demarte&#039;s Amcal Chemist Lygon Court",
        "address1": "Shop 5 Lygon Court Shopping Centre, 380 Lygon Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.7980400, "lng": 144.9676700 }
    },
    {
        "id": "6486",
        "name": "NewsXpress Pt Cook",
        "address1": "Shop 433 Point Cook Town Centre, Main Street",
        "address2": "",
        "postcode": 3030,
        "suburb": "Point Cook",
        "position": { "lat": -37.8829400, "lng": 144.7356000 }
    },
    {
        "id": "6326",
        "name": "Waverley Gardens Newsagency",
        "address1": "Shop 42 Waverley Gardens Shopping Centre, Police Road",
        "address2": "",
        "postcode": 3170,
        "suburb": "Mulgrave",
        "position": { "lat": -37.9354200, "lng": 145.1889600 }
    },
    {
        "id": "6516",
        "name": "Malvern Central Newsagency",
        "address1": "Shop 4-5, 112 Wattletree Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8630900, "lng": 145.0275200 }
    },
    {
        "id": "6281",
        "name": "Racecourse Lucky Lotto and News",
        "address1": "Shop 4, 338-390 Racecourse Road",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7873900, "lng": 144.9283400 }
    },
    {
        "id": "6032",
        "name": "Customs Lane News",
        "address1": "Shop 4 Customs House Lane",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8196300, "lng": 144.9589800 }
    },
    {
        "id": "6272",
        "name": "Thompson Parkway Newsagency",
        "address1": "Shop 4 and 5 Thompson Parkway Shopping Centre",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne",
        "position": { "lat": -38.0816700, "lng": 145.2780100 }
    },
    {
        "id": "6432",
        "name": "Kilsyth Newsagency",
        "address1": "Shop 4 and 5 Kilsyth Shopping Centre, 520-528 Mount Dandenong Road",
        "address2": "",
        "postcode": 3137,
        "suburb": "Kilsyth",
        "position": { "lat": -37.8022200, "lng": 145.3093400 }
    },
    {
        "id": "6472",
        "name": "Postmart Plus Convenience Store",
        "address1": "Shop 4 Alfred Hospital, 55 Commercial Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8456700, "lng": 144.9821100 }
    },
    {
        "id": "6364",
        "name": "Melbourne Lucky Lotto",
        "address1": "Shop 3B, 18 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8179300, "lng": 144.9650500 }
    },
    {
        "id": "6538",
        "name": "Wyndham Village Lotto and News",
        "address1": "Shop 39, 380 Sayers Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Tarneit",
        "position": { "lat": -37.8495100, "lng": 144.7044700 }
    },
    {
        "id": "6215",
        "name": "Roxburgh Park News and Lotto",
        "address1": "Shop 37 Roxburgh Park Shopping Centre, 250 Somerton Road",
        "address2": "",
        "postcode": 3064,
        "suburb": "Roxburgh Park",
        "position": { "lat": -37.6399000, "lng": 144.9323300 }
    },
    {
        "id": "9003",
        "name": "Corio Post Office",
        "address1": "Shop 32, 83A Purnell Road",
        "address2": "",
        "postcode": 3214,
        "suburb": "Corio",
        "position": { "lat": -38.0752300, "lng": 144.3566700 }
    },
    {
        "id": "9000",
        "name": "Ballarat Post Shop",
        "address1": "Shop 31, Central Square Shopping Centre, 10-16 Armstrong Street",
        "address2": "",
        "postcode": 3350,
        "suburb": "Ballarat ",
        "position": { "lat": -37.5632900, "lng": 143.8558600 }
    },
    {
        "id": "6332",
        "name": "Wheelers Hill Newsagency",
        "address1": "Shop 30 Wheelers Hill Shopping Centre, 200 Jells Road",
        "address2": "",
        "postcode": 3150,
        "suburb": "Wheelers Hill",
        "position": { "lat": -37.9102500, "lng": 145.1895500 }
    },
    {
        "id": "6771",
        "name": "Convenience @ Botanicca",
        "address1": "Shop 3, Building 4, 572 Swan Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8269400, "lng": 145.0198900 }
    },
    {
        "id": "1186",
        "name": "7-Eleven Glenferrie Station",
        "address1": "Shop 3, 672 Glenferrie Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8211600, "lng": 145.0358500 }
    },
    {
        "id": "6378",
        "name": "Swanston Street Lotto",
        "address1": "Shop 3, 227 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8158000, "lng": 144.9663100 }
    },
    {
        "id": "6458",
        "name": "Boronia Heights Pharmacy",
        "address1": "Shop 3, 1096 Mountain Highway",
        "address2": "",
        "postcode": 3155,
        "suburb": "Boronia",
        "position": { "lat": -37.8444700, "lng": 145.2995300 }
    },
    {
        "id": "6209",
        "name": "Amberley Park Sub News and Cignal Narre Warren South",
        "address1": "Shop 3, 101 Seebeck Drive",
        "address2": "",
        "postcode": 3805,
        "suburb": "Narre Warren South",
        "position": { "lat": -38.0515500, "lng": 145.2880200 }
    },
    {
        "id": "6448",
        "name": "Upper Ferntree Gully Newsagents",
        "address1": "Shop 3 Ferntree Plaza, Burwood Highway (Corner Dawson Street)",
        "address2": "",
        "postcode": 3156,
        "suburb": "Upper Ferntree Gully",
        "position": { "lat": -37.8941400, "lng": 145.3082700 }
    },
    {
        "id": "6543",
        "name": "Balnarring News and Lotto",
        "address1": "Shop 3 3050 Frankston Flinders Road",
        "address2": "",
        "postcode": 3926,
        "suburb": "Balnarring",
        "position": { "lat": -38.3736600, "lng": 145.1260000 }
    },
    {
        "id": "6112",
        "name": "Vermont South Amcal Pharmacy",
        "address1": "Shop 2a 495 Burwood Highway",
        "address2": "",
        "postcode": 3133,
        "suburb": "Vermont South",
        "position": { "lat": -37.8552200, "lng": 145.1822600 }
    },
    {
        "id": "6115",
        "name": "Stud Park Newsagency",
        "address1": "Shop 27 Stud Road Shopping Centre, Corner Fulham and Stud Roads",
        "address2": "",
        "postcode": 3178,
        "suburb": "Rowville",
        "position": { "lat": -37.9202000, "lng": 145.2369400 }
    },
    {
        "id": "6282",
        "name": "Chadstone Newsagency",
        "address1": "Shop 263 Chadstone Shopping Centre, 1341 Dandenong Road",
        "address2": "",
        "postcode": 3148,
        "suburb": "Chadstone",
        "position": { "lat": -37.8867300, "lng": 145.0807000 }
    },
    {
        "id": "6118",
        "name": "North Blackburn Tattslotto and Post Office",
        "address1": "Shop 26 North Blackburn Shopping Centre, 66-104 Springfield Road",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn North",
        "position": { "lat": -37.8113100, "lng": 145.1529900 }
    },
    {
        "id": "6078",
        "name": "Altona Gate Newsagency and Post Office",
        "address1": "Shop 25-28 Millers Road",
        "address2": "",
        "postcode": 3025,
        "suburb": "Altona North",
        "position": { "lat": -37.8276700, "lng": 144.8478600 }
    },
    {
        "id": "6667",
        "name": "Brandon Park Lotto, Cards and Gifts",
        "address1": "Shop 25, Brandon Park SC Corner Springvale and Ferntree Gully Roads",
        "address2": "",
        "postcode": 3150,
        "suburb": "Wheelers Hill",
        "position": { "lat": -37.9055500, "lng": 145.1623300 }
    },
    {
        "id": "6587",
        "name": "Somerville News and Tatts",
        "address1": "Shop 24,17 Eramosa Road (West)",
        "address2": "",
        "postcode": 3912,
        "suburb": "Somerville",
        "position": { "lat": -38.2242300, "lng": 145.1719100 }
    },
    {
        "id": "6073",
        "name": "Altona Meadows Post Office and News",
        "address1": "Shop 23A, Central Square Shopping Centre, 1 Central Avenue",
        "address2": "",
        "postcode": 3028,
        "suburb": "Altona Meadows",
        "position": { "lat": -37.8723700, "lng": 144.7759400 }
    },
    {
        "id": "6768",
        "name": "Bulleen Plaza Newsagency",
        "address1": "Shop 21B, Bulleen Plaza 83-85 Manningham Road",
        "address2": "",
        "postcode": 3105,
        "suburb": "Bulleen",
        "position": { "lat": -37.7661500, "lng": 145.0917200 }
    },
    {
        "id": "6672",
        "name": "Forest Hill Newsagency",
        "address1": "Shop 215, Forest Hill Chase SC 270 Canterbury Road",
        "address2": "",
        "postcode": 3131,
        "suburb": "Forest Hill",
        "position": { "lat": -37.8354100, "lng": 145.1653700 }
    },
    {
        "id": "6348",
        "name": "Highpoint News and Tatts",
        "address1": "Shop 2080, Level 2, Highpoint Shopping Centre 120-200 Rosamond Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Maribyrnong",
        "position": { "lat": -37.7718300, "lng": 144.8888200 }
    },
    {
        "id": "6074",
        "name": "Knox City Newsagency",
        "address1": "Shop 2080 Knox Shopping Centre, 425 Burwood Highway",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna South",
        "position": { "lat": -37.8688600, "lng": 145.2392400 }
    },
    {
        "id": "6626",
        "name": "Bayside News and Tatts",
        "address1": "Shop 200, 28 Beach Street Bayside North Shopping Centre",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1394900, "lng": 145.1247700 }
    },
    {
        "id": "6732",
        "name": "Gisborne Newsagency",
        "address1": "Shop 20 22 Brantome Street",
        "address2": "",
        "postcode": 3437,
        "suburb": "Gisborne",
        "position": { "lat": -37.4860000, "lng": 144.5888500 }
    },
    {
        "id": "6687",
        "name": "Churchill Newsagency",
        "address1": "Shop 2, Hazelwood Village Shopping Centre ",
        "address2": "",
        "postcode": 3842,
        "suburb": "Churchill",
        "position": { "lat": -38.3122800, "lng": 146.4208000 }
    },
    {
        "id": "6132",
        "name": "Montrose News",
        "address1": "Shop 2, 912 Mount Dandenong Tourist Road",
        "address2": "",
        "postcode": 3765,
        "suburb": "Montrose",
        "position": { "lat": -37.8104200, "lng": 145.3429500 }
    },
    {
        "id": "6129",
        "name": "Dingley Village Authorised Newsagency",
        "address1": "Shop 2, 79 Centre Dandenong Road",
        "address2": "",
        "postcode": 3172,
        "suburb": "Dingley Village",
        "position": { "lat": -37.9838300, "lng": 145.1339900 }
    },
    {
        "id": "6290",
        "name": "Eastern Hill Lotto",
        "address1": "Shop 2, 55 Victoria Parade",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8077400, "lng": 144.9750100 }
    },
    {
        "id": "6781",
        "name": "Roxy Smoke",
        "address1": "Shop 2, 415 McDonalds Road",
        "address2": "",
        "postcode": 3082,
        "suburb": "Mill Park",
        "position": { "lat": -37.6517300, "lng": 145.0743800 }
    },
    {
        "id": "6727",
        "name": "Bunyip Authorised Newsagency",
        "address1": "Shop 2, 2-6 Main Street",
        "address2": "",
        "postcode": 3815,
        "suburb": "Bunyip",
        "position": { "lat": -38.0984600, "lng": 145.7182800 }
    },
    {
        "id": "6428",
        "name": "Carmen Cigarettes",
        "address1": "Shop 2, 139-142 Lonsdale Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8106900, "lng": 144.9681600 }
    },
    {
        "id": "1194",
        "name": "7-Eleven 104 Exhibition Street",
        "address1": "Shop 2, 104-110 Exhibition Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8131300, "lng": 144.9713300 }
    },
    {
        "id": "1122",
        "name": "7-Eleven Flinders Street",
        "address1": "Shop 2, 1-5 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8180500, "lng": 144.9647400 }
    },
    {
        "id": "6709",
        "name": "Palm Plaza Lotto",
        "address1": "Shop 1K10, Dandenong Plaza Shopping Centre",
        "address2": "",
        "postcode": 3175,
        "suburb": "Dandenong",
        "position": { "lat": -37.9870500, "lng": 145.2182100 }
    },
    {
        "id": "6150",
        "name": "Croydon Central News and Lotto",
        "address1": "Shop 19 Centro Croydon, 5-15 Kent Avenue",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon",
        "position": { "lat": -37.7931700, "lng": 145.2783800 }
    },
    {
        "id": "6746",
        "name": "Neeto Caroline Springs Newsagency",
        "address1": "Shop 17, CS Square, 12A/13  Lake Street",
        "address2": "",
        "postcode": 3023,
        "suburb": "Caroline Springs",
        "position": { "lat": -37.7323500, "lng": 144.7430500 }
    },
    {
        "id": "6792",
        "name": "Gladstone Park Lottery and Cignall",
        "address1": "Shop 165, Gladstone Park Shopping Centre 8-34 Gladstone Park Drive",
        "address2": "",
        "postcode": 3043,
        "suburb": "Gladstone Park",
        "position": { "lat": -37.8374700, "lng": 144.8846300 }
    },
    {
        "id": "6171",
        "name": "Meadow Heights Newsagency",
        "address1": "Shop 16, 55 Paringa Boulevard, Centro Shopping Centre",
        "address2": "",
        "postcode": 3048,
        "suburb": "Meadow Heights",
        "position": { "lat": -37.6509900, "lng": 144.9219300 }
    },
    {
        "id": "6212",
        "name": "Pearcedale Newsagency and Lotto",
        "address1": "Shop 14 Pearcedale Village, Baxter-Tooradin Road",
        "address2": "",
        "postcode": 3912,
        "suburb": "Pearcedale",
        "position": { "lat": -38.2019900, "lng": 145.2334500 }
    },
    {
        "id": "6102",
        "name": "Carrum Downs Newsagency",
        "address1": "Shop 13,100 Hall Road",
        "address2": "",
        "postcode": 3201,
        "suburb": "Carrum Downs",
        "position": { "lat": -38.1020900, "lng": 145.1852700 }
    },
    {
        "id": "6678",
        "name": "Taylors Hill Lotteries",
        "address1": "Shop 13, Taylors Hill Village Corner Gourlay Road and Hume Drive",
        "address2": "",
        "postcode": 3037,
        "suburb": "Taylors Hill",
        "position": { "lat": -37.7106700, "lng": 144.7400300 }
    },
    {
        "id": "6199",
        "name": "Parkhill Berwick News and Lotto",
        "address1": "Shop 13, 215-225 Parkhill Drive",
        "address2": "",
        "postcode": 3806,
        "suburb": "Berwick",
        "position": { "lat": -38.0142400, "lng": 145.3225400 }
    },
    {
        "id": "6552",
        "name": "Relay Hub Convenience (Newslink)",
        "address1": "Shop 13 Flinders Street Station",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8181200, "lng": 144.9673500 }
    },
    {
        "id": "6633",
        "name": "NewsXpress Ballarat",
        "address1": "Shop 13 Block Arcade Doveton Street South",
        "address2": "",
        "postcode": 3350,
        "suburb": "Ballarat",
        "position": { "lat": -37.5624000, "lng": 143.8548800 }
    },
    {
        "id": "6066",
        "name": "Greensborough Newslotto",
        "address1": "Shop 128, Level 1 Greensborough Plaza, 25 Main Street",
        "address2": "",
        "postcode": 3088,
        "suburb": "Greensborough",
        "position": { "lat": -37.7022900, "lng": 145.1033600 }
    },
    {
        "id": "1042",
        "name": "7-Eleven Waverley Gardens",
        "address1": "Shop 125 Waverley Gardens Shopping Centre, Corner Police Road and Hansworth Street",
        "address2": "",
        "postcode": 3170,
        "suburb": "Mulgrave",
        "position": { "lat": -37.9365800, "lng": 145.1880700 }
    },
    {
        "id": "6775",
        "name": "Werribee News and Lotto",
        "address1": "Shop 123, Werribee Plaza Corner Heaths and Derrimut Roads",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.8755300, "lng": 144.6802500 }
    },
    {
        "id": "1085",
        "name": "7-Eleven Hampton",
        "address1": "Shop 12, 533 Bluff Road",
        "address2": "",
        "postcode": 3188,
        "suburb": "Hampton",
        "position": { "lat": -37.9320800, "lng": 145.0244800 }
    },
    {
        "id": "6797",
        "name": "Bellarine Village Lotto",
        "address1": "Shop 12, 25-29 Bellarine Highway",
        "address2": "",
        "postcode": 3219,
        "suburb": "Newcomb",
        "position": { "lat": -38.1692100, "lng": 144.3883300 }
    },
    {
        "id": "6337",
        "name": "Yarra Junction Pharmacy",
        "address1": "Shop 11, Yarra Junction Village Shopping Centre Main Road",
        "address2": "",
        "postcode": 3797,
        "suburb": "Yarra Junction",
        "position": { "lat": -37.7816800, "lng": 145.6136800 }
    },
    {
        "id": "6586",
        "name": "Summerhill Village Post and Lotto",
        "address1": "Shop 11, Summerhill Shopping Centre, 850 Plenty Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7250100, "lng": 145.0284000 }
    },
    {
        "id": "6683",
        "name": "Bendigo Centre Newsagency",
        "address1": "Shop 10A, The Bendigo Centre, 20-34 Bath Lane",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7607000, "lng": 144.2778000 }
    },
    {
        "id": "6712",
        "name": "Strath Village Newsagency",
        "address1": "Shop 10, Strath Village Shopping Centre, 134 Condon Street",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7746900, "lng": 144.3050400 }
    },
    {
        "id": "1355",
        "name": "7-Eleven 600 Collins Street",
        "address1": "Shop 10, 600 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8187500, "lng": 144.9548600 }
    },
    {
        "id": "6011",
        "name": "Chapmun",
        "address1": "Shop 10, 119 Hopkins Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8002300, "lng": 144.9009400 }
    },
    {
        "id": "6625",
        "name": "Showgrounds Village News and Lotto",
        "address1": "Shop 10 Village Showgrounds, 320-380 Epsom Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7822800, "lng": 144.9146800 }
    },
    {
        "id": "6325",
        "name": "Preston South Post Office",
        "address1": "Shop 10 Bell City, 215 Bell Street",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7462500, "lng": 145.0076100 }
    },
    {
        "id": "6688",
        "name": "City Express and Liquor",
        "address1": "Shop 1/32 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8115500, "lng": 144.9719500 }
    },
    {
        "id": "6582",
        "name": "East Melbourne IGA and Liquor",
        "address1": "Shop 1-4, Tribeca Plaza 416-446 Victoria Parade",
        "address2": "",
        "postcode": 3002,
        "suburb": "East Melbourne",
        "position": { "lat": -37.8096100, "lng": 144.9855100 }
    },
    {
        "id": "6425",
        "name": "Highdale Newsagency",
        "address1": "Shop 1, 969 High Street",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8552200, "lng": 145.0204700 }
    },
    {
        "id": "1146",
        "name": "7-Eleven Carlton West",
        "address1": "Shop 1, 743-751 Swanston Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton West",
        "position": { "lat": -37.8006600, "lng": 144.9636600 }
    },
    {
        "id": "1232",
        "name": "7-Eleven 424 St Kilda Road",
        "address1": "Shop 1, 424 St Kilda Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8368400, "lng": 144.9752900 }
    },
    {
        "id": "6431",
        "name": "Narre Warren Newsagency",
        "address1": "Shop 1, 34 Webb Street",
        "address2": "",
        "postcode": 3805,
        "suburb": "Narre Warren",
        "position": { "lat": -38.0261400, "lng": 145.3045400 }
    },
    {
        "id": "6384",
        "name": "The Summit Convenience Store",
        "address1": "Shop 1, 163 City Road",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8241600, "lng": 144.9625600 }
    },
    {
        "id": "1009",
        "name": "7-Eleven Pascoe Vale",
        "address1": "Shop 1, 1 Pascoe Street",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale",
        "position": { "lat": -37.7168500, "lng": 144.9363900 }
    },
    {
        "id": "6698",
        "name": "Flagstaff News and Lotto",
        "address1": "Shop 1 255 William Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8132000, "lng": 144.9568300 }
    },
    {
        "id": "6766",
        "name": "The Jolly Miller Cafe Watergardens",
        "address1": "Shop 1 1 Station Street",
        "address2": "",
        "postcode": 3037,
        "suburb": "Taylors Lakes",
        "position": { "lat": -37.7004100, "lng": 144.7741900 }
    },
    {
        "id": "19851",
        "name": "Willison Station",
        "address1": "Shalless Dr ",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8357100, "lng": 145.0703000 }
    },
    {
        "id": "19892",
        "name": "East Camberwell Station",
        "address1": "Sefton Place 13 Broadway",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8258900, "lng": 145.0681900 }
    },
    {
        "id": "20305",
        "name": "Corio Station",
        "address1": "School Road ",
        "address2": "",
        "postcode": 3214,
        "suburb": "Corio",
        "position": { "lat": -38.0728300, "lng": 144.3797700 }
    },
    {
        "id": "15353",
        "name": "Diggers Rest Station - Metro",
        "address1": "School Lane Old Calder Highway",
        "address2": "",
        "postcode": 3427,
        "suburb": "Diggers Rest",
        "position": { "lat": -37.6270100, "lng": 144.7199200 }
    },
    {
        "id": "20348",
        "name": "Tallarook Station",
        "address1": "Sanctuary Road near Kenmore Street",
        "address2": "",
        "postcode": 3569,
        "suburb": "Tallarook",
        "position": { "lat": -37.0906200, "lng": 145.1047400 }
    },
    {
        "id": "6108",
        "name": "Woods Pharmacy",
        "address1": "Royal Children Hospital, Ground Floor, Entry Building, 50 Flemington Road",
        "address2": "",
        "postcode": 3052,
        "suburb": "Parkville",
        "position": { "lat": -37.7936600, "lng": 144.9492900 }
    },
    {
        "id": "19946",
        "name": "Toorak Station",
        "address1": "Rose Street Beatty Avenue",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8507700, "lng": 145.0139100 }
    },
    {
        "id": "19691",
        "name": "Tram Stop",
        "address1": "RMIT University Swanston and Franklin Streets",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8078200, "lng": 144.9629400 }
    },
    {
        "id": "19494",
        "name": "Tram Stop",
        "address1": "RMIT University Swanston and Franklin Streets",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8083800, "lng": 144.9633300 }
    },
    {
        "id": "20323",
        "name": "Little River Station",
        "address1": "River Street near You Yangs Road",
        "address2": "",
        "postcode": 3211,
        "suburb": "Little River",
        "position": { "lat": -37.9624000, "lng": 144.4996300 }
    },
    {
        "id": "19914",
        "name": "Westall Station",
        "address1": "Rayhur Street ",
        "address2": "",
        "postcode": 3169,
        "suburb": "Clayton South",
        "position": { "lat": -37.9384900, "lng": 145.1388300 }
    },
    {
        "id": "20314",
        "name": "Geelong Station",
        "address1": "Railway Terrace ",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1444500, "lng": 144.3547700 }
    },
    {
        "id": "20342",
        "name": "Seymour Station",
        "address1": "Railway Reserve ",
        "address2": "",
        "postcode": 3660,
        "suburb": "Seymour",
        "position": { "lat": -37.0243600, "lng": 145.1388100 }
    },
    {
        "id": "20296",
        "name": "Bendigo Station",
        "address1": "Railway Place ",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7659300, "lng": 144.2826500 }
    },
    {
        "id": "19867",
        "name": "Upper Ferntree Gully Station",
        "address1": "Railway Avenue Burwood Highway",
        "address2": "",
        "postcode": 3156,
        "suburb": "Upper Ferntree Gully",
        "position": { "lat": -37.8926700, "lng": 145.3075300 }
    },
    {
        "id": "20316",
        "name": "Heathcote Junction Station",
        "address1": "Rail Street, near North Mountain Road",
        "address2": "",
        "postcode": 3758,
        "suburb": "Heathcote Junction",
        "position": { "lat": -37.3717100, "lng": 145.0281800 }
    },
    {
        "id": "19971",
        "name": "Flemington Bridge Station",
        "address1": "Racecourse Road Boundary Road",
        "address2": "",
        "postcode": 3051,
        "suburb": "North Melbourne",
        "position": { "lat": -37.7881400, "lng": 144.9393200 }
    },
    {
        "id": "20040",
        "name": "Newmarket Station",
        "address1": "Racecourse Road 42 Pin Oak Cres",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7873300, "lng": 144.9289800 }
    },
    {
        "id": "6452",
        "name": "Victoria Market Tattslotto",
        "address1": "Queen Victoria Market, Lot 4 Kiosk Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8068700, "lng": 144.9579100 }
    },
    {
        "id": "20357",
        "name": "Warragul Station",
        "address1": "Queen Street ",
        "address2": "",
        "postcode": 3820,
        "suburb": "Warragul",
        "position": { "lat": -38.1651500, "lng": 145.9330300 }
    },
    {
        "id": "19908",
        "name": "Richmond Station",
        "address1": "Punt Road Swan Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8240700, "lng": 144.9901600 }
    },
    {
        "id": "19987",
        "name": "Eltham Station",
        "address1": "Pryor Street Main Road",
        "address2": "",
        "postcode": 3095,
        "suburb": "Eltham",
        "position": { "lat": -37.7135500, "lng": 145.1478300 }
    },
    {
        "id": "20308",
        "name": "Drouin Station",
        "address1": "Princes Way ",
        "address2": "",
        "postcode": 3818,
        "suburb": "Drouin",
        "position": { "lat": -38.1364100, "lng": 145.8558400 }
    },
    {
        "id": "20350",
        "name": "Trafalgar Station",
        "address1": "Princes Highway near Loct Street South",
        "address2": "",
        "postcode": 3824,
        "suburb": "Trafalgar",
        "position": { "lat": -38.2073100, "lng": 146.1547300 }
    },
    {
        "id": "20362",
        "name": "Yarragon Station",
        "address1": "Princes Highway ",
        "address2": "",
        "postcode": 3823,
        "suburb": "Yarragon",
        "position": { "lat": -38.2033300, "lng": 146.0640300 }
    },
    {
        "id": "20330",
        "name": "Morwell Station",
        "address1": "Princes Drive ",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2373400, "lng": 146.3992800 }
    },
    {
        "id": "20001",
        "name": "Keilor Plains Station",
        "address1": "Power Street East Esplanade",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans",
        "position": { "lat": -37.7292800, "lng": 144.7937300 }
    },
    {
        "id": "19869",
        "name": "Boronia Station",
        "address1": "Power Road Dorset Road",
        "address2": "",
        "postcode": 3155,
        "suburb": "Boronia",
        "position": { "lat": -37.8604500, "lng": 145.2843800 }
    },
    {
        "id": "19985",
        "name": "Greensborough Station",
        "address1": "Poulter Ave ",
        "address2": "",
        "postcode": 3088,
        "suburb": "Greensborough",
        "position": { "lat": -37.7039500, "lng": 145.1082500 }
    },
    {
        "id": "40221",
        "name": "Craigieburn Station",
        "address1": "Potter Street ",
        "address2": "",
        "postcode": 3064,
        "suburb": "Craigieburn",
        "position": { "lat": -37.6018100, "lng": 144.9433300 }
    },
    {
        "id": "19970",
        "name": "Royal Park Station",
        "address1": "Poplar Road ",
        "address2": "",
        "postcode": 3052,
        "suburb": "Parkville",
        "position": { "lat": -37.7811900, "lng": 144.9523000 }
    },
    {
        "id": "19828",
        "name": "Crib Point Station - TEMPORARILY REMOVED DUE TO VANDALISM",
        "address1": "Point Road Stony Point Road",
        "address2": "",
        "postcode": 3919,
        "suburb": "Crib Point",
        "position": { "lat": -38.3661200, "lng": 145.2040500 }
    },
    {
        "id": "19918",
        "name": "Hughesdale Station",
        "address1": "Poath Road Willesden Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Hughesdale",
        "position": { "lat": -37.8948800, "lng": 145.0776400 }
    },
    {
        "id": "19963",
        "name": "Merlynston Station",
        "address1": "Plaisted Street 12 Bain Ave",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg North",
        "position": { "lat": -37.7209400, "lng": 144.9613100 }
    },
    {
        "id": "19926",
        "name": "Altona Station",
        "address1": "Pier Street Railway Street",
        "address2": "",
        "postcode": 3018,
        "suburb": "Altona",
        "position": { "lat": -37.8671500, "lng": 144.8296500 }
    },
    {
        "id": "19830",
        "name": "Bittern Station",
        "address1": "Peddle Street Frankston-Flinders Road",
        "address2": "",
        "postcode": 3918,
        "suburb": "Bittern",
        "position": { "lat": -38.3373900, "lng": 145.1780300 }
    },
    {
        "id": "19938",
        "name": "Patterson Station",
        "address1": "Patterson Road North Avenue",
        "address2": "",
        "postcode": 3204,
        "suburb": "Bentleigh",
        "position": { "lat": -37.9251500, "lng": 145.0354700 }
    },
    {
        "id": "20006",
        "name": "Lalor Station",
        "address1": "Paschke Cres Station Street",
        "address2": "",
        "postcode": 3075,
        "suburb": "Lalor",
        "position": { "lat": -37.6658500, "lng": 145.0172000 }
    },
    {
        "id": "19922",
        "name": "Hoppers Crossing Station",
        "address1": "Old Geelong Road Morris Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8838000, "lng": 144.6997300 }
    },
    {
        "id": "20319",
        "name": "Kilmore East Station",
        "address1": "O&#039;grady&#039;s Road ",
        "address2": "",
        "postcode": 3764,
        "suburb": "Kilmore East",
        "position": { "lat": -37.2928200, "lng": 144.9832900 }
    },
    {
        "id": "2003",
        "name": "Bus interchange",
        "address1": "Northland Shopping Centre ",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7398100, "lng": 145.0309900 }
    },
    {
        "id": "19941",
        "name": "Ormond Station",
        "address1": "North Road Katandra Road",
        "address2": "",
        "postcode": 3204,
        "suburb": "Ormond",
        "position": { "lat": -37.9032100, "lng": 145.0396100 }
    },
    {
        "id": "6219",
        "name": "Eastfield Newsagency",
        "address1": "No 7 The Mall",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon South",
        "position": { "lat": -37.8112100, "lng": 145.2707400 }
    },
    {
        "id": "20313",
        "name": "Garfield Station",
        "address1": "Nar Nar Goon-Longwarry Road near Thirteen Mile Road",
        "address2": "",
        "postcode": 3814,
        "suburb": "Garfield",
        "position": { "lat": -38.0908500, "lng": 145.6743300 }
    },
    {
        "id": "20299",
        "name": "Bunyip Station",
        "address1": "Nar Nar Goon-Longwarry Road near Berry Lane",
        "address2": "",
        "postcode": 3815,
        "suburb": "Bunyip",
        "position": { "lat": -38.0990900, "lng": 145.7203600 }
    },
    {
        "id": "19919",
        "name": "Murrumbeena Station",
        "address1": "Murrumbeena Road Railway Pde",
        "address2": "",
        "postcode": 3163,
        "suburb": "Murrumbeena",
        "position": { "lat": -37.8902000, "lng": 145.0673800 }
    },
    {
        "id": "19996",
        "name": "Yarraville Station",
        "address1": "Murray Street Birmingham Street",
        "address2": "",
        "postcode": 3013,
        "suburb": "Yarraville",
        "position": { "lat": -37.8158500, "lng": 144.8899300 }
    },
    {
        "id": "20012",
        "name": "Preston Station",
        "address1": "Murray Road St Georges Road",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7386700, "lng": 145.0005300 }
    },
    {
        "id": "19870",
        "name": "Bayswater Station",
        "address1": "Mountain Highway Station Street",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater",
        "position": { "lat": -37.8417300, "lng": 145.2681400 }
    },
    {
        "id": "19991",
        "name": "Williamstown Station",
        "address1": "Morris Street Railway Cres",
        "address2": "",
        "postcode": 3016,
        "suburb": "Williamstown",
        "position": { "lat": -37.8677500, "lng": 144.9053200 }
    },
    {
        "id": "19832",
        "name": "Tyabb Station",
        "address1": "Mornington-Tyabb Road Railway Road",
        "address2": "",
        "postcode": 3913,
        "suburb": "Tyabb",
        "position": { "lat": -38.2598200, "lng": 145.1864000 }
    },
    {
        "id": "45793",
        "name": "Lynbrook Station",
        "address1": "Moreton Bay Boulevard Red Oak Terrace",
        "address2": "",
        "postcode": 3975,
        "suburb": "Lyndhurst",
        "position": { "lat": -38.0573400, "lng": 145.2492800 }
    },
    {
        "id": "19966",
        "name": "Moreland Station",
        "address1": "Moreland Road Station Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7544800, "lng": 144.9618200 }
    },
    {
        "id": "2011",
        "name": "Bus interchange",
        "address1": "Moonee Ponds ",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7663200, "lng": 144.9245700 }
    },
    {
        "id": "19838",
        "name": "East Malvern Station",
        "address1": "Monash Fwy ",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8769300, "lng": 145.0694000 }
    },
    {
        "id": "20320",
        "name": "Kyneton Station",
        "address1": "Mollison Street ",
        "address2": "",
        "postcode": 3444,
        "suburb": "Kyneton",
        "position": { "lat": -37.2577600, "lng": 144.4504100 }
    },
    {
        "id": "19900",
        "name": "Mitcham Station",
        "address1": "Mitcham Road Calcutta Street",
        "address2": "",
        "postcode": 3132,
        "suburb": "Mitcham",
        "position": { "lat": -37.8180100, "lng": 145.1919700 }
    },
    {
        "id": "19931",
        "name": "Alphington Station",
        "address1": "Miller Street Rowe Street",
        "address2": "",
        "postcode": 3078,
        "suburb": "Alphington",
        "position": { "lat": -37.7784000, "lng": 145.0312500 }
    },
    {
        "id": "6638",
        "name": "Card Alley",
        "address1": "Midvalley Shopping Centre, Shop 33 82-90 Princes Drive",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2368400, "lng": 146.4299500 }
    },
    {
        "id": "19932",
        "name": "Darebin Station",
        "address1": "Merton Street Heidelberg Road",
        "address2": "",
        "postcode": 3079,
        "suburb": "Ivanhoe",
        "position": { "lat": -37.7749600, "lng": 145.0384800 }
    },
    {
        "id": "19950",
        "name": "Brighton Beach Station",
        "address1": "Menzies Avenue Station Walk",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.9264800, "lng": 144.9891600 }
    },
    {
        "id": "20035",
        "name": "Strathmore Station",
        "address1": "Melfort Ave Amelia Ave",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7435900, "lng": 144.9273200 }
    },
    {
        "id": "17901",
        "name": "Tram stop",
        "address1": "Melbourne Town Hall Collins and Swanston Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8156900, "lng": 144.9661300 }
    },
    {
        "id": "17911",
        "name": "Tram stop",
        "address1": "Melbourne Town Hall Collins and Swanston Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8155600, "lng": 144.9660700 }
    },
    {
        "id": "20334",
        "name": "North Geelong Station",
        "address1": "Melbourne Road ",
        "address2": "",
        "postcode": 3215,
        "suburb": "North Geelong",
        "position": { "lat": -38.1224500, "lng": 144.3522400 }
    },
    {
        "id": "19495",
        "name": "Tram Stop",
        "address1": "Melbourne Central Station Swanston and Latrobe Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8104500, "lng": 144.9642700 }
    },
    {
        "id": "19689",
        "name": "Tram Stop",
        "address1": "Melbourne Central Station Swanston and La Trobe Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8098700, "lng": 144.9639300 }
    },
    {
        "id": "19940",
        "name": "McKinnon Station",
        "address1": "McKinnon Road Glen Orme Avenue",
        "address2": "",
        "postcode": 3204,
        "suburb": "Mckinnon",
        "position": { "lat": -37.9103100, "lng": 145.0383000 }
    },
    {
        "id": "45795",
        "name": "South Morang Station",
        "address1": "McDonalds Road ",
        "address2": "",
        "postcode": 3752,
        "suburb": "South Morang",
        "position": { "lat": -37.6491600, "lng": 145.0670400 }
    },
    {
        "id": "20039",
        "name": "Ascot Vale Station",
        "address1": "McCully Street The Crescent",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7753100, "lng": 144.9218300 }
    },
    {
        "id": "19856",
        "name": "Kananook Station",
        "address1": "Mcculloch Avenue Wells Road",
        "address2": "",
        "postcode": 3198,
        "suburb": "Seaford",
        "position": { "lat": -38.1217400, "lng": 145.1352900 }
    },
    {
        "id": "19849",
        "name": "Burwood Station",
        "address1": "Maverston Street Bardolph Street",
        "address2": "",
        "postcode": 3146,
        "suburb": "Glen Iris",
        "position": { "lat": -37.8515600, "lng": 145.0805100 }
    },
    {
        "id": "19994",
        "name": "Newport Station",
        "address1": "Mason Street Melbourne Road",
        "address2": "",
        "postcode": 3015,
        "suburb": "Newport",
        "position": { "lat": -37.8427100, "lng": 144.8836000 }
    },
    {
        "id": "19953",
        "name": "Gardenvale Station",
        "address1": "Martin Street Spink Street",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.8966900, "lng": 145.0041700 }
    },
    {
        "id": "20327",
        "name": "Marshall Station",
        "address1": "Marshal Town Road ",
        "address2": "",
        "postcode": 3216,
        "suburb": "Marshall",
        "position": { "lat": -38.1987100, "lng": 144.3549400 }
    },
    {
        "id": "19876",
        "name": "Lilydale Station",
        "address1": "Maroondah Highway ",
        "address2": "",
        "postcode": 3140,
        "suburb": "Lilydale",
        "position": { "lat": -37.7555200, "lng": 145.3477100 }
    },
    {
        "id": "19921",
        "name": "Werribee Station",
        "address1": "Manly Street ",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.8993800, "lng": 144.6779100 }
    },
    {
        "id": "19877",
        "name": "Mooroolbark Station",
        "address1": "Manchester Road Brice Avenue",
        "address2": "",
        "postcode": 3138,
        "suburb": "Mooroolbark",
        "position": { "lat": -37.7847500, "lng": 145.3124000 }
    },
    {
        "id": "20007",
        "name": "Thomastown Station",
        "address1": "Main Street High Street",
        "address2": "",
        "postcode": 3074,
        "suburb": "Thomastown",
        "position": { "lat": -37.6803400, "lng": 145.0142800 }
    },
    {
        "id": "19844",
        "name": "Belgrave Station",
        "address1": "Main Street Belgrave-Gembrook Road",
        "address2": "",
        "postcode": 3160,
        "suburb": "Belgrave",
        "position": { "lat": -37.9091000, "lng": 145.3552900 }
    },
    {
        "id": "20002",
        "name": "St Albans Station",
        "address1": "Main Road St Albans Road",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans",
        "position": { "lat": -37.7448600, "lng": 144.8000600 }
    },
    {
        "id": "19925",
        "name": "Westona Station",
        "address1": "Maidstone Street Harrington Street",
        "address2": "",
        "postcode": 3018,
        "suburb": "Altona",
        "position": { "lat": -37.8651700, "lng": 144.8134900 }
    },
    {
        "id": "20041",
        "name": "Kensington Station",
        "address1": "Macaulay Road 194 Bellair Street",
        "address2": "",
        "postcode": 3031,
        "suburb": "Kensington",
        "position": { "lat": -37.7937800, "lng": 144.9305300 }
    },
    {
        "id": "19972",
        "name": "Macaulay Station",
        "address1": "Macaulay Road ",
        "address2": "",
        "postcode": 3051,
        "suburb": "North Melbourne",
        "position": { "lat": -37.7942600, "lng": 144.9361700 }
    },
    {
        "id": "20293",
        "name": "Ballarat Station",
        "address1": "Lydiard Street ",
        "address2": "",
        "postcode": 3350,
        "suburb": "Ballarat",
        "position": { "lat": -37.5581000, "lng": 143.8584600 }
    },
    {
        "id": "6351",
        "name": "Best of Souvenirs",
        "address1": "Lower Level, Melbourne Visitor Centre Federation Square, 2 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8177000, "lng": 144.9678300 }
    },
    {
        "id": "6733",
        "name": "IGA Travancore",
        "address1": "Lot 5, 50 Mt Alexander Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Travancore",
        "position": { "lat": -37.7849100, "lng": 144.9383600 }
    },
    {
        "id": "1243",
        "name": "7-Eleven Ardeer South",
        "address1": "Lot 5 Western Ring Road",
        "address2": "",
        "postcode": 3022,
        "suburb": "Ardeer",
        "position": { "lat": -37.7750900, "lng": 144.7942100 }
    },
    {
        "id": "6001",
        "name": "Frankston Station Kiosk",
        "address1": "Lot 49, Frankston Railway Station Corner Beach and Fletcher Roads",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1433200, "lng": 145.1257900 }
    },
    {
        "id": "1082",
        "name": "7-Eleven Tullamarine",
        "address1": "Lot 1, 182 Melrose Drive",
        "address2": "",
        "postcode": 3043,
        "suburb": "Tullamarine",
        "position": { "lat": -37.7022600, "lng": 144.8829500 }
    },
    {
        "id": "1242",
        "name": "7-Eleven Ardeer North",
        "address1": "Lot 1 Western Ring Road",
        "address2": "",
        "postcode": 3022,
        "suburb": "Ardeer",
        "position": { "lat": -37.7750900, "lng": 144.7942100 }
    },
    {
        "id": "1271",
        "name": "7-Eleven Eltham",
        "address1": "Lot 1 Sherbourne Road",
        "address2": "",
        "postcode": 3095,
        "suburb": "Eltham",
        "position": { "lat": -37.7162900, "lng": 145.1372600 }
    },
    {
        "id": "1154",
        "name": "7-Eleven Bacchus Marsh",
        "address1": "Lot 1 Main Street (Bacchus Marsh Road)",
        "address2": "",
        "postcode": 3340,
        "suburb": "Bacchus Marsh",
        "position": { "lat": -37.6714500, "lng": 144.4259900 }
    },
    {
        "id": "20352",
        "name": "Tynong Station",
        "address1": "Longwarry-Nar Nar Goon Road near Kerrs Road",
        "address2": "",
        "postcode": 3813,
        "suburb": "Tynong",
        "position": { "lat": -38.0849000, "lng": 145.6289100 }
    },
    {
        "id": "20328",
        "name": "Moe Station",
        "address1": "Lloyd Street ",
        "address2": "",
        "postcode": 3825,
        "suburb": "Moe",
        "position": { "lat": -38.1769100, "lng": 146.2604700 }
    },
    {
        "id": "19491",
        "name": "Tram Stop",
        "address1": "Lincoln Square Swanston and Pelham Streets",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8023700, "lng": 144.9636900 }
    },
    {
        "id": "19891",
        "name": "Sandown Park Station",
        "address1": "Lightwood Road ",
        "address2": "",
        "postcode": 3171,
        "suburb": "Springvale",
        "position": { "lat": -37.9558200, "lng": 145.1619300 }
    },
    {
        "id": "6579",
        "name": "The Campus Bookstore",
        "address1": "Level 2, K Building Monash University, Caulfield Campus, 28 Sir John Monash Drive",
        "address2": "",
        "postcode": 3145,
        "suburb": "Caulfield East",
        "position": { "lat": -37.8773900, "lng": 145.0439100 }
    },
    {
        "id": "6371",
        "name": "Spencer Street Lotto",
        "address1": "Level 1 Collins Street Concourse, Southern Cross Train Station",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8187600, "lng": 144.9529900 }
    },
    {
        "id": "43469",
        "name": "Wendouree Station",
        "address1": "Learmonth Road Gillies Street North",
        "address2": "",
        "postcode": 3355,
        "suburb": "Wendouree",
        "position": { "lat": -37.5400800, "lng": 143.8220600 }
    },
    {
        "id": "20020",
        "name": "Ardeer Station",
        "address1": "Lawrence Street 194 Forrest Street",
        "address2": "",
        "postcode": 3022,
        "suburb": "Ardeer",
        "position": { "lat": -37.7830600, "lng": 144.8021900 }
    },
    {
        "id": "19836",
        "name": "Leawarra Station",
        "address1": "Lardner Road 5 Bloom Street",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1520400, "lng": 145.1395400 }
    },
    {
        "id": "19897",
        "name": "Laburnum Station",
        "address1": "Laburnum Street Thiele Court",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn",
        "position": { "lat": -37.8207800, "lng": 145.1407100 }
    },
    {
        "id": "6539",
        "name": "La Trobe University Student Union",
        "address1": "La Trobe University, Upper Agora West Kingsbury Drive",
        "address2": "",
        "postcode": 3083,
        "suburb": "Bundoora",
        "position": { "lat": -37.7214300, "lng": 145.0485600 }
    },
    {
        "id": "2006",
        "name": "Bus interchange",
        "address1": "La Trobe University ",
        "address2": "",
        "postcode": 3083,
        "suburb": "Bundoora",
        "position": { "lat": -37.7253500, "lng": 145.0566100 }
    },
    {
        "id": "19842",
        "name": "Melbourne Central Station",
        "address1": "La Trobe Street ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8099400, "lng": 144.9626000 }
    },
    {
        "id": "19920",
        "name": "Carnegie Station",
        "address1": "Koornang Road Morton Avenue",
        "address2": "",
        "postcode": 3163,
        "suburb": "Carnegie",
        "position": { "lat": -37.8862400, "lng": 145.0585800 }
    },
    {
        "id": "2005",
        "name": "Bus interchange",
        "address1": "Knox Shopping Centre ",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna South",
        "position": { "lat": -37.8696400, "lng": 145.2419000 }
    },
    {
        "id": "6245",
        "name": "Werribee Plaza Lotto",
        "address1": "Kiosk K065 Werribee Plaza Shopping Centre, Corner Derrimut and Heaths Roads",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.8758700, "lng": 144.6791600 }
    },
    {
        "id": "6761",
        "name": "Keilor Downs Plaza Lotto",
        "address1": "Kiosk 4, 80 Taylors Road",
        "address2": "",
        "postcode": 3038,
        "suburb": "Keilor Downs",
        "position": { "lat": -37.7268100, "lng": 144.8069300 }
    },
    {
        "id": "6594",
        "name": "Victoria Gardens Lotto",
        "address1": "Kiosk 3, Victoria Gardens Shopping Centre 620 Victoria Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8139000, "lng": 145.0099000 }
    },
    {
        "id": "6438",
        "name": "Forest Hill Lotteries",
        "address1": "Kiosk 17, Level 1 Forest Hill Shopping Centre, 270 Canterbury Road",
        "address2": "",
        "postcode": 3131,
        "suburb": "Forest Hill",
        "position": { "lat": -37.8349300, "lng": 145.1646400 }
    },
    {
        "id": "20008",
        "name": "Keon Park Station",
        "address1": "Keon Pde High Street",
        "address2": "",
        "postcode": 3074,
        "suburb": "Thomastown",
        "position": { "lat": -37.6948700, "lng": 145.0118800 }
    },
    {
        "id": "20324",
        "name": "Longwarry Station",
        "address1": "Kennedy Street near Nar Nar Goon-Longwarry Road",
        "address2": "",
        "postcode": 3816,
        "suburb": "Longwarry",
        "position": { "lat": -38.1113100, "lng": 145.7671800 }
    },
    {
        "id": "20301",
        "name": "Castlemaine Station",
        "address1": "Kennedy Street ",
        "address2": "",
        "postcode": 3450,
        "suburb": "Castlemaine",
        "position": { "lat": -37.0630200, "lng": 144.2136700 }
    },
    {
        "id": "44817",
        "name": "Coolaroo Station",
        "address1": "Kalimna Cres ",
        "address2": "",
        "postcode": 3048,
        "suburb": "Coolaroo",
        "position": { "lat": -37.6628100, "lng": 144.9257000 }
    },
    {
        "id": "6711",
        "name": "Southland Lotteries",
        "address1": "K318, Westfield Shopping Centre, 1239 Nepean Highway",
        "address2": "",
        "postcode": 3192,
        "suburb": "Cheltenham",
        "position": { "lat": -37.9584480, "lng": 145.0548100 }
    },
    {
        "id": "6791",
        "name": "Fountain Gate Lotto Dreams",
        "address1": "K202, Level 2, Westfield Fountain Gate 352 Princes Hwy",
        "address2": "",
        "postcode": 3805,
        "suburb": "Narre Warren",
        "position": { "lat": -38.0176900, "lng": 145.3038000 }
    },
    {
        "id": "6773",
        "name": "Epping Plaza Lotto",
        "address1": "K029 Epping Plaza Shopping Centre 571-583 High Street",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6535700, "lng": 145.0170700 }
    },
    {
        "id": "6590",
        "name": "Woodgrove Lotto",
        "address1": "K002 Woodgrove Shopping Centre 533-555 High Street",
        "address2": "",
        "postcode": 3337,
        "suburb": "Melton",
        "position": { "lat": -37.6858300, "lng": 144.5651500 }
    },
    {
        "id": "19894",
        "name": "Chatham Station",
        "address1": "Junction Road Stanley Tce",
        "address2": "",
        "postcode": 3127,
        "suburb": "Surrey Hills",
        "position": { "lat": -37.8243000, "lng": 145.0886500 }
    },
    {
        "id": "20030",
        "name": "Broadmeadows Station",
        "address1": "Johnstone Street Pascoe Vale Road",
        "address2": "",
        "postcode": 3047,
        "suburb": "Broadmeadows",
        "position": { "lat": -37.6830500, "lng": 144.9196200 }
    },
    {
        "id": "19975",
        "name": "Victoria Park Station",
        "address1": "Johnston Street Lulie Street",
        "address2": "",
        "postcode": 3067,
        "suburb": "Abbotsford",
        "position": { "lat": -37.7991600, "lng": 144.9944500 }
    },
    {
        "id": "19858",
        "name": "Carrum Station",
        "address1": "Johnson Avenue Nepean Highway",
        "address2": "",
        "postcode": 3197,
        "suburb": "Carrum",
        "position": { "lat": -38.0749000, "lng": 145.1224100 }
    },
    {
        "id": "19978",
        "name": "West Richmond Station",
        "address1": "Jika Place ",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8149500, "lng": 144.9914200 }
    },
    {
        "id": "20014",
        "name": "Thornbury Station",
        "address1": "Hutton Street Ethel Street",
        "address2": "",
        "postcode": 3071,
        "suburb": "Thornbury",
        "position": { "lat": -37.7550500, "lng": 144.9985800 }
    },
    {
        "id": "19916",
        "name": "Huntingdale Station",
        "address1": "Huntingdale Road Haughton Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Oakleigh",
        "position": { "lat": -37.9110200, "lng": 145.1023600 }
    },
    {
        "id": "20025",
        "name": "Footscray Station",
        "address1": "Hopkins Street Irving Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8010900, "lng": 144.9031900 }
    },
    {
        "id": "19995",
        "name": "Spotswood Station",
        "address1": "Hope Street ",
        "address2": "",
        "postcode": 3015,
        "suburb": "Spotswood",
        "position": { "lat": -37.8306400, "lng": 144.8859400 }
    },
    {
        "id": "20038",
        "name": "Moonee Ponds Station",
        "address1": "Holmes Road 13 Norwood Cres",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7657000, "lng": 144.9191600 }
    },
    {
        "id": "19840",
        "name": "Jordanville Station",
        "address1": "Hillview Avenue 3 Windsor Avenue",
        "address2": "",
        "postcode": 3149,
        "suburb": "Mount Waverley",
        "position": { "lat": -37.8736000, "lng": 145.1120900 }
    },
    {
        "id": "2004",
        "name": "Bus interchange",
        "address1": "Highpoint Shopping Centre ",
        "address2": "",
        "postcode": 3032,
        "suburb": "Maribyrnong",
        "position": { "lat": -37.7738200, "lng": 144.8894300 }
    },
    {
        "id": "19835",
        "name": "Glen Iris Station",
        "address1": "High Street Wills Street",
        "address2": "",
        "postcode": 3146,
        "suburb": "Glen Iris",
        "position": { "lat": -37.8593100, "lng": 145.0582200 }
    },
    {
        "id": "19945",
        "name": "Armadale Station",
        "address1": "High Street Cheel Street",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8564500, "lng": 145.0193300 }
    },
    {
        "id": "20298",
        "name": "Broadford Station",
        "address1": "High Street  ",
        "address2": "",
        "postcode": 3658,
        "suburb": "Broadford",
        "position": { "lat": -37.2074700, "lng": 145.0428600 }
    },
    {
        "id": "20321",
        "name": "Lara Station",
        "address1": "Hicks Street ",
        "address2": "",
        "postcode": 3212,
        "suburb": "Lara",
        "position": { "lat": -38.0222200, "lng": 144.4144900 }
    },
    {
        "id": "20011",
        "name": "Regent Station",
        "address1": "Henry Street Opp 15 Henry St Robinson Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7284000, "lng": 145.0027700 }
    },
    {
        "id": "19880",
        "name": "Pakenham Station",
        "address1": "Henry Road Railway Avenue",
        "address2": "",
        "postcode": 3810,
        "suburb": "Pakenham",
        "position": { "lat": -38.0806100, "lng": 145.4863700 }
    },
    {
        "id": "19989",
        "name": "Wattle Glen Station",
        "address1": "Heidelberg-Kinglake Road",
        "address2": "",
        "postcode": 3096,
        "suburb": "Wattle Glen",
        "position": { "lat": -37.6640800, "lng": 145.1817100 }
    },
    {
        "id": "19990",
        "name": "Hurstbridge Station",
        "address1": "Heidelberg-Kinglake Road",
        "address2": "",
        "postcode": 3099,
        "suburb": "Hurstbridge",
        "position": { "lat": -37.6394000, "lng": 145.1920100 }
    },
    {
        "id": "19974",
        "name": "Clifton Hill Station",
        "address1": "Heidelberg Road 17 John Street",
        "address2": "",
        "postcode": 3068,
        "suburb": "Clifton Hill",
        "position": { "lat": -37.7886500, "lng": 144.9954200 }
    },
    {
        "id": "19871",
        "name": "Heathmont Station",
        "address1": "Heathmont Road Canterbury Road",
        "address2": "",
        "postcode": 3135,
        "suburb": "Heathmont",
        "position": { "lat": -37.8283200, "lng": 145.2445500 }
    },
    {
        "id": "19901",
        "name": "Heatherdale Station",
        "address1": "Heatherdale Road Forster Street",
        "address2": "",
        "postcode": 3132,
        "suburb": "Mitcham",
        "position": { "lat": -37.8189000, "lng": 145.2127900 }
    },
    {
        "id": "19859",
        "name": "Bonbeach Station",
        "address1": "Harding Avenue Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Bonbeach",
        "position": { "lat": -38.0629500, "lng": 145.1196800 }
    },
    {
        "id": "19949",
        "name": "Hampton Station",
        "address1": "Hampton Street Railway Cres",
        "address2": "",
        "postcode": 3188,
        "suburb": "Hampton",
        "position": { "lat": -37.9379700, "lng": 145.0014700 }
    },
    {
        "id": "20021",
        "name": "Sunshine Station",
        "address1": "Hampshire Road Station Place",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine",
        "position": { "lat": -37.7885400, "lng": 144.8328800 }
    },
    {
        "id": "20337",
        "name": "Riddells Creek Station",
        "address1": "Hamilton Street ",
        "address2": "",
        "postcode": 3431,
        "suburb": "Riddells Creek",
        "position": { "lat": -37.4649000, "lng": 144.6798100 }
    },
    {
        "id": "19885",
        "name": "Hallam Station",
        "address1": "Hallam South Road ",
        "address2": "",
        "postcode": 3803,
        "suburb": "Hallam",
        "position": { "lat": -38.0177400, "lng": 145.2697700 }
    },
    {
        "id": "20309",
        "name": "Eaglehawk Station",
        "address1": "Hall Street ",
        "address2": "",
        "postcode": 3556,
        "suburb": "Eaglehawk",
        "position": { "lat": -36.7185300, "lng": 144.2483800 }
    },
    {
        "id": "19958",
        "name": "Prahran Station",
        "address1": "Greville Street 32 Porter Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8495200, "lng": 144.9898600 }
    },
    {
        "id": "19984",
        "name": "Watsonia Station",
        "address1": "Greensborough Road ",
        "address2": "",
        "postcode": 3087,
        "suburb": "Watsonia",
        "position": { "lat": -37.7109500, "lng": 145.0838000 }
    },
    {
        "id": "19923",
        "name": "Laverton Station",
        "address1": "Grace Street Railway Ave",
        "address2": "",
        "postcode": 3028,
        "suburb": "Laverton",
        "position": { "lat": -37.8636900, "lng": 144.7726200 }
    },
    {
        "id": "20032",
        "name": "Glenroy Station",
        "address1": "Glenroy Road Hartington Street",
        "address2": "",
        "postcode": 3046,
        "suburb": "Glenroy",
        "position": { "lat": -37.7045300, "lng": 144.9172200 }
    },
    {
        "id": "19944",
        "name": "Malvern Station",
        "address1": "Glenferrie Road Station Place",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8662500, "lng": 145.0292900 }
    },
    {
        "id": "19910",
        "name": "Kooyong Station",
        "address1": "Glenferrie Road 430 Monaro Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Kooyong",
        "position": { "lat": -37.8399300, "lng": 145.0335500 }
    },
    {
        "id": "19904",
        "name": "Glenferrie Station",
        "address1": "Glenferrie Road ",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8214700, "lng": 145.0364400 }
    },
    {
        "id": "19904",
        "name": "Glenferrie Station",
        "address1": "Glenferrie Road ",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8214700, "lng": 145.0364400 }
    },
    {
        "id": "19873",
        "name": "Glen Waverley Station",
        "address1": "Glendale Street Coleman Pde",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8797900, "lng": 145.1630600 }
    },
    {
        "id": "19954",
        "name": "Elsternwick Station",
        "address1": "Glen Huntly Road Horne Street",
        "address2": "",
        "postcode": 3185,
        "suburb": "Elsternwick",
        "position": { "lat": -37.8847500, "lng": 145.0009000 }
    },
    {
        "id": "19942",
        "name": "Glenhuntly Station",
        "address1": "Glen Huntly Road 9 Royal Avenue",
        "address2": "",
        "postcode": 3163,
        "suburb": "Glen Huntly",
        "position": { "lat": -37.8897200, "lng": 145.0422200 }
    },
    {
        "id": "19955",
        "name": "Ripponlea Station",
        "address1": "Glen Eira Road Morres Street",
        "address2": "",
        "postcode": 3185,
        "suburb": "Ripponlea",
        "position": { "lat": -37.8759100, "lng": 144.9952300 }
    },
    {
        "id": "20036",
        "name": "Glenbervie Station",
        "address1": "Glass Street 40 Napier Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7472100, "lng": 144.9209400 }
    },
    {
        "id": "19976",
        "name": "Collingwood Station",
        "address1": "Gipps Street Eddy Court",
        "address2": "",
        "postcode": 3067,
        "suburb": "Abbotsford",
        "position": { "lat": -37.8045200, "lng": 144.9937500 }
    },
    {
        "id": "19930",
        "name": "Fairfield Station",
        "address1": "Gillies Street Railway Place",
        "address2": "",
        "postcode": 3078,
        "suburb": "Fairfield",
        "position": { "lat": -37.7791700, "lng": 145.0169000 }
    },
    {
        "id": "20023",
        "name": "West Footscray Station",
        "address1": "Geelong Road Sunshine Road",
        "address2": "",
        "postcode": 3012,
        "suburb": "West Footscray",
        "position": { "lat": -37.8018100, "lng": 144.8853300 }
    },
    {
        "id": "2008",
        "name": "Bus interchange",
        "address1": "Geelong Railway Station ",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1448000, "lng": 144.3550700 }
    },
    {
        "id": "19909",
        "name": "Heyington Station",
        "address1": "Gawith Court Heyington Place",
        "address2": "",
        "postcode": 3142,
        "suburb": "Toorak",
        "position": { "lat": -37.8346700, "lng": 145.0226300 }
    },
    {
        "id": "19964",
        "name": "Batman Station",
        "address1": "Gaffney Street McDonald Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg North",
        "position": { "lat": -37.7335200, "lng": 144.9628400 }
    },
    {
        "id": "20034",
        "name": "Pascoe Vale Station",
        "address1": "Gaffney Street 40 Burgundy Street",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale",
        "position": { "lat": -37.7307500, "lng": 144.9281900 }
    },
    {
        "id": "6776",
        "name": "Whites Dispensary",
        "address1": "G12 The Clarendon Centre 265 Clarendon Street",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8324900, "lng": 144.9605500 }
    },
    {
        "id": "6418",
        "name": "Little Lonsdale Newsagency",
        "address1": "G01, Ground Floor, 485 La Trobe Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8131800, "lng": 144.9551000 }
    },
    {
        "id": "6627",
        "name": "NewsXpress South Yarra",
        "address1": "G-005 Vogue Plaza, 670 Chapel Street",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8374000, "lng": 144.9967900 }
    },
    {
        "id": "19978",
        "name": "West Richmond Station",
        "address1": "Freeman Street Muir Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8149500, "lng": 144.9914200 }
    },
    {
        "id": "19862",
        "name": "Aspendale Station",
        "address1": "Foster Street 143 Nepean Highway",
        "address2": "",
        "postcode": 3195,
        "suburb": "Aspendale",
        "position": { "lat": -38.0272200, "lng": 145.1021500 }
    },
    {
        "id": "19888",
        "name": "Dandenong Station",
        "address1": "Foster Street ",
        "address2": "",
        "postcode": 3175,
        "suburb": "Dandenong",
        "position": { "lat": -37.9896600, "lng": 145.2090500 }
    },
    {
        "id": "19992",
        "name": "Williamstown Beach Station",
        "address1": "Forster Street Railway Cres",
        "address2": "",
        "postcode": 3016,
        "suburb": "Williamstown",
        "position": { "lat": -37.8639800, "lng": 144.8944900 }
    },
    {
        "id": "19868",
        "name": "Ferntree Gully Station",
        "address1": "Forest Road Underwood Road",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.8817000, "lng": 145.2952500 }
    },
    {
        "id": "2002",
        "name": "Bus interchange",
        "address1": "Forest Hill Shopping Centre ",
        "address2": "",
        "postcode": 3131,
        "suburb": "Forrest Hill",
        "position": { "lat": -37.8347900, "lng": 145.1653200 }
    },
    {
        "id": "17934",
        "name": "Tram Stop",
        "address1": "Footscray Tram Terminus Leeds and Irving Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8012900, "lng": 144.9009400 }
    },
    {
        "id": "20025",
        "name": "Bus Interchange",
        "address1": "Footscray Station Irving Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8013300, "lng": 144.9015200 }
    },
    {
        "id": "31022",
        "name": "Tram stop",
        "address1": "Flinders and Swanston Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8176600, "lng": 144.9668600 }
    },
    {
        "id": "31020",
        "name": "Tram stop",
        "address1": "Flinders and Spencer Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8209300, "lng": 144.9554600 }
    },
    {
        "id": "31021",
        "name": "Tram stop",
        "address1": "Flinders and Spencer Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8209900, "lng": 144.9555700 }
    },
    {
        "id": "31018",
        "name": "Tram stop",
        "address1": "Flinders and King Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8201200, "lng": 144.9581000 }
    },
    {
        "id": "31019",
        "name": "Tram stop",
        "address1": "Flinders and King Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8202200, "lng": 144.9581100 }
    },
    {
        "id": "19874",
        "name": "Syndal Station",
        "address1": "Fiander Avenue Coleman Parade",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8762300, "lng": 145.1497800 }
    },
    {
        "id": "19993",
        "name": "Williamstown North Station",
        "address1": "Ferguson Street Power Street",
        "address2": "",
        "postcode": 3016,
        "suburb": "Williamstown",
        "position": { "lat": -37.8573300, "lng": 144.8890700 }
    },
    {
        "id": "20019",
        "name": "Rushall Station",
        "address1": "Falconer Street Rushall Cres",
        "address2": "",
        "postcode": 3068,
        "suburb": "Fitzroy North",
        "position": { "lat": -37.7832200, "lng": 144.9924000 }
    },
    {
        "id": "19848",
        "name": "Ashburton Station",
        "address1": "Fakenham Road Welfare Pde",
        "address2": "",
        "postcode": 3147,
        "suburb": "Ashburton",
        "position": { "lat": -37.8619700, "lng": 145.0813400 }
    },
    {
        "id": "47647",
        "name": "Wyndham Vale Station",
        "address1": "Eureka Drive Near Academy Way",
        "address2": "",
        "postcode": 3024,
        "suburb": "Wyndham Vale",
        "position": { "lat": -37.8724900, "lng": 144.6088700 }
    },
    {
        "id": "18053",
        "name": "Tram Stop",
        "address1": "Etihad Stadium at Bourke Street Harbour Esplanade and Bourke St",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8177300, "lng": 144.9461200 }
    },
    {
        "id": "19833",
        "name": "Somerville Station",
        "address1": "Eramosa Road Station Street",
        "address2": "",
        "postcode": 3912,
        "suburb": "Somerville",
        "position": { "lat": -38.2253400, "lng": 145.1762500 }
    },
    {
        "id": "20027",
        "name": "Flemington Racecourse Station",
        "address1": "Epsom Road ",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7857700, "lng": 144.9197000 }
    },
    {
        "id": "20355",
        "name": "Wandong Station",
        "address1": "Epping-Kilmore Road near Broadford-Epping Road",
        "address2": "",
        "postcode": 3758,
        "suburb": "Wandong",
        "position": { "lat": -37.3554700, "lng": 145.0266100 }
    },
    {
        "id": "19883",
        "name": "Berwick Station",
        "address1": "Enterprise Avenue ",
        "address2": "",
        "postcode": 3806,
        "suburb": "Berwick",
        "position": { "lat": -38.0404100, "lng": 145.3457200 }
    },
    {
        "id": "19973",
        "name": "North Melbourne Station",
        "address1": "Dynon Road Railway Place",
        "address2": "",
        "postcode": 3003,
        "suburb": "West Melbourne",
        "position": { "lat": -37.8063100, "lng": 144.9415100 }
    },
    {
        "id": "19936",
        "name": "Rosanna Station",
        "address1": "Douglas Street Station Road",
        "address2": "",
        "postcode": 3084,
        "suburb": "Rosanna",
        "position": { "lat": -37.7428800, "lng": 145.0661400 }
    },
    {
        "id": "20307",
        "name": "Donnybrook Station",
        "address1": "Donnybrook Road near Springs Road",
        "address2": "",
        "postcode": 3064,
        "suburb": "Donnybrook",
        "position": { "lat": -37.5420600, "lng": 144.9700300 }
    },
    {
        "id": "19505",
        "name": "Tram Stop",
        "address1": "Domain Interchange St Kilda and Albert Roads",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8326200, "lng": 144.9721500 }
    },
    {
        "id": "19678",
        "name": "Tram Stop",
        "address1": "Domain Interchange St Kilda and Albert Roads",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8327300, "lng": 144.9721000 }
    },
    {
        "id": "19829",
        "name": "Morradoo Station",
        "address1": "Disney Street Campbell Street",
        "address2": "",
        "postcode": 3919,
        "suburb": "Crib Point",
        "position": { "lat": -38.3540400, "lng": 145.1896100 }
    },
    {
        "id": "47648",
        "name": "Tarneit Station",
        "address1": "Derrimut Road Near Leakes Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Tarneit",
        "position": { "lat": -37.8321200, "lng": 144.6947100 }
    },
    {
        "id": "64404",
        "name": "Flinders Street Station",
        "address1": "Degraves St Platform 1 ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8180000, "lng": 144.9661600 }
    },
    {
        "id": "20326",
        "name": "Malmsbury Station",
        "address1": "Daylesford-Malmsbury Road Off Calder Highway",
        "address2": "",
        "postcode": 3446,
        "suburb": "Malmsbury",
        "position": { "lat": -37.1907000, "lng": 144.3744100 }
    },
    {
        "id": "20005",
        "name": "Epping Station",
        "address1": "Davisson Street Cooper Street",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6528300, "lng": 145.0285200 }
    },
    {
        "id": "19846",
        "name": "Upwey Station",
        "address1": "Darling Avenue Burwood Highway",
        "address2": "",
        "postcode": 3158,
        "suburb": "Upwey",
        "position": { "lat": -37.9036900, "lng": 145.3313400 }
    },
    {
        "id": "20031",
        "name": "Jacana Station",
        "address1": "Daley Street Hartington Street",
        "address2": "",
        "postcode": 3046,
        "suburb": "Glenroy",
        "position": { "lat": -37.6951300, "lng": 144.9158600 }
    },
    {
        "id": "19889",
        "name": "Yarraman Station",
        "address1": "Cyril Grove Railway Pde",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9782500, "lng": 145.1916000 }
    },
    {
        "id": "1119",
        "name": "7-Eleven Yarraville",
        "address1": "Corner Williamstown and Sommerville Rds ",
        "address2": "",
        "postcode": 3013,
        "suburb": "Yarraville",
        "position": { "lat": -37.8131100, "lng": 144.8830600 }
    },
    {
        "id": "1121",
        "name": "7-Eleven Melbourne Central",
        "address1": "Corner Swanston and Lonsdale Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8114600, "lng": 144.9644800 }
    },
    {
        "id": "1141",
        "name": "7-Eleven Spencer Street",
        "address1": "Corner Spencer and Flinders Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8208400, "lng": 144.9551300 }
    },
    {
        "id": "6404",
        "name": "Peter Kennedy Kiosk",
        "address1": "Corner Collins and Spring Street ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8135000, "lng": 144.9738300 }
    },
    {
        "id": "1047",
        "name": "7-Eleven Canterbury",
        "address1": "Corner Canterbury Road and Myrtle Street ",
        "address2": "",
        "postcode": 3126,
        "suburb": "Canterbury",
        "position": { "lat": -37.8227600, "lng": 145.0700900 }
    },
    {
        "id": "31016",
        "name": "Tram stop",
        "address1": "Commercial Road/Alfred Hospital ",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8452500, "lng": 144.9820700 }
    },
    {
        "id": "31017",
        "name": "Tram stop",
        "address1": "Commercial Road/Alfred Hospital ",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8453900, "lng": 144.9824500 }
    },
    {
        "id": "22180",
        "name": "Southern Cross Station",
        "address1": "Collins Street Spencer Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8182500, "lng": 144.9516900 }
    },
    {
        "id": "43474",
        "name": "Tram stop",
        "address1": "Collins Landing Collins and Merchant Streets",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8215300, "lng": 144.9454200 }
    },
    {
        "id": "31014",
        "name": "Tram stop",
        "address1": "Collins and Spring Streets - Parliament ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8135100, "lng": 144.9732700 }
    },
    {
        "id": "31015",
        "name": "Tram stop",
        "address1": "Collins and Spring Streets - Parliament ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8135300, "lng": 144.9734100 }
    },
    {
        "id": "31012",
        "name": "Tram stop",
        "address1": "Collins and Russell - Exhibition ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8142100, "lng": 144.9705000 }
    },
    {
        "id": "31013",
        "name": "Tram stop",
        "address1": "Collins and Russell - Exhibition ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8143500, "lng": 144.9704800 }
    },
    {
        "id": "31010",
        "name": "Tram stop",
        "address1": "Collins and Elizabeth Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8163200, "lng": 144.9635100 }
    },
    {
        "id": "31011",
        "name": "Tram stop",
        "address1": "Collins and Elizabeth Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8164300, "lng": 144.9634900 }
    },
    {
        "id": "6722",
        "name": "7-Eleven Roxburgh Park",
        "address1": "Cnrner of James Miram Drive/Bridgewater Rd",
        "address2": "",
        "postcode": 3064,
        "suburb": "Roxburgh Park",
        "position": { "lat": -37.6190530, "lng": 144.9275650 }
    },
    {
        "id": "19915",
        "name": "Clayton Station",
        "address1": "Clayton Road Haughton Road",
        "address2": "",
        "postcode": 3168,
        "suburb": "Clayton",
        "position": { "lat": -37.9246800, "lng": 145.1205300 }
    },
    {
        "id": "31008",
        "name": "Tram stop",
        "address1": "Clarendon and Casino West ",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8233700, "lng": 144.9561800 }
    },
    {
        "id": "31009",
        "name": "Tram stop",
        "address1": "Clarendon and Casino West ",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8233600, "lng": 144.9560800 }
    },
    {
        "id": "9010",
        "name": "Warragul Post Office",
        "address1": "Civic Place, 68 Smith Street",
        "address2": "",
        "postcode": 3820,
        "suburb": "Warragul",
        "position": { "lat": -38.1613800, "lng": 145.9320200 }
    },
    {
        "id": "19498",
        "name": "Tram Stop",
        "address1": "City Square Swanston and Collins Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8163800, "lng": 144.9670200 }
    },
    {
        "id": "19686",
        "name": "Tram Stop",
        "address1": "City Square Swanston and Collins Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8157300, "lng": 144.9665700 }
    },
    {
        "id": "19896",
        "name": "Mont Albert Station",
        "address1": "Churchill Street ",
        "address2": "",
        "postcode": 3127,
        "suburb": "Mont Albert",
        "position": { "lat": -37.8194300, "lng": 145.1055300 }
    },
    {
        "id": "19831",
        "name": "Hastings Station",
        "address1": "Church Street Station Street",
        "address2": "",
        "postcode": 3915,
        "suburb": "Hastings",
        "position": { "lat": -38.3056600, "lng": 145.1859800 }
    },
    {
        "id": "19907",
        "name": "East Richmond Station",
        "address1": "Church Street Adolph Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8264000, "lng": 144.9970700 }
    },
    {
        "id": "20026",
        "name": "South Kensington Station",
        "address1": "Childers Street ",
        "address2": "",
        "postcode": 3031,
        "suburb": "Kensington",
        "position": { "lat": -37.7995300, "lng": 144.9254700 }
    },
    {
        "id": "19866",
        "name": "Cheltenham Station",
        "address1": "Charman Road Railway Road",
        "address2": "",
        "postcode": 3192,
        "suburb": "Cheltenham",
        "position": { "lat": -37.9666500, "lng": 145.0545600 }
    },
    {
        "id": "19957",
        "name": "Windsor Station",
        "address1": "Chapel Street Peel Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Windsor",
        "position": { "lat": -37.8560500, "lng": 144.9920300 }
    },
    {
        "id": "2001",
        "name": "Bus interchange",
        "address1": "Chadstone Shopping Centre ",
        "address2": "",
        "postcode": 3148,
        "suburb": "Chadstone",
        "position": { "lat": -37.8871600, "lng": 145.0834400 }
    },
    {
        "id": "19939",
        "name": "Bentleigh Station",
        "address1": "Centre Road Nicholson Street",
        "address2": "",
        "postcode": 3204,
        "suburb": "Bentleigh",
        "position": { "lat": -37.9174300, "lng": 145.0369900 }
    },
    {
        "id": "18052",
        "name": "Tram Stop",
        "address1": "Central Pier Docklands Harbour Esplanade and La Trobe Street",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8144100, "lng": 144.9450100 }
    },
    {
        "id": "19956",
        "name": "Balaclava Station",
        "address1": "Carlisle Street William Place",
        "address2": "",
        "postcode": 3183,
        "suburb": "Balaclava",
        "position": { "lat": -37.8694900, "lng": 144.9935100 }
    },
    {
        "id": "45794",
        "name": "Cardinia Road Station",
        "address1": "Cardinia Road The Parkway",
        "address2": "",
        "postcode": 3810,
        "suburb": "Pakenham",
        "position": { "lat": -38.0712900, "lng": 145.4377900 }
    },
    {
        "id": "19893",
        "name": "Canterbury Station",
        "address1": "Canterbury Road ",
        "address2": "",
        "postcode": 3126,
        "suburb": "Canterbury",
        "position": { "lat": -37.8244900, "lng": 145.0812300 }
    },
    {
        "id": "19845",
        "name": "Tecoma Station",
        "address1": "Campbell Street ",
        "address2": "",
        "postcode": 3160,
        "suburb": "Tecoma",
        "position": { "lat": -37.9081200, "lng": 145.3430000 }
    },
    {
        "id": "20361",
        "name": "Woodend Station",
        "address1": "Calder Highway near Urquhart Street",
        "address2": "",
        "postcode": 3442,
        "suburb": "Woodend",
        "position": { "lat": -37.3592400, "lng": 144.5258500 }
    },
    {
        "id": "19929",
        "name": "Dennis Station",
        "address1": "Cain Ave ",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7791800, "lng": 145.0082400 }
    },
    {
        "id": "1231",
        "name": "7-Eleven Northbank",
        "address1": "C6 and C7 Northbank Place Retail, 545 Flinders Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8208500, "lng": 144.9566000 }
    },
    {
        "id": "19905",
        "name": "Hawthorn Station",
        "address1": "Burwood Road 7 Evansdale Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8218200, "lng": 145.0229000 }
    },
    {
        "id": "19906",
        "name": "Burnley Station",
        "address1": "Burnley Street 14 Madden Grove",
        "address2": "",
        "postcode": 3121,
        "suburb": "Burnley",
        "position": { "lat": -37.8275600, "lng": 145.0075500 }
    },
    {
        "id": "19853",
        "name": "Camberwell Station",
        "address1": "Burke Road Cookson Street",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8265600, "lng": 145.0586900 }
    },
    {
        "id": "19912",
        "name": "Gardiner Station",
        "address1": "Burke Road ",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8532800, "lng": 145.0516600 }
    },
    {
        "id": "6695",
        "name": "DUSA Bookshop Waurn Ponds",
        "address1": "Building A Alfred Deakin Drive",
        "address2": "",
        "postcode": 3217,
        "suburb": "Waurn Ponds",
        "position": { "lat": -38.1982000, "lng": 144.2984300 }
    },
    {
        "id": "6263",
        "name": "Monash Campus Pharmacy",
        "address1": "Building 10 Campus Centre, Wellington Road",
        "address2": "",
        "postcode": 3800,
        "suburb": "Clayton",
        "position": { "lat": -37.9116000, "lng": 145.1326600 }
    },
    {
        "id": "20037",
        "name": "Essendon Station",
        "address1": "Buckley Street Rose Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7560100, "lng": 144.9162000 }
    },
    {
        "id": "6783",
        "name": "Bendigo Student Association",
        "address1": "BSA La Trobe University, SU FLoor Gate 4 Edwards Road",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7792600, "lng": 144.2992400 }
    },
    {
        "id": "40220",
        "name": "Roxburgh Park Station",
        "address1": "Brunton Pde ",
        "address2": "",
        "postcode": 3064,
        "suburb": "Roxburgh Park",
        "position": { "lat": -37.6382300, "lng": 144.9354100 }
    },
    {
        "id": "19998",
        "name": "Sunbury Station",
        "address1": "Brook Street ",
        "address2": "",
        "postcode": 3429,
        "suburb": "Sunbury",
        "position": { "lat": -37.5792000, "lng": 144.7281700 }
    },
    {
        "id": "20010",
        "name": "Reservoir Station",
        "address1": "Broadway High Street",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7168900, "lng": 145.0069900 }
    },
    {
        "id": "2010",
        "name": "Bus Interchange",
        "address1": "Broadmeadows Shopping Centre ",
        "address2": "",
        "postcode": 3047,
        "suburb": "Broadmeadows",
        "position": { "lat": -37.6803700, "lng": 144.9201500 }
    },
    {
        "id": "20009",
        "name": "Ruthven Station",
        "address1": "Broadhurst Ave High Street",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7079000, "lng": 145.0095100 }
    },
    {
        "id": "20017",
        "name": "Merri Station",
        "address1": "Bridge Street Railway Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7778400, "lng": 144.9929800 }
    },
    {
        "id": "19781",
        "name": "Tram Stop",
        "address1": "Box Hill Central Shopping Centre Whitehorse Road and Bruce Street",
        "address2": "",
        "postcode": 3128,
        "suburb": "Box Hill",
        "position": { "lat": -37.8178800, "lng": 145.1223500 }
    },
    {
        "id": "19961",
        "name": "Gowrie Station",
        "address1": "Box Forest Road Sages Road",
        "address2": "",
        "postcode": 3046,
        "suburb": "Glenroy",
        "position": { "lat": -37.7006800, "lng": 144.9588800 }
    },
    {
        "id": "19497",
        "name": "Tram Stop",
        "address1": "Bourke Street Mall Swanston and Bourke Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8134000, "lng": 144.9656100 }
    },
    {
        "id": "19687",
        "name": "Tram Stop",
        "address1": "Bourke Street Mall Swanston and Bourke Streets",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8130700, "lng": 144.9653400 }
    },
    {
        "id": "31002",
        "name": "Tram stop",
        "address1": "Bourke and William Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8157500, "lng": 144.9577600 }
    },
    {
        "id": "31003",
        "name": "Tram stop",
        "address1": "Bourke and William Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8158800, "lng": 144.9577300 }
    },
    {
        "id": "31006",
        "name": "Tram stop",
        "address1": "Bourke and Spring Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8115400, "lng": 144.9722600 }
    },
    {
        "id": "31007",
        "name": "Tram stop",
        "address1": "Bourke and Spring Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8115400, "lng": 144.9726100 }
    },
    {
        "id": "31004",
        "name": "Tram stop",
        "address1": "Bourke and Russell Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8125100, "lng": 144.9689400 }
    },
    {
        "id": "31005",
        "name": "Tram stop",
        "address1": "Bourke and Russell Streets ",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8127100, "lng": 144.9685800 }
    },
    {
        "id": "19951",
        "name": "Middle Brighton Station",
        "address1": "Black Street Railway Avenue",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.9151400, "lng": 144.9963000 }
    },
    {
        "id": "19983",
        "name": "Macleod Station",
        "address1": "Birdwood Ave ",
        "address2": "",
        "postcode": 3085,
        "suburb": "Macleod",
        "position": { "lat": -37.7260100, "lng": 145.0691500 }
    },
    {
        "id": "2012",
        "name": "Bus interchange",
        "address1": "Bendigo ",
        "address2": "",
        "postcode": 3552,
        "suburb": "Bendigo",
        "position": { "lat": -36.7649200, "lng": 144.2829100 }
    },
    {
        "id": "19997",
        "name": "Seddon Station",
        "address1": "Bellairs Ave ",
        "address2": "",
        "postcode": 3011,
        "suburb": "Seddon",
        "position": { "lat": -37.8090000, "lng": 144.8956700 }
    },
    {
        "id": "19965",
        "name": "Coburg Station",
        "address1": "Bell Street Hudson Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7423400, "lng": 144.9633400 }
    },
    {
        "id": "20013",
        "name": "Bell Station",
        "address1": "Bell Street Garnet Street",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7455700, "lng": 145.0001500 }
    },
    {
        "id": "19863",
        "name": "Mordialloc Station",
        "address1": "Bear Street Albert Street",
        "address2": "",
        "postcode": 3195,
        "suburb": "Mordialloc",
        "position": { "lat": -38.0065900, "lng": 145.0876600 }
    },
    {
        "id": "20015",
        "name": "Croxton Station",
        "address1": "Beaconsfield Pde Stott Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7641000, "lng": 144.9970600 }
    },
    {
        "id": "19855",
        "name": "Frankston Station",
        "address1": "Beach Street Fletcher Road",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1429900, "lng": 145.1261700 }
    },
    {
        "id": "2000",
        "name": "Bus interchange",
        "address1": "Bayside Shopping Centre",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1411800, "lng": 145.1242700 }
    },
    {
        "id": "19952",
        "name": "North Brighton Station",
        "address1": "Bay Street Warleigh Grove",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.9048800, "lng": 145.0026000 }
    },
    {
        "id": "19834",
        "name": "Baxter Station",
        "address1": "Baxter-Tooradin Road Station Cres",
        "address2": "",
        "postcode": 3911,
        "suburb": "Baxter",
        "position": { "lat": -38.1940500, "lng": 145.1605300 }
    },
    {
        "id": "19960",
        "name": "Upfield Station",
        "address1": "Barry Road Dunstan Pde",
        "address2": "",
        "postcode": 3048,
        "suburb": "Coolaroo",
        "position": { "lat": -37.6660800, "lng": 144.9467500 }
    },
    {
        "id": "19947",
        "name": "Hawksburn Station",
        "address1": "Barnsbury Road Luxton Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8445900, "lng": 145.0021400 }
    },
    {
        "id": "2009",
        "name": "Bus interchange",
        "address1": "Ballarat Railway Station ",
        "address2": "",
        "postcode": 3350,
        "suburb": "Ballarat",
        "position": { "lat": -37.5586500, "lng": 143.8590200 }
    },
    {
        "id": "19865",
        "name": "Mentone Station",
        "address1": "Balcombe Road Como Pde",
        "address2": "",
        "postcode": 3194,
        "suburb": "Mentone",
        "position": { "lat": -37.9818700, "lng": 145.0651700 }
    },
    {
        "id": "19924",
        "name": "Aircraft Station",
        "address1": "Aviation Road Railway Ave",
        "address2": "",
        "postcode": 3028,
        "suburb": "Laverton",
        "position": { "lat": -37.8666000, "lng": 144.7608100 }
    },
    {
        "id": "19903",
        "name": "Auburn Station",
        "address1": "Auburn Road Lilydale Grove",
        "address2": "",
        "postcode": 3123,
        "suburb": "Hawthorn East",
        "position": { "lat": -37.8224000, "lng": 145.0458400 }
    },
    {
        "id": "20292",
        "name": "Ballan Station",
        "address1": "Atkinson Street ",
        "address2": "",
        "postcode": 3342,
        "suburb": "Ballan",
        "position": { "lat": -37.6044200, "lng": 144.2258300 }
    },
    {
        "id": "20022",
        "name": "Tottenham Station",
        "address1": "Ashley Street Sunshine Road",
        "address2": "",
        "postcode": 3012,
        "suburb": "West Footscray",
        "position": { "lat": -37.7992600, "lng": 144.8629500 }
    },
    {
        "id": "31000",
        "name": "Tram stop",
        "address1": "Arts Centre.St Kilda Road ",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8217800, "lng": 144.9694800 }
    },
    {
        "id": "31001",
        "name": "Tram stop",
        "address1": "Arts Centre.St Kilda Road ",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8218200, "lng": 144.9693800 }
    },
    {
        "id": "46468",
        "name": "Williams Landing Station",
        "address1": "Altair street Kendall Street",
        "address2": "",
        "postcode": 3027,
        "suburb": "Williams Landing",
        "position": { "lat": -37.8698700, "lng": 144.7474500 }
    },
    {
        "id": "19967",
        "name": "Anstey Station",
        "address1": "Albion Street Orient Grove",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7612400, "lng": 144.9606900 }
    },
    {
        "id": "19847",
        "name": "Alamein Station",
        "address1": "Alamein Avenue Ashburn Grove",
        "address2": "",
        "postcode": 3147,
        "suburb": "Ashburton",
        "position": { "lat": -37.8683200, "lng": 145.0796600 }
    },
    {
        "id": "6574",
        "name": "Pakenham Newsxpress",
        "address1": "99-101 Main Street",
        "address2": "",
        "postcode": 3810,
        "suburb": "Pakenham",
        "position": { "lat": -38.0779600, "lng": 145.4819400 }
    },
    {
        "id": "9004",
        "name": "Market Square Post Office",
        "address1": "99 Moorabool Street",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1478000, "lng": 144.3607800 }
    },
    {
        "id": "1235",
        "name": "7-Eleven Armadale",
        "address1": "975 High Street",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8554000, "lng": 145.0206200 }
    },
    {
        "id": "6164",
        "name": "J and R Grocery",
        "address1": "974 High Street",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7171900, "lng": 145.0078100 }
    },
    {
        "id": "6713",
        "name": "Trafalgar Newsagency",
        "address1": "97 Princes Highway",
        "address2": "",
        "postcode": 3824,
        "suburb": "Trafalgar",
        "position": { "lat": -38.2079300, "lng": 146.1558500 }
    },
    {
        "id": "6147",
        "name": "Mornington Authorised Newsagency",
        "address1": "97 Main Street",
        "address2": "",
        "postcode": 3931,
        "suburb": "Mornington",
        "position": { "lat": -38.2197500, "lng": 145.0385400 }
    },
    {
        "id": "6040",
        "name": "Cotham Authorised Newsagency",
        "address1": "97 Cotham Road",
        "address2": "",
        "postcode": 3101,
        "suburb": "Kew",
        "position": { "lat": -37.8074600, "lng": 145.0383500 }
    },
    {
        "id": "6655",
        "name": "Australia Golden Stone Pty Ltd",
        "address1": "96 Carlisle Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8676100, "lng": 144.9862900 }
    },
    {
        "id": "6254",
        "name": "Woodhouse Grove Pharmacy",
        "address1": "953 Station Street",
        "address2": "",
        "postcode": 3129,
        "suburb": "Box Hill North",
        "position": { "lat": -37.8013000, "lng": 145.1267800 }
    },
    {
        "id": "1322",
        "name": "7-Eleven Rowville",
        "address1": "951 Wellington Road (Corner Stud Road)",
        "address2": "",
        "postcode": 3178,
        "suburb": "Rowville",
        "position": { "lat": -37.9277000, "lng": 145.2341100 }
    },
    {
        "id": "6726",
        "name": "Collins Newsagency ",
        "address1": "95 Mollison Street",
        "address2": "",
        "postcode": 3444,
        "suburb": "Kyneton ",
        "position": { "lat": -37.2486200, "lng": 144.4530100 }
    },
    {
        "id": "6408",
        "name": "Big H Milk Bar",
        "address1": "95 Chapel Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8652000, "lng": 144.9908200 }
    },
    {
        "id": "1230",
        "name": "7-Eleven Cranbourne North",
        "address1": "945 South Gippsland Highway",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne North",
        "position": { "lat": -38.0745400, "lng": 145.2722800 }
    },
    {
        "id": "1062",
        "name": "7-Eleven Richmond",
        "address1": "94 Church Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8136500, "lng": 144.9996700 }
    },
    {
        "id": "1244",
        "name": "7-Eleven Bayswater East",
        "address1": "936 Mountain Highway (Corner Dorset Road)",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater East",
        "position": { "lat": -37.8380100, "lng": 145.2865000 }
    },
    {
        "id": "6686",
        "name": "Burrows Newsagency",
        "address1": "93 Princes Way",
        "address2": "",
        "postcode": 3818,
        "suburb": "Drouin",
        "position": { "lat": -38.1354900, "lng": 145.8560800 }
    },
    {
        "id": "6613",
        "name": "Batman Post and Tatts",
        "address1": "93 Gaffney Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7335300, "lng": 144.9592600 }
    },
    {
        "id": "6581",
        "name": "Ascot Vale Railway Station Kiosk",
        "address1": "91 North Street",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7752900, "lng": 144.9218900 }
    },
    {
        "id": "6182",
        "name": "Ocean Blue Mixed Business",
        "address1": "90 John Fawkner Drive",
        "address2": "",
        "postcode": 3802,
        "suburb": "Endeavour Hills",
        "position": { "lat": -37.9796800, "lng": 145.2691300 }
    },
    {
        "id": "6785",
        "name": "Woodland Street Cellars",
        "address1": "9 Woodland Street ",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7434400, "lng": 144.9266100 }
    },
    {
        "id": "6125",
        "name": "Harding Street Milk Bar",
        "address1": "89A Harding Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7458000, "lng": 144.9747100 }
    },
    {
        "id": "1304",
        "name": "7-Eleven Mornington",
        "address1": "893 Nepean Highway (Corner Spray Street)",
        "address2": "",
        "postcode": 3931,
        "suburb": "Mornington",
        "position": { "lat": -38.2280000, "lng": 145.0462500 }
    },
    {
        "id": "6134",
        "name": "Q Deli Milk Bar",
        "address1": "89-91 Willsmere Road",
        "address2": "",
        "postcode": 3101,
        "suburb": "Kew",
        "position": { "lat": -37.7957700, "lng": 145.0357700 }
    },
    {
        "id": "6589",
        "name": "Doncaster West News and Tatts",
        "address1": "89 High Street",
        "address2": "",
        "postcode": 3108,
        "suburb": "Doncaster",
        "position": { "lat": -37.7818100, "lng": 145.1101000 }
    },
    {
        "id": "6221",
        "name": "Moomba Park Newsagency",
        "address1": "89 Anderson Road",
        "address2": "",
        "postcode": 3060,
        "suburb": "Fawkner",
        "position": { "lat": -37.6959800, "lng": 144.9684500 }
    },
    {
        "id": "1303",
        "name": "7-Eleven Moonee Ponds",
        "address1": "876 Mt Alexander Road (Corner Buckley Street)",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7575200, "lng": 144.9198700 }
    },
    {
        "id": "6217",
        "name": "Box Hill South Newsagency",
        "address1": "870 Canterbury Road",
        "address2": "",
        "postcode": 3128,
        "suburb": "Box Hill South",
        "position": { "lat": -37.8288500, "lng": 145.1213400 }
    },
    {
        "id": "6185",
        "name": "Warren Village Newsagency",
        "address1": "87 Warren Road",
        "address2": "",
        "postcode": 3195,
        "suburb": "Mordialloc",
        "position": { "lat": -37.9944700, "lng": 145.0922900 }
    },
    {
        "id": "6754",
        "name": "Nextra Moe Lotto",
        "address1": "87 Albert Street",
        "address2": "",
        "postcode": 3825,
        "suburb": "Moe",
        "position": { "lat": -38.1746600, "lng": 146.2603400 }
    },
    {
        "id": "1033",
        "name": "7-Eleven Port Melbourne",
        "address1": "86 Crockford Street",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8343500, "lng": 144.9492100 }
    },
    {
        "id": "6776",
        "name": "Australia Xinwuang",
        "address1": "85 Raleigh Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Maribyrnong",
        "position": { "lat": -37.7691500, "lng": 144.8922400 }
    },
    {
        "id": "6092",
        "name": "Australia Xinwuang",
        "address1": "85 Raleigh Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Maribyrnong",
        "position": { "lat": -37.7691500, "lng": 144.8922400 }
    },
    {
        "id": "6395",
        "name": "IGA X-press",
        "address1": "85 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8164800, "lng": 144.9610800 }
    },
    {
        "id": "6510",
        "name": "Essendon Roundabout Newsagency",
        "address1": "85 Fletcher Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7551300, "lng": 144.9185200 }
    },
    {
        "id": "1277",
        "name": "7-Eleven Mountain Gate",
        "address1": "844 Burwood Highway",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.8822100, "lng": 145.2743500 }
    },
    {
        "id": "1163",
        "name": "7-Eleven South Morang",
        "address1": "840 Plenty Road",
        "address2": "",
        "postcode": 3752,
        "suburb": "South Morang",
        "position": { "lat": -37.6492200, "lng": 145.0906300 }
    },
    {
        "id": "6189",
        "name": "Juline&#039;s Noodle House",
        "address1": "84 St Georges Road",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7742600, "lng": 144.9905700 }
    },
    {
        "id": "1263",
        "name": "7-Eleven Corio",
        "address1": "83B Purnell Road (Corner Bacchus Marsh Road)",
        "address2": "",
        "postcode": 3214,
        "suburb": "Corio",
        "position": { "lat": -38.0744600, "lng": 144.3580600 }
    },
    {
        "id": "1175",
        "name": "7-Eleven North Melbourne",
        "address1": "83 Errol Street",
        "address2": "",
        "postcode": 3051,
        "suburb": "North Melbourne",
        "position": { "lat": -37.8031900, "lng": 144.9493200 }
    },
    {
        "id": "6743",
        "name": "Deer Park Lotto Post Office",
        "address1": "827A Ballarat Road",
        "address2": "",
        "postcode": 3023,
        "suburb": "Deer Park",
        "position": { "lat": -37.7700900, "lng": 144.7722200 }
    },
    {
        "id": "9011",
        "name": "Seymour Post Office",
        "address1": "82 Station Street",
        "address2": "",
        "postcode": 3660,
        "suburb": "Seymour",
        "position": { "lat": -37.0247100, "lng": 145.1358300 }
    },
    {
        "id": "1093",
        "name": "7-Eleven Thornbury",
        "address1": "813 High Street",
        "address2": "",
        "postcode": 3071,
        "suburb": "Thornbury",
        "position": { "lat": -37.7559100, "lng": 145.0006700 }
    },
    {
        "id": "6763",
        "name": "Spotswood LPO News and Tatts",
        "address1": "81 Hudsons Road",
        "address2": "",
        "postcode": 3015,
        "suburb": "Spotswood",
        "position": { "lat": -37.8297900, "lng": 144.8854800 }
    },
    {
        "id": "6135",
        "name": "Geoffrey and Lucy Thiele Milk Bar",
        "address1": "81 Dundas Street",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7529500, "lng": 145.0087500 }
    },
    {
        "id": "6306",
        "name": "Blackburn Station Milk Bar",
        "address1": "80C South Parade",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn",
        "position": { "lat": -37.8207600, "lng": 145.1507400 }
    },
    {
        "id": "1203",
        "name": "7-Eleven Acland Street",
        "address1": "80A Acland Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8672800, "lng": 144.9786300 }
    },
    {
        "id": "9007",
        "name": "The Morwell Business Centre",
        "address1": "8-20 Bridle Road",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2329600, "lng": 146.4319800 }
    },
    {
        "id": "1250",
        "name": "7-Eleven Box Hill",
        "address1": "786 Whitehorse Road (Corner Elgar Road)",
        "address2": "",
        "postcode": 3128,
        "suburb": "Box Hill",
        "position": { "lat": -37.8171000, "lng": 145.1143200 }
    },
    {
        "id": "6393",
        "name": "Young Street Newsagency Frankston",
        "address1": "78 Young Street",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1435800, "lng": 145.1252100 }
    },
    {
        "id": "6027",
        "name": "Gum Nut Milk Bar",
        "address1": "78 Burwood Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8216300, "lng": 145.0249500 }
    },
    {
        "id": "6790",
        "name": "The Hidden Kitchen",
        "address1": "77A Mathis Avenue",
        "address2": "",
        "postcode": 3941,
        "suburb": "Tootgarook",
        "position": { "lat": -38.3829100, "lng": 144.8409500 }
    },
    {
        "id": "1040",
        "name": "7-Eleven Fairfield",
        "address1": "779-785 Heidelberg Road",
        "address2": "",
        "postcode": 3078,
        "suburb": "Fairfield",
        "position": { "lat": -37.7803400, "lng": 145.0325500 }
    },
    {
        "id": "6198",
        "name": "Glenroy Newsagency",
        "address1": "773 Pascoe Vale Road",
        "address2": "",
        "postcode": 3046,
        "suburb": "Glenroy",
        "position": { "lat": -37.7054000, "lng": 144.9157300 }
    },
    {
        "id": "6547",
        "name": "Middle Camberwell Post Lotto",
        "address1": "772 Riversdale Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8340200, "lng": 145.0782900 }
    },
    {
        "id": "1269",
        "name": "7-Eleven Donvale",
        "address1": "77-79 Mitcham Road",
        "address2": "",
        "postcode": 3111,
        "suburb": "Donvale",
        "position": { "lat": -37.7971700, "lng": 145.1802200 }
    },
    {
        "id": "6724",
        "name": "Garfield Post Office",
        "address1": "77 Main Street",
        "address2": "",
        "postcode": 3814,
        "suburb": "Garfield",
        "position": { "lat": -38.0918500, "lng": 145.6755200 }
    },
    {
        "id": "6646",
        "name": "North Balwyn Newsagency",
        "address1": "77 Doncaster Road",
        "address2": "",
        "postcode": 3104,
        "suburb": "Balwyn North",
        "position": { "lat": -37.7926800, "lng": 145.0713600 }
    },
    {
        "id": "6621",
        "name": "Seven Star Milkbar",
        "address1": "768 Hawthorn Road",
        "address2": "",
        "postcode": 3187,
        "suburb": "Brighton East",
        "position": { "lat": -37.9136000, "lng": 145.0167900 }
    },
    {
        "id": "6525",
        "name": "Plenty Road Cellars",
        "address1": "766 Plenty Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7275400, "lng": 145.0201400 }
    },
    {
        "id": "6172",
        "name": "East Bentleigh Tatts and News",
        "address1": "761 Centre Road",
        "address2": "",
        "postcode": 3165,
        "suburb": "Bentleigh East",
        "position": { "lat": -37.9208600, "lng": 145.0574000 }
    },
    {
        "id": "1347",
        "name": "7Eleven Lynbrook",
        "address1": "760 South Gippsland Highway",
        "address2": "",
        "postcode": 3975,
        "suburb": "Lynbrook",
        "position": { "lat": -38.0592200, "lng": 145.2626800 }
    },
    {
        "id": "6715",
        "name": "Wines on Poath",
        "address1": "76 Poath Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Hughesdale",
        "position": { "lat": -37.8937300, "lng": 145.0770400 }
    },
    {
        "id": "6284",
        "name": "Altona Newsagency and Toyworld",
        "address1": "76 Pier Street",
        "address2": "",
        "postcode": 3018,
        "suburb": "Altona",
        "position": { "lat": -37.8679800, "lng": 144.8305300 }
    },
    {
        "id": "6465",
        "name": "Pascoe Vale Central News",
        "address1": "76 Cumberland Road",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale",
        "position": { "lat": -37.7322800, "lng": 144.9384000 }
    },
    {
        "id": "30001",
        "name": "PTV Hub",
        "address1": "750 Collins Street ",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8202100, "lng": 144.9494100 }
    },
    {
        "id": "1131",
        "name": "7-Eleven St Kilda",
        "address1": "75 Fitzroy Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8608000, "lng": 144.9759100 }
    },
    {
        "id": "1292",
        "name": "7-Eleven Tooronga Valley",
        "address1": "747-755 Toorak Road",
        "address2": "",
        "postcode": 3123,
        "suburb": "Hawthorn East",
        "position": { "lat": -37.8446300, "lng": 145.0419200 }
    },
    {
        "id": "6080",
        "name": "Camberwell News and Lotto",
        "address1": "741 Burke Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8304300, "lng": 145.0567000 }
    },
    {
        "id": "6593",
        "name": "Seddon Newsagency and Lotto",
        "address1": "74 Charles Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Seddon",
        "position": { "lat": -37.8064700, "lng": 144.8914100 }
    },
    {
        "id": "6307",
        "name": "WG Convenience",
        "address1": "73 Westgarth Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7810900, "lng": 144.9984800 }
    },
    {
        "id": "6599",
        "name": "Railway Milk Bar",
        "address1": "73 Railway Avenue",
        "address2": "",
        "postcode": 3028,
        "suburb": "Laverton",
        "position": { "lat": -37.8648200, "lng": 144.7708300 }
    },
    {
        "id": "1318",
        "name": "7-Eleven Prahran East",
        "address1": "728 Malvern Road (Corner Orrong Road)",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran East",
        "position": { "lat": -37.8494800, "lng": 145.0117100 }
    },
    {
        "id": "1286",
        "name": "7-Eleven Glen Waverley",
        "address1": "726-730 Waverley Road (Corner Springvale Road)",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8893400, "lng": 145.1646300 }
    },
    {
        "id": "1010",
        "name": "7-Eleven Reservoir",
        "address1": "720 Gilbert Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7186700, "lng": 144.9936800 }
    },
    {
        "id": "1225",
        "name": "7-Eleven Frankston",
        "address1": "72 Young Street",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1433700, "lng": 145.1252600 }
    },
    {
        "id": "6246",
        "name": "Baxter Post Office",
        "address1": "72 Baxter Tooradin Road",
        "address2": "",
        "postcode": 3911,
        "suburb": "Baxter",
        "position": { "lat": -38.1952200, "lng": 145.1580400 }
    },
    {
        "id": "6659",
        "name": "GoGo Cafe",
        "address1": "716 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7605100, "lng": 144.9633800 }
    },
    {
        "id": "6286",
        "name": "North Carlton Newsagency",
        "address1": "711 Nicholson Street",
        "address2": "",
        "postcode": 3054,
        "suburb": "Carlton North",
        "position": { "lat": -37.7827900, "lng": 144.9773700 }
    },
    {
        "id": "1274",
        "name": "7-Eleven Epping North",
        "address1": "705 High Street (Corner Cooper Street)",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6513600, "lng": 145.0235300 }
    },
    {
        "id": "6031",
        "name": "Normanby Pharmacy",
        "address1": "705 High Street",
        "address2": "",
        "postcode": 3071,
        "suburb": "Thornbury",
        "position": { "lat": -37.7594200, "lng": 145.0002500 }
    },
    {
        "id": "6333",
        "name": "Keilor News Post and Lotto",
        "address1": "700 Old Calder Highway",
        "address2": "",
        "postcode": 3036,
        "suburb": "Keilor",
        "position": { "lat": -37.7188700, "lng": 144.8347400 }
    },
    {
        "id": "6643",
        "name": "Seymour Street Newsagency",
        "address1": "70 Seymour Street",
        "address2": "",
        "postcode": 3844,
        "suburb": "Traralgon",
        "position": { "lat": -38.1958500, "lng": 146.5369700 }
    },
    {
        "id": "1325",
        "name": "7-Eleven St Albans",
        "address1": "70 Kings Road (Corner Gillespie Road)",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans",
        "position": { "lat": -37.7347500, "lng": 144.7811900 }
    },
    {
        "id": "1084",
        "name": "7-Eleven South Oakleigh",
        "address1": "699-701 Warrigal Road",
        "address2": "",
        "postcode": 3167,
        "suburb": "Oakleigh South",
        "position": { "lat": -37.9178800, "lng": 145.0833400 }
    },
    {
        "id": "1087",
        "name": "7-Eleven Armadale",
        "address1": "697-699 High Street",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8541800, "lng": 145.0114100 }
    },
    {
        "id": "6423",
        "name": "Junction Authorised Newsagency",
        "address1": "69-71 Hawthorn Road",
        "address2": "",
        "postcode": 3161,
        "suburb": "Caulfield North",
        "position": { "lat": -37.8732300, "lng": 145.0247300 }
    },
    {
        "id": "6788",
        "name": "Deepdene Licenced Post Office",
        "address1": "69 Whitehorse Road",
        "address2": "",
        "postcode": 3103,
        "suburb": "Deepdene",
        "position": { "lat": -37.8106100, "lng": 145.0651300 }
    },
    {
        "id": "6210",
        "name": "North Sunshine Post, News and Lotto",
        "address1": "69 McIntyre Road",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine North",
        "position": { "lat": -37.7692100, "lng": 144.8299800 }
    },
    {
        "id": "6707",
        "name": "Nextra Bridge Mall",
        "address1": "68-70 Bridge Mall",
        "address2": "",
        "postcode": 3350,
        "suburb": "Ballarat",
        "position": { "lat": -37.5631100, "lng": 143.8629100 }
    },
    {
        "id": "6786",
        "name": "Broadford News and Tatts",
        "address1": "67 High Street",
        "address2": "",
        "postcode": 3658,
        "suburb": "Broadford",
        "position": { "lat": -37.2046800, "lng": 145.0461500 }
    },
    {
        "id": "1006",
        "name": "7-Eleven Doncaster",
        "address1": "669-671 Doncaster Road",
        "address2": "",
        "postcode": 3108,
        "suburb": "Doncaster",
        "position": { "lat": -37.7870700, "lng": 145.1290800 }
    },
    {
        "id": "6124",
        "name": "Reservoir Lucky Lotto",
        "address1": "669 Plenty Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7306300, "lng": 145.0149600 }
    },
    {
        "id": "6063",
        "name": "Glenferrie Newsagency and Lotto",
        "address1": "660 Glenferrie Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8217100, "lng": 145.0357000 }
    },
    {
        "id": "1201",
        "name": "7-Eleven Sunshine",
        "address1": "66-72 Hampshire Road",
        "address2": "",
        "postcode": 3020,
        "suburb": "Melbourne",
        "position": { "lat": -37.7916800, "lng": 144.8312200 }
    },
    {
        "id": "6641",
        "name": "Seymour News and Lotto",
        "address1": "66 Station Street",
        "address2": "",
        "postcode": 3660,
        "suburb": "Seymour",
        "position": { "lat": -37.0245500, "lng": 145.1364700 }
    },
    {
        "id": "6416",
        "name": "Victoria Harbour Pharmacy and News",
        "address1": "66 Merchant Street",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8204800, "lng": 144.9441700 }
    },
    {
        "id": "6054",
        "name": "Friendly Grocer IGA",
        "address1": "655 High Street",
        "address2": "",
        "postcode": 3102,
        "suburb": "Kew East",
        "position": { "lat": -37.7984800, "lng": 145.0520500 }
    },
    {
        "id": "6478",
        "name": "Brunswick Newsagency",
        "address1": "650 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7622100, "lng": 144.9631700 }
    },
    {
        "id": "6236",
        "name": "Jin Mini Mart",
        "address1": "65-67 James Cook Drive",
        "address2": "",
        "postcode": 3802,
        "suburb": "Endeavour Hills",
        "position": { "lat": -37.9802700, "lng": 145.2455200 }
    },
    {
        "id": "6321",
        "name": "Kingsway Authorised Newsagency",
        "address1": "65 Kingsway",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8797500, "lng": 145.1635500 }
    },
    {
        "id": "1002",
        "name": "7-Eleven Dandenong",
        "address1": "65 Clow Street",
        "address2": "",
        "postcode": 3175,
        "suburb": "Dandenong",
        "position": { "lat": -37.9851600, "lng": 145.2204300 }
    },
    {
        "id": "6779",
        "name": "Gilbert Road Milk Bar",
        "address1": "647 Gilbert Road",
        "address2": "",
        "postcode": 3073,
        "suburb": "Reservoir",
        "position": { "lat": -37.7272600, "lng": 144.9918100 }
    },
    {
        "id": "6798",
        "name": "Seville Village Pharmacy",
        "address1": "644 Warburton Highway",
        "address2": "",
        "postcode": 3139,
        "suburb": "Seville",
        "position": { "lat": -37.7779300, "lng": 145.4591300 }
    },
    {
        "id": "1021",
        "name": "7-Eleven Blackburn North",
        "address1": "64 Springfield Road",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn North",
        "position": { "lat": -37.8175800, "lng": 145.1222700 }
    },
    {
        "id": "6190",
        "name": "Circle News and Lotto",
        "address1": "63 The Circle",
        "address2": "",
        "postcode": 3025,
        "suburb": "Altona North",
        "position": { "lat": -37.8362800, "lng": 144.8632700 }
    },
    {
        "id": "6208",
        "name": "Mackie News and Post",
        "address1": "63 Mackie Road",
        "address2": "",
        "postcode": 3165,
        "suburb": "Bentleigh East",
        "position": { "lat": -37.9158100, "lng": 145.0745000 }
    },
    {
        "id": "6701",
        "name": "Henry Street Cellars",
        "address1": "63 Henry Street",
        "address2": "",
        "postcode": 3844,
        "suburb": "Traralgon",
        "position": { "lat": -38.1974400, "lng": 146.5237900 }
    },
    {
        "id": "6136",
        "name": "Diamond Creek Newsagency",
        "address1": "62A Hurstbridge Road",
        "address2": "",
        "postcode": 3089,
        "suburb": "Diamond Creek",
        "position": { "lat": -37.6747300, "lng": 145.1584800 }
    },
    {
        "id": "6354",
        "name": "Camberwell Centre Newsagency",
        "address1": "628 Burke Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8295100, "lng": 145.0572900 }
    },
    {
        "id": "6563",
        "name": "Chaddy Mart",
        "address1": "621 Warrigal Road",
        "address2": "",
        "postcode": 3148,
        "suburb": "Chadstone",
        "position": { "lat": -37.8745500, "lng": 145.0919300 }
    },
    {
        "id": "6313",
        "name": "Westgarth Pharmacy",
        "address1": "62 High Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7807300, "lng": 144.9969200 }
    },
    {
        "id": "6570",
        "name": "Macleod Newsagency",
        "address1": "62 Aberdeen Road",
        "address2": "",
        "postcode": 3085,
        "suburb": "Macleod",
        "position": { "lat": -37.7266900, "lng": 145.0706100 }
    },
    {
        "id": "1336",
        "name": "7-Eleven Wantirna",
        "address1": "619 Boronia Road",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna",
        "position": { "lat": -37.8484800, "lng": 145.2318100 }
    },
    {
        "id": "1239",
        "name": "7-Eleven Tarneit",
        "address1": "618 Tarneit Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Tarneit",
        "position": { "lat": -37.8338600, "lng": 144.6721100 }
    },
    {
        "id": "1072",
        "name": "7-Eleven Vermont",
        "address1": "612-626 Canterbury Road",
        "address2": "",
        "postcode": 3133,
        "suburb": "Vermont",
        "position": { "lat": -37.8362100, "lng": 145.1961100 }
    },
    {
        "id": "6719",
        "name": "Marc Clavin Pharmacy",
        "address1": "61 Ocean Beach Road",
        "address2": "",
        "postcode": 3943,
        "suburb": "Sorrento",
        "position": { "lat": -38.3394400, "lng": 144.7399300 }
    },
    {
        "id": "1334",
        "name": "7-Eleven Tullamarine",
        "address1": "61 Mickleham Road (Corner Melrose Drive)",
        "address2": "",
        "postcode": 3043,
        "suburb": "Tullamarine",
        "position": { "lat": -37.6986200, "lng": 144.8799700 }
    },
    {
        "id": "6717",
        "name": "Morwell Foodworks",
        "address1": "61 Bridle Road",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2281500, "lng": 146.4324900 }
    },
    {
        "id": "1259",
        "name": "7-Eleven Chadstone",
        "address1": "609 Waverley Road (Corner Batesford Road)",
        "address2": "",
        "postcode": 3148,
        "suburb": "Chadstone",
        "position": { "lat": -37.8769900, "lng": 145.0860800 }
    },
    {
        "id": "6188",
        "name": "Black Rock News and Lotto",
        "address1": "606 Balcombe Road",
        "address2": "",
        "postcode": 3193,
        "suburb": "Black Rock",
        "position": { "lat": -37.9754900, "lng": 145.0167300 }
    },
    {
        "id": "1252",
        "name": "7-Eleven Brandon Park",
        "address1": "602 Ferntree Gully Road (Corner Springvale Road)",
        "address2": "",
        "postcode": 3170,
        "suburb": "Brandon Park",
        "position": { "lat": -37.9040000, "lng": 145.1618900 }
    },
    {
        "id": "6457",
        "name": "Vermont Authorised Newsagency",
        "address1": "600 Canterbury Road",
        "address2": "",
        "postcode": 3133,
        "suburb": "Vermont",
        "position": { "lat": -37.8363600, "lng": 145.1948900 }
    },
    {
        "id": "6057",
        "name": "Metro Petroleum",
        "address1": "60-64 Holmes Street",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7586200, "lng": 144.9747400 }
    },
    {
        "id": "6041",
        "name": "Eaglemont Post and News",
        "address1": "60-62 Silverdale Road",
        "address2": "",
        "postcode": 3084,
        "suburb": "Eaglemont",
        "position": { "lat": -37.7639000, "lng": 145.0538500 }
    },
    {
        "id": "6006",
        "name": "Scole Lotto and News",
        "address1": "6, 90-108 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7756400, "lng": 144.9617000 }
    },
    {
        "id": "6738",
        "name": "Mordialloc Beachside Pharmacy",
        "address1": "596 Main Street",
        "address2": "",
        "postcode": 3195,
        "suburb": "Mordialloc",
        "position": { "lat": -38.0075500, "lng": 145.0867300 }
    },
    {
        "id": "1023",
        "name": "7-Eleven Hawthorn",
        "address1": "593-603 Glenferrie Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8243000, "lng": 145.0348200 }
    },
    {
        "id": "1215",
        "name": "7-Eleven 592 Chapel Street",
        "address1": "592 Chapel Street",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8398600, "lng": 144.9957500 }
    },
    {
        "id": "6596",
        "name": "Lucky Star Milk Bar",
        "address1": "59 Union Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7780400, "lng": 144.9149300 }
    },
    {
        "id": "6436",
        "name": "Pinewood Authorised Newsagency",
        "address1": "59 The Centreway",
        "address2": "",
        "postcode": 3149,
        "suburb": "Mount Waverley",
        "position": { "lat": -37.8909600, "lng": 145.1437500 }
    },
    {
        "id": "6059",
        "name": "Yarraville and Footscray Newsagency",
        "address1": "59 Anderson Street",
        "address2": "",
        "postcode": 3013,
        "suburb": "Yarraville",
        "position": { "lat": -37.8166900, "lng": 144.8898200 }
    },
    {
        "id": "6241",
        "name": "Winning Lotteries",
        "address1": "59 Alfrieda Street",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans",
        "position": { "lat": -37.7423300, "lng": 144.8006500 }
    },
    {
        "id": "6650",
        "name": "Park Orchards Milk Bar",
        "address1": "588 Park Road",
        "address2": "",
        "postcode": 3114,
        "suburb": "Park Orchards",
        "position": { "lat": -37.7792000, "lng": 145.2169800 }
    },
    {
        "id": "1310",
        "name": "7-Eleven Sandown",
        "address1": "585 Princes Highway (Corner Corrigan Rd)",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9480700, "lng": 145.1724700 }
    },
    {
        "id": "1345",
        "name": "7-Eleven Black Rock",
        "address1": "583-589 Balcombe Road",
        "address2": "",
        "postcode": 3193,
        "suburb": "Black Rock",
        "position": { "lat": -37.9757000, "lng": 145.0174200 }
    },
    {
        "id": "1129",
        "name": "7-Eleven Springvale Sth",
        "address1": "581 Springvale Road",
        "address2": "",
        "postcode": 3172,
        "suburb": "Springvale South",
        "position": { "lat": -37.9722200, "lng": 145.1486000 }
    },
    {
        "id": "6501",
        "name": "Carnegie Newsagency and Tatts",
        "address1": "58 Koornang Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Carnegie",
        "position": { "lat": -37.8866300, "lng": 145.0577400 }
    },
    {
        "id": "6377",
        "name": "Five Star Milk Bar",
        "address1": "58 Acland Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8666000, "lng": 144.9780700 }
    },
    {
        "id": "6113",
        "name": "North Carlton Foods",
        "address1": "577 Lygon Street",
        "address2": "",
        "postcode": 3054,
        "suburb": "Carlton North",
        "position": { "lat": -37.7827600, "lng": 144.9697900 }
    },
    {
        "id": "2534",
        "name": "7-Eleven Hoppers Crossing",
        "address1": "57-69 Forsyth Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8649600, "lng": 144.7323530 }
    },
    {
        "id": "1216",
        "name": "7-Eleven 57 Fitzroy Street",
        "address1": "57 Fitzroy Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8612800, "lng": 144.9752500 }
    },
    {
        "id": "6104",
        "name": "IGA Express Caulfield South",
        "address1": "566 Hawthorn Road",
        "address2": "",
        "postcode": 3162,
        "suburb": "Caulfield South",
        "position": { "lat": -37.9009700, "lng": 145.0190200 }
    },
    {
        "id": "1329",
        "name": "7-Eleven Taylors Lakes",
        "address1": "565 Sunshine Avenue (Corner Keilor Melton Road )",
        "address2": "",
        "postcode": 3038,
        "suburb": "Taylors Lakes",
        "position": { "lat": -37.7025400, "lng": 144.8011700 }
    },
    {
        "id": "6649",
        "name": "Southvale Newsagency",
        "address1": "565 Springvale Road",
        "address2": "",
        "postcode": 3172,
        "suburb": "Springvale South",
        "position": { "lat": -37.9714300, "lng": 145.1489800 }
    },
    {
        "id": "6218",
        "name": "Hastings Newsagents",
        "address1": "56 High Street",
        "address2": "",
        "postcode": 3915,
        "suburb": "Hastings",
        "position": { "lat": -38.3075500, "lng": 145.1909900 }
    },
    {
        "id": "1083",
        "name": "7-Eleven Moonee Ponds",
        "address1": "556-566 Mount Alexander Road",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7732100, "lng": 144.9273100 }
    },
    {
        "id": "6648",
        "name": "Linden&#039;s Milk Bar",
        "address1": "554A High Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8538300, "lng": 145.0067200 }
    },
    {
        "id": "1051",
        "name": "7-Eleven Frankston",
        "address1": "55-57 Beach Street",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1421300, "lng": 145.1304700 }
    },
    {
        "id": "1226",
        "name": "7-Eleven Parkville",
        "address1": "55 Royal Parade",
        "address2": "",
        "postcode": 3052,
        "suburb": "Parkville",
        "position": { "lat": -37.7953400, "lng": 144.9576400 }
    },
    {
        "id": "6233",
        "name": "Banyule Newsagency",
        "address1": "55 Greville Road",
        "address2": "",
        "postcode": 3084,
        "suburb": "Rosanna",
        "position": { "lat": -37.7461800, "lng": 145.0772900 }
    },
    {
        "id": "6138",
        "name": "Newry Food Store",
        "address1": "549 Brunswick Street",
        "address2": "",
        "postcode": 3068,
        "suburb": "Fitzroy North",
        "position": { "lat": -37.7905000, "lng": 144.9795700 }
    },
    {
        "id": "6122",
        "name": "Surrey Hills Convenience Store",
        "address1": "538 Whitehorse Road",
        "address2": "",
        "postcode": 3127,
        "suburb": "Surrey Hills",
        "position": { "lat": -37.8151500, "lng": 145.0990000 }
    },
    {
        "id": "6042",
        "name": "Glenferrie South Newsagency",
        "address1": "531 Glenferrie Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8291400, "lng": 145.0339200 }
    },
    {
        "id": "6607",
        "name": "Brunswick West Post and Lotto",
        "address1": "53 Melville Road",
        "address2": "",
        "postcode": 3055,
        "suburb": "Brunswick West",
        "position": { "lat": -37.7499100, "lng": 144.9461400 }
    },
    {
        "id": "6485",
        "name": "Footscray West Post Office",
        "address1": "528 Barkly Street",
        "address2": "",
        "postcode": 3012,
        "suburb": "West Footscray",
        "position": { "lat": -37.7975100, "lng": 144.8796800 }
    },
    {
        "id": "6366",
        "name": "Newswu Kiosk",
        "address1": "526 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8155400, "lng": 144.9583700 }
    },
    {
        "id": "6391",
        "name": "Victoria Market Pharmacy",
        "address1": "523 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8066600, "lng": 144.9594100 }
    },
    {
        "id": "6058",
        "name": "Heatherdale Station Kiosk",
        "address1": "52 Railway Avenue",
        "address2": "",
        "postcode": 3135,
        "suburb": "Ringwood East",
        "position": { "lat": -37.8189400, "lng": 145.2129900 }
    },
    {
        "id": "6370",
        "name": "Ringwood East Kiosk",
        "address1": "52 Railway Avenue",
        "address2": "",
        "postcode": 3135,
        "suburb": "Ringwood East",
        "position": { "lat": -37.8119000, "lng": 145.2502600 }
    },
    {
        "id": "6019",
        "name": "Ringwood East Newsagency",
        "address1": "52 Railway Avenue",
        "address2": "",
        "postcode": 3135,
        "suburb": "Ringwood East",
        "position": { "lat": -37.8124300, "lng": 145.2498300 }
    },
    {
        "id": "6342",
        "name": "Amcal Ormond Pharmacy",
        "address1": "517 North Road",
        "address2": "",
        "postcode": 3204,
        "suburb": "Ormond",
        "position": { "lat": -37.9039300, "lng": 145.0409900 }
    },
    {
        "id": "6160",
        "name": "Camberwell South LPO and Newsagency",
        "address1": "516 Camberwell Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8423900, "lng": 145.0691500 }
    },
    {
        "id": "6140",
        "name": "Kerrimuir Newsagency",
        "address1": "515 Middleborough Road",
        "address2": "",
        "postcode": 3129,
        "suburb": "Box Hill North",
        "position": { "lat": -37.8089500, "lng": 145.1400900 }
    },
    {
        "id": "6747",
        "name": "Carrum Newsagency",
        "address1": "514 Station Street",
        "address2": "",
        "postcode": 3197,
        "suburb": "Carrum",
        "position": { "lat": -38.0761900, "lng": 145.1233200 }
    },
    {
        "id": "1317",
        "name": "7-Eleven Pascoe Vale South",
        "address1": "512 Pascoe Vale Road (Corner Stewart Street)",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale South",
        "position": { "lat": -37.7281900, "lng": 144.9241100 }
    },
    {
        "id": "1149",
        "name": "7-Eleven Keysborough",
        "address1": "511 Cheltenham Road",
        "address2": "",
        "postcode": 3173,
        "suburb": "Keysborough",
        "position": { "lat": -37.9909400, "lng": 145.1492800 }
    },
    {
        "id": "1276",
        "name": "7-Eleven FZ Ferntree Gully",
        "address1": "510 Napoleon Road (Corner Lakesfield Drive)",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.9107400, "lng": 145.2755700 }
    },
    {
        "id": "6684",
        "name": "Bendigo City Visitor Centre",
        "address1": "51-67 Pall Mall ",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7579100, "lng": 144.2802800 }
    },
    {
        "id": "1071",
        "name": "7-Eleven Werribee",
        "address1": "51-53 Synnot Street",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.9035400, "lng": 144.6604400 }
    },
    {
        "id": "6088",
        "name": "Patterson Tatts News and Post",
        "address1": "51 Patterson Road",
        "address2": "",
        "postcode": 3204,
        "suburb": "Bentleigh",
        "position": { "lat": -37.9254100, "lng": 145.0347200 }
    },
    {
        "id": "6123",
        "name": "Gong Milk Bar",
        "address1": "51 Hawthorn Road",
        "address2": "",
        "postcode": 3161,
        "suburb": "Caulfield North",
        "position": { "lat": -37.8695100, "lng": 145.0254800 }
    },
    {
        "id": "6386",
        "name": "St Kilda Road News",
        "address1": "509 St Kilda Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8440300, "lng": 144.9788900 }
    },
    {
        "id": "1124",
        "name": "7-Eleven Croydon East",
        "address1": "506 Mount Dandenong Road",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon East",
        "position": { "lat": -37.8022700, "lng": 145.3083100 }
    },
    {
        "id": "6095",
        "name": "Mitcham Newsagency",
        "address1": "503 Whitehorse Road",
        "address2": "",
        "postcode": 3132,
        "suburb": "Mitcham",
        "position": { "lat": -37.8162000, "lng": 145.1930000 }
    },
    {
        "id": "6685",
        "name": "Buninyong Newsagency",
        "address1": "501 Warrenheip Street",
        "address2": "",
        "postcode": 3357,
        "suburb": "Buninyong",
        "position": { "lat": -37.6495000, "lng": 143.8845800 }
    },
    {
        "id": "6523",
        "name": "BP Prahran",
        "address1": "500 Malvern Road",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8482200, "lng": 145.0028900 }
    },
    {
        "id": "6038",
        "name": "My Office/Norman Bros",
        "address1": "500 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8180300, "lng": 144.9571500 }
    },
    {
        "id": "1094",
        "name": "7-Eleven Geelong",
        "address1": "50-54 Sydney Parade",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1519900, "lng": 144.3673900 }
    },
    {
        "id": "6166",
        "name": "Wingrove Milk Bar",
        "address1": "50 Wingrove Street",
        "address2": "",
        "postcode": 3078,
        "suburb": "Alphington",
        "position": { "lat": -37.7779000, "lng": 145.0308100 }
    },
    {
        "id": "1177",
        "name": "7-Eleven Flinders Lane",
        "address1": "50 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8178200, "lng": 144.9621800 }
    },
    {
        "id": "6720",
        "name": "Frankston Heights LPO",
        "address1": "50 Heatherhill Road",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1594500, "lng": 145.1411300 }
    },
    {
        "id": "6637",
        "name": "City Central Newsagency",
        "address1": "5 Queen Street",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7605300, "lng": 144.2815700 }
    },
    {
        "id": "6725",
        "name": "Longwarry Newsagency",
        "address1": "5 Mackie Street",
        "address2": "",
        "postcode": 3816,
        "suburb": "Longwarry",
        "position": { "lat": -38.1112800, "lng": 145.7689400 }
    },
    {
        "id": "1315",
        "name": "7-Eleven Officer East",
        "address1": "496 Princes Highway",
        "address2": "",
        "postcode": 3809,
        "suburb": "Officer",
        "position": { "lat": -38.0625200, "lng": 145.4166800 }
    },
    {
        "id": "6664",
        "name": "Kensington LPO",
        "address1": "495 Macaulay Road",
        "address2": "",
        "postcode": 3031,
        "suburb": "Kensington",
        "position": { "lat": -37.7945400, "lng": 144.9295800 }
    },
    {
        "id": "6440",
        "name": "Elizabeth Supermarket",
        "address1": "490-494 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8074100, "lng": 144.9603000 }
    },
    {
        "id": "1066",
        "name": "7-Eleven Templestowe",
        "address1": "49-55 Anderson Street",
        "address2": "",
        "postcode": 3106,
        "suburb": "Templestowe",
        "position": { "lat": -37.7554800, "lng": 145.1301200 }
    },
    {
        "id": "1076",
        "name": "7-Eleven Sunshine",
        "address1": "489 Ballarat Road",
        "address2": "",
        "postcode": 3020,
        "suburb": "Sunshine",
        "position": { "lat": -37.7778900, "lng": 144.8337000 }
    },
    {
        "id": "6439",
        "name": "Swanston General Store",
        "address1": "488 Swanston Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8055000, "lng": 144.9633600 }
    },
    {
        "id": "1312",
        "name": "7-Eleven Nunawading",
        "address1": "488 Springvale Road (Corner Hawthorn Road)",
        "address2": "",
        "postcode": 3131,
        "suburb": "Nunawading",
        "position": { "lat": -37.8477400, "lng": 145.1700600 }
    },
    {
        "id": "6064",
        "name": "NewsXpress Toorak Village",
        "address1": "487 Toorak Road",
        "address2": "",
        "postcode": 3142,
        "suburb": "Toorak",
        "position": { "lat": -37.8409400, "lng": 145.0091500 }
    },
    {
        "id": "6076",
        "name": "Kooyong LPO and Authorised Newsagency",
        "address1": "483 Glenferrie Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Kooyong",
        "position": { "lat": -37.8399900, "lng": 145.0320600 }
    },
    {
        "id": "6034",
        "name": "Coburg Newsagency",
        "address1": "481-483 Sydney Road",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7417600, "lng": 144.9663000 }
    },
    {
        "id": "6170",
        "name": "Keon Park News",
        "address1": "48 Johnson Street",
        "address2": "",
        "postcode": 3073,
        "suburb": "Keon Park",
        "position": { "lat": -37.6952300, "lng": 145.0125100 }
    },
    {
        "id": "6600",
        "name": "Blandford Milk Bar",
        "address1": "48 Blandford Crescent",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater North",
        "position": { "lat": -37.8297000, "lng": 145.2932300 }
    },
    {
        "id": "1092",
        "name": "7-Eleven Ashwood",
        "address1": "475-479 Warrigal Road",
        "address2": "",
        "postcode": 3147,
        "suburb": "Ashwood",
        "position": { "lat": -37.8634900, "lng": 145.0937100 }
    },
    {
        "id": "1316",
        "name": "7-Eleven Pascoe Vale",
        "address1": "475-477 Bell Street (Corner Reynolds Parade)",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale",
        "position": { "lat": -37.7389300, "lng": 144.9406900 }
    },
    {
        "id": "6504",
        "name": "Rich Source Milk Bar",
        "address1": "471 Hawthorn Road",
        "address2": "",
        "postcode": 3162,
        "suburb": "Caulfield South",
        "position": { "lat": -37.8948800, "lng": 145.0206200 }
    },
    {
        "id": "1240",
        "name": "7-Eleven Point Cook",
        "address1": "47-57 Tom Roberts Parade",
        "address2": "",
        "postcode": 3030,
        "suburb": "Point Cook",
        "position": { "lat": -37.8935200, "lng": 144.7277200 }
    },
    {
        "id": "6029",
        "name": "M and T Gift Shop",
        "address1": "47 Koornang Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Carnegie",
        "position": { "lat": -37.8860200, "lng": 145.0574700 }
    },
    {
        "id": "6235",
        "name": "Foot St News and Lotto",
        "address1": "47 Foot Street",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1579400, "lng": 145.1306800 }
    },
    {
        "id": "1144",
        "name": "7-Eleven Vic Market",
        "address1": "463 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8081100, "lng": 144.9600500 }
    },
    {
        "id": "6462",
        "name": "Cignall Brady Road",
        "address1": "46 Brady Road",
        "address2": "",
        "postcode": 3175,
        "suburb": "Dandenong North",
        "position": { "lat": -37.9542300, "lng": 145.2126200 }
    },
    {
        "id": "6028",
        "name": "Murrumbeena Newsagency",
        "address1": "456 Neerim Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Murrumbeena",
        "position": { "lat": -37.8895700, "lng": 145.0674400 }
    },
    {
        "id": "6735",
        "name": "Niddrie Authorised Newsagency and Office Suppliers",
        "address1": "455 Keilor Road",
        "address2": "",
        "postcode": 3042,
        "suburb": "Niddrie",
        "position": { "lat": -37.7366100, "lng": 144.8902000 }
    },
    {
        "id": "6293",
        "name": "Montmorency Pharmacy",
        "address1": "45 Were Street",
        "address2": "",
        "postcode": 3094,
        "suburb": "Montmorency",
        "position": { "lat": -37.7160900, "lng": 145.1210400 }
    },
    {
        "id": "6368",
        "name": "Puckle Street Newsagency",
        "address1": "45 Puckle Street",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7670700, "lng": 144.9230800 }
    },
    {
        "id": "1148",
        "name": "7-Eleven Royal Melbourne",
        "address1": "45 Flemington Road, Royal Melbourne",
        "address2": "",
        "postcode": 3051,
        "suburb": "Parkville",
        "position": { "lat": -37.8001800, "lng": 144.9549700 }
    },
    {
        "id": "6204",
        "name": "Whittlesea Authorised Newsagency",
        "address1": "45 Church Street",
        "address2": "",
        "postcode": 3757,
        "suburb": "Whittlesea",
        "position": { "lat": -37.5130500, "lng": 145.1175200 }
    },
    {
        "id": "6449",
        "name": "Daily News On Little Collins",
        "address1": "448 Little Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8163900, "lng": 144.9592800 }
    },
    {
        "id": "1145",
        "name": "7-Eleven 446 Collins Street",
        "address1": "446 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8174300, "lng": 144.9591800 }
    },
    {
        "id": "6098",
        "name": "Elsternwick News and Lotto",
        "address1": "444 Glenhuntly Road",
        "address2": "",
        "postcode": 3185,
        "suburb": "Elsternwick",
        "position": { "lat": -37.8851100, "lng": 145.0066000 }
    },
    {
        "id": "6748",
        "name": "Lara Newsagency",
        "address1": "44 The Centreway",
        "address2": "",
        "postcode": 3212,
        "suburb": "Lara",
        "position": { "lat": -38.0225800, "lng": 144.4080800 }
    },
    {
        "id": "1266",
        "name": "7-Eleven Croydon Hills",
        "address1": "44 Plymouth Road",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon Hills",
        "position": { "lat": -37.7829400, "lng": 145.2677700 }
    },
    {
        "id": "6753",
        "name": "Pines Forest LPO",
        "address1": "44 Mahogany Avenue",
        "address2": "",
        "postcode": 3200,
        "suburb": "Frankston North",
        "position": { "lat": -38.1232500, "lng": 145.1477500 }
    },
    {
        "id": "1063",
        "name": "7-Eleven Newport",
        "address1": "438 Melbourne Road",
        "address2": "",
        "postcode": 3015,
        "suburb": "Newport",
        "position": { "lat": -37.8408400, "lng": 144.8831300 }
    },
    {
        "id": "2018",
        "name": "7-Eleven West Footscray",
        "address1": "438 Geelong Road (Corner Somerville Road)",
        "address2": "",
        "postcode": 3012,
        "suburb": "West Footscray",
        "position": { "lat": -37.8112800, "lng": 144.8674800 }
    },
    {
        "id": "6779",
        "name": "Foodworks Pascoe Vale",
        "address1": "435 Gaffney Street",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale",
        "position": { "lat": -37.7303700, "lng": 144.9279400 }
    },
    {
        "id": "1180",
        "name": "7-Eleven Lower Elizabeth",
        "address1": "43-45 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8171400, "lng": 144.9642500 }
    },
    {
        "id": "6644",
        "name": "Warragul Newsagency",
        "address1": "43 Victoria Street",
        "address2": "",
        "postcode": 3820,
        "suburb": "Warragul",
        "position": { "lat": -38.1614200, "lng": 145.9301000 }
    },
    {
        "id": "6548",
        "name": "Fantasia Milkbar",
        "address1": "43 Dinah Parade",
        "address2": "",
        "postcode": 3033,
        "suburb": "Keilor East",
        "position": { "lat": -37.7445900, "lng": 144.8672100 }
    },
    {
        "id": "6728",
        "name": "Another World Computer Centre",
        "address1": "429 Sydney Road",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg ",
        "position": { "lat": -37.7430300, "lng": 144.9662100 }
    },
    {
        "id": "6491",
        "name": "Cignall Sydney Road",
        "address1": "427 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7673700, "lng": 144.9618900 }
    },
    {
        "id": "6155",
        "name": "Kew High Convenience",
        "address1": "427 High Street",
        "address2": "",
        "postcode": 3101,
        "suburb": "Kew",
        "position": { "lat": -37.8034500, "lng": 145.0396500 }
    },
    {
        "id": "1262",
        "name": "7-Eleven Clifton Hill",
        "address1": "422-424 Hoddle Street",
        "address2": "",
        "postcode": 3068,
        "suburb": "Clifton Hill",
        "position": { "lat": -37.7907800, "lng": 144.9948800 }
    },
    {
        "id": "1283",
        "name": "7-Eleven Frankston Otr",
        "address1": "42-46 Mcmahons Road (Corner Cranbourne Road)",
        "address2": "",
        "postcode": 3199,
        "suburb": "Frankston",
        "position": { "lat": -38.1472600, "lng": 145.1361100 }
    },
    {
        "id": "6403",
        "name": "Montalbert Newsagency and Tattersalls",
        "address1": "42 Hamilton Street",
        "address2": "",
        "postcode": 3127,
        "suburb": "Mont Albert",
        "position": { "lat": -37.8201600, "lng": 145.1054000 }
    },
    {
        "id": "6079",
        "name": "Moreland West LPO",
        "address1": "418 Moreland Road",
        "address2": "",
        "postcode": 3055,
        "suburb": "Brunswick West",
        "position": { "lat": -37.7534600, "lng": 144.9460400 }
    },
    {
        "id": "1280",
        "name": "7-Eleven North Melbourne",
        "address1": "415 Flemington Road (Corner Racecourse Road)",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7890300, "lng": 144.9410600 }
    },
    {
        "id": "6133",
        "name": "Adams Pharmacy",
        "address1": "413 Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Chelsea",
        "position": { "lat": -38.0529000, "lng": 145.1160600 }
    },
    {
        "id": "6119",
        "name": "Rathdowne Newsagency",
        "address1": "410 Rathdowne Street",
        "address2": "",
        "postcode": 3054,
        "suburb": "Carlton North",
        "position": { "lat": -37.7878500, "lng": 144.9724200 }
    },
    {
        "id": "6703",
        "name": "Moe IGA Plus Liquor",
        "address1": "41-47 Elizabeth Street",
        "address2": "",
        "postcode": 3825,
        "suburb": "Moe",
        "position": { "lat": -38.1887200, "lng": 146.2502200 }
    },
    {
        "id": "6203",
        "name": "Albion General Store",
        "address1": "41-43 Perth Avenue",
        "address2": "",
        "postcode": 3020,
        "suburb": "Albion",
        "position": { "lat": -37.7766500, "lng": 144.8150700 }
    },
    {
        "id": "6741",
        "name": "Kilmore Newsagency",
        "address1": "41 Sydney Street",
        "address2": "",
        "postcode": 3764,
        "suburb": "Kilmore",
        "position": { "lat": -37.2927700, "lng": 144.9510300 }
    },
    {
        "id": "6488",
        "name": "Victory Convenience Store",
        "address1": "40a Victory Boulevard",
        "address2": "",
        "postcode": 3147,
        "suburb": "Ashburton",
        "position": { "lat": -37.8680200, "lng": 145.0820700 }
    },
    {
        "id": "6736",
        "name": "Tynong General Store",
        "address1": "40A Railway Avenue",
        "address2": "",
        "postcode": 3713,
        "suburb": "Tynong",
        "position": { "lat": -38.0846000, "lng": 145.6287900 }
    },
    {
        "id": "1229",
        "name": "7-Eleven 409 Collins Street",
        "address1": "409 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8173700, "lng": 144.9596700 }
    },
    {
        "id": "6141",
        "name": "Double Happiness Milk Bar",
        "address1": "408 Gilbert Road",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7349800, "lng": 144.9908200 }
    },
    {
        "id": "6451",
        "name": "Camberwell West Post Office and Sub News",
        "address1": "408 Burke Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8450500, "lng": 145.0543000 }
    },
    {
        "id": "6529",
        "name": "Rossmoyne Newsagency",
        "address1": "406 Station Street",
        "address2": "",
        "postcode": 3071,
        "suburb": "Thornbury",
        "position": { "lat": -37.7590900, "lng": 145.0211800 }
    },
    {
        "id": "6433",
        "name": "Boroondara Milk Bar",
        "address1": "406 Balwyn Road",
        "address2": "",
        "postcode": 3104,
        "suburb": "Balwyn North",
        "position": { "lat": -37.7870000, "lng": 145.0867000 }
    },
    {
        "id": "6127",
        "name": "Chelsea Newsagency",
        "address1": "403 Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Chelsea",
        "position": { "lat": -38.0521500, "lng": 145.1156000 }
    },
    {
        "id": "1337",
        "name": "7-Eleven Wantirna South",
        "address1": "401 Burwood Highway (Corner Stud Road)",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna South",
        "position": { "lat": -37.8685600, "lng": 145.2362500 }
    },
    {
        "id": "6668",
        "name": "Bundoora Post Office",
        "address1": "4/39E Plenty Road",
        "address2": "",
        "postcode": 3083,
        "suburb": "Bundoora",
        "position": { "lat": -37.6961500, "lng": 145.0584500 }
    },
    {
        "id": "6330",
        "name": "Emerald Newsagency",
        "address1": "4 Kilvington Drive",
        "address2": "",
        "postcode": 3782,
        "suburb": "Emerald",
        "position": { "lat": -37.9327600, "lng": 145.4405600 }
    },
    {
        "id": "1273",
        "name": "7-Eleven Endeavour Hills",
        "address1": "4 Heatherton Road (Corner Power Road)",
        "address2": "",
        "postcode": 3802,
        "suburb": "Endeavour Hills",
        "position": { "lat": -37.9736900, "lng": 145.2426600 }
    },
    {
        "id": "6603",
        "name": "Sydney Road Lucky Lotto and News",
        "address1": "398 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7685500, "lng": 144.9620000 }
    },
    {
        "id": "1314",
        "name": "7-Eleven Officer",
        "address1": "397 Princes Highway",
        "address2": "",
        "postcode": 3809,
        "suburb": "Officer",
        "position": { "lat": -38.0592100, "lng": 145.4066000 }
    },
    {
        "id": "1008",
        "name": "7-Eleven Glen Waverley",
        "address1": "396-398 Blackburn Road",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8865200, "lng": 145.1461900 }
    },
    {
        "id": "6559",
        "name": "Central Milk Bar",
        "address1": "396 Graham Street",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8354900, "lng": 144.9349800 }
    },
    {
        "id": "6303",
        "name": "Central Park Newsagency",
        "address1": "393 Wattletree Road",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8649500, "lng": 145.0495500 }
    },
    {
        "id": "1182",
        "name": "7-Eleven RMIT",
        "address1": "391 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8093400, "lng": 144.9635500 }
    },
    {
        "id": "6615",
        "name": "Barton Street Milk Bar Hawthorn",
        "address1": "39 Barton Street",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8192600, "lng": 145.0225300 }
    },
    {
        "id": "1017",
        "name": "7-Eleven Niddrie",
        "address1": "387 Keilor Road",
        "address2": "",
        "postcode": 3042,
        "suburb": "Niddrie",
        "position": { "lat": -37.7374500, "lng": 144.8920600 }
    },
    {
        "id": "1090",
        "name": "7-Eleven Balaclava",
        "address1": "384 Carlisle Street",
        "address2": "",
        "postcode": 3183,
        "suburb": "Balaclava",
        "position": { "lat": -37.8691300, "lng": 144.9993200 }
    },
    {
        "id": "6083",
        "name": "Halfpenny Discount Pharmacy",
        "address1": "381 Sydney Road",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7445700, "lng": 144.9658400 }
    },
    {
        "id": "6012",
        "name": "Parkside News and Lotto",
        "address1": "380 St Kilda Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8323100, "lng": 144.9713500 }
    },
    {
        "id": "1160",
        "name": "7-Eleven Hoppers Crossing",
        "address1": "380 Morris Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8509100, "lng": 144.7068400 }
    },
    {
        "id": "1170",
        "name": "7-Eleven Hallam",
        "address1": "38-40 Hallam Road",
        "address2": "",
        "postcode": 3803,
        "suburb": "Hallam",
        "position": { "lat": -38.0114200, "lng": 145.2728800 }
    },
    {
        "id": "6636",
        "name": "Sebastopol Newsagency",
        "address1": "38 Albert Street",
        "address2": "",
        "postcode": 3356,
        "suburb": "Sebastopol",
        "position": { "lat": -37.5854800, "lng": 143.8404600 }
    },
    {
        "id": "6169",
        "name": "Preston Central Authorised Newsagency",
        "address1": "377 High Street",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7409200, "lng": 145.0033200 }
    },
    {
        "id": "6305",
        "name": "Burnley and West Richmond Newsagency",
        "address1": "375 Burnley Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Burnley",
        "position": { "lat": -37.8259700, "lng": 145.0073500 }
    },
    {
        "id": "6500",
        "name": "Rathdowne Village Grocery Store",
        "address1": "374 Rathdowne Street",
        "address2": "",
        "postcode": 3054,
        "suburb": "Carlton North",
        "position": { "lat": -37.7886300, "lng": 144.9723000 }
    },
    {
        "id": "6055",
        "name": "Paper and Post",
        "address1": "372-380 Bell Street",
        "address2": "",
        "postcode": 3044,
        "suburb": "Pascoe Vale South",
        "position": { "lat": -37.7391800, "lng": 144.9464100 }
    },
    {
        "id": "1340",
        "name": "7-Eleven Yallambie",
        "address1": "371 Lower Plenty Road",
        "address2": "",
        "postcode": 3085,
        "suburb": "Yallambie",
        "position": { "lat": -37.7310600, "lng": 145.0857700 }
    },
    {
        "id": "1339",
        "name": "7-Eleven Werribee",
        "address1": "370 Heaths Road (Corner Tarneit Road)",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.8751100, "lng": 144.6652400 }
    },
    {
        "id": "6756",
        "name": "Piedimonte&#039;s Supermarket",
        "address1": "37-49A Best Street",
        "address2": "",
        "postcode": 3068,
        "suburb": "Fitzroy North",
        "position": { "lat": -37.7834800, "lng": 144.9831700 }
    },
    {
        "id": "1134",
        "name": "7-Eleven 37 Swanston Street",
        "address1": "37 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8166100, "lng": 144.9669500 }
    },
    {
        "id": "6298",
        "name": "Glass Street Milk Bar",
        "address1": "37 Glass Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7469600, "lng": 144.9193900 }
    },
    {
        "id": "6697",
        "name": "Flagstaff Convenience",
        "address1": "369 King Street",
        "address2": "",
        "postcode": 3003,
        "suburb": "West Melbourne",
        "position": { "lat": -37.8116500, "lng": 144.9533700 }
    },
    {
        "id": "6645",
        "name": "Mini Supermarket",
        "address1": "365 Lygon Street",
        "address2": "",
        "postcode": 3057,
        "suburb": "Brunswick East",
        "position": { "lat": -37.7664400, "lng": 144.9724800 }
    },
    {
        "id": "6053",
        "name": "Lalor Newsagent",
        "address1": "364 Station Street",
        "address2": "",
        "postcode": 3075,
        "suburb": "Lalor",
        "position": { "lat": -37.6721000, "lng": 145.0162700 }
    },
    {
        "id": "6096",
        "name": "Bentleigh Newsagency",
        "address1": "359 Centre Road",
        "address2": "",
        "postcode": 3204,
        "suburb": "Bentleigh",
        "position": { "lat": -37.9180200, "lng": 145.0362400 }
    },
    {
        "id": "1005",
        "name": "7-Eleven Caulfield",
        "address1": "355 Hawthorn Road",
        "address2": "",
        "postcode": 3162,
        "suburb": "Caulfield",
        "position": { "lat": -37.8863900, "lng": 145.0222900 }
    },
    {
        "id": "1178",
        "name": "7-Eleven Chapel Street",
        "address1": "353 Chapel Street",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8465000, "lng": 144.9941300 }
    },
    {
        "id": "6310",
        "name": "Orrong Authorised Newsagency",
        "address1": "350 Orrong Road",
        "address2": "",
        "postcode": 3161,
        "suburb": "Caulfield North",
        "position": { "lat": -37.8635400, "lng": 145.0102900 }
    },
    {
        "id": "6197",
        "name": "Berwick Milk Bar",
        "address1": "35 High Street",
        "address2": "",
        "postcode": 3806,
        "suburb": "Berwick",
        "position": { "lat": -38.0308100, "lng": 145.3459400 }
    },
    {
        "id": "1135",
        "name": "7-Eleven 35 Bourke Street",
        "address1": "35 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8117700, "lng": 144.9721500 }
    },
    {
        "id": "6177",
        "name": "Seaview Cellars Foodworks",
        "address1": "346 Balcombe Road",
        "address2": "",
        "postcode": 3193,
        "suburb": "Beaumaris",
        "position": { "lat": -37.9791000, "lng": 145.0459100 }
    },
    {
        "id": "6087",
        "name": "Hampton Authorised Newsagency",
        "address1": "345-347 Hampton Street",
        "address2": "",
        "postcode": 3188,
        "suburb": "Hampton",
        "position": { "lat": -37.9374800, "lng": 145.0023500 }
    },
    {
        "id": "6357",
        "name": "Clayton Newsagency",
        "address1": "345 Clayton Road",
        "address2": "",
        "postcode": 3168,
        "suburb": "Clayton",
        "position": { "lat": -37.9256400, "lng": 145.1193400 }
    },
    {
        "id": "6605",
        "name": "North Melbourne Pharmacy",
        "address1": "344 Abbotsford Street",
        "address2": "",
        "postcode": 3051,
        "suburb": "North Melbourne",
        "position": { "lat": -37.7987100, "lng": 144.9464800 }
    },
    {
        "id": "1265",
        "name": "7-Eleven Croydon",
        "address1": "343 Dorset Road",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon",
        "position": { "lat": -37.8039600, "lng": 145.2894600 }
    },
    {
        "id": "6469",
        "name": "7 Convenience Store",
        "address1": "341 St Georges Road",
        "address2": "",
        "postcode": 3068,
        "suburb": "Fitzroy North",
        "position": { "lat": -37.7797600, "lng": 144.9865900 }
    },
    {
        "id": "6030",
        "name": "Grantham LPO, Tatts and News",
        "address1": "34 Grantham Street",
        "address2": "",
        "postcode": 3055,
        "suburb": "Brunswick West",
        "position": { "lat": -37.7723700, "lng": 144.9497700 }
    },
    {
        "id": "6772",
        "name": "Museum Station Kiosk",
        "address1": "339 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8101800, "lng": 144.9639700 }
    },
    {
        "id": "1275",
        "name": "7-Eleven Epping",
        "address1": "339 Dalton Road (Corner Childs Road)",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6603300, "lng": 145.0299800 }
    },
    {
        "id": "6450",
        "name": "Belmore News and Lotto",
        "address1": "338 Belmore Road",
        "address2": "",
        "postcode": 3103,
        "suburb": "Balwyn",
        "position": { "lat": -37.8040400, "lng": 145.1018700 }
    },
    {
        "id": "6767",
        "name": "Waverley Road Authorised Newsagency",
        "address1": "336 Waverley Road",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8775900, "lng": 145.0589500 }
    },
    {
        "id": "1172",
        "name": "7-Eleven Dromana",
        "address1": "335-339 Point Nepean Road",
        "address2": "",
        "postcode": 3936,
        "suburb": "Dromana",
        "position": { "lat": -38.3354000, "lng": 144.9593600 }
    },
    {
        "id": "1289",
        "name": "7-Eleven Hampton Park",
        "address1": "335 Pound Road (Corner Shrives Road)",
        "address2": "",
        "postcode": 3976,
        "suburb": "Hampton Park",
        "position": { "lat": -38.0303100, "lng": 145.2807600 }
    },
    {
        "id": "6187",
        "name": "Kirschners Pharmacy",
        "address1": "333 Napier Street",
        "address2": "",
        "postcode": 3041,
        "suburb": "Strathmore",
        "position": { "lat": -37.7352100, "lng": 144.9188500 }
    },
    {
        "id": "6464",
        "name": "IGA Exhibition Xpress",
        "address1": "333 Exhibition Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8080400, "lng": 144.9684600 }
    },
    {
        "id": "1241",
        "name": "7-Eleven Altona",
        "address1": "332-350 Millers Road (Corner Kororoit Creek Road)",
        "address2": "",
        "postcode": 3018,
        "suburb": "Altona North",
        "position": { "lat": -37.8494900, "lng": 144.8447200 }
    },
    {
        "id": "6399",
        "name": "Cheltenham Newsagency",
        "address1": "332 Charman Road",
        "address2": "",
        "postcode": 3192,
        "suburb": "Cheltenham",
        "position": { "lat": -37.9661800, "lng": 145.0559800 }
    },
    {
        "id": "1152",
        "name": "7-Eleven Aspendale",
        "address1": "330 Wells Road",
        "address2": "",
        "postcode": 3195,
        "suburb": "Aspendale",
        "position": { "lat": -38.0278200, "lng": 145.1304000 }
    },
    {
        "id": "6067",
        "name": "Golden Dollar Lotto",
        "address1": "330 Smith Street",
        "address2": "",
        "postcode": 3066,
        "suburb": "Collingwood",
        "position": { "lat": -37.7993100, "lng": 144.9844400 }
    },
    {
        "id": "1162",
        "name": "7-Eleven Eltham",
        "address1": "330 Ryans Road",
        "address2": "",
        "postcode": 3095,
        "suburb": "Eltham",
        "position": { "lat": -37.6874100, "lng": 145.1432100 }
    },
    {
        "id": "1295",
        "name": "7-Eleven Karingal",
        "address1": "330 Frankston-Cranbourne Road",
        "address2": "",
        "postcode": 3199,
        "suburb": "Karingal",
        "position": { "lat": -38.1540900, "lng": 145.1634700 }
    },
    {
        "id": "6782",
        "name": "Bendigo Retirement Village",
        "address1": "33-53 Mandurang Road",
        "address2": "",
        "postcode": 3550,
        "suburb": "Spring Gully",
        "position": { "lat": -36.8019400, "lng": 144.2905100 }
    },
    {
        "id": "1187",
        "name": "7-Eleven St Albans North",
        "address1": "33-37 Taylors Road",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans North",
        "position": { "lat": -37.7294800, "lng": 144.8102600 }
    },
    {
        "id": "6176",
        "name": "Spencers Amcal Pharmacy",
        "address1": "33 Watsonia Road",
        "address2": "",
        "postcode": 3087,
        "suburb": "Watsonia",
        "position": { "lat": -37.7114200, "lng": 145.0824000 }
    },
    {
        "id": "6526",
        "name": "South Yarra Convenience Store",
        "address1": "328 Toorak Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8399500, "lng": 144.9985500 }
    },
    {
        "id": "6256",
        "name": "Carlton Newsagency",
        "address1": "325 Lygon Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.7977400, "lng": 144.9671900 }
    },
    {
        "id": "1285",
        "name": "7-Eleven Geelong South",
        "address1": "325 La Trobe Terrace (Corner Kilgour Court)",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong South",
        "position": { "lat": -38.1537500, "lng": 144.3518400 }
    },
    {
        "id": "1156",
        "name": "7-Eleven Fairfield East",
        "address1": "324 Station Street",
        "address2": "",
        "postcode": 3078,
        "suburb": "Fairfield East",
        "position": { "lat": -37.7657100, "lng": 145.0201200 }
    },
    {
        "id": "1191",
        "name": "7-Eleven South Melbourne",
        "address1": "322-326 Clarendon Street",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8340000, "lng": 144.9608600 }
    },
    {
        "id": "6394",
        "name": "Ezy 8",
        "address1": "321 Springvale Road",
        "address2": "",
        "postcode": 3171,
        "suburb": "Springvale",
        "position": { "lat": -37.9507500, "lng": 145.1528300 }
    },
    {
        "id": "6264",
        "name": "IGA - St Kilda Road",
        "address1": "320 St Kilda Road",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8294300, "lng": 144.9708700 }
    },
    {
        "id": "1301",
        "name": "7-Eleven Maribyrnong",
        "address1": "32 Raleigh Road (Corner Navigator Street)",
        "address2": "",
        "postcode": 3032,
        "suburb": "Templestowe",
        "position": { "lat": -37.7698400, "lng": 144.8975900 }
    },
    {
        "id": "6689",
        "name": "Clifton Hill Authorised Newsagency",
        "address1": "316 Queens Parade",
        "address2": "",
        "postcode": 3068,
        "suburb": "Clifton Hill",
        "position": { "lat": -37.7886400, "lng": 144.9902200 }
    },
    {
        "id": "1168",
        "name": "7-Eleven North Elsternwick",
        "address1": "314 Glen Eira Road",
        "address2": "",
        "postcode": 3185,
        "suburb": "Elsternwick North",
        "position": { "lat": -37.8788400, "lng": 145.0123700 }
    },
    {
        "id": "6048",
        "name": "Terry White Chemist",
        "address1": "310 Whitehorse Road",
        "address2": "",
        "postcode": 3103,
        "suburb": "Balwyn",
        "position": { "lat": -37.8133000, "lng": 145.0842700 }
    },
    {
        "id": "6778",
        "name": "IGA Abbotsford",
        "address1": "310 Johnston Street",
        "address2": "",
        "postcode": 3067,
        "suburb": "Abbotsford",
        "position": { "lat": -37.8000100, "lng": 144.9957300 }
    },
    {
        "id": "6004",
        "name": "Hoppers Crossing Newsagency",
        "address1": "31 Old Geelong Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8824800, "lng": 144.6999200 }
    },
    {
        "id": "1297",
        "name": "7-Eleven Keysborough",
        "address1": "309 CheltenhamRoad",
        "address2": "",
        "postcode": 3173,
        "suburb": "Keysborough",
        "position": { "lat": -37.9942300, "lng": 145.1760500 }
    },
    {
        "id": "6291",
        "name": "Vernons Newsagency",
        "address1": "308A Bridge Road",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8190000, "lng": 145.0015100 }
    },
    {
        "id": "6474",
        "name": "Dande Lotto",
        "address1": "308 Thomas Street",
        "address2": "",
        "postcode": 3175,
        "suburb": "Dandenong",
        "position": { "lat": -37.9852600, "lng": 145.2126700 }
    },
    {
        "id": "6068",
        "name": "Clifton Hill Lotto",
        "address1": "306 Queens Parade",
        "address2": "",
        "postcode": 3068,
        "suburb": "Clifton Hill",
        "position": { "lat": -37.7886900, "lng": 144.9898000 }
    },
    {
        "id": "1096",
        "name": "7-Eleven Brighton",
        "address1": "306 Bay Street",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.9057000, "lng": 145.0026500 }
    },
    {
        "id": "6795",
        "name": "Highett Lotto and Tobacco",
        "address1": "304 Highett Road ",
        "address2": "",
        "postcode": 3190,
        "suburb": "Highett",
        "position": { "lat": -37.9490200, "lng": 145.0429400 }
    },
    {
        "id": "1293",
        "name": "7-Eleven Sandringham",
        "address1": "302 Bluff Road (Corner Bay Road)",
        "address2": "",
        "postcode": 3190,
        "suburb": "Highett",
        "position": { "lat": -37.9535400, "lng": 145.0211300 }
    },
    {
        "id": "6704",
        "name": "Newborough News and Lotto",
        "address1": "30 Rutherglen Road",
        "address2": "",
        "postcode": 3825,
        "suburb": "Newborough",
        "position": { "lat": -38.1856700, "lng": 146.2913000 }
    },
    {
        "id": "1057",
        "name": "7-Eleven Geelong North",
        "address1": "3/67-69 Separation Street",
        "address2": "",
        "postcode": 3215,
        "suburb": "Geelong North",
        "position": { "lat": -38.1110900, "lng": 144.3436900 }
    },
    {
        "id": "6383",
        "name": "Ascot Market",
        "address1": "3 Kent Street",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7810500, "lng": 144.9319700 }
    },
    {
        "id": "6105",
        "name": "Richmond Jolimont Convenience Store",
        "address1": "2A Bridge Road",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8177000, "lng": 144.9901100 }
    },
    {
        "id": "6473",
        "name": "Chesterville Newsagency",
        "address1": "299 Chesterville Road",
        "address2": "",
        "postcode": 3165,
        "suburb": "Bentleigh East",
        "position": { "lat": -37.9357800, "lng": 145.0612400 }
    },
    {
        "id": "1138",
        "name": "7-Eleven Fitzroy",
        "address1": "295-297 Brunswick Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.7984700, "lng": 144.9782200 }
    },
    {
        "id": "6081",
        "name": "Mountain View Newsagency",
        "address1": "293A Springfield Road",
        "address2": "",
        "postcode": 3131,
        "suburb": "Nunawading",
        "position": { "lat": -37.8124000, "lng": 145.1720000 }
    },
    {
        "id": "6509",
        "name": "Southern Cross Food Store",
        "address1": "290 James Cook Drive",
        "address2": "",
        "postcode": 3802,
        "suburb": "Endeavour Hills",
        "position": { "lat": -37.9879400, "lng": 145.2663700 }
    },
    {
        "id": "1115",
        "name": "7-Eleven Auburn",
        "address1": "290 Barkers Road",
        "address2": "",
        "postcode": 3123,
        "suburb": "Auburn",
        "position": { "lat": -37.8153800, "lng": 145.0411000 }
    },
    {
        "id": "6692",
        "name": "AA Convenience",
        "address1": "29 La Trobe Street Melbourne",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8077400, "lng": 144.9708100 }
    },
    {
        "id": "6534",
        "name": "Railway Hotel",
        "address1": "29 Chapel Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Windsor",
        "position": { "lat": -37.8567400, "lng": 144.9923800 }
    },
    {
        "id": "6653",
        "name": "Auburn South Newsagency",
        "address1": "289 Auburn Road",
        "address2": "",
        "postcode": 3123,
        "suburb": "Hawthorn East",
        "position": { "lat": -37.8303600, "lng": 145.0437700 }
    },
    {
        "id": "1205",
        "name": "7-Eleven Collingwood",
        "address1": "286 Smith Street",
        "address2": "",
        "postcode": 3066,
        "suburb": "Collingwood",
        "position": { "lat": -37.8005800, "lng": 144.9841800 }
    },
    {
        "id": "6468",
        "name": "Northcote IGA Plus Liquor",
        "address1": "284-288 High Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7717900, "lng": 144.9987200 }
    },
    {
        "id": "1306",
        "name": "7-Eleven Narre Warren",
        "address1": "28-32 Narre Warren-Cranbourne Road",
        "address2": "",
        "postcode": 3805,
        "suburb": "Narre Warren",
        "position": { "lat": -38.0360000, "lng": 145.3056600 }
    },
    {
        "id": "6737",
        "name": "Little River General Store",
        "address1": "28 Little River Road",
        "address2": "",
        "postcode": 3211,
        "suburb": "Little River",
        "position": { "lat": -37.9621700, "lng": 144.5074900 }
    },
    {
        "id": "1209",
        "name": "7-Eleven Dingley",
        "address1": "277-283 Centre Dandenong Road",
        "address2": "",
        "postcode": 3172,
        "suburb": "Dingley",
        "position": { "lat": -37.9735800, "lng": 145.1206900 }
    },
    {
        "id": "6026",
        "name": "Smart Selections",
        "address1": "276 Victoria Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8107100, "lng": 145.0004100 }
    },
    {
        "id": "6225",
        "name": "Belvedere Park Post and News",
        "address1": "276 Seaford Road",
        "address2": "",
        "postcode": 3198,
        "suburb": "Seaford",
        "position": { "lat": -38.1122900, "lng": 145.1563500 }
    },
    {
        "id": "1140",
        "name": "7-Eleven Carlton",
        "address1": "272 Lygon Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8006100, "lng": 144.9671400 }
    },
    {
        "id": "6091",
        "name": "Greythorn Authorised Newsagency",
        "address1": "272 Doncaster Road",
        "address2": "",
        "postcode": 3104,
        "suburb": "Balwyn North",
        "position": { "lat": -37.7922300, "lng": 145.0934100 }
    },
    {
        "id": "1026",
        "name": "7-Eleven West Brunswick",
        "address1": "27-31 Melville Road",
        "address2": "",
        "postcode": 3055,
        "suburb": "Brunswick West",
        "position": { "lat": -37.7659000, "lng": 144.9430500 }
    },
    {
        "id": "6696",
        "name": "Eaglehawk Newsagency",
        "address1": "27-29 High Street",
        "address2": "",
        "postcode": 3556,
        "suburb": "Eaglehawk",
        "position": { "lat": -36.7183100, "lng": 144.2535500 }
    },
    {
        "id": "6380",
        "name": "St Kilda Convenience Store",
        "address1": "27 Fitzroy Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8622300, "lng": 144.9736500 }
    },
    {
        "id": "6691",
        "name": "Cuthberts Road Mixed Business",
        "address1": "27 Cuthberts Road",
        "address2": "",
        "postcode": 3350,
        "suburb": "Alfredton",
        "position": { "lat": -37.5550400, "lng": 143.8094100 }
    },
    {
        "id": "6192",
        "name": "Yarra Valley Travel",
        "address1": "268 Maroondah Highway",
        "address2": "",
        "postcode": 3777,
        "suburb": "Healesville",
        "position": { "lat": -37.6542200, "lng": 145.5166800 }
    },
    {
        "id": "6661",
        "name": "Up Milk Bar",
        "address1": "265 Huntingdale Road",
        "address2": "",
        "postcode": 3148,
        "suburb": "Chadstone",
        "position": { "lat": -37.8735700, "lng": 145.1104500 }
    },
    {
        "id": "6196",
        "name": "Caulfield Convenience Store",
        "address1": "263 Hawthorn Road",
        "address2": "",
        "postcode": 3161,
        "suburb": "Caulfield North",
        "position": { "lat": -37.8796800, "lng": 145.0234300 }
    },
    {
        "id": "1176",
        "name": "7-Eleven Lower Bourke",
        "address1": "263 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8136000, "lng": 144.9661600 }
    },
    {
        "id": "6062",
        "name": "Donburn Milk Bar",
        "address1": "262 Blackburn Road",
        "address2": "",
        "postcode": 3109,
        "suburb": "Doncaster East",
        "position": { "lat": -37.7823500, "lng": 145.1636700 }
    },
    {
        "id": "1213",
        "name": "7-Eleven William Street",
        "address1": "261 William Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8130000, "lng": 144.9566100 }
    },
    {
        "id": "9001",
        "name": "Bendigo Central Post Shop",
        "address1": "261 Hargreaves Street",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7591800, "lng": 144.2814000 }
    },
    {
        "id": "6512",
        "name": "Windermere Convenience Store",
        "address1": "260 Windermere Drive",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.8954300, "lng": 145.2616600 }
    },
    {
        "id": "1198",
        "name": "7-Eleven 26 King Street",
        "address1": "26 King Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8195300, "lng": 144.9574600 }
    },
    {
        "id": "1070",
        "name": "7-Eleven Windsor",
        "address1": "259 Dandenong Road",
        "address2": "",
        "postcode": 3181,
        "suburb": "Windsor",
        "position": { "lat": -37.8587800, "lng": 145.0021600 }
    },
    {
        "id": "6796",
        "name": "Richmond Plaza Lottery",
        "address1": "258 Church Street ",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8190000, "lng": 144.9988700 }
    },
    {
        "id": "6679",
        "name": "24/7 Convenience Elizabeth Street",
        "address1": "257 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8127100, "lng": 144.9621500 }
    },
    {
        "id": "1220",
        "name": "7-Eleven 255 Chapel Street",
        "address1": "255 Chapel Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8499700, "lng": 144.9935100 }
    },
    {
        "id": "1245",
        "name": "7-Eleven Bayswater",
        "address1": "254-300 Canterbury Road (Corner Bayswater Road)",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater North",
        "position": { "lat": -37.8303400, "lng": 145.2732800 }
    },
    {
        "id": "6770",
        "name": "Edithvale News Tatts and Post",
        "address1": "253 Nepean Highway",
        "address2": "",
        "postcode": 3196,
        "suburb": "Edithvale",
        "position": { "lat": -38.0377200, "lng": 145.1078500 }
    },
    {
        "id": "1302",
        "name": "7-Eleven Mill Park",
        "address1": "252 Childs Road (Corner Morang Drive)",
        "address2": "",
        "postcode": 3082,
        "suburb": "Mill Park",
        "position": { "lat": -37.6620200, "lng": 145.0534400 }
    },
    {
        "id": "6193",
        "name": "East Ivanhoe News, Post and Lotto",
        "address1": "251 Lower Heidelberg Road",
        "address2": "",
        "postcode": 3079,
        "suburb": "Ivanhoe East",
        "position": { "lat": -37.7726500, "lng": 145.0592900 }
    },
    {
        "id": "1288",
        "name": "7-Eleven Hallam",
        "address1": "25-29 Belgrave-Hallam Road (Corner Frawley Road)",
        "address2": "",
        "postcode": 3803,
        "suburb": "Hallam",
        "position": { "lat": -38.0021200, "lng": 145.2737000 }
    },
    {
        "id": "6745",
        "name": "Macedon Newsagency and LPO",
        "address1": "25 Victoria Street",
        "address2": "",
        "postcode": 3440,
        "suburb": "Macedon",
        "position": { "lat": -37.4231200, "lng": 144.5642500 }
    },
    {
        "id": "6200",
        "name": "Preston Town Hall Newsagency",
        "address1": "249 Murray Road",
        "address2": "",
        "postcode": 3072,
        "suburb": "Preston",
        "position": { "lat": -37.7379400, "lng": 145.0029000 }
    },
    {
        "id": "6329",
        "name": "Yooralla Newsagency",
        "address1": "247A Belmore Road",
        "address2": "",
        "postcode": 3104,
        "suburb": "Balwyn North",
        "position": { "lat": -37.8032800, "lng": 145.0829000 }
    },
    {
        "id": "6149",
        "name": "ZP Winner Milk Bar",
        "address1": "247 Koornang Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Carnegie",
        "position": { "lat": -37.8942900, "lng": 145.0559100 }
    },
    {
        "id": "1221",
        "name": "7-Eleven Malvern",
        "address1": "245 Glenferrie Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8579000, "lng": 145.0289400 }
    },
    {
        "id": "1279",
        "name": "7-Eleven Fitzroy",
        "address1": "244 Nicholson Street (Cnr. Johnston Street)",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.7977500, "lng": 144.9753500 }
    },
    {
        "id": "6730",
        "name": "Ashburton Lotto and Stationery",
        "address1": "243 High Street",
        "address2": "",
        "postcode": 3147,
        "suburb": "Ashburton",
        "position": { "lat": -37.8632300, "lng": 145.0787400 }
    },
    {
        "id": "6244",
        "name": "IGA Bittern Plus Liquor",
        "address1": "2428-2436 Frankston-Flinders Road",
        "address2": "",
        "postcode": 3918,
        "suburb": "Bittern",
        "position": { "lat": -38.3366200, "lng": 145.1774500 }
    },
    {
        "id": "1260",
        "name": "7-Eleven Chirnside Park",
        "address1": "242 Maroondah Highway",
        "address2": "",
        "postcode": 3116,
        "suburb": "Chirnside Park",
        "position": { "lat": -37.7605000, "lng": 145.3312800 }
    },
    {
        "id": "6618",
        "name": "Tian Cui&#039;s Milk Bar",
        "address1": "241 Nicholson Street",
        "address2": "",
        "postcode": 3057,
        "suburb": "Brunswick East",
        "position": { "lat": -37.7663000, "lng": 144.9802600 }
    },
    {
        "id": "9005",
        "name": "Moe Post Office",
        "address1": "24-30 Kirk Street",
        "address2": "",
        "postcode": 3825,
        "suburb": "Moe",
        "position": { "lat": -38.1751500, "lng": 146.2631100 }
    },
    {
        "id": "1019",
        "name": "7-Eleven Hawthorn",
        "address1": "24-30 Church Street",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8141800, "lng": 145.0221800 }
    },
    {
        "id": "6022",
        "name": "Mentone Authorised Newsagency and Tattslotto",
        "address1": "24-26 Como Parade West",
        "address2": "",
        "postcode": 3194,
        "suburb": "Mentone",
        "position": { "lat": -37.9818900, "lng": 145.0644000 }
    },
    {
        "id": "6023",
        "name": "Parkdale News Lotto and Post",
        "address1": "238 Como Parade West",
        "address2": "",
        "postcode": 3195,
        "suburb": "Parkdale",
        "position": { "lat": -37.9931900, "lng": 145.0758000 }
    },
    {
        "id": "6398",
        "name": "Syndal Newsagency",
        "address1": "238 Blackburn Road",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8738300, "lng": 145.1483700 }
    },
    {
        "id": "6250",
        "name": "Lilydale Newsagency and Lotto",
        "address1": "237 Main Street",
        "address2": "",
        "postcode": 3140,
        "suburb": "Lilydale",
        "position": { "lat": -37.7573900, "lng": 145.3514400 }
    },
    {
        "id": "1137",
        "name": "7-Eleven 237 Exhibition Street",
        "address1": "237 Exhibition Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8103100, "lng": 144.9695000 }
    },
    {
        "id": "6750",
        "name": "Newswu P/L",
        "address1": "235 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8133100, "lng": 144.9594900 }
    },
    {
        "id": "6675",
        "name": "Pearl News on Queen Street",
        "address1": "235 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8133600, "lng": 144.9597600 }
    },
    {
        "id": "1208",
        "name": "7-Eleven Caroline Springs",
        "address1": "235 -239 Caroline Springs Boulevarde",
        "address2": "",
        "postcode": 3023,
        "suburb": "Caroline Springs",
        "position": { "lat": -37.7290300, "lng": 144.7410000 }
    },
    {
        "id": "1296",
        "name": "7-Eleven Keilor East",
        "address1": "231 Milleara Road (Corner Amis Crescent)",
        "address2": "",
        "postcode": 3033,
        "suburb": "Keilor East",
        "position": { "lat": -37.7487300, "lng": 144.8618800 }
    },
    {
        "id": "1166",
        "name": "7-Eleven East Melbourne",
        "address1": "23-29 Victoria Street",
        "address2": "",
        "postcode": 3002,
        "suburb": "East Melbourne",
        "position": { "lat": -37.8073100, "lng": 144.9669100 }
    },
    {
        "id": "1130",
        "name": "7-Eleven 228 Queen Street",
        "address1": "228 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8132200, "lng": 144.9600500 }
    },
    {
        "id": "6355",
        "name": "City Convenience Store",
        "address1": "228 Flinders Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8176200, "lng": 144.9665800 }
    },
    {
        "id": "1291",
        "name": "7-Eleven Hawthorn",
        "address1": "228 Barkers Road (Corner Glenferrie Road)",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8150600, "lng": 145.0371600 }
    },
    {
        "id": "6111",
        "name": "Foodworks Northcote",
        "address1": "227 St Georges Road",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7653400, "lng": 144.9916500 }
    },
    {
        "id": "6531",
        "name": "Northfield Convenience Store",
        "address1": "225-227 Station Street",
        "address2": "",
        "postcode": 3078,
        "suburb": "Fairfield",
        "position": { "lat": -37.7715900, "lng": 145.0195600 }
    },
    {
        "id": "1136",
        "name": "7-Eleven 222 Swanston Street",
        "address1": "222 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8126500, "lng": 144.9655100 }
    },
    {
        "id": "6549",
        "name": "DUSA Bookshop - Deakin University",
        "address1": "221 Burwood Highway",
        "address2": "",
        "postcode": 3125,
        "suburb": "Burwood",
        "position": { "lat": -37.8488900, "lng": 145.1157300 }
    },
    {
        "id": "6052",
        "name": "Moreland Post Office",
        "address1": "22 Sydney Road",
        "address2": "",
        "postcode": 3058,
        "suburb": "Moreland",
        "position": { "lat": -37.7549400, "lng": 144.9643400 }
    },
    {
        "id": "1059",
        "name": "7-Eleven Bayswater",
        "address1": "22 Scoresby Road",
        "address2": "",
        "postcode": 3153,
        "suburb": "Bayswater",
        "position": { "lat": -37.8447800, "lng": 145.2696200 }
    },
    {
        "id": "1199",
        "name": "7-Eleven Mooroolbark",
        "address1": "22 Manchester Road",
        "address2": "",
        "postcode": 3138,
        "suburb": "Mooroolbark",
        "position": { "lat": -37.7871600, "lng": 145.3109000 }
    },
    {
        "id": "6220",
        "name": "Golden Star Milk Bar",
        "address1": "22 Main Street",
        "address2": "",
        "postcode": 3158,
        "suburb": "Upwey",
        "position": { "lat": -37.9035400, "lng": 145.3300100 }
    },
    {
        "id": "6334",
        "name": "Community Pharmacy Mt. Waverley",
        "address1": "22 Hamilton Place",
        "address2": "",
        "postcode": 3149,
        "suburb": "Mount Waverley",
        "position": { "lat": -37.8758300, "lng": 145.1285500 }
    },
    {
        "id": "6276",
        "name": "Noble Park Tatts",
        "address1": "22 Douglas Street",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9661300, "lng": 145.1744600 }
    },
    {
        "id": "6670",
        "name": "Dallas News and Lotto",
        "address1": "22 Dargie Court",
        "address2": "",
        "postcode": 3047,
        "suburb": "Dallas",
        "position": { "lat": -37.6726700, "lng": 144.9307500 }
    },
    {
        "id": "6409",
        "name": "Cignall Flinders Street",
        "address1": "217 Flinders Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8176400, "lng": 144.9666900 }
    },
    {
        "id": "6784",
        "name": "Ascot Vale Central Post Office and Newsagency",
        "address1": "217 Ascot Vale Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7757600, "lng": 144.9231900 }
    },
    {
        "id": "1022",
        "name": "7-Eleven St Kilda",
        "address1": "214-218 Barkly Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8701900, "lng": 144.9808200 }
    },
    {
        "id": "6569",
        "name": "Four Square Store",
        "address1": "212 Victoria Street",
        "address2": "",
        "postcode": 3028,
        "suburb": "Altona Meadows",
        "position": { "lat": -37.8831900, "lng": 144.7848200 }
    },
    {
        "id": "1031",
        "name": "7-Eleven McKinnon",
        "address1": "211 Tucker Road",
        "address2": "",
        "postcode": 3204,
        "suburb": "McKinnon",
        "position": { "lat": -37.9125300, "lng": 145.0518500 }
    },
    {
        "id": "1227",
        "name": "7-Eleven Carlisle",
        "address1": "211 Carlisle Street",
        "address2": "",
        "postcode": 3183,
        "suburb": "Balaclava",
        "position": { "lat": -37.8688900, "lng": 144.9938400 }
    },
    {
        "id": "6230",
        "name": "Olsen Place Newsagency",
        "address1": "21 Olsen Place",
        "address2": "",
        "postcode": 3047,
        "suburb": "Broadmeadows",
        "position": { "lat": -37.6897900, "lng": 144.9264300 }
    },
    {
        "id": "6647",
        "name": "Wendy Milk Bar",
        "address1": "21 Coleman Parade",
        "address2": "",
        "postcode": 3150,
        "suburb": "Glen Waverley",
        "position": { "lat": -37.8766500, "lng": 145.1488800 }
    },
    {
        "id": "9006",
        "name": "Morwell Post Office",
        "address1": "209 Princes Dr",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2367100, "lng": 146.3990500 }
    },
    {
        "id": "6294",
        "name": "NewsXpress Ascot Vale",
        "address1": "208 Union Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7734200, "lng": 144.9160000 }
    },
    {
        "id": "1223",
        "name": "7-Eleven South Melbourne",
        "address1": "206 Clarendon Street",
        "address2": "",
        "postcode": 3205,
        "suburb": "South Melbourne",
        "position": { "lat": -37.8310100, "lng": 144.9594800 }
    },
    {
        "id": "6639",
        "name": "Torquay Road Milkbar",
        "address1": "205 Torquay Road",
        "address2": "",
        "postcode": 3216,
        "suburb": "Grovedale",
        "position": { "lat": -38.1992800, "lng": 144.3414100 }
    },
    {
        "id": "6522",
        "name": "Ross St Milk Bar",
        "address1": "205 Ross Street",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8339000, "lng": 144.9398100 }
    },
    {
        "id": "6619",
        "name": "Cignall Queen Street",
        "address1": "205 Queen Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8139400, "lng": 144.9599700 }
    },
    {
        "id": "1151",
        "name": "7-Eleven Five Ways",
        "address1": "2025 South Gippsland Highway",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne",
        "position": { "lat": -38.1588600, "lng": 145.3186000 }
    },
    {
        "id": "1089",
        "name": "7-Eleven Mount Waverley",
        "address1": "200-202 Waverley Road",
        "address2": "",
        "postcode": 3149,
        "suburb": "Mount Waverley",
        "position": { "lat": -37.8828400, "lng": 145.1092500 }
    },
    {
        "id": "6085",
        "name": "S and J Lotto and Gifts",
        "address1": "200 Smith Street",
        "address2": "",
        "postcode": 3066,
        "suburb": "Collingwood",
        "position": { "lat": -37.8029100, "lng": 144.9838000 }
    },
    {
        "id": "1020",
        "name": "7-Eleven Boronia",
        "address1": "200 Dorset Road",
        "address2": "",
        "postcode": 3155,
        "suburb": "Boronia",
        "position": { "lat": -37.8639200, "lng": 145.2857500 }
    },
    {
        "id": "6347",
        "name": "Footscray IGA Plus Liquor",
        "address1": "200 Ballarat Road",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.7911800, "lng": 144.8898900 }
    },
    {
        "id": "6662",
        "name": "Lynbrook Village Lotto and News",
        "address1": "20/75 Lynbrook Boulevard",
        "address2": "",
        "postcode": 3975,
        "suburb": "Lynbrook",
        "position": { "lat": -38.0517100, "lng": 145.2568500 }
    },
    {
        "id": "1004",
        "name": "7-Eleven Brunswick",
        "address1": "20 Sydney Road",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7773400, "lng": 144.9608200 }
    },
    {
        "id": "6131",
        "name": "South Yarra News and Lotto",
        "address1": "2/102 Toorak Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8388700, "lng": 144.9899400 }
    },
    {
        "id": "6191",
        "name": "Greenbrook Convenience Store",
        "address1": "2, 53 McDonalds Road",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6463700, "lng": 145.0403400 }
    },
    {
        "id": "1196",
        "name": "7-Eleven Federation Square",
        "address1": "2 Swanston Street Ground Floor, East Shared Building, Federation Square",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8176200, "lng": 144.9683600 }
    },
    {
        "id": "6604",
        "name": "Beaumaris Authorised Newsagency",
        "address1": "2 South Concourse",
        "address2": "",
        "postcode": 3193,
        "suburb": "Beaumaris",
        "position": { "lat": -37.9864800, "lng": 145.0332100 }
    },
    {
        "id": "1016",
        "name": "7-Eleven Elwood",
        "address1": "2 Ormond Road",
        "address2": "",
        "postcode": 3184,
        "suburb": "Elwood",
        "position": { "lat": -37.8824500, "lng": 144.9821700 }
    },
    {
        "id": "6573",
        "name": "Newlands Food Store",
        "address1": "2 Murray Road",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg",
        "position": { "lat": -37.7357700, "lng": 144.9826900 }
    },
    {
        "id": "1270",
        "name": "7-Eleven Ringwood",
        "address1": "2 Loughnan Road (Corner Warrndyte Road)",
        "address2": "",
        "postcode": 3134,
        "suburb": "East Ringwood",
        "position": { "lat": -37.8050900, "lng": 145.2299200 }
    },
    {
        "id": "6483",
        "name": "NewsXpress Mt Martha",
        "address1": "2 Lochiel Avenue",
        "address2": "",
        "postcode": 3934,
        "suburb": "Mount Martha",
        "position": { "lat": -38.2680100, "lng": 145.0129700 }
    },
    {
        "id": "1029",
        "name": "7-Eleven Ascot Vale",
        "address1": "2 Epsom Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Ascot Vale",
        "position": { "lat": -37.7708000, "lng": 144.9050000 }
    },
    {
        "id": "6285",
        "name": "Empire&#039;s Milk Bar",
        "address1": "2 Empire Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.7907000, "lng": 144.8913300 }
    },
    {
        "id": "1249",
        "name": "7-Eleven Blackburn South",
        "address1": "2 Canterbury Road (Corner Middleborough Road)",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn South",
        "position": { "lat": -37.8306900, "lng": 145.1369500 }
    },
    {
        "id": "6252",
        "name": "Mont Albert Licensed Post Office",
        "address1": "1A Hamilton Street",
        "address2": "",
        "postcode": 3127,
        "suburb": "Mont Albert",
        "position": { "lat": -37.8210700, "lng": 145.1049400 }
    },
    {
        "id": "1193",
        "name": "7-Eleven Chinatown",
        "address1": "197 Russell Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8119500, "lng": 144.9675300 }
    },
    {
        "id": "1132",
        "name": "7-Eleven 197 Elizabeth Street",
        "address1": "197 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8137600, "lng": 144.9626500 }
    },
    {
        "id": "6800",
        "name": "Prahran Convenience",
        "address1": "196 Commercial Road",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8466700, "lng": 144.9927300 }
    },
    {
        "id": "6121",
        "name": "Ivanhoe Newsagency",
        "address1": "194-196 Upper Heidelberg Road",
        "address2": "",
        "postcode": 3079,
        "suburb": "Ivanhoe",
        "position": { "lat": -37.7677200, "lng": 145.0440100 }
    },
    {
        "id": "6046",
        "name": "J and M Douglas Pharmacy",
        "address1": "192 Bridport Street",
        "address2": "",
        "postcode": 3206,
        "suburb": "Albert Park",
        "position": { "lat": -37.8409700, "lng": 144.9540000 }
    },
    {
        "id": "6056",
        "name": "Port Melbourne News and Lotto",
        "address1": "192 Bay Street",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8393400, "lng": 144.9420900 }
    },
    {
        "id": "6622",
        "name": "Alex&#039;s Convenience Store",
        "address1": "191 Thames Promenade",
        "address2": "",
        "postcode": 3196,
        "suburb": "Chelsea Heights",
        "position": { "lat": -38.0453100, "lng": 145.1359400 }
    },
    {
        "id": "6493",
        "name": "Nicholson St Lotto",
        "address1": "191 Nicholson Street",
        "address2": "",
        "postcode": 3057,
        "suburb": "Brunswick East",
        "position": { "lat": -37.7691700, "lng": 144.9797600 }
    },
    {
        "id": "6328",
        "name": "Fultons Pharmacy and Whitburn Post Agency",
        "address1": "1907 Dandenong Road",
        "address2": "",
        "postcode": 3168,
        "suburb": "Clayton",
        "position": { "lat": -37.9112300, "lng": 145.1228400 }
    },
    {
        "id": "1139",
        "name": "7-Eleven 190 Bourke Street",
        "address1": "190 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8128500, "lng": 144.9675600 }
    },
    {
        "id": "1157",
        "name": "7-Eleven St Kilda Junction",
        "address1": "19-39 Punt Road",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda Junction",
        "position": { "lat": -37.8543300, "lng": 144.9830900 }
    },
    {
        "id": "1246",
        "name": "7-Eleven Belmont",
        "address1": "19-21 Settlement Road",
        "address2": "",
        "postcode": 3216,
        "suburb": "Belmont",
        "position": { "lat": -38.1791600, "lng": 144.3514000 }
    },
    {
        "id": "1165",
        "name": "7-Eleven Mornington",
        "address1": "19-21 Mornington-Tyabb Road",
        "address2": "",
        "postcode": 3931,
        "suburb": "Mornington",
        "position": { "lat": -38.2313100, "lng": 145.0464400 }
    },
    {
        "id": "6481",
        "name": "Priceline Pharmacy Autumn Place",
        "address1": "19-20 Autumn Place",
        "address2": "",
        "postcode": 3177,
        "suburb": "Doveton",
        "position": { "lat": -37.9945000, "lng": 145.2388400 }
    },
    {
        "id": "1164",
        "name": "7-Eleven Clayton",
        "address1": "187-191 Clayton Road",
        "address2": "",
        "postcode": 3168,
        "suburb": "Clayton",
        "position": { "lat": -37.9134400, "lng": 145.1217100 }
    },
    {
        "id": "1222",
        "name": "7-Eleven Domain Road",
        "address1": "187-189 Domain Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8342400, "lng": 144.9823600 }
    },
    {
        "id": "1185",
        "name": "7-Eleven Richmond East",
        "address1": "185 Swan Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond East",
        "position": { "lat": -37.8255700, "lng": 144.9975000 }
    },
    {
        "id": "1348",
        "name": "7Eleven Cranbourne West",
        "address1": "185 Evans Road",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne West",
        "position": { "lat": -38.0916600, "lng": 145.2557500 }
    },
    {
        "id": "6061",
        "name": "Brunswick Street News and Lotto",
        "address1": "185 Brunswick Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8019200, "lng": 144.9776500 }
    },
    {
        "id": "1007",
        "name": "7-Eleven East Malvern",
        "address1": "1846 Malvern Road",
        "address2": "",
        "postcode": 3145,
        "suburb": "Hampton Park",
        "position": { "lat": -37.8700700, "lng": 145.0610700 }
    },
    {
        "id": "1290",
        "name": "7-Eleven Hastings",
        "address1": "1835 Frankston-Flinders Road (Corner Grayden Road)",
        "address2": "",
        "postcode": 3915,
        "suburb": "Hastings",
        "position": { "lat": -38.2850100, "lng": 145.1841900 }
    },
    {
        "id": "6097",
        "name": "Essex Milk Bar",
        "address1": "182a Essex Street",
        "address2": "",
        "postcode": 3012,
        "suburb": "West Footscray",
        "position": { "lat": -37.7929300, "lng": 144.8728800 }
    },
    {
        "id": "6407",
        "name": "Lotus Milk Bar",
        "address1": "182 Riversdale Road",
        "address2": "",
        "postcode": 3122,
        "suburb": "Hawthorn",
        "position": { "lat": -37.8299000, "lng": 145.0413700 }
    },
    {
        "id": "1202",
        "name": "7-Eleven Ringwood North",
        "address1": "181 Warrandyte Road",
        "address2": "",
        "postcode": 3134,
        "suburb": "Ringwood North",
        "position": { "lat": -37.7941240, "lng": 145.2349720 }
    },
    {
        "id": "1338",
        "name": "7-Eleven Werribee South",
        "address1": "180 Duncans Road (Corner Edwards Road)",
        "address2": "",
        "postcode": 3030,
        "suburb": "Werribee",
        "position": { "lat": -37.9092800, "lng": 144.6769400 }
    },
    {
        "id": "6591",
        "name": "Maddison Lea Cafe",
        "address1": "18, 70 Warringa Crescent",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8838600, "lng": 144.6898500 }
    },
    {
        "id": "6253",
        "name": "Nunawading Milk Bar",
        "address1": "18 Station Street",
        "address2": "",
        "postcode": 3131,
        "suburb": "Nunawading",
        "position": { "lat": -37.8207200, "lng": 145.1765700 }
    },
    {
        "id": "6411",
        "name": "O&#039;Marche IGA Xpress",
        "address1": "18 Rakaia Way",
        "address2": "",
        "postcode": 3008,
        "suburb": "Docklands",
        "position": { "lat": -37.8145400, "lng": 144.9408800 }
    },
    {
        "id": "6780",
        "name": "On Track Cafe",
        "address1": "18 Golden Green Street",
        "address2": "",
        "postcode": 3810,
        "suburb": "Pakenham",
        "position": { "lat": -38.0719400, "lng": 145.4387400 }
    },
    {
        "id": "6353",
        "name": "Bradman&#039;s Kiosk",
        "address1": "179 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8132800, "lng": 144.9654000 }
    },
    {
        "id": "6674",
        "name": "IGA Xpress Malvern East",
        "address1": "177 Waverley Road",
        "address2": "",
        "postcode": 3145,
        "suburb": "Malvern East",
        "position": { "lat": -37.8761800, "lng": 145.0508100 }
    },
    {
        "id": "6734",
        "name": "News On Q",
        "address1": "175 High Street",
        "address2": "",
        "postcode": 3101,
        "suburb": "Kew",
        "position": { "lat": -37.8066400, "lng": 145.0310300 }
    },
    {
        "id": "1210",
        "name": "7-Eleven Prahran",
        "address1": "174-180 Chapel Street",
        "address2": "",
        "postcode": 3181,
        "suburb": "Prahran",
        "position": { "lat": -37.8519800, "lng": 144.9934400 }
    },
    {
        "id": "6642",
        "name": "Morwell Newspower Newsagency",
        "address1": "174-176 Commercial Road",
        "address2": "",
        "postcode": 3840,
        "suburb": "Morwell",
        "position": { "lat": -38.2372000, "lng": 146.3962900 }
    },
    {
        "id": "6180",
        "name": "Belgrave Authorised Newsagency",
        "address1": "1704 Burwood Highway",
        "address2": "",
        "postcode": 3160,
        "suburb": "Belgrave",
        "position": { "lat": -37.9087500, "lng": 145.3549300 }
    },
    {
        "id": "1056",
        "name": "7-Eleven Gardenvale",
        "address1": "170 Martin Street",
        "address2": "",
        "postcode": 3185,
        "suburb": "Gardenvale",
        "position": { "lat": -37.8978100, "lng": 145.0051800 }
    },
    {
        "id": "6137",
        "name": "Merlynston Newsagency",
        "address1": "17 Merlyn Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg North",
        "position": { "lat": -37.7202300, "lng": 144.9599400 }
    },
    {
        "id": "9008",
        "name": "Traralgon Business Centre",
        "address1": "17 Church Street",
        "address2": "",
        "postcode": 3844,
        "suburb": "Traralgon",
        "position": { "lat": -38.1975800, "lng": 146.5348700 }
    },
    {
        "id": "6090",
        "name": "Gertrude Street Mini Mart",
        "address1": "169-171 Gertrude Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8059000, "lng": 144.9801800 }
    },
    {
        "id": "6297",
        "name": "Gardenvale Authorised Newsagency",
        "address1": "168 Martin Street",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.8976200, "lng": 145.0050900 }
    },
    {
        "id": "6033",
        "name": "East Brunswick Post Tatts and Newsagent",
        "address1": "167 Lygon Street",
        "address2": "",
        "postcode": 3057,
        "suburb": "Brunswick East",
        "position": { "lat": -37.7730200, "lng": 144.9711100 }
    },
    {
        "id": "6070",
        "name": "Albion Budget Supermarket",
        "address1": "166-168 Melville Road",
        "address2": "",
        "postcode": 3055,
        "suburb": "Brunswick West",
        "position": { "lat": -37.7585400, "lng": 144.9450800 }
    },
    {
        "id": "6560",
        "name": "West Rosebud Newsagency",
        "address1": "1643 Point Nepean Road",
        "address2": "",
        "postcode": 3940,
        "suburb": "Rosebud West",
        "position": { "lat": -38.3638400, "lng": 144.8760100 }
    },
    {
        "id": "1012",
        "name": "7-Eleven Northcote",
        "address1": "164 Victoria Road",
        "address2": "",
        "postcode": 3032,
        "suburb": "Northcote",
        "position": { "lat": -37.7707800, "lng": 145.0117800 }
    },
    {
        "id": "1065",
        "name": "7-Eleven Flemington",
        "address1": "163-173 Boundary Road",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7894200, "lng": 144.9397700 }
    },
    {
        "id": "6331",
        "name": "Posteah Express",
        "address1": "1626 High Street",
        "address2": "",
        "postcode": 3146,
        "suburb": "Glen Iris",
        "position": { "lat": -37.8601900, "lng": 145.0581200 }
    },
    {
        "id": "9009",
        "name": "Traralgon Post Office",
        "address1": "161-169 Franklin Street",
        "address2": "",
        "postcode": 3844,
        "suburb": "Traralgon",
        "position": { "lat": -38.1951200, "lng": 146.5378600 }
    },
    {
        "id": "1218",
        "name": "7-Eleven Argyle Square",
        "address1": "161 Lygon Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8019300, "lng": 144.9665400 }
    },
    {
        "id": "1257",
        "name": "7-Eleven Campbellfield",
        "address1": "1603 Sydney Road",
        "address2": "",
        "postcode": 3061,
        "suburb": "Campbellfield",
        "position": { "lat": -37.6743300, "lng": 144.9553000 }
    },
    {
        "id": "6721",
        "name": "Acland Court Pharmacy ",
        "address1": "160 Acland Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8691100, "lng": 144.9806000 }
    },
    {
        "id": "6427",
        "name": "Williamstown News and Lotto",
        "address1": "16 Douglas Parade",
        "address2": "",
        "postcode": 3016,
        "suburb": "Williamstown",
        "position": { "lat": -37.8583400, "lng": 144.8980800 }
    },
    {
        "id": "6360",
        "name": "East Burwood Newsagency",
        "address1": "16 Burwood Highway",
        "address2": "",
        "postcode": 3151,
        "suburb": "Burwood East",
        "position": { "lat": -37.8506600, "lng": 145.0962700 }
    },
    {
        "id": "6051",
        "name": "Middle Park Newsagency and Office Metro",
        "address1": "16 Armstrong Street",
        "address2": "",
        "postcode": 3206,
        "suburb": "Middle Park",
        "position": { "lat": -37.8498500, "lng": 144.9643900 }
    },
    {
        "id": "1320",
        "name": "7-Eleven Rockbank",
        "address1": "1593 Western Highway",
        "address2": "",
        "postcode": 3335,
        "suburb": "Rockbank",
        "position": { "lat": -37.7470000, "lng": 144.7029400 }
    },
    {
        "id": "1181",
        "name": "7-Eleven Swanston Street",
        "address1": "159 Swanston Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8140800, "lng": 144.9656100 }
    },
    {
        "id": "6506",
        "name": "Croydon Newsagency",
        "address1": "158 Main Street",
        "address2": "",
        "postcode": 3136,
        "suburb": "Croydon",
        "position": { "lat": -37.7977200, "lng": 145.2808900 }
    },
    {
        "id": "6309",
        "name": "Moonee Ponds Supermarket",
        "address1": "156 Pascoe Vale Road",
        "address2": "",
        "postcode": 3039,
        "suburb": "Moonee Ponds",
        "position": { "lat": -37.7600300, "lng": 144.9263100 }
    },
    {
        "id": "1326",
        "name": "7-Eleven St Kilda",
        "address1": "154-158 St Kilda Road (Corner Alma Road)",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8609700, "lng": 144.9850200 }
    },
    {
        "id": "6505",
        "name": "Westall Milk Bar",
        "address1": "154 Rosebank Avenue",
        "address2": "",
        "postcode": 3169,
        "suburb": "Clayton South",
        "position": { "lat": -37.9404700, "lng": 145.1389500 }
    },
    {
        "id": "6248",
        "name": "Tecoma Newsagency",
        "address1": "1537 Burwood Highway",
        "address2": "",
        "postcode": 3160,
        "suburb": "Tecoma",
        "position": { "lat": -37.9064800, "lng": 145.3442400 }
    },
    {
        "id": "6519",
        "name": "St George Food Store",
        "address1": "153 St Georges Road",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7682700, "lng": 144.9910800 }
    },
    {
        "id": "1219",
        "name": "7-Eleven 152 Exhibition Street",
        "address1": "152 Exhibition Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8121800, "lng": 144.9708000 }
    },
    {
        "id": "6422",
        "name": "Heathmont Authorised Newsagency",
        "address1": "150 Canterbury Road",
        "address2": "",
        "postcode": 3135,
        "suburb": "Heathmont",
        "position": { "lat": -37.8285000, "lng": 145.2464900 }
    },
    {
        "id": "1192",
        "name": "7-Eleven Caulfield Station",
        "address1": "15-17 Sir John Monash Drive",
        "address2": "",
        "postcode": 3162,
        "suburb": "Caulfield",
        "position": { "lat": -37.8767500, "lng": 145.0422600 }
    },
    {
        "id": "6566",
        "name": "Croxton Milk Bar",
        "address1": "15 Spencer Street",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7639400, "lng": 144.9964600 }
    },
    {
        "id": "6287",
        "name": "Essendon News / Tatts",
        "address1": "15 Rose Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7563200, "lng": 144.9155700 }
    },
    {
        "id": "6612",
        "name": "U Pharmacy North Melbourne",
        "address1": "15 Melrose Street",
        "address2": "",
        "postcode": 3051,
        "suburb": "North Melbourne",
        "position": { "lat": -37.7953400, "lng": 144.9414300 }
    },
    {
        "id": "6787",
        "name": "Kingsbury Foodworks",
        "address1": "15 Link Street",
        "address2": "",
        "postcode": 3083,
        "suburb": "Kingsbury",
        "position": { "lat": -37.7138100, "lng": 145.0345700 }
    },
    {
        "id": "6165",
        "name": "Garden City Newsagency",
        "address1": "15 Centre Avenue",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8365500, "lng": 144.9197100 }
    },
    {
        "id": "6429",
        "name": "Beatty Ave Post Office and General Store",
        "address1": "15 Beatty Avenue",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8506600, "lng": 145.0142800 }
    },
    {
        "id": "1046",
        "name": "7-Eleven Albert Park",
        "address1": "147 Victoria Avenue",
        "address2": "",
        "postcode": 3206,
        "suburb": "Albert Park",
        "position": { "lat": -37.8460900, "lng": 144.9498000 }
    },
    {
        "id": "6017",
        "name": "Thao Nguyen Pharmacy",
        "address1": "146 Victoria Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8102900, "lng": 144.9963600 }
    },
    {
        "id": "1189",
        "name": "7-Eleven Melton",
        "address1": "145-147 Coburns Road",
        "address2": "",
        "postcode": 3337,
        "suburb": "Melton",
        "position": { "lat": -37.6866300, "lng": 144.5676500 }
    },
    {
        "id": "6513",
        "name": "Malvern Road Milk Bar",
        "address1": "1446 Malvern Road",
        "address2": "",
        "postcode": 3146,
        "suburb": "Glen Iris",
        "position": { "lat": -37.8536100, "lng": 145.0447500 }
    },
    {
        "id": "1335",
        "name": "7-Eleven Upwey",
        "address1": "1441 Burwood Highway (Corner Mast Gully Road)",
        "address2": "",
        "postcode": 3158,
        "suburb": "Upwey",
        "position": { "lat": -37.9018800, "lng": 145.3301600 }
    },
    {
        "id": "1073",
        "name": "7-Eleven Newcomb",
        "address1": "144-150 Bellarine Highway",
        "address2": "",
        "postcode": 3219,
        "suburb": "Newcomb",
        "position": { "lat": -38.1735500, "lng": 144.4025800 }
    },
    {
        "id": "6008",
        "name": "Carlisle Newsagency",
        "address1": "143 Carlisle Street",
        "address2": "",
        "postcode": 3183,
        "suburb": "Balaclava",
        "position": { "lat": -37.8686100, "lng": 144.9914900 }
    },
    {
        "id": "1173",
        "name": "7-Eleven MCG Melbourne",
        "address1": "142 Wellington Parade",
        "address2": "",
        "postcode": 3002,
        "suburb": "East Melbourne",
        "position": { "lat": -37.8162300, "lng": 144.9854000 }
    },
    {
        "id": "1155",
        "name": "7-Eleven Research",
        "address1": "1419 Main Road",
        "address2": "",
        "postcode": 3095,
        "suburb": "Research",
        "position": { "lat": -37.7018000, "lng": 145.1730100 }
    },
    {
        "id": "6655",
        "name": "Station Street IGA",
        "address1": "140 Station Street",
        "address2": "",
        "postcode": 3078,
        "suburb": "Fairfield",
        "position": { "lat": -37.7763300, "lng": 145.0184800 }
    },
    {
        "id": "1158",
        "name": "7-Eleven Williamstown North",
        "address1": "14 Kororoit Creek Road",
        "address2": "",
        "postcode": 3016,
        "suburb": "Williamstown North",
        "position": { "lat": -37.8574800, "lng": 144.8879100 }
    },
    {
        "id": "6503",
        "name": "Caulfield Authorised Newsagency",
        "address1": "14 Derby Road",
        "address2": "",
        "postcode": 3145,
        "suburb": "Caulfield East",
        "position": { "lat": -37.8759400, "lng": 145.0420400 }
    },
    {
        "id": "6228",
        "name": "Scoresby News, Tatts and Post",
        "address1": "14 Darryl Street",
        "address2": "",
        "postcode": 3179,
        "suburb": "Scoresby",
        "position": { "lat": -37.8983100, "lng": 145.2307500 }
    },
    {
        "id": "6005",
        "name": "Armadale Village Deli",
        "address1": "14 Cheel Street",
        "address2": "",
        "postcode": 3143,
        "suburb": "Armadale",
        "position": { "lat": -37.8565600, "lng": 145.0192000 }
    },
    {
        "id": "6463",
        "name": "Nextra Sunbury Newsagency",
        "address1": "14 Brook Street",
        "address2": "",
        "postcode": 3429,
        "suburb": "Sunbury",
        "position": { "lat": -37.5802400, "lng": 144.7299100 }
    },
    {
        "id": "6044",
        "name": "Burwood Authorised Newsagency",
        "address1": "1394 Toorak Road",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8505100, "lng": 145.0941900 }
    },
    {
        "id": "6652",
        "name": "Rosanna Milk Bar",
        "address1": "139 Lower Plenty Road",
        "address2": "",
        "postcode": 3084,
        "suburb": "Rosanna",
        "position": { "lat": -37.7425000, "lng": 145.0652900 }
    },
    {
        "id": "6634",
        "name": "Bacchus Marsh Newsagency and Stationers",
        "address1": "138 Main Street",
        "address2": "",
        "postcode": 3340,
        "suburb": "Bacchus Marsh",
        "position": { "lat": -37.6756900, "lng": 144.4371800 }
    },
    {
        "id": "6471",
        "name": "BP Malvern",
        "address1": "1367 High Street",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8578700, "lng": 145.0406500 }
    },
    {
        "id": "6043",
        "name": "Malvern Village News and Lotto",
        "address1": "1352 Malvern Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8532900, "lng": 145.0408100 }
    },
    {
        "id": "2170",
        "name": "7-Eleven Coolaroo",
        "address1": "1350 Pascoe Vale Road",
        "address2": "",
        "postcode": 3048,
        "suburb": "Coolaroo",
        "position": { "lat": -37.6628200, "lng": 144.9230910 }
    },
    {
        "id": "6740",
        "name": "Foodworks South Melbourne",
        "address1": "135 Wells Street",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8301100, "lng": 144.9694700 }
    },
    {
        "id": "6598",
        "name": "Cignall Thornbury",
        "address1": "135 Miller Street",
        "address2": "",
        "postcode": 3071,
        "suburb": "Thornbury",
        "position": { "lat": -37.7511700, "lng": 144.9884300 }
    },
    {
        "id": "9002",
        "name": "Strathdale LPO",
        "address1": "134-136 Condon Street",
        "address2": "",
        "postcode": 3550,
        "suburb": "Bendigo",
        "position": { "lat": -36.7736500, "lng": 144.3057000 }
    },
    {
        "id": "6167",
        "name": "Knoxgate Milk Bar",
        "address1": "1318 High Street Road",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna South",
        "position": { "lat": -37.8772200, "lng": 145.2216500 }
    },
    {
        "id": "6551",
        "name": "The Flat Shop",
        "address1": "130 Racecourse Road",
        "address2": "",
        "postcode": 3031,
        "suburb": "Flemington",
        "position": { "lat": -37.7874800, "lng": 144.9359400 }
    },
    {
        "id": "6035",
        "name": "Daffey&#039;s Pharmacy",
        "address1": "130 Nicholson Street",
        "address2": "",
        "postcode": 3011,
        "suburb": "Footscray",
        "position": { "lat": -37.8011700, "lng": 144.8991200 }
    },
    {
        "id": "6710",
        "name": "Select 7 Lonsdale",
        "address1": "13/50 Lonsdale Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8095900, "lng": 144.9710100 }
    },
    {
        "id": "6265",
        "name": "Aspendale Newsagency Tatts and Post",
        "address1": "129 Station Street",
        "address2": "",
        "postcode": 3195,
        "suburb": "Aspendale",
        "position": { "lat": -38.0265600, "lng": 145.1021400 }
    },
    {
        "id": "1161",
        "name": "7-Eleven Sunbury",
        "address1": "128 Gap Road",
        "address2": "",
        "postcode": 3429,
        "suburb": "Sunbury",
        "position": { "lat": -37.5783300, "lng": 144.7116200 }
    },
    {
        "id": "6300",
        "name": "Braybrook News and Lotto",
        "address1": "127 South Road",
        "address2": "",
        "postcode": 3019,
        "suburb": "Braybrook",
        "position": { "lat": -37.7908900, "lng": 144.8457300 }
    },
    {
        "id": "1058",
        "name": "7-Eleven Nunawading",
        "address1": "126-128 Springvale Road",
        "address2": "",
        "postcode": 3131,
        "suburb": "Nunawading",
        "position": { "lat": -37.8175300, "lng": 145.1758200 }
    },
    {
        "id": "6077",
        "name": "Fitzroy Newsagency",
        "address1": "125 Johnston Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.7982900, "lng": 144.9790700 }
    },
    {
        "id": "6009",
        "name": "High Street Convenience Store",
        "address1": "125 High Street",
        "address2": "",
        "postcode": 3101,
        "suburb": "Kew",
        "position": { "lat": -37.8070400, "lng": 145.0295800 }
    },
    {
        "id": "6671",
        "name": "Elizabeth Pharmacy",
        "address1": "125 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8153600, "lng": 144.9635000 }
    },
    {
        "id": "1174",
        "name": "7-Eleven Wantirna Sth",
        "address1": "1247 High Street Road",
        "address2": "",
        "postcode": 3152,
        "suburb": "Wantirna South",
        "position": { "lat": -37.8765200, "lng": 145.2149800 }
    },
    {
        "id": "6214",
        "name": "Sandown Village Post Office",
        "address1": "124 Police Road",
        "address2": "",
        "postcode": 3171,
        "suburb": "Springvale",
        "position": { "lat": -37.9348200, "lng": 145.1688800 }
    },
    {
        "id": "6759",
        "name": "Seaford News and Lotto",
        "address1": "124 Nepean Highway",
        "address2": "",
        "postcode": 3198,
        "suburb": "Seaford",
        "position": { "lat": -38.1031800, "lng": 145.1260300 }
    },
    {
        "id": "1346",
        "name": "7-Eleven Elizabeth Street",
        "address1": "124 Elizabeth Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8150600, "lng": 144.9638300 }
    },
    {
        "id": "6257",
        "name": "Heidelberg Newsagency",
        "address1": "124 Burgundy Street",
        "address2": "",
        "postcode": 3084,
        "suburb": "Heidelberg",
        "position": { "lat": -37.7558000, "lng": 145.0660800 }
    },
    {
        "id": "6319",
        "name": "Thompson Road Newsagency",
        "address1": "123A Thompsons Road",
        "address2": "",
        "postcode": 3105,
        "suburb": "Bulleen",
        "position": { "lat": -37.7748500, "lng": 145.0915500 }
    },
    {
        "id": "1001",
        "name": "7-Eleven Oakleigh",
        "address1": "123-125 Warrigal Road",
        "address2": "",
        "postcode": 3166,
        "suburb": "Oakleigh",
        "position": { "lat": -37.9033300, "lng": 145.0858800 }
    },
    {
        "id": "6533",
        "name": "Top Shop",
        "address1": "123 Glen Eira Road",
        "address2": "",
        "postcode": 3183,
        "suburb": "St Kilda East",
        "position": { "lat": -37.8768300, "lng": 144.9981400 }
    },
    {
        "id": "6421",
        "name": "Templestowe Authorised Newsagency",
        "address1": "122 James Street",
        "address2": "",
        "postcode": 3106,
        "suburb": "Templestowe",
        "position": { "lat": -37.7571200, "lng": 145.1292800 }
    },
    {
        "id": "6350",
        "name": "Wendouree News and Lotto",
        "address1": "1215a Howitt Street",
        "address2": "",
        "postcode": 3355,
        "suburb": "Wendouree",
        "position": { "lat": -37.5402200, "lng": 143.8283800 }
    },
    {
        "id": "1224",
        "name": "7-Eleven Brighton",
        "address1": "121 Church Street",
        "address2": "",
        "postcode": 3186,
        "suburb": "Brighton",
        "position": { "lat": -37.9151800, "lng": 144.9959700 }
    },
    {
        "id": "6762",
        "name": "Mount Evelyn Post Office",
        "address1": "12 Station Street",
        "address2": "",
        "postcode": 3796,
        "suburb": "Mount Evelyn",
        "position": { "lat": -37.7861300, "lng": 145.3786800 }
    },
    {
        "id": "6148",
        "name": "Altona West Newsagency",
        "address1": "12 Harrington Square",
        "address2": "",
        "postcode": 3018,
        "suburb": "Altona",
        "position": { "lat": -37.8641200, "lng": 144.8138400 }
    },
    {
        "id": "6207",
        "name": "North Balwyn Pharmacy",
        "address1": "12 Doncaster Road",
        "address2": "",
        "postcode": 3104,
        "suburb": "Balwyn North",
        "position": { "lat": -37.7934800, "lng": 145.0645200 }
    },
    {
        "id": "6060",
        "name": "Laverton Newsagency",
        "address1": "12 Aviation Road",
        "address2": "",
        "postcode": 3028,
        "suburb": "Laverton",
        "position": { "lat": -37.8677800, "lng": 144.7613400 }
    },
    {
        "id": "6206",
        "name": "Langwarrin Newsagency",
        "address1": "119 Cranbourne Road",
        "address2": "",
        "postcode": 3910,
        "suburb": "Langwarrin",
        "position": { "lat": -38.1535800, "lng": 145.1851400 }
    },
    {
        "id": "6799",
        "name": "Auburn Newsagency",
        "address1": "119 Auburn Road",
        "address2": "",
        "postcode": 3123,
        "suburb": "Hawthorn East",
        "position": { "lat": -37.8230100, "lng": 145.0450800 }
    },
    {
        "id": "1330",
        "name": "7-Eleven Thomastown",
        "address1": "118 Main Street (Corner Edgars Road)",
        "address2": "",
        "postcode": 3074,
        "suburb": "Thomastown",
        "position": { "lat": -37.6784300, "lng": 144.9989600 }
    },
    {
        "id": "6320",
        "name": "Blackburn South News Post and Lotto",
        "address1": "118 Canterbury Road",
        "address2": "",
        "postcode": 3130,
        "suburb": "Blackburn South",
        "position": { "lat": -37.8318500, "lng": 145.1471600 }
    },
    {
        "id": "1126",
        "name": "7-Eleven 118 Bourke Street",
        "address1": "118 Bourke Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8121400, "lng": 144.9697200 }
    },
    {
        "id": "6311",
        "name": "Tobacco Station Richmond Swan Street",
        "address1": "116A Swan Street",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8253600, "lng": 144.9936600 }
    },
    {
        "id": "6010",
        "name": "Glenhuntly News and Lotto",
        "address1": "1164 Glenhuntly Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Glen Huntly",
        "position": { "lat": -37.8896200, "lng": 145.0429100 }
    },
    {
        "id": "6496",
        "name": "Fordham&#039;s Milk Bar and Mixed Business",
        "address1": "116 Fordham Avenue",
        "address2": "",
        "postcode": 3124,
        "suburb": "Camberwell",
        "position": { "lat": -37.8445100, "lng": 145.0767300 }
    },
    {
        "id": "1088",
        "name": "7-Eleven Clarinda",
        "address1": "1152-1154 Centre Road",
        "address2": "",
        "postcode": 3169,
        "suburb": "Clarinda",
        "position": { "lat": -37.9266200, "lng": 145.1009100 }
    },
    {
        "id": "1003",
        "name": "7-Eleven Brunswick",
        "address1": "115 Nicholson Street",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7732500, "lng": 144.9790600 }
    },
    {
        "id": "1188",
        "name": "7-Eleven Geelong City",
        "address1": "115 Moorabool Street",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1483900, "lng": 144.3604000 }
    },
    {
        "id": "6279",
        "name": "Esplanade News",
        "address1": "115 Fitzroy Street",
        "address2": "",
        "postcode": 3182,
        "suburb": "St Kilda",
        "position": { "lat": -37.8601300, "lng": 144.9773100 }
    },
    {
        "id": "1060",
        "name": "7-Eleven Strathmore",
        "address1": "1148 Mount Alexander Road",
        "address2": "",
        "postcode": 3041,
        "suburb": "Strathmore",
        "position": { "lat": -37.7437600, "lng": 144.9104100 }
    },
    {
        "id": "6014",
        "name": "Malvern Authorised Newsagency",
        "address1": "114 Glenferrie Road",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8616700, "lng": 145.0286700 }
    },
    {
        "id": "1321",
        "name": "7-Eleven Rosebud",
        "address1": "1137 Nepean Highway (Corner Sixth Avenue)",
        "address2": "",
        "postcode": 3939,
        "suburb": "Rosebud",
        "position": { "lat": -38.3570700, "lng": 144.9013000 }
    },
    {
        "id": "1027",
        "name": "7-Eleven Glenhuntly",
        "address1": "113 Grange Road",
        "address2": "",
        "postcode": 3163,
        "suburb": "Glenhuntly",
        "position": { "lat": -37.8892200, "lng": 145.0447600 }
    },
    {
        "id": "6793",
        "name": "Wattle Park Pharmacy",
        "address1": "1123 Riversdale Road ",
        "address2": "",
        "postcode": 3127,
        "suburb": "Surrey Hills",
        "position": { "lat": -37.8374700, "lng": 145.1108700 }
    },
    {
        "id": "6437",
        "name": "Oak Park Postal Services",
        "address1": "112 Snell Grove",
        "address2": "",
        "postcode": 3046,
        "suburb": "Oak Park",
        "position": { "lat": -37.7175610, "lng": 144.9226170 }
    },
    {
        "id": "6247",
        "name": "Welcome Mart Northcote",
        "address1": "111 Victoria Road",
        "address2": "",
        "postcode": 3070,
        "suburb": "Northcote",
        "position": { "lat": -37.7733800, "lng": 145.0110500 }
    },
    {
        "id": "6588",
        "name": "CQ Convenience Store",
        "address1": "111 Leicester Street",
        "address2": "",
        "postcode": 3053,
        "suburb": "Carlton",
        "position": { "lat": -37.8035000, "lng": 144.9602200 }
    },
    {
        "id": "1309",
        "name": "7-Eleven Noble Park",
        "address1": "1100 Heatherton Road (Corner Douglas Street)",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9652500, "lng": 145.1725500 }
    },
    {
        "id": "6544",
        "name": "Queens Road Lotto",
        "address1": "11 Queens Road",
        "address2": "",
        "postcode": 3004,
        "suburb": "Melbourne",
        "position": { "lat": -37.8385200, "lng": 144.9741900 }
    },
    {
        "id": "1201",
        "name": "7-Eleven 11 Collins Street",
        "address1": "11 Collins Street",
        "address2": "",
        "postcode": 3000,
        "suburb": "Melbourne",
        "position": { "lat": -37.8137100, "lng": 144.9734200 }
    },
    {
        "id": "6065",
        "name": "Liu Milk Bar",
        "address1": "11 Claremont Avenue",
        "address2": "",
        "postcode": 3144,
        "suburb": "Malvern",
        "position": { "lat": -37.8657100, "lng": 145.0299200 }
    },
    {
        "id": "1095",
        "name": "7-Eleven Kilsyth",
        "address1": "109-111 Canterbury Road",
        "address2": "",
        "postcode": 3137,
        "suburb": "Kilsyth",
        "position": { "lat": -37.8174200, "lng": 145.3172000 }
    },
    {
        "id": "6617",
        "name": "Cigarette Express Convenience Store",
        "address1": "109-111 Brunswick Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8042600, "lng": 144.9773600 }
    },
    {
        "id": "6564",
        "name": "Rosebud Newsagency",
        "address1": "1083 Point Nepean Road",
        "address2": "",
        "postcode": 3939,
        "suburb": "Rosebud",
        "position": { "lat": -38.3563200, "lng": 144.9033900 }
    },
    {
        "id": "1207",
        "name": "7-Eleven Sandringham",
        "address1": "108 Highett Road",
        "address2": "",
        "postcode": 3191,
        "suburb": "Sandringham",
        "position": { "lat": -37.9467800, "lng": 145.0224300 }
    },
    {
        "id": "6716",
        "name": "Yarragon Authorised Newsagency",
        "address1": "107A Princes Highway",
        "address2": "",
        "postcode": 3823,
        "suburb": "Yarragon",
        "position": { "lat": -38.2042800, "lng": 146.0635200 }
    },
    {
        "id": "6492",
        "name": "Moreland Lottery",
        "address1": "107 Holmes Street",
        "address2": "",
        "postcode": 3056,
        "suburb": "Brunswick",
        "position": { "lat": -37.7568000, "lng": 144.9745600 }
    },
    {
        "id": "6173",
        "name": "Burkemore Newsagency",
        "address1": "1060 Burke Road",
        "address2": "",
        "postcode": 3103,
        "suburb": "Balwyn",
        "position": { "lat": -37.8009300, "lng": 145.0627300 }
    },
    {
        "id": "6654",
        "name": "Riversdale Road Milk Bar",
        "address1": "1057 Riversdale Road",
        "address2": "",
        "postcode": 3127,
        "suburb": "Surrey Hills",
        "position": { "lat": -37.8370800, "lng": 145.1066900 }
    },
    {
        "id": "6507",
        "name": "Elwood Newsagency and Lotto",
        "address1": "105 Ormond Road",
        "address2": "",
        "postcode": 3184,
        "suburb": "Elwood",
        "position": { "lat": -37.8853900, "lng": 144.9877900 }
    },
    {
        "id": "6584",
        "name": "Sandown Redsun Milk Bar",
        "address1": "105 Lightwood Road",
        "address2": "",
        "postcode": 3174,
        "suburb": "Noble Park",
        "position": { "lat": -37.9580900, "lng": 145.1640400 }
    },
    {
        "id": "6801",
        "name": "Cranbourne Authorised Newsagency",
        "address1": "105 High Street",
        "address2": "",
        "postcode": 3977,
        "suburb": "Cranbourne",
        "position": { "lat": -38.1102100, "lng": 145.2832100 }
    },
    {
        "id": "6075",
        "name": "Essendon Pharmacy",
        "address1": "1049 Mount Alexander Road",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7462500, "lng": 144.9108600 }
    },
    {
        "id": "6295",
        "name": "Canterbury Newsagency",
        "address1": "104 Maling Road",
        "address2": "",
        "postcode": 3126,
        "suburb": "Canterbury",
        "position": { "lat": -37.8247300, "lng": 145.0822800 }
    },
    {
        "id": "1045",
        "name": "7-Eleven Heathmont",
        "address1": "103-107 Canterbury Street",
        "address2": "",
        "postcode": 3135,
        "suburb": "Heathmont",
        "position": { "lat": -37.8283000, "lng": 145.2455600 }
    },
    {
        "id": "6280",
        "name": "Beacon Cove Food Store",
        "address1": "103 Beach Street",
        "address2": "",
        "postcode": 3207,
        "suburb": "Port Melbourne",
        "position": { "lat": -37.8406500, "lng": 144.9323600 }
    },
    {
        "id": "1128",
        "name": "7-Eleven Ferntree Gully",
        "address1": "1025-1027 Burwood Highway",
        "address2": "",
        "postcode": 3156,
        "suburb": "Ferntree Gully",
        "position": { "lat": -37.8885800, "lng": 145.2917400 }
    },
    {
        "id": "6365",
        "name": "Mt Eliza Newsagency",
        "address1": "102 Mount Eliza Way",
        "address2": "",
        "postcode": 3930,
        "suburb": "Mount Eliza",
        "position": { "lat": -38.1846400, "lng": 145.0887400 }
    },
    {
        "id": "6216",
        "name": "Eddie&#039;s Mixed Business",
        "address1": "101B Cardigan Road",
        "address2": "",
        "postcode": 3138,
        "suburb": "Mooroolbark",
        "position": { "lat": -37.7887900, "lng": 145.3279700 }
    },
    {
        "id": "6602",
        "name": "Glenn Convenience Store",
        "address1": "1004 Glen Huntly Road",
        "address2": "",
        "postcode": 3162,
        "suburb": "Caulfield South",
        "position": { "lat": -37.8885300, "lng": 145.0335300 }
    },
    {
        "id": "1228",
        "name": "7-Eleven Epworth",
        "address1": "100 Bridge Road",
        "address2": "",
        "postcode": 3121,
        "suburb": "Richmond",
        "position": { "lat": -37.8180400, "lng": 144.9933100 }
    },
    {
        "id": "1150",
        "name": "7-Eleven Carrum Downs",
        "address1": "10 Amayla Crescent",
        "address2": "",
        "postcode": 3201,
        "suburb": "Carrum Downs",
        "position": { "lat": -38.1047700, "lng": 145.1677400 }
    },
    {
        "id": "1201",
        "name": "7-Eleven Truganina",
        "address1": "1/475 Leakes Road",
        "address2": "",
        "postcode": 3029,
        "suburb": "Melbourne",
        "position": { "lat": -37.8394800, "lng": 144.7462200 }
    },
    {
        "id": "6702",
        "name": "Midvale News Post and Lotto",
        "address1": "1/1174 Geelong Road",
        "address2": "",
        "postcode": 3350,
        "suburb": "Mt Clear",
        "position": { "lat": -37.6029500, "lng": 143.8679600 }
    },
    {
        "id": "6755",
        "name": "IGA Xpress",
        "address1": "1-9 Lygon Street",
        "address2": "",
        "postcode": 3054,
        "suburb": "Princes Hill",
        "position": { "lat": -37.7784600, "lng": 144.9705300 }
    },
    {
        "id": "1294",
        "name": "7-Eleven Hoppers Crossing",
        "address1": "1-15 Heaths Road (Corner Old Geelong Road)",
        "address2": "",
        "postcode": 3029,
        "suburb": "Hoppers Crossing",
        "position": { "lat": -37.8800500, "lng": 144.7040600 }
    },
    {
        "id": "1061",
        "name": "7-Eleven Essendon",
        "address1": "1, 5-7 Napier Street",
        "address2": "",
        "postcode": 3040,
        "suburb": "Essendon",
        "position": { "lat": -37.7546100, "lng": 144.9176300 }
    },
    {
        "id": "6021",
        "name": "Rosanna Station Xpresso",
        "address1": "1 Turnham Avenue",
        "address2": "",
        "postcode": 3084,
        "suburb": "Rosanna",
        "position": { "lat": -37.7428400, "lng": 145.0660500 }
    },
    {
        "id": "1036",
        "name": "7-Eleven South Yarra",
        "address1": "1 Toorak Road",
        "address2": "",
        "postcode": 3141,
        "suburb": "South Yarra",
        "position": { "lat": -37.8381900, "lng": 144.9867200 }
    },
    {
        "id": "1053",
        "name": "7-Eleven Fitzroy",
        "address1": "1 Smith Street",
        "address2": "",
        "postcode": 3065,
        "suburb": "Fitzroy",
        "position": { "lat": -37.8085800, "lng": 144.9824300 }
    },
    {
        "id": "1299",
        "name": "7-Eleven Lilydale",
        "address1": "1 Main Street (Corner Maroondah Highway and Cave Hill Road)",
        "address2": "",
        "postcode": 3140,
        "suburb": "Lilydale",
        "position": { "lat": -37.7556400, "lng": 145.3428900 }
    },
    {
        "id": "1120",
        "name": "7-Eleven St Albans",
        "address1": "1 Kings Road",
        "address2": "",
        "postcode": 3021,
        "suburb": "St Albans",
        "position": { "lat": -37.7416500, "lng": 144.7789700 }
    },
    {
        "id": "6694",
        "name": "DUSA Bookshop Geelong",
        "address1": "1 Gheringhap Street",
        "address2": "",
        "postcode": 3220,
        "suburb": "Geelong",
        "position": { "lat": -38.1439600, "lng": 144.3603100 }
    },
    {
        "id": "1236",
        "name": "7-Eleven FreshWater Place",
        "address1": "1 FreshWater Place",
        "address2": "",
        "postcode": 3006,
        "suburb": "Southbank",
        "position": { "lat": -37.8219300, "lng": 144.9623600 }
    },
    {
        "id": "1078",
        "name": "7-Eleven East Coburg",
        "address1": "1 Elizabeth Street",
        "address2": "",
        "postcode": 3058,
        "suburb": "Coburg East",
        "position": { "lat": -37.7423000, "lng": 144.9797100 }
    },
    {
        "id": "1169",
        "name": "7-Eleven Epping",
        "address1": "1 Buch Avenue",
        "address2": "",
        "postcode": 3076,
        "suburb": "Epping",
        "position": { "lat": -37.6599600, "lng": 145.0242600 }
    },
    {
        "id": "31029",
        "name": "Tram stop",
        "address1": " Swanston St, Melbourne Uni",
        "address2": "",
        "postcode": 3052,
        "suburb": "Parkville",
        "position": { "lat": -37.7989700, "lng": 144.9642100 }
    }
];