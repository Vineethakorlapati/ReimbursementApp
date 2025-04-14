import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Receipt, ReceiptUpdate } from '../../models/receipt.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-status-receipt',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastrModule],
  templateUrl: './update-status-receipt.component.html',
  styleUrl: './update-status-receipt.component.css'
})
export class UpdateStatusReceiptComponent {
  receiptForm: FormGroup;
  receipt!: Receipt;
  receiptUpdate: ReceiptUpdate = { status: '' };
  fileURL = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private receiptService: ReceiptService, private toastr: ToastrService) {

    this.receiptForm = this.fb.group({
      status: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.fileURL = this.receiptService.fileUrl;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.receiptService.getReceipt(id).subscribe(res => {
      this.receipt = res;
      this.populateForm();
    });
  }

  populateForm() {
    this.receiptForm.patchValue({
      status: this.receipt.status,
    });
  }

  async submit() {
    debugger
    if (this.receiptForm.valid) {
      this.receiptUpdate.status = this.receiptForm.value.status;
      try {
        await this.receiptService.updateReceipt(this.receipt.id, this.receiptUpdate).subscribe(res => {
          this.toastr.success('Receipt Status Updated Successfully');
          this.router.navigate(['/']);
        });
      } catch (error) {
        console.error('Error updating receipt:', error);
      }
    }
  }
}
