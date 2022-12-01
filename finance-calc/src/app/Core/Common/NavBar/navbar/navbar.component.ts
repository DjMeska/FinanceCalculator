import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItems = [
    {
    link: "/",
    name: "Home",
    },
    {
      link: "/payments",
      name: "Payments",
    },
    {
      link: "/",
      name: "ETC",
    },
    {
      link: "/",
      name: "ETC2",
    },
  ];
  constructor() {}

  changeIndex(index: Number){
    document.documentElement.style.setProperty('--active-index', `${index}`)
  }
}
