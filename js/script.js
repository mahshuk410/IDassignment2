var targetFood;
var loadingCircle;
$(document).ready(function (){
    let CapitalisedQuery;
    $("#Search-query").keyup(function () {

        targetFood = $("#Search-query").val();
        
        CapitalisedQuery = CapitaliseFirstLetter(targetFood);//store returned CapitalisedQuery
    });
    
    $("#Search-button").click(function (e) {
        e.preventDefault();
        // if (targetFood ===(' ') || targetFood === undefined){  //User input validation
        //     alert("Please enter a valid Food Name!")
        // };
        $("#result").before().text(`Search results for '${targetFood}'`);
        $.ajax({
            async: true,
            crossDomain: true,
            dataType: 'json',
            method: "GET",
            url: `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${concatPlusSymbol(CapitalisedQuery)}`,
            "headers": {
                "x-rapidapi-key": "e51e529e9emsh680c3ed1cdba0abp149d45jsn49661bfdcbeb",
                "x-rjapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
            },
            timeout: 2000, 
            statusCode: {
                404: function() {
                  alert( "Ingredient name not found! Please try another one." );
                }
            }
        })
            .done(function(data) {
                console.log(concatPlusSymbol(CapitaliseFirstLetter(targetFood)));
                
                localStorage.setItem('searchQuery',concatPlusSymbol(CapitaliseFirstLetter(targetFood)));
                let rowNo = 1; //each column for one or a group of cards of ingredients
                var ingrCount = 1;
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
                $("#result .card").append("</div>");
                //=======================================================SIMILAR INGREDIENTS=============================================================

                for (let h = 0; h < data.hints.length; h++) {    
                    let similarIngr = data.hints[h].food.label;
                    let similarIngrImage = data.hints[h].food.image;
                    console.log(similarIngr);
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
                    $(`${childElement}.card .card-body `).append(`<a href = "nutrition.html?name=${concatPlusSymbol(similarIngr)}"></a>`);         
                    $(`${childElement}.card .card-body a `).append(`<h3 class = "card-title">${similarIngr}</h3>`);
                    if (similarIngrImage === undefined) {
                        $(`${childElement} .card-body`).before(`<span class ="card-img-top img-thumbnail">Image not available</span><br>`);
                    }
                    else {
                        $(`${childElement} .card-body`).before(`<img src = ${similarIngrImage} alt="Image of ${similarIngr}" class ="card-img-top img-thumbnail"/><br>`);
                        $(`${childElement} img`).css("object-fit:cover;");
                    }
                    $("#result .card").addClass('border border-success');
                    $("#result .card").addClass('rounded');

                    $(`#result .card,${childElement}`).addClass('ingredient-card');
                    $('.card-img-top').addClass('img-card');
                    $(`${childElement} `).append(`</div>`);
                    ingrCount++;
                    //} 
                };
                
                    

            })
    });
    
        

    //     //$(".container").hide();
    //     // $("#content").load('.container');
    //});
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
function concatPlusSymbol(c) {
    if (c.includes(' ')) {       //finds query with spacing in words
        return concatString = c.replaceAll(' ', '+');// translate query to fit in the API request url

    }
    else {
        return c;
    }

};

