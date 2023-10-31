import { Component, OnInit } from '@angular/core';
import { MapService } from '@core/services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap();
  }

}
