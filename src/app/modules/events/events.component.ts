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

// content: "Aliquid delectus nam possimus optio. Quia non voluptatem incidunt dolorum velit. Occaecati velit doloremque totam minima. Labore eos eos quis eaque. Doloremque praesentium ipsum illo non. Sequi est et eos minima. Commodi omnis velit dicta quia dolores vero. Aut ab quae tempore consectetur provident facilis odit sunt."
// created_at: "2020-09-30 02:19:42"
// event_date: "1979-11-06"
// id: 10
// meta_author: "Noemie Erdman"
// meta_description: "Animi enim illum fugit inventore ipsum odit quos. Quia cum voluptas odio ullam vitae rem. Omnis quibusdam consequatur veritatis optio maiores. Quidem ducimus eligendi accusamus ex nobis nobis. Enim velit aspernatur esse ex autem. Vel ut iure quaerat enim eveniet. Fugiat quas autem necessitatibus mollitia quidem eligendi natus. Tenetur voluptatem optio nam aspernatur architecto consectetur. Qui incidunt neque rerum sed."
// meta_title: "Voluptates deserunt iure sint quia vero maiores. Similique neque veritatis quos atque ullam et."
// photo: "https://source.unsplash.com/user/erondu/1527x817"
// status: 1
// title: "Ipsum aut fuga et ipsa. Earum ipsa itaque qui beatae aut totam. Soluta eos dolorum et ut."
// updated_at: "2020-09-30 02:19:42"
