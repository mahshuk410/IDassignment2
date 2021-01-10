$(document).ready(function(){
    $('button').click(function(e){
        //e.preventDefault();
        $(this).css("background-color","#fff");
        
        $.ajax({
            dataType:"json",
            method:"GET",
            url:`http://cors-anywhere.herokuapp.com/youtube.googleapis.com/http://youtube/v3/search?key=AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE`,
            
            //url:`https://cors-anywhere.herokuapp.com/youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&key=AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE&q=How+to+make+chicken+pasta`,
            xhrFields: {
                withCredentials: false
            },
            
            headers:{
                //'Access-Control-Allow-Origin':  "*" ,
                key:"AIzaSyALr714iogoZNJl7sKY4MJrFdwaIQ-d7YE",
                crossDomain: true,
                part:"snippet",
                type:"video",
                videoEmbeddable:true,
                maxResults:"10",
                q:localStorage.getItem("selectedItem")
            }
        })
            .done(function(data){
                console.log(data);
                for(let v =0;v<data.items.length;v++){
                    $('section#videos').append("<iframe src></iframe>");
                    $(`${this} iframe`).attr("src",`https://www.youtube.com/watch?v=${data.items[v].id.videoId}`);
                    $(`${this} iframe`).attr("title",`${data.items[v].snippet.title}`);
                    $(`${this} iframe`).attr("allowfullscreen",'true');
                    $(`${this} iframe`).attr("height",`${data.items[v].snippet.thumbnail.high.height}`); //.high --> object with high quality iframe properties
                    $(`${this} iframe`).attr("width",`${data.items[v].snippet.thumbnail.high.width}`); //.high --> object with high quality iframe properties
                }
            });
            $('footer').show();

    });
});

function concatPlusSymbol(c) {
    if (c.includes(' ')) {       //finds query with spacing in words
        return concatString = c.replaceAll(' ', '+');// translate query to fit in the API request url

    }
    else {
        return c;
    }

}
