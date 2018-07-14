
cc.Class({
    extends: cc.Component,

    properties: {
        jumpLoc:210,
        DrawCollision:false,
        isJumping:false,
        isOnPlatform:true,
        PlayerLoc:0,
        Game: {
            default:null,
            type:cc.Node,
        },
        CoinAmount:0,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.GameScript = this.Game.getComponent('Game');
         this.anim = this.getComponent(cc.Animation);
         this.Collision = cc.director.getCollisionManager();
         this.Collision.enabled = true;
         this.Collision.enabledDebugDraw = this.DrawCollision;

         this.anim.on('finished',function(){
             this.isJumping = false;
             this.anim.play("Player_idle");
         },this);


     },
     AddCoin() {
         this.GameScript.AddCoin_Game();
     },

     OnRight() {
        this.anim.play("Player_jump_Right");
        this.isJumping = true;

        let jumpRight = cc.jumpBy(0.12, cc.p(this.jumpLoc,0), 50,1);
        this.node.runAction(jumpRight);

     },

     OnLeft() {
        this.anim.play("Player_jump_Left");
        this.isJumping = true;
        let jumpLeft = cc.jumpBy(0.12, cc.p(-this.jumpLoc,0), 50,1);
        this.node.runAction(jumpLeft);
     },
     GetIsJumping() {
         return this.isJumping;
     },
     SetPlayerLoc(num) {
         this.PlayerLoc = num;
     },
     GetPlayerLoc() {
         return this.PlayerLoc;
     },

     onCollisionEnter: function (other, self){
          this.isOnPlatform = true;
          
     },
     onCollisionStay: function (other, self) {
         this.isOnPlatform = true;
    },

     CheckGameOver() {
         if(!this.isOnPlatform)
         {
             //cc.director.pause();
             this.node.dispatchEvent(new cc.Event.EventCustom("GameOver",true));
         }


 

     },



     update (dt) {
        if(this.GameScript.IsCountDownOver)
    {
        this.CheckGameOver();
        if(this.isJumping)
        {
        this.isOnPlatform = true;
        }
        else{
            this.isOnPlatform =false;
        }
    }


     },
});
