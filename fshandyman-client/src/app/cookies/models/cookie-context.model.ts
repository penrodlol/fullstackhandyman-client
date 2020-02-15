import { CookieMapsContainers } from './cookie-maps-containers.model';
import { CookieMaps } from './cookie-maps.model';

export class CookieContext {
    private cookieMapsContainer: CookieMapsContainers;
    private cookieMaps: CookieMaps[];

    getCookieMapsContainer(): CookieMapsContainers { return this.cookieMapsContainer; }
    setCookieMapsContainer(cookieMapsContainer: CookieMapsContainers) { this.cookieMapsContainer = cookieMapsContainer; }

    getCookieMaps(): CookieMaps[] { return this.cookieMaps; }
    setCookieMaps(cookieMaps: CookieMaps[]) { this.cookieMaps = cookieMaps; }
}