$('#create').on('submit', function(e){
  e.preventDefault();
  var userEndpoint    = $('#endpoint').val(),
      exampleResponse = JSON.parse($('#example-response').val().replace(/\s+/g, ''));
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "endpoint": userEndpoint,
      "exampleResponse": exampleResponse
    }),
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
      if(err.status === 404) {
        $('#delete-response').text('No endpoint found at /api/' + userEndpoint);
      }
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
      $('#test-response').html('Response received: <pre><code>' + JSON.stringify(data, null, 2) + '</pre></code>');
    },
    error: function(err) {
      $('#test-response').text('Error received: ' + err.status + ' ' + err.statusText);
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
