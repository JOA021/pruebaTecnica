import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-firts-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, FooterComponent],
  templateUrl: './firts-page.component.html',
  styleUrl: './firts-page.component.css'
})
export class FirtsPageComponent {

}
