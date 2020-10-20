import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  uid = "";
  constructor(private router: Router, public auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      console.log(user);
      this.uid = user.uid;
      console.log(this.uid);
    });
  }

}
