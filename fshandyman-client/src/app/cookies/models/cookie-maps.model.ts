export class CookieMaps {
    private _mapNum: number;
    private _containerNum: number;
    private _name: string;

    get mapNum(): number { return this._mapNum; }
    set mapNum(mapNum: number) { this._mapNum = mapNum; }

    get containerNum(): number { return this._containerNum; }
    set containerNum(containerNum: number) { this._containerNum = containerNum; }

    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }
}
