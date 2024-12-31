import type { OrthographyResponse } from '@interfaces/orthography.interface';
import { environment } from 'environments/environment'

export const orthographyUseCase = async(prompt: string) => {
  try {

    const response = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt})
    });

    if ( !response.ok ) throw new Error('We could not make the correction');

    const data = await response.json() as OrthographyResponse;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'We could not make the correction'
    }
  }
}
