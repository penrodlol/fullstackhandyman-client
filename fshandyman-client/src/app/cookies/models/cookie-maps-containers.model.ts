export class CookieMapsContainers {
    private _containerNum: number;
    private _name: string;
    private _tag: string;

    get containerNum(): number { return this._containerNum; }
    set containerNum(containerNum: number) { this._containerNum = containerNum; }

    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    get tag(): string { return this._tag; }
    set tag(tag: string) { this._tag = tag; }
}
