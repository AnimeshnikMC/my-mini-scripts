// ==UserScript==
// @name         search for anime at shikimori.one
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts
// @version      0.5.5
// @description  ...
// @author       AnimeshnikMC
// @match        *://*/*
// @exclude      /^[^:/#?]*:\/\/([^#?/]*\.)?shikimori\.one(:[0-9]{1,5})?\/.*$/
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/search%20for%20anime%20at%20shikimori.one/search-for-anime-at-shikimori.one.js
// @updateURL    https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/search%20for%20anime%20at%20shikimori.one/search-for-anime-at-shikimori.one.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    var btn1="off",btn2="off";
    async function getAnime(title,Private=0){
        var url="https://shikimori.one/api/graphql",
            cfg={method:"POST",headers:{"Content-Type":"application/json"},
                 body:JSON.stringify({query:`{animes(search:"${title}",limit:1,kind:"!special,!tv_special"){id,malId,name,russian,url,kind}}`})
            },p0;
        p0=await fetch(url,cfg).then(res=>res.json()).then(data=>data.data);
        if(Private===0){GM_openInTab(p0?.animes[0]?.url,{loadInBackground:true})}
        else if(Private===1){GM_openInTab(p0?.animes[0]?.url,{incognito:true})}
    }
    function s0(){var p0;p0=window.getSelection();return p0.toString()}
    setInterval(()=>{
        var p0=s0();
       if(p0.length){
           btn1=GM_registerMenuCommand(`search ${p0}`,()=>{if(p0.length)getAnime(p0)},{id:"btn01",title:`${p0}`})
           btn2=GM_registerMenuCommand(`search private ${p0}`,()=>{if(p0.length)getAnime(p0,1)},{id:"btn02",title:`${p0}`})
       }
       if(!p0.length&&btn1!=="off"){GM_unregisterMenuCommand(btn1);btn1="off"}
       if(!p0.length&&btn2!=="off"){GM_unregisterMenuCommand(btn2);btn2="off"}
    },1000)

})();