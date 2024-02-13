//global Variabele

//keeping track of index of the textbox index


var index=0;



// this section is for the color selection picker
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }


});

    


//getting all the text editor component

const custom_font=document.querySelector('#font-family-custom');
const font_size=document.querySelector('.font-size-cu');
const font_type=document.querySelector('#font-Weight-cu');

// 
//straing with the creating canvas
//find the landscape and portrait modes


    const box1_color="#4DA3FF";
    const box2_color=" #FFE6AC";
    const def_area_width='500px';
    const def_area_height='300px';

    var isCanvasCreated=false;
//place to hold the canvas
const changing_template_area=document.querySelector('.template-sel');  
const landscape_mode=document.querySelector('.box1-landscape');
const portait_mode=document.querySelector('.box2-portrait');


portait_mode.addEventListener('click',(e)=>{
    changing_template_area.style.width='350px';
    changing_template_area.style.height='650px';
    portait_mode.style.background='red';
    landscape_mode.style.background=box2_color;

   canvas_atribute='portrait';
    //creating the landsacpe canvas here
   if(isCanvasCreated==false) {
    const portrait_canvas=document.createElement('canvas');   
    portrait_canvas.classList.add('landscape-canvas');
    portrait_canvas.setAttribute('id','landscape-canvas');  
    changing_template_area.appendChild(portrait_canvas);
    isCanvasCreated=true;  
}

 const canvas_landscape=new fabric.Canvas('landscape-canvas',{
    width:350,
    height:650,
   });

 canvas_landscape.renderAll()



//here activate and apply the methods custom Text Edits




 const inputFile=document.querySelector('.image-browse-type');
const imageUploadFile=document.querySelector('.select-image-btn');

imageUploadFile.addEventListener('click',()=>{
        inputFile.click();

})


inputFile.addEventListener('change',(e)=>{

img=e.target.files[0];
const reader=new FileReader();
 reader.onload=()=>{
            const imgUrl=reader.result;
            const image_img=document.createElement('img');
            image_img.src=imgUrl; 
            fabric.Image.fromURL(imgUrl,(img)=>{
            img.set({
                top:2,
                left:40,
            })
            img.scaleToHeight(560);
            img.scaleToWidth(300);    
            canvas_landscape.backgroundImage=img;
            canvas_landscape.renderAll(); 
    });              

  }
    
  reader.readAsDataURL(img);

});


});







/**
 * 
 *  This is the start for the landscape mode
 * 1. 2.
 * 2.3
 *
 * 
 * 
 */



















landscape_mode.addEventListener('click',()=>{

     changing_template_area.style.width='650px';
     changing_template_area.style.height='350px';
       // console.log(changing_template_area.offsetWidth);
        landscape_mode.style.background='red';
          portait_mode.style.background=box2_color;

    canvas_atribute='landscape';
     //creating the landsacpe canvas here
    if(isCanvasCreated==false) {
     const landscape_canvas=document.createElement('canvas');   
     landscape_canvas.classList.add('landscape-canvas');
     landscape_canvas.setAttribute('id','landscape-canvas');  
     changing_template_area.appendChild(landscape_canvas);
     isCanvasCreated=true;  
 }

    //finding the canvas to work with fabric JS

 const canvas_landscape=new fabric.Canvas('landscape-canvas',{
    width:650,
    height:350,  
    objectCaching:false,
   });

 canvas_landscape.renderAll()

// Adding the controls to delet the active object
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var img12 = document.createElement('img');
img12.src = deleteIcon;
img12.style.margin='12px'
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'orange';
fabric.Object.prototype.cornerStyle = 'circle';



 fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.6,
    y: -0.6,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });



  function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas_landscape = target.canvas;
        canvas_landscape.remove(target);
        canvas_landscape.requestRenderAll();
  }

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img12, -size/2, -size/2, size, size);
    ctx.restore();
  }
  


 //for the secondary Image


 const border_radius=document.querySelector('.input-border-radius');
 const imge_width=document.querySelector('.input-border-width');
 const image_height=document.querySelector('.input-border-height');

/*
fabric.util.loadImage(url, function(img) {
                     shape.set('fill', new fabric.Pattern({
                        source: img,
                        repeat: 'no-repeat',
                     }));
                  canvas_landscape.renderAll();
                });
              }
              var shape = new fabric.Rect({
                width: 300,
                height:300,
                rx:20,
                ry:20
                });
              canvas_landscape.add(shape);

*/

    imge_width.addEventListener('change',(e)=>{

    if(canvas_landscape.getActiveObject().type=='rect'){
        
            var image_width1=e.target.value;
            var img_source=canvas_landscape.getActiveObject().fill.source;
            var rect_height=canvas_landscape.getActiveObject().height;
            var rect_rx=  canvas_landscape.getActiveObject().rx;
            var rect_ry=canvas_landscape.getActiveObject().ry;


       // console.log(rect_height,rect_rx,rect_ry,image_width1);
       
       // canvas_landscape.remove(canvas_landscape.getActiveObject());     
        
        var shape = new fabric.Rect({
            width: image_width1,
            height:rect_height,
            rx:rect_rx,
            ry:rect_ry,
            });
          
            shape.set('fill',new fabric.Pattern({
                source:img_source,
                repeat: 'no-repeat',
            }))
            canvas_landscape.add(shape);

        
       //
        canvas_landscape.renderAll();    

    }
//        console.log(canvas_landscape.getActiveObject().rx)
});


