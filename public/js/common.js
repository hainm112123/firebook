var socket = io();
const url = 'http://localhost:5000/messages';

//-------------------------nav center--------------------------
function currentPage() {
  var navbarCenter_Items = document.querySelectorAll('.navbar-center__item');
  var check = 0 ;
  for (var navbarCenter_Item of navbarCenter_Items) {
    if (navbarCenter_Item.href === window.location.href) {
      navbarCenter_Item.classList.add('navbar-center__item--active');
      check = 1 ;
    }
  }
  if (!check) {
    navbarCenter_Items.slice(1);
    for (var navbarCenter_Item of navbarCenter_Items) {
      if (window.location.href.indexOf(navbarCenter_Item.href) !== -1) navbarCenter_Item.classList.add('navbar-center__item--active');
    }
  }
}
currentPage();

// ------------------------search-------------------------------
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
  friendChatbox.addEventListener('click', openChatbox)
}
function openChatbox(event) {
  var id = event.target.classList.value.split(' ').find(function(className) {
    return className.indexOf('buddy') !== -1;
  });
  var chatbox = document.querySelector('.chatbox-container.'+id);
  chatbox.style.display = 'block';
  var chatboxMessages = chatbox.querySelector('.chatbox__messages');
  chatboxMessages.scrollTo(0, chatboxMessages.scrollHeight);
}

var chatboxCloseBtns = document.getElementsByClassName('chatbox__close-btn');
for (var chatboxCloseBtn of chatboxCloseBtns) {
  chatboxCloseBtn.addEventListener('click', closeChatbox);
}
function closeChatbox(event) {
  if (event.target.closest('.chatbox__close-btn')) {
    var chatbox = event.target.closest('.chatbox-container');
    if (chatbox) chatbox.style.display = 'none';
  }
}

// --------------message------------------------

function sendMessage(message) {
  socket.emit('message', message);
  $.post(url, message);
}

function addMessage(message) {
  var toIndex = users.findIndex(function(user) {
    return user._id.toString() === message.to;
  });
  var fromIndex = users.findIndex(function(user) {
    return user._id.toString() === message.from;
  });
  var buddyIndex = message.from === curUser._id.toString() ? toIndex : fromIndex;

  if (message.goOpenChatbox && message.to === curUser._id.toString()) {
    var chatbox = document.querySelector('.chatbox-container.buddy' + buddyIndex);
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
      chatbox.style.display = 'block';
      var chatboxMessages = chatbox.querySelector('.chatbox__messages');
      chatboxMessages.scrollTo(0, chatboxMessages.scrollHeight);
    }
  }
  if (message.sent && message.from === curUser._id.toString()) return;

  var chatboxMessages = document.querySelector('.chatbox-container.buddy' + buddyIndex + ' .chatbox__messages');
  var messageWrap = document.createElement('div');
  messageWrap.innerHTML = `
    <div class="chatbox__buddy-avatar" style="background-image: url(${users[fromIndex].avatar})"></div>
    <div class="message__user-text">
      <div class="message__user"> ${users[fromIndex].firstName} </div>
      <div class="message__text"> ${message.text} </div>  
    </div>
  `
  messageWrap.classList.add("message-wrap");
  if (toIndex === buddyIndex) messageWrap.classList.add("cur-user-message");
  chatboxMessages.appendChild(messageWrap);
  chatboxMessages.scrollTo(0, chatboxMessages.scrollHeight);
}

function getMessages() {
  var userId = curUser._id.toString();
  $.get(url, function(messages) {
    messages.filter(function(message) {
      return message.from === userId || message.to === userId;
    }).forEach(addMessage);
  });
}

var chatboxSendBtns = document.querySelectorAll('.chatbox__send-message-btn');
for (var chatboxSendBtn of chatboxSendBtns) {
  chatboxSendBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var chatboxContainer = event.target.closest('.chatbox-container');
    var buddyClassName = chatboxContainer.classList.value.split(' ').find(function(className) {
      return className.indexOf('buddy') !== -1;
    });
    var buddyIndex = parseInt(buddyClassName.slice(5));
    var input = chatboxContainer.querySelector('.chatbox__input');
    if (input.value) {
      addMessage({
        from: curUser._id.toString(),
        to: users[buddyIndex]._id.toString(),
        text: input.value,
      });
      sendMessage({
        from: curUser._id.toString(),
        to: users[buddyIndex]._id.toString(),
        text: input.value,
        sent: 1,
        goOpenChatbox: 1,
      });
      input.value = "";
    }
  });
}

getMessages();

socket.on('message', addMessage);