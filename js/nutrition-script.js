$(document).ready(function(){

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
            //=======================================================SEARCH-RELATED INGREDIENTS=============================================================
            const queryString = window.location.search;// returns only parameter of the website
            const urlParams = new URLSearchParams(queryString);
            console.log(queryString);
            const product = urlParams.get('name');
            console.log("product: "+ product);
            let thisIngr = convertParameter(product);
            $('section.container').append("<div></div>");
            //$(`${this} div`).addClass()            
            for (let h = 0; h < data.hints.length; h++) {    

                let similarIngr  = data.hints[h].food.label;
                let similarIngrImage = data.hints[h].food.image;
                let similarIngrContent = data.hints[h].food.foodContentsLabel;
                var nutrients = data.hints[h].food.nutrients;

                if(similarIngr === product){
                    $('section.container ').append(`<div class = "row" id="row1" ></div>`);
            
                    $(`section.container #row1`).append(`<div id = "other-ingr1" class = "card col-md-11"></div>`);
                    var childElement = (`section.container #row1 #other-ingr1`);  
                    $(`${childElement} `).prepend(`<div class="col-md-4">`);
                    $(`${childElement} `).append(`<div class = "card-body"></div>`);
                                
                    $(`${childElement}.card .card-body `).append(`<h3 class = "card-title">${similarIngr}</h3>`);
                    if (similarIngrImage === undefined) {

                        $(`${childElement} .card-body`).before(`<span height="100px" class ="card-img-top img-thumbnail">Image not available</span><br>`);
                    }
                    else {

                        $(`${childElement} .card-body`).before(`<img src = ${similarIngrImage} alt="Image of ${similarIngr}"
                         class ="card-img-top img-thumbnail"><br>`);
                        
                    }
                    $(`section.container .card,${childElement}`).addClass('ingredient-card');
                    if (similarIngrContent !== undefined) {     //for ingredients & dishes with foodContentsLabel property
                        data.hints[h].food.foodContentsLabel=data.hints[h].food.foodContentsLabel.replaceAll(';',',<br> ');
                        $(`${childElement} .card-body`).append
                        (`<h4 style="text-align:start;">Food contents:</h4> <ul>${data.hints[h].food.foodContentsLabel}</ul>`);
                    }

                    $('.card-img-top').addClass('img-card');
                                 
                    $(`div#video-link a`).attr("href",`videos.html?name=Healthy+food+recipes+for+${concatPlusSymbol(product)}`);
                    
                    localStorage.setItem("selectedItem",concatPlusSymbol(product));

                    $('section.container ').append('<div class="table-responsive"></div>')
                    $('section.container div.table-responsive').append
                    ('<table class="table table-striped table-hover table-border table-dark"></table>');

                    $(`section.container table`).append('<thead><tr></tr></thead>');

                    var tableHeader = $(`section.container table thead tr`);
                    tableHeader.append('<th scope = "col">#</th>');
                    tableHeader.append('<th scope = "col">Nutrient</th>');
                    tableHeader.append('<th scope = "col">Amount</th>');
                    $('<tbody></tbody>').appendTo("table");

                    let nutrientCount = 1;   
                    
                    for(x in nutrients){
                        nutrients[x] = nutrients[x].toFixed(2);
                        $('table tbody').append(`<tr><th scope = "row">${nutrientCount}</th></tr>`);
                        let tableRow = $('table tbody tr');

                        if (x === "CHOCDF" && nutrients[x] != null && x != null) {
                            tableRow.append(`<td>Carbohydrates</td>`); //simplify 'CHOCDF' to 'Carbohydrates'
                            tableRow.append(`<td>${nutrients[x].round}</td>`);
                            
                            
                        }
                        else if (x === "PROCNT" ) {
                            tableRow.append(`<td>Protein</td>`); //simplify 'CHOCDF' to 'Carbohydrates'
                            tableRow.append(`<td>${nutrients[x]}</td>`);
                            
                        }
                        else {
                            tableRow.append(`<td>${x}</td>`); //simplify 'CHOCDF' to 'Carbohydrates'
                            tableRow.append(`<td>${nutrients[x]}</td>`);

                        }
                        $(' table th').next().css("color","#a64b5c;");
                        nutrientCount++; //new row formed for each nutrient
                    }
                    let table = $('div.table-responsive')
                    $('.card-body h4').before(table);   // add table to card 
                    showVideoLink();  // update DOM with a video page link
                    break; //lock the page after loading the user-selected ingredient

                    
                };
                $('footer').removeAttr('style');//removing css property "display:none"
    
                //} 
            };

        })

});
//==========================================================FUNCTIONS===================================================================
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


function showVideoLink(){ // create videoLink element uploaded to DOM
   $('.card-body').append(`<div id ="video-link" class= "row""></div>`);
   $('div#video-link').html('<div class = "col"></div>');
   $('div#video-link div.col').html('<div class = "alert  alert-secondary video-link" role="alert"></div>');
   $('div.alert').html('<p style = "font-weight:900;"><a class = "alert-link">Click here</a> to watch recipe videos</p>');
   $('div.alert ').addClass('video-link');
};

