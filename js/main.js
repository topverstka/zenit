// Служебные переменные
const d = document;
const body = document.querySelector('body');


// Служебные функции

function find(selector) {
    return document.querySelector(selector)
}

function findAll(selectors) {
    return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
function removeAll(items, itemClass) {
    if (typeof items == 'string') {
        items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item.classList.remove(itemClass)
    }
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
        if (!body.classList.contains('_lock')) {
            body.classList.add('_lock');
        } else {
            body.classList.remove('_lock')
        }
    } else {
        console.error('Неопределенный аргумент у функции bodyLock()')
    }
}


// function validationForm() {
//     const name = find('#user_name')
//     const phone = find('#user_phone')
//     const email = find('#user_email')

//     let con = true

//     for (let i = 0; i < [name, phone, email].length; i++) {
//         const elem = [name, phone, email][i];
//         const elemValue = elem.value.trim()

//         if (elemValue === '') {
//             elem.classList.add('_error')
//             con = false
//         } else {
//             elem.classList.remove('_error')
//             con = true
//         }
//     }

//     return con
// }


// Валидация формы
function validationForm(event) {
    let submit = document.querySelectorAll('[data-submit]');


    submit.forEach(i => {
        i.closest('form').querySelectorAll('.validation-input').forEach(el => {
            if (el.value.trim() === '') {
                event.preventDefault();
                el.placeholder = 'Необходимо заполнить';
                el.classList.add('_error');
            } else {
                event.preventDefault(); // Временно
                el.classList.remove('_error');
                el.placeholder = el.dataset.placeholder;
            }
        });
    });
}

window.addEventListener('submit', function(e) {
    console.log(e.target)
    if (e.target.querySelector('[data-submit]')) {
        validationForm(e);
    }
});

// Отправка формы
sumbitForm()

function sumbitForm() {
    const form = find('.modal__form')

    form.addEventListener('submit', async e => {
        const modal = find('.modal._show')
        const btnSend = form.querySelector('[type=submit]')
        btnSend.classList.add('send-preloader')

        e.preventDefault()

        let con = validationForm()

        if (con === true) {
            const formData = new FormData()
            const action = form.getAttribute('action')

            let response = await fetch(action, {
                method: 'POST',
                body: formData
            })

            // settimeout здесь для того, чтобы показать работу отправки формы. В дальнейшем это нужно убрать
            setTimeout(() => {
                if (response.ok) {
                    console.log('Successful')
                    form.reset()

                    modal.classList.remove('_show')
                    find('#send-done').classList.add('_show')
                    btnSend.classList.remove('send-preloader')
                } else {
                    console.log('Error')
                    form.reset()

                    modal.classList.remove('_show')
                    find('#send-error').classList.add('_show')
                    btnSend.classList.remove('send-preloader')
                }
            }, 2000)

        }
    })
}

// Мобильное меню
menu()

function menu() {
    const burger = find('.burger')
    const menu = find('.header-all');

    // Высота меню
    // window.addEventListener('resize', () => {
    //     const headerHeight = find('.header').clientHeight

    //     if (window.innerWidth <= 768) {
    //         menu.style.paddingTop = headerHeight + 'px'
    //     } else {
    //         menu.style.paddingTop = 0
    //     }
    // })

    burger.addEventListener('click', (e) => {
        burger.classList.toggle('burger_close')
        menu.classList.toggle('_show')
        bodyLock()
    })
}

const swiper = new Swiper('.swiper-container', {

    slidesPerView: 1, // Кол-во показываемых слайдов
    spaceBetween: 0, // Расстояние между слайдами
    loop: true, // Бесконечный слайдер
    centeredSlides: true, // Размещать слайдеры по центру


    autoplay: { // автопрокрутка
        delay: 5000, // задержка
    },

    breakpoints: {
        1200: {

        },
        700: {

        },
        400: {

        }
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    //   navigation: {
    //     nextEl: '.swiper__arrow-next',
    //     prevEl: '.swiper__arrow-prev',
    //   },

    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },
});


