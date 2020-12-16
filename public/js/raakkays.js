let taustakuva;
let kissakuva;
let taustan_korkeus = 735;
let taustan_leveys = 1575;

let lautan_leveys = 150;
let lautanY = 685;

var kissalista = [];
var timer;
var lost_liver = 1;
var saved_livers = 0;



function preload() {
  taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
}

function setup(){
  var canvas = createCanvas(taustan_leveys, taustan_korkeus);
  canvas.parent("kissan_raakkays_peli");
  angleMode(DEGREES);
  //luo_kissoja();
}

function AloitaPeli()
{
 kissalista = [];
 lost_liver = 9
 saved_livers = 0
 clearTimeout(timer);
 loop();
 luo_kissoja();

}


function draw(){
  image(taustakuva,0,0,taustan_leveys,taustan_korkeus);
  Luo_lautta();

  kissalista.forEach(function(kissa_olio,monesko) {
    kissa_olio.move();

    if(kissa_olio.Ypos > taustan_korkeus)
    {
      kissalista.splice(monesko,1);
      lost_liver = lost_liver -1;
    }

    if(kissa_olio.Xpos > taustan_leveys)
    {
      kissalista.splice(monesko,1);
      saved_livers = saved_livers +1;
    }

  });
  textSize(40);
  textAlign(LEFT,TOP);
  text("Livers  " + lost_liver + "\nSaved livers  " + saved_livers,5,5);

  if(lost_liver <= 0) {
    GameOver();
  }
}

 function Luo_lautta(){
   fill('#ffe6e6')
   rect(mouseX, taustan_korkeus -50, lautan_leveys,30,20,20,0,0)

 }


 function luo_kissoja(){
   let uusi_kisu = new Kissa();
   kissalista.unshift(uusi_kisu);
   ry = Math.floor(Math.random() * 600) + 100; 
   timer = setTimeout(luo_kissoja,2000);

 }




class Kissa {
  constructor() {
    this.Xpos = 0;
    this.Ypos = ry;
    this.Xspe = 2;
    this.Yspe = -2;
    this.Height = 50;
    this.Wih = 50;
    this.Angle = 0;
    this.Rotation_speed = 10;
  }
  move(){
    this.Xpos = this.Xpos + this.Xspe
    this.Yspe = this.Yspe + 0.05;


    // tähän tulee osuiko kissa lautaan
    if(this.Ypos + this.Height / 2 > lautanY)
    {
      if(this.Xpos > mouseX && this.Xpos < mouseX + lautan_leveys)
      {
        this.Yspe = -abs(this.Yspe);
      }
    }
    this.Ypos = this.Ypos + this.Yspe;

    this.Angle = this.Angle + this.Rotation_speed;
    push();
    translate(this.Xpos,this.Ypos);
    rotate(this.Angle);
    imageMode(CENTER);
    image(kissakuva,0,0,this.Wih,this.Height);
    pop();
  }
}
function GameOver()
{
  noLoop();
  textSize(80);
  fill(255,0,0,170);
  textAlign(CENTER);
  text("Game Over", taustan_leveys/2,taustan_korkeus/2)
}
