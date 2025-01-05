import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardContent, IonButton, IonIcon, IonFabButton, IonButtons, IonFab } from '@ionic/angular/standalone';
import { CitasService } from '../servicios/citas.service';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { Preferences } from '@capacitor/preferences';  // Para acceder a Preferences
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardContent, IonButton, IonIcon, IonFabButton, IonButtons, IonFab, CommonModule],
})
export class HomePage implements OnInit {
  citaAleatoria: { frase: string; autor: string } | null = null;
  permitirEliminar: boolean = false;
  botonActivo: boolean = false;  // Añadido para controlar el estado del botón

  constructor(
    private citasService: CitasService,
    private router: Router,
    private configuracionService: ConfiguracionService
  ) {}

  async ngOnInit() {
    // Inicializamos el valor del botón
    this.permitirEliminar = await this.configuracionService.obtenerConfiguracion();
    await this.obtenerCitaAleatoria();
    await this.obtenerEstadoBoton();  // Cargar el estado del botón desde Preferences
  }

  async ionViewWillEnter() {
    // Actualizar el estado del botón al regresar a la página de inicio
    await this.obtenerEstadoBoton();
    await this.obtenerCitaAleatoria(); // Refrescar las citas cuando regreses a la página
  }

  // Obtener el estado del botón desde Preferences
  async obtenerEstadoBoton() {
    const estado = await Preferences.get({ key: 'botonActivo' });
    this.botonActivo = estado.value === 'true';
  }

  async obtenerCitaAleatoria() {
    if (this.botonActivo) {  // Solo mostrar citas si el botón está activado
      const citas = await this.citasService.obtenerCitas();
      this.citaAleatoria = citas.length > 0 ? citas[Math.floor(Math.random() * citas.length)] : null;
    } else {
      this.citaAleatoria = null;  // No mostrar citas si el botón está desactivado
    }
  }

  irAConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  irAGestionCitas() {
    this.router.navigate(['/gestion-citas']);
  }
}
