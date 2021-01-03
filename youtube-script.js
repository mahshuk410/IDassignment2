$(document).ready(function(){
    $('button').click(function(e){
        e.preventDefault();
        $(this).css("background-color","#eee");
        $.ajax({
            dataType:"json",
            method:"GET",
            url:`https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE`,
            xhrFields: {
                withCredentials: true
            },
            'Access-Control-Allow-Origin': "videos.html",
            headers:{
                key:"AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE",
                crossDomain: 'true',
                part:"snippet",
                type:"video",
                videoEmbeddable:"true",
                maxResults:"10",
                q:"chicken"
            }
        })
            .done(function(data){
                console.log(data);
            });
    
    });
});