import { Client } from "../Client"
import { UserProfile } from "./Profile"

export class Account {
    constructor(public client: Client, data: UserAccount) {
        Object.assign(this, data.account)
        this.profile = new UserProfile(client, data.userProfile)
    }

    /**
     * Refreshes the cache for the self account. This function is used during the login phase, and probably no where else.
     * 
     * @param data The UserAccount data to refresh with.
     */
    public refresh(data: UserAccount) {
        Object.assign(this, data.account)
    }

    /**
     * Retrieve the wallet for the self account.
     */
    public async wallet() {
        const res = await this.client.requestManager.get("wallet")
        return res.wallet as Wallet
    }

}

/* START OF TYPINGS */

export interface UserAccount {
    auid: string;
    account: Account;
    secret: string;
    sid: string;
    "api:statuscode": number;
    "api:duration": string;
    "api:timestamp": Date;
    "api:message": string;
    userProfile: UserProfile;
}

export interface AdvancedSettings {
    amplitudeAnalyticsEnabled: number;
    amplitudeAppId?: any;
}

export interface DeviceInfo {
    lastClientType: number;
}

export interface Ads {
    status: number;
}

export interface PopupConfig {
    ads: Ads;
}

export interface Extensions {
    adsFlags: number;
    adsLevel: number;
    deviceInfo: DeviceInfo;
    popupConfig: PopupConfig;
    mediaLabAdsMigrationAugust2020: boolean;
    adsEnabled: boolean;
}

export interface Account {
    profile: UserProfile
    username?: any;
    status: number;
    uid: string;
    modifiedTime: Date;
    twitterID?: any;
    activation: number;
    phoneNumberActivation: number;
    emailActivation: number;
    appleID?: any;
    facebookID?: any;
    nickname: string;
    mediaList?: any;
    googleID?: any;
    icon?: any;
    securityLevel: number;
    phoneNumber?: any;
    membership?: any;
    advancedSettings: AdvancedSettings;
    role: number;
    aminoIdEditable: boolean;
    aminoId: string;
    createdTime: Date;
    extensions: Extensions;
    email: string;
}

export interface NewUserCoupon {
    scopeDesc: string;
    createdTime: Date;
    modifiedTime: Date;
    couponType: number;
    couponId: string;
    status: number;
    expiredTime?: any;
    expiredType: number;
    title: string;
    couponValue: number;
}

export interface Wallet {
    newUserCoupon: NewUserCoupon;
    adsVideoStats?: any;
    totalBusinessCoinsFloat: number;
    adsEnabled: boolean;
    businessCoinsEnabled: boolean;
    totalBusinessCoins: number;
    totalCoins: number;
    adsFlags: number;
    totalCoinsFloat: number;
}