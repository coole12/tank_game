// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameShakeEffect from "./GameShakeEffect";
@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    canvas:cc.Node = null;
    @property(cc.Node)
    gameNode:cc.Node = null;
    private _isTouch:boolean = false;

    private _round:number = -1;//回合 0 左边 1 右边  -1 等待初始化
    private _roundTime:number = 30;//每回合的时间


    onLoad () {
      
        
        console.log("GameManager onLoad");
        
    }

    start () {
        this.canvas.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.canvas.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
       
    }

    onTouchStart(event:cc.Event.EventTouch){
      
        this._isTouch = true;

        this.gameNode.getComponent(GameShakeEffect).shakeEffect(0.5)
      //  this.gameNode.setPosition(cc.v2(-10+20*Math.random(),-15+30*Math.random()))
    }   
    onTouchMove(event:cc.Event.EventTouch){

    }
    onTouchEnd(event:cc.Event.EventTouch){
        this._isTouch = false;
    }

    get isTouch(){
        return this._isTouch;
    }
    // update (dt) {}
}
