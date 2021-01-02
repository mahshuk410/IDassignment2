var targetFood;
var loadingCircle;
/*for youtube API
================================
url = http://www.googleapis.com/youtube/v3/search?key=AIzaSyAX-5h3JcoZufXXPgVRiXK2en1OYGVVNGM&type=video&part=snippet&maxResults=10&q=chicken
key=value
==========
var YT_API_KEY="AIzaSyAX-5h3JcoZufXXPgVRiXK2en1OYGVVNGM";
var type=video;
var part=snippet;
var maxResults = noOfVideosToAppear;
var q= user_query;
=============================================================
*/
function concatPlusSymbol(c) {
    if (c.includes(' ')) {       //finds query with spacing in words
        return concatString = c.replaceAll(' ', '+');// translate query to fit in the API request url

    }
    else {
        return c;
    }

};


$(document).ready(function (){
    let CapitalisedQuery;
    $("#Search-query").keyup(function () {

        targetFood = $("#Search-query").val();
        CapitalisedQuery = CapitaliseFirstLetter(targetFood);//store returned CapitalisedQuery
    });

    $("#Search-button").click(function (e) {
        e.preventDefault();
        //});
        $("#result").before().text(`Search results for '${targetFood}'`);
        $.ajax({
            dataType: 'json',
            method: "GET",
            url: `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${concatPlusSymbol(CapitalisedQuery)}`,
            "headers": {
                "x-rapidapi-key": "e51e529e9emsh680c3ed1cdba0abp149d45jsn49661bfdcbeb",
                "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
            },
            timeout: 2000, 
            statusCode: {
                404: function() {
                  alert( "Ingredient name not found! Please try another one." );
                }
              },
            beforeSend: function() {                                // Before Ajax
                loadingCircle = $("section .loader-wrapper");
                loadingCircle.children().eq(0).text('Loading...');
                loadingCircle.children().first().addClass("loader");
                loadingCircle.show();      // Load message
              },
            complete: function() {                                  // Once finished
                loadingCircle.fadeOut("slow").hide().remove();                                  // erase element from webpage
              }          
        })
            .done(function(data) {
                console.log(concatPlusSymbol(CapitaliseFirstLetter(targetFood)));
                console.log(data);
                let rowNo = 1; //each column for one or a group of cards of ingredients
                let ingrCount = 1;
                var nutrients = data.parsed[0].food.nutrients;
                let ingrName = data.parsed[0].food.label;
                let ingrImage = data.parsed[0].food.image;
                $("#result").prepend(`<div class ="card" ></div>`); //add a div element for each food ingredient or dish
                $("#result .card").prepend(`<div class="col-lg-4">`);
                $("#result .card").append(`<div class = "card-body"></div>`);
                $("#result .card .card-body").append(`<h3 class ="card-title">${ingrName}</h3>`);
                if (ingrImage === undefined) {
                    $("#result .card .card-body").before(`<span class ="card-img-top img-thumbnail">Image not available</span><br>`);
                }
                else {
                    $("#result .card .card-body").before(`<img src = ${ingrImage} alt="Image of ${ingrName}" class ="card-img-top img-thumbnail"><br>`);

                }
                
                $("#result div").append("<li></li>");
                for (x in nutrients) {
                    nutrients[x] = nutrients[x].toFixed(2); //round up nutritional values to 2dp for simplicity

                    if (x === "CHOCDF") {

                        $("#result div li").append(`<ul>carbohydrates:${nutrients[x]}  </ul>`);
                    }
                    else if (x === "PROCNT") {
                        $("#result div li").append(`<ul>Protein:${nutrients[x]} </ul>`);
                    }
                    else {
                        $("#result div li").append(`<ul>${x} : ${nutrients[x]} </ul>`);
                    }
                }
                if (data.parsed[0].foodContentsLabel !== undefined) {
                    $("#result").append(`Food contents: ${data.parsed[0].foodContentsLabel}`);
                };
                $("#result .card").append("</div>");
                //=======================================================SIMILAR INGREDIENTS=============================================================

                for (let h = 0; h < data.hints.length; h++) {           
                    let similarIngr = data.hints[h].food.label;
                    let similarIngrImage = data.hints[h].food.image;
                    let similarIngrContent = data.hints[h].foodContentsLabel;
                    var nutrients = data.hints[h].food.nutrients;
                    //if (similarIngr.includes(CapitalisedQuery) || similarIngr.includes(CapitalisedQuery.toUpperCase()) || similarIngr.includes(CapitalisedQuery.toLowerCase()) ){  
                    // retrieved query-related results
                    if(ingrCount % 3 == 0){
                        rowNo++;
                        $("#result").append(`<div class = "row" id="row${rowNo}" ></div>`);
                    }
                    
                    $(`#result #row${rowNo}`).append(`<div id = "other-ingr${ingrCount}" class = "card"></div>`);
                    var childElement = `#result #row${rowNo} #other-ingr${ingrCount}`;  //childElement set to var to get updated upon ingrCount++
                    $(`${childElement} `).prepend(`<div class="col-lg-4">`);
                    $(`${childElement} `).append(`<div class = "card-body"></div>`);
                    $(`${childElement}.card .card-body`).append(`<h3 class = "card-title">${similarIngr}</h3>`);
                    if (similarIngrImage === undefined) {
                        $(`${childElement} .card-body`).before(`<span class ="card-img-top img-thumbnail">Image not available</span><br>`);
                    }
                    else {
                        $(`${childElement} .card-body`).before(`<img src = ${similarIngrImage} alt="Image of ${similarIngr}" class ="card-img-top img-thumbnail"/><br>`);
                        $(`${childElement} img`).css("object-fit:cover;");
                    }
                    $(childElement).append("<li></li>");
                    $(`#result .card,${childElement}`).addClass('ingredient-card');
                    for (x in nutrients) {
                        nutrients[x] = nutrients[x].toFixed(2);     //round up nutritional values to 2dp for simplicity
                        if (x === "CHOCDF") {

                            $(`${childElement} li`).append(`<ul>carbohydrates : ${nutrients[x]}  </ul>`); //simplify 'CHOCDF' to 'Carbohydrates'
                        }
                        else if (x === "PROCNT") {
                            $(`${childElement} li`).append(`<ul>Protein:${nutrients[x]} </ul>`); //simplify 'PROCNT' to 'Protein'
                        }
                        else {
                            $(`${childElement} li`).append(`<ul>${x} : ${nutrients[x]} </ul>`);
                        }
                        if (similarIngrContent !== undefined) {     //for ingredients & dishes with foodContentsLabel property
                            $(`${childElement}`).append(`Food contents: ${data.hints[h].foodContentsLabel}`);
                        }

                    }
                    $('.card-img-top').addClass('img-card');
                    $(`${childElement} `).append(`</div>`);
                    ingrCount++;
                    //} 
                };

            })
    });
});

function CapitaliseFirstLetter(userInput) {
    
    if (userInput.includes(" ") && userInput[userInput.length - 1] != " ") {
        let capitalised = '';  //initialised variable
        let wordCount = 0;  //keep track of number of words,to specify when the spaces should be added
        var inputArray = userInput.split(" ");
        for (let i = 0; i < inputArray.length; i++) {
            word = inputArray[i];
            word = word.replace(word[0], (word[0].toUpperCase()));
            if (i != inputArray.length - 1) {
                word += " "; //add spacing to word
            }
            capitalised += word;
            wordCount++;

        }
        return capitalised;
    }
    else { //for single word query
        userInput = userInput.replace(userInput[0], userInput[0].toUpperCase());
        return userInput;
    };
}