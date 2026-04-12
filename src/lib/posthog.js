import posthog from 'posthog-js';

var key=import.meta.env.VITE_POSTHOG_KEY;
var enabled=false;

if(key){
  posthog.init(key,{
    api_host:import.meta.env.VITE_POSTHOG_HOST||'https://us.i.posthog.com',
    capture_pageview:false,   // SPA — we track navigation manually via track()
    capture_pageleave:false,
    autocapture:false,        // manual tracking only — keeps data clean
    persistence:'localStorage',
  });
  enabled=true;
}

export function capture(eventName,props){
  if(!enabled)return;
  try{posthog.capture(eventName,props);}catch(e){/* never crash the app */}
}

export function identify(userId,props){
  if(!enabled)return;
  try{posthog.identify(userId,props);}catch(e){}
}

export function reset(){
  if(!enabled)return;
  try{posthog.reset();}catch(e){}
}
