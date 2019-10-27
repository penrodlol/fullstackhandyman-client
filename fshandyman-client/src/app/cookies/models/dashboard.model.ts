export class DashboardModel {
    locationId: string;
    userName: string;
    fromPms: boolean;
    hideHeader: boolean;

    constructor(customerId: string, storeId?: string) {
        this.locationId = (!storeId || storeId !== null) ?
            `cps-ERX-${customerId}-ERX-${storeId}` : `cps-ERX-${customerId}-ERX`;
    }

    public getUserName() { return this.userName; }
    public setUserName(userName: string) { this.userName = userName; }

    public getFromPms() { return this.fromPms; }
    public setFromPms(fromPms: boolean) { this.fromPms = fromPms; }

    public getHideHeader() { return this.hideHeader; }
    public setHideHeader(hideHeader: boolean) { this.hideHeader = hideHeader; }
}
