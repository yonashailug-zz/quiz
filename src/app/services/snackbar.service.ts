import {Injectable} from "@angular/core";
import { MdSnackBar } from "@angular/material";

@Injectable()
export class SnackBarService {

    private snackBarRef: any;

    constructor(private snackBar: MdSnackBar) {}

    public openSnackBar(message?: string) {

        this.snackBarRef = this.snackBar.open(message, '', {

        duration: 3000
        
      });     

    }

}