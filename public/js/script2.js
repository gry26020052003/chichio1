$(document).ready(function(){
	var templates = {};
	
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
//-----------------------------------------------//


//$(".creativeChild").chained(".creativeParent");
//******Template Management *******//

$('#saveTemplate').attr('disabled','disabled');

$('#templateContent').keydown(function(){
	$('#saveTemplate').removeAttr('disabled','disabled');
});

$(".creativeParent input,.creativeParent1 input").live('click',function(e){
	clickedObject = this;
	//$(creativeId).children(':not(.default)').remove();		
	$.post('./campagin/templates', '' ,function(jsonData) {
		templates=jsonData;
		showSubMenu(jsonData,'creativeId');
	},'json');
});


$(".creativeChild input").live('click',function(e){
	clickedObject = this;
	//$(creativeId).children(':not(.default)').remove();			
	creativeParent = $('.creativeParent input:first').val();
	showSubMenu(templates[creativeParent],'value');
});

showSubMenu = function(data,request){
	var currentObject = this;
	var creativeIds = [];	
	if(request=='creativeId'){
		$.each(data, function(index,ids){
			creativeIds.push(index);
		});	
	}
	else
	creativeIds = data;

	creativeIds.sort(function(first,second){
		return second-first; //sorted from high to low
	});
	
	subMenu = $('<div class="subMenu"></div>');
	$.each(creativeIds,function(index,templateName){  //show a list of templates
		var creativeId = $('.creativeParent input:first').val();
		var li = $('<li class="subMenuOptions"></li>').text(templateName)
				.click(function(){
					$(clickedObject).val(templateName);
					subMenu.remove();	
					$('#saveTemplate').attr('disabled','disabled');
					
					if(request=='creativeId'){
						childDropdown = $('.creativeChild input:first');
						childDropdown.val('');						
						childDropdown.removeAttr("disabled", "disabled");
						loadAvaliableTemplates(); // for Test&Send
					}
					
					requestData={'creativeId':creativeId,'templateName':templateName};
					if(request=='value'){
						$.post('./campagin/loadtemplate', requestData ,function(jsonData) {
							$('#templateContent').val(jsonData).scrollTop(0);
						});
					}
				});
		
		$('body').click(function(){subMenu.remove()});
		subMenu.append(li);
	});

	subMenu.appendTo($(clickedObject).parent());	
}


$("#saveTemplate").live('click',function(){
	var respond = confirm("Are you sure you want to save this file, ?");	
	if(respond==true){
	
		var templateContent = $('#templateContent').val();
		var creativeId = '';
		var templateName = '';
		var creativeParentInput = $('.creativeParent input:first');
		var creativeChildInput = $('.creativeChild input:first');
		
		if($("#newTemplate").val()!=''){
		var newTemplateName = $("#newTemplate").val().replace(/\s*/g,'');	
		var creativeId = /^\s*\d+/.exec(newTemplateName);
		var templateContent = 	$('#templateContent').val();
		creativeId = $.isNumeric(creativeId)? creativeId[0] : 0;
		templateName = newTemplateName;
		}
		else{
			creativeId = creativeParentInput.val();
			templateName =  creativeChildInput.val();
		}
		
		data = {"creativeId":creativeId,"templateName":templateName,"templateContent":templateContent};
		
		if(templateName!=''){
			$.post('./campagin/savetemplate', data ,function(jsonData) {
				$('#templateContent').scrollTop(0);
				$('#newTemplate').val('');
				creativeParentInput.val(creativeId);
				creativeChildInput.val(templateName).removeAttr('disabled','disabled');
				$('#templateContent').val(templateContent);
				$('#saveTemplate').attr('disabled','disabled');
			});
		}
		else{alert('Failed to process');}
	
	
	}		//	$(selectionId).append(new Option(inputValue, inputValue.toLowerCase(), true, true));
});
//----------------------------------//



//******Test&Send Management *******//
function loadAvaliableTemplates (){
	var avaliableTemplatesUL = $('#templateAvaliable');
	var templateSelectedUL = $('#templateSelected');
	templateSelectedUL.empty();
	avaliableTemplatesUL.empty();
	
	creativeParent = $('.creativeParent1 input:first').val();
	var avaliableTempaltes = templates[creativeParent];
	li = $.each(avaliableTempaltes,function(index,value){
		avaliableTemplatesUL.append($('<li class="ui-state-default"></li>').attr('id',value).text(value));
	});
	
	};

$("#templateAvaliable,#templateSelected").sortable({
	connectWith:	".templateConnect", 
	revert:	true,
}).disableSelection();
	

	
 $('#testVolume,#sendList,#setBulk,#createTemplate').submit(function(e) {	
 	var buttonValue = $(this).find("input:submit").attr("name");
 	var selectedTemplate = listSelection("templateSelected")
  var ajaxData ='';
	ajaxData = ajaxData.concat("&templateSelected=",selectedTemplate);  //add selected tempaltes
	ajaxData = ajaxData.concat("&submit=",buttonValue);  //add submit button value
 	ajaxData = ajaxData.concat("&",$(this).closest('form').serialize());
 	
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
        		 
        	}
        });

      	 e.preventDefault();
         return false;
    });


});