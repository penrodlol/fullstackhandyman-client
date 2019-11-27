export class CookieMapsContainers {
    _containerNum: number;
    _name: string;

    get containerNum(): number { return this._containerNum; }
    set containerNum(containerNum: number) { this._containerNum = containerNum; }

    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }
}
