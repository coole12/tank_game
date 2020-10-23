// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import GameManager from "./GameManager"
@ccclass
export default class PlayerController extends cc.Component {


  
    private gameManager:GameManager = null;

    private rigidBody:cc.RigidBody = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameManager= cc.find("GameManager").getComponent(GameManager);
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        console.log("PlayerOnLoad")
    }

    start () {

    }

    update (dt) {
        
    }

    onCollisionEnter(other:cc.Collider,self:cc.Collider){
        console.log(other.tag)
    }
       
}
