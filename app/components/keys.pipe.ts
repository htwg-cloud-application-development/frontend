import { Pipe } from '@angular/core';

@Pipe({
    name: 'keys',
    pure: false
})
export class KeysPipe {
    transform(value: any, args?: any[]): any[] {
        return Object.keys(value);
    }
}