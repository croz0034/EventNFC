let Tap = {
    Failed: false,
    TapMode: "Read",
    init: () => {
        setTimeout(() => {
            nfc.addNdefListener(Tap.Discovered, Tap.Win, Tap.Lose)
        }, 200);
    },
    Win: () => {
        console.log("Listening for NFC Tags")
    },
    Lose: () => {
        console.log("Error adding NFC listener")
    },

    Discovered: (nfcEvent) => {
        console.log(Tap.TapMode)
        if (Tap.TapMode == "Read") {
            Tap.Read(nfcEvent)
        } else if (Tap.TapMode == "Write") {
            if (!Tap.Failed) {
                Tap.Read(nfcEvent);
            }
            Tap.Write(nfcEvent);
        }
    },
    Read: (nfcEvent) => {

        CurrentCard = {
            ID: "",
            TextItems: [],
            EventStats: EventStatsBase
        };
        var tag = nfcEvent.tag.ndefMessage;
        if (!tag) {
            return null
        }
        for (let i = 0; i < tag.length; i++) {
            Tap.Decode(tag[i].payload, tag[i].type)
        }
        CardWindows.ReadWindow();
    },
    Write: (nfcEvent) => {

        let WriteValue = CurrentCard.EventStats;
        console.log(WriteValue)
        if(!Tap.Failed){
        if (nav.Page == "Register") {
            WriteValue.Name = document.querySelector("#Name").value
            WriteValue.Team = document.querySelector("#Team").value
            WriteValue.Gold = document.querySelector("#Register").querySelector("#Gold").value
            WriteValue.Points = document.querySelector("#Register").querySelector("#Points").value
            console.log(WriteValue)
        }
        if (nav.Page == "Reward") {
            let Gold = parseInt(document.querySelector("#Reward").querySelector("#Gold").value)
            if(isNaN(Gold)){Gold = 0 }
           let Points = parseInt(document.querySelector("#Reward").querySelector("#Points").value)
            if(isNaN(Points)){Points = 0 }
            
            WriteValue.Gold = parseInt(WriteValue.Gold) + Gold;
            WriteValue.Points = parseInt(WriteValue.Points) + Points
            
            
            if(document.querySelector(".Consume")){
                document.querySelectorAll(".Consume").forEach((item)=>{
                console.log(CurrentCard.EventStats.Inventory)
                console.log(CurrentCard.EventStats.Inventory[item])
                WriteValue.Inventory[item.classList[1]] = item.value;
                    console.log(item.classList)
                    console.log(item.classList[1])
                })
            }
            console.log(WriteValue)
        }
        if (nav.Page == "Shop") {
            let totalCost = Shop.TotalCost;
            if (WriteValue.Gold >= totalCost) {
                if(!WriteValue.Inventory){
                    WriteValue.Inventory = {};
                }
                Items.forEach((item) => {
                    if (!WriteValue.Inventory[item.Name] && item.Cart) {
                        WriteValue.Inventory[item.Name] = 0;
                    }
                    if (item.Cart > 0) {
                        WriteValue.Inventory[item.Name] = 
                            parseInt(item.Cart) + parseInt(WriteValue.Inventory[item.Name]);
                    };
                })
                WriteValue.Gold = parseInt(WriteValue.Gold) - parseInt(totalCost);
            } else {
                alert("insufficient Funds");
                return
            }
        }
}
        
        var message = [];
        if (CurrentCard.ID) {
            let ID = CurrentCard.ID
            let WebSite = document.getElementById("Website").value;
            if (WebSite == "ORK") {
                message.push(ndef.uriRecord(`https://amtgard.com/ork/orkui/index.php?Route=Player/index/${CurrentCard.ID}`))
            } 
            else { 
                message.push(ndef.uriRecord(`https://croz0034.github.io/ProjectDragon#name=${CurrentCard.EventStats.Name}&&ID=${CurrentCard.ID}`))
            }
        }
        if (CurrentCard.TextItems.length > 0) {
            CurrentCard.TextItems.forEach((item) => {
                message.push(ndef.textRecord(item))
            })
        }
        
        message.push(ndef.textRecord(`Event=${JSON.stringify(WriteValue)}`))
        console.log(WriteValue)
        console.log(CurrentCard)
        nfc.write(message, Tap.WrittenMsg, Tap.FailedMsg)
    },
    Decode: (CharArray, tagtype) => {
        let text = String.fromCharCode.apply(null, CharArray);
        tagtype = String.fromCharCode(tagtype);
        console.log(tagtype)
        if (tagtype == "T") {
            let arrival = text.replace("\u0002en", "")
            if (arrival.split("=")[0] == "Event") {
                CurrentCard.EventStats = JSON.parse(arrival.split("=")[1])
            } else {
                CurrentCard.TextItems.push(arrival);
            }
        } else {
            if (text.includes("&&")) {
                CurrentCard.ID = text.split("ID=")[1];
            } else {
                CurrentCard.ID = text.split("/").pop();
            }
            console.log(CurrentCard.ID)
        }

    },
    WrittenMsg: () => {
        alert("Sucessfull Write");
        let Consumables = document.getElementById("Consumables");
            Consumables.innerHTML = "";
        Tap.Failed = false;
        CardWindows.ReadWindow();
    },
    FailedMsg: () => {
        Tap.Failed = true;
        alert("Something went wrong")
    }
}
let CurrentCard = {
    ID: "",
    TextItems: [],
    EventStats: {
        Name: "",
        Team: "",
        Gold: "",
        Points: "",
        Inventory: {}
    }
};
let EventStatsBase = {
    Name: "",
    Team: "",
    Gold: "",
    Points: "",
    Inventory: {}
};


let CardWindows = {
    ReadWindow: () => {
        console.log(CurrentCard)
        if((Tap.TapMode == "Write" && nav.Page == "Register") || (!CurrentCard.EventStats.Name && !CurrentCard.EventStats.Team && !CurrentCard.EventStats.Gold && !CurrentCard.EventStats.Points)){
            return
        } else {
        document.getElementById("Register").querySelector("#Name").value = CurrentCard.EventStats.Name
        document.getElementById("Register").querySelector("#Team").value = CurrentCard.EventStats.Team
        document.getElementById("Register").querySelector("#Gold").value = CurrentCard.EventStats.Gold
        document.getElementById("Register").querySelector("#Points").value = CurrentCard.EventStats.Points
        document.querySelector("#shopGold").textContent = `Gold: ${CurrentCard.EventStats.Gold}`;
            
        if(Tap.TapMode != "Write"){
                if(Object.keys(CurrentCard.EventStats.Inventory)){
            let Consumables = document.getElementById("Consumables");
            Consumables.innerHTML = "";
            
            Object.keys(CurrentCard.EventStats.Inventory).forEach((item)=>{
                console.log(CurrentCard.EventStats.Inventory)
                console.log(CurrentCard.EventStats.Inventory[item])
                Consumables.innerHTML += `
            <p>${item}: <input class="Consume ${item}" type="number" max="${parseInt(CurrentCard.EventStats.Inventory[item])}" value="${parseInt(CurrentCard.EventStats.Inventory[item])}" /></p>`
            })
        }      } 
            
        
            
            EventLifeCycle.PlayerScan();
        }
        
        
    },
    WriteWindow: () => {

    }

}
