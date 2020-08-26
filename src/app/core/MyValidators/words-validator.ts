import { AbstractControl, ValidationErrors } from '@angular/forms';


export class WordsValidators {
 
    static minWords(count: number): (ctrl: AbstractControl) => null | ValidationErrors {
        let min: Boolean;
        return (control :AbstractControl) => this.wordsValidator(min=true,control,count);
    }

    static maxWords(count: number): (ctrl: AbstractControl) => null | ValidationErrors {
        let min: Boolean;
        return (control :AbstractControl) => this.wordsValidator(min=false,control,count);
    }
    
    
    private static wordsValidator(min: boolean, control: AbstractControl, count: number): null | ValidationErrors {
        const val = control?.value;

        if (typeof(val) !== 'string') return null;

        const words = val.split(' ').filter(word => word.length > 0); //split for one space and filter for more then 1 space in a row between words example: "word one    two" 
        
        if (min) {
            if (words.length >= count) return null;

            return {
                'minWords': {
                    requiredLength: count,
                    actualLength: words.length
                }
            }
        } else {
            if (words.length <= count) return null;

            return {
                'maxWords': {
                    requiredLength: count,
                    actualLength: words.length
                }
            }
        }
        
    }
}