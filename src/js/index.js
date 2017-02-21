

function goToPage(page){
    let pages, host;

    pages = {
        main: '/personal-page/index.html',
        tech: '/personal-page/technologies.html',
        projects: '/personal-page/projects.html',
        about: '/personal-page/about.html',
        blog: '/personal-page/blog.html',
        contact: '/personal-page/contact.html'
    };
    host = location.origin;
    location.assign(host + pages[page]);
}


function showSlide(goTo, showFrom){
    let sideNav;

    sideNav = document.getElementById(showFrom + '-nav');
    console.log(sideNav);
    sideNav.classList.toggle('show-'+ showFrom);
    sideNav.classList.toggle('hide-' + showFrom);
    if(goTo){
        document.querySelector('#' + goTo).scrollIntoView({ behavior: 'smooth' });
    }
}
