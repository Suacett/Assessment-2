/**
 * Root component of the application
 * Handles main layout and navigation
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  /**
   * Navigates to help page when help button is clicked
   */
  showHelp() {
    this.router.navigate(['/help']);
  }
}
