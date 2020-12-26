var targetFood;
$("#Search-query").keyup(function(){
    targetFood = document.getElementById("Search-query").value;
})
;

$(document).ready(function(){
    $("#Search-button").click(function(e){
       e.preventDefault();
        $("#result").before().text(`Search results for '${targetFood}'`);

        $.ajax({
            dataType:'json',
            method:"GET",
            url:`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${targetFood}`,
            "headers": {
                "x-rapidapi-key": "e51e529e9emsh680c3ed1cdba0abp149d45jsn49661bfdcbeb",
                "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com"
            }          
        })
        .done(function(data){
            // $.each(data,function(key,value){
            //     console.log(key+":" +value);
            // });
            
            var nutrients  = data.parsed[0].food.nutrients;
            let ingrName = data.parsed[0].food.label;
            let ingrImage = data.parsed[0].food.image;
            $("#result").prepend("<div></div>"); //add a div element for each food ingredient or dish
            $("#result div").css('background-color','red');
            $("#result div").append(`<h3>${ingrName}</h3>`);
            $("#result div").append(`<img src = ${ingrImage} alt="Image not available" class ="img-thumbnail">`);
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
            if(data.parsed[0].hasOwnProperty("foodContentsLabel")){
                $("#result").append(`Food contents: ${data.parsed[0].foodContentsLabel}`);
            };
            let ingrCount = 1; //ingrCount increments by 1 for every new instance of searched ingredient 
            for(let h = 0; h <data.hints.length;h++){
                let similarIngr = data.hints[h].food.label;
                let similarIngrImage = data.hints[h].food.image;

                if ( similarIngr.includes(ingrName) || similarIngr.includes(ingrName.toUpperCase())){
                    $("#result").append(`<div id = "other-ingr${ingrCount}"></div>`);

                    var childElement = `#result #other-ingr${ingrCount}`;  //childElement set to var to get updated upon ingrCount++

                    $(childElement).append(`<h3>${similarIngr}</h3>`);
                    var nutrients = data.hints[h].food.nutrients;
                    $(childElement).append(`<img src = ${similarIngrImage} alt="Image not available" class ="img-thumbnail"><br>`);
                    $(childElement).append("<li></li>");

                    for(x in nutrients){
                        nutrients[x] = nutrients[x].toFixed(2);     //round up nutritional values to 2dp for simplicity
                        if (x === "CHOCDF"){
                    
                            $(`${childElement} li`).append(`<ul>carbohydrates : ${nutrients[x]}  </ul>`);
                        }
                        else if (x === "PROCNT"){
                            $(`${childElement} li`).append(`<ul>Protein:${nutrients[x]} </ul>`);
                        }
                        else{
                            $(`${childElement} li`).append(`<ul>${x} : ${nutrients[x]} </ul>`);
                        }
                    if(data.hints[h].hasOwnProperty("foodContentsLabel")){     //display foodContentsLabel for those ingredients or dishes with foodContentsLabel property
                        $(`${childElement}`).append(`Food contents: ${data.hints[h].foodContentsLabel}`);
                    }
                }            
                ingrCount++;
                } 
            };
            
        })
    });
});