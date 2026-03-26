import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EarlyAccessSignup {
    userType: UserType;
    name: string;
    submittedAt: bigint;
    email: string;
    numberOfProperties: bigint;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserType {
    landlord = "landlord",
    tenant = "tenant"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSignups(): Promise<Array<EarlyAccessSignup>>;
    getCallerUserRole(): Promise<UserRole>;
    getSignupCount(): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    submitEarlyAccessSignup(name: string, email: string, phone: string, userType: UserType, numberOfProperties: bigint): Promise<void>;
}
