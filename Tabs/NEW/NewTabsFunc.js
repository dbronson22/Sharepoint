<script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script> 
<script type="text/javascript" src="http://insidegulfstream.com/teams/pet/ASI/Avionics/SiteAssets/jquery.cookie.js"></script> 
<script type="text/javascript" src="http://insidegulfstream.com/teams/pet/ASI/Avionics/SiteAssets/jquery-ui.min.js"></script> 
<link  type="text/css" rel="stylesheet" href="http://insidegulfstream.com/teams/pet/ASI/Avionics/SiteAssets/ContainerTabs.css" /> 

<!--Script that does a freeze pain effect for the column headers-->
<script type="text/javascript" src="http://uat.insidegulfstream.com/teams/AAP/g500Cert/SiteAssets/StickyHeaders_3.1.1.js"></script>

<link type="text/css" rel="stylesheet" href="http://uat.insidegulfstream.com/teams/AAP/g500Cert/SiteAssets/Gridlines.css" />

<div id="tabsContainer"></div> 

<script type="text/javascript"> 
	jQuery(document).ready(function($) { 
	//Put 2 web parts in 2 different tabs 
	//var webPartTitles = ["WebPart1","WebPart2","WebPart3"]; 
	 //HillbillyTabs(webPartTitles); 
	
	//Create a Tab with Two Web Parts, and a second tab with one Web Part 
	//var webPartTitles = ["Tab 1 Title;#WebPart1 Title;#WebPart2 Title","Tab 2 WebPart"]; 
	//HillbillyTabs(webPartTitles); 
	
	//Put all web parts (that have visible titles) in current zone into tabs 
	HillbillyTabs(); 
	}); 

$("#contentBox").hide();

function HillbillyTabs(webPartTitles)
{
    
    var CEWPID = "";
    var tabDivID = "";
    var ulID = "";
    $("#tabsContainer").closest("[id^='MSOZoneCell_WebPart']").find("span[id^='WebPartCaptionWPQ']").each(function()
    {
        CEWPID = $(this).attr("id");
    });
    if (CEWPID == "")
    {
        CEWPID = $("#tabsContainer").closest("[id^='MSOZoneCell_WebPart']").attr("id");
    }
    
    tabDivID = CEWPID + "TabsDiv";
    ulID = CEWPID + "Tabs";
    $("#tabsContainer").attr("id",tabDivID).append("<ul id='"+ulID+"'></ul>");
    
    if(webPartTitles == undefined)
    {
		
        var index = 0;
        $("#" + tabDivID).closest("div.ms-webpart-zone, div.ms-rte-layoutszone-inner").find("h2.ms-webpart-titleText").each(function()
        {
            if($(this).find("span[id^='WebPartCaptionWPQ']").attr("id") != CEWPID)
            {
                var title = $(this).text();
                
                $("#"+ulID).append('<li><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
                    title+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
                
                var webPart = $(this).closest("[id^='MSOZoneCell_WebPart']");
                
                $("#Tab" + index+CEWPID).append((webPart));
                index++;
            }
        });
    } else {
    for(index in webPartTitles)
        {
            var title = webPartTitles[index];
            var tabContent = title.split(";#");
            if (tabContent.length > 1)
            {
                $("#"+ulID).append('<li><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
                    tabContent[0]+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
            
                for(i = 1; i < tabContent.length; i++)
                {
                    $("h2.ms-webpart-titleText").each(function()
                    {
                        $(this).find("span:contains('"+tabContent[i]+"')").each(function()
                        {
                             if ($(this).text() == tabContent[i]){
                                
                                var webPart = $(this).closest("span").closest("[id^='MSOZoneCell_WebPart']");
                                
                                $("#Tab" + index+CEWPID).append((webPart));
                             }
                            
                        });
                    });
                }
            }
            else
            {
                $("h2.ms-webpart-titleText").each(function()
                {
                    $(this).find("span:contains('"+title+"')").each(function()
                    {
                         if ($(this).text() == title){
                            $("#"+ulID).append('<li><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
                                title+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
                            
                            var webPart = $(this).hide().closest("span").closest("[id^='MSOZoneCell_WebPart']");
                            
                            $("#Tab" + index+CEWPID).append((webPart));
                         }
                        
                    });
                });
            }
        }
    }
    
     HideErrorParts();

    $("#"+tabDivID).tabs();
    
    ShowActiveTab();
    $("#contentBox").fadeIn("slow");


}

function HillbillyTabClick(id)
{
    $.cookie("ActiveTab",id,{ path: '/' });
}

function ShowActiveTab()
{
    $("#" + $.cookie("ActiveTab")).click();
}

  function HideErrorParts()
{
    $("span[id^='WebPartCaptionWPQ']").each(function()
    {
        $(this).prev("span:contains('Error')").each(function()
        {
                
                var webPart = $(this).closest("span").closest("[id^='MSOZoneCell_WebPart']").hide();
            
        });
    });
}

</script>
