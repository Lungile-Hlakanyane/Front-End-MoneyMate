import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class TermsAndConditionsComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]);
  }

}
