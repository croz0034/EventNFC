var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        nav.init();
        Tap.init();
        Shop.init();
        document.querySelector("#MergeButton").addEventListener("click", EventLifeCycle.MergeTeams)
        document.querySelectorAll("#Write").forEach((Button)=>{Button.addEventListener("click", app.WriteToggle)});
        document.querySelector(".Burger").addEventListener('click', nav.Show);
        document.querySelector(".Option").addEventListener('click', options.Show);
        document.querySelectorAll(".Page").forEach((page)=>{
            page.addEventListener("click", nav.Hide)
        });
        
    },
    
    WriteToggle: (ev)=>{
        console.log(Tap.TapMode)
        if(Tap.TapMode != "Write"){
        console.log("Write")
            Tap.TapMode = "Write"
            let button = document.querySelector("#Write");
            button.textContent = "Write Mode"
            button.style.background = "darkgray";
            button.style.borderStyle = "inset"
        } else {
        console.log("Read")
            Tap.TapMode = "Read"
            let button = document.querySelector("#Write");
            button.textContent = "Read Mode"
            button.style.background = "lightgray"
            button.style.borderStyle = "outset"
        }
    
}
}


let Data = {
    Update: ()=>{
        if(nav.Page == "Reward"){
        let Rewards = app.Page("Reward");
        CurrentCard.EventStats.Gold = CurrentCard.EventStats.Gold + Rewards.querySelector("#Gold").value;
        CurrentCard.EventStats.Points = CurrentCard.EventStats.Points + Rewards.querySelector("#Points").value;}
        if(nav.Page == "Shop"){
        }
    }
}
//app.initialize();
document.addEventListener("DOMContentLoaded", app.receivedEvent)