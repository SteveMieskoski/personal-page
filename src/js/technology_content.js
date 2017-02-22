(function () {
    let host, i, runfetch;

    host = location.origin;
    const urls = [
        {name: 'angular', id: 'angular',path: '/content/tech/', area: 'side-nav-section-one' , location: 'tech-items-container-one'},
        {name: 'node', id: 'node',path: '/content/tech/', area: 'side-nav-section-one' , location: 'tech-items-container-one'},
        {name: 'SCSS', id: 'scss',path: '/content/tech/', area: 'side-nav-section-one' , location: 'tech-items-container-one'},
        {name: 'jQuery', id: 'jquery',path: '/content/tech/', area: 'side-nav-section-one' , location: 'tech-items-container-one'},
        {name: 'Linux', id: 'linux',path: '/content/tech/', area: 'side-nav-section-one' , location: 'tech-items-container-one'},
        {name: 'python', id: 'python',path: '/content/tech/', area: 'side-nav-section-two' , location: 'tech-items-container-two'}
    ];

    if (self.fetch) {
        for (i=0; i<urls.length; i++) {
            runfetch = getContent();
            runfetch(host, urls[i].path, urls[i], 'side');
        }


    } else {
        // do something with XMLHttpRequest?
    }


    function getContent(){
        return function(host, rootPath, urlData, navLoc){
            let scrollTriggerList, url, scrollTrigger, container, content;

            url = host + rootPath + urlData.id + '.html';
            fetch(url)
                .then((resp) => resp.text())
            .then(function (data) {

                scrollTriggerList = document.getElementById(urlData.area);
                scrollTrigger = '<dd class="click-item" onclick="showSlide(\'' + urlData.id +'\',\'' + navLoc + '\')"> '+ urlData.name + '</dd>';
                scrollTriggerList.insertAdjacentHTML('beforeend', scrollTrigger);

                content = document.createElement('div');
                content.classList.add('fcol-full');
                content.insertAdjacentHTML('afterbegin', data);
                content.id = urlData.id;

                container = document.getElementById(urlData.location);
                container.appendChild(content);
            })
                .catch(function (error) {
                    console.log(error);
                    // If there is any error you will catch them here
                });
        }
    }


})();
