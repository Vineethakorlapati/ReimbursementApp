import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Receipt } from '../../models/receipt.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../services/receipt.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-receipt',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastrModule],
  templateUrl: './add-receipt.component.html',
  styleUrl: './add-receipt.component.css'
})
export class AddReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  receipt!: Receipt;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private receiptService: ReceiptService, private toastr: ToastrService) {
    this.receiptForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      file: [null, Validators.required],
      status: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.receiptService.getReceipt(id).subscribe(res => {
        this.receipt = res;
        this.populateForm();
      });
    }
  }

  populateForm() {
    this.receiptForm.patchValue({
      date: this.formatDate(this.receipt.date),
      amount: this.receipt.amount,
      description: this.receipt.description,
      status: this.receipt.status,
    });
  }

  formatDate(data: string): string {
    const date = new Date(data)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.receiptForm.patchValue({ file: file });
  }

  async submit() {
    if (this.receiptForm.valid) {
      const formData: FormData = new FormData();
      formData.append('Date', this.receiptForm.value.date);
      formData.append('Amount', this.receiptForm.value.amount);
      formData.append('Description', this.receiptForm.value.description);
      formData.append('File', this.receiptForm.value.file);

      try {
        await this.receiptService.createReceipt(formData).subscribe(res => {
          this.toastr.success('Data Saved Successfully');
          this.router.navigate(['/']);
        });
      } catch (error) {
        console.error('Error creating receipt:', error);
      }
    }
  }
}
