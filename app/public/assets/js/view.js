$(document).ready(function () {
    $('#notdevoured').on('click', 'li', function(e){

       $.ajax({
          url: '/updateburger',
          type: 'put',
          data: JSON.stringify({id: Number(e.target.id), devoured: 1}),
          headers: {
              "Content-Type": "application/json"
          },
          dataType: 'json',
          context: this,
          success: function(response) {
              window.location.reload(true);
          }
       });
    });
});
