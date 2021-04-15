// kasutaja ja admin redirect kasutajanime sisestamisel
function checkAnswer() {
  var response = document.getElementById('username').value;
  if (response == "admin")
      location = 'AdminIndex.html';
  else if (response == "kohtunik")
      location = 'kohtunik-voistlused.html';
  else
      location = 'index.html';
  return false;
}

// võistlejate registreerimisel tabelist tabelisse kopeerimine
$(function() {
	window.focus()
  $('#regReitinguNimekiri').focus();
  highlight(0);
  
  $('#goto_first').click(function() {
    highlight(0);
  });

  $('#goto_prev').click(function() {
    highlight($('#myTable tbody tr.highlight').index() - 1);
  });

  $('#goto_next').click(function() {
    highlight($('#myTable tbody tr.highlight').index() + 1);
  });

  $('#goto_last').click(function() {
    highlight($('#myTable tbody tr:last').index());
  });



  $("#regReitinguNimekiri tr").on('click', function(e) {

    var newTr = $(this).closest("tr").clone().removeClass("highlight");
    newTr.appendTo($("#regNimekiri"));
  });

  function highlight(tableIndex) {
    if ((tableIndex + 1) > $('#regReitinguNimekiri tbody tr').length) //restart process
      tableIndex = 0;

    if ($('#regReitinguNimekiri tbody tr:eq(' + tableIndex + ')').length > 0) {
      $('#regReitinguNimekiri tbody tr').removeClass('highlight');

      $('#regReitinguNimekiri tbody tr:eq(' + tableIndex + ')').addClass('highlight');
    }
  }

})


$(document).keydown(function(e) {
  switch (e.which) {
    case 38:
      $('#goto_prev').trigger('click');
      break;
    case 40:
      $('#goto_next').trigger('click');
      break;
    case 13:
      $(".highlight").click();

  }

});
