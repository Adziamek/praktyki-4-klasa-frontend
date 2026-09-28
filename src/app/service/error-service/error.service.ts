import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldErrors } from './field-errors';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    getFieldErrors(error: HttpErrorResponse): FieldErrors {
        if (error.status !== 400 || !error.error?.errors)
            return {};

        const errors = error.error.errors;

        return Object.fromEntries(
            Object.entries(errors).map(([field, messages]) => [
                field,
                (messages as string[])?.[0] ?? ''
            ])
        );
    }

    getDetail(error: HttpErrorResponse, fallback: string): string {
        return error.error?.detail ?? fallback;
    }
}