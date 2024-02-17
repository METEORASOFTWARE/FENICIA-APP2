import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private dataToShare: any;

	setData(data: any) {
		this.dataToShare = data;
	}

	getData() {
		return this.dataToShare;
	}

	handleErrorResponse(error: HttpErrorResponse) {
		let errorMessage = 'Ocurrió un error desconocido';

		if (error.error instanceof ErrorEvent) {
		// Error del lado del cliente
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Error del lado del servidor
			//errorMessage = `Código de error: ${error.status}, Mensaje: ${error.error.message}`;
			errorMessage = `${error.error.message}`;
		}

		return throwError(errorMessage);
	}
}
