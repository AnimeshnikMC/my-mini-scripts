// ==UserScript==
// @name         BTTV Chat Layout
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts/
// @version      0.3.1
// @description  Change the chat placement.
// @author       Animeshnik_Maynkrafter
// @match        https://trovo.live/*
// @icon         https://www.google.com/s2/favicons?sz=128&domain=trovo.live
// @run-at       document-end
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("#__layout > div > div > div.base-left-side-wrapper").style.order=1;
    Object.assign(document.querySelector("#__layout > div > div > div.base-left-side-wrapper > div.base-left-side").style,{borderRight: 'none',borderLeft: '1px solid var(--color-base-border)'});
    c1();
})();

function c1(){
    var cx1=document.getElementsByClassName("chat-wrap")[0];
    if((cx1!=null)&&(cx1.style.length==0)){
        Object.assign(cx1.style,{order: '-1',borderLeft: 'none',borderRight: '1px solid var(--color-base-border)'});
        GM_log('%cworks','font-size:20px;color:#0f0;');
        c2();
        setTimeout(c1,1000);
    }else if((cx1!=null)&&(cx1.style.length!=0)){
        GM_log('%csleep','font-size:20px;color:#fff;');
        c2();
        setTimeout(c1,600000);
    }else{
        GM_log('%cnot works','font-size:20px;color:#f00;');
        setTimeout(c1,10000);
    }
}

function c2(){
    let cx2=document.querySelector("#__layout > div > div > div.base-left-side-wrapper").classList.length;
    if(cx2==2){
        document.querySelector("#__layout > div > nav > div.nav-wrapper.flex-wrapper > button").click();
        GM_log('%cmenu opens','font-size:20px;color:#bf0;');
    }else{
        GM_log('%cmenu is open','font-size:20px;color:#f90;');
    }
}