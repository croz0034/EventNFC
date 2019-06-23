let Items = [
    {
        ID: 0, 
        Name: "Item Name",
        Cost: 1,
        Cart: 0
    },
    {
        ID: 1, 
        Name: "Potion",
        Cost: 1,
        Cart: 0
    },
    {
        ID: 2, 
        Name: "Scroll",
        Cost: 1,
        Cart: 0
    },
    {
        ID: 3, 
        Name: "Amulet",
        Cost: 5,
        Cart: 0
    },
    {
        ID: 4, 
        Name: "Wand",
        Cost: 10,
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