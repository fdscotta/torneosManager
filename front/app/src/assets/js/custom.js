$(window).on("load", function (e) {
    setTimeout(function () {
        $("#preloader").fadeOut("slow", function () {
            $(this).remove()
        })
    }, 10);

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.grid').masonry({
            itemSelector: '.grid-item',
            gutter: 20,
            columnWidth: '.grid-25',
            horizontalOrder: false,
            transitionDuration: '1.2s',
            percentPosition: true
        });
    }
});

$(document).ready(function () {

    var a = new LazyLoad({
        elements_selector: ".lazy"
    });

    $("header .menu").on('click', function () {
        $(this).toggleClass("on");
        $(".site-nav__menu").toggleClass('open');
        $("body").toggleClass('open-menu');
    });

    if (document.querySelector('.b-filters') !== null) {
        $(".b-filters .dropdown").on('click', function () {
            $(this).toggleClass("click-hover");
        });
    }

    if (document.querySelector('.d-hero-tournament') !== null) {
        $(window).scroll(function () {
            if ($(document).scrollTop() > 1) {
                $(".d-hero-tournament").addClass('state-1');
            }
            if ($(document).scrollTop() <= 1) {
                $(".d-hero-tournament").removeClass('state-1');
            }
            if ($(document).scrollTop() > 280) {
                $(".d-hero-tournament").addClass('state-2');
            }
            if ($(document).scrollTop() <= 280) {
                $(".d-hero-tournament").removeClass('state-2');
            }
        });
    }

    var position = $(window).scrollTop();
    // should start at 0
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > position) {
            $("header").removeClass("scroll-up");
        } else {
            $("header").addClass("scroll-up");
        }
        if (scroll < position) {
            $("header").removeClass("scroll-down");
        } else {
            $("header").addClass("scroll-down");
        }
        position = scroll;

        if ($(window).width() > 768) {
            if ($(document).scrollTop() > 1) {
                $("header").removeClass('no-scroll');
            }
            if ($(document).scrollTop() <= 1) {
                $("header").addClass('no-scroll');
            }
        }
        if ($(window).width() <= 768) {
            if ($(document).scrollTop() > 150) {
                $("header").removeClass('no-scroll');
            }
            if ($(document).scrollTop() <= 150) {
                $("header").addClass('no-scroll');
            }
        }

        if (document.querySelector('.d-hero') !== null) {
            if ($(document).scrollTop() > 250) {
                $(".d-hero").addClass('before-1');
            }
            if ($(document).scrollTop() <= 250) {
                $(".d-hero").removeClass('before-1');
            }
            /*if ($(document).scrollTop() > 400) {
                $(".d-hero").addClass('before-2');
            }
            if ($(document).scrollTop() <= 400) {
                $(".d-hero").removeClass('before-2');
            }*/
        }
    });

    //slider cards
    if (document.querySelector('.d-slider-tournament-cards') !== null) {
        class Card {
            constructor(node, position) {
                this.node = node;
                this.position = position;
            }

            nextPosition () {
                let nextPosition = 1;

                if (this.position != 5) {
                    nextPosition = this.position + 1;
                }

                return nextPosition;
            }

            prevPosition () {
                let prevPosition = 5;

                if (this.position != 1) {
                    prevPosition = this.position - 1;
                }

                return prevPosition;
            }

            moveNext () {
                this.node.classList.replace(
                    `position${this.position}`,
                    `position${this.nextPosition()}`
                );

                this.position = this.nextPosition();
            }

            movePrev () {
                this.node.classList.replace(
                    `position${this.position}`,
                    `position${this.prevPosition()}`
                );

                this.position = this.prevPosition();
            }
        }

        // Initializations
        const [prev, next] = document.querySelectorAll("o");
        const gallery = document.querySelector(".gallery");
        const cards = [];
        let start;

        // Instantiate cards and populate cards array
        document.querySelectorAll(".card").forEach((e, pos = 0) => {
            pos += 1;
            cards.push(new Card(e, pos));
        });

        // Handle click events
        next.addEventListener("click", () => {
            cards.forEach((c) => {
                c.moveNext();
            });
        });

        prev.addEventListener("click", () => {
            cards.forEach((c) => {
                c.movePrev();
            });
        });

        // Handle slide events
        gallery.addEventListener("touchstart", (s) => {
            start = s.targetTouches[0].screenX;
        });

        gallery.addEventListener("touchend", (e) => {
            let end = e.changedTouches[0].screenX;
            const range = Math.abs(start - end);

            if (range > 30) {
                if (start < end) {
                    cards.forEach((c) => {
                        c.moveNext();
                    });
                }

                if (start > end) {
                    cards.forEach((c) => {
                        c.movePrev();
                    });
                }
            }
        });
    }

    if (document.querySelector('.d-tournaments-calendar') !== null) {
        $(".b-select-view .a-list").on('click', function () {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-calendar-list").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-calendar").addClass("d-none").removeClass("d-block");
        });
        $(".b-select-view .a-calendar").on('click', function () {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-calendar").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-calendar-list").addClass("d-none").removeClass("d-block");
        });
        $(".d-tournaments-calendar .b-calendar-list .b-tournament .btn-tickets").hover(function () {
            $(".d-tournaments-calendar .b-calendar-list .b-tournament").toggleClass("hover-tickets");
        });
    }

    if (document.querySelector('.d-ranking') !== null) {
        $(".b-select-view .a-ranking").on('click', function () {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-ranking").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-ranking-race").addClass("d-none").removeClass("d-block");
            $(".b-title-top .title .t-ranking").addClass("d-block").removeClass("d-none");
            $(".b-title-top .title .t-ranking-race").addClass("d-none").removeClass("d-block");
            $(".d-tournaments-calendar").addClass("bg-img-ranking").removeClass("bg-img-race");
            $(".b-hero-ranking-race").addClass("d-none").removeClass("d-block");
            $(".b-hero-ranking").addClass("d-block").removeClass("d-none");
        });
        $(".b-select-view .a-ranking-race").on('click', function () {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-ranking-race").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-ranking").addClass("d-none").removeClass("d-block");
            $(".b-title-top .title .t-ranking-race").addClass("d-block").removeClass("d-none");
            $(".b-title-top .title .t-ranking").addClass("d-none").removeClass("d-block");
            $(".d-tournaments-calendar").addClass("bg-img-race").removeClass("bg-img-ranking");
            $(".b-hero-ranking").addClass("d-none").removeClass("d-block");
            $(".b-hero-ranking-race").addClass("d-block").removeClass("d-none");
        });
    }

    if (document.querySelector('.mySwiperCalendar') !== null) {
        $(".filters-calendar .b-filter ul li").on('click', function () {
            $(".filters-calendar .b-filter ul li").removeClass("active");
            $(this).addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-all").on('click', function () {
            $(".filters-calendar .swiper .all").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-exhibition").on('click', function () {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-exhibition").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-open").on('click', function () {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-open").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-challenger").on('click', function () {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-challenger").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-master").on('click', function () {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-master").addClass("active");
        });
    }

    if (document.querySelector('.d-info-player-statistics') !== null) {
        $(".b-title-top .b-select-view .a-feminine").on('click', function () {
            $(".b-title-top .b-select-view a").removeClass("active");
            $(this).addClass("active");
            //$(".b-row-feminine").addClass("d-flex").removeClass("d-none");
            //$(".b-row-male").addClass("d-none").removeClass("d-flex");
        });
        $(".b-title-top .b-select-view .a-male").on('click', function () {
            $(".b-title-top .b-select-view a").removeClass("active");
            $(this).addClass("active");
            //$(".b-row-male").addClass("d-flex").removeClass("d-none");
            //$(".b-row-feminine").addClass("d-none").removeClass("d-flex");
        });

        $(".b-info .b-select-view .a-statistics").on('click', function () {
            $(".b-info .b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".b-table.b-table-statistics").addClass("d-block").removeClass("d-none");
            $(".b-table.b-table-match").addClass("d-none").removeClass("d-block");
        });
        $(".b-info .b-select-view .a-match").on('click', function () {
            $(".b-info .b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".b-table.b-table-match").addClass("d-block").removeClass("d-none");
            $(".b-table.b-table-statistics").addClass("d-none").removeClass("d-block");
        });
    }

    if ($(window).width() > 768) {
        if (document.querySelector('.mySwiperCalendar') !== null) {
            var swiper = new Swiper(".mySwiperCalendar", {
                spaceBetween: 7,
                slidesPerView: 6,
                navigation: {
                    nextEl: ".swiper-button-next-calendar",
                    prevEl: ".swiper-button-prev-calendar",
                },
            });
        }
        if (document.querySelector('.mySwiperScoreboard') !== null) {
            var swiper = new Swiper(".mySwiperScoreboard", {
                spaceBetween: 35,
                slidesPerView: 2,
                navigation: {
                    nextEl: ".swiper-button-next-scoreboard",
                    prevEl: ".swiper-button-prev-scoreboard",
                },
            });
        }
    }
    if ($(window).width() <= 768) {
        if (document.querySelector('.mySwiperCalendar') !== null) {
            var swiper = new Swiper(".mySwiperCalendar", {
                spaceBetween: 7,
                slidesPerView: 1,
                freeMode: true,
                navigation: {
                    nextEl: ".swiper-button-next-calendar",
                    prevEl: ".swiper-button-prev-calendar",
                },
            });
        }
        if (document.querySelector('.mySwiperScoreboard') !== null) {
            var swiper = new Swiper(".mySwiperScoreboard", {
                spaceBetween: 17,
                slidesPerView: 1,
                navigation: {
                    nextEl: ".swiper-button-next-scoreboard",
                    prevEl: ".swiper-button-prev-scoreboard",
                },
            });
        }
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        $(".filters-ranking .b-filter ul li").on('click', function () {
            $(".filters-ranking .b-filter ul li").removeClass("active");
            $(this).addClass("active");
        });
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        let men = $(".b-slider-ranking.masc");
        let women = $(".b-slider-ranking.fem");
        $(".filters-ranking .b-filter ul li").on('click', function () {
            let letter = $(this).data("letter");
            $(".filters-ranking .b-filter ul li").removeClass("active");
            $(this).addClass("active");
            if (letter === 'M') {
                women.addClass("d-none");
                men.removeClass("d-none");
            }
            if (letter === 'F') {
                men.addClass("d-none");
                women.removeClass("d-none");
            }
        });
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        if ($(window).width() > 768) {
            var swiper = new Swiper(".mySwiperRanking", {
                spaceBetween: 74,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-ranking",
                    prevEl: ".swiper-button-prev-ranking",
                },
            });
        }
        if ($(window).width() <= 768) {
            var swiper = new Swiper(".mySwiperRanking", {
                spaceBetween: 74,
                slidesPerView: "auto",
                centeredSlides: true,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-ranking",
                    prevEl: ".swiper-button-prev-ranking",
                },
            });
        }
    }

    if (document.querySelector('.mySwiperGallery') !== null) {
        $('.mySwiperGallery').each(function () {
            var swiper = new Swiper("#" + $(this).attr('id'), {
                slidesPerView: 7,
                freeMode: true,
                watchSlidesProgress: true,
            });
            var swiper2 = new Swiper("#" + $(this).attr('id') + '-2', {
                slidesPerView: 1,
                effect: "fade",
                navigation: {
                    nextEl: "#" + $(this).attr('id') + "-2 .swiper-button-next-gallery",
                    prevEl: "#" + $(this).attr('id') + "-2 .swiper-button-prev-gallery",
                },
                thumbs: {
                    swiper: swiper,
                },
            });
            swiper2.on('slideChange', (event) => {
                var img_url = $(event.el).find('.swiper-slide-visible .img-div').data('original');
                $(event.el).parent().find('.link-download').attr('href', img_url)
                $(event.el).parent().find('.link-twitter').attr('href', 'https://twitter.com/share?url=' + encodeURI(img_url))
                $(event.el).parent().find('.link-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + img_url)
                $(event.el).parent().find('.link-mail').attr('href', 'mailto:?subject=&body=' + img_url)
                $(event.el).parent().find('.link-copy').data('url', img_url)
            });
        })
    }

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.grid').masonry({
            itemSelector: '.grid-item',
            gutter: 20,
            columnWidth: '.grid-25',
            horizontalOrder: false,
            transitionDuration: '1.2s',
            percentPosition: true
        });
    }

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.copy-clipboard').on('click', function () {
            navigator.clipboard.writeText($(this).data('url'));
            //alert("Copied");
        })
    }

    if (document.querySelector('.b-registration-form') !== null) {
        $("form #i-1").on('click', function () {
            $("span.i-1").addClass("active");
            $("span.i-2").removeClass("active");
        });
        $("form #i-2").on('click', function () {
            $("span.i-2").addClass("active");
            $("span.i-1").removeClass("active");
        });

        $("form #i-3").on('click', function () {
            $("span.i-3").addClass("active");
            $("span.i-4").removeClass("active");
        });
        $("form #i-4").on('click', function () {
            $("span.i-4").addClass("active");
            $("span.i-3").removeClass("active");
        });

        $("form #i-5").on('click', function () {
            $("span.i-5").addClass("active");
            $("span.i-6").removeClass("active");
        });
        $("form #i-6").on('click', function () {
            $("span.i-6").addClass("active");
            $("span.i-5").removeClass("active");
        });

        $("form #i-7").on('click', function () {
            $("span.i-7").addClass("active");
            $("span.i-8").removeClass("active");
        });
        $("form #i-8").on('click', function () {
            $("span.i-8").addClass("active");
            $("span.i-7").removeClass("active");
        });
        $("form #i-9").on('click', function () {
            $("span.i-9").addClass("active");
            $("span.i-10").removeClass("active");
        });
        $("form #i-10").on('click', function () {
            $("span.i-10").addClass("active");
            $("span.i-9").removeClass("active");
        });

        $("form #i-11").on('click', function () {
            $("span.i-11").addClass("active");
            $("span.i-12").removeClass("active");
        });
        $("form #i-12").on('click', function () {
            $("span.i-12").addClass("active");
            $("span.i-11").removeClass("active");
        });

        $("form #i-13").on('click', function () {
            $("span.i-13").addClass("active");
            $("span.i-14").removeClass("active");
        });
        $("form #i-14").on('click', function () {
            $("span.i-14").addClass("active");
            $("span.i-13").removeClass("active");
        });

        $("form #i-15").on('click', function () {
            $("span.i-15").addClass("active");
            $("span.i-16").removeClass("active");
        });
        $("form #i-16").on('click', function () {
            $("span.i-16").addClass("active");
            $("span.i-15").removeClass("active");
        });

        $("form #c-1").on('click', function () {
            $("span.c-1").toggleClass("active");
        });
        $("form #c-2").on('click', function () {
            $("span.c-2").toggleClass("active");
        });
        $("form #c-3").on('click', function () {
            $("span.c-3").toggleClass("active");
        });
        $("form #c-4").on('click', function () {
            $("span.c-4").toggleClass("active");
        });
        $("form #c-5").on('click', function () {
            $("span.c-5").toggleClass("active");
        });
        $("form #c-6").on('click', function () {
            $("span.c-6").toggleClass("active");
        });
    }

});