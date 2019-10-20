export class CookieModel {
    // tslint:disable-next-line: variable-name
    _name: string; _value: string;

    get name() { return this._name; }
    set name(name: string) { this._name = name; }

    get value() { return this._value; }
    set value(value: string) { this._value = value; }
}
