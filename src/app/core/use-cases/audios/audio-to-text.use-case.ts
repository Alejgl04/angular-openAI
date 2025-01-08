
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { environment } from 'environments/environment'

export const audioToTextUseCase = async( audioFile: File, prompt?: string) => {
  try {

    const formData = new FormData();
    formData.append("file", audioFile);

    if ( prompt ) {
      formData.append('prompt', prompt)
    }

    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json() as AudioToTextResponse

    return data;

  } catch (error) {
    throw new Error('Something went wrong')
  }
}
