
document.addEventListener('DOMContentLoaded',()=>{


    var input=document.querySelector('.input');
    var btn=document.querySelector("#btn");
    
    console.log(input);
    console.log(btn);
    
    
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
         input.style.color='green';
        console.log('Anything ');
    
        return false;
    })

})





