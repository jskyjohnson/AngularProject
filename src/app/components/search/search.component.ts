import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() sources: string[] = [];

  @ViewChild(MatAutocompleteTrigger) autocomplete:
    | MatAutocompleteTrigger
    | undefined;
  showAutoComplete: boolean = false;

  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  //New Filter is Made
  @Output() newFilter = new EventEmitter<string>();
  @Output() newSubmit = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.myControl.setValue('Alejandro Escamilla');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.onFilterChange();
  }

  showAuto() {
    this.showAutoComplete = true;
  }

  hideAuto() {
    this.autocomplete?.closePanel();
    this.showAutoComplete = false;
  }

  onFilterChange() {
    this.newFilter.emit(this.myControl.value);
  }

  onSubmit() {
    this.hideAuto();
    this.newSubmit.emit('SUBMISSION');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sources.filter(
      (sources) => sources.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
