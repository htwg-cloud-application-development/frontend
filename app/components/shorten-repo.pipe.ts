import { Pipe } from '@angular/core';

@Pipe({
    name: 'shortenRepo',
    pure: false
})
export class ShortenRepoPipe {
    transform(value: string): any[] {
        var array = value.split('/');
        return (array.length > 2) ? array.slice(-2).join('/') : value;
    }
}