const swiperNewsDetail = new Swiper('.detail-news-page__slider .swiper', {

    slidesPerView: 2, // Кол-во показываемых слайдов
    spaceBetween: 8, // Расстояние между слайдами
    loop: true, // Бесконечный слайдер
    // centeredSlides: true, // Размещать слайдеры по центру


    autoplay: { // автопрокрутка
        delay: 5000, // задержка
    },

    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        700: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        400: {

        }
    },

    navigation: {
        nextEl: '.detail-news-page__slider .swiper__arrow-next',
        prevEl: '.detail-news-page__slider .swiper__arrow-prev',
    },

});

// Функции для модальных окон
modal()

function modal() {

    // Открытие модальных окон при клике по кнопке
    openModalWhenClickingOnBtn()

    function openModalWhenClickingOnBtn() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');

        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];

            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)

                openModal(modal)
                window.location.hash = dataBtn
            });
        }
    }

    // Открытие модального окна, если в url указан его id
    openModalHash()

    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)

            if (modal) openModal(modal)
        }
    }

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    checkHash()

    function checkHash() {
        window.addEventListener('hashchange', e => {
            const hash = window.location.hash
            const modal = document.querySelector(`.modal${hash}`)

            if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            if (modal && hash != '') openModal(modal)
        })
    }

    // Закрытие модального окна при клике по заднему фону
    closeModalWhenClickingOnBg()

    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__body')) closeModal(modal)
        })
    }

    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()

    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')

            closeThisModal.addEventListener('click', () => {
                closeModal(modal)
            })
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()

    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeModal(modal)
            })
        }
    }

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
    }
}

// Object.defineProperty(Element.prototype, 'documentOffsetTop', {
//     get: function() {
//         return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop : 0);
//     }
// });


if (document.querySelector('.section_maps__maps')) {
    let secionMap = document.querySelector('.section_maps__maps');
    let secionMapMouse = document.querySelector('.section_maps__maps-mouse');
    secionMap.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'path') {
            let leftContainer = document.querySelector('#interactive-maps').getBoundingClientRect().left + 35;
            let topContainer = document.querySelector('#interactive-maps').getBoundingClientRect().top + 30;
            let widthElement = e.target.getBoundingClientRect().width;
            let heightElement = e.target.getBoundingClientRect().height;
            let top = (e.target.getBoundingClientRect().top - topContainer) + (heightElement / 2);
            let left = (e.target.getBoundingClientRect().left - leftContainer) + (widthElement / 2);
            let addCoordX = e.target.getAttribute('data-add-coordx') ? e.target.getAttribute('data-add-coordx') : 0;

            secionMapMouse.style.cssText = `
                top: ${parseInt(top)}px;
                left: ${parseInt(left) + parseInt(addCoordX)}px
            `;

            secionMapMouse.innerText = e.target.dataset.region
        } else {
            secionMapMouse.style = null;
            secionMapMouse.innerText = '';
        }
    });
}

// document.querySelector('.section_maps__maps').addEventListener('mouseout', function(e) {
//     if (e.target.tagName === 'path') {
//         document.querySelector('.section_maps__maps-mouse').style = null;
//         document.querySelector('.section_maps__maps-mouse').innerText = '';
//     }

// });

document.querySelector('.header-all__bottom__search .search-input').addEventListener('click', function(e) {
    this.closest('.header-all__bottom__search').classList.add('_active')
});

document.addEventListener('input', function(e) {
    if (e.target.getAttribute('type') === 'tel') {
        e.target.value = e.target.value.replace(/[A-Za-zА-Яа-яЁё]/, '')
    }
});


document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('header-all__bottom__search') && !e.target.closest('.header-all__bottom__search')) {
        deleteViewEsc(document.querySelector('.header-all__bottom__search'));
    }
});