image_height.addEventListener('change',(e)=>{

    if(canvas_landscape.getActiveObject().type=='rect'){
        
        var image_height=e.target.value;
        var img_source=canvas_landscape.getActiveObject().fill.source;
        var rect_width=canvas_landscape.getActiveObject().width;
        var rect_rx=  canvas_landscape.getActiveObject().rx;
        var rect_ry=canvas_landscape.getActiveObject().ry;
        
    canvas_landscape.remove(canvas_landscape.getActiveObject());     
   // console.log(rect_width,rect_rx,rect_ry);
     

         var shape = new fabric.Rect({
            width: rect_width,
            height:image_height,
            rx:rect_rx,
            ry:rect_ry,
            });
     //     console.log(shape);
            shape.set('fill',new fabric.Pattern({
                source:img_source,
                repeat: 'no-repeat',
            }))
            canvas_landscape.add(shape);

        
        // console.log(
        //     'init()___.self' +`:${border_radius},${canvas_landscape.getActiveObject()}`);
    
        canvas_landscape.renderAll();    

    

}
//        console.log(canvas_landscape.getActiveObject().rx)
});


border_radius.addEventListener('change',(e)=>{

    if(canvas_landscape.getActiveObject().type=='rect'){
        
        var border_radius=e.target.value;
        var img_source=canvas_landscape.getActiveObject().fill.source
        canvas_landscape.remove(canvas_landscape.getActiveObject());     
        
        var shape = new fabric.Rect({
            width: 300,
            height:300,
            rx:border_radius,
            ry:border_radius,
            });
          
            shape.set('fill',new fabric.Pattern({
                source:img_source,
                repeat: 'no-repeat',
            }))
            canvas_landscape.add(shape);

        
        // console.log(
        //     'init()___.self' +`:${border_radius},${canvas_landscape.getActiveObject()}`);
    
        canvas_landscape.renderAll();    

    }
//        console.log(canvas_landscape.getActiveObject().rx)
});



 
const custom_font=document.querySelector('#font-family-custom');
const font_size=document.querySelector('.font-size-cu');
const font_type=document.querySelector('#font-Weight-cu');


font_size.addEventListener('change',(e)=>{
    var font_size=e.target.value;
    canvas_landscape.getActiveObject().fontSize=font_size;
    canvas_landscape.renderAll();
})
custom_font.addEventListener('change',(e)=>{
    var get_font=e.target.value;
    canvas_landscape.getActiveObject().fontFamily=get_font;
    canvas_landscape.renderAll();
    //console.log(canvas_landscape.getActiveObject());

    // .setFontFamily(get_font);
})



font_type.addEventListener('change',(e)=>{
    var font_weight=e.target.value;
    canvas_landscape.getActiveObject().fontWeight=font_weight;
    canvas_landscape.getActiveObject().textdecoration=font_weight;
    canvas_landscape.renderAll();
});

//To set the custom font 

// changing the font color color 
pickr.on('change', (color, source, instance) => {   

    var activeObject = canvas_landscape.getActiveObject();
    activeObject.set('fill', color.toRGBA().toString());
  
    canvas_landscape.renderAll();
    //canvas_landscape.getActiveObject().fill=(color.toRGBA()[0],color.toRGBA()[1],color.toRGBA()[2]);
    //console.log('Event: "change"', color.toRGBA()[0],canvas_landscape.getActiveObject().fill);
});
    
// now adding the sample to canvas as background Image

const inputFile=document.querySelector('.image-browse-type');
const imageUploadFile=document.querySelector('.select-image-btn');

imageUploadFile.addEventListener('click',()=>{
        inputFile.click();

})


inputFile.addEventListener('change',(e)=>{

    img=e.target.files[0];
const reader=new FileReader();
 reader.onload=()=>{
            const imgUrl=reader.result;
            const image_img=document.createElement('img');
            image_img.src=imgUrl; 
            fabric.Image.fromURL(imgUrl,(img)=>{
            img.set({
                top:2,
                left:40,
            })
            img.scaleToHeight(300);
            img.scaleToWidth(560);    
            canvas_landscape.backgroundImage=img;
            canvas_landscape.renderAll(); 
    });              

  }
 reader.readAsDataURL(img);

});

