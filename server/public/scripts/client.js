console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing tasks on page load
   getTasks();
//   $(document).on('click', '.deleteBtn', onDeleteKoala);

}); // end doc ready

function setupClickListeners() {
    $( '#addButton' ).on( 'click', function(){
      console.log( 'in addButton on click' );
      // get user input and put in an object
      // using a test object
      let taskToSend= {
        task: $('#taskIn').val(),
        completed: $('#completedIn').val()
      }
      $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToSend,
    }). then(function(response){
      $('#taskIn').val(''),
      $('#completedIn').val('')
        getTasks();
    });
  // call saveKoala with the new obejct
  saveTask( taskToSend );
}); 
// $('#viewKoalas').on('click', '.isReady', markIsComplete);
}

function getTasks(){
    console.log( 'in getTasks' );
    // ajax call to server to get tasks
    
    $("#viewTasks").empty();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log("GET /tasks response", response);
        let isButton = ``;
        let isReadyForTransfer = '';
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
        //   console.log(response[i].ready_to_transfer);
        //   // ready-to-transfer button should only appear if the value is false
        //   if(response[i].ready_to_transfer === false) {
        //     isReadyForTransfer = 'N';
        //     isButton = `<button class="isReady" data-id="${response[i].id}" >Mark ready</button>`;
        //   }else {
        //     isReadyForTransfer = 'Y';
        //     isButton = `<button class="isReady" data-id="${response[i].id}" >Mark not ready </button>`;
        //   }
            $('#viewTasks').append(`
                <tr>
                    <td>${response[i].task}</td>
                    <td>${response[i].completed}</td>
                    <td>
                        <button class="deleteBtn">
                            ❌
                        </button>
                    </td>
                </tr>
            `);
        }
    });
  
  
  
  } // end getTasks

  function saveTask( newTask ){
    console.log( 'in saveTask', newTask );
    // ajax call to server to get Tasks
   
  }