function deleteViewEsc(target) {
    target.closest('[data-search]').classList.remove('_active');
    target.closest('[data-search]').querySelector('input').value = '';
    if (target.closest('[data-search-mobile]')) {
        target.closest('header').querySelector('.header-picture').style.display = null;
    }
}

document.querySelectorAll('.search-esc').forEach(i => {
    i.addEventListener('click', () => deleteViewEsc(i));
});


document.querySelector('.header_mobile__search svg').addEventListener('click', function(e) {
    if (!this.closest('[data-search]').classList.contains('_active')) {
        this.closest('[data-search]').classList.add('_active');
        this.closest('header').querySelector('.header-picture').style.display = 'none';
    }
});


document.querySelector('.footer_scroll_top').addEventListener('click', function(e) {
    window.scrollTo(0, 0);
});

function showMenu(target) {
    let flage = false;
    let heightElement = document.querySelector(target).scrollHeight;
    document.querySelectorAll('.dropdown').forEach(i => {
        i.addEventListener('click', () => {

            if (!i.querySelector(target).style.height) {
                document.querySelectorAll(target).forEach(el => {
                    el.classList.remove('_show');
                    el.style = null;
                });
                i.querySelector(target).style.height = heightElement + 'px';
                i.querySelector(target).classList.add('_show');

            } else {
                i.querySelector(target).style.height = null;
                i.querySelector(target).classList.remove('_show');

            }

        });
    });
}

showMenu('.header-all__bottom__list-children');

if (window.matchMedia('(max-width: 992px)').matches) {
    document.querySelector('header').classList.add('mobile-grid');
}

if (typeof(lightGallery) === 'function') {
    lightGallery(document.querySelector('.detail-news-page__wrapper'), {
        thumbnail: true,
    });
}

// Скрипт для страницы Отзывы на отображение/скрытие пагинации, если элементов больше 10
const reviewsItems = document.querySelectorAll('.reviews-page__list li');
const pagination = document.querySelector('.pagination');

if (reviewsItems && pagination) {
    if (window.matchMedia('(min-width: 769px)').matches) {
        if (reviewsItems.length > 10) {
            pagination.classList.add('show');
        };
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        pagination.classList.add('show');
    }
}










// Catalog
const catalogNavBtn = find('.catalog-nav-btn')
const catalogNav = find('.catalog-nav')

catalogNavBtn && catalogNav && catalogNavBtn.addEventListener('click', (e) => {
    e.preventDefault()
    catalogNav.classList.toggle('active')
    catalogNavBtn.innerText = catalogNav.classList.contains('active') ? "Закрыть каталог" : "Открыть каталог"
})

const catalogNavItems = findAll('.catalog-nav a')
for (const item of catalogNavItems) {


    function openSubmenu(submenu, active = true) {
        if (submenu) {

            if (active) {
                submenu.style.height = submenu.scrollHeight + "px"
            } else {
                submenu.style.height = 0;
            }
        }
    }


    if (item.classList.contains('active')) {
        const submenu = item.parentElement.querySelector('ul')
        openSubmenu(submenu)
    }

    item.addEventListener('click', (e) => {
        const target = e.currentTarget
        const targetLink = target.getAttribute('href')

        if (targetLink === "#") {

            target.classList.toggle('active')
            const submenu = target.parentElement.querySelector('ul')

            openSubmenu(submenu, target.classList.contains('active'))

            e.preventDefault()
            return
        }
    })
}



// TABS

const tabsLinks = findAll('.tab-link')
const tabsItems = findAll('.tab')

tabsLinks.forEach(tabLink => {
    tabLink.addEventListener('click', (e) => {
        e.preventDefault();

        const id = tabLink.getAttribute('href')
        const el = find(id)

        tabsItems.forEach(item => {
            item.classList.remove('tab--active')
        })

        tabsLinks.forEach(item => {
            item.classList.remove('tab-link--active')
        })

        if (el) {
            tabLink.classList.add('tab-link--active')
            el.classList.add('tab--active')
        }
    })
})


