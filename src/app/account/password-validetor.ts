import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';



export class PasswordValidator {

    static passwordValidator = (frm: FormGroup): ValidationErrors | null => {
        
        const passwordCtrl = frm.controls['password']?.value;
        const confirmPasswordCtrl = frm.controls['passwordconfirm']?.value;

        return (passwordCtrl !== confirmPasswordCtrl || confirmPasswordCtrl == '')? 
            { 
                'confirmPassword': {
                    password: passwordCtrl,
                    confirm_password: confirmPasswordCtrl, 
                    not_confirmed: true
                } 
            } 
            : null;    
    }


}