export class ValidationResult {
    public errors: string[];
    public get validated(): boolean {
        return this.errors.length === 0;
    }

    constructor() {
        this.errors = [];
    }

    public addError(error: string): void {
        this.errors.push(error);
    }

    public popError(): string {
        if (this.errors.length === 0) {
            return "No error to pop";
        }

        return this.errors.pop()!;
    }
}