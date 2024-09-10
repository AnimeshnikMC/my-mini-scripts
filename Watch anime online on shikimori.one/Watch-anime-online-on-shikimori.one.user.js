// ==UserScript==
// @name         Watch anime online on shikimori.one
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts
// @version      0.2.2
// @description  ...
// @author       AnimeshnikMC
// @match        https://shikimori.one/*
// @downloadURL  https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/Watch%20anime%20online%20on%20shikimori.one/Watch-anime-online-on-shikimori.one.user.js
// @updateURL    https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/Watch%20anime%20online%20on%20shikimori.one/Watch-anime-online-on-shikimori.one.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @grant        none
// ==/UserScript==

(function(){
    'use strict'

    var WAO=new watchAnime
    function watchAnime(){
        function DQS(s){return document.querySelector(s)}
        function DCE(tag='div'){return document.createElement(tag)}
        function setAttrs(el,attrs){for(var key in attrs){el.setAttribute(key,attrs[key])}}
        function getAttr(el,attr='notifType'){return el.getAttribute(attr)}

        var s1=false,s2=false,el,mainEl=DQS('.l-content>div:nth-child(1)>.b-db_entry>.c-about');
        function cId(){return getAttr(DQS('body'),'id')==='animes_show'?true:false}
        this.s0=()=>{
            let player,btnFS,playerFr,animeID=getAttr(DQS('.l-content>div:nth-child(1)>.b-db_entry>.c-image>.b-user_rate'),'data-model');
            player=DCE('div');btnFS=DCE('button');playerFr=DCE('iframe');
            setAttrs(player,{'class':'watchAnimeOnline'});setAttrs(btnFS,{'class':'b-link_button btnFS'});
            setAttrs(playerFr,{'src':`//kodik.cc/find-player?shikimoriID=${JSON.parse(animeID).target_id}`,'width':"610px",'height':'370px','frameborder':'0','allowfullscreen':'','allow':'autoplay *;fullscreen *'});

            player.append(btnFS,playerFr)
            return player
        }
        this.s1=()=>{
            if(!s1){
                let main,btnWatch;
                main=DCE('div');btnWatch=DCE('button');
                setAttrs(btnWatch,{'class':'b-link_button btnWatch'});
                btnWatch.innerText='Смотреть онлайн';
                main.append(btnWatch);
                mainEl.append(main);
                btnWatch.addEventListener('click',(event)=>{
                    if(!s2){main.append(el=this.s0());btnWatch.innerText='Закрыть';s2=true;}
                    else if(s2){el.remove();btnWatch.innerText='Смотреть онлайн';s2=false}
                })
                s1=true;
            }
        }
        window.addEventListener('load',()=>{
            if(cId())s1=false
            console.log('%cСтраница згружина!!!','color:0f0;font-size:16px;')
        });
        setInterval(()=>{if(cId())this.s1()},1000);
    }
})();