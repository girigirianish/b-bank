import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DonorsInformation } from '../../models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'blood-bank-doners-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.scss'],
})
export class DonorListComponent implements AfterViewInit {
  @Input() public set donorsInformation(newValue: DonorsInformation[]) {
    this.dataSource.data = newValue || [];
  }

  @Output()
  public sendSmsClicked: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public sendEmailClicked: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public sendBulkSmsClicked: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();

  @Output()
  public sendBulkEmailClicked: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();

  public readonly displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'blood_group',
    'permanent_address',
    'temporary_address',
    'contact_no',
    'action',
  ];

  public dataSource: MatTableDataSource<
    DonorsInformation
  > = new MatTableDataSource<DonorsInformation>();

  public noData: any = this.dataSource
    .connect()
    .pipe(map((data) => data.length === 0));

  public showBulkButton: any = this.dataSource
    .connect()
    .pipe(map((data) => data.length > 1));

  @ViewChild(MatPaginator) public paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.data = this.donorsInformation || [];
    this.dataSource.paginator = this.paginator;
  }

  public sendSms(id: number): void {
    this.sendSmsClicked.emit(id);
  }

  public sendEmail(id: number): void {
    this.sendEmailClicked.emit(id);
  }

  public sendBulkSms(): void {
    this.sendBulkSmsClicked.emit(this.dataSource.data.map((d) => d.id));
  }

  public sendBulkEmail(): void {
    this.sendBulkEmailClicked.emit(this.dataSource.data.map((d) => d.id));
  }
}
