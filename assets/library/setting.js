cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
    let physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    cc.director.getCollisionManager().enabled = true;
    
    cc.macro.ENABLE_MULTI_TOUCH = false;
    console.log("插件初始化")
    
});