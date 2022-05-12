import { GridItem } from '../../types/GridItemType';
import * as C from './styles'
import b7Svg from '../../svgs/b7.svg'
import { items } from '../../data/items';

type Props = {
    key: number;
    item: GridItem
    onClick: () => void
}

export const GridItems = (props:Props) => {
    return(
        <C.Container 
            showBack={props.item.permanentShown || props.item.shown} 
            onClick={props.onClick}
        >
            {props.item.permanentShown === false && props.item.shown === false &&
                <C.Icon src={b7Svg} alt='Logo B7Web' opacity={.1}/>
            }
            {(props.item.permanentShown || props.item.shown) && props.item.item !== null &&
                <C.Icon src={items[props.item.item].icon} alt='Imagem Carta' />
            }

        </C.Container>
    )
}