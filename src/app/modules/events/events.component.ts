import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EventsService } from './services';

@Component({
  selector: 'blood-bank-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  @ViewChild('descriptionModal', { static: false })
  public descModal: TemplateRef<any>;
  public eventList: any[];
  public selectedCard: any;

  constructor(
    private readonly eventService: EventsService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchDonersEvent();
  }

  private async fetchDonersEvent(): Promise<void> {
    this.eventList = (await this.eventService.getEvents()).data;
    console.log(this.eventList);
  }

  public openDescriptionModal(item): void {
    this.selectedCard = item;
    this.dialog.open(this.descModal, {
      width: '1000px',
    });
  }
}
