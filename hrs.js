         function get_data(query_url){
                   // Sample Queries:
                   // my_url = https://docs.google.com/spreadsheets/d/1GeSoA0W5UI4LfxvsinMQg89uCGtaIeliVZ03O9XLlNU/gviz/tq?tq=SELECT%20*%20where%20I%20contains%20%22Vigo%22
                   //          https://docs.google.com/spreadsheets/d/1c41xbf4ps7am-Y99h3l4214sdAPMeaiYFT8iTbgq9x4/gviz/tq?tq=SELECT%20*%20where%20G%20contains%20%22Terre%20Haute%22
                   // my_url = https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/gviz/tq?tq=SELECT%20*%20where%20B%20contains%20%22Male%22%20and%20F%20contains%20%22Drama%20Club%22
                   //          https://docs.google.com/spreadsheets/d/1c41xbf4ps7am-Y99h3l4214sdAPMeaiYFT8iTbgq9x4/gviz/tq?tq=SELECT%20*%20where%20%28LOWER%28G%29%20contains%20%22terre%20haute%22%29
 
                   var x = fetch(query_url)
                             .then(data => data.text())
                             .then(function(response) {
                                   var responseText = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));

                                   // This code has primitive Error Checking of for an Invalid Query.
                                   var is_err = responseText.search('"status":"error"');

                                   // Make string adjustments to the response test to convert the value NULL into
                                   // null value Strings.
                                   var alt_text = responseText.replace(/,null,/g, ',{"v":"no value"},')
                                   alt_text = alt_text.replace(/,null,/g, ',{"v":"no value"},')
                                   alt_text = alt_text.replace(/:null}/g, ':"no value"}')
                                   alt_text = alt_text.replace(/null,/g, '{"v":"no value"},')
                                   //console.log(alt_text);

                                   // This code has primitive Error Checking of for an Invalid Query.
                                   if (is_err == -1) {
                                     var responseJ = JSON.parse(alt_text);
                                     var value = "";
                                     var empty_return = "yes";
                                     for (i = 0; i < responseJ.table.rows.length; i++) {
                                       var val_a = responseJ['table']['rows'][i]['c'][0]['v'];
                                       var val_b = responseJ['table']['rows'][i]['c'][1]['v'];
                                       var val_c = responseJ['table']['rows'][i]['c'][2]['v'];
                                       var val_d = responseJ['table']['rows'][i]['c'][3]['v'];
                                       var val_e = responseJ['table']['rows'][i]['c'][4]['v'];
                                       var val_f = responseJ['table']['rows'][i]['c'][5]['v'];
                                       var val_g = responseJ['table']['rows'][i]['c'][6]['v'];  
                                       var val_h = responseJ['table']['rows'][i]['c'][7]['v'];  
                                       var val_i = responseJ['table']['rows'][i]['c'][8]['v'];  
                                       var val_j = responseJ['table']['rows'][i]['c'][9]['v'];  
                                       var val_k = responseJ['table']['rows'][i]['c'][10]['v'];  
                                       var val_l = responseJ['table']['rows'][i]['c'][11]['v'];  
                                       var val_m = responseJ['table']['rows'][i]['c'][12]['v'];  
                                       var val_n = responseJ['table']['rows'][i]['c'][13]['v']; 
                                       var val_o = responseJ['table']['rows'][i]['c'][14]['v'];
                                       var val_p = responseJ['table']['rows'][i]['c'][15]['v']; 
                                       var val_q = responseJ['table']['rows'][i]['c'][16]['v']; 

                                       // Check values for meaningful data and adjust accordingly.
                                       // Attempt to determine if any useful results are returned
                                       // and if not, notify the User.
                                       if (val_a == "no value"){
                                           val_a = "";
                                       }else{
                                           // Parse and reorder the date sting that is returned from
                                           // the spread sheet. It also appears that the Month is numbered
                                           // using an array notation, so adjust it accordingly.
                                           val_a = val_a.replace("Date(", "");
                                           val_a = val_a.replace(")", "");
                                           var date_val = val_a.split(",");
                                           var adj_month = Number(date_val[1]) + 1;
                                           var this_month = "";
                                               if (adj_month == 12){this_month = "December"};
                                               if (adj_month == 11){this_month = "November"};
                                               if (adj_month == 10){this_month = "October"};
                                               if (adj_month == 9){this_month = "September"};
                                               if (adj_month == 8){this_month = "August"};
                                               if (adj_month == 7){this_month = "July"};
                                               if (adj_month == 6){this_month = "June"};
                                               if (adj_month == 5){this_month = "May"};
                                               if (adj_month == 4){this_month = "April"};
                                               if (adj_month == 3){this_month = "March"};
                                               if (adj_month == 2){this_month = "February"};
                                               if (adj_month == 1){this_month = "January"};
                                           val_a = this_month + " " + date_val[2] + ", " + date_val[0] + " | ";
                                           empty_return = "no";
                                       };
                                       if (val_b == "no value"){
                                           val_b = ""
                                       }else{
                                           val_b = " | " + val_b;
                                           empty_return = "no";
                                       };
                                       if (val_c == "no value"){val_c = ""}else{empty_return = "no";};
                                       if (val_d == "no value"){val_d = ""}else{empty_return = "no";};
                                       if (val_e == "no value"){val_e = ""}else{empty_return = "no";};
                                       if (val_f == "no value"){val_f = ""}else{empty_return = "no";};
                                       if (val_g == "no value"){val_g = ""}else{empty_return = "no";};
                                       if (val_h == "no value"){val_h = ""}else{empty_return = "no";};
                                       if (val_i == "no value"){val_i = ""}else{empty_return = "no";};
                                       if (val_j == "no value"){val_j = ""}else{empty_return = "no";};
                                       if (val_k == "no value"){val_k = ""}else{empty_return = "no";};
                                       if (val_l == "no value"){val_l = ""}else{empty_return = "no";};
                                       if (val_m == "no value"){val_m = ""}else{empty_return = "no";};
                                       if (val_n == "no value"){val_n = ""}else{empty_return = "no";};
                                       if (val_o == "no value"){val_o = "N/A"}else{empty_return = "no";};
                                       if (val_p == "no value"){
                                           val_p = "N/A"
                                       }else{
                                           val_p = '<a href="' + val_p + '" ><i>More Information Here</i></a>';
                                           empty_return = "no";
                                       };
                                       if (val_q == "no value"){
                                           val_q = '<img src="res/no_flyer.png" width="200px" alt="Flyer Image" style="" />';
                                       }else{
                                           // Parse the G-Drive path to one that is usable for displaying the image.
                                           var g_mod = val_q.replace("https://drive.google.com/open?id=", "https://lh6.googleusercontent.com/d/");

                                           val_q = '<a href="' + g_mod + '" target="_blank" ><img src="' + g_mod + '" width="200px" alt="Flyer Image" style="" />';
                                           empty_return = "no";
                                       };

                                       // Add code here to properly format the returned data for HTML.
                                       var tmp_val = '<tr><td rowspan="7" class="res_img">' + val_q + '</td><td class="res_tab" style="font-size:20px;">' + val_e + "</td></tr>" + "<tr><td>Date & Time: " + val_a + "  " + val_c + "  " + val_b + "</td></tr>" + "<tr><td>Location: " + val_f + ", " + val_g + "</td></tr>" + "<tr><td>County: " + val_i + "</td></tr>" + "<tr><td>Group(s): " + val_j + "</td></tr>" + "<tr><td>Category: " + val_k + "</td></tr>" + "<tr><td>Link: " + val_p + "</td></tr>";
                                       value = value + tmp_val + '<tr><td colspan="2"><hr width="750px" /></td></tr>';
                                     };
                                       if (value != "" && empty_return == "no") {
                                           f_table = '<table id="res_tab">' + value + '</table>';
                                           document.getElementById("results").innerHTML = f_table;
                                       };
                                       if (empty_return == "yes") {
                                           value = '<tr><td style="text-align:center"><i>' + 'There are no matching results for the given query.' + '</i></td></tr>'; 
                                           f_table = '<table id="res_tab">' + value + '</table>';
                                           document.getElementById("results").innerHTML = f_table;
                                       };
                                }else{
                                     //console.log("Invalid Query");
                                };
                            //console.log(empty_return + " " + value);//responseText
                       });                   
         
         };

         function getText(){
                   // Create elements for the Query'
                   var g_sheet = "https://docs.google.com/spreadsheets/d/";
                   var sheet_id = "1c41xbf4ps7am-Y99h3l4214sdAPMeaiYFT8iTbgq9x4";
                   var viz_q ="/gviz/tq?tq=SELECT%20*%20where%20";
                   var final_query = "";
                   var filter_query = "";
                   var base_query = "(LOWER(C) contains '$$' or LOWER(E) contains '$$' or LOWER(F) contains '$$' or LOWER(H) contains '$$' or LOWER(J) contains '$$' or LOWER(L) contains '$$' or LOWER(N) contains '$$' or LOWER(O) contains '$$' or LOWER(P) contains '$$' or LOWER(P) contains '$$' ";

                   // Clear the "Results" element.
                   document.getElementById("results").innerHTML = ""; 
                  
                   // Get the values of the Dropdowns Options Boxes.
                      var f_city = document.getElementById("city").value;
                      if (f_city == "-- Any --" || f_city == ""){
                         // Add the G Column back into the base search string.
                         base_query = base_query + "or LOWER(G) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(G) contains '" + f_city.toLowerCase() + "') and ";
                      };

                      var f_county = document.getElementById("county").value;
                      if (f_county == "-- Any --" || f_county == ""){
                         // Add the I Column back into the base search string.
                         base_query = base_query + "or LOWER(I) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(I) contains '" + f_county.toLowerCase() + "') and ";
                      };

                      var ev_type = document.getElementById("type").value;
                         if (ev_type == "-- Any --" || ev_type == ""){
                         // Add the K Column back into the base search string.
                         base_query = base_query + "or LOWER(K) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(K) contains '" + ev_type.toLowerCase() + "') and ";
                      };

                      var ev_virt = document.getElementById("virtual").value;
                         if (ev_virt == "-- Any --" || ev_virt == ""){
                         // Add the M Column back into the base search string.
                         base_query = base_query + "or LOWER(M) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(M) contains '" + ev_virt.toLowerCase() + "') and ";
                      };

                      var ev_repeat = document.getElementById("repeating").value;
                      if (ev_repeat == "-- Any --" || ev_repeat == ""){
                         // Add the N Column back into the base search string.
                         base_query = base_query + "or LOWER(N) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(N) contains '" + ev_repeat.toLowerCase() + "') and ";
                      };

                      var ev_date = document.getElementById("dt_input").value;
                      if (ev_date == "-- Any --" || ev_date == ""){
                         // Do Nothing.
                      }else{
                         // Modify the date value to properly match the pattern returned by the spreadsheet.
                         // Shows this pattern: 11/12/2025 but Returns this pattern: 2025-11-12
                         filter_query = filter_query + "(A contains date '" + ev_date + "') and ";
                      };

                      base_query = base_query + ")";

                      var terms = document.getElementById("s_input").value;

                   // Process the Input Search Terms and Build the Query.

                   var tmp_query = "";

                   if (terms == "" && (ev_repeat == "-- Any --" || ev_repeat == "") && (ev_virt == "-- Any --"  || ev_virt == "") && (ev_type == "-- Any --" || ev_type == "") && (f_county == "-- Any --" || f_county == "") && (f_city == "-- Any --" || f_city == "") && (ev_date == "")) {
                        alert("Please select a Filter Option or input Terms for the Search.");
                   }else{
                      if (terms != ""){
                           var my_terms = terms.toLowerCase();
                           var arr_terms = my_terms.split(" ");

                           for (t = 0; t < arr_terms.length; t++) {

                                // Consider adding a Stop List check here.

                                ud_query = base_query.replaceAll("$$", arr_terms[t]);
                                if (t == arr_terms.length - 1) {
                                   tmp_query = tmp_query + ud_query;
                                }else{
                                   tmp_query = tmp_query + ud_query + " and ";
                                };
                           };
                      };

                   };
                   
                      if (filter_query != "" && tmp_query != ""){
                          final_query = filter_query + tmp_query;
                          var f_query = encodeURIComponent(final_query);
                          var gs_url = g_sheet + sheet_id + viz_q + f_query;
                          get_data(gs_url);
                          //alert(gs_url);
                      };
                      if (filter_query != "" && tmp_query == ""){
                          final_query = filter_query + tmp_query + ")";
                          final_query = final_query.replaceAll(" and )", "");
                          var f_query = encodeURIComponent(final_query);
                          var gs_url = g_sheet + sheet_id + viz_q + f_query;
                          get_data(gs_url); 
                          //alert(gs_url);
                      };
                      if (filter_query == "" && tmp_query != ""){
                          final_query = tmp_query;
                          var f_query = encodeURIComponent(final_query);
                          var gs_url = g_sheet + sheet_id + viz_q + f_query;
                          get_data(gs_url); 
                          //alert(gs_url);
                      };
                      if (filter_query == "" && tmp_query == ""){
                          // Do Nothing!!
                      };
         };
         function clear_form(){
             document.getElementById("city").selectedIndex = 0;
             document.getElementById("county").selectedIndex = 0;
             document.getElementById("virtual").selectedIndex = 0;
             document.getElementById("repeating").selectedIndex = 0;
             document.getElementById("type").selectedIndex = 0;
             document.getElementById("dt_input").value = "";
             document.getElementById("s_input").value = "";
             // Clear the "Results" element as well.
             document.getElementById("results").innerHTML = "";
         }