$(function(){
  var storage = localStorage;
  var team = storage.getItem('team') ? storage.getItem('team') :'';
  var token = storage.getItem('token') ? storage.getItem('token') :'';
  var screenname = storage.getItem('screenname') ? storage.getItem('screenname') :'';
  $('#team').val(team);
  $('#token').val(token);
  $('#screenname').val(screenname);

  $('#save').on('click', function(){
    storage.setItem('team', $('#team').val());
    storage.setItem('token', $('#token').val());
    storage.setItem('screenname', $('#screenname').val());
    $('.alert').slideDown(100);
    setTimeout(function(){
      $('.alert').slideUp(100);
    }, 3000);
  });
});
