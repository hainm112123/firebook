var navSearchInput = document.querySelector('.navbar .navbar-search__input');
var navLogo = document.querySelector('.navbar-logo-container');
var navbarSearchBackBtn = document.querySelector('.navbar .navbar-search-back-btn');

function showSearch() {
  navLogo.style.animation = 'fadeOutLeft ease 0.3s';
  navLogo.style.display = 'none';
  navbarSearchBackBtn.style.display = 'block';
  navbarSearchBackBtn.style.animation = 'fadeInRight ease 0.3s';
  navSearchInput.width
}

function hiddenSearch() {
  navLogo.style.display = 'block';
  navLogo.style.animation = 'fadeInLeft ease 0.3s';
  navbarSearchBackBtn.style.display = 'none';
}

navSearchInput.addEventListener('focus', showSearch);
navSearchInput.addEventListener('blur', hiddenSearch);
navbarSearchBackBtn.addEventListener('click', hiddenSearch);