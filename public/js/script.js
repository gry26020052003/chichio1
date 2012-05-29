$(document).ready(function(){
	
	$('#mainMenuTabNav > div').filter(":not(.current)").hide();	
	$('#deployment > div').hide();

	//mainMenu Tab
	$('#mainMenu input').click(function(e){
		
		$('#mainMenu input.current').removeClass();
		$('#mainMenuTabNav > div').hide();		
		$(this).addClass('current');
		$('#'+$(this).val()).fadeIn('slow');
			e.preventDefault();
	});
	
	$('button').click(function(e){
		alert("saf");
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
	$('#createCreative').click(function(e){
		
		var campaignName = ($("#campaignName").val());
		var advertiser = ($("#advertiser").val());
		var network = ($("#network").val());
		var offers = ($("#offers").val());
		var domains = ($("#domains").val());
		var cluster = ($("#cluster").val());
		var campaignId = 12354
		
		//var todaysdate = new Date();
		var todaysdate = new Date();
		var date  = todaysdate.getDate();
		var month = todaysdate.getMonth() +1;
		var year = todaysdate.getYear();
		var date = month+'/'+date+'/'+year;
		
		$('<a href="http://chichi.com/campaignId/33785"> '+ cluster + '  ---  '+ campaignId + ' '+ campaignName +' ' +  date+ ' ' + domains + ' </a><br />').prependTo("#listCreatives");
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
			$('<div><input type="text" /><input class="save" type="button" value="save" id="save"></div>').hide().appendTo($(this).parent()).show("slide", { direction: "left" }, 1000).parent().find("input:button").click(function(){
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
		
	init:function(){$('#mainMenu').css("left",this.menuHide+"px");
	$('#mainMenu').hover(function(){
		$(this ).stop().animate({left: mainMenu.menuShow+"px"},mainMenu.showTime);
	},
	function(){
		$(this).stop().animate({left: mainMenu.menuHide+"px"},mainMenu.hideTime);
	});}
	};



	mainMenu.init();	



//Drag and drop 
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


});