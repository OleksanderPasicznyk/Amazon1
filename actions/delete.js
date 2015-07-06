var util = require("util");
var AWS = require("aws-sdk");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var succ = "success.ejs";

var message= "";
var haderr= false


var task = function(request, callback){
	//1. загрузка конфигурации
	AWS.config.loadFromPath(AWS_CONFIG_FILE);
	var s3 = new AWS.S3(); // tworzymy nowy obiekt s3
	var klucz = request.param("klucz"); //odbieramy parametr o nazwie klucz od strony
	
	var opcje = {
			Bucket: 'pasicznyk',
			Key : klucz //sciezka do pliku 
	};

   
	s3.deleteObject(opcje, function(err,data){ //funkcja usuwajaca obiekt z kubelka
	if(err){
		message = "Failed to delete file "+klucz.substring(5); //wyswietlanie wiadomosci gdy nie powiodlo sie usuwanie
		callback(null, {template: succ, params:{message:message}});
		}
	else{
		 message = "File removed : " +klucz.substring(5);//wyswietlanie wiadomosci gdy powiodlo sie usuwanie
		 callback(null, {template: succ, params:{message:message}});
		
	}});
	
	

		
	
	}
	exports.action = task;
