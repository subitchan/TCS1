import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../animations/route-animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  animations: [slideInAnimation]
})
export class AuthDashboard {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

    showDust = false;


}
