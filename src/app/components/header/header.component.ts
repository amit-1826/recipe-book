import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
   isAuthenticated = false;
  userSubscription: Subscription;
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;   // can also be written as:  !user ? false : true
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
