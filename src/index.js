"use strict";
module.exports = {
/**
 * Decodes a binary code to text
 * @param {string} binary
 * @example 
 * 
 * const test = require("decode-and-encode-binary-text")
 * console.log(test.decode("0100100001100101011011000110110001101111"))
 * // outputs "Hello"
 */
decode:function(b){
if(!b){throw new Error('No Text to decode / encode was provided');}else if(b===' '){throw new Error('Text cannot be empty string');}			 
if(typeof b==="number"){throw new Error("text to encode/decode must be string");}	
try{function tobin(b){b=b.replace(/\s+/g,'');b=b.match(/.{1,8}/g).join(' ');
return b.split(" ").map(function(m){return String.fromCharCode(parseInt(m,2));}).join("");}return tobin(b).toString();
}catch(e){
if(e.message==="Cannot read property 'join' of null"){throw new Error("Text to decode cannot be empty string");
}throw new Error(e.stack);}},
/**
 * Encodes a text to binary
 * @param {string} text
 * @param {boolean} spaces
 * @example
 * var test = require("decode-and-encode-binary-text")
 * console.log(test.encode("Hello"))
 * // outputs "0100100001100101011011000110110001101111"
 * 
 * // second example using "spaces"
 * var test = require("decode-and-encode-binary-text")
 * console.log(test.encode("Hello", true))
 * // outputs "01001000 01100101 01101100 01101100 01101111"
 */
encode:function(t, sso){
if(!t){throw new Error('No Text to encode was provided');} 
try{function totxt(s,sso){
function zeroPad(n){return '00000000'.slice(String(n).length)+n;
}return t.replace(/[\s\S]/g,(t)=>{t=zeroPad(t.charCodeAt().toString(2));
if(sso===true){return!1===sso?t:`${t} `; }else{return!1===sso?t:`${t}`;}});}
return totxt(t).toString();}catch(e){throw new Error(`Error ${e.stack}`);}},
/**
 * Checks current version of this dependency
 * @example
 * const test = require("decode-and-encode-binary-text")
 * console.log(test.version())
 * // outputs current this dependency version
 */
version:function(){try{return require("../package.json").version;}catch(e){throw new Error(e.stack);}},
/**
 * Automatically detect if you want to decode or encode 
 * @param {string} detect
 * @example
 * var test = require("decode-and-encode-binary-text")
 * console.log(test.auto("Hello"))
 * // outputs "0100100001100101011011000110110001101111"
 * 
 * console.log(test.auto("0100100001100101011011000110110001101111"))
 * // outputs "Hello"
 */
auto: function (d, spcs) {	
if(!d){throw new Error('No Text to decode / encode was provided');}else if(d===' '){throw new Error('Text cannot be empty string');}			 
if(typeof d==="number"){throw new Error("text to encode/decode must be string");}	
if(/^[01][01\s]*[01]$/.test(d)){try{
function tobin(d){d=d.replace(/\s+/g, '');d=d.match(/.{1,8}/g).join(' ');
return d.split(" ").map(function(m){return String.fromCharCode(parseInt(m,2));}).join("");} return tobin(d).toString();
}catch(e){
if(e.message==="Cannot read property 'join' of null"){
throw new Error("Text to decode cannot be empty string");}throw new Error(e.stack); 
}}else{
if(!d){throw new Error('No Text to encode was provided');}if(d===' '){throw new Error('Text cannot be empty string');}
if(typeof d==="number"){throw new Error("Text to encode must be string instead of the number, for example use encode('4') instead of the encode(4)");}
try{function tTxt(s,sso){
function zeroPad(num){return'00000000'.slice(String(num).length)+num;
}return s.replace(/[\s\S]/g,(s)=>{s=zeroPad(s.charCodeAt().toString(2));
if(spcs===true){return!1===sso?sso:`${sso} `;  
}else{
return!1===sso?s:`${s}`;}});}return tTxt(d).toString();
}catch(e){throw new Error(`Error ${e.stack}`);}}}}