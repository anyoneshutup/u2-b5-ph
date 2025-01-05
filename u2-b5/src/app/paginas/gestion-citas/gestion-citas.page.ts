import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCardContent, 
  IonLabel, IonButton, IonList, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonBackButton, IonInput, IonNote } from '@ionic/angular/standalone';
import { CitasService } from 'src/app/servicios/citas.service';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonCard, IonCardHeader, IonCardTitle, 
    FormsModule, IonItem, IonCardContent, IonLabel, IonButton, IonList, IonIcon, IonButtons, IonBackButton, IonNote ]
})
export class GestionCitasPage implements OnInit {
  nuevaCita: { frase: string, autor: string } = { frase: '', autor: '' };
  citas: { frase: string, autor: string }[] = [];

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.cargarCitas();
  }

  async cargarCitas() {
    this.citas = await this.citasService.obtenerCitas();
  }

  // Agregar una nueva cita
  async agregarCita() {
    if (this.nuevaCita.frase.trim() && this.nuevaCita.autor.trim()) {  // Validación de campos
      await this.citasService.agregarCita(this.nuevaCita);
      this.nuevaCita = { frase: '', autor: '' };
      this.cargarCitas();
    }
  }

  // Eliminar una cita
  async eliminarCita(cita: { frase: string, autor: string }) {
    const citasGuardadas = await this.citasService.obtenerCitas();
    
    // Encuentra el índice de la cita a eliminar usando frase y autor
    const index = citasGuardadas.findIndex(
      (c) => c.frase === cita.frase && c.autor === cita.autor
    );
  
    if (index > -1) {
      citasGuardadas.splice(index, 1); // Eliminar cita
      await this.citasService.guardarCitas(citasGuardadas); // Guardar cambios
      this.cargarCitas(); // Recargar las citas
    }
  }
}
