import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserInterface} from "../../interface/user.interface";
import {NgClass, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle,
    MatCardAvatar,
    MatCardHeader,
    TitleCasePipe,
    NgIf,
    NgClass
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Output() eventDeleteUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() eventViewLogin: EventEmitter<string> = new EventEmitter<string>();
  @Input() card!: UserInterface;
  @Input() totalUsers!: number | null;
  @Input() isShowBtn = true;
  @Input() isActiveColor = false;
  @Input() index!: number;

  deleteUser(): void {
    this.eventDeleteUser.emit(this.card.id);
  }

  viewUser(): void {
    this.eventViewLogin.emit(this.card.login);
  }

  get isFirstUser(): boolean {
    return this.isActiveColor && this.index === 1;
  }

  get isLastUser(): boolean {
    return this.isActiveColor && this.index === this.totalUsers;
  }

  get isEveryThird(): boolean {
    return this.isActiveColor && this.index % 3 === 0;
  }
}
