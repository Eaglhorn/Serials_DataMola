import { NgModule } from '@angular/core';
import {SortByPipe} from './pipes/sortBy.pipe';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    SortByPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SortByPipe
  ],
  providers: []
})
export class SharedModule { }
