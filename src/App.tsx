import { useEffect, useState } from 'react'
import * as C from './App.styles'

import RestartIcon from './svgs/restart.svg'
import logo from './assets/devmemory_logo.png'

import { InfoItem } from './components/InfoItem'
import { GridItems } from './components/GridItem'
import { Button } from './components/Button'

import { GridItem } from './types/GridItemType'
import { items } from './data/items'
import { formatTimeElepsed } from './helpers/formatTime'


const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElepsed, setTimeElepsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItem[]>([])


  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval( ()=> {
      if(playing) setTimeElepsed(timeElepsed + 1)
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElepsed]);

  //verify is opened are equal
  useEffect(() => {
    if(showCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {
        if(opened[0].item === opened[1].item) {
          let cloneTmpGrid = [...gridItems];
          for(let i in cloneTmpGrid) {
            if(cloneTmpGrid[i].shown){
              cloneTmpGrid[i].permanentShown = true;
              cloneTmpGrid[i].shown = false;
            }
          }
          setGridItems(cloneTmpGrid);
          setShowCount(0)
        } else {
          setTimeout( () => {
            let cloneTmpGrid = [...gridItems];
            for(let i in cloneTmpGrid){
              cloneTmpGrid[i].shown = false;
            }
            setGridItems(cloneTmpGrid);
            setShowCount(0)
          }, 800)
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  },[moveCount, gridItems])


  const handleItemClick = (index:number) => {
    if(playing && index !== null && showCount < 2){
      let cloneTmpGrid = [...gridItems]
      if(cloneTmpGrid[index].permanentShown === false && cloneTmpGrid[index].shown === false){
        cloneTmpGrid[index].shown = true;
        setShowCount(showCount + 1)
      }
      setGridItems(cloneTmpGrid)
    }
  }
  const resetAndCreateGrid = () => {
    //resetando o jogo
    setTimeElepsed(0);
    setMoveCount(0);
    setShowCount(0);

    //2 criar o grid
    //2.1 criar um grid vazio
    let tempGrid: GridItem[] = [];
    for(let i = 0; i < (items.length * 2); i++){ tempGrid.push(
      { item: null, permanentShown: false, shown: false }
    )}; 
    //2.2 preencher o grid
      for(let w = 0; w < 2; w++){
        for(let i = 0; i < (items.length); i++){
          let pos = -1;
          while(pos < 0 || tempGrid[pos].item !== null){
            pos = Math.floor( Math.random() * (items.length * 2) );
          }
          tempGrid[pos].item = i
        }
      }

    //2.3 jogar no state
    setGridItems(tempGrid)

    //começar o jogo
    setPlaying(true);

  }


  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logo} width='200' alt="Image Logo" />
        </C.LogoLink>

        <C.infoArea>
          <InfoItem label='Tempo' value={formatTimeElepsed(timeElepsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.infoArea>
        
        <Button text='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map( (item, index) => (
            <GridItems 
              key={index}
              item={item}
              onClick={()=> handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}
export default App