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
      $("#filter_options").animate({'left':"-400px"});
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
  get_counts = function(){
      var all_counter = $("#filter_options li");
      var counter_len = all_counter.length;
      var total_count = 0;
      for(var i=0;i<counter_len;i++){
          var input = all_counter[i].getElementsByTagName("input");
          var input_len = input.length;
          if(input_len == 1){
              var id = "#" + input[0]['id'];
              if($(id).prop("checked")){
                  var counts = all_counter[i].getElementsByClassName("counter");
                  var count_add = parseInt(counts[0]['textContent']);
                  total_count = total_count + count_add;
              }
          }
      }
      $("#counter").text('Total: ' + total_count);
  }
  get_unique_count = function(){
      var unique_schools = {};
      for(var i=0, feature; feature=features[i];i++){
          marker = gmarker[i];
          if(marker.getVisible()){
              if(!unique_schools[marker.school]){
                  unique_schools[marker.school] = 1;
              }
          }
      }
      var unique_len = Object.keys(unique_schools).length;
      $("#unique_counter").text('Total Unique: ' + unique_len);
  }
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
      get_counts();
      filterMarkers(display_this);
      get_unique_count();
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
  var count_list = {};

  function addMarker(feature) {
      var marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          school: feature.school,
          type: feature.type,
          filter: feature.filter,
          map: map
      });
      gmarker.push(marker);
      // Count each type of marker
      if(!count_list[feature.type]){
          count_list[feature.type] = 1;
      } else {
          count_list[feature.type] = count_list[feature.type] + 1;
      }
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

  function loadData(){
      var url = 'https://docs.google.com/spreadsheets/d/1XM6l6nCfh0xCZ6FuRUj-sfmR5x-WCSZDd22EztqqcBQ/pub?gid=392068151&single=true&output=csv';
      var result = '';
      var fuckingugly = document.getElementById("#fuckingugly").innerHTML;
      var big_table1 = fuckingugly.split("\n");
      $uglystring = big_table1;
      var datlen1 = $uglystring.length;
      var super_big_dict = {};
      for(var i=0;i<datlen1;i++){
          var temp = [];
          var sub_str = big_table1[i].split(",");
          if(sub_str.length == 4){
              // Do nothing
          } else {
              super_big_dict[sub_str[0]] = [sub_str[1],sub_str[2],sub_str[3],sub_str[4],sub_str[5]];
          }
      }
      var int_keys = ['Integration','No Contact','Integrated','Contact Made','In Progress'];
      var work_keys = ['Workbooks', 'Not Requested', 'Sent', 'Requested'];
      var pd_keys = ['PDs', 'Not Scheduled', 'Done', 'Scheduled'];
      var keys = Object.keys(super_big_dict);
      xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
              result = xmlhttp.responseText;
              var big_table = result.split("\n");
              $uglystring = big_table;
              var datlen = $uglystring.length;
              var super_big_table = [];
              for(var i=0;i<datlen;i++){
                  var sub_str = big_table[i].split(",");
                  for(var j=0;j<keys.length;j++){
                      if(sub_str[0] == keys[j]){
                          super_big_dict[keys[j]][0] = int_keys.indexOf(sub_str[2]).toString();
                          super_big_dict[keys[j]][1] = work_keys.indexOf(sub_str[3]).toString();
                          super_big_dict[keys[j]][2] = pd_keys.indexOf(sub_str[4]).toString();
                      }
                  }
              }
            var key_dict = Object.keys(super_big_dict);
            var key_len_dict = key_dict.length;
            for(var k=0;k<key_len_dict;k++){
                /******* Integration *******/
                // No Contact
                if(super_big_dict[key_dict[k]][0] == 1){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">No Integration Contact has been made for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]), parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'integration_no',
                        filter: 'integration'
                    }
                    features.push(temp_dict);
                }
                // Integrated
                else if(super_big_dict[key_dict[k]][0] == 2){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">School is already Integrated</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]), parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'integration_integrate',
                        filter: 'integration'
                    }
                    features.push(temp_dict);
                }
                // Contact made
                else if(super_big_dict[key_dict[k]][0] == 3){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Integration contact has been made for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]), parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'integration_contact',
                        filter: 'integration'
                    }
                    features.push(temp_dict);
                }
                // In Progress
                else if(super_big_dict[key_dict[k]][0] == 4){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">School Integration in progress</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]), parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'integration_prog',
                        filter: 'integration'
                    }
                    features.push(temp_dict);
                }
                /******* Workbooks *******/
                // Not requested
                if(super_big_dict[key_dict[k]][1] == 1){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">No Workbook orders for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00006, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'workbooks1',
                        filter: 'workbook'
                    }
                    features.push(temp_dict);
                }
                // Sent
                else if(super_big_dict[key_dict[k]][1] == 2){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Workbook orders have already been sent for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00006, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'workbooks2',
                        filter: 'workbook'
                    }
                    features.push(temp_dict);
                }
                // Requested
                else if(super_big_dict[key_dict[k]][1] == 3){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Workbook orders have been requested by this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00006, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'workbooks3',
                        filter: 'workbook'
                    }
                    features.push(temp_dict);
                }
                /******* PD *******/
                // Not Scheduled
                if(super_big_dict[key_dict[k]][2] == 1){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Professional Development has not been scheduled for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00003, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'pd1',
                        filter: 'pd'
                    }
                    features.push(temp_dict);
                }
                // Done
                else if(super_big_dict[key_dict[k]][2] == 2){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Professional Development complete for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00003, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'pd2',
                        filter: 'pd'
                    }
                    features.push(temp_dict);
                }
                // Scheduled
                else if(super_big_dict[key_dict[k]][2] == 3){
                    var contentString = '<div id="content">' +
                                            '<div id="school_name">' +
                                                '<h1 id="school_text">' + key_dict[k] + '</h1>' +
                                            '</div>' +
                                            '<div id="integration_text">' +
                                                '<p id="int_text">Professional Development is scheduled for this school</p>' +
                                            '</div>' +
                                        '</div>';
                    var temp_dict = {
                        position: new google.maps.LatLng(parseFloat(super_big_dict[key_dict[k]][3]) - .00003, parseFloat(super_big_dict[key_dict[k]][4])),
                        school: key_dict[k],
                        content: contentString,
                        type: 'pd3',
                        filter: 'pd'
                    }
                    features.push(temp_dict);
                }
            }
            start_count_once(features);
            return(features);
          }
      };
      xmlhttp.open("GET", url, true);
      xmlhttp.send(null);
  };

  var features = [];
  loadData();

    start_count_once = function(features){
        // Start filter counter once
        for (var i = 0, feature; feature = features[i]; i++) {
            addMarker(feature);
        }
          var keys = [];
          for (var key in count_list){
              if(count_list.hasOwnProperty(key)){
                  keys.push(key);
              }
          }
          var key_len = keys.length;
          for(var i = 0;i<key_len;i++){
              if(keys[i] == 'integration_no'){
                  $("#counter_int_no").text(count_list[keys[i]]);
              } else if(keys[i] == 'workbooks1'){
                  $("#counter_work_no").text(count_list[keys[i]]);
              } else if(keys[i] == 'pd1'){
                  $("#counter_pd_not").text(count_list[keys[i]]);
              } else if(keys[i] == 'integration_integrate'){
                  $("#counter_int_int").text(count_list[keys[i]]);
              } else if(keys[i] == 'workbooks2'){
                  $("#counter_work_sent").text(count_list[keys[i]]);
              } else if(keys[i] == 'integration_contact'){
                  $("#counter_int_cont").text(count_list[keys[i]]);
              } else if(keys[i] == 'pd2'){
                  $("#counter_pd_yes").text(count_list[keys[i]]);
              } else if(keys[i] == 'workbooks3'){
                  $("#counter_work_req").text(count_list[keys[i]]);
              } else if(keys[i] == 'pd3'){
                  $("#counter_pd_sched").text(count_list[keys[i]]);
              } else if(keys[i] == 'integration_prog'){
                  $("#counter_int_prog").text(count_list[keys[i]]);
              }
          }
          get_counts();
          get_unique_count();
    }
}


// https://spreadsheets.google.com/feeds/list/1XM6l6nCfh0xCZ6FuRUj-sfmR5x-WCSZDd22EztqqcBQ/od6/public/values?alt=json-in-script&callback=
// 392068151
// https://docs.google.com/spreadsheets/d/1XM6l6nCfh0xCZ6FuRUj-sfmR5x-WCSZDd22EztqqcBQ/edit#gid=392068151
