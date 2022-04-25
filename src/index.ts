import fetch from 'node-fetch';
const API = 'https://hypixel.cactive.network/api/v3';

import {
	APIKeyData,
	APINicknameResponse,
	APIPlayerData,
	APIPunishmentData,
	APIResponseTypes,
	APIStaffTracker,
	InternalError,
} from './types';
import type { FilterType } from './types';

export class Client {
	private readonly key: string;
	private readonly cache: boolean = false;

	constructor(data: { key: string; cache?: boolean }) {
		this.key = data.key;

		if (data.cache) {
			this.cache = data.cache;
		}
	}

	private static map_external_error(json: APIResponseTypes): APIResponseTypes {
		return {
			success: false,
			id: json.id,
			errors: json.errors!.map((err: InternalError) => ({
				type: err.type,
				code: err.code,
				message: err.message,
				internal: false,
			})),
		};
	}

	private static map_internal_error(reason: any): APIResponseTypes {
		return {
			success: false,
			errors: [
				{
					type: 'failed-api-request',
					code: 500,
					message: reason.toString(),
					internal: true,
				},
			],
		};
	}

	public async nickname_history(
		nickname: string,
	): Promise<APINicknameResponse> {
		return await new Promise(async (resolve, reject) => {
			try {
				const req = await fetch(
					`${API}/nickname-history?key=${this.key}&cache=${this.cache}&nickname=${nickname}`,
				);
				const json: APINicknameResponse = await req.json();

				if (json.success) return resolve(json);
				else return reject(Client.map_external_error(json));
			} catch (reason) {
				return reject(Client.map_internal_error(reason));
			}
		});
	}

	public async player_data(uuid: string): Promise<APIPlayerData> {
		return await new Promise(async (resolve, reject) => {
			try {
				const req = await fetch(
					`${API}/player-data?key=${this.key}&cache=${this.cache}&uuid=${uuid}`,
				);
				const json: APIPlayerData = await req.json();

				if (json.success) return resolve(json);
				else return reject(Client.map_external_error(json));
			} catch (reason) {
				return reject(Client.map_internal_error(reason));
			}
		});
	}

	public async staff_tracker(filter: FilterType): Promise<APIStaffTracker> {
		return await new Promise(async (resolve, reject) => {
			try {
				const req = await fetch(
					`${API}/staff-tracker?key=${this.key}&cache=${this.cache}&filter=${filter}`,
				);
				const json: APIStaffTracker = await req.json();

				if (json.success) return resolve(json);
				else return reject(Client.map_external_error(json));
			} catch (reason) {
				return reject(Client.map_internal_error(reason));
			}
		});
	}

	public async punishment_data(id: string): Promise<APIPunishmentData> {
		return await new Promise(async (resolve, reject) => {
			try {
				const req = await fetch(
					`${API}/punishment-data?key=${this.key}&cache=${this.cache}&id=${id}`,
				);
				const json: APIPunishmentData = await req.json();

				if (json.success) return resolve(json);
				else return reject(Client.map_external_error(json));
			} catch (reason) {
				return reject(Client.map_internal_error(reason));
			}
		});
	}

	public async key_data(): Promise<APIKeyData> {
		return await new Promise(async (resolve, reject) => {
			try {
				const req = await fetch(`${API}/key?key=${this.key}`);
				const json: APIKeyData = await req.json();

				if (json.success) return resolve(json);
				else return reject(Client.map_external_error(json));
			} catch (reason) {
				return reject(Client.map_internal_error(reason));
			}
		});
	}
}
