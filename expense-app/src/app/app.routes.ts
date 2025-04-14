import { Routes } from '@angular/router';
import { ReceiptsComponent } from './receipt/receipts/receipts.component';
import { AddReceiptComponent } from './receipt/add-receipt/add-receipt.component';
import { UpdateStatusReceiptComponent } from './receipt/update-status-receipt/update-status-receipt.component';

export const routes: Routes = [
    { path: '', component: ReceiptsComponent },
    { path: 'add', component: AddReceiptComponent },
    { path: 'edit/:id', component: UpdateStatusReceiptComponent },
];
