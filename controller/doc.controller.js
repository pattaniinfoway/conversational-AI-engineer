const express = require('express');
const request = require('request');

module.exports.parseDoc=async(req,res)=>{
   
      let resp = await doRequest("http://norvig.com/big.txt");
      
     var wordData= wordFreq(resp);
    
     
 

    for (let index = 0; index < 10; index++) {
                    
                    
        var lookData= await lookup("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-ru&text="+wordData[index].word);    
        var ldata=JSON.parse(lookData);
        
        exit_loops:
        for (const element of ldata.def) {
            wordData[index].pos=element.pos;
            
            for (const elementone of element.tr) {
                
                console.log(elementone);
                if(elementone.hasOwnProperty('syn'))
                {
                    wordData[index].syn=elementone.syn;
                    break exit_loops;
                }
               
              }

              
          }


        
      
         
     }
    
    

     res.status(200)
        .json({ 
           
            data: wordData.slice(0, 10),
            
            
        });
   
   
 
     
}


function wordFreq(string) {

    var response=new Array();
    var words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
    console.log(words)
    var freqMap = {};
    words.forEach(function(w) {
        var data={};
        if (!freqMap[w]) {
            freqMap[w] = 0;
           
        }

       var Wcount= freqMap[w] += 1;
        data.word=w;
        data.count=Wcount;
        if(response.length>0)
        {
            const elementsIndex = response.findIndex(element => element.word == w );
            
            if(elementsIndex!=-1)
            {
                
                response[elementsIndex].count=Wcount;
            
            }else{
            response.push(data);
                
            }
        }else{
            response.push(data);
        }
        

        
    });
    
    return response;
}






function doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
  
  function lookup(url)
  {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });
  }

