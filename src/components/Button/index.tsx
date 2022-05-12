import * as C from './styles'
type Props = {
    text: String;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>
}
export const Button = (props:Props) => {
    return(
        <C.Container onClick={props.onClick}>
            <C.IconArea>
                <C.icon src={props.icon} />
            </C.IconArea>
            <C.Label>{props.text}</C.Label>
        </C.Container>
    )
}