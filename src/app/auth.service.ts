import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LooseObject } from './interfaces/looseobject/looseobject';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = `https://172.16.21.4:3000/api/Authusers`;
  private authToken: string;
  private authTokenSource = new BehaviorSubject<string>(undefined);
  observeAuthToken = this.authTokenSource.asObservable();

  private userId: number;
  private userIdSource = new BehaviorSubject<number>(undefined);
  observeUserId = this.userIdSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.authToken = localStorage.getItem('token') || undefined;
    this.authTokenSource.next(this.authToken);
    this.userId = parseInt(localStorage.getItem('userId'), 10) || undefined;
    this.userIdSource.next(this.userId);
    this.vertifyToken();

  }
  vertifyToken(cb?: Function): void {
    if (this.userId && this.authToken) {
      const url = `${this.rootUrl}/${this.userId}?access_token=${this.authToken}`;
      this.http.get(url).subscribe(res => {
        const response: LooseObject = res;
        if (cb) { cb(null, response); }

      }, err => {
        if (err.status) {
          this.authToken = undefined;
          this.userId = undefined;
          this.authTokenSource.next(this.authToken);
          this.userIdSource.next(this.userId);
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          this.router.navigate(['login'])
        }
        if (cb) { cb(err, null); }
      });
    } else { if (cb) { cb(null, false) } }
  }
  signUp(user: LooseObject, cb?: Function): void {

    const url = `${this.rootUrl}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const authUser = {
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password.trim()
    };

    console.log("authUser", authUser)
    this.http.post(url, authUser).subscribe(res => {
      const response: LooseObject = res;
      console.log('Please respond', response);
      if (cb) { cb(null, res); alert('signup succeeded'); this.router.navigate(['login']) }
    }, err => {
      if (cb) {
        cb(err, null);
        console.log('in if error')
      }
    });

  }

  signIn(user: LooseObject, cb?: Function): void {
    const url = `http://localhost:3000/api/Authusers/login`;
    if (user) {
      const authUser = {
        email: user.email.trim(),
        password: user.password.trim()
      };
      this.http.post(url, authUser).subscribe(res => {
        const response: LooseObject = res;
        if (response.id) {
          this.authToken = response.id;
          this.authTokenSource.next(this.authToken);

          this.userId = response.userId;
          this.userIdSource.next(this.userId);

          localStorage.setItem('token', this.authToken);
          localStorage.setItem('userId', this.userId + '');
          this.router.navigate(['dashboard']);
          alert('login succeeeded');
        } else {
        }
        if (cb) { cb(null, response); }
      }, err => {
        if (cb) {
          cb(err, null);
          console.log('in errrorrrr')
        }
      });
    }
  }

  logout(cb?: Function): void {
    const url = `${this.rootUrl}/logout?access_token=${this.authToken}`;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    this.authToken = undefined;
    this.authTokenSource.next(this.authToken);

    this.userId = undefined;
    this.userIdSource.next(this.userId);
    this.http.post(url, {}).subscribe(res => {
      this.router.navigate(['login']);
    }, err => {
      if (cb) {
        cb(err, null);
        this.router.navigate(['login'])
      }
    })

  }

}

