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
      $('#endpoint').val('');
    },
    error: function(err) {
      if(err.status === 409) {
        $('#create-response').text('Endpoint already exists at /api/'+ userEndpoint);
        $('#endpoint').val('');
      }
    }
  });
});

$('#delete').on('submit', function(e){
  e.preventDefault();
  var userEndpoint = $('#delete-endpoint').val();
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json',
    url: '/api/' + userEndpoint,
    success: function(data) {
      $('#delete-response').text('Endpoint deleted at /api/' + userEndpoint);
      $('#delete-endpoint').val('');
    },
    error: function(err) {
      console.err(err);
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

$('#list').on('submit', function(e){
  e.preventDefault();
  $.ajax({
    method: 'GET',
    contentType: 'application/json',
    url: '/api/list',
    success: function(data) {
      $('#list-response').text('');
      data.forEach(function(endpoint) {
        $('#list-response').append(endpoint + '<br>');
      });
    }
  });
});
