// here for making the rquest to server to make th cards

document.addEventListener('DOMContentLoaded',()=>{

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    
    
    const create_cards = document.querySelector('.create-cards-with-js-all');
    const url = 'http://arixcod.pythonanywhere.com/api/';
    json_data={'method':'create_cards'};
    create_cards.addEventListener('click',(e)=>{
            e.preventDefault();
            let fetchData = {
                method: 'POST',
                body:JSON.stringify(json_data),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'X-CSRFToken':csrftoken,
                  'M-method':'create_cards',
                })
              }
              
              fetch(url, fetchData).then(res=>res.json()).then(data=>
                
              {  if(data=='NO new Data Available'){
                console.log("data to Anne do")
            
                        alert('New Data not Available');
                }
                console.log(data)
             } );
    
    
        });
    



})
      
