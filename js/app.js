new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[]
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        AttackBtn: function () {
            // alert('click attack');
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster for ' + damage
            })
            if (this.checkWining()){
                return;
            }
            this.monsterAttack();
            this.checkWining();
        },
        SAttackBtn: function () {
            // alert('click special attack');
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster hard !!!for ' + damage
            })
            if (this.checkWining()){
                return;
            }
            this.monsterAttack();
            this.checkWining();
        },
        HealBtn: function () {
            this.heal();
        },
        Give_upBtn: function () {
            this.gameIsRunning = false;
        },
        monsterAttack:function(){
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits Player for ' + damage
            })
            this.checkWining()
        },
        heal:function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth =100;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals for : ' + 10
            })
            this.monsterAttack();
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWining: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won ! New game ?')) {
                    this.startGame();
                } else {

                    this.gameIsRunning = false;
                }
                return true;

            } else if (this.playerHealth <= 0) {
                if (confirm('You lost ! new game ?')) {
                    this.startGame();
                } else {

                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})