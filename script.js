function scroll(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
scroll()

function cursorEffect(){
var page1Content = document.querySelector("#page1-content")
var cursor = document.querySelector("#cursor")

page1Content.addEventListener("mousemove",function(dets){
    gsap.to(cursor,{
        x:dets.x,
        y:dets.y
    })
    
})

page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })

})


page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale:0,
        opacity:0
    })
})
}

function h1(){
  gsap.from("#page1 h1",{
  y:100,
  opacity: 0,
  delay:0.8,
  duration:0.4,
  stagger:0.3
})
}
h1()
cursorEffect()


function effect(){
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#page2 p", {
  y: 100,
  opacity: 0,
  duration: 0.6,
  stagger: 0.3,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",   // Match Locomotive's container
    start: "top 80%",
         // ✅ This ensures it only runs once
  }
});

}
effect()

function menuAnimation(){
  
var menu = document.querySelector("nav h3")
var full = document.querySelector("#full-scr")
var head = document.querySelector("nav h2")
var flag = 0
menu.addEventListener("click",function(){
  if(flag == 0){
  full.style.top = 0
  head.style.opacity = 0 
  flag = 1
  }else{
    full.style.top = "-400%"
    head.style.opacity = 1 
    flag = 0
  }

})

document.querySelectorAll('#full-div1 a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 0
        },
        duration: 0.5,
        ease: "power2.inOut" // slow > fast > slow
      });

      // Optional: Close menu after scroll
      document.querySelector("#full-scr").style.top = "-100%";
      document.querySelector("nav h2").style.opacity = 1;
    }
  });
});



}
menuAnimation()

function load(){
  
var loader = document.querySelector("#loader");
setTimeout(function () {
  loader.style.top = "-100%";
}, 4000);

const text = "Let's Capture Your Memories ...";
const typeElement = document.getElementById("typewriter");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typeElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100); // speed of typing
  }
}

window.addEventListener("load", typeWriter);


}
load()