const swiperCatalogDetail = new Swiper('.catalog-detail-slider .swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.catalog-detail-slider__arrows .swiper__arrow-next',
        prevEl: '.catalog-detail-slider__arrows .swiper__arrow-prev',
    },
});



const catalogGDetailItems = findAll('.catalog-detail-slider__item')
const catalogGDetailPhotoContainer = find('.catalog-detail-main')

if (catalogGDetailItems.length > 0) {
    
    catalogGDetailItems.forEach((item, i) => {
        const src = item.getAttribute('src')

        var a = document.createElement("a");
        a.setAttribute('href', src)
        a.classList.add('catalog-detail__photo')
        a.innerHTML = `<img src="${src}" alt="">`

        if(i === 0 ) a.classList.add('catalog-detail__photo--active')
        catalogGDetailPhotoContainer.appendChild(a);

        item.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            catalogGDetailItems.forEach(_item => {
                _item.classList.remove('catalog-detail-slider__item--active')
            })


            const itemsMainphotos = findAll('.catalog-detail__photo')
            itemsMainphotos.forEach(_item => {
                _item.classList.remove('catalog-detail__photo--active')
            })

            itemsMainphotos[i].classList.add('catalog-detail__photo--active')

            item.classList.add('catalog-detail-slider__item--active')
        })
    })


    if (typeof(lightGallery) === 'function') {
        lightGallery(document.querySelector('.catalog-detail-main'), {
            thumbnail: true,
        });
    }

}

// File loader

const filedsFile = findAll('.field-file')
filedsFile.forEach(field => {
    const input = field.querySelector('input[type="file"]')
    const placeholder = field.querySelector('.field-file__placeholder')
    const limitation = field.querySelector('.field-file__limitation')

    input && input.addEventListener('change', (e) => {
        if(e.currentTarget.files[0].size >= 6e+6) {
            e.preventDefault()
            e.stopPropagation()
            limitation.innerText = "Файл не должен превышать размер 6 mb"
            limitation.style.color = "red"
            placeholder.innerText = "Перетащите файл сюда или нажмите для загрузки"
            field.style.borderColor = "red"
        } else {
            const filename = e.currentTarget.files[0].name
            limitation.innerText = ""
            placeholder.innerText = filename
            limitation.style.color = "#222"
            field.style.borderColor = "rgba(34, 34, 34, 0.7)"
        }
    })
})







window.addEventListener('click', function(e) {
    if (e.target.classList.contains('vakansion-page_accordion__header') || e.target.closest('.vakansion-page_accordion__header')) {


        let parentElement = e.target.closest('.vakansion-page_accordion');
        let bodyElement = parentElement.querySelector('.vakansion-page_accordion__body');

        if (!bodyElement.style.height) {
            findAll('.vakansion-page_accordion__body').forEach(i => {
                i.style = null;
                i.classList.remove('_show');
                // find('.vakansion-page_accordion__body._show-padding') ? setTimeout(() => find('.vakansion-page_accordion__body._show-padding').classList.remove('_show-padding'), 200) : '';
                i.closest('.vakansion-page_accordion').classList.remove('_show');
            });
            bodyElement.style.height = bodyElement.scrollHeight + 'px';
            bodyElement.classList.add('_show-padding');
            bodyElement.classList.add('_show');
            bodyElement.closest('.vakansion-page_accordion').classList.add('_show');

        } else {
            bodyElement.style = null;
            bodyElement.classList.remove('_show');
            bodyElement.closest('.vakansion-page_accordion').classList.remove('_show');
            setTimeout(() => {
                bodyElement.classList.remove('_show-padding');
                find('.vakansion-page_accordion__body._show-padding') ? find('.vakansion-page_accordion__body._show-padding').classList.remove('_show-padding') : '';
            }, 200);
            // setTimeout(() => find('.vakansion-page_accordion__body._show-padding').classList.remove('_show-padding'), 200);
        }
    }
})