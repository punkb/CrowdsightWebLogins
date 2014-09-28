//the following are what creates content in each app
var serviceURL = 'http://warrickhartman.com/crowdsight/admin/services/'; //where app services can be found

var URLID = getQueryVariable("id");



function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function init(){
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function logout(){
			 window.localStorage.clear();
			 window.location = "index.html";
		 }

function checkPreAuth(){
	if(window.localStorage.getItem("username") != undefined){
		window.location = "home.html";
	}
	else{
		window.location = "signin.html";
	}
}

function handleLogin(){
	var form = $('#loginForm');
	
	//disable submit button
	$('#submitButton', form).attr("disabled", "disabled");
	
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	
	console.log('click');
	if(u != "" && p != ""){
		$.post("http://warrickhartman.com/crowdsight/admin/services/dosignin.php", {username:u,password:p}, function(res){
			if(res == true){
				window.localStorage.setItem("username", u);
				window.localStorage.setItem("password", p);
				window.location = "home.html";
			}else{
				navigator.notification.alert("Your login failed", function(){});
			}
			$('#submitButton', form).removeAttr("disabled");
		}, "json");
	}
	else{
		alert("In Else");
		navigator.notification.alert('You Must enter a username and password', function(e){
			$('#submitButton', form).removeAttr("disabled");
		})
	}
	return false;
}

function handleSignUp(){
	var form = $('#loginForm');
	
	alert('inSignup');
	
	//disable submit button
	$('#submitButton', form).attr("disabled", "disabled");
	
	var u = $("#username", form).val();
	var e = $("#email", form).val();
	var f = $("#firstname", form).val();
	var l = $("#lastname", form).val();
	var p = $("#password", form).val();
	var cp = $("#conpassword", form).val();
	
	console.log('click');
	if(u != "" && p != ""){
		alert('if');
		$.post("http://warrickhartman.com/crowdsight/admin/services/dosignup.php", {username:u, email: e, firstname: f, lastname: l, password:p, conpassword: cp}, function(res){
			if(res == true){
				alert('true');
				window.localStorage.setItem("username", u);
				window.localStorage.setItem("password", p);
				window.location = "merchantlist.html";
			}else{
				alert('false');
				navigator.notification.alert("Your Sign Up failed", function(){});
			}
			$('#submitButton', form).removeAttr("disabled");
		}, "json");
	}
	else{
		alert("In Else");
		navigator.notification.alert('You Must fill in all boxes', function(e){
			$('#submitButton', form).removeAttr("disabled");
		})
	}
	return false;
}

function getLiveFeed() {
	console.log("in Live Feed");
	console.log(URLID);

	$.getJSON(serviceURL + 'getpopimages.php?campaign_id=' + URLID, function(data) {
		live_items = data.items;
		$.each(live_items, function(index, live_item) {
			console.log(live_item.image);
			$('#livePopular').append('<div class="EachLiveImage"><a href="single.html?id='+ live_item.id +'"><img src="' + live_item.image +'" style="max-width:100%"><div class="overlayImage"><div class="likeButton">'+ live_item.likes +'</div><div class="commentbutton">'+ live_item.comments +'</div><div class="sharebutton"></div></div></a></div>');
		});
		//$('#NewsHolder').listview('refresh');
	});
	$.getJSON(serviceURL + 'getimages.php?campaign_id=' + URLID, function(data) {
		live_items = data.items;
		$.each(live_items, function(index, live_item) {
			console.log(live_item.image);
			$('#liveRecent').append('<div class="EachLiveImage"><a href="single.html?id='+ live_item.id +'"><img src="' + live_item.image +'" style="max-width:100%"></a><div class="overlayImage"><div class="likeButton">'+ live_item.likes +'</div><div class="commentbutton">'+ live_item.comments +'</div><div class="sharebutton"></div></div></div>');
		});
		//$('#NewsHolder').listview('refresh');
	});
	
}

function getEvents() {
	$.getJSON(serviceURL + 'getevents.php', function(data) {
		event_items = data.items;
		$.each(event_items, function(index, event_item) {
			$('#sliderEvents').append('<div class="swiper-slide"><a href="live.html?id='+event_item.id+'"><img src="' + event_item.image + '" style="max-width:100%;"></a> </div>');
		});
		//$('#NewsHolder').listview('refresh');
	});
}

function getSingle() {
	$.getJSON(serviceURL + 'getsingleimage.php?id=' + URLID, function(data) {
		event_items = data.items;
		$.each(event_items, function(index, event_item) {
		console.log("in each");
			$('#singleItem').append('<div class="singlePhoto"><img src="' + event_item.image + '" class="watermark" style="max-width:100%;"></div>');
			$('#BackId').append('<a href="live.html?id=' + event_item.return_id + '" class="backbutton"></a> ');
		});
		//$('#NewsHolder').listview('refresh');
	});
	
	
}

function getReward() {
	$('#BackId').append('<a href="competitions.html?id=1" class="backbutton"></a> ');
}