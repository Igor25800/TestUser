import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../../shared/component/user-card/user-card.component";
import {UserService} from "../../shared/service/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {UserInterface} from "../../shared/interface/user.interface";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgIf,
    JsonPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  card!: Observable<UserInterface>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    const id = this.route.snapshot.params['id'];
    this.card = this.userService.getUser(id)
  }
}
