(function () {
    let host, path, realPath;

    host = location.origin;
    path = location.search;
    realPath = path.replace('?post=', '');
    fetchPost(host, realPath);


    function fetchPost(host, path) {
        if (self.fetch) {

            fetch(host + path + '.html')
                .then((resp) => resp.text())
                .then(function (data) {
                    let container;

                    container = document.getElementById('blog-content');
                    container.insertAdjacentHTML('afterbegin', data);

                })
                .catch(function (error) {
                    console.log(error);
                    // If there is any error you will catch them here
                });


        } else {
            // do something with XMLHttpRequest?
        }
    }

})();
