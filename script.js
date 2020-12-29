var targetFood;
var targetFoodKey;
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
$("#Search-query").keyup(function(){

    targetFood = $("#Search-query").val();
    if (targetFood.includes(' ')){                         //finds query with spacing in words
        targetFoodKey = targetFood.replaceAll(' ','+');// translate query to fit in the API request url
    }                                                      // e.g. chicken rice --> chicken+rice
});

$(document).ready(function(){

    $("#Search-button").click(function(e){
       e.preventDefault();
       $("#result").before().text(`Search results for '${targetFood}'`);
       
        $.ajax({
            dataType:'json',
            method:"GET",
            url:`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${targetFoodKey}`,
            "headers": {
                "x-rapidapi-key": "e51e529e9emsh680c3ed1cdba0abp149d45jsn49661bfdcbeb",
                "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
            },
            timeout: 2000, 
            statusCode: {
                404: function() {
                  alert( "page not found" );
                }
              },
            beforeSend: function() {                                // Before Ajax
                loadingCircle = $("section .loader-wrapper");
                loadingCircle.children().eq(1).text('Loading...');
                loadingCircle.children().first().addClass("loader");
                loadingCircle.show();;      // Load message
              },
            complete: function() {                                  // Once finished
                loadingCircle.fadeOut("slow").remove();                                  // erase element from webpage
              },          
        })
        .done(function(data){
            console.log(data);
            var nutrients  = data.parsed[0].food.nutrients;
            let ingrName = data.parsed[0].food.label;
            let ingrImage = data.parsed[0].food.image;
            $("#result").prepend("<div></div>"); //add a div element for each food ingredient or dish
            $("#result div").append(`<h3>${ingrName}</h3>`);
            if (ingrImage === undefined){
                $("#result div").append(`<span class ="img-thumbnail">Image not available</span><br>`);
            }
            else{
                $("#result div").append(`<img src = ${ingrImage} alt="Image of ${ingrName}" class ="img-thumbnail"><br>`);
            }

            $("#result div").append("<li></li>");
            for(x in nutrients){
                nutrients[x] = nutrients[x].toFixed(2); //round up nutritional values to 2dp for simplicity

                if (x === "CHOCDF"){
                    
                    $("#result div li").append( `<ul>carbohydrates : ${nutrients[x]}  </ul>`);
                }
                else if (x === "PROCNT"){
                    $("#result div li").append(`<ul>Protein:${nutrients[x]} </ul>`);
                }
                else{
                    $("#result div li").append(`<ul>${x} : ${nutrients[x]} </ul>`);
                }            
            }
            if(data.parsed[0].foodContentsLabel !== undefined){
                $("#result").append(`Food contents: ${data.parsed[0].foodContentsLabel}`);
            };
            let ingrCount = 1; //ingrCount increments by 1 for every new instance of searched ingredient 
            for(let h = 0; h <data.hints.length;h++){
                let similarIngr = data.hints[h].food.label;
                let similarIngrImage = data.hints[h].food.image;
                let similarIngrContent = data.hints[h].foodContentsLabel;
                if ( similarIngr.includes(targetFood) || similarIngr.includes(targetFood.toUpperCase())){  // retrieved query-related results
                    $("#result").append(`<div id = "other-ingr${ingrCount}"></div>`);

                    var childElement = `#result #other-ingr${ingrCount}`;  //childElement set to var to get updated upon ingrCount++

                    $(childElement).append(`<h3>${similarIngr}</h3>`);
                    var nutrients = data.hints[h].food.nutrients;
                    if (similarIngrImage === undefined){
                        $(childElement).append(`<span class ="img-thumbnail">Image not available</span><br>`);
                    }
                    else{
                        $(childElement).append(`<img src = ${similarIngrImage} alt="Image of ${similarIngr}" class ="img-thumbnail"><br>`);
                    }
                    $(childElement).append("<li></li>");

                    for(x in nutrients){
                        nutrients[x] = nutrients[x].toFixed(2);     //round up nutritional values to 2dp for simplicity
                        if (x === "CHOCDF"){
                    
                            $(`${childElement} li`).append(`<ul>carbohydrates : ${nutrients[x]}  </ul>`); //simplify 'CHOCDF' to 'Carbohydrates'
                        }
                        else if (x === "PROCNT"){
                            $(`${childElement} li`).append(`<ul>Protein:${nutrients[x]} </ul>`); //simplify 'PROCNT' to 'Protein'
                        }
                        else{
                            $(`${childElement} li`).append(`<ul>${x} : ${nutrients[x]} </ul>`);
                        }
                    if(similarIngrContent !== undefined){     //for ingredients & dishes with foodContentsLabel property
                        $(`${childElement}`).append(`Food contents: ${data.hints[h].foodContentsLabel}`);
                    }
                    
                }            
                ingrCount++;
                } 
            };
            
        })
    });
});

