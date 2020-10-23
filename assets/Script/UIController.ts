// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import {Events,FireEvent} from "./Const"
@ccclass
export default class UIController extends cc.Component {

    @property(cc.Node)
    fireBtnNode:cc.Node;
    @property(cc.Node)
    fireProgress:cc.Node;
    private isTouchFire:boolean;
    private touchPercent:number=0;
    private fireProgressMaxWidth: number;
    @property
    fireProgressSpeed:number=0.5;

    @property(cc.Node)
    leftMoveBtnNode;
    @property(cc.Node)
    rightMoveBtnNode;

    @property(cc.Node)
    upMoveBtnNode;
    @property(cc.Node)
    downMoveBtnNode;
    start () {
        this.fireBtnNode.on(cc.Node.EventType.TOUCH_START,this.onFireTouchStart,this);
        this.fireBtnNode.on(cc.Node.EventType.TOUCH_END,this.onFireTouchEnd,this);
        this.fireProgressMaxWidth = this.fireProgress.width;

        this.leftMoveBtnNode.on(cc.Node.EventType.TOUCH_START,this.onLeftMoveTouchStart,this);
        this.leftMoveBtnNode.on(cc.Node.EventType.TOUCH_END,this.onLeftMoveTouchEnd,this);

        this.rightMoveBtnNode.on(cc.Node.EventType.TOUCH_START,this.onRightMoveTouchStart,this);
        this.rightMoveBtnNode.on(cc.Node.EventType.TOUCH_END,this.onRightMoveTouchEnd,this);

        this.upMoveBtnNode.on(cc.Node.EventType.TOUCH_START,this.onUpMoveTouchStart,this);
        this.upMoveBtnNode.on(cc.Node.EventType.TOUCH_END,this.onUpMoveTouchEnd,this);

        this.downMoveBtnNode.on(cc.Node.EventType.TOUCH_START,this.onDownMoveTouchStart,this);
        this.downMoveBtnNode.on(cc.Node.EventType.TOUCH_END,this.onDownMoveTouchEnd,this);
    }

    onFireTouchStart(evt:cc.Event.EventTouch){
        this.isTouchFire = true;
        this.fireProgress.parent.active = true;
    }

    onFireTouchEnd(evt:cc.Event.EventTouch){
        this.isTouchFire = false;
        this.fireProgress.parent.active = false;
        this.fireProgressSpeed = Math.abs(this.fireProgressSpeed)
        cc.find("GameManager").emit(Events.FIRE_BULLET,this.touchPercent)

    }
    update (dt) {
        if(this.isTouchFire){
           // this.fireProgress+
           this.touchPercent += this.fireProgressSpeed*dt;
           if(this.touchPercent>1){
               this.touchPercent = 1;
               this.fireProgressSpeed = -this.fireProgressSpeed;
           }else if(this.touchPercent<0){
               this.touchPercent=0;
               this.fireProgressSpeed = -this.fireProgressSpeed;
           }
           this.fireProgress.width = this.fireProgressMaxWidth*this.touchPercent
        }
    }

    onLeftMoveTouchStart(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_MOVE_START,-1);
    }
    onLeftMoveTouchEnd(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_MOVE_END);
    }
    onRightMoveTouchStart(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_MOVE_START,1);
    }
    onRightMoveTouchEnd(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_MOVE_END);
    }

    onUpMoveTouchStart(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_GUN_MOVE_START,1);
    }
    onUpMoveTouchEnd(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_GUN_MOVE_END);
    }
    onDownMoveTouchStart(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_GUN_MOVE_START,-1);
    }
    onDownMoveTouchEnd(evt:cc.Event.EventTouch){
        FireEvent(Events.TANK_GUN_MOVE_END);
    }

    onDestroy(){
        this.fireBtnNode.off(cc.Node.EventType.TOUCH_START,this.onFireTouchStart,this);
        this.fireBtnNode.off(cc.Node.EventType.TOUCH_END,this.onFireTouchEnd,this);
        this.fireProgressMaxWidth = this.fireProgress.width;

        this.leftMoveBtnNode.off(cc.Node.EventType.TOUCH_START,this.onLeftMoveTouchStart,this);
        this.leftMoveBtnNode.off(cc.Node.EventType.TOUCH_END,this.onLeftMoveTouchEnd,this);

        this.rightMoveBtnNode.off(cc.Node.EventType.TOUCH_START,this.onRightMoveTouchStart,this);
        this.rightMoveBtnNode.off(cc.Node.EventType.TOUCH_END,this.onRightMoveTouchEnd,this);

        this.upMoveBtnNode.off(cc.Node.EventType.TOUCH_START,this.onUpMoveTouchStart,this);
        this.upMoveBtnNode.off(cc.Node.EventType.TOUCH_END,this.onUpMoveTouchEnd,this);

        this.downMoveBtnNode.off(cc.Node.EventType.TOUCH_START,this.onDownMoveTouchStart,this);
        this.downMoveBtnNode.off(cc.Node.EventType.TOUCH_END,this.onDownMoveTouchEnd,this);
    }
}
