$(document).ready(function() {
  
    setUpMonthCalendar();
  
    function getClientsAndConsultants() {
      return $.get("php/getConsultantsAndClients_month.php");
    }
  
    function setUpMonthCalendar() {
      $("#monthtablebody").empty();
      $("#clienttablebody").empty();
      $(".custom-menu").empty();
      MonthConsultants.empty();
      MonthClients.empty();
      
      getClientsAndConsultants().done(function(data) {
        var databaseResults = [],
          clients = [],
          consultants = [],
          databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server
  
        consultants = databaseResults.consultants; //Store array of consultants
  
        clients = databaseResults.clients; //Store array of clients
  
        for (x in consultants) {
          MonthConsultants.add(consultants[x]);
        }
  
        $("#monthtablebody").append(MonthConsultants.getRows());
  
        for (x in clients) {
          MonthClients.add(clients[x]);
        }
  
        $("#clienttablebody").append(MonthClients.getRows());
        $(".custom-menu").append(MonthClients.getListItems());
        $(".custom-menu").append("<li data-action='0' data-flag='1'>Delete</li>");
      });
    }
  
    // JAVASCRIPT (jQuery)
  
    // Trigger action when the contexmenu is about to be shown
  
    $("#monthtable").on("contextmenu", ".allocation", function(event) {
      $("#clicked").removeAttr("id");
      $(this).attr("id", "clicked"); //targets this element for context action
      // Avoid the real one
      event.preventDefault();
      // Show contextmenu
      $(".custom-menu")
        .finish()
        .toggle(100)
        // In the right position (the mouse)
        .css({
          top: event.pageY + "px",
          left: event.pageX + "px"
        });
    });
  
    // If the document is clicked somewhere
    $(document).bind("mousedown", function(e) {
      // If the clicked element is not the menu
      if (!$(e.target).parents(".custom-menu").length > 0) {
        $("#clicked").removeAttr("id");
        // Hide it
        $(".custom-menu").hide(100);
      }
    });
  
    $(".custom-menu").on("click", "li", function() {
      var col = $("#clicked").index(); //column of the table
      var $tr = $("#clicked").closest("tr"); //consultant row
      var consultantId = $tr.data("id"); //consultant Id
      var clientId = $(this).data("action"); //client Id
      var allocated_to = $(this).attr("data-name");
      var isAdding = 1;
      if ($(this).data("flag") == 1) {
        //if it is deleting
        isAdding = 0;
      }
      //console.log("col "+col+" consultantId "+$tr.data('id')+" client "+clientId);
  
      $.post(
        "php/updateAllocation_month.php",
        {
          col: col,
          allocated_to: allocated_to,
          consultantId: consultantId,
          isAdding: isAdding
        },
        function(data) {
          if (data == "success") {
            setUpMonthCalendar(); //update the table
            console.log("success");
          } else {
            console.log(data);
          }
        }
      );
      //clear up
      $("#clicked").removeAttr("id");
      // Hide it
      $(".custom-menu").hide(100);
    });
  });
  