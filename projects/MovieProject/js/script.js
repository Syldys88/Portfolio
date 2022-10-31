'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const promo = document.querySelector('.promo');
    const removedElements = promo.querySelectorAll('.promo__adv img');
    const poster = document.querySelector('.promo__bg');
    const renamedGenre = poster.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const form = document.querySelector('form.add');
    const addMovie = form.querySelector('.adding__input');
    const checkbox = form.querySelector('[type="checkbox"]');


    // 5)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addMovie.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавлен любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }
        
        event.target.reset();
    });
    
    const deleteAdv = (arr) => {
        // 1)
        // const removedElements = promo.querySelector('.promo__adv');
        // removedElements.remove(); // полностью удалил блок рекламы
        removedElements.forEach (item => {
        item.remove();
        });
        // removedElements.forEach (function (item) {
        //     item.remove();
        // });
    };
    
    const makeChanges = () => {
        // 2)
        renamedGenre.textContent = "ДРАМА";
    
        // 3)
        poster.style.backgroundImage = 'url(img/bg.jpg)';
    };
    
    const sortArr = (arr) => {
        arr.sort();
    };
    
    // 6)
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }


    deleteAdv(removedElements);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});

