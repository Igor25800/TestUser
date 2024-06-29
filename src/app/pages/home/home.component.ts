import {Component, DestroyRef, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {UserCardComponent} from "../../shared/component/user-card/user-card.component";
import {Observable, of} from "rxjs";
import {UserInterface} from "../../shared/interface/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../shared/service/user/user.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatPaginator,
    NgForOf,
    UserCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cardArray!: Observable<UserInterface[]>;
  dataSource!: MatTableDataSource<UserInterface>;
  totalUsers!: Observable<number>;

  constructor(
    private userService: UserService,
    private desRef: DestroyRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUsers().pipe(
      takeUntilDestroyed(this.desRef)
    ).subscribe(user => {
      this.updateUserArray(user)
    })
  }

  deleteUser(id: number): void {
    const updatedData = this.dataSource.data.filter(user => user.id !== id);
    this.updateUserArray(updatedData);
  }

  viewUser(name: string): void {
    this.router.navigate(['user/' + name])
  }

  updateUserArray(updatedData: UserInterface[]): void {
    this.dataSource =  new MatTableDataSource<UserInterface>(updatedData);
    this.dataSource.data = updatedData.map((user, index) => {
      return { ...user, idUser: index + 1 };
    });
    if (this.paginator) {
      const prevPageIndex = this.paginator.pageIndex;
      this.paginator.length = updatedData.length;
      if (prevPageIndex !== this.paginator.pageIndex) {
        this.paginator.pageIndex = prevPageIndex;
      }
    }
    this.dataSource.paginator = this.paginator;
    this.cardArray = this.dataSource.connect();
    this.totalUsers = of(updatedData.length);
  }
}
