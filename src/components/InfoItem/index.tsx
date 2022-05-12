import * as C from './styles'
type Props = {
    label:string;
    value:string;
}
export const InfoItem = (props:Props) => {
    return(
        <C.Container>
            <C.Label>{props.label}</C.Label>
            <C.Value>{props.value}</C.Value>
        </C.Container>
    );
};