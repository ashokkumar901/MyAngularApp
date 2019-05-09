import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LooseObject } from '../interfaces/looseobject/looseobject';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  user: LooseObject = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  signUp(): void {
    this.authService.signUp(this.user, (err, response) => {
      console.log(err, response);
    });
  }

}
