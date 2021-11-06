const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const axios = require('axios');
const sha512 = require('js-sha512');

const app=express();
app.use(bodyparser.urlencoded({extended:true}));

module.exports=function CodeforcesApiRequestMaker(api_key='',secret_key='',rand=100000) {
  if(rand===100000){
    this.rand=Math.floor(Math.random() * 899999)+100000;
  }
  this.api_key=api_key;
  this.secret_key=secret_key;
  if(rand<100000 || rand>999999)
    throw new Error("Length of passed random number is not 6");
  this.greeting = function() {
    console.log('Hi! I\'m ' + this.api_key + '.');
  };
  
  this.generateRequest = function(methodName='',fields={}){
    let url="https://codeforces.com/api/"+methodName;
    if(this.api_key!='')
      fields.apiKey=this.api_key;
    fields.time=Math.floor(Date.now()/1000);
    api_signature = this.rand.toString() + "/" + methodName + "?";
    fields = Object.keys(fields).sort().reduce(
      (obj, key) => { 
        obj[key] = fields[key]; 
        return obj;
      }, 
      {}
    );
    Object.keys(fields).forEach(element => {
      api_signature +=element+"="+fields[element].toString()+"&";
    });
    api_signature = api_signature.slice(0,-1);
    api_signature +="#"+this.secret_key;
    hashed_signature=sha512(api_signature);
    fields["apiSig"]=this.rand.toString()+hashed_signature;
    return {url:url,fields:fields};
  }

  this.clubFields=function(data={url:"",fields:{}}){
    if(data.fields.length===0 || data.url==='')
      throw new Error("url or fields cannot be empty");
    let url=data.url+"?";
    let fields=data.fields;
    Object.keys(fields).forEach(element => {
      url +=element+"="+fields[element].toString()+"&";
    });
    url =url.slice(0,-1);
    return url;
  }

  this.func=function(url) {
    return axios.get(url).then(response => response.data);
  }
}



