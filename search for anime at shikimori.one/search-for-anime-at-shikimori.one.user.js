// ==UserScript==
// @name         search for anime at shikimori
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts
// @version      0.6.2
// @description  Update 0.6.2: fix
// @author       AnimeshnikMC
// @match        *://*/*
// @exclude      /^[^:/#?]*:\/\/([^#?/]*\.)?shikimori\.fi(:[0-9]{1,5})?\/.*$/
// @exclude      /^[^:/#?]*:\/\/([^#?/]*\.)?shikimori\.io(:[0-9]{1,5})?\/.*$/
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/search%20for%20anime%20at%20shikimori.one/search-for-anime-at-shikimori.one.user.js
// @updateURL    https://raw.githubusercontent.com/AnimeshnikMC/my-mini-scripts/main/search%20for%20anime%20at%20shikimori.one/search-for-anime-at-shikimori.one.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @tag          productivity
// @tag          utilities
// ==/UserScript==

(function(){
	'use strict';
	var host=['shikimori.fi','shikimori.io'];
	async function getAnime(title,host){
		var url=`https://${host}/api/graphql`,
			cfg={method:"POST",headers:{"Content-Type":"application/json"},
				body:JSON.stringify({query:`{animes(search:"${title}",limit:1,kind:"!special,!tv_special"){id,malId,name,russian,url,kind}}`})
			},p0;
		p0=await fetch(url,cfg).then(res=>res.json()).then(data=>data.data);
		return p0?.animes[0]?.url;
	}
	function s0(){var p0=window.getSelection();return p0.toString()}
	function genBtn(){
		var btnList={},
			OK=(object)=>{return Object.keys(object)};
		this.createBtn=(p0,title)=>{
			var btnN=0
			for(let i=0;i<p0.length;i++){
				const e0=p0[i],
				p1=[
					[
						`[${e0}] search ${title}`,
						async()=>{
							let p=await getAnime(title,e0);
							p!==undefined?GM_openInTab(p,{loadInBackground:true}):alert(`not found "${title}"`)
						},
						{id:`btn${btnN+1}`,title:`${title}`}
					],
					[
						`[${e0}] search private ${title}`,
						async()=>{
							let p=await getAnime(title,e0);
							p!==undefined?GM_openInTab(p,{incognito:true}):alert(`not found "${title}"`)
						},
						{id:`btn${btnN+2}`,title:`${title}`}
					]
				];
				btnList[`btn${btnN+1}`]=GM_registerMenuCommand(...p1[0]);
				btnList[`btn${btnN+2}`]=GM_registerMenuCommand(...p1[1]);
				btnN=btnN+2
			}
			//CL(btnList)
		}
		this.removeBtn=()=>{
			var p0=OK(btnList)
			for(let i=0;i<p0.length;i++){
				const e=p0[i];
				GM_unregisterMenuCommand(btnList[e]);
				delete btnList[e];
			};
			//CL(btnList)
		}
	}
	var gB=new genBtn;
	document.addEventListener("selectionchange",(event)=>{
		var p0=s0();
		if(p0.length){
			gB.createBtn(host,p0)
		}else{
			gB.removeBtn()
		}
	})
})();