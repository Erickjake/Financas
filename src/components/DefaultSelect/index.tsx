// src/components/DefaultSelect.jsx (ou src/components/Select/index.jsx)

import styles from './styles.module.css'; // Mantenha ou ajuste o caminho do seu arquivo de estilos

// Definindo as propriedades do DefaultSelect
type Option = {
    value: string;
    text: string; // Usaremos 'text' para o conteúdo visível da opção
};

type DefaultSelectProps = {
    id: string;
    labelText: string;
    options: Option[]; // Agora exige que você passe um array de opções com 'value' e 'text'
    placeholder?: string; // Adicionamos a prop 'placeholder' como opcional
} & React.ComponentProps<'select'>; // Aceita todas as props de um elemento <select> HTML

export default function DefaultSelect({ labelText, id, options, placeholder, ...rest }: DefaultSelectProps) {
    return (
        <>
            <label htmlFor={id}>{labelText}</label>
            <select className={styles.input} id={id} {...rest}>
                {/* Renderiza a opção de placeholder SE a prop 'placeholder' for fornecida */}
                {/* O 'disabled' e 'selected' garantem que seja uma opção inicial e não selecionável */}
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}

                {/* Mapeia as opções passadas via props para elementos <option> */}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text} {/* Corrigido de option.label para option.text */}
                    </option>
                ))}
            </select>
        </>
    );
}