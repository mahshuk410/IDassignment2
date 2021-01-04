$(document).ready(function(){
    // let foodTitle = $(`${$(this)} h3`);
    // $(this).attr("href",`nutrition.html?name=${foodTitle}`)
    // console.log(`${$(this).attr("href")}`);
    $.ajax({
        dataType: 'json',
        method: "GET",
        url: `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${localStorage.getItem('searchQuery')}`,
        async: true,
	    crossDomain: true,
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
            console.log(data);
            
            //=======================================================SIMILAR INGREDIENTS=============================================================
            const queryString = window.location.search;// returns only parameter of the website
            const urlParams = new URLSearchParams(queryString);
            const product = urlParams.get('name');
            console.log("product: "+ product);
            let thisIngr = convertParameter(product);
            
            for (let h = 0; h < data.hints.length; h++) {           
                let similarIngr  = data.hints[h].food.label;
                let similarIngrImage = data.hints[h].food.image;
                let similarIngrContent = data.hints[h].food.foodContentsLabel;
                var nutrients = data.hints[h].food.nutrients;
                if(similarIngr === thisIngr){
                   
                    $(".container").append(`<div class = "row" id="row1" ></div>`);
                
                
                    $(`.container #row1`).append(`<div id = "other-ingr1" class = "card col-md-11"></div>`);
                    var childElement = (`.container #row1 #other-ingr1`);  
                    $(`${childElement} `).prepend(`<div class="col-md-4">`);
                    $(`${childElement} `).append(`<div class = "card-body"></div>`);
                             
                    $(`${childElement}.card .card-body `).append(`<h3 class = "card-title">${similarIngr}</h3>`);
                    if (similarIngrImage === undefined) {
                        $(`${childElement} .card-body`).before(`<span class ="card-img-top img-thumbnail">Image not available</span><br>`);
                    }
                    else {
                        $(`${childElement} .card-body`).before(`<img src = ${similarIngrImage} alt="Image of ${similarIngr}" class ="card-img-top img-thumbnail"><br>`);
                        
                    }
                    $(childElement).append(`<ul></ul>`);
                    $(`.container .card,${childElement}`).addClass('ingredient-card');
                    for (x in nutrients) {
                        nutrients[x] = nutrients[x].toFixed(2);     //round up nutritional values to 2dp for simplicity
                        if (x === "CHOCDF") {
    
                            $(`${childElement} ul`).append(`<li>carbohydrates : ${nutrients[x]}  </li>`); //simplify 'CHOCDF' to 'Carbohydrates'
                        }
                        else if (x === "PROCNT") {
                            $(`${childElement} ul`).append(`<li>Protein:${nutrients[x]} </li>`); //simplify 'PROCNT' to 'Protein'
                        }
                        else {
                            $(`${childElement} ul`).append(`<li>${x} : ${nutrients[x]} </li>`);
                        }
                    }
                    if (similarIngrContent !== undefined) {     //for ingredients & dishes with foodContentsLabel property
                        data.hints[h].food.foodContentsLabel=data.hints[h].food.foodContentsLabel.replaceAll(';',',<br> ');
                        $(`${childElement}`).append(`<h4 style="text-align:center;">Food contents:</h4> <ul>${data.hints[h].food.foodContentsLabel}</ul>`);
                    }
                    $('.card-img-top').addClass('img-card');
                    $(`${childElement}`).append("<p>Click <strong><a>here</a></strong> for recipe videos </p>")
                    $(`${childElement} p a`).attr("href",`videos.html?name=Healthy+food+recipes+for+${concatPlusSymbol(product)}`);
                    break; 
                };
                
                //} 
            };

        })

});

function convertParameter(c) {
    if (c.includes('+')) {       //finds query with spacing in words
        return concatString = c.replaceAll('+', ' ');// translate parameter from hyperlink to string

    }
    else {
        return c;
    }

};
function concatPlusSymbol(c) {
    if (c.includes(' ')) {       //finds query with spacing in words
        return concatString = c.replaceAll(' ', '+');// translate query to fit in the API request url
    }
    else {
        return c;
    }
};
