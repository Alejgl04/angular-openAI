import { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment";

export const prosConsUseCase = async( prompt: string ) => {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt})
    });

    if ( !response.ok ) throw new Error('We could not make the comparison');
    const data = await response.json() as ProsConsResponse;

    return {
      ok: true,
      ...data,
    }
  } catch (error) {
    return {
      ok: false,
      role: '',
      content: 'We cannot make the comparison'
    }
  }
}
