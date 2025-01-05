import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

interface Cita {
  frase: string;
  autor: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private citasKey = 'citas'; // Clave para almacenar en Preferences

  constructor() {
    // Verifica si ya existen citas guardadas en Preferences al inicio
    this.cargarCitasPorDefecto();
  }

  private async cargarCitasPorDefecto(): Promise<void> {
    const { value } = await Preferences.get({ key: this.citasKey });
    if (!value) {
      const citasPorDefecto = [
        { frase: 'El hombre que no lee no tiene ventaja sobre el que no sabe leer', autor: 'Jorge Luis Borges' },
        { frase: 'La cultura es la memoria de un pueblo', autor: 'Violeta Parra' },
        { frase: 'Los sueños no se tocan, pero se sienten', autor: 'Pablo Neruda' },
      ];
      await this.guardarCitas(citasPorDefecto); // Si no hay citas, guarda las predeterminadas
    }
  }

  private async obtenerCitasDesdePreferences(): Promise<Cita[]> {
    const { value } = await Preferences.get({ key: this.citasKey });
    return value ? JSON.parse(value) : [];
  }

  public async guardarCitas(citas: Cita[]): Promise<void> {
    await Preferences.set({ key: this.citasKey, value: JSON.stringify(citas) });
  }

  // Obtener citas desde Preferences
  async obtenerCitas(): Promise<Cita[]> {
    return this.obtenerCitasDesdePreferences();
  }

  // Agregar cita y actualizar Preferences
  async agregarCita(cita: Cita): Promise<void> {
    const citas = await this.obtenerCitasDesdePreferences();
    citas.push(cita);
    await this.guardarCitas(citas);
  }

  async eliminarCita(cita: Cita): Promise<void> {
    const citas = await this.obtenerCitasDesdePreferences();
    const index = citas.findIndex((c) => c.frase === cita.frase && c.autor === cita.autor);
    if (index > -1) {
      citas.splice(index, 1);
      await this.guardarCitas(citas); // Guardar cambios
    }
  }
}
