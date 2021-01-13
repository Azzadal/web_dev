let lContent = document.getElementById('l_content');
let rContent = document.getElementById('r_content');

document.getElementById('lp_title').addEventListener('click', function(event){
    event.preventDefault();
    if (!lContent.classList.contains('show')) {
        lContent.classList.add('show');
        lContent.style.height = 'auto';

        var height = lContent.clientHeight + 'px';

        lContent.style.height = '0px';

        setTimeout(function () {
            lContent.style.height = height;
        }, 0);
    } else {
        lContent.style.height = '0px';

        lContent.addEventListener('transitionend', 
            function () {
                lContent.classList.remove('show');
            }, {
                once: true
        });
    }
});

document.getElementById('rp_title').addEventListener('click', function(event){
    event.preventDefault();
    if (!rContent.classList.contains('show')) {
        rContent.classList.add('show');
        rContent.style.height = 'auto';

        var height = rContent.clientHeight + 'px';

        rContent.style.height = '0px';

        setTimeout(function () {
            rContent.style.height = height;
        }, 0);
    } else {
        rContent.style.height = '0px';

        rContent.addEventListener('transitionend', 
            function () {
                rContent.classList.remove('show');
            }, {
                once: true
        });
    }
});