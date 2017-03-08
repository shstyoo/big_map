var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: new google.maps.LatLng(44.3148, -85.6024),
    mapTypeId: 'roadmap'
  });
  $(".show").each(function(key, item){
      $(this).prop("checked", true);
  });
  $("#hide_filter").on("click", function(){
      $("#hide_filter").hide();
      $("#show_filter").show();
      $("#filter_options").animate({'left':"-300px"});
  });
  $("#show_filter").on("click", function(){
      $("#show_filter").hide();
      $("#hide_filter").show();
      $("#filter_options").animate({'left':"0px"});
  });
  $("#show_all").on("click", function(){
      $(".hide").each(function(key, item){
          $(this).prop("checked", false);
      })
      $(".show").each(function(key, item){
          $(this).prop("checked", true);
      });
  });
  $("#hide_all").on("click", function(){
      $(".hide").each(function(key, item){
          $(this).prop("checked", true);
      });
      $(".show").each(function(key, item){
          $(this).prop("checked", false);
      });
  });
  $("#hide_integration").on("click", function(){
      $("#integration_filter input").each(function(key, item){
          $(this).prop("checked", false);
      });
  });
  $("#show_integration").on("click", function(){
      $("#integration_filter input").each(function(key, item){
          $(this).prop("checked", true);
      });
  });
  $("#hide_workbooks").on("click", function(){
      $("#workbook_filter input").each(function(key, item){
          $(this).prop("checked", false);
      });
  });
  $("#show_workbooks").on("click", function(){
      $("#workbook_filter input").each(function(key, item){
          $(this).prop("checked", true);
      });
  });
  $("#hide_pd").on("click", function(){
      $("#pd_filter input").each(function(key, item){
          $(this).prop("checked", false);
      });
  });
  $("#show_pd").on("click", function(){
      $("#pd_filter input").each(function(key, item){
          $(this).prop("checked", true);
      });
  });
  $("#filter_options input").on("click", function(){
      get_filters();
  });
  $("#filter_options button").on("click", function(){
      get_filters();
  });
  get_filters = function(){
      var all_input = $("#filter_options :input");
      var input_len = all_input.length;
      var display_this = [];
      for(var i=0;i<input_len;i++){
          var raw_id = all_input[i].id;
          var id = "#" + all_input[i].id;
          if($(id).prop("checked")){
              display_this.push(raw_id);
          }
      }
      filterMarkers(display_this);
  }
  filterMarkers = function(category){
      var _category = category;
      var cat_len = _category.length;
      for(var i=0, feature; feature=features[i]; i++){
          marker = gmarker[i];
          marker.setVisible(false);
          for(var j=0;j<cat_len;j++){
              if(_category[j] == marker.type){
                  marker.setVisible(true);
              }
          }
      }
  }
  var iconBase = 'markers/'
  var icons = {
      integration_no: {
          icon: iconBase + 'red_MarkerI.png'
      },
      integration_integrate: {
          icon: iconBase + 'paleblue_MarkerI.png'
      },
      integration_contact: {
          icon: iconBase + 'yellow_MarkerI.png'
      },
      integration_prog: {
          icon: iconBase + 'green_MarkerI.png'
      },
      workbooks1: {
          icon: iconBase + 'red_MarkerW.png'
      },
      workbooks2: {
          icon: iconBase + 'paleblue_MarkerW.png'
      },
      workbooks3: {
          icon: iconBase + 'green_MarkerW.png'
      },
      pd1: {
          icon: iconBase + 'red_MarkerP.png'
      },
      pd2: {
          icon: iconBase + 'paleblue_MarkerP.png'
      },
      pd3: {
          icon: iconBase + 'green_MarkerP.png'
      }
  };

  var infowindow = new google.maps.InfoWindow({
      // Nothing? I guess
  });

  var gmarker = [];

  function addMarker(feature) {
      var marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          type: feature.type,
          filter: feature.filter,
          map: map
      });
      gmarker.push(marker);
      marker.addListener('click', function(){
          infowindow.setContent(feature.content);
          infowindow.open(map, marker);
          map.setZoom(20);
          map.setCenter(marker.getPosition());
      });
  }



  $("#zoom-out").click('on', function(){
      map.setZoom(7)//,
      // map.setCenter(31.0902, -95.7129);
      map.setCenter(new google.maps.LatLng(44.3148, -85.6024));
  });

  // Ignore the mess just use super_big_table
  var fuckingugly = document.getElementById("#fuckingugly").innerHTML;
  var big_table = fuckingugly.split("\n");
  $uglystring = big_table;
  var datlen = $uglystring.length;
  var super_big_table = []
  for(var i=0;i<datlen;i++){
      var temp = [];
      var sub_str = big_table[i].split(",");
      if(sub_str.length == 4){
          // Do nothing
      } else {
          temp.push(sub_str[0]);
          temp.push(sub_str[1]);
          temp.push(sub_str[2]);
          temp.push(sub_str[3]);
          temp.push(sub_str[4]);
          temp.push(sub_str[5]);
          super_big_table.push(temp);
      }
  }

  var datalen = super_big_table.length;

  var features = [];
  for(var i=0;i<datalen;i++){
      /******* Integration *******/
      // No Contact
      if(super_big_table[i][1] == 1){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">No Integration Contact has been made for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4], super_big_table[i][5]),
              content: contentString,
              type: 'integration_no',
              filter: 'integration'
          }
          features.push(temp_dict);
      }
      // Integrated
      else if(super_big_table[i][1] == 2){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">School is already Integrated</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4], super_big_table[i][5]),
              content: contentString,
              type: 'integration_integrate',
              filter: 'integration'
          }
          features.push(temp_dict);
      }
      // Contact made
      else if(super_big_table[i][1] == 3){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Integration contact has been made for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4], super_big_table[i][5]),
              content: contentString,
              type: 'integration_contact',
              filter: 'integration'
          }
          features.push(temp_dict);
      }
      // In Progress
      else if(super_big_table[i][1] == 4){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">School Integration in progress</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4], super_big_table[i][5]),
              content: contentString,
              type: 'integration_prog',
              filter: 'integration'
          }
          features.push(temp_dict);
      }
      /******* Workbooks *******/
      // Not requested
      if(super_big_table[i][2] == 1){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">No Workbook orders for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00006, super_big_table[i][5]),
              content: contentString,
              type: 'workbooks1',
              filter: 'workbook'
          }
          features.push(temp_dict);
      }
      // Sent
      else if(super_big_table[i][2] == 2){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Workbook orders have already been sent for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00006, super_big_table[i][5]),
              content: contentString,
              type: 'workbooks2',
              filter: 'workbook'
          }
          features.push(temp_dict);
      }
      // Requested
      else if(super_big_table[i][2] == 3){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Workbook orders have been requested by this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00006, super_big_table[i][5]),
              content: contentString,
              type: 'workbooks3',
              filter: 'workbook'
          }
          features.push(temp_dict);
      }
      /******* PD *******/
      // Not Scheduled
      if(super_big_table[i][3] == 1){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Professional Development has not been scheduled for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00003, super_big_table[i][5]),
              content: contentString,
              type: 'pd1',
              filter: 'pd'
          }
          features.push(temp_dict);
      }
      // Done
      else if(super_big_table[i][3] == 2){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Professional Development complete for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00003, super_big_table[i][5]),
              content: contentString,
              type: 'pd2',
              filter: 'pd'
          }
          features.push(temp_dict);
      }
      // Scheduled
      else if(super_big_table[i][3] == 3){
          var contentString = '<div id="content">' +
                                  '<div id="school_name">' +
                                      '<h1 id="school_text">' + super_big_table[i][0] + '</h1>' +
                                  '</div>' +
                                  '<div id="integration_text">' +
                                      '<p id="int_text">Professional Development is scheduled for this school</p>' +
                                  '</div>' +
                              '</div>';
          var temp_dict = {
              position: new google.maps.LatLng(super_big_table[i][4] - .00003, super_big_table[i][5]),
              content: contentString,
              type: 'pd3',
              filter: 'pd'
          }
          features.push(temp_dict);
      }
  }

  for (var i = 0, feature; feature = features[i]; i++) {
      addMarker(feature);
  }
}
