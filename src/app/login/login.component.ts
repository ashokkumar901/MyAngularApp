import { Component, OnInit } from '@angular/core';
import { LooseObject } from '../interfaces/looseobject/looseobject';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user: LooseObject = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {

    this.authService.observeUserId.subscribe(id => {
      if (id) { this.authService.signIn({}); }
    });
  }

  ngOnInit() {
  }
  signIn(): void {
    console.log('user', this.user);
    this.authService.signIn(this.user);
  }





}
