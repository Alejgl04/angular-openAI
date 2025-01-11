import { environment } from 'environments/environment'

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async(
  prompt: string,
  originalImage?: string,
  maskImage?: string,
): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, originalImage, maskImage})
    });

    if ( !response.ok ) throw new Error('We could not make the correction');

    const {url, revised_prompt: alt} = await response.json();

    return {url, alt};

  } catch (error) {
    return null
  }
}
