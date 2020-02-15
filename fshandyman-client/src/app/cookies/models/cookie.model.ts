export class Cookie {
    private _cookieNum: number;
    private _mapNum: number;
    private _name: string;
    private _value: string;

    get cookieNum(): number { return this._cookieNum; }
    set cookieNum(cookieNum: number) { this._cookieNum = cookieNum; }

    get mapNum(): number { return this._mapNum; }
    set mapNum(mapNum: number) { this._mapNum = mapNum; }

    get name(): string { return this._name; }
    set name(name: string) { this._name = name; }

    get value(): string { return this._value; }
    set value(value: string) { this._value = value; }
}