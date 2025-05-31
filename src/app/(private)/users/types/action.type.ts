export type State = {
  errors: {
    id?: string[] | undefined;
    name?: string[] | undefined;
    surname?: string[] | undefined;
    username?: string[] | undefined;
    password?: string[] | undefined;
    job?: string[] | undefined;
    section?: string[] | undefined;
  } | null;
};

export const initialState: State = {
  errors: null,
};

export type Action = (prevState: State, formData: FormData) => Promise<State>;
