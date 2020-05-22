import {Component, OnInit} from '@angular/core';
import {SeriesService} from './shared/services/series.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public series: any = [];
  public filteredSeries: any = [];
  public tableHeader = {
    title: 'Name',
    season: 'Season',
    network: 'Network',
    premiere: 'Premiere'
  };
  public genre = ['Horror', 'Drama', 'Traget', 'Comedy'];
  public year = [2018, 2019];
  public network = ['AMC', 'Netflix', 'Duplex'];
  public column = '';
  public order = '';
  public pageSize = 5;
  public pageIndex = 0;
  public pageLength = 15;
  public pageEvent: PageEvent;

  constructor(private seriesService: SeriesService) {
  }
  ngOnInit() {
    this.getSeries();
  }

  getSeries() {
    this.seriesService.getSeries(this.pageIndex, this.pageSize).subscribe(res => {
      this.series = res;
    });
  }

   filter(mtype, event) {
    const EVENT = event.target.value.toLowerCase();

    if (EVENT === 'undefined') {  this.filteredSeries = []; }
    else {
      this.filteredSeries = this.series.filter(res => this.ownFilter(mtype, res, EVENT));
    }
   }

   ownFilter(type, value, currentString) {
     if (typeof value[type] === 'string') {
       if (value[type].includes(currentString)) { return true; }
     }
     else {
       const result = value[type].find(req => req.toLowerCase() === currentString);
       if (result !== undefined) {
         return true;
       }
     }
   }
  search(event) {
    const EVENT = event.target.value.toLowerCase();
    this.seriesService.filter(EVENT).subscribe(res => this.filteredSeries = res);
  }
  setColumn(column, order) {
    if (order === this.order) {
      this.order = 'desc';
    }else {
      this.order = order;
    }
    this.column = column;
  }
  setLimit(event: PageEvent): any {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.seriesService.getSeries(event.pageIndex, event.pageSize)
      .subscribe(res => {
        this.filteredSeries = res;
      });



  }

}
