window.addEventListener('load',init,false);

function init(){

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');




var l = m = i = j = k = 0;

for(i=0;i<=255;i++){

for(j=0;j<=255;j++){

for(k=0;k<=255;k++){

ctx.fillStyle = "rgb("+i+","+j+","+k+")";
ctx.beginPath();
ctx.arc(l,m,0.5,0,2*Math.PI);
ctx.fill();

l++;

if(l>800){
m++;
l=0;
}

}
}
}

}