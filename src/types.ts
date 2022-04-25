export interface APINicknameResponse {
	success: boolean;
	id?: string;
	data?: NicknameHistory[];
	errors?: InternalError[];
}

export interface APIPlayerData {
	success: boolean;
	id?: string;
	data?: PlayerData;
	errors?: InternalError[];
}

export interface APIKeyData {
	success: boolean;
	id?: string;
	data?: KeyData;
	errors?: InternalError[];
}

export interface APIStaffTracker {
	success: boolean;
	id?: string;
	data?: StaffTracker[];
	errors?: InternalError[];
}

export interface APIPunishmentData {
	success: boolean;
	id?: string;
	data?: PunishmentData;
	errors?: InternalError[];
}

export interface NicknameHistory {
	uuid: string;
	nickname: string;
	active: boolean;
	created_at: string;
	voided_at: string;
}

interface PlayerDataNicknameHistory {
	nickname: string;
	active: boolean | null;
	created_at: string;
	voided_at: string | null;
}

interface PlayerDataInfractions {
	id: string;
	punishment_type: PunishmentType;
	executor: string | null;
	reason: string;
	length: number | null;
}

interface PlayerDataTracker {
	server: string | null;
	map: string | null;
	proxy: string | null;
	last_login: string | null;
}

interface PlayerDataIPHistory {
	ip: string;
	login_at: string;
	logout_at: string | null;
	connection_proxy: string | null;
}

interface PlayerData {
	uuid: string;
	nickname_history: PlayerDataNicknameHistory[];
	infractions: PlayerDataInfractions[];
	tracker: PlayerDataTracker;
	ip_history?: PlayerDataIPHistory[];
}

interface StaffTracker {
	uuid: string;
	rank: StaffRank;
	online: boolean | null;
}

interface PunishmentData {
	id: string;
	punishment_type: PunishmentType;
	uuid: string;
	executor: string | null;
	reason: string;
	length: number | null;
}

interface KeyData {
	key: string;
	valid: boolean;
	active: boolean;
	created_at: string | null;
	expires_at: string | null;
	owner_cactiveconnections_id: string | null;
	endpoints: KeyEndpoints[];
}

interface KeyEndpoints {
	id: string;
	version: number;
	status: boolean;
}

export interface InternalError {
	type: string;
	code: number;
	message: string;
	internal: boolean;
}

type StaffRank = 'ADMINISTRATOR' | 'GAME_MASTER';
type PunishmentType = 'ban' | 'mute' | 'kick' | 'warning';
export type FilterType = 'all' | 'online' | 'offline';
export type APIResponseTypes =
	| APINicknameResponse
	| APIPlayerData
	| APIKeyData
	| APIStaffTracker
	| APIPunishmentData;
