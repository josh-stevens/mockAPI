$('#create').on('submit', function(e){
  e.preventDefault();
  var userEndpoint = $('#endpoint').val();
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"endpoint": userEndpoint}),
    url: '/api/create',
    success: function(data) {
      $('#create-response').text('Endpoint created at /api/' + userEndpoint);
    }
  });
});

$('#test').on('submit', function(e){
  e.preventDefault();
  var userEndpoint = $('#test-endpoint').val();
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: '/api/' + userEndpoint,
    success: function(data) {
      $('#test-response').text('Response received: ' + JSON.stringify(data));
    }
  })
});
