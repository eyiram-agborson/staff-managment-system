import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  imports: [RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.css',
})
export class PageLayout {
 constructor( private router: Router,
  private route: ActivatedRoute){}
}
