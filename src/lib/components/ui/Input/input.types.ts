export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps {
	id?: string | null;
	name?: string;
	type?: string;
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;

	label?: string;
	error?: string | null;
	helper?: string | null;

	size?: InputSize;
	class?: string;
}
