var targetFood;
$("#Search-query").keyup(function(){
    targetFood = document.getElementById("Search-query").value;
})
;

$(document).ready(function(){
    $("#Search-button").click(function(e){
       e.preventDefault();
        $("#result").text(targetFood);

        $.ajax({
            dataType:'json',
            method:"GET",
            url:"https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + targetFood,
        })
        .done(function(){
            console.log();
        });
    });
});