export interface Note {
	note_id: number;
	title: string;
	description?: string;
	updatedAt: string;
	user_id: string;
	flagged_id: string | null;
}
