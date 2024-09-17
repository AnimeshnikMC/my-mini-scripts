// ==UserScript==
// @name         search for anime at anilibria.top
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts
// @version      0.1.5
// @description  ...
// @author       AnimeshnikMC
// @match        *://*/*
// @exclude      /^[^:/#?]*:\/\/([^#?/]*\.)?anilibria\.top(:[0-9]{1,5})?\/.*$/
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/dev/search%20for%20anime%20at%20anilibria.top/search-for-anime-at-anilibria.top.user.js
// @downloadURL  https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/dev/search%20for%20anime%20at%20anilibria.top/search-for-anime-at-anilibria.top.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilibria.top
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

(function(){
    'use strict';

    var btn1="off",btn2="off";
    async function getAnime(title,Private=0){
        var url=`https://anilibria.top/api/v1/app/search/releases?query=${encodeURI(title)}`,url2,
            cfg={headers:{"Content-Type":"application/json"}},p0;
        p0=await fetch(url,cfg).then(res=>res.json()).then(data=>data);
        url2=`https://anilibria.top/anime/releases/release/${p0[0].alias}/episodes`;
        if(!p0.length){alert(`search failed for query "${title}"`)}
        if(Private===0){GM_openInTab(url2,{loadInBackground:true})}
        else if(Private===1){GM_openInTab(url2,{incognito:true})}
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