import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../interface/user.interface";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.url);
  }

  getUser(name: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.url + '/' + name);
  }
}
