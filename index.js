window.email_data;
$(document).ready(function (){
  $.ajax({
      type: "GET",
      url: "http://5c5a21f9af3ff700140de477.mockapi.io/api/email/",
	  dataType: "JSON",
		 success: function(data) {
            //console.log(data);
			window.email_data = data;
			console.log(window.email_data);
            var table_header = `<thead class="thead-dark">
              <tr>
				<th scope="col">Select Multiple</th>
                <th scope="col">Email Id</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>`;
            var table_body = ``;
			for (var i=0; i < data.length; i++) { 
              var from = data[i].from;
              var subject = data[i].subject;
			  var id = data[i].id;
			  var x=id;
              table_body += `<tr data-toggle="modal" data-target="#exampleModal" data-index=${i}>
							<td><input type="checkbox" name="email${i}" value="${id}"></td>
                            <td>${from}</td>
                            <td>${subject}</td>
                            </tr>`;
									}
									
            $("table").append(table_header + '<tbody>' + table_body + '</tbody>');
			$("#list").append('<body>' + `<p><input type="button" value="Delete"></p>` + '</body>');
			$("p").css("float", "right");
		 },
		 
		 error: function() { alert("error loading file");  }
		 

  });
  
  $('#exampleModal').on('show.bs.modal', function (event) {
	  console.log(window.email_data)
  var li = $(event.relatedTarget) // li that triggered the modal
  var idx = li.data('index') // Extract info from data-* attributes
  console.log(idx)
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('#email-to').text(window.email_data[idx].to)
  modal.find('#email-subject').text(window.email_data[idx].subject)
  modal.find('#email-body').text(window.email_data[idx].text)
})
});
