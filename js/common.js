jQuery(document).ready(function ($) {

    /**
     * Меню
     */

    let menuA = $('#menu a');
    menuA.each(function () {
        if ($(this).next('ul').length) {
            $(this).append(' <i class="icon-arr"></i>')
        }
    });

    $(document).on('click', '#menu a', function (e) {
        let $this = $(this);
        let thisParent = $this.closest('li'),
            ul = thisParent.find('> ul');
        if (ul.length > 0) {
            e.preventDefault();

            if (thisParent.hasClass('active')) {
                thisParent.removeClass('active')
            } else {
                thisParent.addClass('active').siblings().removeClass('active');
            }

            if ($(window).width() < 1200) {
                if (!ul.find('.btn-menu-back').length) {
                    ul.prepend('<li><button class="btn-menu-back"><i class="icon-arr"></i>' + $this.text() + '</button></li>');
                }
            }
        }
    });

    $(document).on('click', function (e) {
        hideElement($(e.target), '#menu', $('#menu li'));
    });

    $(document).on('click', '.btn-menu-back', function (e) {
        $(this).closest('ul').closest('li').removeClass('active');
    });

    $('.btn-menu').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active').next().slideToggle();
        $('#header').toggleClass('active');
    })

    /**
     * Слайдер отзывов
     */
    $('#slider-reviews').slick({
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    });

    /**
     * Слайдер элементов в мобильной версии
     */
    let sliderItems = $('.slider-items');
    let sliderItemsSettings = {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    sliderItems.slick(sliderItemsSettings);

    /**
     * Слайдер фрилансеров
     */
    let sliderFreelancers = $('.slider-freelancers');
    let sliderFreelancersSettings = {
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    sliderFreelancers.slick(sliderFreelancersSettings);

    /**
     * Слайдер портфолио
     */

    let sliderPortfolio = $('.slider-portfolio');
    let sliderPortfolioSettings = {
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    sliderPortfolio.slick(sliderPortfolioSettings);

    /**
     * Еще категории
     */
    $('.btn-category-more').on('click', function () {
        console.log($(this).text());
        $(this).closest('.category').find('li.hidden').toggle();

        if ($(this).text() === 'Еще категории') {
            $(this).text('Скрыть')
        } else {
            $(this).text('Еще категории')
        }
    });

    /**
     * Аккордион
     */
    $('.question').on('click', function () {
        let thisParent = $(this).closest('.faq'),
            otherParents = thisParent.siblings();
        otherParents.find('.question').removeClass('active').next('.answer').slideUp();
        thisParent.find('.question').toggleClass('active').next('.answer').slideToggle();
    });


    /**
     * Поиск
     */
    let quickSearch = $('#quick-search'),
        searchResults = $('.search-results');

    quickSearch.find('input').on('focus', function () {
        searchResults.addClass('active');
    });

    quickSearch.find('input').on('blur', function () {
        setTimeout(function () {
            searchResults.removeClass('active');
        }, 1)
    });

    /**
     * Fancybox
     */
    $('.slider-portfolio .slick-slide:not(.slick-cloned) a').fancybox();

    /**
     * Меню Категории
     */

    $(document).on('click', '.categories-list a', function (e) {
        let $this = $(this),
            thisLi = $this.closest('li'),
            thisUl = thisLi.find('ul');
        if (thisUl.length > 0) {
            e.preventDefault();
            thisLi.toggleClass('active').siblings().removeClass('active');

        }
    });

    /**
     * Select
     */

    let _dropdown;
    let settings = { autoReinitialise: true };
    let visibleOptions = 5;
    let stylerOptions = {
        selectVisibleOptions: visibleOptions,
        // selectSearch: true,
        onFormStyled: function () {
            _dropdown = $('.jq-selectbox__dropdown');
            _dropdown.find('ul').wrap('<div class="scroll-pane" />');
        },
        onSelectOpened: function () {
            let _ul = $(this).find('.jq-selectbox__dropdown ul');
            let height = _ul.height();
            let _srollPane = _dropdown.find('.scroll-pane');
            _srollPane.height(height);
            _ul.css('max-height', 'none');
            _srollPane.jScrollPane(settings);
        },
    }

    $('select').each(function () {
        $(this).styler($(this).find('option').length > visibleOptions ? stylerOptions : {});
    });

    /**
     * Filter
     */
    $('.btn-filter-toggle').on('click', function (e) {
        let $this = $(this),
            filterDetails = $('.filter-details');

        filterDetails.toggleClass('active');

        if ($(window).width() > 1200) {
            if ($this.text() === 'Расширенный поиск') {
                $this.text('Закрыть расширенный поиск')
            } else {
                $this.text('Расширенный поиск');
            }
        }
    });


    /**
     * Рейгитнг
     */
    $('.stars.clickable svg').on('click', function () {
        let $this = $(this);
        $this.closest('.stars').attr('data-value', $this.data('value'));
    });

    /**
     * Табы
     */
    $('#tabs').on('click', 'li:not(.active)', function () {
        let $thisTab = $(this).addClass('active').siblings().removeClass('active').parents().find('.tab-box').eq($(this).index());

        if ($(window).width() < 1200) {
            $thisTab.fadeIn(150).siblings('.tab-box').hide();

        } else {
            $('html, body').animate({
                scrollTop: $thisTab.offset().top
            }, 500);
        }

    });

    /**
     * Сортировка
     */
    let sort = $('.sort');
    $('.sort-toggle').on('click', function (e) {
        sort.toggleClass('active');
    });

    $(document).on('click', function (e) {
        hideElement($(e.target), '.sort', sort);
    });
})


/**
 * Спрятать элемент по клику из вне
 */
function hideElement(el, parent, elHide) {
    if (!el.closest(parent).length) {
        elHide.removeClass('active');
    }
}
