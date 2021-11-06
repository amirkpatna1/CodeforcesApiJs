const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');
const sha512 = require('js-sha512');

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
const CodeforcesApiRequestMaker = require('./CodeforcesApiRequestMaker');


function GetResponse(api_key='',secret_key='',rand=100000){
    let obj=new CodeforcesApiRequestMaker(api_key,secret_key,rand);



    this.getBlogComments=function(blogEntryId=-1){
        if(blogEntryId<=0){
            throw new Error("Enter valid blog Id");
        }
        fields={};
        fields["blogEntryId"]=blogEntryId;
        let promise=obj.func(obj.clubFields(obj.generateRequest("blogEntry.comments",fields)));
        promise.then(function(res){
            console.log(res);
            // return res;
        });
    }

    this.getBlogEntry=function(blogEntryId=-1){
        if(blogEntryId<=0){
            throw new Error("Enter valid blog Id");
        }
        fields={};
        fields["blogEntryId"]=blogEntryId;
        let promise=obj.func(obj.clubFields(obj.generateRequest("blogEntry.view",fields)));
        console.log(obj.clubFields(obj.generateRequest("blogEntry.view",fields)));
        var arr=[];
        promise.then(function(res){
            // console.log(res);
            arr.push(res);
        });
        return arr;
    }
}
let res=new GetResponse();
console.log(res.getBlogEntry(79).length);