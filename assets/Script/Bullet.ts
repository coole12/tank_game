// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    private rigidBody:cc.RigidBody;

    start () {
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        
    }

    update (dt) {
        let velocity = this.rigidBody.linearVelocity.len()
        let angle = Math.acos(this.rigidBody.linearVelocity.x/velocity)*180/Math.PI
    //    console.log(angle)
        if(this.rigidBody.linearVelocity.x != 0){
            if(this.rigidBody.linearVelocity.y<0){
                this.node.angle = -angle
            }else{
                this.node.angle = angle
            }
        }
        
    }

    onBeginContact(contact,self,other){
        this.node.destroy()
    }
}