//now adding the text box to the canvas 
const Textbox_add=document.querySelector('.text-add-btn');

Textbox_add.addEventListener('click',()=>{
    var itext = new fabric.IText("Add sample text here.",{
        fontSize: 20

     
    });
   
   
   
   
   
   
   
   
      // Set the properties
  

    // var selection = new fabric.ActiveSelection([itext], {
    //     canvas: canvas_landscape
    //   });
    //   canvas_landscape.setActiveObject(selection);
      

    //console.log(itext.aCoords);
    canvas_landscape.add(itext)
    canvas_landscape.renderAll();
    

    canvas_landscape.on('object:selected', function(options) {
        if (options.target) {
   //       console.log('selected',options.target.width,options.target.height, options.target.left,options.target.top);
          var selection=canvas_landscape.getActiveObject();
     //     console.log("this is the active object  "+selection);
         
        }
      });
    
    canvas_landscape.on('object:moving', function(options) {
        if (options.target) {
       //   console.log('an object was moving',options.target.width,options.target.height, options.target.left,options.target.top);
          var selection=canvas_landscape.getActiveObject();
         // console.log("this is the active object  "+selection);
         
        }
      });

      canvas_landscape.on('object:scaling', function(options) {
        if (options.target) {
        //  console.log('an object was moving',options.target.getScaledWidth(),options.target.getScaledHeight());
        }
      })
      
  
    // itext.on("mousedown",(e)=>{
    //  console.log( canvas_landscape.getObjects());
    
    // })

        

    //  console.log(itext)  
})


//adding the Image 
const secondary_input=document.querySelector('.custom-image-browse-type');
const secondary_image=document.querySelector('.custom-img-uploader');
//temp image holder

const temp_image_holder=document.querySelector('.abs-image-holder-cls');

secondary_image.addEventListener('click',(e)=>{
    secondary_input.click();
});


secondary_input.addEventListener('change',(e)=>{

    img=e.target.files[0];
    const reader=new FileReader();
     reader.onload=()=>{
            const imgUrl=reader.result;
            const image_img1=document.createElement('img');
            image_img1.src=imgUrl;
            temp_image_holder.appendChild(image_img1);
            image_img1.classList.add('temp-image') 
        
            //load Pattern
            function loadPattern(url) {
            
                fabric.util.loadImage(url, function(img) {  
                     shape.set('fill', new fabric.Pattern({
                        source: img,
                        repeat: 'no-repeat',
                     }));
                  canvas_landscape.renderAll();
                });
              }
              var shape = new fabric.Rect({
                width: 300,
                height:300,
                rx:20,
                ry:20
                });
              canvas_landscape.add(shape);

            loadPattern(imgUrl);
        }
 reader.readAsDataURL(img);
});


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

    
var json11;



// saving the canvas
 
const save_canvas=document.querySelector('.final-copy-create');
const resore_canvas=document.querySelector('.resore-copy-create');
const get_current_user=document.querySelector('.user-current-oo');
               
   
    save_canvas.addEventListener('click',(e)=>{
 
                //  here data of canvas is created and send to server using AJAX Calls
                json11=JSON.stringify(canvas_landscape);
                //Ajax starts here

                // const req=new XMLHttpRequest();
                // req.open('POST','http://127.0.0.1:8000/api/');
                // req.setRequestHeader('Content-Type','application/json')
                // req.addEventListener('load',()=>{
                //         if(req.status===201 && req.readyState===4){
                //             const res= JSON.parse(req.responseText);
                //             console.log(res);
                //         }

                //         else{
                //             throw new Error('Bad request !');
                //         }
                // });
                // req.send(json11);
               
               
               
               
                // console.log();
              
              
                var obj=JSON.parse(json11);
                obj.current_user_id=get_current_user.textContent
                json11=JSON.stringify(obj)
                 
                
                const url = 'http://arixcod.pythonanywhere.com/api/';

                let fetchData = {
                    method: 'POST',
                    body: JSON.stringify(json11),
                    headers: new Headers({
                      'Content-Type': 'application/json',
                      'X-CSRFToken':csrftoken
                    })
                  }
                  
                  fetch(url, fetchData).then(res=>res.json()).then(data=>console.log(data));


            });
    
    
    resore_canvas.addEventListener('click',()=>{
            
             //console.log('hello');

            // fetch('http://127.0.0.1:8000/api/',{
            //     method:'GET',
            //     headers: new Headers({
            //         'Content-Type': 'application/json',
            //         'user-id':get_current_user.textContent
            //       })
            // }).then(res=>res.json()).then(data=>console.log(data));
            
            fetch('http://arixcod.pythonanywhere.com/api/').then(res=>res.json()).then(data=>
            canvas_landscape.loadFromJSON(data));
            canvas_landscape.renderAll();
          })

})






//adding toggle of sidebar

const body = document.querySelector("body"),
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}


sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

