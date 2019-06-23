let nav = {
    Page: "Register",
    init: (ev)=>{
        SwipeMenus.init(ev);
        document.querySelectorAll(".Page").forEach((page)=>{
            page.classList.add("hidden")
        }); document.querySelector("nav").querySelectorAll("a").forEach((item)=>{item.addEventListener("click", nav.Go)});
        document.querySelector(`#${nav.Page}`).classList.remove("hidden");
    },
    Show: (ev)=>{
        console.log("clicked")
        document.querySelector(".options").classList.remove("active")
        SwipeMenus.SwipeClear();
        document.querySelector("nav").classList.toggle("active")
    },
    Hide: (ev)=>{
        console.log(ev.target)
        if(ev.target.classList.contains("Page")){
        document.querySelector(".options").classList.remove("active")
        document.querySelector("nav").classList.remove("active")
    }
        
    },
    Go: (ev)=>{
       let target = ev.target.classList; 
        document.querySelector('.Title').textContent = ev.target.textContent;
    document.querySelector(`#${nav.Page}`).classList.add("hidden"); document.querySelector(`#${target}`).classList.remove("hidden");
        nav.Page = target;
        document.querySelector("nav").classList.remove("active")
    }
}
let options = {
    Show: (ev)=>{
        console.log("clicked")
        document.querySelector("nav").classList.remove("active")
        document.querySelector(".options").classList.toggle("active")
    }  
}
let SwipeMenus = {
    clickOrigin : {x: 0, y: 0},
    clickCurrent : {x: 0, y: 0},
    init: (ev) =>{
        document.addEventListener("mousedown", SwipeMenus.swipeStart)
        document.addEventListener("touchstart", SwipeMenus.swipeStart)
    },
    swipeStart: (ev)=>{
        SwipeMenus.clickOrigin = SwipeMenus.InputTranslate(ev)
        SwipeMenus.clickCurrent = SwipeMenus.InputTranslate(ev)
        document.addEventListener("mousemove", SwipeMenus.swipeMove)
        document.addEventListener("touchmove", SwipeMenus.swipeMove)
        console.log(SwipeMenus.clickOrigin)
        
        document.addEventListener("mouseup", SwipeMenus.swipeComplete)
        document.addEventListener("touchend", SwipeMenus.swipeComplete)
    },
    swipeMove: (ev)=>{
        SwipeMenus.clickCurrent = SwipeMenus.InputTranslate(ev)
    },
    swipeComplete: (ev)=>{
        
        document.querySelector(".options").classList.remove("active")
        document.querySelector("nav").classList.remove("active")
        
        document.removeEventListener("mousemove", SwipeMenus.swipeMove)
        document.removeEventListener("touchmove", SwipeMenus.swipeMove)
        document.removeEventListener("mouseup", SwipeMenus.swipeComplete)
        document.removeEventListener("touchend", SwipeMenus.swipeComplete)
        let x = SwipeMenus.clickOrigin.x - SwipeMenus.clickCurrent.x
        console.log(x)
        console.log(window.innerWidth)
        console.log(x/window.innerWidth)
        if(x/window.innerWidth > 0.15){
            SwipeMenus.LeftSwipe()
        }else if(x/window.innerWidth < -0.15){
            SwipeMenus.RightSwipe()
        }
        SwipeMenus.clickOrigin = {x: 0, y: 0}
        SwipeMenus.clickCurrent = {x: 0, y: 0}
        
    },
    RightSwipe: ()=>{
        let Right = document.querySelector(".RightScreen")
        let Left = document.querySelector(".LeftScreen")
        if(Right.classList.contains("Active")){
            Right.classList.remove("Active")
        } else {
            Left.classList.add("Active")
        }
    },
    LeftSwipe: ()=>{
        let Right = document.querySelector(".RightScreen")
        let Left = document.querySelector(".LeftScreen")
        if(Left.classList.contains("Active")){
            Left.classList.remove("Active")
        } else {
            Right.classList.add("Active")
        }
        
    },
    SwipeClear: ()=>{
        let Right = document.querySelector(".RightScreen")
        let Left = document.querySelector(".LeftScreen")
            Left.classList.remove("Active")
            Right.classList.remove("Active")
        
    },
    InputTranslate: (ev)=>{
        if(ev.targetTouches && ev.targetTouches[0].clientX != 0){
            return {x: ev.targetTouches[0].clientX, y: ev.targetTouches[0].clientY}
        } else if(ev.clientX != 0){
            return {x: ev.clientX, y: ev.clientY}
        }
        
    }
}


        document.querySelector(".RightScreen").addEventListener("click", nav.SideTab)