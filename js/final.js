var fs = require('fs');
var fileContents = fs.createReadStream('Indicators.csv');
var rl=require('readline').createInterface({
	input:fileContents,
	terminal:false
});
var newLine=[];
var index=0;

var headers=[];
var indicatorsAsia=[];
var indicatorsIndia=[];
var asianCountries=["AFGHANISTAN","AZERBAIJAN", "JAPAN", "QATAR", "ARMENIA", "JORDAN","INDIA", "SAUDI ARABIA", "BAHRAIN", "KAZAKHSTAN", "SINGAPORE", "BANGLADESH", "KUWAIT", "SOUTH KOREA", "BHUTAN", "KYRGYZSTAN", "SRI LANKA", "BRUNEI", "LAOS", "SYRIA", "BURMA" ,
"LEBANON", "TAIWAN", "CAMBODIA", "MALAYSIA", "TAJIKISTAN", "CHINA", "MALDIVES", "THAILAND", "TIMOR-LESTE", "MONGOLIA", "TURKEY", "NEPAL", "TURKMENISTAN", "INDONESIA", "NORTH KOREA", "UNITED ARAB EMIRATES", "IRAN", "OMAN", "UZBEKISTAN",
"MYANMAR","IRAQ", "PAKISTAN", "VIETNAM", "ISRAEL", "PHILIPPINES", "YEMEN"];



rl.on('line',function(line){
	var lineObj={};
	newLine=line.replace(/"[^"]+"/g, function (match) {
    return match.replace(/,/g, '|');
}).split(",");

	if(index==0){
		headers=newLine;
	//	console.log("+++++++++++++"+headers);
		index++;
	}else{
		for(i=0;i<headers.length;i++){

			lineObj[headers[i]]=newLine[i].replace(/"/g,"").replace("|",",");
		}
		if(( newLine.indexOf('SP.RUR.TOTL.ZS')!=-1 || newLine.indexOf('SP.URB.TOTL.IN.ZS')!=-1 )
					&& (newLine[0].toUpperCase()==="INDIA") ){

						delete lineObj.IndicatorCode;
						delete lineObj.CountryCode;



			indicatorsIndia.push(lineObj);
		//	console.log(indicatorsUrban[1]);
	}else if(asianCountries.indexOf(newLine[0].toUpperCase())!=-1){
		if( newLine.indexOf('SP.RUR.TOTL')!=-1 || newLine.indexOf('SP.URB.TOTL')!=-1 ){

			indicatorsAsia.push(lineObj);
		}
	}
	/*	if((newLine.indexOf('SP.RUR.TOTL')!=-1 )&& (countrys.indexOf(newLine[0].toUpperCase())!=-1) ) {
				indicatorsRural.push(lineObj);
	}*/
}
});


rl.on('close',function(line){
fs.writeFile(process.cwd() + "./indian.json", JSON.stringify(indicatorsIndia), function (err) {

});
fs.writeFile(process.cwd() + "./asian.json", JSON.stringify(indicatorsAsia), function (err) {

});

//fs.writeFile(process.cwd() + "./rural.json", JSON.stringify(indicatorsRural), function (err) {

//});

});



  
   
