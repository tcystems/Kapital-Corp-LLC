import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'kapitalcorpLLC';

  isScrolled = false;
  menuOpen = false;

  @ViewChildren('reveal') revealEls!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    this.revealEls.forEach((el) => this.observer?.observe(el.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
