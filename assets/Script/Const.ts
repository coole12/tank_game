export const Events={
  FIRE_BULLET:"fireBullet",
  TANK_MOVE_START:"tankMoveStart",
  TANK_MOVE_END:"tankMoveEnd",
  TANK_GUN_MOVE_START:"tankGunMoveStart",
  TANK_GUN_MOVE_END:"tankGunMoveEnd",
}

//添加or删除在gameManager上的事件侦听
export const AttackEvent = function(type:string,callBack:Function,target:any,isAttack:boolean=true){
  if(isAttack){
    cc.find("GameManager").on(type,callBack,target);
  }else{
    cc.find("GameManager").off(type,callBack,target);
  }
  
}

export const FireEvent = function(type:string,arg1?:any,arg2?:any,arg3?:any,arg4?:any){
  cc.find("GameManager").emit(type,arg1,arg2,arg3,arg4);
}

export const Group_Define = {
  default:"default",
  Player:"Player",
  background:"background",
  enemy:"enemy",
  bullet:"bullet",
}
var consoleEnable = true;
export const Log = function(msg:any){
  if(consoleEnable){
    cc.log(msg);
    
  }
}

export const Design_Width = 750;//设计高度
export const Design_Height = 563;//设计高度
export const GamePixelRatio = window.screen.availWidth/Design_Width;//适配高度比
