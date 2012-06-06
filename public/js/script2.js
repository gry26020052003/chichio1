$(document).ready(function(){
	$('#mainMenuTabNav > div').filter(":not(.current)").hide();	
	$('#deployment > div').hide();

	//clear text
	$(".clear").each(function(){
		$(this)	
		.data("default",$(this).val())
		.addClass("inactive")
		.focus(function(){
			$(this).removeClass("inactive");
			if($(this).val() == $(this).data("default") || '')
				$(this).val('');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).addClass("inactive").val($(this).data("default"));
			}	
		})
	});

	//disable text selection
	$("legend,label").disableSelection();


	//mainMenu Tab
	$('#mainMenuContainer input').click(function(e){
		
		$('#mainMenuContainer input.current').removeClass("current");
		$('#mainMenuTabNav > div').hide();		
		$(this).addClass('current');
		$('#'+$(this).val()).fadeIn('slow');
			e.preventDefault();
	});

	//Deployment Tab
	$('#tabNav a').click(function(e){
		$('#tabNav li.current').removeClass();
		$('#deployment > div').hide();	
		$(this).parent().addClass('current');
		$($(this).attr("href")).fadeIn('slow');
			e.preventDefault();
	});
	
	//Campaign Menu
	
	  //Create campaign Id

	
	$('#createCreative').click(function(e){
		var campaignData = {
			campaignName : "",
			advertiser : "",
			network : "",
			offers : "",
			domains : "",
			cluster : ""	
		}
		
for(var key in campaignData){
	campaignData[key] = ($("#"+key).val());
}
		var todaysdate = new Date();
		var date  = todaysdate.getDate();
		var month = todaysdate.getMonth() +1;
		var year = todaysdate.getFullYear();
		var date = month+'/'+date+'/'+year;
 		
 		console.log(year);
 		
 		$.ajax({
			type: "POST",
			url: "save.php",
			data: campaignData,
			cache: false,
	
	beforeSend: function(){
		$('<div class="saving"><p>Saving.</p></div>').appendTo("#campaign");
	},
	
	error: function(xhr, ajaxOptions, thrownError){
			alert('error');
			alert(xhr.responseText);
			alert(ajaxOptions);
			alert(thrownError);	
		},
			
	success: function(data)
	{
		campaignId = data;
		$('<a href="/Tian/public/campagin/updating?id='+data+'"> '+ campaignData["cluster"] + " --- " + campaignId + ' '+ campaignData["campaignName"] + ' ' +  date+ ' ' + campaignData["domains"] + ' </a><br />').prependTo("#listCreatives");
	},
	complete: function(){
		$('#campaign .saving').fadeOut(1000,function(){$(this).remove();});
	}
	})
});

	$("#campaign .options").each(function(){
		$('<td><input class="addElement" type="button" value="+"/></td>').appendTo(this).click(function(){
			var button = $(this).parent().find('input:first ');
			var data =  $(this).parent().find('label:first').text();		
			if(button.val()=="cancel"){
			 	$(this).next().remove();
				button.val("+");
			}
			else{
			  button.val("cancel");
			$('<div><input type="text" /><input class="save" type="button" value="save" id="save"></div>').hide().appendTo($(this).parent()).show("slide", { direction: "left" }, 1000).parent().find("input:button").click(function(){

				var currentDiv = $(this).parent();
				if(currentDiv.find("input:text").val() !='')
				{
					var inputValue = currentDiv.find("input:text").val();
					var selectionId = "#"+$(this).parent().parent().find("select").attr('id');	
					$(selectionId).append(new Option(inputValue, inputValue.toLowerCase(), true, true));
				
					var button = $(this).parent().parent().find('input:first');	
					$(this).parent().remove();
					button.val("+");	
					
					$.ajax
					({
	  				type: "GET",
	  				url: "./campagin/inserting",
	  				cache: false,
	  				data: "type="+data+"&value="+currentDiv.find("input:text").val(),
	  				beforeSend: function(){
							alert(3);},
	  				success: function(asdf)	{},
	  				complete: function(){
							$('#campaign .saving').fadeOut(1000,function(){$(this).remove();});}	
					});
				}
			});
			}
			
			
		});
	});


	//MainMenu
	var mainMenu ={
	menuShow: 0,
	menuHide: -100,
	showTime:1000,
	hideTime:200,
		
	init:function(){$('#mainMenuContainer').css("left",this.menuHide+"px");
	$('#mainMenuContainer').hover(function(){
		$(this ).stop().animate({left: mainMenu.menuShow+"px"},mainMenu.showTime);
	},
	function(){
		$(this).stop().animate({left: mainMenu.menuHide+"px"},mainMenu.hideTime);
	});}
	};

	mainMenu.init();	


