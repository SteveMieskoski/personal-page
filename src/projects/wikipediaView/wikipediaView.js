$(document).ready(function () {



    $('#inputform').submit(function () {
        $('a.search-results').remove();
        event.preventDefault();
        var text = $("input:first").val();
        searchWikipedia(text);
        console.log(text);
    });

    function searchWikipedia(input) {
        var queryString = encodeURIComponent(input);
        console.log(input);
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+ queryString +'&namespace=0&limit=10',
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data[1].length; i++) {
                    var cleanSnippet = data[2][i].replace(/\(.*\)/, replacer);
                    var linkPage = data[3][i];
                    var entryHtml = '<a class="search-results" href="' + linkPage + '"><div class="search-results well"><h3>'+ data[1][i] +'</h3><p>' + cleanSnippet + '</p> </div></a> ';
                    $('.attach').append(entryHtml);
                }

            }
        })
    }

    function replacer(match){
        return '';
    }


});


/*



 User Story:
 I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.



 https://en.wikipedia.org/w/api.php?action=query&format=json&indexpageids=1&titles=Main+Page


 https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&titles=Main%20Page

 I can click a button to see a random Wikipedia entry.
 https://en.wikipedia.org/wiki/Special:Random


 */

/*
 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&prop=info&srsearch=' + queryString + '&srprop=snippet'

 // + '&srprop=snippet|titlesnippet&inprop=url'


 // /w/api.php?action=query&format=json&prop=info&list=search&titles=Albert+Einstein&inprop=url&srsearch=grand+canyon
 // 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&prop=info&srsearch=' + input + '&srprop=snippet|titlesnippet'
 // 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=search&titles='+ queryString +'&inprop=url&srsearch='+ splitString,
 */