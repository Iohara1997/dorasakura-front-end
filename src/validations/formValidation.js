import * as Yup from "yup";

export const validationForm = Yup.object().shape({
  username: Yup.string()
    .required("Name deve estar preenchido.")
    .min(6, "Nome deve ter ao menos 3 caracteres.")
    .max(30, "Nome não deve exceder mais de 30 caracteres."),
  email: Yup.string()
    .required("E-mail deve estar preenchido.")
    .email("Email inválido"),
  password: Yup.string()
    .required("Senha deve estar preenchida.")
    .min(6, "Senha deve ter ao menos 3 caracteres.")
    .max(40, "Senha não deve exceder mais de 40 caracteres."),
  confirmPassword: Yup.string()
    .required("Confirme a senha.")
    .oneOf([Yup.ref("password"), null], "Senhas não correspondem."),
});
