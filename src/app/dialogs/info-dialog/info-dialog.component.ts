import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<InfoDialogComponent>,
  						@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
