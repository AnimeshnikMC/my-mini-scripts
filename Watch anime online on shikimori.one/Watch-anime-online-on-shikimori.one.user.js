// ==UserScript==
// @name         Watch anime online on shikimori.one
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts
// @version      0.3.0 fix
// @description  ...
// @author       AnimeshnikMC
// @match        https://shikimori.one/*
// @run-at       document-end
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

        var s1=false,s2=false,el,m1='.l-content>div:nth-child(1)>.b-db_entry';
        function cId(){return getAttr(DQS('body'),'id')==='animes_show'?true:false}
        function WAOscaling(){
            var vid_w=DQS(`${m1}>.c-about>.WAOmain`).offsetWidth-6,
                vid_h=(vid_w/(16/9)).toFixed(0),
                player=DQS(`${m1}>.c-about>.WAOmain>.watchAnimeOnline`);
            player.style.width=`${vid_w}px`;
            player.style.height=`${vid_h}px`;
                
        }
        this.s0=()=>{
            let player,btnFS,playerFr,animeID=getAttr(DQS(`${m1}>.c-image>.b-user_rate`),'data-model');
            player=DCE('div');btnFS=DCE('button');playerFr=DCE('iframe');
            setAttrs(player,{'class':'watchAnimeOnline','style':'position:relative;width:610px;height:370px;'});
            setAttrs(btnFS,{'class':'b-link_button btnFS','style':'position:absolute;right:0;'});
            btnFS.innerText='перейти в полный экран';
            setAttrs(playerFr,{'src':`//kodik.cc/find-player?shikimoriID=${JSON.parse(animeID).target_id}`,'width':"100%",'height':'100%','frameborder':'0','allowfullscreen':'','allow':'autoplay *;fullscreen *'});
            player.addEventListener('fullscreenchange',()=>{
                if (document.fullscreenElement) {
                    btnFS.innerText='выйти из полного экрана';btnFS.style.opacity=0.2
                } else {
                    btnFS.innerText='перейти в полный экран';btnFS.style.opacity=1
                }
            })
            btnFS.addEventListener("click",(event)=>{
                if(document.fullscreenElement){document.exitFullscreen();}
                else{player.requestFullscreen();}
              });
            player.append(btnFS,playerFr)
            return player
        }
        this.s1=()=>{
            if(!s1){
                let main,btnWatch,mainEl=DQS(`${m1}>.c-about`);
                main=DCE('div');btnWatch=DCE('button');
                setAttrs(main,{'class':'WAOmain'});
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
        setInterval(()=>{
            if(cId()){this.s1()}else if(!cId()&&s1){s1=false}
            if(cId()&&s1&&s2){WAOscaling()}
        },1000);
    }
})();