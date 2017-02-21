(function () {

    let host = location.origin;
    fetchList(host);

})();


function fetchList(host) {
    if (self.fetch) {

        fetch(host + '/personal-page/src/blog-posts.json')
            .then((resp) => resp.json())
            .then(function (data) {
            let title, snippet, container, contentContainer, l;


            l = data.posts.length;
            while (l--) {
                title = '<h1 class="click-title" onclick="goToBlogPost(\'' + data.posts[l].file_path + data.posts[l].file_ref + '\')">' + data.posts[l].full_title + '</h1>';

                snippet = document.createElement('p');
                snippet.textContent = data.posts[l].snippet;
                snippet.classList.add('blog-snippet');

                contentContainer = document.createElement('div');
                contentContainer.appendChild(snippet);
                contentContainer.insertAdjacentHTML('afterbegin', title);

                container = document.getElementById('blog-snippet-list');
                container.appendChild(contentContainer);
            }
        })
            .catch(function (error) {
                console.log(error);
                // If there is any error you will catch them here
            });

    } else {
        // do something with XMLHttpRequest?
    }
}


function goToBlogPost(path) {
    let host;

    host = location.origin;
    location.assign(host + '/personal-page/blog-post.html' + '?post=' + path);
}



