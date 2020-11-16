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
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#808080",                       // The color for this layer, which affects many elements.
        resource: "prestige points",            // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
    
        baseResource: "points",                 // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true }            // Returns a bool for if this layer's node should be visible in the tree.
    })