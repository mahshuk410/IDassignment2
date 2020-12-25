var targetFood;
$("#Search-query").keyup(function(){
    targetFood = document.getElementById("Search-query").value;
})
;

$(document).ready(function(){
    $("#Search-button").click(function(e){
       e.preventDefault();
        $("#result").before("Search results for '"+targetFood+"'");

        $.ajax({
            dataType:'json',
            method:"GET",
            url:"https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + targetFood,
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
            $("#result").append("<div>");
            $("#result").append(`<h3>${ingrName}</h3>`);
            for(x in nutrients){
               
                if (x === "CHOCDF"){
                    
                    $("#result").append( "carbohydrates" +":" + nutrients[x] + "<br>");
                }
                else if (x === "PROCNT"){
                    $("#result").append("Protein" +":" + nutrients[x] + "<br>");
                }
                else{
                    $("#result").append(x +":" + nutrients[x] + "<br>");
                }

            };
            $("#result").append("</div>");
            for(let h = 0; h <data.hints.length;h++){
                let similarIngr = data.hints[h].food.label;
                if ( similarIngr.includes(ingrName) || similarIngr.includes(ingrName.toUpperCase())){
                    $("#result").append("<div>");
                    $("#result").append(`<h3>${similarIngr}</h3>`);
                    var nutrients = data.hints[h].food.nutrients;
                    for(x in nutrients){
                        if (x === "CHOCDF"){
                            
                            $("#result").append( "carbohydrates" +":" + nutrients[x] + "<br>");
                        }
                        else if (x === "PROCNT"){
                            $("#result").append("Protein" +":" + nutrients[x] + "<br>");
                        }
                        else{
                            $("#result").append(x +":" + nutrients[x] + "<br>");
                        }
                    }
                    $("#result").append("</div>");

                }; 
            };
            
        })
    });
});