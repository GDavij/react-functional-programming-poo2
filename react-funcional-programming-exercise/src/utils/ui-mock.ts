export class UiMock {
    private static readonly _imagesNames: string[] = ["clean-code.jpg", "ddd-complexities-of-a-software.jpg", "complex-software-architecture.jpg"]

    public static getRandomImageUrl() {
        const randomIndex = Math.floor(Math.random() * this._imagesNames.length);
        return this._imagesNames[randomIndex];
    }
}