$(document).ready(function(){
    $('button').click(function(e){
        //e.preventDefault();
        $(this).css("background-color","#fff");
        $.ajax({
            dataType:"json",
            method:"GET",
            url:`https://youtube.googleapis.com/youtube/v3/search?`,
            xhrFields: {
                withCredentials: false
            },
            
            headers:{
                'Access-Control-Allow-Origin':  "*" ,
                key:"AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE",
                Authorization:"AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE",
                crossDomain: true,
                part:"snippet",
                type:"video",
                videoEmbeddable:true,
                maxResults:"10",
                q:concatPlusSymbol("Masjid Al Haram")
            }
        })
            .done(function(data){
                console.log(data);
            });
    
    });
});

function concatPlusSymbol(c) {
    if (c.includes(' ')) {       //finds query with spacing in words
        return concatString = c.replaceAll(' ', '+');// translate query to fit in the API request url

    }
    else {
        return c;
    }

};
