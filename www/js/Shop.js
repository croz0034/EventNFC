let Items = [
    {
        ID: 0, 
        Name: "Blessing against Wounds",
        Cost: 2,
        Cart: 0
    },
    {
        ID: 1, 
        Name: "Harden",
        Cost: 5,
        Cart: 0
    },
    {
        ID: 2, 
        Name: "Barkskin",
        Cost: 5,
        Cart: 0
    },
    {
        ID: 3, 
        Name: "Imbue Armour",
        Cost: 5,
        Cart: 0
    },
    {
        ID: 4, 
        Name: "Corrosive Mist",
        Cost: 5,
        Cart: 0
    },
    {
        ID: 5, 
        Name: "Gift of Earth",
        Cost: 10,
        Cart: 0
    },
    {
        ID: 6, 
        Name: "Adaptive Blessing",
        Cost: 4,
        Cart: 0
    },
    {
        ID: 7, 
        Name: "Poison",
        Cost: 4,
        Cart: 0
    },
    {
        ID: 8, 
        Name: "Bear Strength",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 9, 
        Name: "Adaptive Protection",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 10, 
        Name: "Greater Harden",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 11, 
        Name: "Wand of Dispel",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 12, 
        Name: "Stone Skin",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 13, 
        Name: "Gift of Fire",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 14, 
        Name: "Regeneration",
        Cost: 15,
        Cart: 0
    },
    {
        ID: 15, 
        Name: "Blessing Against Harm",
        Cost: 20,
        Cart: 0
    },
    {
        ID: 16, 
        Name: "Imbue Shield",
        Cost: 20,
        Cart: 0
    },
    {
        ID: 17, 
        Name: "Protection From Projectiles",
        Cost: 20,
        Cart: 0
    },
    {
        ID: 18, 
        Name: "Flame blade",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 19, 
        Name: "Gift of Water",
        Cost: 20,
        Cart: 0
    },
    {
        ID: 20, 
        Name: "Lycanthropy",
        Cost: 20,
        Cart: 0
    },
    {
        ID: 21, 
        Name: "Blessed Aura",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 22, 
        Name: "Enlightened Soul",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 23, 
        Name: "Iron Skin",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 24, 
        Name: "Trolls Blood",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 25, 
        Name: "Poison Glands",
        Cost: 25,
        Cart: 0
    },
    {
        ID: 26, 
        Name: "Protection From Magic",
        Cost: 30,
        Cart: 0
    },
    {
        ID: 27, 
        Name: "Phoenix Tears",
        Cost: 30,
        Cart: 0
    },
    {
        ID: 28, 
        Name: "Ancestral Armour",
        Cost: 35,
        Cart: 0
    },
    {
        ID: 29, 
        Name: "Imbue Weapon",
        Cost: 30,
        Cart: 0
    }
]

let Shop = {
    ItemSelect: "",
    TotalCost: "",
    init: ()=>{
        let storeFront = document.querySelector(".StoreFront")
        Items.forEach((Item)=>{
            let additions = document.createElement("div")
            additions.innerHTML = `
            <p id="${Item.ID}" class="ShopItem" ><span id="Cost"> ${Item.Cost}</span> ${Item.Name} <span id="Cart"> ${Item.Cart} </span></p>`
            additions.addEventListener("click", Shop.OpenPicker)
            storeFront.appendChild(additions)
        });
        
        document.getElementById("ClosePicker").addEventListener('click', Shop.ClosePicker);
        document.querySelector("#ItemPlus").addEventListener('click', Shop.ItemPlus)
        document.querySelector("#ItemMinus").addEventListener('click', Shop.ItemMinus)
        document.getElementById("SaveValue").addEventListener('click', Shop.SaveValue)
    },
    OpenPicker: (ev)=>{
        document.querySelector(".SalesPicker").classList.remove("hidden")
        Shop.ItemSelect = ev.target.id;
        document.querySelector("#ItemName").textContent = Items[Shop.ItemSelect].Name;
        document.querySelector("#ItemCost").textContent = Items[Shop.ItemSelect].Cost;
        document.querySelector("#ItemCart").value = Items[Shop.ItemSelect].Cart
    },
    ClosePicker: (ev)=>{
        document.querySelector(".SalesPicker").classList.add("hidden")
    },
    ItemPlus: (ev)=>{
        document.querySelector("#ItemCart").value = parseInt(document.querySelector("#ItemCart").value) + 1
    },
    ItemMinus: (ev)=>{
        document.querySelector("#ItemCart").value = document.querySelector("#ItemCart").value - 1
    },
    SaveValue: (ev)=>{ document.getElementById(Shop.ItemSelect).querySelector("#Cart").textContent = document.getElementById("ItemCart").value;
        console.log(document.getElementById("ItemCart").value)
        
        Items[Shop.ItemSelect].Cart = document.getElementById("ItemCart").value;
        console.log(Items)
        
        Shop.TotalCost = 0;
        Items.forEach((option)=>{
            console.log(option)
            Shop.TotalCost += option.Cost * option.Cart
        })
        
        document.querySelector("#shopPrice").textContent = `Price: ${Shop.TotalCost}`;
        
        Shop.ClosePicker(ev);
    }
}