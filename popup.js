$(document).ready(function(){
  fetch(new Date());
  setOnClick(1, '#yesterday');
  setOnClick(2, '#day-before-yesterday');
});

function setOnClick(delta, selector){
  var target = new Date();
  target.setDate(target.getDate() - delta);
  $(selector).on('click', function(){ fetch(target); });
}

function fetch(date){
  $('ul').empty();
  showStatus('#loading');

  var storage = localStorage;
  var team = storage.getItem('team') ? storage.getItem('team') :'';
  var token = storage.getItem('token') ? storage.getItem('token') :'';
  var screenname = storage.getItem('screenname') ? storage.getItem('screenname') :'';

  if(team === '' || token === '' || screenname === ''){
    showStatus('#nooptions');
    chrome.runtime.openOptionsPage();
    return;
  }

  var dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  var url = 'https://api.esa.io/v1/teams/' + team + '/posts?q=@' + screenname + '+updated:>' + dateString;
  $.ajax({
    url: url,
    type: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
    success: function(result){
      var copyString = '';
      for(var i = 0; i < result.posts.length; i++){
        var post = result.posts[i];
        var wip = post.wip ? '[WIP] ' : '';
        var checkbox = post.wip ? '[ ] ' : '[x]';
        var title = wip + post.full_name;
        var listItem = '<li><a href="' + post.url + '">' + title + '</a>';
        copyString = copyString + '- ' + checkbox + ' [' + title + '](' + post.url + ")\n";
        $('ul').append(listItem);
      }
      if(copyString === ''){
        showStatus('#nopost');
      }else{
        showStatus('#copied');
        $('#date').text(date.toLocaleDateString());
      }
      $('#links').text(copyString);
      copy();
    }});
}

function showStatus(selector){
  $('#loading').hide();
  $('#nopost').hide();
  $('#copied').hide();
  $('#nooptions').hide();
  $(selector).show();
}

function copy(){
  $('#links').show();  
  $('#links').focus();  
  $('#links').select();  
  document.execCommand("Copy");
  window.getSelection().removeAllRanges();  
  $('#links').hide();  
}
