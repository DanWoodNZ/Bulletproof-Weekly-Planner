var WeekConsultantModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$consultantstablebody = $("#consultantstablebody");
  }
  // bind events
  function bindEvents() {}

  function renderConsultant(consultant, clients) {
    var $rowElement = {},
      $allocationElement = {};

    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["name"])
      .attr("data-role", consultant["role"])
      .attr("data-position", consultant["position"]);

    //Append name and role column
    $rowElement.append(
      $("<td></td>")
        .addClass("consultant-header")
        .append(
          $("<div></div>")
            .addClass("consultant-info-format")
            .append(
              $("<div></div>")
                .addClass("consultant-name-input")
                .html(consultant["name"])
            )
            .append(
              $("<div></div>")
                .addClass("rolediv")
                .html(consultant["role"])
            )
        )
        .append(
          $("<div></div>")
            .addClass("draggable-icon")
            .append(
              $("<a></a>")
                .attr("href", "#")
                .append($("<i></i>").addClass("fas fa-ellipsis-v"))
            )
        )
    );

    //append allocation columns
    var i = 0,
      $columnElement = {},
      $allocationDiv = {};

    for (i = 0; i < 10; i++) {
      $columnElement = $("<td></td>")
        .addClass("allocation-col")
        .attr("data-slot", i);

      if (i % 2 == 1) {
        $columnElement.addClass("row-space");
      }

      var x = 0,
        allocation = {};
      for (x in consultant["allocations"]) {
        allocation = consultant["allocations"][x];
        if (allocation["allocationslot"] == i) {
          $columnElement.html(allocation["allocatedto"]);
          switch (allocation["officestatus"]) {
            case "1":
              $columnElement.attr("data-office", 1);
              break;
            case "2":
              $columnElement.attr("data-office", 2);
              break;
            default:
              $columnElement.attr("data-office", 0);
              break;
          }
        }
      }

      $columnElement.append($allocationDiv);

      $rowElement.append($columnElement);
    }

    $rowElement.append(
      $("<td></td>").append(
        $("<input></input>")
          .attr({
            type: "image",
            src: "/Glance/img/clear.png"
          })
          .addClass("clear-consultant-btn remove-add-btn")
      )
    );

    //Append row to consutlant table
    DOM.$consultantstablebody.append($rowElement);
  }
  // render DOM
  function render(consultants, clients) {
    var x = 0;
    for (x in consultants) {
      renderConsultant(consultants[x], clients);
    }
  }

  /* =================== public methods ================== */
  // main init method
  function init(consultants, clients) {
    cacheDom();
    bindEvents();
    render(consultants, clients);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
