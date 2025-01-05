import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonBackButton, IonButtons, IonToggle } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, 
    IonLabel, IonButtons, CommonModule, FormsModule, IonToggle]
})
export class ConfiguracionPage implements OnInit {
  botonActivo: boolean = false;

  constructor() {}

  async ngOnInit() {
    const estado = await Preferences.get({ key: 'botonActivo' });
    this.botonActivo = estado.value === 'true';
  }

  async toggleBoton() {
    // Guardar el estado del botón en Preferences
    await Preferences.set({ key: 'botonActivo', value: this.botonActivo.toString() });
  }
}