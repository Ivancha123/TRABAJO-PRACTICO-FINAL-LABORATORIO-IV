import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movies';


@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})

export class HomeSliderComponent implements OnInit {



  @Input()
  movies!: Movie[];
  movieIndex = 1;

  intervalId : any;

  ngOnInit(): void {
    this.createInterval();
  }
  ngAfterViewInit() {

  }
  OnDestroy(): void {

  }
  //localStorage
  //Interceptor servicio

  createInterval(){
    this.intervalId = this.intervalId = setInterval(() => {
      this.next();
    },5000);
  }
  resetInterval() {
    clearInterval(this.intervalId);
    this.createInterval();
  }

  next() {
    if (this.movieIndex < this.movies.length-1) {
      this.movieIndex++;
    } else {
      this.movieIndex = 0;
    }
    this.resetInterval();
  }

  prev() {
    if (this.movieIndex <= 0) {
      this.movieIndex = this.movies.length-1;
    } else {
      this.movieIndex--;
    }
    this.resetInterval();
  }




}
