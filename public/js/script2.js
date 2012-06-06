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
			
			if(button.val()=="cancel"){
			 	$(this).next().remove();
				button.val("+");
			}
			else{
			  button.val("cancel");
			$('<div><input type="text" /><input class="save" type="button" value="save"></div>').hide().appendTo($(this).parent()).show("slide", { direction: "left" }, 1000).parent().find("input:button").click(function(){
				var currentDiv = $(this).parent();
				if(currentDiv.find("input:text").val() !=''){
					var inputValue = currentDiv.find("input:text").val();
					/*First letter uppercase.	
					inputValue = inputValue.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    						return letter.toUpperCase();
							});	
					*/ 	
						var selectionId = "#"+$(this).parent().parent().find("select").attr('id');	
					$(selectionId).append(new Option(inputValue, inputValue.toLowerCase(), true, true));
				
				var button = $(this).parent().parent().find('input:first');	
				$(this).parent().remove();
				button.val("+");		
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
	
	
	//When .save button clicked   Domain, IP, 
	$(".saveSelection").click(function(){
		var saveButton = this;
			
		$(this).parents("table").find(".selection").each(function(){
			var selectionId = $(this).attr('id');
			var selection = [];			
			$("#"+selectionId+" li").each(function(){
				selection.push($(this).attr('id'));
			});
			
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
	





});