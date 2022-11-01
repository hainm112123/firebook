var seeMoreBtns = document.querySelectorAll('.see-more-btn');

for (var seeMoreBtn of seeMoreBtns) {
  seeMoreBtn.addEventListener('click', function(event) {
    var expandText = event.target.closest('.expand-text');
    expandText.querySelector('.three-dot').style.display = "none";
    expandText.querySelector('.more-text').style.display = "inline";
    expandText.querySelector('.see-more-btn').style.display = 'none';
  });
}

var postPhotosItemRemains = document.querySelectorAll('.post__photos-item__remain');
for (var postPhotosItemRemain of postPhotosItemRemains) {
  var content = document.createElement('span');
  content.innerText = "+" + postPhotosItemRemain.dataset.remains;
  postPhotosItemRemain.querySelector('.phots__overlay').appendChild(content);
}