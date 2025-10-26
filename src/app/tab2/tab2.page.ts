import { Component, inject } from '@angular/core';
import { IonToolbar, IonContent, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonItem, IonList, IonInput, IonDatetime, IonDatetimeButton, IonModal, IonButton } from '@ionic/angular/standalone';
import { } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonToolbar, IonContent, IonCardContent,
    IonCardHeader, IonCard, IonCardTitle, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonItem, IonList,
    IonInput, IonDatetime, IonDatetimeButton, IonModal, IonButton, ReactiveFormsModule]
})
export class Tab2Page {

  createItemFormGroup: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(private alertController: AlertController, private router: Router) {
    this.createItemFormGroup = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      orderType: new FormControl('', [Validators.required]),
      itemType: new FormControl('', [Validators.required]),
      itemQuantityGrams: new FormControl('', [Validators.required]),
      itemQuantityTula: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })
  }

  async submitForm() {
    if (this.createItemFormGroup?.invalid) {
      this.createItemFormGroup.markAllAsTouched();
      return;
    }
    const qunatityInGrams = this.createItemFormGroup.get('itemQuantityGrams')?.value;
    const quantityinTulas = this.createItemFormGroup.get('itemQuantityTula')?.value;
    const tulasToGrams = quantityinTulas * 11.66;
    const totalQuanityInGrams = tulasToGrams + qunatityInGrams;
    const enteredPrice = this.createItemFormGroup.get('price')?.value;
    const TotalAmount = (qunatityInGrams + tulasToGrams) * enteredPrice;
    const alert = await this.alertController.create({
      header: `Confirm your purchase`,
      message: `${this.createItemFormGroup.get('orderType')?.value.toUpperCase()}  ${this.createItemFormGroup.get('itemType')?.value}: ${this.createItemFormGroup.get('itemQuantityTula')?.value} Tula and ${this.createItemFormGroup.get('itemQuantityGrams')?.value} gram. Total: ₹${TotalAmount}.\nDo you want to continue?`,
      buttons: [
        {
          text: "Confirm",
          handler: () => {
            const existingItems = localStorage.getItem('Form');
            const obj = {
              ...this.createItemFormGroup.value,
              TotalAmount,
              totalQuanityInGrams,
              enteredPrice
            }
            if (existingItems) {
              const arr = JSON.parse(existingItems);
              arr.push(obj)
              localStorage.setItem('Form', JSON.stringify(arr));
            } else {
              localStorage.setItem('Form', JSON.stringify([obj]));
            }
            this.createItemFormGroup.reset();
            this.router.navigateByUrl('/tabs/tab3')
          }
        }
      ],
    });
    await alert.present();
  }
}

