addLayer("c", {
    name: "Chunks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ch", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
	     update(diff) {
    player[this.layer].points = player.points.div(16).floor(); 
         },
    upgrades: {
    rows: 1, 
    cols: 4,
    11: {
	    Title: "Regular Walking",
        description: "Let go of Shift and walk normally",
        cost: new Decimal(5),
    },
    12: {
        Title: "Sprinting",
        description: "Double tap w or press ctrl",
        cost: new Decimal(15),
    },
    13: {
        Title: "Sprint Jumping",
    description: "I AM SPEED AND I AM A PARKOUR KING",
    cost: new Decimal(30),
    },
    14: {
        Title: "I found something",
        description: "Find a cave and unlock new layer content",
        cost: new Decimal(50),
    },
},
	    	    
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    row:0,
    layerShown:true,
    resource: "Chunks Loaded", // Name of prestige currency
    baseResource: "Chunks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    }})

    addLayer("M", {
        startData() { return {         
            buyableTimer: {
                11: 8,
                12: 0,
                13: 5,
                14: 0,
                15: 0,
              },        // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
        update(diff) {
            for (i=11;i<=15;i++) {
                player[this.layer].buyableTimer[i] = Math.max(player[this.layer].buyableTimer[i] - diff, 0);
              }
                 }, 
    
        color: "#808080",                       // The color for this layer, which affects many elements.
        resource: "Blocks Mined",            // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "points",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        buyables: {
            rows: 1,
            cols: 5,
            11: {
                title: "Wood",
                style: {
                    "background-color": "#D2691E"
                },
                cost(x) {return 0},
                display() {return `Amount: ${player[this.layer].buyables[this.id]} Cooldown: ${player[this.layer].buyableTimer[this.id]}`},
                canAfford() { return player[this.layer].buyableTimer[this.id] == 0 },
                buy() {
                    
                    timer = 5
                    player[this.layer].buyableTimer[this.id] = timer;
                    
                    player[this.layer].points = player[this.layer].points.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
            },

            12: {
                title: "Stone",
                style: {
                    "background-color": "#808080"
                },
                cost(x) {return 0},
                display() {return `Amount: ${player[this.layer].buyables[this.id]} Cooldown: ${player[this.layer].buyableTimer[this.id]}`},
                canAfford() { return player[this.layer].points.gte(this.cost()) },
                buy() {
                    player[this.layer].points = player[this.layer].points.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
            },

            13: {
                title: "Iron",
                style: {
                "background-color": "#FFFFFF"
                },
                cost(x) {return 0},
                display() {return `Amount: ${player[this.layer].buyables[this.id]} Cooldown: ${player[this.layer].buyableTimer[this.id]}`},
                canAfford() { return player[this.layer].points.gte(this.cost()) },
                buy() {
                    timer = 5;
                    player[this.layer].buyableTimer[this.id] = timer;
                    player[this.layer].points = player[this.layer].points.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
            },
            14: {
                title: "Gold",
                style: {
                    "background-color": "#FFFF00"
                },
                cost(x) {return 0},
                display() {return `Amount: ${player[this.layer].buyables[this.id]} Cooldown: ${player[this.layer].buyableTimer[this.id]}`},
                canAfford() { return player[this.layer].points.gte(this.cost()) },
                buy() {
                    player[this.layer].points = player[this.layer].points.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))     
                },
            },
            15: {
                title: "Diamond",
                style: {
                "background-color": "#00FFFF"
                },
                cost(x) {return 0},
                display() {return `Amount: ${player[this.layer].buyables[this.id]} Cooldown: ${player[this.layer].buyableTimer[this.id]}`},
                canAfford() { return player[this.layer].points.gte(this.cost()) },
                buy() {
                    player[this.layer].points = player[this.layer].points.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))     
                },
            },
        },

        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() {
            if(hasUpgrade("c", 11)) return true;
            return false;
        }            // Returns a bool for if this layer's node should be visible in the tree.
    }),

    addLayer("T", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#D2691E",                       // The color for this layer, which affects many elements.
        resource: "Crafting Table",            // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "Unique Items Crafted",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() {
            if(hasUpgrade("c", 14)) return true;
            return false;
        }            // Returns a bool for if this layer's node should be visible in the tree.
    })

    addLayer("e", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#9400D3",                       // The color for this layer, which affects many elements.
        resource: "Enchantments",            // The name of this layer's main prestige resource.
        row: 2,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "enchantments done",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true }            // Returns a bool for if this layer's node should be visible in the tree.
    })

    addLayer("F", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#006400",                       // The color for this layer, which affects many elements.
        resource: "Mobs",            // The name of this layer's main prestige resource.
        row: 2,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "Mobs Slain",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true }            // Returns a bool for if this layer's node should be visible in the tree.
    })

    addLayer("P", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#FFFFFF",                       // The color for this layer, which affects many elements.
        resource: "Potions",            // The name of this layer's main prestige resource.
        row: 2,
        position: 1,
    
        baseResource: "Potions Made",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true }            // Returns a bool for if this layer's node should be visible in the tree.
    })

    addLayer("B", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#000000",                       // The color for this layer, which affects many elements.
        resource: "Bosses",            // The name of this layer's main prestige resource.
        row: 3,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "Bosses Slain",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "none",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true }            // Returns a bool for if this layer's node should be visible in the tree.
    })