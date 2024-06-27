import { Component, computed, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VolumeInfo } from '../../core/interfaces/books';
import { MatGridListModule, MatGridTileText } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatGridListModule, MatGridTileText, MatIconModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  readonly data = inject<VolumeInfo>(MAT_DIALOG_DATA);

  public authors = computed(() => {
    const { authors } = this.data
    return Object.values(authors);
  })
}
