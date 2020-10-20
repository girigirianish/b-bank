import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly title = 'Seva Blood Bank';
  public readonly tabs = [
    {
      label: 'Home',
      link: 'home',
    },
    {
      label: 'Registration',
      link: 'registration',
    },
    {
      label: 'About Us',
      link: 'about-us',
    },
    {
      label: 'Privacy Policy',
      link: 'privacy-policy',
    },
    {
      label: 'Terms And Conditions',
      link: 'terms-and-conditions',
    },
  ];
  public readonly activeLink = this.tabs[0].link;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['home']);
  }
}
