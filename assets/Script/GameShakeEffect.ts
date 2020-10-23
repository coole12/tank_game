const { ccclass, property } = cc._decorator;

@ccclass
export default class GameShakeEffect extends cc.Component {
  @property(cc.Node)
  shakeNode: cc.Node = null;
  
  start(){
    if(this.shakeNode == null){
      this.shakeNode = this.node
    }
  }

  shakeEffect( duration) {
    this.shakeNode.stopAllActions();
    this.shakeNode.runAction(
      cc
        .sequence(
          cc.moveTo(0.02, cc.v2(5, 7)),
          cc.moveTo(0.02, cc.v2(-6, 7)),
          cc.moveTo(0.02, cc.v2(-13, 3)),
          cc.moveTo(0.02, cc.v2(3, -6)),
          cc.moveTo(0.02, cc.v2(-5, 5)),
          cc.moveTo(0.02, cc.v2(2, -8)),
          cc.moveTo(0.02, cc.v2(-8, -10)),
          cc.moveTo(0.02, cc.v2(3, 10)),
          cc.moveTo(0.02, cc.v2(0, 0))
        )
        .repeatForever()
    );

    this.scheduleOnce(() => {
      this.shakeNode.stopAllActions();
      this.shakeNode.setPosition(0, 0);
    }, duration);
  }
}
