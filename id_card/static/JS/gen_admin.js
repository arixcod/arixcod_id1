//finding the element to check no of cards

document.addEventListener("DOMContentLoaded", () => {
  cards_tobe_gen = document.querySelector(".hlb-div-wrap-btn");
  next_gen_card_value = document.querySelector(".val-gen-cards");

  cards_tobe_gen.addEventListener("click", () => {
    request_item = next_gen_card_value.innerHTML.split(":")[1];

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }

      return cookieValue;
    }

    const csrftoken = getCookie("csrftoken");

    const canvas1 = document.getElementById("myCanvas1");
    const canvas = document.getElementById("myCanvas");
    const hlb_btn = document.querySelector(".hlb-div-wrap-btn");

    const canvas_la = new fabric.Canvas("myCanvas1", {
      width: 650,
      height: 350,
    });

    const canvas_landscape = new fabric.Canvas("myCanvas", {
      width: 650,
      height: 350,
    });

    const url = "http://arixcod.pythonanywhere.com/api/";
    const url_pdf = "http://arixcod.pythonanywhere.com/";
    json_data = { method: "create_cards" };
    
    let fetchData = {
      method: "POST",
      body: JSON.stringify(json_data),
      headers: new Headers({
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        "GML-method": "generate-card",
      }),
    };

    
    let promises = [];

    const body = document.querySelector("body");

     fetch(url, fetchData)
      .then((res) => res.json())
      .then((data) => {
        var pdf = new jsPDF("p", "mm", "a4");
        pageHeight = pdf.internal.pageSize.height;

        pageWeight = pdf.internal.pageSize.width;

        y = 92.6; // Height position of new content

        var len_pdf = data.length;


        for (var i = 0; i < len_pdf; i++) {
          promises.push(fetch(url_pdf + data[i]["pdf_adress"]));
        }

        Promise.all(promises).then((res) => {
          Promise.all(
            res.map((item) => {
              return item.json();
            })
          ).then((data) => {
            for (let i = 0; i < data.length; i++) {
                  //     console.log(yt)
                canvas_landscape.loadFromJSON(data[i], function () {
                let yt = i * 70;
                pageHeight = pdf.internal.pageSize.height;
                y = yt;
                canvas_landscape.renderAll();
                var imgData = canvas.toDataURL("image/jpeg", 1.0);
                if (y >= pageHeight) {
                  pdf.addPage();
                  y = 0; // Restart height position
                }
                pdf.addImage(imgData, "JPEG", 0, yt, 100, 65);
                if (i === data.length - 1) {
                  pdf.save("download.pdf");
                }
                canvas_landscape.clear();
                canvas_landscape.renderAll();
              });
            }
          });
        });

        // canvas_landscape.loadFromJSON(data, function(){
        // canvas_landscape.renderAll()
        // var imgData=canvas.toDataURL("image/jpeg", 1.0)

        // //  if (y >= pageHeight)
        // //              {
        // //             pdf.addPage();
        // //              y = 0 // Restart height position
        // //              }

        // pdf.addImage(imgData, "JPEG",0,i*(i+92),`alias${i+1}`, 'SLOW');

        // console.log(i)

        // canvas_landscape.clear()
        // canvas_landscape.renderAll()

        //   pdf.save("download.pdf");
      });
  });
});
