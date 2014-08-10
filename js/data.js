$(document).ready(function () {
     
    $( "#searchform" ).submit(function(event){ 
        var localstring ="BFDF327253,E327254,CHM327255,ALT327257";
        var myStringArray = localstring.split(',');
       
        
        var permitArray = new Array(myStringArray.length);
        
        var urlAppBase = 'https://permitapidev.cityofboston.gov:4443/api/building/applicationinfo/';
        
        $.when( $.ajax( { url: urlAppBase+myStringArray[0], type: 'GET', dataType: 'json'} ), 
                $.ajax( { url: urlAppBase+myStringArray[1], type: 'GET', dataType: 'json'} ),
                $.ajax( { url: urlAppBase+myStringArray[2], type: 'GET', dataType: 'json'} ),
                $.ajax( { url: urlAppBase+myStringArray[3], type: 'GET', dataType: 'json'} )
                 ).done(function( a1, a2, a3, a4 ) {             
                    //var keyStrings = ""+a1[0]["ApplicationKey"]+"|"+a2[0]["ApplicationKey"]+"|"+a3[0]["ApplicationKey"]+"|"+a4[0]["ApplicationKey"];
                    
                    
                    var resultArray = [a1, a2, a3, a4];
                    
                    for (var i = 0; i < 4; i++) {
                        
                  
                    
                        var appTypeString = resultArray[i][0]["ApplicationType"]["TypeName"];
                        
                        var typePref = appTypeString.substring(0,3);
                        

                        
                        var originalMilestone = resultArray[i][0]["ProcessState"]["Code"];
                        var newMilestone = "";
                        
                        if (typePref == "BFD") {
                           newMilestone = translations["translations"]["fire"][originalMilestone]["Status"]; 
                        }
                        else {
                           newMilestone = translations["translations"]["building"][originalMilestone]["Status"];
                        }
                        
                        
                        
                        

               
                        
                        var headlineString = "<h4 class='xpandable permit-process'><span class='glyphicon glyphicon-warning-sign'></span>"+appTypeString+": "+newMilestone+"</h4>";


                        var fullTypeString = resultArray[i][0]["ApplicationType"]["Description"];

                        var secondLine = "<p><strong>Full Name: </strong>"+fullTypeString+"<p>";
                        var thirdLine = "<p><strong>Permit Phase: </strong>"+newMilestone+"<p>";

                        $( "#content" ).append(headlineString);
                        $( "#content" ).append(secondLine);
                        $( "#content" ).append(thirdLine);
                    
                    
                     }
                     
                     
                   var boilerplate = "<h4 class='xpandable permit-complete'><span class='glyphicon glyphicon-ok'></span>Alteration: Complete</h4><p><strong>Permit Phase: </strong>Review<p><p><strong>Reviewer: </strong>Marco Franco<p><p>Here are the reviews for this permit. Optional are in italics.</p><h5 class='review permit-complete'><span class='glyphicon glyphicon-ok'></span>Review 1</h5><p>Review complete.</p><h5 class='review permit-complete'><span class='glyphicon glyphicon-ok'></span>Review 2</h5><p>Review complete</p><h4 class='xpandable permit-trouble'><span class='glyphicon glyphicon-warning-sign'></span>Electric: Action Needed</h4><p><strong>Permit Phase: </strong>Inspection<p><p><strong>Reviewer: </strong>Mary Odom<p><p>Here are the reviews for this permit. Optional are in italics.</p> <h5 class='review permit-complete'><span class='glyphicon glyphicon-ok'></span>Review 1</h5><p>Review complete</p><h5 class='review permit-trouble'><span class='glyphicon glyphicon-warning-sign'></span>Review 2</h5><p>Review failed. Please call 617-418-1000 for more information.</p>";
                   $( "#content" ).append(boilerplate);
                     
                     
                     
                     
                     
                     
                     prepAccordions();
                  
                     
                    
                    
                 });
 
		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
        
        
    });
    

});



function onSingleSuccess(data) {
    alert("In successs");
    $('#content').html($('#content').html() + "<p>" + data['ApplicationKey']  + "</p>");
    for (var key in data) {

        if (data.hasOwnProperty(key)) {
            $('#content').html($('#content').html() + key + ": " + data[key] + '<br/>');
        } 
    }
}