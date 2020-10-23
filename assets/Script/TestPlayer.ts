// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { Events, FireEvent, Log} from "./Const"



export enum MoveEnum {
    IDEL = 0,
    LEFT = -1,
    RIGHT = 1,
};

@ccclass
export default class NewClass extends cc.Component {
    

    @property(cc.Enum)
    

    private speed = 10;

    @property(cc.Enum)
    _moveSate = MoveEnum.IDEL;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        
    }

    start () {
        //动态加载
        protobuf.load("Hall.proto", function (err, root) {
            if (err)
                cc.log(err);

            cc.log("root=" + root);

            // for (var i in root) {
            //     cc.log("root." + i + "=" + root[i]);
            // }

            //枚举
            var cmd = root.lookupEnum("com.sj.game.proto.hall.HallCmd");
            cc.log(`cmd = ${JSON.stringify(cmd)}`);
            cc.log("LOGIN = " + cmd.values.LOGIN);

            //找到对象
            var Test = root.lookup("com.sj.game.proto.hall.Test");
            cc.log("type1 = " + Test);

            //初始化&序列化
            var message = Test.create({ t1: 1, t2: 2, t3: '3' });
            var buffer = Test.encode(message).finish();
            cc.log("buffer1 = " + buffer);

            //反序列化
            var decoded = Test.decode(buffer);
            cc.log("decoded1 = " + decoded.t1);
            cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
        })
        //console.log('?????');
        // var test = new Hall.Test();
        // test.t1 = 1;
        // protobuf.load("Hall.proto", function(error, root){
        //     if (error)
        //         throw error;

        //     var Test = root.lookup("Hall.Test")

        // });

        //let protobuf = require("./protobuf.js");
        //let fileName = cc.resources.load("protocol/Hall.proto");
        // let fileName = '';
        // cc.resources.load('protocol/Hall', function (err, asset) {
        //     if (err) {
        //         cc.error(err.message);
        //         return;
        //     }
        //     console.log(asset);
        //     //console.log(conf.toString());
        //     fileName = "https://ks3-cn-guangzhou.ksyun.com/jfieosk221/cocos/td/Hall.proto";
            
        //     proto.load(fileName, function (error, root) {
        //         // for (var i in root) {
        //         //     cc.log("root." + i + "=" + root[i]);
        //         // }

        //         let request = root.lookup('Hall.Test');
        //         console.log(request);
        //         let massage = request.create({ t1: 1, t2: 2 });
        //         let buffer = request.encode(massage).finish();

        //         let age = buffer.decode(buffer).finish();

        //         Log('ok> ' + age.t1);
        //         Log('ok> 2' + age.t2);
        //     });
        // // });
        // var massage = Hall.create();
    }

    onKeyUp(event)
    {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
                    this.SetMoveState(MoveEnum.IDEL);
                    break;
            case cc.macro.KEY.a:
                    this.SetMoveState(MoveEnum.IDEL);
                    break;
        }
    }

    onKeyDown(event) {
        switch (event.keyCode)
        {
            case cc.macro.KEY.d:
                    this.SetMoveState(MoveEnum.RIGHT);
                    break;
            case cc.macro.KEY.a:
                    this.SetMoveState(MoveEnum.LEFT);
                    break;
            case cc.macro.KEY.w:
                    break;
            case cc.macro.KEY.s:
                    break;
        }
    }

    update (dt) {
        if (this._moveSate != MoveEnum.IDEL) {
            console.log("this._moveSate" + this._moveSate);
            console.log("this.speed" + this.speed);
            console.log("dt" + dt);
            this.node.x += this._moveSate * this.speed * dt;
        }
    }

    SetMoveState (state) {
        if (this._moveSate == state)
            return;
            
        this._moveSate = state;
        //FireEvent(Events.TANK_MOVE_START, -1);
    }
}
