import { Component, HostListener, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { CategoryWithCount } from '../../../models/categoryWithCount';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMobileMenuOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  cartItemCount: number = 0;
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  categories: CategoryWithCount[] = [];
  isCategoryDropdownOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.loadAuthenticationState();
    this.loadCategories();
  }

  private loadAuthenticationState(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.categories = response.data;
          console.log('Loaded categories:', this.categories);
        } else {
          console.error('Failed to load categories:', response);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/products']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isUserMenuOpen = false;
      this.isCategoryDropdownOpen = false;
    }
  }

  toggleUserMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isCategoryDropdownOpen = false;
    }
  }

  toggleCategoryDropdown(event: Event): void {
    event.stopPropagation();
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
    if (this.isCategoryDropdownOpen) {
      this.isUserMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const userMenuElement = document.querySelector('.user-menu');
    const mobileToggleElement = document.querySelector('.mobile-toggle');
    const categoryDropdownElement = document.querySelector('.has-dropdown');

    if (!this.isClickInsideElement(event, userMenuElement) && 
        !this.isClickInsideElement(event, mobileToggleElement) &&
        !this.isClickInsideElement(event, categoryDropdownElement)) {
      this.isUserMenuOpen = false;
      this.isMobileMenuOpen = false;
      this.isCategoryDropdownOpen = false;
    }
  }

  private isClickInsideElement(event: MouseEvent, element: Element | null): boolean {
    return element ? element.contains(event.target as Node) : false;
  }
}