//Domain Management
//Drag and drop 
	
	/* update after selected #postOrder
	$(function() {
		$("ul.droptrue").sortable({
			connectWith: 'ul',
			opacity: 0.6,
			update : updatePostOrder
		});

		$("#sortable1, #sortable2").disableSelection();
		$("#sortable1, #sortable2").css('minHeight',$("#sortable1").height()+"px");
		updatePostOrder();
	});
	
	function updatePostOrder() { 
		var arr = [];
	  $("#sortable2 li").each(function(){
	    arr.push($(this).attr('id'));
	  });
	  $('#postOrder').val(arr.join(','));
  }
	*/
	
//Drag & Drop
	$("#domainAvaliable,#domainSelected").sortable({
		connectWith: ".domainConnect",
	}).disableSelection();
	
	$("#IpAvaliable,#IpSelected").sortable({
		connectWith: ".IpConnect",
	}).disableSelection();
	
	function listSelection(id){
 	 	var selection = [];	
 	 	$("#"+id+" li").each(function(){ 
 			selection.push($(this).attr("id"));
 		});
 		return selection;
	}
	
	//When .save button clicked   Domain, IP, 
	$(".saveSelection").click(function(){
		var saveButton = this;
			
		$(this).parents("table").find(".selection").each(function(){
			var selectionId = $(this).attr('id');
			var selection = listSelection(selectionId);
			
					$.ajax({
						type: "GET",
						url: "save.php?"+selectionId+"="+selection,
						content: $(saveButton).val(),
						
					beforeSend: function(){
						$(saveButton).val("Saving.....");
						$(saveButton).attr("disabled","disabled");							
					},
					
					error: function(xhr, ajaxOptions, thrownError){
						alert('error');
						alert(xhr.responseText);
						alert(ajaxOptions);
						alert(thrownError);	
					},
							
					success: function(data){
						alert(data);
					},
					
					complete: function(){
						$(saveButton).val(this.content);
						$(saveButton).removeAttr("disabled");
					}
			});  
		});
	});

//******Template Management *******//
$("#saveTemplate").click(function(){

});


//******Template Management *******//
$("#templateAvaliable,#templateSelected").sortable({
	connectWith:	".templateConnect", 
	revert:	true,
}).disableSelection();
	


//******Test&Send Management *******//
$("#templateAvaliable,#templateSelected").sortable({
	connectWith:	".templateConnect", 
	revert:	true,
}).disableSelection();
	

	
 $('#testVolume,#sendList,#setBulk').submit(function(e) {
 	var buttonValue = $(this).find("input:submit").attr("name");
 	var selectedTemplate = listSelection("templateSelected")
  var ajaxData = $(this).closest('form').serialize();
	ajaxData = ajaxData.concat("&selectedTemplate=",selectedTemplate);  //add selected tempaltes
	ajaxData = ajaxData.concat("&submit=",buttonValue);  //add submit button value
 	
 	//alert(buttonValue);
 	  var sending = window.open("save.php?"+ajaxData, 'stayOnCurrentPage', 'width=700,height=400,resizeable,scrollbars');
      this.target = 'stayOnCurrentPage';

        $.ajax({
        	type:"POST",
        	url:"save.php",
        	data: ajaxData,
        	beforeSend: function(){
        		
        	},
        	success: function(respond){
        		alert(respond);
        		sending.close();
        	},
        	
        	complete: function(){
        	}
        });

      	 e.preventDefault();
        return false;
    });





});