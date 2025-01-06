import type { OrthographyResponse } from '@interfaces/orthography.interface';
import { environment } from 'environments/environment'

export const textToAudioUseCase = async(prompt: string, voice: string) => {
  try {

    const response = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, voice})
    });

    if ( !response.ok ) throw new Error('We could not generate the audio');

    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl
    }

  } catch (error) {
    return {
      ok: false,
      message: 'We could not generate the audio',
      audioUrl: ''
    }
  }
}
