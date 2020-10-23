// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import {Events,AttackEvent} from "./Const"
@ccclass
export default class TankController extends cc.Component {

    @property({type : cc.Prefab,
        displayName: "普通炮弹"})
    normalBullet:cc.Prefab;//普通炮弹
    @property(cc.Node)
    fireNode:cc.Node;//炮弹发射的位置
    @property(cc.Node)
    gun:cc.Node;//炮弹口

    @property
    maxForce:number = 100;//最大力
    @property
    windForce:number = 20;//当前风力

    @property(cc.Node)
    bulletLayer:cc.Node;

    @property
    minAngle:number=20;
    @property
    maxAngle:number=80;
    @property
    gunAngleSpeed:number=10;
    private gunMoveDirection:number=0;//枪口旋转方向
    @property
    maxMoveSpeed:number = 50;
    @property
    canController:boolean = false;//是否能被玩家操作，
    private rigidBody:cc.RigidBody;
    private moveDirection:number;//移动方向
    start () {
       this.rigidBody = this.node.getComponent(cc.RigidBody);
       if(this.canController){
        this.AttackEventListener(true);
       }
    }

    AttackEventListener(isAttack:boolean = true){
        AttackEvent(Events.FIRE_BULLET,this.onFireBullet,this,isAttack);
        AttackEvent(Events.TANK_MOVE_START,this.onTankMove,this,isAttack);
        AttackEvent(Events.TANK_MOVE_END,this.onTankMoveEnd,this,isAttack);
        AttackEvent(Events.TANK_GUN_MOVE_START,this.onGunMove,this,isAttack);
        AttackEvent(Events.TANK_GUN_MOVE_END,this.onGunMoveEnd,this,isAttack);
    }

    onFireBullet(percent:number){
        percent = Math.max(0.2,percent);
        this.fireBullet(this.maxForce*percent);
    }

    fireBullet(force:number){
        var bullet = cc.instantiate(this.normalBullet);
        var rigibody = bullet.getComponent(cc.RigidBody);
        let pos1 = this.fireNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let pos2 = this.gun.convertToWorldSpaceAR(cc.Vec2.ZERO);
  
        let angle = Math.atan((pos1.y-pos2.y)/(pos1.x-pos2.x))*180/Math.PI;
        if(pos1.x >= pos2.x){
            rigibody.linearVelocity =  cc.v2(force*Math.cos(angle*Math.PI/180),force*Math.sin(angle*Math.PI/180));
        }else{
            rigibody.linearVelocity =  cc.v2(-force*Math.cos(angle*Math.PI/180),-force*Math.sin(angle*Math.PI/180));
        }
        
        bullet.group = this.node.group;
        pos1.x = -cc.winSize.width/2+pos1.x;
        pos1.y = -cc.winSize.height/2+pos1.y;
        this.bulletLayer.addChild(bullet);
        bullet.setPosition(pos1);
    }

    onTankMove(dirction:number){
        this.moveDirection = dirction
       // this.rigidBody.linearVelocity = cc.v2(dirction*this.maxMoveSpeed,0);
    }
    onTankMoveEnd(){
        this.moveDirection = 0
    }

//移动枪口
    onGunMove(dirction:number){
        this.gunMoveDirection = dirction;
    }

    onGunMoveEnd(){
        this.gunMoveDirection = 0;
    }

    onDestroy(){
        this.AttackEventListener(false);
     //   cc.find("GameManager").off(Events.FIRE_BULLET,this.onFireBullet);
    }
    update (dt) {
       if(this.moveDirection!=0){
         if(this.node.angle == 0){
            this.rigidBody.linearVelocity = cc.v2(this.moveDirection*this.maxMoveSpeed,0);
         }else{
       //      console.log(this.node.angle)
             this.rigidBody.linearVelocity = cc.v2(this.moveDirection*this.maxMoveSpeed*Math.cos(Math.abs(this.node.angle)*Math.PI/180),this.maxMoveSpeed*Math.sin(this.node.angle*Math.PI/180));
         }
       }
       if(this.gunMoveDirection!=0){
           let angle = this.gun.angle
           angle+=this.gunMoveDirection*this.gunAngleSpeed*dt;
           angle = Math.min(angle,this.maxAngle);
           angle = Math.max(angle,this.minAngle);
           this.gun.angle = angle;
       }
    }
}
