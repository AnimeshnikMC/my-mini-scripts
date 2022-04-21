// ==UserScript==
// @name         BTTL Chat Swap
// @namespace    https://github.com/AnimeshnikMC/my-mini-scripts/
// @version      0.4.0
// @description  Change the chat placement.
// @author       Animeshnik_Maynkrafter
// @match        https://trovo.live/*
// @icon         https://www.google.com/s2/favicons?sz=128&domain=trovo.live
// @updateURL    https://github.com/AnimeshnikMC/my-mini-scripts/raw/main/BTTL%20Chat%20Swap/BTTL-Chat.user.js
// @downloadURL  https://github.com/AnimeshnikMC/my-mini-scripts/raw/main/BTTL%20Chat%20Swap/BTTL-Chat.user.js
// @run-at       document-end
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @resource     cx_CSS https://github.com/AnimeshnikMC/my-mini-scripts/raw/main/BTTL%20Chat%20Swap/style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const cx1=GM_getResourceText("cx_CSS");
    GM_addStyle(cx1);
})();