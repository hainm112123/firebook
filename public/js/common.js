var navSearchInput = document.querySelector('.navbar .navbar-search__input');
var navLogo = document.querySelector('.navbar-logo-container');
var navbarSearchBackBtn = document.querySelector('.navbar .navbar-search-back-btn');

function showSearch() {
  navLogo.style.animation = 'fadeOutLeft ease 0.3s';
  navLogo.style.display = 'none';
  navbarSearchBackBtn.style.display = 'block';
  navbarSearchBackBtn.style.animation = 'fadeInRight ease 0.3s';
  navSearchInput.style.width = '250px';
}

function hiddenSearch() {
  navLogo.style.display = 'block';
  navLogo.style.animation = 'fadeInLeft ease 0.3s';
  navbarSearchBackBtn.style.display = 'none';
  navSearchInput.style.width = '240px';
}

navSearchInput.addEventListener('focus', showSearch);
navSearchInput.addEventListener('blur', hiddenSearch);
navbarSearchBackBtn.addEventListener('click', hiddenSearch);

// --------------chat box-----------------
var chatboxs = document.getElementsByClassName('chatbox-container');
var friendChatboxs = document.getElementsByClassName('friend-chatbox__overlay');
for (var friendChatbox of friendChatboxs) {
  friendChatbox.addEventListener('click', function(event) {
    var id = event.target.classList.value.split(' ').find(function(className) {
      return className.indexOf('buddy') !== -1;
    });
    var chatbox = document.querySelector('.chatbox-container.'+id);
    chatbox.style.display = 'block';
  });
}

var chatboxCloseBtns = document.getElementsByClassName('chatbox__close-btn');
for (var chatboxCloseBtn of chatboxCloseBtns) {
  chatboxCloseBtn.addEventListener('click', function(event) {
    if (event.target.closest('.chatbox__close-btn')) {
      var chatbox = event.target.closest('.chatbox-container');
      if (chatbox) chatbox.style.display = 'none';
    }
  });
}