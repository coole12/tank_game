// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//背景节点，用来控制背景上左右两边需要进行镂空的地方。会跟随相机移动而选择不同的镂空
const {ccclass, property} = cc._decorator;

import {GamePixelRatio,Design_Width,Design_Height} from "./Const"
@ccclass
export default class BackGroundComponent extends cc.Component {

    //直播流的窗口宽高，单位为浏览器传过来的px
    @property({tooltip:"直播流窗口宽，以网页像素"})
    livingWidth:number=100;
    @property({tooltip:"直播流窗口高，以网页像素"})
    livingHeight:number=100;
    @property({type:cc.v2,tooltip:"背景坐标差"})
    offSize:cc.Vec2 = cc.v2();
    @property({type:cc.Node,tooltip:"需要跟踪的node，在屏幕震动的时候挖空的区域需要跟着变化"})
    follow:cc.Node=null;
    // LIFE-CYCLE CALLBACKS:
    material:cc.Material = null;
    followPos:cc.Vec3 = cc.v3();
    followScale:cc.Vec2 = cc.Vec2.ONE;
    onLoad () {
        this.material = this.node.getComponent(cc.Sprite).getMaterial(0);
    }

    start () {
        
        this.followPos = this.follow.position.clone();
        this.followScale = this.follow.getScale(this.followScale);
        this.updateLivingRect();
    }

    //更新直播流窗口位置
    updateLivingRect(){
        let size = this.node.getContentSize();
        let sizeW = size.width*this.followScale.x;
        let sizeH = size.height*this.followScale.y;
        let _dx1 = sizeW/2 - Design_Width/2;
        let _dy1 = sizeH/2 - Design_Height/2;
        let _x1 = _dx1/sizeW - this.followPos.x/sizeW;
        let _y1 = _dy1/sizeH + this.followPos.y/sizeH;
        let _z1 = _x1+this.livingWidth/sizeW;
        let _w1 = _y1+this.livingHeight/sizeH;
        this.material.setProperty("leftRect",[_x1,_y1,_z1,_w1])

        let _x2 = 1-_dx1/sizeW - this.followPos.x/sizeW-this.livingWidth/sizeW;
        let _y2 = _y1;
        let _z2 = _x2+this.livingWidth/sizeW;
        let _w2 = _w1;
        this.material.setProperty("rightRect",[_x2,_y2,_z2,_w2])

    }

    update (dt) {
        
    }

    lateUpdate(){
        if(!this.followPos.equals(this.follow.position) || this.followScale.x!=this.follow.scaleX || this.followScale.y!=this.follow.scaleY){
            this.followPos = this.follow.position.clone();
            this.followScale.x = this.follow.scaleX ;
            this.followScale.y = this.follow.scaleY ;
            this.updateLivingRect()
          
        }
    }
    //检测摄像头是否进行了变化，如果摄像头变了，则材质的参数需要进行变化
    checkCameraIsChange(){

    }
}
