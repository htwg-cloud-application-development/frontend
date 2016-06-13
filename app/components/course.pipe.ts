import { Pipe } from '@angular/core';

@Pipe({
    name: 'courseFilter',
    pure: false
})
export class CoursePipe {
    transform(items: any, value: String = ""): any {
        if (!items) {
            return;
        } else {
            return items.filter(item => item.fullname.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0);
        }
    }
}