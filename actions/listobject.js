var util = require("util");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var template = "list.ejs";
var AWS = require("aws-sdk");



var task = function(request, callback){
	var fields = []; 
	var nazwy =[];
	var adresy =[];

	AWS.config.loadFromPath(AWS_CONFIG_FILE);
	var S3 = new AWS.S3(); //tworzymy nowy obiekt s3

	var params = {
		      Bucket: 'pasicznyk', //nazwa kubelka
			 
			  
			};
	S3.listObjects(params, function(err, data) { // funkcja zwracająca wszystkie obiekty w kubelku
	
	 if (err) console.log(err, err.stack); // an error occurred
	 else     
		 {
		 	
		 	for(var i=0; i<data.Contents.length;i++)
		 		{
		 			fields[i] = data.Contents[i].Key;
		 		}
		 	for(var i=0; i<data.Contents.length;i++)
		 		{
		 			nazwy[i] = data.Contents[i].Key.substring(5); // dodajemy do tablicy "nazwy" nazwy plików znajdujacych sie w kubelku
					S3.getSignedUrl('getObject', params={Bucket: 'pasicznyk',Key:data.Contents[i].Key}, function (err, url) { //generujemy bezpośrednie linki do poszczegolnych plików w kubelku linki sa wazne okreslony czas (chyba 2 godz) 
				adresy[i]=url; //dodajemy wygenerowane linki do tablicy adresy
		});
		 		}
      callback(null, {template: template, params:{fields:fields, bucket:"pasicznyk",names:nazwy,adresy:adresy}}); // przekazujemy te wszystkie dane czyli trzy tablice do strony list.ejs
	}});
	
	}
	exports.action = task;
