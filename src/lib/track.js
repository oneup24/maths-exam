import {supabase} from '../services/supabase';
import {capture} from './posthog';

function getDeviceId(){
  var id=localStorage.getItem('device_id');
  if(id)return id;
  id=crypto.randomUUID();
  localStorage.setItem('device_id',id);
  return id;
}

export function track(eventName,props={}){
  // PostHog — primary analytics
  capture(eventName,{...props,device_id:getDeviceId()});

  // Supabase — secondary (own data warehouse)
  if(!supabase)return;
  supabase.auth.getSession().then(({data})=>{
    supabase.from('events').insert({
      event_name:eventName,
      device_id:getDeviceId(),
      user_id:data?.session?.user?.id||null,
      props:props,
    }).then(()=>{});
  }).catch(()=>{
    supabase.from('events').insert({
      event_name:eventName,
      device_id:getDeviceId(),
      props:props,
    }).then(()=>{});
  });
}
