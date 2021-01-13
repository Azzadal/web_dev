let x = document.getElementById('pairs');
let select = function(){
    let selectItem = document.querySelectorAll('.select__pair__item');

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoice)
    });

    function selectChoice(){
        let text = this.innerText;
        current.innerText = text;
        x.classList.remove('show');
        panels[0].style.zIndex = '0';
        schedule.style.zIndex = '0';
    }
    let current = document.getElementById('current');
}
select();

let panels = document.getElementsByClassName('panels');
let g = document.getElementsByClassName('select__pair__item');
let schedule = document.getElementById('schedule');

document.getElementById('current').addEventListener('click', function(event){
    event.preventDefault();
    if (!x.classList.contains('show')) {
    
        panels[0].style.zIndex = '-1';
        x.classList.add('show');
        x.style.height = 'auto';
        schedule.style.zIndex = '-1';
        var height = x.clientHeight + 'px';

        x.style.height = '0px';

        setTimeout(function () {
            x.style.height = height;
        }, 0);
    } else {
        x.style.height = '0px';
        panels[0].style.zIndex = '0';
        schedule.style.zIndex = '0';

        x.addEventListener('transitionend', 
            function () {
                
                x.classList.remove('show');
            }, {
                once: true
                });
    }
});