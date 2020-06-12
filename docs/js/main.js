$(document).ready(function () {

    /* Мобильное меню*/
    let burger = $('#logo-burger');
    let menu = $('.navigation-menu');
    let menuItem = $('.menu__item');
    let menuArrow = $('.menu__arrow');
    let submenu = $('.submenu');
    let submenuItem = $('.submenu__item');

    /*По клику на кнопке burger меняем стиль кнопки и показываем/скрываем мобильное меню*/
    burger.on('click', function () {
        burger.toggleClass('logo__burger--close');
        menu.toggleClass('navigation-menu--open').slideDown();
    });

    /*Клик по пунктам меню первого уровня*/
    menuItem.on('click', function (event) {

        /*Добавляем к пунктам меню класс*/
        $('.menu__item').not(this).removeClass('active');
        $(this).addClass('active');

        /*Находим меню второго уровня и показываем его */
        $(this).find(submenu).toggleClass('submenu--open').slideDown();

        /*Переключаем класс стрелки пункта в мобильном меню*/
        $(this).find(menuArrow).toggleClass('menu__arrow--rotate');

        /*Выводим пункты меню второго уровня в блок ".hide-submenu" только на ширине экрана больше 768px*/
        let width = $(window).width();
        if (width >= 768) {

            let out = '';
            $(this).find(submenuItem).each(function () {
                out += $(this).html();
            })

            if ($(this).hasClass('active')) {
                $('.hide-submenu').toggleClass('hide-submenu--open').html(out);
            }
        }
    })

    /* По клику на пункт меню второго уровня скрываем блок ".hide-submenu"*/
    $('.hide-submenu').on('click', '.submenu__link', function () {
        $('.hide-submenu').toggleClass('hide-submenu--open');
    })

    /*Убираем стили для мобильного меню если ширина экрана больше 768px*/
    $(window).resize(function () {
        let width = $(window).width();
        if (width > 768) {
            burger.removeClass('logo__burger--close');
            menuArrow.removeClass('menu__arrow--rotate');
            submenu.removeClass('submenu--open');
            menu.removeClass('navigation-menu--open');
        }

    });

    /*Баннер*/
    $('.banner__wrap').slick({
        dots: true,
        arrows:false
    });
    /*Слайдер с логотипами клиентов*/
    $('.client__slider').slick({
        adaptiveHeight:true,
        slidesToShow:5,
        arrows:true,
        responsive: [
            {
                breakpoint: 1410,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows:true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:true,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:true,
                }
            }

        ]
    });
    /*Слайдер блока  Гибкой настройки*/
    $('.setting__slider').slick({
        arrows:true,
        appendArrows:$('.button-wrap'),
    });


    $(function () {
        $('.accordeon__head').click(function () { // Вешаем собыите "клик" на заголово аккордеона
            $(this).toggleClass('active'); // добавляем класс 'active' тому пункут по которому кликаем. В данном случае, меняем цвет плашки
            $(this).next().toggleClass('active'); // добавляем класс 'active'. В данном случае, заставляем показать контент пункта по каоторому кликаем.
        });
    });
});