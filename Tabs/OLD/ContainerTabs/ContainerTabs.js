<!-- Reference the jQueryUI theme's stylesheet on AFD. Using the "Start" theme --> 
<link  type="text/css" rel="stylesheet" href="http://insidegulfstream.com/teams/AAP/g500Cert/SiteAssets/ContainerTabs.css" /> 
<!-- Reference jQuery on AFD --> 
<script type="text/javascript" src="http://insidegulfstream.com/teams/AAP/g500Cert/SiteAssets/jquery.min.js"></script>
<!-- Reference jQueryUI on AFD --> 
<script type="text/javascript" src="http://insidegulfstream.com/teams/AAP/g500Cert/SiteAssets/jquery-ui.min.js"></script> 

<style type="text/css">
</style>

<script type="text/javascript">
     jQuery(document).ready(function($) {
         //$(".s4-wpcell").hide();
         //$(".s4-wpcell-plain").hide();
		 
         //Put the Web Part Title for all the Web Parts you wish to put into the tabbed view into the array below.
         setTimeout(function() {
            HillbillyTabs(["Project Summary","HGI","Milestones","Documents","Discussion","POC","Recent Activity","90 Days"]);
        }, 800);

    });

function HillbillyTabs(webPartTitles)
    {
        for(index in webPartTitles)
        {
            var title = webPartTitles[index];
            $("#HillbillyTabs").append('<li><a href="#Tab'+index+'" id="TabHead'+index+'" onclick="SetCookie(this.id);">'+
title+'</a></li>').after('<div id="Tab'+index+'"></div>');
            $("span:contains('"+title+"')").each(function(){
                if ($(this).text() == title){
                   var webPart = $(this).hide().closest("span").closest("[id^='MSOZoneCell_WebPart']");
                   if ($(webPart).contents().html() != undefined)
                   {
                           webPart = $(webPart).contents();
                   }
                   $("#Tab" + index).append((webPart));
            }});
        }
        $("#tabsContainer").tabs();
        $(".s4-wpcell").show();
         $(".s4-wpcell-plain").show();

    }

function SetCookie(id)
    {
           var date = new Date();
           //make the cookie expire in 5 minutes
           date.setTime(date.getTime()+(300*1000));
           var expires = "; expires="+date.toGMTString();
           document.cookie = "ActiveTab="+id+expires+"; path=/";
    }
    
function ShowActiveTab()
    {
        var name = "ActiveTab";
        var cookieArray = document.cookie.split(";");
        for (index in cookieArray)
        {
            var keyValuePair = cookieArray[index].split("=");
            var key = keyValuePair[0];
            key  = key.replace(/^\s+|\s+$/g, "");
            if (key == name)
            {
                var value = keyValuePair[1];
                $("#" + value).click();
                return;
            }
        }
    }


</script>
<div id="tabsContainer"><ul id="HillbillyTabs"></ul></div>