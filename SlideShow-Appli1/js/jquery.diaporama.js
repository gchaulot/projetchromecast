(function($){
	$.fn.diaporama = function(options) {

		var defaults = {
			delay: 3,
			animationSpeed: "normal",
			controls:true
		};
				
		var options = $.extend(defaults, options);
		
		this.each(function(){
		
			var obj = $(this);
			
			
			if($(obj).find("li").length > 1){
				var inter = setInterval(function(){nextElt(options)}, (options.delay*1000));
				var sens = "right";
				var pause = false;
				
				$(obj).find("li").hide();
				$(obj).find("li:first-child").addClass("active").fadeIn(options.animationSpeed);
				
				// Controls
				
				if(options.controls)
				{
					$(obj).after("<div class='diaporama_controls'><div class='btns'><a href='#' class='prev'>Prec.</a> <a href='#' class='pause'>Pause</a> <a href='#' class='next'>Suiv.</a></div></div>");
					
					$(obj).siblings().find(".prev").click(function(){
						clearInterval(inter);
						prevElt(options);
						if(!pause)
							inter = setInterval(function(){prevElt(options)}, (options.delay*1000));
						sens = "left";
					});
					
					$(obj).siblings().find(".next").click(function(){
						clearInterval(inter);
						nextElt(options);
						if(!pause)
							inter = setInterval(function(){nextElt(options)}, (options.delay*1000));
						sens = "right";
					});
													
					$(obj).siblings().find(".pause").toggle(
						function(){
							$(this).removeClass("pause").addClass("play");
							clearInterval(inter);
							pause = true;
						},
						function(){
							$(this).removeClass("play").addClass("pause");
							inter = setInterval(function(){ (sens == "right")?nextElt(options):prevElt(options)}, (options.delay*1000));
							pause = false;
						}
					);
				}
				
				// Affiche l'élément suivant
				
				function nextElt(options)
				{
					$(obj).find("li.active").fadeOut(options.animationSpeed);
					
					if(!$(obj).find("li.active").is(":last-child"))
					{
						$(obj).find("li.active").next().addClass("active").prev().removeClass("active");
						$(obj).find("li.active").fadeIn(options.animationSpeed);
						
					}
					else
					{
						$(obj).find("li:first-child").addClass("active").fadeIn(options.animationSpeed);
						$(obj).find("li:last-child").removeClass("active");
					}
				}
				
				// Affiche l'élément précédent
				
				function prevElt(options)
				{
					$(obj).find("li.active").fadeOut(options.animationSpeed);
					
					if(!$(obj).find("li.active").is(":first-child"))
					{
						$(obj).find("li.active").prev().addClass("active").next().removeClass("active");
						$(obj).find("li.active").fadeIn(options.animationSpeed);
						
					}
					else
					{
						$(obj).find("li:last-child").addClass("active").fadeIn(options.animationSpeed);
						$(obj).find("li:first-child").removeClass("active");
					}
				}
			}
		});
		
		return this;
	};
})(jQuery);