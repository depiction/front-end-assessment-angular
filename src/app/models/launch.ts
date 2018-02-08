// Generated using https://app.quicktype.io/

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const launch = Convert.toLaunch(json);

export interface Launch {
    flight_number:     number;
    launch_year:       string;
    launch_date_unix:  number;
    launch_date_utc:   string;
    launch_date_local: string;
    rocket:            Rocket;
    telemetry:         Telemetry;
    reuse:             Reuse;
    launch_site:       LaunchSite;
    launch_success:    boolean;
    links:             Links;
    details?:          string;
}

export interface LaunchSite {
    site_id:        string;
    site_name:      string;
    site_name_long: string;
}

export interface Links {
    mission_patch:    string;
    reddit_campaign?: string;
    reddit_launch?:   string;
    reddit_recovery?: string;
    reddit_media?:    string;
    presskit?:        string;
    article_link:     string;
    video_link:       string;
}

export interface Reuse {
    core:       boolean;
    side_core1: boolean;
    side_core2: boolean;
    fairings:   boolean;
    capsule:    boolean;
}

export interface Rocket {
    rocket_id:    string;
    rocket_name:  string;
    rocket_type:  string;
    first_stage:  FirstStage;
    second_stage: SecondStage;
}

export interface FirstStage {
    cores: Core[];
}

export interface Core {
    core_serial:      string;
    reused:           boolean;
    land_success?:    boolean;
    landing_type?:    string;
    landing_vehicle?: string;
}

export interface SecondStage {
    payloads: Payload[];
}

export interface Payload {
    payload_id:         string;
    reused:             boolean;
    customers:          string[];
    payload_type:       string;
    payload_mass_kg?:   number;
    payload_mass_lbs?:  number;
    orbit:              string;
    cap_serial?:        string;
    mass_returned_kg?:  number;
    mass_returned_lbs?: number;
    flight_time_sec?:   number;
    cargo_manifest?:    string;
}

export interface Telemetry {
    flight_club?: string;
}

// Converts JSON strings to/from your types
export module Convert {
    export function toLaunch(json: string): Launch[] {
        return JSON.parse(json);
    }

    export function launchToJson(value: Launch[]): string {
        return JSON.stringify(value, null, 2);
    }
}
