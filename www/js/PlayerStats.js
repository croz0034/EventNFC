let EventLifeCycle = {
    Players: {},
    BaseTeams: [],
    CurrentTeams: [],
    PlayerScan: (ev) => {
        EventLifeCycle.RightPannel();

        EventLifeCycle.Players[CurrentCard.ID] = CurrentCard.EventStats;
        if (!EventLifeCycle.BaseTeams.includes(CurrentCard.EventStats.Team)) {
            EventLifeCycle.BaseTeams.push(CurrentCard.EventStats.Team);
            EventLifeCycle.CurrentTeams.push(CurrentCard.EventStats.Team);

            let additions = document.createElement("h4");
            additions.textContent = CurrentCard.EventStats.Team
            additions.addEventListener("click", EventLifeCycle.MinimizeTeam);
            document.querySelector("#TeamsList").appendChild(additions)

            additions = document.createElement("p");
            additions.id = CurrentCard.EventStats.Team;
            document.querySelector("#TeamsList").appendChild(additions)

            additions = document.createElement("div");
            additions.classList.add(CurrentCard.EventStats.Team);
            document.querySelector("#TeamsList").appendChild(additions)

            let player = document.createElement("p");
            player.textContent = `${CurrentCard.EventStats.Name} : ${CurrentCard.EventStats.Points}`
            additions.appendChild(player)
            
            
            
        let team1 = document.querySelector("#MergeSlot1");
            team1.innerHTML += `<option value=${CurrentCard.EventStats.Team} > ${CurrentCard.EventStats.Team} </option>`
        let team2 = document.querySelector("#MergeSlot2");
            team2.innerHTML += `<option value=${CurrentCard.EventStats.Team} > ${CurrentCard.EventStats.Team} </option>`

        } else {
            EventLifeCycle.LeftPannel()
        }


    },
    RightPannel: () => {
        document.querySelector("#CardId").textContent = CurrentCard.ID;
        document.querySelector("#CardEventData").innerHTML = "";
        document.querySelector("#CardEventData").innerHTML = `
        <li> Team: ${CurrentCard.EventStats.Team} </li>
        <li> Name: ${CurrentCard.EventStats.Name} </li>
        <li> Gold: ${CurrentCard.EventStats.Gold} </li>
        <li> Points: ${CurrentCard.EventStats.Points} </li>
        <p> Items </p>`;
        Object.keys(CurrentCard.EventStats.Inventory).forEach((item) => {
            document.querySelector("#CardEventData").innerHTML += `<li> ${item}: ${CurrentCard.EventStats.Inventory[item]} </li>`
        });

        document.querySelector("#CardOtherData").innerHTML = "";
        CurrentCard.TextItems.forEach((item) => {
            document.querySelector("#CardOtherData").innerHTML +=
                `<li> ${item} </li>`
        })
    },
    LeftPannel: () => {
        let TeamStats = {}
        let x = 0;
        EventLifeCycle.CurrentTeams.forEach((team) => {
            document.querySelector(`.${team}`).innerHTML = "";
            TeamStats[x] = {
                Players: 0,
                Points: 0,
                Team: team
            };
            x++;
        });
        Object.keys(EventLifeCycle.Players).forEach((player) => {
            player = EventLifeCycle.Players[player]
            let additions = document.createElement("p");
            additions.textContent = `${player.Name} : ${player.Points}`
            document.querySelector(`.${player.Team}`).appendChild(additions)

            console.log(TeamStats)
            TeamStats = EventLifeCycle.TeamCheck(player, TeamStats);
            console.log(TeamStats)
        })

        x = 0;
        EventLifeCycle.CurrentTeams.forEach((team) => {
            if (Array.isArray(team)) {
                team = team[0]
            }
            let additions = document.getElementById(team);
            additions.textContent = `total: ${TeamStats[x].Players} players, ${TeamStats[x].Points} points`;
            x++
        });
    },
    MinimizeTeam: (ev) => {
        document.querySelector(`.${ev.target.info}`).classList.toggle("hidden")
    },
    TeamCheck: (Player, TeamStats) => {
        console.log(TeamStats)
        Object.keys(TeamStats).forEach((Group) => {
            console.log(Group);
            console.log(Player);
            console.log(TeamStats)
            if (TeamStats[Group].Team.includes(Player.Team)) {
                TeamStats[Group].Players++;
                TeamStats[Group].Points = parseInt(TeamStats[Group].Points) + parseInt(Player.Points);
            }
        })
        return TeamStats

    },
    MergeTeams: () => {
        let team1 = document.querySelector("#MergeSlot1").value;
        let team2 = document.querySelector("#MergeSlot2").value;
        if (team1 && team2) {
            document.querySelector("#TeamsList").innerHTML = "";
            let newTeam = []
            let Kill = false
           let x = 0
            EventLifeCycle.CurrentTeams.forEach((Team)=>{
                if(Team.includes(team1) || Team.includes(team2)){
                if(Array.isArray(Team)){
                    Team.forEach((baseTeam)=>{newTeam.push(baseTeam)})
                } else {
                    newTeam.push(Team)
                }
                    if(!Kill){ Kill = [x]} else {Kill.push(x)}
                }
                x ++
            })
            if(Kill[0] > Kill [1]){
         EventLifeCycle.CurrentTeams.splice(Kill[0], 1)
         EventLifeCycle.CurrentTeams.splice(Kill[1], 1)
            }else{
         EventLifeCycle.CurrentTeams.splice(Kill[1], 1)
         EventLifeCycle.CurrentTeams.splice(Kill[0], 1)
            }
         EventLifeCycle.CurrentTeams.push(newTeam)
        };
        
        console.log(EventLifeCycle.CurrentTeams)
        document.querySelector("#MergeSlot1").innerHTML = '<option value="">Team 1</option>';
        
        document.querySelector("#MergeSlot2").innerHTML = '<option value="">Team 2</option>';
        
        EventLifeCycle.CurrentTeams.forEach((Team)=>{
            let teamName;
            Array.isArray(Team)? teamName = Team[0]: teamName = Team;
            
             let additions = document.createElement("h4");
            additions.textContent = teamName
            additions.addEventListener("click", EventLifeCycle.MinimizeTeam);
            document.querySelector("#TeamsList").appendChild(additions)

            additions = document.createElement("p");
            additions.id = teamName;
            document.querySelector("#TeamsList").appendChild(additions)

            additions = document.createElement("div");
            if(Array.isArray(Team)){
                Team.forEach((baseTeams)=>{
                    additions.classList.add(baseTeams)
                })
            } else {
            additions.classList.add(Team);
            }
            document.querySelector("#TeamsList").appendChild(additions)
            
         document.querySelector("#MergeSlot1").innerHTML += `<option value=${teamName} > ${teamName} </option>`
        document.querySelector("#MergeSlot2").innerHTML += `<option value=${teamName} > ${teamName} </option>`
        });
    
        EventLifeCycle.LeftPannel()
    }
}
