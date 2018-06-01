// Set default date to the current time
var date = new Date();
var birthDay = date.getDate();
var birthMonth = date.getMonth() + 1;
var birthYear = date.getFullYear();
var wesIndex, easIndex;
var wesSign, easSign;

function promptInput() {
    //parseInt here converts strings into numbers
        birthDay = parseInt(prompt("Please enter the day you were born on:", "DD"));
        birthMonth = parseInt(prompt("Please enter the month you were born in", "MM"));
        birthYear = parseInt(prompt("Please enter the year you were born in", "YYYY"));

    // Validate the birthday input
    // Could have used isNaN() to check if a variable is a number but no need for it as I used Number.isInteger() here
    if(birthDay < 1 || birthDay > 31 || birthMonth < 1 || birthMonth > 12 || birthYear < 0 ||
       !Number.isInteger(birthDay) || !Number.isInteger(birthMonth) || !Number.isInteger(birthYear)){
        birthDay = date.getDate();
        birthMonth = date.getMonth()+1;
        birthYear = date.getFullYear();
        alert("Please input a valid date!");
    }
    else {        
        easSign = data.eastern_zodiac[findEasZodiac(birthYear)];
        wesSign = data.western_zodiac[findWesZodiac(birthMonth, birthDay)];
        updateContent(birthYear, birthMonth, birthDay);
    }
}

window.onload = function(){
   findEasZodiac(birthYear);
   findWesZodiac(birthMonth, birthDay);
   updateContent(birthYear, birthMonth, birthDay);
}




function updateContent(){
    
    easSign = data.eastern_zodiac[easIndex];
    
    var $easTitle = $("#easInfo").find('h2');
    var $easEB = $("#easInfo ul li:nth-child(1) span"); 
    var $easYinYang = $("#easInfo ul li:nth-child(2) span"); 
    var $easEle = $("#easInfo ul li:nth-child(3) span"); 
    var $easSeason = $("#easInfo ul li:nth-child(4) span"); 
    var $easKw = $("#easInfo ul li:nth-child(5) span"); 
    var $easYears = $("#easInfo ul li:nth-child(6) span"); 
    $easTitle.text(easSign.name);
    $easEB.text(easSign.unicode_symbol);
    $easYinYang.text(easSign.yin_yang);
    $easEle.text(easSign.element);
    $easSeason.text(easSign.season);
    $easKw.text(easSign.keywords);
    $easYears.text(easSign.years.join(" ")); // Seperate years with space
    
    
    
    wesSign = data.western_zodiac[wesIndex];
    
    var $wesTitle = $("#wesInfo").find('h2');
    //var $wesSymbol = $("#wesInfo").find('ul').find('li:first').find('span');
    var $wesSymbol = $("#wesInfo ul li:nth-child(1) span"); 
    // Use css selector - much quicker than the way above!
    var $wesEngName= $("#wesInfo ul li:nth-child(2) span");
    var $wesEle= $("#wesInfo ul li:nth-child(3) span");
    var $wesBody= $("#wesInfo ul li:nth-child(4) span");
    var $wesKw= $("#wesInfo ul li:nth-child(5) span");
    $wesTitle.text(wesSign.name);
    $wesSymbol.text(wesSign.unicode_symbol);
    $wesEngName.text(wesSign.gloss);
    $wesEle.text(wesSign.element);
    $wesBody.text(wesSign.ruling_body_classic);
    $wesKw.html('<i>' + wesSign.keyword + '</i>'); // use .html() instead of .text() to also manipulate html tags
    
    
    // Find which signs are on focus now and change appearance and position
    var $wesFocusImg = $('#w' + wesIndex);
    $wesFocusImg.addClass('wesOnFocus');
    $wesFocusImg.removeClass('idleWes');
    var $easFocusImg = $('#e' + easIndex);
    $easFocusImg.addClass('easOnFocus');
    $easFocusImg.removeClass('idleEas');
    
    // Check if a sign is still on focus. If not, remove from focus class
    for(var i = 0; i <= 11; i++){
        var $ifWFocus = $('#w' + i);
        var $ifEFocus = $('#e' + i);
        
        if(wesIndex != i){
            $ifWFocus.removeClass('wesOnFocus');
            $ifWFocus.addClass('idleWes');
        }
        if(easIndex != i){
            $ifEFocus.removeClass('easOnFocus');
            $ifEFocus.addClass('idleEas');
        }
    }
}

function preWes(){
    wesIndex -= 1;
    if(wesIndex < 0)wesIndex = 11;    
    updateContent();
   
}
function nextWes(){
    wesIndex += 1;
    if(wesIndex > 11)wesIndex = 0;
    updateContent();
    
}
function preEas(){
    easIndex -= 1;
    if(easIndex < 0) easIndex = 11;
    updateContent();
    
}
function nextEas(){
    easIndex += 1;
    if(easIndex > 11)easIndex = 0;
    updateContent();
    
}



function findEasZodiac(year){
    // Calculate eastern zodiac. Note that this this just a rough calculation for the sake of simplicity - for the accurate result we have to refer to traditional Chinese calendar where the start of the year is different - usually in Feburary. The date changes every year and is a bit tricky to caulculate. 
    
    easIndex = (birthYear - 3) % 12 - 1;// Got the number in the real order,and minus 1 to find it in array
    if(easIndex < 0){easIndex += 12} // Make sue it still works when the number of year is to small
//    return easIndex;
}


// This simple function is used to compare a number with the properties inside an array 
function findBoundary(list, value) { 
	for(var i in list) { // For/in works similar to for(var i=0; i<list.length; i++)
		if(list[i] > value) return parseInt(i);
	} 
	return 0;
}

function findWesZodiac(month, day) {
	var dates = [120, 219, 320, 420, 520, 620, 721, 822, 921, 1021, 1121, 1221] // list of division dates between constellations. Obviously dates are not calculated in decimal way but it's still valid to convert dates into decimal format and compare.
	var value = month * 100 + day;
	wesIndex = findBoundary(dates, value) -3;
    if(wesIndex < 0) {
        wesIndex += 12;
    }
    // The array in jason data doesn't start from the very beginning of the year. So index needs conversion the get the right place in the array
//	return wesIndex;
}