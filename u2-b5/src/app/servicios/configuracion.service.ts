import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private key = 'borrarCitaInicio';

  constructor() {}

  // Método para obtener la configuración guardada
  async obtenerConfiguracion(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.key });
    return value === 'true'; // Devuelve true o false dependiendo de la configuración
  }

  // Método para guardar la configuración
  async guardarConfiguracion(permitirEliminar: boolean): Promise<void> {
    await Preferences.set({
      key: this.key,
      value: permitirEliminar ? 'true' : 'false', // Almacena true o false según el valor de permitirEliminar
    });
  }
}
