var targetFood;
var loadingCircle;
let pageCount;
$(document).ready(function (){
    pageCount = 1; //initialise page No. if user toggles between pages
    let CapitalisedQuery;
    $("#Search-query").keyup(function () {

        targetFood = $("#Search-query").val();
        
        CapitalisedQuery = CapitaliseFirstLetter(targetFood);//store returned CapitalisedQuery
    });
    if ( $(`li.nav-item a`).text === "Nutrition" && (pageCount ==1) ){
        $(`li.nav-item`).click(function(e){
            e.preventDefault();
            alert("Please select a food item from the search bar first!\n Thank you:)");
        })
    }
    $("#Search-button").click(function (e) {
        e.preventDefault();
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
                if ((data.hints).length >= 1){  //valid inputs
                    localStorage.setItem('searchQuery',concatPlusSymbol(CapitaliseFirstLetter(targetFood)));
                
                    //=======================================================SIMILAR INGREDIENTS=============================================================
                    let rowNo = 0; //each column for one or a group of cards of ingredients
                    let ingrCount = 1;
    
                    for (let h = 0; h < data.hints.length; h++) {    
                        let similarIngr = data.hints[h].food.label;
                        let similarIngrImage = data.hints[h].food.image;
                        let nutrients = data.hints[h].food.nutrients;
                        console.log(similarIngr);
                        //if (similarIngr.includes(CapitalisedQuery) || similarIngr.includes(CapitalisedQuery.toUpperCase()) || similarIngr.includes(CapitalisedQuery.toLowerCase()) ){  
                        // retrieved query-related results
    
                        if(ingrCount % 3 === 1 || ingrCount === 1){  // 3 cards for each row,rowNo changes for every ingrCount (1 + multiple of 3) e.g. 4 or 7 exception is 1st ingredient
                            rowNo++;
                            $("#result").append(`<div class = "row" id="row${rowNo}" ></div>`);
                        }
                        
                        $(`#result #row${rowNo}`).append(`<div id = "other-ingr${ingrCount}" class = "card"></div>`);
                        var childElement = `#result #row${rowNo} #other-ingr${ingrCount}`;  //childElement set to var to get updated upon ingrCount++
                        $(`${childElement} `).append(`<div class="col-md-4">`);
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
                        $("#result .card").addClass('border');
                        $("#result .card").addClass('rounded');
    
                        $(`#result .card,${childElement}`).addClass('ingredient-card');
                        $('.card-img-top').addClass('img-card');
                        $(`${childElement} `).append(`</div>`);
                        ingrCount++;
                        //} 
                    };
                    $('#result a').click(function(){
                        pageCount++; //redirected to 'Nutritions' page = 2
                        localStorage.setItem("pageNo",pageCount);
                    });
                    if ($(".nav-item a").text === "Videos"){
                        var videoPageLink = $(this);   // retrieve "Videos" Nav element
                    }
                    videoPageLink.click(function(){
                        if (pageCount == 1){
                            videoPageLink.attr("href","videos.html");
                        }
                    }) 
                }
                else if ((data.parsed).length == 0 && (data.hints).length == 0){            // for Invalid inputs 
                    alert("The food or ingredient not found.\n Please enter a valid Food name.");
                }
                
                    

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

