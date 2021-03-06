import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'qs-dialog-markdown',
  templateUrl: './dialog-markdown.component.html',
})
export class DialogMarkdownComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMarkdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }) { }
}
