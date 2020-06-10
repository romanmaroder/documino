$(document).ready(function () {

    /* Мобильное меню*/
    let burger = $('#logo-burger');
    let menu = $('.navigation-menu');
    let menuItem = $('.menu__item');
    let menuArrow = $('.menu__arrow');
    let submenu = $('.submenu');
    let submenuItem = $('.submenu__item');
    // let hiddenBlock = $('.hidden-block');


    $(window).resize(function () {
        let width = $(window).width();
        if (width > 768) {
            burger.removeClass('logo__burger--close');
            menuArrow.removeClass('menu__arrow--rotate');
            submenu.removeClass('submenu--open');
            menu.removeClass('navigation-menu--open');
        }

    });

    burger.on('click', function () {
        burger.toggleClass('logo__burger--close');
        menu.toggleClass('navigation-menu--open').slideDown();
    });
    menuItem.on('click', function (event) {

        $(this).find(submenu).toggleClass('submenu--open').slideDown();
        $(this).find(menuArrow).toggleClass('menu__arrow--rotate');

        let width = $(window).width();
        if (width > 768) {
            let out = '';
            $(this).find(submenuItem).each(function () {
                out += $(this).html();
            })
             if ($('.hide-submenu').height() > 0 && $('.hide-submenu').css('display') !== 'none') {

                $('.hide-submenu').slideUp().html(out);
            } else {
                $('.hide-submenu').slideDown().html(out);
            }
        }

    })

});