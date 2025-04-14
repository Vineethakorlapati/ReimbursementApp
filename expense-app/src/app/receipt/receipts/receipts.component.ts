import { Component } from '@angular/core';
import { Receipt } from '../../models/receipt.model';
import { ReceiptService } from '../../services/receipt.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receipts',
  imports: [RouterModule, CommonModule, ToastrModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent {
  receipts: any[] = [];
  fileUrl = '';

  constructor(private receiptService: ReceiptService, private toastr: ToastrService) {
    this.fileUrl = receiptService.fileUrl;
  }

  ngOnInit(): void {
    this.getReceipts();
  }

  deleteReceipt(id: number): void {
    this.receiptService.deleteReceipt(id).subscribe(res => {
      this.toastr.success('Data Deleted Successfully');
      this.getReceipts();
    });
  }

  getReceipts() {
    this.receiptService.getReceipts().subscribe(result => {
      this.receipts = result;
    });
  }
}
