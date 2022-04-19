import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType{} // Para estender o proprio tipo que voce deseja
}

/* Um arquivo para sobscrever tipos usando o TypeScript
acessa o "module" e sobscreve o tema "typeof" copia extamente o tipo do objeto no caso e
a dos theme.ts (primary, secondary...)

*/