import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bulletPoints'
})
export class BulletPointsPipe implements PipeTransform {
  transform(value: string): string {
    // Replace <ul><li> with bullet points and </li></ul> with line breaks
    const processedContent = value
      .replace(/<ul><li>/g, '&#8226; ')
      .replace(/<\/li><\/ul>/g, '<br>');

    return processedContent;
  }
}
