         function get_data(query_url){
                   // Sample Queries:
                   // my_url = https://docs.google.com/spreadsheets/d/1GeSoA0W5UI4LfxvsinMQg89uCGtaIeliVZ03O9XLlNU/gviz/tq?tq=SELECT%20*%20where%20I%20contains%20%22Vigo%22
                   //          https://docs.google.com/spreadsheets/d/1c41xbf4ps7am-Y99h3l4214sdAPMeaiYFT8iTbgq9x4/gviz/tq?tq=SELECT%20*%20where%20G%20contains%20%22Terre%20Haute%22
                   // my_url = https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/gviz/tq?tq=SELECT%20*%20where%20B%20contains%20%22Male%22%20and%20F%20contains%20%22Drama%20Club%22
                   //          https://docs.google.com/spreadsheets/d/1c41xbf4ps7am-Y99h3l4214sdAPMeaiYFT8iTbgq9x4/gviz/tq?tq=SELECT%20*%20where%20%28LOWER%28G%29%20contains%20%22terre%20haute%22%29
 
                   var all_list = "";
                   var nat_list = "";
                   var gen_list = "";
                   var cou_nat = "Nationwide";
                   var cou_all = "-- All --";
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
                                       // var val_j = responseJ['table']['rows'][i]['c'][9]['v'];  
                                       // var val_k = responseJ['table']['rows'][i]['c'][10]['v'];  
                                       // var val_l = responseJ['table']['rows'][i]['c'][11]['v'];  
                                       // var val_m = responseJ['table']['rows'][i]['c'][12]['v'];  
                                       // var val_n = responseJ['table']['rows'][i]['c'][13]['v']; 
                                       // var val_o = responseJ['table']['rows'][i]['c'][14]['v'];
                                       // var val_p = responseJ['table']['rows'][i]['c'][15]['v']; 
                                       // var val_q = responseJ['table']['rows'][i]['c'][16]['v']; 

                                       // Check values for meaningful data and adjust accordingly.
                                       // Attempt to determine if any useful results are returned
                                       // and if not, notify the User.
                                       if  (val_a == "no value"){val_a = ""}else{empty_return = "no";};
                                       if (val_c == "no value"){val_c = ""}else{empty_return = "no";};
                                       if (val_d == "no value"){val_d = ""}else{empty_return = "no";};
                                       if (val_e == "no value"){val_e = ""}else{empty_return = "no";};
                                       if (val_f == "no value"){val_f = ""}else{empty_return = "no";};
                                          //if (val_b == "no value"){val_b = ""}else{empty_return = "no";};
                                          //if (val_g == "no value"){val_g = ""}else{empty_return = "no";};
                                          //if (val_h == "no value"){val_h = ""}else{empty_return = "no";};
                                          //if (val_i == "no value"){val_i = ""}else{empty_return = "no";};
                                          //if (val_j == "no value"){val_j = ""}else{empty_return = "no";};
                                          //if (val_k == "no value"){val_k = ""}else{empty_return = "no";};
                                          //if (val_l == "no value"){val_l = ""}else{empty_return = "no";};
                                          //if (val_m == "no value"){val_m = ""}else{empty_return = "no";};
                                          //if (val_n == "no value"){val_n = ""}else{empty_return = "no";};
                                          //if (val_o == "no value"){val_o = "N/A"}else{empty_return = "no";};

                                       if (val_g == "no value"){
                                           val_g = "N/A"
                                       }else{
                                           val_g = '<a href="' + val_g + '" ><i>Follow Them Here</i></a>';
                                           empty_return = "no";
                                       };
                                       if (val_i == "no value"){
                                           val_i = '<img src="res/no_flyer.png" width="200px" alt="Flyer Image" />';
                                       }else{
                                           // Parse the G-Drive path to one that is usable for displaying the image.
                                           var g_mod = val_i.replace("https://drive.google.com/open?id=", "https://drive.google.com/thumbnail?id=");
                                           
                                           val_i = '<img src="' + g_mod + '" width="200px" alt="Flyer Image" />';
                                           empty_return = "no";
                                       };
                                       // Use code here to properly format the returned data for HTML.
                                       var tmp_val = '<tr><td rowspan="7" class="res_img">' + val_i + '</td><td class="res_tab" style="font-size:20px;"><b>' + val_a + "</b></td></tr>" + "<tr><td>County: " + val_f + "</td></tr>" + "<tr><td>Category: " + val_d + "</td></tr>" + "<tr><td>Focus: " + val_e + "</td></tr>" + "<tr><td>Political Affiliation: " + val_c + "</td></tr>" + "<tr><td>Social Media: " + val_g + "</td></tr>";

                                       // Set up a Special Use Case Filter to prioritize the presented order of the Data Results.
                                       // This will be used so that "County" specific results will be listed ahead of results whose 
                                       // "County" designation is set to "-- All --", and subsequently, "Nationwide".
                                          if (val_f.toLowerCase() == cou_all.toLowerCase()) {
                                                all_list = all_list + tmp_val + '<td><tr></td></tr><tr><td colspan="2"><hr width="750px" /></td></tr>';
                                          };
                                          if (val_f.toLowerCase() == cou_nat.toLowerCase()) {
                                                nat_list = nat_list + tmp_val + '<td><tr></td></tr><tr><td colspan="2"><hr width="750px" /></td></tr>';
                                          };
                                          if (val_f.toLowerCase() != cou_nat.toLowerCase() && val_f.toLowerCase() != cou_all.toLowerCase()) {
                                                gen_list = gen_list + tmp_val + '<td><tr></td></tr><tr><td colspan="2"><hr width="750px" /></td></tr>';
                                          };
                                     };
                                     // Combine the finished Data Result Lists so that the "-- All --" designated counties 
                                     // come after the county specific general list, and the natiowide results come at the end of the Results. 
                                       value = gen_list + all_list + nat_list;
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
                   var viz_q ="/gviz/tq?sheet=Activist Groups&tq=SELECT%20*%20where%20";
                   var final_query = "";
                   var filter_query = "";
                   var base_query = "(LOWER(A) contains '$$' or LOWER(B) contains '$$' or LOWER(C) contains '$$' or LOWER(E) contains '$$' or LOWER(G) contains '$$' or LOWER(H) contains '$$' or LOWER(I) contains '$$' ";

                   // Clear the "Results" element.
                   document.getElementById("results").innerHTML = ""; 
                  
                   // Get the values of the Dropdowns Options Boxes.
                      var f_county = document.getElementById("county").value;
                      if (f_county == "-- Any --" || f_county == ""){
                         // Add the F Column back into the base search string.
                         base_query = base_query + "or LOWER(F) contains '$$' ";
                      }else{
                         const c_all = "-- All --";
                         const n_wide = "Nationwide";
                         filter_query = filter_query + "((LOWER(F) contains '" + f_county.toLowerCase() + "') or " + "(LOWER(F) contains '" + c_all.toLowerCase() + "') or " + "(LOWER(F) contains '" + n_wide.toLowerCase() + "')) and ";
                      };

                      var ev_type = document.getElementById("type").value;
                         if (ev_type == "-- Any --" || ev_type == ""){
                         // Add the D Column back into the base search string.
                         base_query = base_query + "or LOWER(D) contains '$$' ";
                      }else{
                         filter_query = filter_query + "(LOWER(D) contains '" + ev_type.toLowerCase() + "') and ";
                      };

                      base_query = base_query + ")";

                      var terms = document.getElementById("s_input").value;

                   // Process the Input Search Terms and Build the Query.

                   var tmp_query = "";

                   if (terms == "" && (ev_type == "-- Any --" || ev_type == "") && (f_county == "-- Any --" || f_county == "")) {
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
               //document.getElementById("city").selectedIndex = 0;
             document.getElementById("county").selectedIndex = 0;
               //document.getElementById("virtual").selectedIndex = 0;
               //document.getElementById("repeating").selectedIndex = 0;
             document.getElementById("type").selectedIndex = 0;
               //document.getElementById("dt_input").value = "";
             document.getElementById("s_input").value = "";
               // Clear the "Results" element as well.
             document.getElementById("results").innerHTML = "";
         };