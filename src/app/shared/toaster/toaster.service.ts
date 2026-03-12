import { Injectable, signal } from "@angular/core";
import { Toast, ToastType } from "./toaster.model";

@Injectable({providedIn: "root"})
export class ToasterService{
    toasts = signal<Toast[]>([]);
    private nextId = 1;

    // addToast(toast: Toast): void {
    //     this.toasts.set([...this.toasts(), toast]);
    // }

    addToast(type: ToastType, title: string, message: string): void {
        this.toasts.set([...this.toasts(), 
            { id: this.nextId++ ,type ,title , message }
        ]);
    }

    removeToast(id: any): void {
        this.toasts.update((items) => {
            return items.filter((toast) => toast.id !== id);
        });
    }
}