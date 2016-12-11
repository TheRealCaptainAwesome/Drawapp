
let canvas : any = document.getElementById('canvas-draw');
let ctx = canvas.getContext('2d');
let draw = false;
let positionX = new Array();
let positionY = new Array();
let mouseDrag = new Array();
let rect = canvas.getBoundingClientRect();
let canvasDiv : any = document.getElementById('canvas'); 
let button : any = document.getElementsByTagName('button');



canvas.width = canvasDiv.offsetWidth;
canvas.height = canvasDiv.offsetHeight;


function drawPosition(x, y, movement) {
    positionX.push(x);
    positionY.push(y);
    mouseDrag.push(movement);
}


function buttonEvents () {

            Array.from(button).forEach( d => {
                d.addEventListener('click', () => {
                    Array.from(button).forEach((y) => {
                       y.classList.remove('selected'); 
                    });
                    event.target.classList.add("selected");
                    });
             });
        
             
        
}


function redraw () {
    // Clear the canvas
    ctx.clearRect(0, 0, ctx.width, ctx.height);



    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;

    for( let i = 0; i < positionX.length; i++) {
        ctx.beginPath();

        if(mouseDrag[i] && i) {
            ctx.moveTo(positionX[i-1], positionY[i-1]);
        } else {
            ctx.moveTo(positionX[i]-1, positionY[i]);
        }

        ctx.lineTo(positionX[i], positionY[i]);
        ctx.closePath();
        ctx.stroke();
    }

}



 // Event listeners
        canvas.addEventListener("mousedown", e => {

            draw = true;
            drawPosition(e.pageX  - rect.left, e.pageY - rect.top);
            redraw();
        }); 

        canvas.addEventListener("mousemove", e => {
            
            if (draw) {
                drawPosition(e.pageX - rect.left, e.pageY - rect.top, true);
                redraw();
            }
        });

        canvas.addEventListener("mouseup", e => {
            draw = false;
        });

        canvas.addEventListener("mouseleave", e => {
            draw = false;
        });

        buttonEvents();