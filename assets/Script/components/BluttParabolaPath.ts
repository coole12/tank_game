// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//子弹抛物线示意图
const {ccclass, property} = cc._decorator;

@ccclass
export default class BluttParabolaPath extends cc.Component {

    @property({tooltip:"总共需要画多少个点"})
    drawCount:number=20;
    @property({tooltip:"每个点之间的间隔时间"})
    drawDt:number=0.1;
    @property({tooltip:"点半径"})
    drawRadius:number=2;
    graphics:cc.Graphics;
   
    start () {
        this.graphics = this.node.getComponent(cc.Graphics);

        this.drawPath(cc.v2(-300,-80),cc.v2(200,200))
    }


    /**
     * 画路径
     * @param start 起点位置
     * @param velocity 初始速度
     */
    drawPath(start:cc.Vec2,velocity:cc.Vec2){
        this.graphics.clear();
        for (let index = 0; index < this.drawCount; index++) {
      //      this.graphics.moveTo(start.x,start.y)
            this.graphics.circle(start.x,start.y,this.drawRadius)
            this.graphics.fill()
            start = cc.v2(start.x+velocity.x*this.drawDt,start.y+velocity.y*this.drawDt);
            velocity = cc.v2(velocity.x,velocity.y - 320*this.drawDt)
        }
    }
    // update (dt) {}
}
