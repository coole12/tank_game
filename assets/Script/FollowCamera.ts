// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FolloCamera extends cc.Component {

    @property(cc.Node)
    target:cc.Node = null;

    @property
    minX:number=0;
    @property
    maxX:number=0;

    @property
    deviation:number=0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update(dt){
        if(this.target!=null){
            if(Math.abs(this.node.position.x-this.target.position.x)>this.deviation){
                if(this.node.position.x < this.target.position.x){
                    if(this.target.position.x - this.deviation<=this.maxX){
                        this.node.setPosition(cc.v2(this.target.position.x - this.deviation,this.node.position.y))
                    }else{
                        this.node.setPosition(cc.v2(this.maxX,this.node.position.y))
                    }
                }else{
                    if(this.target.position.x+this.deviation>=this.minX){
                        this.node.setPosition(cc.v2(this.target.position.x + this.deviation,this.node.position.y))
                    }else{
                        this.node.setPosition(cc.v2(this.minX,this.node.position.y))
                    }
                }
            }
        }
    }
    // update (dt) {}
}
