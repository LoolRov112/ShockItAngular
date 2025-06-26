import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  maayan = {
  name: "Maayan",
  email:"mayan.yehuda@gmail.com",
  id:"315833301",
  img: "/assets/images/maayan.jpg"
}
harel = {
  name:"Harel",
  email:"rovharel@gmail.com",
  id:"211566567",
  img:"/assets/images/harel.png"
}
dark = {
  moon : "bi bi-moon-fill",
  sun : "bi bi-sun",
  bg1 : "#0A3D2A",
  txt1 : "#dbf9f4",

}


isDark = false;

change(){
  var darkIcon = document.getElementById("needToChange")as HTMLElement;
  var darkBg = document.querySelector(".cardsBody") as HTMLElement;
  var darkTxt = document.querySelector(".cardsBody") as HTMLElement;
  // var darkP = document.querySelector(".card-text") as HTMLElement;
  // var darkH = document.querySelector(".card-text") as HTMLElement;
  if(this.isDark == false){
      darkIcon.innerHTML = `<i class="${this.dark.moon}"></i>`;
      darkBg.style.backgroundColor= this.dark.bg1;
      darkTxt.style.color= this.dark.txt1;
      this.isDark = true;
  }
  else{
    darkIcon.innerHTML = `<i class="${this.dark.sun}"></i>`;
    darkBg.style.backgroundColor= "white" ;
    darkTxt.style.color= "black";
    this.isDark = false;
  }
}

}
