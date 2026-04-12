import posthog from 'posthog-js';

var key=import.meta.env.VITE_POSTHOG_KEY;

if(key){
  posthog.init(key,{
    api_host:import.meta.env.VITE_POSTHOG_HOST||'https://us.i.posthog.com',
    capture_pageview:false,   // SPA — we track navigation manually via track()
    capture_pageleave:false,
    autocapture:false,        // manual tracking only — keeps data clean
    persistence:'localStorage',
  });
}

export var ph=posthog;

export function identify(userId,props){
  if(!key)return;
  posthog.identify(userId,props);
}

export function reset(){
  if(!key)return;
  posthog.reset();
}
