var jsCommentPages = function(){
  var $activePage,
		$activeTab,
		init = function(){	
			$(".comments-tab").each(function(){
				var $tab = $(this);
				$tab.click(selectPage)
					.addClass("js-inactive-tab");
				$tab = null;
			});
						
			getTweetCounts();
			
			var $default = $(".js-default-tab:first"),
				strDefault = "#blogger-comments";
			if($default.length > 0){
				strDefault = "#" + $default.attr("id");
			}
			//Set default tab and page Active
			$activeTab = $(strDefault);
			$activeTab.removeClass("js-inactive-tab");
			
			$activePage = $(strDefault + "-page");			
			$activePage.show();
		},
		getTweetCounts = function(){
		  	$(".js-page-tweet-count").each(
				function(){
					var $count = $(this);
					$.getJSON("http://urls.api.twitter.com/1/urls/count.json?callback=?",
		      	{url: $count.attr("href")},
		         function(json){$count.text(json.count);$count = null;});					   	
				}
			);		   
 	 	},
		selectPage = function() {
			//Set old tab inactive, then set clicked tab active
		  	$activeTab.addClass("js-inactive-tab");
			$activeTab = $(this);
		  	$activeTab.removeClass("js-inactive-tab");
			
			//hide active page, then switch to page associated to clicked tab
		  	$activePage.hide();
		  	$activePage = $("#" + $activeTab.attr("id") + "-page");
		  	$activePage.show();
		};
	
  	$("document").ready(init);
}();
