const desc1=document.querySelector(".what-we-do-desc");
const img1=document.querySelector(".what-we-do-img");
const how1=document.querySelector(".how-can-be-part-img1");
const how2=document.querySelector(".how-can-be-part-img2");
window.addEventListener("scroll",effect);
function effect()
{
    console.log("working");
    let h=desc1.getBoundingClientRect().top;
    let wh=window.innerHeight;
    if(wh>h)
    {
        desc1.classList.remove("push-left");
        img1.classList.remove("push-right");
    }
    else
    {
        desc1.classList.add("push-left");
        img1.classList.add("push-right");
    }
    let h1=how1.getBoundingClientRect().top;
    if(wh>h1)
    {
        how1.classList.remove("push1-left");
        how2.classList.remove("push1-right");
    }
    else
    {
        how1.classList.add("push1-left");
        how2.classList.add("push1-right");
    }
}