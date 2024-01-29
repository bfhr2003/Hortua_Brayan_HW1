(() => {

    //GreenSock Animations
    gsap.to('.official-logo', { duration: 1, rotationY: 180, repeat: 1, yoyo: true });

    let mySplitText = new SplitText(".movie-heading", { type: "chars,words,lines" });
    gsap.to(mySplitText.chars, { duration: 0.5, opacity: 0, stagger: 0.1 });

    //Variables
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    const characterBox = document.querySelector('#character-box');
    const movieTemplate = document.querySelector('#movie-template');
    const movieBox = document.querySelector('#movie-box');
    const movieCon = document.querySelector('#movie-con');
    const baseUrl = 'https://swapi.dev/api/';

    const spinnerLoader = `<svg fill="#ecd48c" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_EUy1{animation:spinner_grm3 1.2s infinite}.spinner_f6oS{animation-delay:.1s}.spinner_g3nX{animation-delay:.2s}.spinner_nvEs{animation-delay:.3s}.spinner_MaNM{animation-delay:.4s}.spinner_4nle{animation-delay:.5s}.spinner_ZETM{animation-delay:.6s}.spinner_HXuO{animation-delay:.7s}.spinner_YaQo{animation-delay:.8s}.spinner_GOx1{animation-delay:.9s}.spinner_4vv9{animation-delay:1s}.spinner_NTs9{animation-delay:1.1s}.spinner_auJJ{transform-origin:center;animation:spinner_T3O6 6s linear infinite}@keyframes spinner_grm3{0%,50%{animation-timing-function:cubic-bezier(.27,.42,.37,.99);r:1px}25%{animation-timing-function:cubic-bezier(.53,0,.61,.73);r:2px}}@keyframes spinner_T3O6{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}</style><g class="spinner_auJJ"><circle class="spinner_EUy1" cx="12" cy="3" r="1"/><circle class="spinner_EUy1 spinner_f6oS" cx="16.50" cy="4.21" r="1"/><circle class="spinner_EUy1 spinner_NTs9" cx="7.50" cy="4.21" r="1"/><circle class="spinner_EUy1 spinner_g3nX" cx="19.79" cy="7.50" r="1"/><circle class="spinner_EUy1 spinner_4vv9" cx="4.21" cy="7.50" r="1"/><circle class="spinner_EUy1 spinner_nvEs" cx="21.00" cy="12.00" r="1"/><circle class="spinner_EUy1 spinner_GOx1" cx="3.00" cy="12.00" r="1"/><circle class="spinner_EUy1 spinner_MaNM" cx="19.79" cy="16.50" r="1"/><circle class="spinner_EUy1 spinner_YaQo" cx="4.21" cy="16.50" r="1"/><circle class="spinner_EUy1 spinner_4nle" cx="16.50" cy="19.79" r="1"/><circle class="spinner_EUy1 spinner_HXuO" cx="7.50" cy="19.79" r="1"/><circle class="spinner_EUy1 spinner_ZETM" cx="12" cy="21" r="1"/></g></svg>`;


    //Functions
    function getCharacters() {

            let spinner = document.createElement('div');
            spinner.innerHTML = spinnerLoader;
            spinner.id = 'spinner';
            spinner.className = 'spinner';

            let logoIntro = document.createElement('img');
            logoIntro.src = 'img/user-ninja-solid.svg';
            logoIntro.className = 'logo-intro';

            characterBox.appendChild(spinner);
            characterBox.appendChild(logoIntro);

            gsap.to('.logo-intro', {duration: 1, rotationY: 180, repeat: 1, yoyo: true});


        fetch(`${baseUrl}people/?format=json`)
            .then(response => response.json())
            .then(function(response) {

            console.log(response);

            spinner.remove();
            logoIntro.remove();

            const characters = response.results;

            characters.slice(0, 10).forEach(character => {
                const li = document.createElement('li');
                li.classList.add('character-list');
                li.style.listStyle = 'none';
                li.style.height = '55px';
                li.style.margin = '0.1em';
                li.style.fontSize = '50px';
                li.style.borderBottom = '1px solid #F9FEEC';
                li.style.backgroundImage = `url('img/${character.name}.jpeg')`;
                li.style.backgroundSize = 'cover';
                li.style.backgroundPosition = 'center';
                li.style.backgroundRepeat = 'repeat';
                                

                const a = document.createElement('a');
                a.textContent = character.name;
                a.href = '#';
                a.style.fontSize = '50px';

                if (character.films.length > 0) {
                    const movieArrayIndex = Math.floor(Math.random() * character.films.length);//Math.random Returns a random Number from the films array [0,1,2,3,4,5,6]. Just to select one movie.
                    a.dataset.films = character.films[movieArrayIndex];
                }
                a.addEventListener("click", getMovieInformation);
                li.appendChild(a);
                characterBox.appendChild(li);
            });
            })
            .catch(error => {
                spinner.remove();
                logoIntro.remove();
                console.error("Character loading failure", error);
            });
    }

    function getMovieInformation(event) {
        event.preventDefault(event);
        
        let spinner = document.createElement('div');
            spinner.innerHTML = spinnerLoader;
            spinner.id = 'spinner';
            spinner.className = 'spinner';

            let logoIntro = document.createElement('img');
            logoIntro.src = 'img/clapperboard-solid.svg';
            logoIntro.className = 'logo-intro';

            movieBox.appendChild(spinner);
            movieBox.appendChild(logoIntro);

            gsap.to('.logo-intro', { duration: 1, rotationY: 180, repeat: 1, yoyo: true });

        movieCon.innerHTML = "";
        const movieLink = event.currentTarget.dataset.films;
        console.log("Character selected:", event.currentTarget.textContent);
        
        
        fetch(`${movieLink}?format=json`)
            .then(response => response.json())
            .then(function(response) {
                console.log("Fetched film information and description:", response);

                spinner.remove();
                logoIntro.remove();

                movieCon.innerHTML = "";

                const template = document.importNode(movieTemplate.content, true);

                const movieHeading = template.querySelector(".movie-heading");
                movieHeading.innerHTML = response.title;

                const movieDescription = template.querySelector(".movie-description");
                movieDescription.innerHTML = response.opening_crawl;

                const img = document.createElement('img');
                img.src = `img/${response.episode_id}.jpeg`;
                img.className = 'movie-img';
                img.alt = response.title;
                console.log(img);

                movieCon.appendChild(template);
                movieCon.appendChild(img);

            })
            .catch(error => {
                spinner.remove();
                logoIntro.remove();
                console.error("Failed to fetch movie information:", error);
                console.log("Error loading movie data when connecting to URL:", movieLink);
            });
    }

    getCharacters();

    //Event Listeners
    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
})();