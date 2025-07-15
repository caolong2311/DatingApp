import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  constructor(){}
  ngOnInit(): void {

  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: boolean){
    this.registerMode = event;
  }
}
